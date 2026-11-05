/**
 * Desconecta a conta ligada em /demo e volta para a tela inicial.
 * Endpoint publico, mas so mexe no cliente "reviewer" e so a pedido do navegador
 * que conectou a conta: apaga o token, a fila e as imagens dela.
 * Existe para que o revisor da Meta nunca herde a conta de quem testou antes.
 */
const { kvGet, kvDel } = require("../lib");
const { DEMO_CLIENT, COOKIE, demoAccount } = require("../demo-auth");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.writeHead(302, { Location: "/demo" });
    return res.end();
  }
  try {
    const acc = await demoAccount(req);
    if (acc && !acc.other) {
      const raw = await kvGet(`client:${DEMO_CLIENT}`);
      const queue = raw ? JSON.parse(raw).queue || [] : [];
      for (const q of queue) await kvDel(`media:${q.id}`);
      await kvDel(`igtoken:client:${DEMO_CLIENT}`);
      await kvDel(`client:${DEMO_CLIENT}`);
    }
  } catch { /* segue: a tela inicial aparece de qualquer jeito se o token sumiu */ }
  res.writeHead(302, {
    Location: "/demo?reset=1",
    "Set-Cookie": `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
  });
  res.end();
};
