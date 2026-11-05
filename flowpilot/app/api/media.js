/**
 * Serve a imagem que o usuário enviou pelo compositor.
 *   https://www.flowpilot.app.br/m/<id>.jpg   (rewrite -> /api/media?id=<id>.jpg)
 *
 * O Instagram busca a mídia por URL pública na hora de criar o container, então a
 * imagem precisa estar acessível aqui até o post sair. Fica no Upstash em base64
 * (media:<id>) e expira sozinha alguns dias depois do horário agendado.
 */
const { kvGet } = require("../lib");

module.exports = async (req, res) => {
  const id = String((req.query || {}).id || "").replace(/\.jpg$/, "");
  if (!/^[a-z0-9]{12,40}$/.test(id)) return res.status(404).end("not found");
  const b64 = await kvGet(`media:${id}`);
  if (!b64) return res.status(404).end("not found");
  const buf = Buffer.from(b64, "base64");
  res.setHeader("content-type", "image/jpeg");
  res.setHeader("content-length", String(buf.length));
  res.setHeader("cache-control", "public, max-age=3600");
  res.end(buf);
};
