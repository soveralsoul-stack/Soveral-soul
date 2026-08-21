import asyncio, os, subprocess, sys
from playwright.async_api import async_playwright

BASE = "/home/claude/soveralsoul-carrossel"
FRAMES = f"{BASE}/frames2"
VIDEOS = f"{BASE}/videos"
FPS = 30
DUR = 9.0  # segundos

STORIES = [int(x) for x in sys.argv[1:]] or list(range(1, 11))

async def main():
    os.makedirs(VIDEOS, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width":1080,"height":1920}, device_scale_factor=1)
        for s in STORIES:
            fdir = f"{FRAMES}/{s:02d}"
            os.makedirs(fdir, exist_ok=True)
            await pg.goto(f"file://{BASE}/stories2.html?s={s}")
            await pg.evaluate("document.fonts.ready")
            await pg.wait_for_timeout(300)
            # pausa todas as animações
            await pg.evaluate("document.getAnimations().forEach(a=>{a.pause();})")
            n = int(FPS*DUR)
            for f in range(n):
                t = f*1000.0/FPS
                await pg.evaluate(f"document.getAnimations().forEach(a=>{{a.currentTime={t};}})")
                await pg.screenshot(path=f"{fdir}/f{f:04d}.jpg", type="jpeg", quality=90)
            # monta o vídeo
            subprocess.run([
                "ffmpeg","-y","-framerate",str(FPS),"-i",f"{fdir}/f%04d.jpg",
                "-c:v","libx264","-pix_fmt","yuv420p","-crf","18","-preset","medium",
                "-movflags","+faststart",
                f"{VIDEOS}/soveralsoul-story-v2-{s:02d}.mp4"
            ], check=True, capture_output=True)
            import shutil; shutil.rmtree(fdir); print("story", s, "ok")
        await b.close()

asyncio.run(main())
