/**
 * Renderiza o card do pré-lançamento da Exata nos dois formatos:
 * exata-prelancamento-4x5.jpg (1080x1350) e exata-prelancamento-1x1.jpg (1080x1080).
 * Fora deste ambiente, aponte CHROME para o executável do Chromium se o launch padrão falhar.
 */
const { chromium } = require("playwright");
const path = require("path");

(async () => {
  const browser = await chromium.launch({
    ...(process.env.CHROME ? { executablePath: process.env.CHROME } : {}),
    args: ["--allow-file-access-from-files"],
  });
  const page = await browser.newPage({ viewport: { width: 1080, height: 2600 }, deviceScaleFactor: 1 });
  await page.goto("file://" + path.resolve(__dirname, "../templates/exata-prelancamento.html"), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  for (const [id, nome] of [["f45", "4x5"], ["f11", "1x1"]]) {
    const out = path.join(__dirname, `exata-prelancamento-${nome}.jpg`);
    await page.locator("#" + id).screenshot({ path: out, type: "jpeg", quality: 90 });
    console.log("ok:", out);
  }
  await browser.close();
})();
