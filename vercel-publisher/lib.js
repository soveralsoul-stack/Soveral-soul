// Biblioteca compartilhada do publisher multi-cliente.
const CLIENTS = require("./clients");

/** Resolve a config do cliente + o token (do env apontado por tokenEnv). */
function resolveClient(id) {
  const c = CLIENTS[id];
  if (!c) return null;
  const token = process.env[c.tokenEnv] || process.env.IG_ACCESS_TOKEN;
  return { ...c, token };
}

function defaultClientId() {
  return process.env.DEFAULT_CLIENT || "soveralsoul";
}

/** Autoriza a chamada (PUBLISH_SECRET via ?key= ou Authorization Bearer). */
function authOk(req) {
  const q = req.query || {};
  const secret = process.env.PUBLISH_SECRET;
  const auth = (req.headers.authorization || "").replace("Bearer ", "");
  return !!secret && (q.key === secret || auth === secret || auth === process.env.CRON_SECRET);
}

/** Dedup opcional via Upstash Redis (SET key 1 EX ttl NX). Chave inclui o cliente. */
async function markOnce(key) {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const tok = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !tok) return { enabled: false, fresh: true };
  const r = await fetch(`${url}/set/${encodeURIComponent(key)}/1/EX/691200/NX`, {
    headers: { Authorization: `Bearer ${tok}` },
  });
  const j = await r.json().catch(() => ({}));
  return { enabled: true, fresh: j.result === "OK" };
}

function dedupOn() {
  return !!(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL);
}

/** Chave de semana ISO (permite repetir a agenda em semanas seguintes). */
function weekKey(localNow) {
  const d = new Date(Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth(), localNow.getUTCDate()));
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day + 3);
  const firstThu = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((d - firstThu) / 86400000 - 3 + ((firstThu.getUTCDay() + 6) % 7)) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

/** Instante UTC (ms) do horário-alvo desta semana, no fuso do cliente. */
function targetMs(dow, timeStr, offsetHours, localNow) {
  const [hh, mm] = timeStr.split(":").map(Number);
  const curDow = (localNow.getUTCDay() + 6) % 7 + 1;
  const delta = dow - curDow;
  const local = Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth(), localNow.getUTCDate() + delta, hh, mm, 0);
  return local - offsetHours * 3600e3;
}

module.exports = { resolveClient, defaultClientId, authOk, markOnce, dedupOn, weekKey, targetMs };
