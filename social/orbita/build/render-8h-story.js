/**
 * Renderiza o post das 8h (feed 4:5, 1080x1350) com o retrato do acervo.
 */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const FOTO = path.resolve(__dirname, "../../acervo/retrato-sofa-perto.jpg");
const OUT = path.join(__dirname, "post-8h-story.jpg");

(async () => {
  if (!fs.existsSync(FOTO)) {
    console.error(`falta a foto em ${FOTO}`);
    process.exit(1);
  }
  const browser = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    args: ["--allow-file-access-from-files"],
  });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto("file://" + path.join(ROOT, "templates", "post-8h-story.html"));
  await page.waitForTimeout(1200);
  await page.locator(".card").screenshot({ path: OUT, type: "jpeg", quality: 92 });
  await browser.close();
  console.log("ok:", OUT);
})();
