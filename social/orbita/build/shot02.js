const { chromium } = require('playwright');
const path=require('path');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:.4});
  for(const n of [1,2,4,5,6,7]){
    await p.goto('file://'+path.resolve('templates/ed02-stories.html')+'?s='+n,{waitUntil:'networkidle'});
    await p.evaluate(()=>document.fonts.ready);
    await p.waitForTimeout(600);
    await p.evaluate(()=>document.getAnimations().forEach(a=>{a.currentTime=8000;a.pause();}));
    await p.screenshot({path:`build/chk-${n}.png`});
  }
  await b.close();console.log('ok');
})();
