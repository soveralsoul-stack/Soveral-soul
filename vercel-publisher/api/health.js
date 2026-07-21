/**
 * Checagem de saúde/token por cliente.
 *   https://SEU-APP.vercel.app/api/health?key=SEU_SECRET&client=soveralsoul
 */
const { resolveClient, defaultClientId, resolveToken, authOk, dedupOn } = require("../lib");

module.exports = async (req, res) => {
  const q = req.query || {};
  if (!authOk(req)) return res.status(401).json({ error: "unauthorized" });

  const clientId = q.client || defaultClientId();
  const client = resolveClient(clientId);
  if (!client) return res.status(404).json({ error: `cliente "${clientId}" não encontrado` });
  const token = await resolveToken(client);
  if (!token) return res.status(500).json({ error: `token ausente (env ${client.tokenEnv} ou OAuth)` });

  const base = (process.env.GRAPH_BASE || "https://graph.instagram.com") + "/v21.0";
  try {
    const url = new URL(`${base}/me`);
    url.searchParams.set("fields", "user_id,username,account_type");
    url.searchParams.set("access_token", token);
    const r = await fetch(url);
    const j = await r.json();
    if (j.error) return res.status(400).json({ ok: false, client: clientId, error: j.error.message });
    return res.status(200).json({
      ok: true,
      client: clientId,
      name: client.name,
      account: `@${j.username}`,
      account_type: j.account_type,
      user_id: j.user_id,
      id_confere: String(j.user_id) === String(client.igUserId || ""),
      media_base_url: client.mediaBaseUrl || null,
      posts_agendados: (client.schedule || []).length,
      dedup: dedupOn(),
    });
  } catch (e) {
    return res.status(500).json({ ok: false, client: clientId, error: e.message });
  }
};
