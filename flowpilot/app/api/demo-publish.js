/**
 * "Publish now" de um post da fila da demo: o mesmo caminho do agendador, sem
 * esperar o horário. Endpoint público, por isso estritamente limitado:
 *   - só a sessão do navegador que conectou a conta (ver demo-auth.js);
 *   - só itens que o próprio usuário colocou na fila pelo compositor;
 *   - rate limit de 1 publicação por minuto.
 */
const { resolveClient, rateLimit } = require("../lib");
const { publishQueued } = require("../publisher");
const { DEMO_CLIENT, demoAccount } = require("../demo-auth");

module.exports = async (req, res) => {
  const back = (params) => {
    res.writeHead(302, { Location: `/demo?${new URLSearchParams(params).toString()}` });
    res.end();
  };
  if (req.method !== "POST") return back({});

  try {
    const acc = await demoAccount(req);
    if (!acc || acc.other) return back({ error: "No account connected in this browser. Please connect Instagram first." });

    const itemId = String((req.body || {}).item || "");
    const client = await resolveClient(DEMO_CLIENT);
    const item = (client?.queue || []).find((q) => q.id === itemId);
    if (!item) return back({ error: "That post is no longer in the schedule." });
    if (item.status === "published") return back({ published: item.id });

    const ok = await rateLimit(`demo:publish:${acc.userId}`, 60);
    if (!ok) return back({ error: "Please wait a minute before publishing again." });

    const r = await publishQueued({ ...client, igUserId: String(acc.userId) }, acc.token, item);
    return back({ published: item.id, ...(r.skipped ? {} : { media: r.mediaId }) });
  } catch (e) {
    return back({ error: (e.message || "publish failed").slice(0, 200) });
  }
};
