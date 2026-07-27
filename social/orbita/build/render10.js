const { chromium } = require('playwright');
const path=require('path');
const FPS=30, DUR=9.0, N=Math.round(FPS*DUR);
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
  const url='file://'+path.resolve('templates/stories2-auto.html')+'?s=10';
  await p.goto(url,{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(800);
  await p.evaluate(()=>document.getAnimations().forEach(a=>a.pause()));
  for(let i=0;i<N;i++){
    const t=i/FPS*1000;
    await p.evaluate((ms)=>document.getAnimations().forEach(a=>{a.currentTime=ms;}), t);
    await p.screenshot({path:`build/frames/f${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:92});
  }
  await b.close(); console.log('frames:',N);
})();
