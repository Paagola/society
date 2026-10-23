// Renderiza cada pantalla de index.html a PNG (@3x).
// Uso: node render.cjs [carpeta-salida]   (CHROMIUM=/ruta/chromium opcional)
const { chromium } = require("playwright");
const path = require("node:path");
const fs = require("node:fs");

const salida = path.resolve(process.argv[2] || path.join(__dirname, "png"));
fs.mkdirSync(salida, { recursive: true });
const nombres = {
  s1: "01-inicio", s2: "02-empezamos", s3: "03-analisis",
  s4: "04-asi-te-ve-internet", s5: "05-tu-primer-carrusel", s6: "06-home",
};

(async () => {
  const opciones = process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {};
  const navegador = await chromium.launch(opciones);
  const pagina = await navegador.newPage({ viewport: { width: 2800, height: 1200 }, deviceScaleFactor: 3 });
  await pagina.goto("file://" + path.join(__dirname, "index.html"), { waitUntil: "networkidle" });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.waitForTimeout(400);
  for (const [id, nombre] of Object.entries(nombres)) {
    const el = await pagina.$("#" + id);
    await el.screenshot({ path: path.join(salida, nombre + ".png") });
    console.log("ok", nombre);
  }
  await navegador.close();
})();
