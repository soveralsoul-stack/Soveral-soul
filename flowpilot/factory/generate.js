/**
 * Gera cards de um CLIENTE usando o brand kit do config dele.
 * A marca vem de app/clients/<id>.json (mesma fonte do publisher).
 *
 * Uso:
 *   node factory/generate.js --client imoveispro --template imovel
 *   node factory/generate.js --client imoveispro --template imovel --listings factory/listings-imoveispro.json
 */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i >= 0 ? process.argv[i + 1] : d; };

const clientId = arg('client', 'imoveispro');
const template = arg('template', 'imovel');
const listingsFile = arg('listings', path.join(__dirname, `listings-${clientId}.json`));

const client = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'app', 'clients', `${clientId}.json`), 'utf8'));
const listings = JSON.parse(fs.readFileSync(listingsFile, 'utf8'));
const B = client.brand || {};

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  for (let i = 0; i < listings.length; i++) {
    const data = { ...listings[i],
      phone: B.phone, handle: B.handle, city: B.city,
      brand: { name: B.name, mark: B.mark, accent: B.accent, cta: B.cta, bg: B.bg, line: B.line } };
    const b64 = Buffer.from(JSON.stringify(data), 'utf8').toString('base64');
    const url = 'file://' + path.join(__dirname, template + '.html') + '?d=' + encodeURIComponent(b64);
    const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: 'load' });
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(im=>im.complete?0:new Promise(r=>{im.onload=im.onerror=r;}))); });
    await page.waitForTimeout(250);
    const out = `/home/user/Soveral-soul/out/gen-${clientId}-${i}.png`;
    await page.screenshot({ path: out }); await page.close();
    console.log('gerado', out, '(marca:', clientId + ')');
  }
  await browser.close(); console.log('DONE');
})().catch(e => { console.error(e); process.exit(1); });
