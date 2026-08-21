/**
 * Página "Conectar Instagram" (landing do onboarding do FlowPilot).
 *   https://SEU-APP.vercel.app/api/connect?client=<slug>
 * O botão leva para /api/oauth/start, que redireciona pro login do Instagram.
 */
module.exports = async (req, res) => {
  const client = (req.query && req.query.client) || "";
  const start = `/api/oauth/start${client ? `?client=${encodeURIComponent(client)}` : ""}`;
  res.setHeader("content-type", "text/html; charset=utf-8");
  res.end(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Conectar Instagram · FlowPilot</title>
<link rel="icon" type="image/png" href="/favicon.png">
<style>
  :root{--a1:#4f8cff;--a2:#7c5cff}
  *{margin:0;box-sizing:border-box} body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
    background:radial-gradient(120% 60% at 50% 0%,#101528,#06080f);color:#e8eef8;min-height:100vh;
    display:flex;align-items:center;justify-content:center;padding:24px}
  .box{max-width:460px;text-align:center;background:rgba(255,255,255,.03);border:1px solid #1a2240;
    border-radius:16px;padding:44px 34px}
  .brand{display:inline-flex;align-items:center;gap:11px;margin-bottom:24px}
  .brand svg{width:38px;height:38px}
  .wm{font-weight:700;font-size:1.35rem;letter-spacing:-.02em}
  .wm .g{background:linear-gradient(120deg,var(--a1),var(--a2));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
  h1{font-size:1.6rem;margin-bottom:10px} p{color:#9fb0c9;line-height:1.6}
  .btn{display:inline-flex;align-items:center;gap:10px;margin-top:26px;background:linear-gradient(120deg,var(--a1),var(--a2));
    color:#fff;font-weight:700;text-decoration:none;padding:16px 26px;border-radius:11px;font-size:1.05rem;
    box-shadow:0 10px 30px rgba(79,140,255,.35)}
  .small{margin-top:20px;font-size:.85rem;color:#61728e}
</style></head><body>
  <div class="box">
    <div class="brand">
      <svg viewBox="0 0 100 100"><defs><linearGradient id="fp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f8cff"/><stop offset="1" stop-color="#7c5cff"/></linearGradient></defs><rect width="100" height="100" rx="24" fill="url(#fp)"/><rect x="12" y="12" width="76" height="76" rx="18" fill="none" stroke="#fff" stroke-width="4"/><g transform="translate(50 50) scale(2.05) translate(-12 -9)"><path fill="#fff" d="M21.7 2.3a1 1 0 0 0-1.05-.23L2.9 8.36c-.86.32-.8 1.57.09 1.8l6.2 1.6 1.6 6.2c.23.9 1.48.95 1.8.09l6.29-17.7a1 1 0 0 0-.18-1.05z"/></g></svg>
      <span class="wm">Flow<span class="g">Pilot</span></span>
    </div>
    <h1>Conectar seu Instagram</h1>
    <p>Autorize o FlowPilot a publicar os posts na sua conta, nos horários combinados.
    Você pode revogar quando quiser nas configurações do Instagram.</p>
    <a class="btn" href="${start}">Conectar Instagram</a>
    <p class="small">Sua conta precisa ser Profissional (Comercial ou Criador).</p>
  </div>
</body></html>`);
};
