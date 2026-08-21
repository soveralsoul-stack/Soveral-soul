const { chromium } = require('playwright');
const path=require('path'), fs=require('fs');
const FPS=30, DUR=9.0, N=Math.round(FPS*DUR);
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
  for(let s=1;s<=7;s++){
    const dir=`build/f${s}`; fs.mkdirSync(dir,{recursive:true});
    await p.goto('file://'+path.resolve('templates/ed03-stories.html')+'?s='+s,{waitUntil:'networkidle'});
    await p.evaluate(()=>document.fonts.ready);
    await p.waitForTimeout(700);
    await p.evaluate(()=>document.getAnimations().forEach(a=>a.pause()));
    for(let i=0;i<N;i++){
      await p.evaluate(ms=>document.getAnimations().forEach(a=>{a.currentTime=ms;}), i/FPS*1000);
      await p.screenshot({path:`${dir}/f${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:92});
    }
    console.log('story',s,'ok');
  }
  await b.close();
})();
