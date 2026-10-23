// Renderiza cada pantalla de la v2 «Escena y hoja» (index.html) a PNG (@3x).
// Uso: node render.cjs [carpeta-salida]   (CHROMIUM=/ruta/chromium opcional)
const { chromium } = require("playwright");
const path = require("node:path");
const fs = require("node:fs");

const salida = path.resolve(process.argv[2] || path.join(__dirname, "png"));
fs.mkdirSync(salida, { recursive: true });
const nombres = {
  e1: "01-inicio", e2: "02-empezamos", e3: "03-analisis",
  e4: "04-asi-te-ve-internet", e5: "05-tu-primer-carrusel", e6: "06-home",
};

(async () => {
  const opciones = process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {};
  const navegador = await chromium.launch(opciones);
  const escala = Number(process.env.ESCALA || 3);
  const pagina = await navegador.newPage({ viewport: { width: 2800, height: 1200 }, deviceScaleFactor: escala });
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
