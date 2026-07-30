/**
 * Helpers da Instagram Graph API (Content Publishing).
 * Requer conta Instagram Business/Creator, App Meta com instagram_content_publish
 * e um token de longa duração. Node 18+ (usa fetch global).
 */
// Fluxo novo "Instagram API com login do Instagram" → base graph.instagram.com.
// Se você usou o fluxo clássico (Facebook Login), defina GRAPH_BASE=https://graph.facebook.com
const GRAPH = (process.env.GRAPH_BASE || "https://graph.instagram.com") + "/v21.0";

async function api(path, params = {}, method = "GET") {
  const url = new URL(`${GRAPH}/${path}`);
  if (method === "GET") for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const opts = { method };
  if (method === "POST") opts.body = new URLSearchParams(params);
  const res = await fetch(url, opts);
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(`Graph API ${res.status}: ${JSON.stringify(json.error || json)}`);
  }
  return json;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Cria um container de mídia e retorna o creation id. */
async function createContainer(igId, token, params) {
  const r = await api(`${igId}/media`, { access_token: token, ...params }, "POST");
  return r.id;
}

/** Aguarda o container ficar FINISHED (vídeo/reels/story-vídeo e carrossel). */
async function waitReady(containerId, token, { tries = 12, delayMs = 3000 } = {}) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await api(containerId, { access_token: token, fields: "status_code,status" });
      if (r.status_code === "FINISHED") return;
      if (r.status_code === "ERROR") throw new Error(`Container ${containerId} falhou: ${r.status}`);
    } catch (e) {
      // status pode não estar disponível de imediato; segue tentando
    }
    await sleep(delayMs);
  }
}

/** Publica um container. Repete se o Instagram disser que ainda "não está pronto". */
async function publish(igId, token, creationId, { tries = 6, delayMs = 3000 } = {}) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const r = await api(`${igId}/media_publish`, { access_token: token, creation_id: creationId }, "POST");
      return r.id;
    } catch (e) {
      lastErr = e;
      // "media not ready" (9007 / 2207027) → espera e tenta de novo
      if (/not ready|9007|2207027/i.test(e.message)) {
        await sleep(delayMs);
        continue;
      }
      throw e;
    }
  }
  throw lastErr;
}

/** Status atual de um container (FINISHED | IN_PROGRESS | ERROR | null). */
async function statusOf(containerId, token) {
  try {
    const r = await api(containerId, { access_token: token, fields: "status_code,status" });
    return r.status_code || null;
  } catch { return null; }
}

/**
 * Cria o container de mídia SEM esperar/publicar. Usado no fluxo assíncrono:
 * vídeo demora para o Instagram processar e não cabe no limite da função.
 * Retorna o creation id.
 */
async function createFor({ igId, token, type, urls, caption, isVideo }) {
  if (type === "image") return createContainer(igId, token, { image_url: urls[0], caption });
  if (type === "reels") return createContainer(igId, token, { media_type: "REELS", video_url: urls[0], caption });
  if (type === "story") {
    return createContainer(igId, token, isVideo
      ? { media_type: "STORIES", video_url: urls[0] }
      : { media_type: "STORIES", image_url: urls[0] });
  }
  if (type === "carousel") {
    const children = [];
    for (const u of urls) children.push(await createContainer(igId, token, { image_url: u, is_carousel_item: "true" }));
    return createContainer(igId, token, { media_type: "CAROUSEL", children: children.join(","), caption });
  }
  throw new Error(`Tipo desconhecido: ${type}`);
}

/**
 * Publica um item conforme o tipo (fluxo síncrono, para mídia rápida).
 *  type: "image" | "carousel" | "reels" | "story"
 *  urls: array de URLs públicas (JPEG p/ imagem, MP4 H.264/AAC p/ vídeo)
 */
async function publishItem({ igId, token, type, urls, caption, isVideo }) {
  if (type === "image") {
    const id = await createContainer(igId, token, { image_url: urls[0], caption });
    return publish(igId, token, id);
  }

  if (type === "reels") {
    const id = await createContainer(igId, token, { media_type: "REELS", video_url: urls[0], caption });
    await waitReady(id, token, { tries: 16, delayMs: 3000 });
    return publish(igId, token, id);
  }

  if (type === "story") {
    const params = isVideo ? { media_type: "STORIES", video_url: urls[0] } : { media_type: "STORIES", image_url: urls[0] };
    const id = await createContainer(igId, token, params);
    if (isVideo) await waitReady(id, token, { tries: 16, delayMs: 3000 });
    return publish(igId, token, id);
  }

  if (type === "carousel") {
    const children = [];
    for (const u of urls) {
      const cid = await createContainer(igId, token, { image_url: u, is_carousel_item: "true" });
      children.push(cid);
    }
    const carousel = await createContainer(igId, token, {
      media_type: "CAROUSEL",
      children: children.join(","),
      caption,
    });
    // ESSENCIAL: esperar o carrossel montar antes de publicar (evita "media not ready")
    await waitReady(carousel, token, { tries: 8, delayMs: 3000 });
    return publish(igId, token, carousel);
  }

  throw new Error(`Tipo desconhecido: ${type}`);
}

module.exports = { api, publishItem, publish, createFor, statusOf, waitReady };
