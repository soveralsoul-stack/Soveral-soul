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
      <div style="display:inline-flex;align-items:center;gap:11px;margin-bottom:22px">
        <svg viewBox="0 0 100 100" style="width:38px;height:38px"><defs><linearGradient id="fp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f8cff"/><stop offset="1" stop-color="#7c5cff"/></linearGradient></defs><rect width="100" height="100" rx="24" fill="url(#fp)"/><rect x="12" y="12" width="76" height="76" rx="18" fill="none" stroke="#fff" stroke-width="4"/><g transform="translate(50 50) scale(2.05) translate(-12 -9)"><path fill="#fff" d="M21.7 2.3a1 1 0 0 0-1.05-.23L2.9 8.36c-.86.32-.8 1.57.09 1.8l6.2 1.6 1.6 6.2c.23.9 1.48.95 1.8.09l6.29-17.7a1 1 0 0 0-.18-1.05z"/></g></svg>
        <span style="font-weight:700;font-size:1.3rem">Flow<span style="background:linear-gradient(120deg,#4f8cff,#7c5cff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent">Pilot</span></span>
      </div>
      <h1 style="color:#4f8cff;font-size:1.8rem">Instagram conectado</h1>
      <p style="color:#9fb0c9">Conta: <b style="color:#fff">@${me.username || ""}</b></p>
      <p style="color:#61728e;font-size:.9rem">client: <b>${clientKey}</b> · user_id: ${me.user_id || short.user_id}${saved ? "" : " · (aviso: token não gravado, configure o Upstash)"}</p>
      <p style="color:#9fb0c9;margin-top:14px">Pode fechar esta página.</p>`));
  } catch (e) {
    return res.status(500).end(page("Erro", `<h2>Falha ao conectar</h2><pre style="white-space:pre-wrap;color:#61728e;text-align:left">${(e.message || "").slice(0, 500)}</pre>`));
  }
};
