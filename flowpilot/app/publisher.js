/**
 * Núcleo de publicação, compartilhado por /api/publish (manual) e /api/cron (automático).
 * Mantém a regra num lugar só: monta as URLs a partir do mediaBaseUrl, respeita a
 * janela de horário do cliente e usa dedup semanal para nunca publicar duas vezes.
 */
const { publishItem } = require("./ig");
const { markOnce, weekKey, targetMs } = require("./lib");

/** Publica UM item da agenda (usado pelo modo de teste ?id=). */
async function publishOne(client, token, item, { dry = false } = {}) {
  const base = (client.mediaBaseUrl || "").replace(/\/$/, "");
  const urls = (item.media || []).map((m) => `${base}/${m}`);
  if (dry) return { id: item.id, dry: true, urls };
  const isVideo = String(item.media[0] || "").toLowerCase().endsWith(".mp4");
  const mediaId = await publishItem({
    igId: client.igUserId,
    token,
    type: item.type,
    urls,
    caption: item.caption || "",
    isVideo,
  });
  return { id: item.id, mediaId };
}

/**
 * Publica tudo que está na hora para um cliente.
 * Retorna { week, published[], skipped[], errors[] }.
 */
async function publishDue(client, token, { dry = false, now = Date.now() } = {}) {
  const schedule = client.schedule || [];
  const offset = client.timezoneOffsetHours ?? -3;
  const windowMs = (client.windowHours ?? 6) * 3600e3;
  const localNow = new Date(now + offset * 3600e3);
  const wk = weekKey(localNow);

  const published = [], skipped = [], errors = [];
  for (const item of schedule) {
    const t = targetMs(item.dow, item.time, offset, localNow);
    if (!(now >= t && now <= t + windowMs)) continue;      // ainda não é a hora (ou já passou)
    const mark = await markOnce(`ig:${client.id}:${wk}:${item.id}`);
    if (mark.enabled && !mark.fresh) { skipped.push(item.id); continue; }  // já publicado nesta semana
    try {
      published.push(await publishOne(client, token, item, { dry }));
    } catch (e) {
      errors.push({ id: item.id, error: e.message });
    }
  }
  return { week: wk, published, skipped, errors };
}

module.exports = { publishOne, publishDue };
