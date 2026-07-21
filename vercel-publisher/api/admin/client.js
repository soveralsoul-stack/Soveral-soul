/**
 * Admin de clientes dinâmicos (sem deploy). Protegido por ADMIN_SECRET (ou PUBLISH_SECRET).
 *
 * Ver:   GET  /api/admin/client?key=SECRET&client=labela
 * Setar: POST /api/admin/client?key=SECRET&client=labela   (body JSON com os campos)
 *        body: { name, mediaBaseUrl, timezoneOffsetHours, windowHours, brand:{...}, schedule:[...] }
 *
 * Campos aceitos no patch (só o que vier é alterado):
 *   name, mediaBaseUrl, timezoneOffsetHours, windowHours, brand, schedule, niche
 */
const { resolveClient, saveClient } = require("../../lib");

function adminOk(req) {
  const key = (req.query && req.query.key) || (req.headers.authorization || "").replace("Bearer ", "");
  const secret = process.env.ADMIN_SECRET || process.env.PUBLISH_SECRET;
  return !!secret && key === secret;
}

const ALLOWED = ["name", "mediaBaseUrl", "timezoneOffsetHours", "windowHours", "brand", "schedule", "niche"];

module.exports = async (req, res) => {
  if (!adminOk(req)) return res.status(401).json({ error: "unauthorized" });
  const clientId = req.query && req.query.client;
  if (!clientId) return res.status(400).json({ error: "faltou ?client=<id>" });

  // ver registro (sem token)
  if (req.method !== "POST") {
    const c = await resolveClient(clientId);
    if (!c) return res.status(404).json({ error: `cliente "${clientId}" não encontrado` });
    return res.status(200).json({ client: c });
  }

  // aplicar patch
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};
  const patch = {};
  for (const k of ALLOWED) if (k in body) patch[k] = body[k];
  if (!Object.keys(patch).length) return res.status(400).json({ error: `nada pra atualizar. campos: ${ALLOWED.join(", ")}` });

  const merged = await saveClient(clientId, patch);
  return res.status(200).json({ ok: true, client: merged });
};
