/**
 * Tira um post ainda não publicado da fila da demo e apaga a imagem dele.
 * Só a sessão do navegador que conectou a conta (ver demo-auth.js).
 */
const { kvGet, kvSet, kvDel } = require("../lib");
const { DEMO_CLIENT, demoAccount } = require("../demo-auth");

module.exports = async (req, res) => {
  const back = (params) => {
    res.writeHead(302, { Location: `/demo?${new URLSearchParams(params).toString()}` });
    res.end();
  };
  if (req.method !== "POST") return back({});
  try {
    const acc = await demoAccount(req);
    if (!acc || acc.other) return back({ error: "No account connected in this browser." });
    const itemId = String((req.body || {}).item || "");
    const raw = await kvGet(`client:${DEMO_CLIENT}`);
    const rec = raw ? JSON.parse(raw) : {};
    const item = (rec.queue || []).find((q) => q.id === itemId);
    if (!item) return back({});
    if (item.status === "published") return back({ error: "This post is already live. Delete it on Instagram." });
    rec.queue = rec.queue.filter((q) => q.id !== itemId);
    await kvSet(`client:${DEMO_CLIENT}`, JSON.stringify(rec));
    await kvDel(`media:${itemId}`);
    return back({ removed: "1" });
  } catch (e) {
    return back({ error: (e.message || "remove failed").slice(0, 200) });
  }
};
