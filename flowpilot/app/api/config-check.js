/**
 * Diagnóstico de configuração (sem expor segredos) para validar o OAuth.
 *   /api/config-check?key=SEU_SECRET
 * Retorna só true/false de cada env + o redirect_uri e a authorize URL que o app usa.
 * Não vaza nenhum valor de segredo (só presença).
 */
const { authOk } = require("../lib");
const { redirectUri, authUrl, SCOPES } = require("../oauth");

module.exports = async (req, res) => {
  if (!authOk(req)) return res.status(401).json({ error: "unauthorized" });

  const has = (k) => !!process.env[k];
  // o lib.js resolve o Upstash por UPSTASH_* OU KV_REST_API_* (dois nomes possíveis)
  const kvUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const kvTok = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return res.status(200).json({
    ok: true,
    host: req.headers["x-forwarded-host"] || req.headers.host || null,
    env: {
      INSTAGRAM_APP_ID: has("INSTAGRAM_APP_ID"),
      INSTAGRAM_APP_SECRET: has("INSTAGRAM_APP_SECRET"),
      OAUTH_REDIRECT_URI: has("OAUTH_REDIRECT_URI"),
      PUBLISH_SECRET: has("PUBLISH_SECRET"),
      IG_ACCESS_TOKEN: has("IG_ACCESS_TOKEN"),
      GRAPH_BASE: process.env.GRAPH_BASE || "(default) https://graph.instagram.com",
    },
    storage: {
      UPSTASH_REDIS_REST_URL: has("UPSTASH_REDIS_REST_URL"),
      UPSTASH_REDIS_REST_TOKEN: has("UPSTASH_REDIS_REST_TOKEN"),
      KV_REST_API_URL: has("KV_REST_API_URL"),
      KV_REST_API_TOKEN: has("KV_REST_API_TOKEN"),
      upstash_efetivo: !!(kvUrl && kvTok), // true = o app consegue gravar token/dedup
    },
    oauth: {
      scopes: SCOPES,
      redirect_uri: redirectUri(req),        // o que será enviado no authorize e na troca
      authorize_url: authUrl(req, "diag"),   // client_id/redirect são públicos (não segredo)
    },
  });
};
