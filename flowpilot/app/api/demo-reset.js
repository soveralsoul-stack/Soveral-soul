/**
 * Desconecta a conta ligada em /demo e volta para a tela inicial.
 * Endpoint publico, mas so mexe no cliente "reviewer": apaga o token e a agenda
 * de demonstracao dele. Nenhum outro cliente e alcancado por aqui.
 * Existe para que o revisor da Meta nunca herde a conta de quem testou antes.
 */
const { kvDel } = require("../lib");

const DEMO_CLIENT = "reviewer";

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.writeHead(302, { Location: "/demo" });
    return res.end();
  }
  try {
    await kvDel(`igtoken:client:${DEMO_CLIENT}`);
    await kvDel(`client:${DEMO_CLIENT}`);
  } catch { /* segue: a tela inicial aparece de qualquer jeito se o token sumiu */ }
  res.writeHead(302, { Location: "/demo?reset=1" });
  res.end();
};
