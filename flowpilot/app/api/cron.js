/**
 * Agendador do FlowPilot — roda sozinho pelo cron nativo da Vercel (ver vercel.json).
 *
 * Percorre TODOS os clientes (estáticos e conectados via OAuth) e publica o que
 * está na hora de cada um. O cliente nunca configura nada: conecta o Instagram,
 * preenche a agenda no painel, e a publicação acontece.
 *
 * Autenticação: a Vercel envia "Authorization: Bearer $CRON_SECRET" nas chamadas
 * agendadas; authOk() aceita esse valor (ou o PUBLISH_SECRET, para disparo manual).
 */
const { listClientIds, resolveClient, resolveToken, authOk } = require("../lib");
const { publishDue } = require("../publisher");

module.exports = async (req, res) => {
  if (!authOk(req)) return res.status(401).json({ error: "unauthorized" });
  const dry = req.query && (req.query.dry === "1" || req.query.dry === "true");

  const started = Date.now();
  const resumo = [];
  let ids = [];
  try {
    ids = await listClientIds();
  } catch (e) {
    return res.status(500).json({ error: `falha ao listar clientes: ${e.message}` });
  }

  for (const id of ids) {
    try {
      const client = await resolveClient(id);
      if (!client) { resumo.push({ client: id, skip: "registro não encontrado" }); continue; }
      const token = await resolveToken(client);
      // cliente ainda incompleto (não conectou o IG ou não preencheu a agenda): ignora em silêncio
      if (!client.igUserId || !token || !client.mediaBaseUrl) {
        resumo.push({ client: id, skip: "sem igUserId/token/mediaBaseUrl" });
        continue;
      }
      if (!(client.schedule || []).length) { resumo.push({ client: id, skip: "agenda vazia" }); continue; }

      const out = await publishDue(client, token, { dry });
      resumo.push({
        client: id,
        publicados: out.published.map((p) => p.id),
        pulados: out.skipped,
        erros: out.errors,
      });
    } catch (e) {
      // um cliente com problema nunca pode derrubar a rodada dos outros
      resumo.push({ client: id, erro: e.message });
    }
  }

  const publicados = resumo.reduce((n, r) => n + ((r.publicados || []).length), 0);
  return res.status(200).json({
    ok: true,
    dry: !!dry,
    clientes: ids.length,
    publicados,
    ms: Date.now() - started,
    resumo,
  });
};
