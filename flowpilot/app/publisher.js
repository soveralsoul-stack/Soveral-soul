/**
 * Núcleo de publicação, compartilhado por /api/publish (manual) e /api/cron (automático).
 *
 * Vídeo (reels e story em vídeo) usa fluxo em DUAS FASES, porque o Instagram pode
 * levar minutos para processar o arquivo e a função serverless tem 60s:
 *   fase 1: cria o container e espera um pouco. Se ficar pronto, publica na hora.
 *           Se não, grava um "pendente" no Upstash e devolve o controle.
 *   fase 2: a rodada seguinte do cron vê o pendente, checa o status e publica.
 * Assim nada estoura o limite de tempo e nenhum post se perde.
 */
const { publishItem, createFor, statusOf, publish } = require("./ig");
const { markOnce, weekKey, targetMs, kvSet, kvGet, kvDel, scanKeys } = require("./lib");

const VIDEO_TYPES = new Set(["reels"]);
const isVideoItem = (item) =>
  VIDEO_TYPES.has(item.type) ||
  (item.type === "story" && String(item.media?.[0] || "").toLowerCase().endsWith(".mp4"));

const pendKey = (clientId, itemId) => `pending:${clientId}:${itemId}`;

/** Publica UM item da agenda. Vídeo pode voltar como {pending:true}. */
async function publishOne(client, token, item, { dry = false } = {}) {
  const base = (client.mediaBaseUrl || "").replace(/\/$/, "");
  const urls = (item.media || []).map((m) => `${base}/${m}`);
  // capa opcional do reel: arquivo JPEG em mediaBaseUrl, como a mídia
  const coverUrl = item.cover ? `${base}/${item.cover}` : undefined;
  if (dry) return { id: item.id, dry: true, urls, coverUrl };

  const isVideo = String(item.media?.[0] || "").toLowerCase().endsWith(".mp4");

  // mídia rápida (imagem, carrossel, story de imagem): caminho síncrono de sempre
  if (!isVideoItem(item)) {
    const mediaId = await publishItem({
      igId: client.igUserId, token, type: item.type, urls, caption: item.caption || "", isVideo,
    });
    return { id: item.id, mediaId };
  }

  // vídeo: cria o container e tenta publicar dentro de uma janela curta
  const containerId = await createFor({
    igId: client.igUserId, token, type: item.type, urls, caption: item.caption || "", isVideo, coverUrl,
  });

  const deadline = Date.now() + 30000; // ~30s, com folga para o resto da função
  while (Date.now() < deadline) {
    const st = await statusOf(containerId, token);
    if (st === "FINISHED") {
      const mediaId = await publish(client.igUserId, token, containerId, { tries: 2, delayMs: 2000 });
      return { id: item.id, mediaId };
    }
    if (st === "ERROR") throw new Error(`container ${containerId} falhou no processamento`);
    await new Promise((r) => setTimeout(r, 3000));
  }

  // ainda processando: guarda para a próxima rodada do cron concluir
  await kvSet(pendKey(client.id, item.id), JSON.stringify({
    containerId, itemId: item.id, at: new Date().toISOString(),
  }));
  return { id: item.id, pending: true, containerId };
}

/** Fase 2: conclui os vídeos que ficaram processando em rodadas anteriores. */
async function resolvePending(client, token) {
  const keys = await scanKeys(`pending:${client.id}:*`);
  const done = [], aguardando = [], falhas = [];
  for (const k of keys) {
    try {
      const raw = await kvGet(k);
      if (!raw) { await kvDel(k); continue; }
      const { containerId, itemId, at } = JSON.parse(raw);
      const st = await statusOf(containerId, token);
      if (st === "FINISHED") {
        const mediaId = await publish(client.igUserId, token, containerId, { tries: 3, delayMs: 2000 });
        await kvDel(k);
        done.push({ id: itemId, mediaId });
      } else if (st === "ERROR" || (at && Date.now() - Date.parse(at) > 2 * 3600e3)) {
        // erro do Instagram, ou pendente velho demais (2h): desiste para não travar a fila
        await kvDel(k);
        falhas.push({ id: itemId, motivo: st === "ERROR" ? "processamento falhou" : "expirou" });
      } else {
        aguardando.push(itemId);
      }
    } catch (e) {
      falhas.push({ chave: k, erro: e.message });
    }
  }
  return { done, aguardando, falhas };
}

