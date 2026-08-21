/** Redireciona para o login/autorização do Instagram. */
const { authUrl } = require("../../oauth");
module.exports = async (req, res) => {
  if (!process.env.INSTAGRAM_APP_ID) {
    res.setHeader("content-type", "text/html; charset=utf-8");
    return res.status(500).end("<p>Falta configurar INSTAGRAM_APP_ID na Vercel.</p>");
  }
  const state = (req.query && req.query.client) || "";
  res.writeHead(302, { Location: authUrl(req, state) });
  res.end();
};
