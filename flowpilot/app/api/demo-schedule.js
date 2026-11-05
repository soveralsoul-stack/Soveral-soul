/**
 * Compositor da demo: recebe o post que o usuário montou em /demo e coloca na fila.
 *   POST /api/demo-schedule  { type: "image"|"story", image: <JPEG em base64>, caption, at: ISO }
 *
 * A imagem já chega redimensionada e em JPEG (o navegador faz isso antes de enviar).
 * Só aceita a sessão do navegador que conectou a conta (ver demo-auth.js), então
 * ninguém agenda nada na conta de outra pessoa.
 */
const crypto = require("crypto");
const { kvSetEx, kvGet, kvSet, rateLimit } = require("../lib");
const { DEMO_CLIENT, demoAccount, hostOf } = require("../demo-auth");

const MAX_B64 = 1400000;       // ~1 MB de JPEG; o navegador mira bem abaixo disso
const MAX_QUEUE = 12;          // itens guardados na fila da demo (publicados saem primeiro)
const MAX_AHEAD_MS = 14 * 86400e3;

const fail = (res, status, error) => res.status(status).json({ ok: false, error });

module.exports = async (req, res) => {
  if (req.method !== "POST") return fail(res, 405, "Use POST.");
  const acc = await demoAccount(req);
  if (!acc || acc.other) return fail(res, 401, "Connect your Instagram account first.");

  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const type = b.type === "story" ? "story" : b.type === "image" ? "image" : null;
  if (!type) return fail(res, 400, "Choose a format: feed post or story.");

  const image = String(b.image || "").replace(/^data:image\/jpeg;base64,/, "");
  if (!image) return fail(res, 400, "Add an image.");
  if (image.length > MAX_B64) return fail(res, 413, "Image too large. Try a smaller one.");
  const buf = Buffer.from(image, "base64");
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return fail(res, 400, "The image must be a JPEG.");

  const caption = type === "story" ? "" : String(b.caption || "").trim();
  if (caption.length > 2200) return fail(res, 400, "Caption is longer than 2,200 characters.");
  if ((caption.match(/#/g) || []).length > 30) return fail(res, 400, "Instagram allows at most 30 hashtags.");

  const at = Date.parse(b.at);
  const now = Date.now();
  if (!Number.isFinite(at)) return fail(res, 400, "Pick a date and time.");
  if (at < now - 5 * 60e3) return fail(res, 400, "That time is in the past.");
  if (at > now + MAX_AHEAD_MS) return fail(res, 400, "The demo schedules up to 14 days ahead.");

  if (!(await rateLimit(`demo:schedule:${acc.userId}`, 5))) {
    return fail(res, 429, "Please wait a few seconds and try again.");
  }

  const id = crypto.randomBytes(12).toString("hex");
  const raw = await kvGet(`client:${DEMO_CLIENT}`);
  const rec = raw ? JSON.parse(raw) : { id: DEMO_CLIENT, windowHours: 6 };
  const item = {
    id, type, caption, at: new Date(at).toISOString(),
    url: `https://${hostOf(req)}/m/${id}.jpg`,
    status: "scheduled", createdAt: new Date(now).toISOString(),
  };
  let queue = [...(rec.queue || []), item];
  // fila cheia: descarta primeiro os mais antigos que já saíram (ou falharam)
  while (queue.length > MAX_QUEUE) {
    const i = queue.findIndex((q) => q.status !== "scheduled");
    if (i < 0) return fail(res, 400, `The demo holds up to ${MAX_QUEUE} scheduled posts. Remove one first.`);
    queue.splice(i, 1);
  }
  // a mídia vive até 3 dias depois do horário agendado (tempo de sobra pro cron)
  const saved = await kvSetEx(`media:${id}`, image, (at - now) / 1000 + 3 * 86400);
  if (!saved) return fail(res, 500, "Could not store the image. Please try again.");
  await kvSet(`client:${DEMO_CLIENT}`, JSON.stringify({ ...rec, queue }));
  return res.status(200).json({ ok: true, item });
};
