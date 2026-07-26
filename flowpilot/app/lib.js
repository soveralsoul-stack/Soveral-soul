// Biblioteca compartilhada do publisher multi-cliente.
const CLIENTS = require("./clients");

// ---------- Upstash Redis (REST) ----------
function kvCreds() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const tok = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && tok ? { url, tok } : null;
}
function dedupOn() { return !!kvCreds(); }

async function kvSet(key, value) {
  const c = kvCreds(); if (!c) return false;
  const r = await fetch(c.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${c.tok}`, "Content-Type": "application/json" },
    body: JSON.stringify(["SET", key, value]),
  });
  const j = await r.json().catch(() => ({}));
  return j.result === "OK";
}
async function kvGet(key) {
  const c = kvCreds(); if (!c) return null;
  const r = await fetch(c.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${c.tok}`, "Content-Type": "application/json" },
    body: JSON.stringify(["GET", key]),
  });
  const j = await r.json().catch(() => ({}));
  return j.result ?? null;
}
async function kvDel(key) {
  const c = kvCreds(); if (!c) return 0;
  const r = await fetch(c.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${c.tok}`, "Content-Type": "application/json" },
    body: JSON.stringify(["DEL", key]),
  });
  const j = await r.json().catch(() => ({}));
  return j.result || 0;
}

/** SET key 1 EX 8d NX — dedup (retorna {fresh:true} se marcou agora). */
async function markOnce(key) {
  const c = kvCreds(); if (!c) return { enabled: false, fresh: true };
  const r = await fetch(`${c.url}/set/${encodeURIComponent(key)}/1/EX/691200/NX`, {
    headers: { Authorization: `Bearer ${c.tok}` },
  });
  const j = await r.json().catch(() => ({}));
  return { enabled: true, fresh: j.result === "OK" };
}

// ---------- Clientes ----------
// Estáticos: clients/*.json (no repo). Dinâmicos: registro no Upstash (client:<id>),
// criados via OAuth/onboarding, sem precisar de deploy.
async function resolveClient(id) {
  if (CLIENTS[id]) return { ...CLIENTS[id] };
  const rec = await kvGet(`client:${id}`);
  if (rec) { try { return JSON.parse(rec); } catch { return null; } }
  return null;
}
/** Cria/atualiza (merge) o registro de um cliente dinâmico no Upstash. */
async function saveClient(id, patch) {
  const existing = await kvGet(`client:${id}`);
  const base = existing ? JSON.parse(existing) : { id, timezoneOffsetHours: -3, windowHours: 6, brand: {}, schedule: [] };
  const merged = { ...base, ...patch, id };
  await kvSet(`client:${id}`, JSON.stringify(merged));
  return merged;
}
function defaultClientId() { return process.env.DEFAULT_CLIENT || "soveralsoul"; }

/** Token do cliente: 1) conectado via OAuth (Upstash), 2) fallback env. */
async function resolveToken(client) {
  const stored = await kvGet(`igtoken:client:${client.id}`);
  if (stored) { try { return JSON.parse(stored).token; } catch { return stored; } }
  return process.env[client.tokenEnv] || process.env.IG_ACCESS_TOKEN || null;
}

// ---------- Auth ----------
function authOk(req) {
  const q = req.query || {};
  const secret = process.env.PUBLISH_SECRET;
  const auth = (req.headers.authorization || "").replace("Bearer ", "");
  return !!secret && (q.key === secret || auth === secret || auth === process.env.CRON_SECRET);
}

// ---------- Horários ----------
function weekKey(localNow) {
  const d = new Date(Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth(), localNow.getUTCDate()));
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day + 3);
  const firstThu = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((d - firstThu) / 86400000 - 3 + ((firstThu.getUTCDay() + 6) % 7)) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}
function targetMs(dow, timeStr, offsetHours, localNow) {
  const [hh, mm] = timeStr.split(":").map(Number);
  const curDow = (localNow.getUTCDay() + 6) % 7 + 1;
  const delta = dow - curDow;
  const local = Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth(), localNow.getUTCDate() + delta, hh, mm, 0);
  return local - offsetHours * 3600e3;
}

module.exports = {
  kvSet, kvGet, kvDel, dedupOn, markOnce,
  resolveClient, saveClient, defaultClientId, resolveToken,
  authOk, weekKey, targetMs,
};
