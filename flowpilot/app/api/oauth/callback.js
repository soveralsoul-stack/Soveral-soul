/** Recebe o code do Instagram, troca por token longo e guarda no Upstash (por cliente). */
const { exchangeCode, exchangeLong, getMe } = require("../../oauth");
const { kvSet, saveClient } = require("../../lib");

const page = (title, body) =>
  `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title></head>` +
  `<body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:radial-gradient(120% 60% at 50% 0%,#101528,#06080f);color:#e8eef8;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px"><div style="max-width:460px">${body}</div></body></html>`;

module.exports = async (req, res) => {
  const q = req.query || {};
  res.setHeader("content-type", "text/html; charset=utf-8");
  if (q.error) return res.end(page("Erro", `<h2>Autorização cancelada</h2><p style="color:#9fb0c9">${q.error_description || q.error}</p>`));
  const code = q.code, state = q.state || "";
  if (!code) return res.status(400).end(page("Erro", "<h2>Faltou o código de autorização</h2>"));
  try {
    const short = await exchangeCode(req, code);
    const long = await exchangeLong(short.access_token);
    const me = await getMe(long.access_token);
    const clientKey = state || String(me.user_id || short.user_id || "");
    const saved = await kvSet(`igtoken:client:${clientKey}`, JSON.stringify({
      token: long.access_token, userId: me.user_id || short.user_id, username: me.username, at: new Date().toISOString(),
    }));
    // registro do cliente dinâmico (captura igUserId/username automaticamente)
    await saveClient(clientKey, {
      igUserId: String(me.user_id || short.user_id || ""),
      username: me.username, accountType: me.account_type, connectedAt: new Date().toISOString(),
    });
    return res.end(page("Conectado", `
      <h1 style="color:#2d8fff;font-size:1.8rem">Instagram conectado</h1>
      <p style="color:#9fb0c9">Conta: <b style="color:#fff">@${me.username || ""}</b></p>
      <p style="color:#61728e;font-size:.9rem">client: <b>${clientKey}</b> · user_id: ${me.user_id || short.user_id}${saved ? "" : " · (aviso: token não gravado, configure o Upstash)"}</p>
      <p style="color:#9fb0c9;margin-top:14px">Pode fechar esta página.</p>`));
  } catch (e) {
    return res.status(500).end(page("Erro", `<h2>Falha ao conectar</h2><pre style="white-space:pre-wrap;color:#61728e;text-align:left">${(e.message || "").slice(0, 500)}</pre>`));
  }
};
