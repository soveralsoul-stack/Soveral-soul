// Multi-cliente: MESMO imóvel renderizado no brand kit de cada cliente.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const brands = JSON.parse(fs.readFileSync(path.join(__dirname, 'brands.json'), 'utf8'));

// dados do imóvel — SEM marca/contato (isso vem do brand kit do cliente)
const listing = {
  badge: "À VENDA",
  eyebrow: "Apartamento · Jardim Itália",
  price: "R$ 720.000", area: "92 m²",
  photo: "../public/nicho/apto.png",
  specs: [
    { icon:"quartos", v:"3", k:"Quartos" },
    { icon:"banheiros", v:"2", k:"Banheiros" },
    { icon:"vagas", v:"2", k:"Vagas" },
    { icon:"estado", v:"Novo", k:"Estado" }
  ],
  ctaText: "Agende sua visita →"
};

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  for (const [id, brand] of Object.entries(brands)) {
    const data = { ...listing, phone: brand.phone, handle: brand.handle, city: brand.city,
      brand: { name:brand.name, mark:brand.mark, accent:brand.accent, cta:brand.cta, bg:brand.bg, line:brand.line } };
    const b64 = Buffer.from(JSON.stringify(data), 'utf8').toString('base64');
    const url = 'file://' + path.join(__dirname, 'imovel.html') + '?d=' + encodeURIComponent(b64);
    const page = await browser.newPage({ viewport:{width:1080,height:1350}, deviceScaleFactor:2 });
    await page.goto(url, { waitUntil:'load' });
    await page.evaluate(async()=>{ await document.fonts.ready; await Promise.all([...document.images].map(im=>im.complete?0:new Promise(r=>{im.onload=im.onerror=r;}))); });
    await page.waitForTimeout(250);
    await page.screenshot({ path: `/home/user/Soveral-soul/out/factory-brand-${id}.png` });
    await page.close();
    console.log('render', id);
  }
  await browser.close(); console.log('DONE');
})().catch(e=>{console.error(e);process.exit(1)});
