/**
 * Renderiza o card do pré-lançamento da Exata com a faixa dourada (a escolhida)
 * em cada variante de selo do MCMV (laranja e dourado) e em cada formato:
 * exata-prelancamento-selo-<selo>-4x5.jpg (1080x1350) e -1x1.jpg (1080x1080).
 * Fora deste ambiente, aponte CHROME para o executável do Chromium se o launch padrão falhar.
 */
const { chromium } = require("playwright");
const path = require("path");

const FAIXA = "dourado";
const SELOS = ["laranja", "dourado"];
const FORMATOS = [["f45", "4x5"], ["f11", "1x1"]];

(async () => {
  const browser = await chromium.launch({
    ...(process.env.CHROME ? { executablePath: process.env.CHROME } : {}),
    args: ["--allow-file-access-from-files"],
  });
  const page = await browser.newPage({ viewport: { width: 1080, height: 2600 }, deviceScaleFactor: 1 });
  await page.goto("file://" + path.resolve(__dirname, "../templates/exata-prelancamento.html"), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  for (const selo of SELOS) {
    await page.evaluate(([f, s]) => { document.body.dataset.faixa = f; document.body.dataset.selo = s; }, [FAIXA, selo]);
    await page.waitForTimeout(400);
    for (const [id, nome] of FORMATOS) {
      const out = path.join(__dirname, `exata-prelancamento-selo-${selo}-${nome}.jpg`);
      await page.locator("#" + id).screenshot({ path: out, type: "jpeg", quality: 90 });
      console.log("ok:", out);
    }
  }
  await browser.close();
})();
