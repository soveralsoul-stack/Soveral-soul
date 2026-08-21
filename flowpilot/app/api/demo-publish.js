/**
 * Publica o post de teste na conta que o revisor conectou em /demo.
 * Endpoint público (sem segredo) — por isso é estritamente limitado:
 *   - só o cliente "reviewer" (a conta que o próprio revisor autorizou);
 *   - só a mídia fixa de teste (story-teste.jpg deste mesmo domínio);
 *   - rate limit de 1 publicação por minuto.
 * Ou seja: só consegue publicar na conta de quem acabou de dar consentimento.
 */
const { publishItem } = require("../ig");
const { kvGet, rateLimit } = require("../lib");

const DEMO_CLIENT = "reviewer";

module.exports = async (req, res) => {
  const back = (params) => {
    res.writeHead(302, { Location: `/demo?${new URLSearchParams(params).toString()}` });
    res.end();
  };

  try {
    const stored = await kvGet(`igtoken:client:${DEMO_CLIENT}`);
    if (!stored) return back({ error: "No account connected. Please connect Instagram first." });
    const { token, userId } = JSON.parse(stored);
    if (!token || !userId) return back({ error: "Connection incomplete. Please connect again." });

    const ok = await rateLimit(`demo:publish:${userId}`, 60);
    if (!ok) return back({ error: "Please wait a minute before publishing again." });

    const host = (req.headers["x-forwarded-host"] || req.headers.host || "").split(",")[0].trim();
    const mediaId = await publishItem({
      igId: userId,
      token,
      type: "story",
      urls: [`https://${host}/story-teste.jpg`],
      caption: "",
      isVideo: false,
    });
    return back({ published: "1", media: mediaId });
  } catch (e) {
    return back({ error: (e.message || "publish failed").slice(0, 200) });
  }
};
