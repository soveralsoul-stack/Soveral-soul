/**
 * Vercel Serverless Function — agendador de publicação no Instagram.
 *
 * Como dispara: um cron externo (ex.: cron-job.org) chama esta URL a cada ~15 min:
 *     https://SEU-APP.vercel.app/api/publish?key=SEU_PUBLISH_SECRET
 * A função publica os itens do schedule.json que estão "na hora" (dentro da janela).
 *
 * Modos de teste (query):
 *   ?dry=1                → simula, não publica
 *   ?id=seg-story-85      → publica UM item agora (ignora horário) — teste ponta a ponta
 *
 * Env vars (Vercel → Settings → Environment Variables):
 *   IG_USER_ID, IG_ACCESS_TOKEN, MEDIA_BASE_URL   (obrigatórias)
 *   PUBLISH_SECRET                                 (senha da URL; obrigatória)
 *   WINDOW_MINUTES                                 (opcional, padrão 30)
 *   UPSTASH_REDIS_REST_URL / _TOKEN (ou KV_REST_API_URL / _TOKEN)  (opcional: dedup)
 */
const { publishItem } = require("../ig");
const SCHEDULE = require("../schedule.json");

// ---- dedup opcional via Upstash Redis REST (SET key 1 EX ttl NX) ----
async function markOnce(key) {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const tok = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !tok) return { enabled: false, fresh: true };
  const r = await fetch(`${url}/set/${encodeURIComponent(key)}/1/EX/691200/NX`, {
    headers: { Authorization: `Bearer ${tok}` },
  });
  const j = await r.json().catch(() => ({}));
  return { enabled: true, fresh: j.result === "OK" }; // OK = marcou agora; null = já existia
}

function weekKey(localNow) {
  const d = new Date(Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth(), localNow.getUTCDate()));
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day + 3);
  const firstThu = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((d - firstThu) / 86400000 - 3 + ((firstThu.getUTCDay() + 6) % 7)) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}
function targetMs(dow, timeStr, offsetHours, localNow) {
  const [hh, mm] = timeStr.split(":").map(Number);
  const curDow = (localNow.getUTCDay() + 6) % 7 + 1;
  const delta = dow - curDow;
  const local = Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth(), localNow.getUTCDate() + delta, hh, mm, 0);
  return local - offsetHours * 3600e3;
}

module.exports = async (req, res) => {
  const q = req.query || {};
  const secret = process.env.PUBLISH_SECRET;
  const auth = (req.headers.authorization || "").replace("Bearer ", "");
  const ok = secret && (q.key === secret || auth === secret || auth === process.env.CRON_SECRET);
  if (!ok) return res.status(401).json({ error: "unauthorized" });

  const { IG_USER_ID, IG_ACCESS_TOKEN, MEDIA_BASE_URL } = process.env;
  if (!IG_USER_ID || !IG_ACCESS_TOKEN || !MEDIA_BASE_URL) {
    return res.status(500).json({ error: "faltam IG_USER_ID / IG_ACCESS_TOKEN / MEDIA_BASE_URL" });
  }
  const dry = q.dry === "1" || q.dry === "true";
  const base = MEDIA_BASE_URL.replace(/\/$/, "");
  const doPublish = async (item) => {
    const urls = item.media.map((m) => `${base}/${m}`);
    const isVideo = item.media[0].toLowerCase().endsWith(".mp4");
    if (dry) return { id: item.id, dry: true, urls };
    const mediaId = await publishItem({
      igId: IG_USER_ID, token: IG_ACCESS_TOKEN, type: item.type, urls, caption: item.caption || "", isVideo,
    });
    return { id: item.id, mediaId };
  };

  try {
    // modo teste: publica UM item específico agora
    if (q.id) {
      const item = SCHEDULE.items.find((i) => i.id === q.id);
      if (!item) return res.status(404).json({ error: `item ${q.id} não encontrado` });
      return res.status(200).json({ mode: "one", result: await doPublish(item) });
    }

    // modo normal: publica o que está na hora
    const offset = SCHEDULE.timezoneOffsetHours ?? -3;
    const windowMs = (Number(process.env.WINDOW_MINUTES) || 30) * 60e3;
    const now = Date.now();
    const localNow = new Date(now + offset * 3600e3);
    const wk = weekKey(localNow);

    const published = [], skipped = [], errors = [];
    for (const item of SCHEDULE.items) {
      const t = targetMs(item.dow, item.time, offset, localNow);
      if (!(now >= t && now <= t + windowMs)) continue; // fora da janela
      const mark = await markOnce(`ig:${wk}:${item.id}`);
      if (mark.enabled && !mark.fresh) { skipped.push(item.id); continue; } // já publicado
      try { published.push(await doPublish(item)); }
      catch (e) { errors.push({ id: item.id, error: e.message }); }
    }
    return res.status(200).json({ mode: "due", week: wk, published, skipped, errors });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
