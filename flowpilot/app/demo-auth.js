/**
 * Sessão da demo (/demo). A conta conectada pela demo fica num cliente único,
 * "reviewer", e o compositor publica imagens quaisquer nela. Por isso cada conexão
 * amarra um cookie ao navegador que fez o login no Instagram: só esse navegador
 * vê a agenda e consegue agendar, publicar ou apagar. Quem abrir /demo de outro
 * lugar vê a tela de conectar, nunca a conta de outra pessoa.
 */
const crypto = require("crypto");
const { kvGet, readCookie } = require("./lib");

const DEMO_CLIENT = "reviewer";
const COOKIE = "fp_demo";

const hash = (v) => crypto.createHash("sha256").update(String(v)).digest("hex");

/** Gera a sessão no callback do OAuth: o cookie vai pro navegador, o hash pro Upstash. */
function newDemoSession() {
  const value = crypto.randomBytes(24).toString("base64url");
  return {
    hash: hash(value),
    cookie: `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 86400}`,
  };
}

/**
 * Conta conectada na demo, se for deste navegador.
 *   null              → ninguém conectado
 *   { other: true }   → há uma conta conectada, mas por outro navegador
 *   { token, userId, username } → a conta deste navegador
 */
async function demoAccount(req) {
  const raw = await kvGet(`igtoken:client:${DEMO_CLIENT}`);
  if (!raw) return null;
  let rec;
  try { rec = JSON.parse(raw); } catch { return null; }
  const mine = readCookie(req, COOKIE);
  if (!mine || !rec.sess) return { other: true };
  const a = Buffer.from(hash(mine)), b = Buffer.from(String(rec.sess));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return { other: true };
  return rec;
}

const hostOf = (req) => (req.headers["x-forwarded-host"] || req.headers.host || "").split(",")[0].trim();

module.exports = { DEMO_CLIENT, COOKIE, newDemoSession, demoAccount, hostOf };
