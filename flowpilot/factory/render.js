// Fábrica de posts: lê listings.json e renderiza 1 card por item (data-driven).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const items = JSON.parse(fs.readFileSync(path.join(__dirname, 'listings.json'), 'utf8'));
(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  for (let i = 0; i < items.length; i++) {
    const b64 = Buffer.from(JSON.stringify(items[i]), 'utf8').toString('base64');
    const url = 'file://' + path.join(__dirname, 'imovel.html') + '?d=' + encodeURIComponent(b64);
    const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: 'load' });
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(im=>im.complete?0:new Promise(r=>{im.onload=im.onerror=r;}))); });
    await page.waitForTimeout(250);
    const out = path.join('/home/user/Soveral-soul/out', `factory-imovel-${i}.png`);
    await page.screenshot({ path: out });
    await page.close();
    console.log('render', out);
  }
  await browser.close(); console.log('DONE');
})().catch(e => { console.error(e); process.exit(1); });
