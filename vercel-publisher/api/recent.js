/**
 * Vercel Serverless Function — lista stories ativos e posts recentes da conta.
 * Serve para VERIFICAR se algo foi publicado (sem precisar logar no Instagram).
 * Uso:  https://SEU-APP.vercel.app/api/recent?key=SEU_PUBLISH_SECRET
 */
module.exports = async (req, res) => {
  const q = req.query || {};
  const secret = process.env.PUBLISH_SECRET;
  const auth = (req.headers.authorization || "").replace("Bearer ", "");
  if (!secret || (q.key !== secret && auth !== secret)) {
    return res.status(401).json({ error: "unauthorized" });
  }
  const { IG_USER_ID, IG_ACCESS_TOKEN, GRAPH_BASE } = process.env;
  if (!IG_USER_ID || !IG_ACCESS_TOKEN) {
    return res.status(500).json({ error: "faltam IG_USER_ID / IG_ACCESS_TOKEN" });
  }
  const base = (GRAPH_BASE || "https://graph.instagram.com") + "/v21.0";

  const get = async (edge, fields) => {
    try {
      const url = new URL(`${base}/${IG_USER_ID}/${edge}`);
      url.searchParams.set("fields", fields);
      url.searchParams.set("limit", "8");
      url.searchParams.set("access_token", IG_ACCESS_TOKEN);
      const r = await fetch(url);
      const j = await r.json();
      if (j.error) return { error: j.error.message };
      return (j.data || []).map((m) => ({
        id: m.id,
        type: m.media_type,
        timestamp: m.timestamp,
        caption: m.caption ? m.caption.slice(0, 40) : undefined,
      }));
    } catch (e) {
      return { error: e.message };
    }
  };

  const [stories, media] = await Promise.all([
    get("stories", "id,media_type,timestamp"),
    get("media", "id,media_type,timestamp,caption"),
  ]);

  return res.status(200).json({
    agora_utc: new Date().toISOString(),
    stories_ativos: stories,
    posts_recentes: media,
  });
};
