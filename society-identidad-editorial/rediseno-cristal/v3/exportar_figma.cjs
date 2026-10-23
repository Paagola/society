// Segundo paso para llevar la v3 a Figma como capas editables (ver exportar_figma.py).
// Abre figma/base.html en Chromium y lo deja listo para html_to_figma:
//  · cada icono <svg><use href="#…"/></svg> pasa a llevar dentro su dibujo, con el color
//    ya resuelto (Figma pinta currentColor de negro);
//  · los pseudoelementos (velo de la pared y punto de «Tu web») pasan a ser capas reales.
// Escribe figma/figma.html, una captura de cada pantalla en figma/comprobacion/ para
// compararla con el render normal y figma/nombres.json: la caja de cada pieza con un
// nombre legible, para renombrar en Figma las capas («Container», «Paragraph»…) que
// crea html_to_figma.
// Uso: node exportar_figma.cjs   (CHROMIUM=/ruta/chromium opcional)
const { chromium } = require("playwright");
const path = require("node:path");
const fs = require("node:fs");

const dir = path.join(__dirname, "figma");
fs.mkdirSync(path.join(dir, "comprobacion"), { recursive: true });

(async () => {
  const opciones = process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {};
  const navegador = await chromium.launch(opciones);
  const pagina = await navegador.newPage({ viewport: { width: 2800, height: 1200 } });
  await pagina.goto("file://" + path.join(dir, "base.html"), { waitUntil: "load" });
  await pagina.evaluate(() => document.fonts.ready);

  const cuenta = await pagina.evaluate(() => {
    const NS = "http://www.w3.org/2000/svg";
    let iconos = 0;
    for (const use of [...document.querySelectorAll("svg use")]) {
      const svg = use.closest("svg");
      const simbolo = document.getElementById(use.getAttribute("href").slice(1));
      if (!simbolo) continue;
      const color = getComputedStyle(svg).color;
      const caja = svg.getBoundingClientRect();
      if (!svg.getAttribute("viewBox")) svg.setAttribute("viewBox", simbolo.getAttribute("viewBox"));
      svg.setAttribute("width", caja.width);
      svg.setAttribute("height", caja.height);
      const g = document.createElementNS(NS, "g");
      for (const a of simbolo.attributes) if (a.name !== "id" && a.name !== "viewBox") g.setAttribute(a.name, a.value);
      g.innerHTML = simbolo.innerHTML;
      const pinta = el => { for (const a of ["fill", "stroke"]) if (el.getAttribute(a) === "currentColor") el.setAttribute(a, color); };
      pinta(g); g.querySelectorAll("*").forEach(pinta);
      use.replaceWith(g);
      iconos++;
    }
    document.querySelector("svg > defs")?.parentElement.remove();

    // Pseudoelementos → capas reales
    const estilo = document.createElement("style");
    let velo = "";
    document.querySelectorAll(".escena.fondo").forEach(e => {
      velo = getComputedStyle(e, "::after").backgroundImage;
      const v = document.createElement("div");
      v.className = "velo-fondo";
      e.appendChild(v);
    });
    document.querySelectorAll(".lista .marcha").forEach(e => {
      const p = document.createElement("i");
      p.className = "punto-marcha";
      e.appendChild(p);
    });
    estilo.textContent = `.escena.fondo::after,.lista .marcha::after{content:none}
      .velo-fondo{position:absolute;inset:0;background-image:${velo}}
      .punto-marcha{display:block;width:9px;height:9px;border-radius:50%;background:var(--cobalto)}`;
    document.head.appendChild(estilo);
    return { iconos, pantallas: document.querySelectorAll(".pantalla").length };
  });
  console.log(cuenta);

  const nombres = await pagina.evaluate(() => {
    const texto = e => e.textContent.replace(/\s+/g, " ").trim();
    const reglas = [
      [".escena", "Fondo · pared con grafitis"], [".velo-fondo", "Velo de la pared"],
      [".velo-arriba", "Velo superior"], [".estado", "Barra de estado"],
      [".marca", "Logo · cristal"],
      [".boton-redondo", e => e.closest("#e6") ? "Avisos · cristal" : "Volver · cristal"],
      [".cabecera, .cabecera-home", "Cabecera"],
      ["img[data-pose]", e => "Mascota · " + e.dataset.pose],
      [".hoja", "Hoja · cristal"], [".aviso", "Aviso del mes · cristal"],
      [".pestanas", "Barra de pestañas · cristal"], [".barra-inicio", "Indicador de inicio"],
      [".asa", "Asa"], [".boton", e => "Botón · " + texto(e)], [".enlace", "Enlace"],
      [".campo", "Buscador"], [".campo-alto", "Campo · tu idea"],
      [".resultado", "Resultado de Google Maps"], [".resultado .foto", "Foto del local"],
      [".progreso", "Progreso del análisis"], [".barra", "Barra de progreso"],
      [".lista", "Lista"], [".fila", e => "Fila · " + texto(e.querySelector("b") || e)],
      [".ficha", "Ficha del local"], [".caja", e => "Dato · " + texto(e.firstElementChild || e)],
      [".chips", "Etiquetas"], [".chip", e => "Etiqueta · " + texto(e)],
      [".segmentos", "Pasos del tutorial"], [".vista", "Vista previa del carrusel"],
      [".vista > div", "Diapositiva"], [".bento", "Accesos"],
      [".teja", e => "Tarjeta · " + texto(e.querySelector(".teja-t"))],
      [".para-hoy", "Para hoy"], [".deslizar", "Deslizar para empezar"],
      [".promesas", "Lista de promesas"], [".propuesta", "Propuesta del mes"],
      [".contenido", "Contenido"],
    ];
    const salida = {};
    for (const p of document.querySelectorAll(".pantalla")) {
      const o = p.getBoundingClientRect();
      salida[p.id] = [];
      for (const [sel, nombre] of reglas) for (const e of p.querySelectorAll(sel)) {
        const r = e.getBoundingClientRect();
        salida[p.id].push({ n: typeof nombre === "function" ? nombre(e) : nombre,
          x: +(r.x - o.x).toFixed(1), y: +(r.y - o.y).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) });
      }
    }
    return salida;
  });
  fs.writeFileSync(path.join(dir, "nombres.json"), JSON.stringify(nombres));

  await pagina.waitForTimeout(300);
  for (const el of await pagina.$$(".pantalla")) {
    const id = await el.getAttribute("id");
    await el.screenshot({ path: path.join(dir, "comprobacion", id + ".png") });
  }
  const html = "<!doctype html>\n" + await pagina.evaluate(() => document.documentElement.outerHTML);
  fs.writeFileSync(path.join(dir, "figma.html"), html);
  console.log("figma.html", (html.length / 1e6).toFixed(2), "MB");
  await navegador.close();
})();
