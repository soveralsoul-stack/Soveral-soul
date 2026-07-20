/**
 * Lista stories ativos e posts recentes de um cliente (para verificar publicação).
 *   https://SEU-APP.vercel.app/api/recent?key=SEU_SECRET&client=soveralsoul
 */
const { resolveClient, defaultClientId, authOk } = require("../lib");

module.exports = async (req, res) => {
  const q = req.query || {};
  if (!authOk(req)) return res.status(401).json({ error: "unauthorized" });

  const clientId = q.client || defaultClientId();
  const client = resolveClient(clientId);
  if (!client) return res.status(404).json({ error: `cliente "${clientId}" não encontrado` });
  if (!client.igUserId || !client.token) return res.status(500).json({ error: "igUserId/token ausente" });

  const base = (process.env.GRAPH_BASE || "https://graph.instagram.com") + "/v21.0";
  const get = async (edge, fields) => {
    try {
      const url = new URL(`${base}/${client.igUserId}/${edge}`);
      url.searchParams.set("fields", fields);
      url.searchParams.set("limit", "8");
      url.searchParams.set("access_token", client.token);
      const r = await fetch(url);
      const j = await r.json();
      if (j.error) return { error: j.error.message };
      return (j.data || []).map((m) => ({
        id: m.id, type: m.media_type, timestamp: m.timestamp,
        caption: m.caption ? m.caption.slice(0, 40) : undefined,
      }));
    } catch (e) { return { error: e.message }; }
  };

  const [stories, media] = await Promise.all([
    get("stories", "id,media_type,timestamp"),
    get("media", "id,media_type,timestamp,caption"),
  ]);
  return res.status(200).json({
    client: clientId, agora_utc: new Date().toISOString(),
    stories_ativos: stories, posts_recentes: media,
  });
};
