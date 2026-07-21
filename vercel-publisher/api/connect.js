/**
 * Página "Conectar Instagram" (landing do onboarding).
 *   https://SEU-APP.vercel.app/api/connect?client=<slug>
 * O botão leva para /api/oauth/start, que redireciona pro login do Instagram.
 */
module.exports = async (req, res) => {
  const client = (req.query && req.query.client) || "";
  const start = `/api/oauth/start${client ? `?client=${encodeURIComponent(client)}` : ""}`;
  res.setHeader("content-type", "text/html; charset=utf-8");
  res.end(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Conectar Instagram · SoveralSoul</title>
<style>
  *{margin:0;box-sizing:border-box} body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
    background:radial-gradient(120% 60% at 50% 0%,#101528,#06080f);color:#e8eef8;min-height:100vh;
    display:flex;align-items:center;justify-content:center;padding:24px}
  .box{max-width:460px;text-align:center;background:rgba(255,255,255,.03);border:1px solid #1a2240;
    border-radius:16px;padding:44px 34px}
  h1{font-size:1.7rem;margin-bottom:10px} p{color:#9fb0c9;line-height:1.6}
  .btn{display:inline-flex;align-items:center;gap:10px;margin-top:26px;background:#2d8fff;color:#04101f;
    font-weight:700;text-decoration:none;padding:16px 26px;border-radius:10px;font-size:1.05rem}
  .small{margin-top:20px;font-size:.85rem;color:#61728e}
</style></head><body>
  <div class="box">
    <h1>Conectar seu Instagram</h1>
    <p>Autorize a SoveralSoul a publicar os posts na sua conta, nos horários combinados.
    Você pode revogar quando quiser nas configurações do Instagram.</p>
    <a class="btn" href="${start}">Conectar Instagram</a>
    <p class="small">Sua conta precisa ser Profissional (Comercial ou Criador).</p>
  </div>
</body></html>`);
};
