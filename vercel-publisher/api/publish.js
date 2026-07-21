/**
 * Vercel Serverless Function — agendador de publicação (multi-cliente).
 *
 * Dispara por um cron externo (ex.: cPanel curl) a cada ~15 min:
 *   https://SEU-APP.vercel.app/api/publish?key=SEU_SECRET            (cliente padrão)
 *   https://SEU-APP.vercel.app/api/publish?key=SEU_SECRET&client=labela
 *
 * Modos de teste (query):
 *   &dry=1                → simula, não publica
 *   &id=seg-story-85      → publica UM item agora (ignora horário)
 *
 * Segredos ficam em env vars (nunca no repo): PUBLISH_SECRET, e o token de cada
 * cliente na var apontada por "tokenEnv" no clients/<id>.json.
 */
const { publishItem } = require("../ig");
const { resolveClient, defaultClientId, resolveToken, authOk, markOnce, weekKey, targetMs } = require("../lib");

module.exports = async (req, res) => {
  const q = req.query || {};
  if (!authOk(req)) return res.status(401).json({ error: "unauthorized" });

  const clientId = q.client || defaultClientId();
  const client = await resolveClient(clientId);
  if (!client) return res.status(404).json({ error: `cliente "${clientId}" não encontrado` });
  const token = await resolveToken(client);
  if (!client.igUserId || !token || !client.mediaBaseUrl) {
    return res.status(500).json({ error: `cliente "${clientId}" sem igUserId/token/mediaBaseUrl` });
  }

  const dry = q.dry === "1" || q.dry === "true";
  const base = client.mediaBaseUrl.replace(/\/$/, "");
  const doPublish = async (item) => {
    const urls = item.media.map((m) => `${base}/${m}`);
    const isVideo = item.media[0].toLowerCase().endsWith(".mp4");
    if (dry) return { id: item.id, dry: true, urls };
    const mediaId = await publishItem({
      igId: client.igUserId, token, type: item.type, urls, caption: item.caption || "", isVideo,
    });
    return { id: item.id, mediaId };
  };

  try {
    const schedule = client.schedule || [];

    // modo teste: publica UM item específico agora
    if (q.id) {
      const item = schedule.find((i) => i.id === q.id);
      if (!item) return res.status(404).json({ error: `item ${q.id} não encontrado em ${clientId}` });
      return res.status(200).json({ client: clientId, mode: "one", result: await doPublish(item) });
    }

    // modo normal: publica o que está na hora
    const offset = client.timezoneOffsetHours ?? -3;
    const windowMs = (client.windowHours ?? 6) * 3600e3;
    const now = Date.now();
    const localNow = new Date(now + offset * 3600e3);
    const wk = weekKey(localNow);

    const published = [], skipped = [], errors = [];
    for (const item of schedule) {
      const t = targetMs(item.dow, item.time, offset, localNow);
      if (!(now >= t && now <= t + windowMs)) continue;
      const mark = await markOnce(`ig:${clientId}:${wk}:${item.id}`);
      if (mark.enabled && !mark.fresh) { skipped.push(item.id); continue; }
      try { published.push(await doPublish(item)); }
      catch (e) { errors.push({ id: item.id, error: e.message }); }
    }
    return res.status(200).json({ client: clientId, mode: "due", week: wk, published, skipped, errors });
  } catch (e) {
    return res.status(500).json({ client: clientId, error: e.message });
  }
};
