/**
 * Publica UM item do schedule.json AGORA (ignora o horário) — para teste
 * controlado ponta a ponta antes de confiar no cron.
 *
 * Uso:
 *   node --env-file=.env publish-one.js <id-do-item>
 *   node --env-file=.env publish-one.js --list         # lista os ids
 *   node --env-file=.env publish-one.js <id> --dry      # simula
 */
require("./loadenv");
const fs = require("fs");
const path = require("path");
const { publishItem } = require("./ig");

const SCHEDULE = JSON.parse(fs.readFileSync(path.join(__dirname, "schedule.json"), "utf8"));
const { IG_USER_ID, IG_ACCESS_TOKEN, MEDIA_BASE_URL, DRY_RUN } = process.env;

const args = process.argv.slice(2);
const dry = DRY_RUN === "1" || args.includes("--dry");
const id = args.find((a) => !a.startsWith("--"));

if (args.includes("--list") || !id) {
  console.log("Itens disponíveis:");
  for (const it of SCHEDULE.items) console.log(`  ${it.id}  (${it.type}, ${it.media.join(", ")})`);
  process.exit(0);
}

const item = SCHEDULE.items.find((i) => i.id === id);
if (!item) {
  console.error(`Item "${id}" não encontrado. Use --list para ver os ids.`);
  process.exit(1);
}

(async () => {
  if (!dry && (!IG_USER_ID || !IG_ACCESS_TOKEN || !MEDIA_BASE_URL)) {
    console.error("Faltam IG_USER_ID, IG_ACCESS_TOKEN e/ou MEDIA_BASE_URL.");
    process.exit(1);
  }
  const base = (MEDIA_BASE_URL || "https://EXEMPLO/posts").replace(/\/$/, "");
  const urls = item.media.map((m) => `${base}/${m}`);
  const isVideo = item.media[0].toLowerCase().endsWith(".mp4");
  console.log(`▶ ${item.id} (${item.type})`);
  console.log(`  mídia: ${urls.join(", ")}`);
  if (dry) { console.log("  [DRY_RUN] não publicado."); return; }
  try {
    const mediaId = await publishItem({
      igId: IG_USER_ID, token: IG_ACCESS_TOKEN, type: item.type, urls, caption: item.caption || "", isVideo,
    });
    console.log(`  ✅ publicado. mediaId=${mediaId}`);
  } catch (e) {
    console.error(`  ❌ falhou: ${e.message}`);
    process.exit(1);
  }
})();
