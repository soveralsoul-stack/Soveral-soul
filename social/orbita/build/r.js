const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport:{width:1080,height:1350}, deviceScaleFactor:1 });
  await p.goto('file://' + path.resolve('ed.html'), { waitUntil:'networkidle' });
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(1200);
  const secs = await p.$$('section.s');
  console.log('sections:', secs.length);
  for (let i=0;i<secs.length;i++){
    const n = String(i+1).padStart(2,'0');
    await secs[i].screenshot({ path:`orbita-ed01-${n}.jpg`, type:'jpeg', quality:90 });
    console.log('ok', n);
  }
  await b.close();
})();
