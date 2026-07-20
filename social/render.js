const { chromium } = require('playwright');
const EXE='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const base='file:///home/user/Soveral-soul/social/';
const out='/home/user/Soveral-soul/out/';

async function ready(page){
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(img => img.complete ? 0 : new Promise(r=>{img.onload=img.onerror=r;})));
  });
  await page.waitForTimeout(200);
}

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  // --- card em 3 formatos ---
  const cards = [
    { f:'feed',   w:1080, h:1350, file:'card-feed-4x5.png' },
    { f:'square', w:1080, h:1080, file:'card-square-1x1.png' },
    { f:'story',  w:1080, h:1920, file:'card-story-9x16.png' },
  ];
  for (const c of cards){
    const page = await browser.newPage({ viewport:{width:c.w,height:c.h}, deviceScaleFactor:2 });
    await page.goto(base+'card.html?f='+c.f, { waitUntil:'load' });
    await ready(page);
    const el = await page.$('.slide');
    await el.screenshot({ path: out+c.file });
    await page.close();
    console.log('card', c.file);
  }
  // --- carrossel: 4 slides ---
  const page = await browser.newPage({ viewport:{width:1080,height:1350}, deviceScaleFactor:2 });
  await page.goto(base+'carousel.html', { waitUntil:'load' });
  await ready(page);
  for (let i=1;i<=4;i++){
    const el = await page.$('#s'+i);
    await el.screenshot({ path: out+'carousel-'+i+'.png' });
    console.log('carousel', i);
  }
  await browser.close();
  console.log('DONE');
})().catch(e=>{console.error(e);process.exit(1)});
