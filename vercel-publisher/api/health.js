/**
 * Vercel Serverless Function — checagem de saúde/token.
 * Uso:  https://SEU-APP.vercel.app/api/health?key=SEU_PUBLISH_SECRET
 * Retorna se o token é válido e a conta conectada (sem expor o token).
 */
module.exports = async (req, res) => {
  const q = req.query || {};
  const secret = process.env.PUBLISH_SECRET;
  const auth = (req.headers.authorization || "").replace("Bearer ", "");
  if (!secret || (q.key !== secret && auth !== secret)) {
    return res.status(401).json({ error: "unauthorized" });
  }
  const { IG_USER_ID, IG_ACCESS_TOKEN, MEDIA_BASE_URL, GRAPH_BASE } = process.env;
  if (!IG_ACCESS_TOKEN) return res.status(500).json({ error: "IG_ACCESS_TOKEN ausente" });

  const base = (GRAPH_BASE || "https://graph.instagram.com") + "/v21.0";
  try {
    const url = new URL(`${base}/me`);
    url.searchParams.set("fields", "user_id,username,account_type");
    url.searchParams.set("access_token", IG_ACCESS_TOKEN);
    const r = await fetch(url);
    const j = await r.json();
    if (j.error) return res.status(400).json({ ok: false, error: j.error.message });
    return res.status(200).json({
      ok: true,
      account: `@${j.username}`,
      account_type: j.account_type,
      user_id: j.user_id,
      id_confere: String(j.user_id) === String(IG_USER_ID || ""),
      media_base_url: MEDIA_BASE_URL || null,
      dedup: !!(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL),
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
