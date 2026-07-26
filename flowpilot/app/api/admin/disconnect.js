/**
 * Desconecta um cliente: apaga o token OAuth guardado (e, opcionalmente, o registro).
 *   GET /api/admin/disconnect?key=SECRET&client=<id>            → apaga só o token
 *   GET /api/admin/disconnect?key=SECRET&client=<id>&record=1   → apaga token + registro dinâmico
 *
 * Observação: isto NÃO revoga a autorização do lado do Instagram — o usuário faz
 * isso nas configurações do Instagram (Central de Contas > Permissões de sites).
 * Aqui cumprimos a nossa parte da política: remover o token dos nossos servidores.
 */
const { kvDel } = require("../../lib");

function adminOk(req) {
  const key = (req.query && req.query.key) || (req.headers.authorization || "").replace("Bearer ", "");
  const secret = process.env.ADMIN_SECRET || process.env.PUBLISH_SECRET;
  return !!secret && key === secret;
}

module.exports = async (req, res) => {
  if (!adminOk(req)) return res.status(401).json({ error: "unauthorized" });
  const clientId = req.query && req.query.client;
  if (!clientId) return res.status(400).json({ error: "faltou ?client=<id>" });

  const tokenDeleted = await kvDel(`igtoken:client:${clientId}`);
  let recordDeleted = 0;
  if (req.query.record === "1" || req.query.record === "true") {
    recordDeleted = await kvDel(`client:${clientId}`);
  }
  return res.status(200).json({
    ok: true,
    client: clientId,
    token_apagado: tokenDeleted > 0,
    registro_apagado: recordDeleted > 0,
    lembrete: "Revogue tambem no Instagram: Central de Contas > Permissoes de sites/apps.",
  });
};
