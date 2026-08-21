/**
 * Renderiza os frames do story em video (10s a 30fps).
 * As animacoes de CSS sao pausadas e avancadas na mao, frame a frame, para o
 * screenshot sair sempre no tempo exato.
 */
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const FPS = 30, DUR = 25.0, N = Math.round(FPS * DUR);
const DIR = path.join(__dirname, 'f8h');

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  fs.mkdirSync(DIR, { recursive: true });
  await p.goto('file://' + path.resolve(__dirname, '../templates/post-8h-story-video.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(700);
  await p.evaluate(() => document.getAnimations().forEach(a => a.pause()));
  for (let i = 0; i < N; i++) {
    await p.evaluate(ms => document.getAnimations().forEach(a => { a.currentTime = ms; }), i / FPS * 1000);
    await p.screenshot({ path: `${DIR}/f${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 });
  }
  await b.close();
  console.log('frames ok:', N);
})();
