/**
 * Helpers da Instagram Graph API (Content Publishing).
 * Requer conta Instagram Business/Creator ligada a uma Página do Facebook,
 * um App Meta com `instagram_content_publish` e um token de longa duração.
 * Node 18+ (usa fetch global).
 */
const GRAPH = "https://graph.facebook.com/v21.0";

async function api(path, params = {}, method = "GET") {
  const url = new URL(`${GRAPH}/${path}`);
  if (method === "GET") for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const opts = { method };
  if (method === "POST") {
    const body = new URLSearchParams(params);
    opts.body = body;
  }
  const res = await fetch(url, opts);
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(`Graph API ${res.status}: ${JSON.stringify(json.error || json)}`);
  }
  return json;
}

/** Cria um container de mídia e retorna o creation id. */
async function createContainer(igId, token, params) {
  const r = await api(`${igId}/media`, { access_token: token, ...params }, "POST");
  return r.id;
}

/** Para vídeo/reels/story-vídeo: aguarda o processamento terminar. */
async function waitReady(containerId, token, { tries = 30, delayMs = 5000 } = {}) {
  for (let i = 0; i < tries; i++) {
    const r = await api(containerId, { access_token: token, fields: "status_code,status" });
    if (r.status_code === "FINISHED") return;
    if (r.status_code === "ERROR") throw new Error(`Container ${containerId} falhou: ${r.status}`);
    await new Promise((res) => setTimeout(res, delayMs));
  }
  throw new Error(`Timeout aguardando container ${containerId}`);
}

/** Publica um container já pronto. Retorna o id da mídia publicada. */
async function publish(igId, token, creationId) {
  const r = await api(`${igId}/media_publish`, { access_token: token, creation_id: creationId }, "POST");
  return r.id;
}

/**
 * Publica um item conforme o tipo.
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
    await waitReady(id, token);
    return publish(igId, token, id);
  }

  if (type === "story") {
    const params = isVideo ? { media_type: "STORIES", video_url: urls[0] } : { media_type: "STORIES", image_url: urls[0] };
    const id = await createContainer(igId, token, params);
    if (isVideo) await waitReady(id, token);
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
    return publish(igId, token, carousel);
  }

  throw new Error(`Tipo desconhecido: ${type}`);
}

module.exports = { api, publishItem, publish };
