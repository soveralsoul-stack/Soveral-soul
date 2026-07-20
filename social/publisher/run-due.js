/**
 * Agendador "cron-friendly": a cada execução, verifica o schedule.json e publica
 * o que já está na hora (dentro da janela) e ainda não foi publicado nesta semana.
 * Rode via cron (ex.: a cada 10 min). Estado em state.json evita duplicar.
 *
 * Variáveis de ambiente (use um .env / secrets — NUNCA comite o token):
 *   IG_USER_ID        id numérico da conta IG Business (ex.: 1784xxxxxxxxxxx)
 *   IG_ACCESS_TOKEN   token de longa duração com instagram_content_publish
 *   MEDIA_BASE_URL    URL pública base das mídias (ex.: https://soveralsoul.com.br/posts)
 *   DRY_RUN=1         (opcional) só simula, não publica
 */
const fs = require("fs");
const path = require("path");
const { publishItem } = require("./ig");

const DIR = __dirname;
const SCHEDULE = JSON.parse(fs.readFileSync(path.join(DIR, "schedule.json"), "utf8"));
const STATE_PATH = path.join(DIR, "state.json");

const { IG_USER_ID, IG_ACCESS_TOKEN, MEDIA_BASE_URL, DRY_RUN } = process.env;
const dry = DRY_RUN === "1" || process.argv.includes("--dry");

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_PATH, "utf8")); } catch { return {}; }
}
function saveState(s) { fs.writeFileSync(STATE_PATH, JSON.stringify(s, null, 2)); }

// chave da semana ISO (para permitir repetir a programação em semanas seguintes)
function weekKey(localNow) {
  const d = new Date(Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth(), localNow.getUTCDate()));
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day + 3);
  const firstThu = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((d - firstThu) / 86400000 - 3 + ((firstThu.getUTCDay() + 6) % 7)) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

// instante UTC (ms) do horário-alvo desta semana, no fuso configurado
function targetMs(dow, timeStr, offsetHours, localNow) {
  const [hh, mm] = timeStr.split(":").map(Number);
  const curDow = (localNow.getUTCDay() + 6) % 7 + 1; // 1=Seg..7=Dom
  const delta = dow - curDow;
  const localTarget = Date.UTC(
    localNow.getUTCFullYear(), localNow.getUTCMonth(), localNow.getUTCDate() + delta, hh, mm, 0
  );
  return localTarget - offsetHours * 3600e3; // volta p/ UTC real
}

async function main() {
  if (!dry && (!IG_USER_ID || !IG_ACCESS_TOKEN || !MEDIA_BASE_URL)) {
    console.error("Faltam IG_USER_ID, IG_ACCESS_TOKEN e/ou MEDIA_BASE_URL. Use --dry para simular.");
    process.exit(1);
  }
  const offset = SCHEDULE.timezoneOffsetHours ?? -3;
  const windowMs = (SCHEDULE.windowHours ?? 6) * 3600e3;
  const now = Date.now();
  const localNow = new Date(now + offset * 3600e3);
  const wk = weekKey(localNow);

  const state = loadState();
  state[wk] = state[wk] || {};

  const base = (MEDIA_BASE_URL || "https://EXEMPLO/posts").replace(/\/$/, "");

  for (const item of SCHEDULE.items) {
    if (state[wk][item.id]) continue; // já publicado nesta semana
    const t = targetMs(item.dow, item.time, offset, localNow);
    const due = now >= t && now <= t + windowMs;
    if (!due) continue;

    const urls = item.media.map((m) => `${base}/${m}`);
    const isVideo = item.media[0].toLowerCase().endsWith(".mp4");
    console.log(`▶ ${item.id} (${item.type}) — publicando…`);
    console.log(`  mídia: ${urls.join(", ")}`);

    if (dry) { console.log("  [DRY_RUN] não publicado."); continue; }

    try {
      const mediaId = await publishItem({
        igId: IG_USER_ID, token: IG_ACCESS_TOKEN,
        type: item.type, urls, caption: item.caption || "", isVideo,
      });
      state[wk][item.id] = { mediaId, at: new Date().toISOString() };
      saveState(state);
      console.log(`  ✅ publicado. mediaId=${mediaId}`);
    } catch (e) {
      console.error(`  ❌ falhou: ${e.message}`);
    }
  }
  console.log("Concluído.");
}

main();
