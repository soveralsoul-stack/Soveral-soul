/**
 * Renderiza o post de Dia dos Pais (feed 4:5, 1080x1350).
 * Depende de build/pais-foto.jpg (a foto enviada pelo Rodrigo).
 */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const FOTO = path.join(__dirname, "pais-foto.jpg");
const OUT = path.join(__dirname, "pais-dia-dos-pais.jpg");

(async () => {
  if (!fs.existsSync(FOTO)) {
    console.error(`falta a foto em ${FOTO}`);
    process.exit(1);
  }
  const browser = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    args: ["--allow-file-access-from-files"],
  });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.goto("file://" + path.join(ROOT, "templates", "pais.html"));
  await page.waitForTimeout(1200);
  await page.locator(".card").screenshot({ path: OUT, type: "jpeg", quality: 92 });
  await browser.close();
  console.log("ok:", OUT);
})();
