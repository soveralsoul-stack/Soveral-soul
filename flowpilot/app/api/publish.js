/**
 * Publicação manual / de teste de um cliente.
 *   /api/publish?key=SECRET                 → publica o que está na hora (cliente padrão)
 *   /api/publish?key=SECRET&client=labela   → idem, para um cliente específico
 *   /api/publish?key=SECRET&id=<id>         → publica UM item agora (ignora horário)
 *   &dry=1                                  → simula, não publica
 *
 * A rotina automática vive em /api/cron (agendador nativo da Vercel), que roda
 * para TODOS os clientes sem ninguém precisar configurar cron externo.
 */
const { resolveClient, defaultClientId, resolveToken, authOk } = require("../lib");
const { publishOne, publishDue } = require("../publisher");

module.exports = async (req, res) => {
  const q = req.query || {};
  if (!authOk(req)) return res.status(401).json({ error: "unauthorized" });

  const clientId = q.client || defaultClientId();
  const client = await resolveClient(clientId);
  if (!client) return res.status(404).json({ error: `cliente "${clientId}" não encontrado` });
  const token = await resolveToken(client);
  if (!client.igUserId || !token || !client.mediaBaseUrl) {
    return res.status(500).json({ error: `cliente "${clientId}" sem igUserId/token/mediaBaseUrl` });
  }

  const dry = q.dry === "1" || q.dry === "true";

  try {
    // modo teste: publica UM item específico agora
    if (q.id) {
      const item = (client.schedule || []).find((i) => i.id === q.id);
      if (!item) return res.status(404).json({ error: `item ${q.id} não encontrado em ${clientId}` });
      return res.status(200).json({
        client: clientId, mode: "one",
        result: await publishOne(client, token, item, { dry }),
      });
    }
    // modo normal: publica o que está na hora
    const out = await publishDue(client, token, { dry });
    return res.status(200).json({ client: clientId, mode: "due", ...out });
  } catch (e) {
    return res.status(500).json({ client: clientId, error: e.message });
  }
};
