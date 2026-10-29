/**
 * Renderiza o card do pré-lançamento da Exata em cada variante de faixa
 * (laranja e dourado) e em cada formato:
 * exata-prelancamento-<faixa>-4x5.jpg (1080x1350) e -1x1.jpg (1080x1080).
 * Fora deste ambiente, aponte CHROME para o executável do Chromium se o launch padrão falhar.
 */
const { chromium } = require("playwright");
const path = require("path");

const FAIXAS = ["laranja", "dourado"];
const FORMATOS = [["f45", "4x5"], ["f11", "1x1"]];

(async () => {
  const browser = await chromium.launch({
    ...(process.env.CHROME ? { executablePath: process.env.CHROME } : {}),
    args: ["--allow-file-access-from-files"],
  });
  const page = await browser.newPage({ viewport: { width: 1080, height: 2600 }, deviceScaleFactor: 1 });
  await page.goto("file://" + path.resolve(__dirname, "../templates/exata-prelancamento.html"), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  for (const faixa of FAIXAS) {
    await page.evaluate((f) => { document.body.dataset.faixa = f; }, faixa);
    await page.waitForTimeout(400);
    for (const [id, nome] of FORMATOS) {
      const out = path.join(__dirname, `exata-prelancamento-${faixa}-${nome}.jpg`);
      await page.locator("#" + id).screenshot({ path: out, type: "jpeg", quality: 90 });
      console.log("ok:", out);
    }
  }
  await browser.close();
})();