/** Publica tudo que está na hora para um cliente. */
async function publishDue(client, token, { dry = false, now = Date.now() } = {}) {
  const schedule = client.schedule || [];
  const offset = client.timezoneOffsetHours ?? -3;
  const windowMs = (client.windowHours ?? 6) * 3600e3;
  const localNow = new Date(now + offset * 3600e3);
  const wk = weekKey(localNow);

  const today = localNow.toISOString().slice(0, 10);

  const published = [], skipped = [], errors = [];
  for (const item of schedule) {
    // campanha com data de validade: passou de "until", o item para de sozinho.
    // Sem isso, uma agenda de campanha vira post semanal eterno.
    if (item.until && today > item.until) continue;
    if (item.from && today < item.from) continue;
    const t = targetMs(item.dow, item.time, offset, localNow);
    if (!(now >= t && now <= t + windowMs)) continue;
    const mark = await markOnce(`ig:${client.id}:${wk}:${item.id}`);
    if (mark.enabled && !mark.fresh) { skipped.push(item.id); continue; }
    try {
      published.push(await publishOne(client, token, item, { dry }));
    } catch (e) {
      errors.push({ id: item.id, error: e.message });
    }
  }
  return { week: wk, published, skipped, errors };
}

// ---------- Fila de posts avulsos (compositor) ----------
// Diferente da agenda semanal (schedule), a fila guarda posts que o próprio usuário
// criou: uma imagem enviada, uma legenda e um horário exato (ISO, UTC).
//   { id, at, type: "image"|"story", url, caption, status: "scheduled"|"published"|"failed",
//     mediaId?, publishedAt?, error? }
// Só vale para clientes dinâmicos (Upstash), que é onde o compositor grava.

/** Aplica um patch em um item da fila, relendo o registro para não perder escritas. */
async function patchQueueItem(clientId, itemId, patch) {
  const raw = await kvGet(`client:${clientId}`);
  if (!raw) return null;
  const rec = JSON.parse(raw);
  rec.queue = (rec.queue || []).map((q) => (q.id === itemId ? { ...q, ...patch } : q));
  await kvSet(`client:${clientId}`, JSON.stringify(rec));
  return rec.queue.find((q) => q.id === itemId) || null;
}

/** Publica um item da fila (agora). A marca no Upstash impede publicar duas vezes. */
async function publishQueued(client, token, item) {
  const mark = await markOnce(`q:${client.id}:${item.id}`);
  if (mark.enabled && !mark.fresh) return { id: item.id, skipped: "já publicado" };
  try {
    const mediaId = await publishItem({
      igId: client.igUserId, token, type: item.type, urls: [item.url],
      caption: item.type === "story" ? "" : item.caption || "", isVideo: false,
    });
    await patchQueueItem(client.id, item.id, {
      status: "published", mediaId, publishedAt: new Date().toISOString(), error: null,
    });
    return { id: item.id, mediaId };
  } catch (e) {
    await kvDel(`q:${client.id}:${item.id}`); // libera para tentar de novo
    await patchQueueItem(client.id, item.id, { status: "failed", error: e.message.slice(0, 300) });
    throw e;
  }
}

/** Publica os itens da fila que chegaram na hora (até windowHours de atraso). */
async function publishDueQueue(client, token, { dry = false, now = Date.now() } = {}) {
  const windowMs = (client.windowHours ?? 6) * 3600e3;
  const published = [], errors = [];
  for (const item of client.queue || []) {
    if (item.status !== "scheduled") continue;
    const t = Date.parse(item.at);
    if (!(now >= t && now <= t + windowMs)) continue;
    if (dry) { published.push({ id: item.id, dry: true }); continue; }
    try {
      const r = await publishQueued(client, token, item);
      if (!r.skipped) published.push(r);
    } catch (e) {
      errors.push({ id: item.id, error: e.message });
    }
  }
  return { published, errors };
}

module.exports = { publishOne, publishDue, resolvePending, patchQueueItem, publishQueued, publishDueQueue };
