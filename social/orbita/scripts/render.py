import asyncio, os
from playwright.async_api import async_playwright

OUT = "/home/claude/soveralsoul-carrossel/out"
os.makedirs(OUT, exist_ok=True)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width":1080,"height":1350}, device_scale_factor=2)
        await pg.goto("file:///home/claude/soveralsoul-carrossel/slides.html")
        await pg.wait_for_timeout(800)
        slides = await pg.locator("section.slide").all()
        for i, s in enumerate(slides, 1):
            await s.screenshot(path=f"{OUT}/slide-{i:02d}.png")
            print("ok", i)
        await b.close()

asyncio.run(main())
