// Renderiza reel.html con Playwright: 4 subfotogramas por fotograma, mezclados con
// ffmpeg tmix para el desenfoque de movimiento, a 60 fps.
//
//   node render.mjs                 → out/reel-muda.mp4 (60 fps)
//   node render.mjs --tiempos       → out/tiempos/bXX.png, un fotograma por tiempo + hoja
//   node render.mjs --desde 6 --hasta 8   → solo un tramo (para revisar)
//
// Variables: CHROMIUM=/ruta/al/navegador (opcional), HILOS=4.
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
// Playwright local o, si no está, el instalado globalmente (npm root -g)
let chromium;
try { ({ chromium } = await import('playwright')); }
catch { const raiz = execFileSync('npm', ['root', '-g']).toString().trim(); ({ chromium } = createRequire(path.join(raiz, 'x.js'))('playwright')); }
const OUT = path.join(DIR, 'out');
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? Number(args[i + 1]) : d; };
const FPS = 60, SUB = 4, OBTURADOR = 0.5;            // 180°: los subfotogramas cubren medio fotograma
const HILOS = Number(process.env.HILOS || 4);
fs.mkdirSync(OUT, { recursive: true });

const nMarcos = fs.existsSync(path.join(DIR, 'assets/mascota'))
  ? fs.readdirSync(path.join(DIR, 'assets/mascota')).filter((f) => f.endsWith('.jpg')).length : 0;

async function abre(browser) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(path.join(DIR, 'reel.html')).href);
  await page.evaluate(async (n) => {
    window.REEL.preparaVideo(n);
    // precarga de los fotogramas del clip
    await Promise.all(Array.from({ length: n }, (_, i) => new Promise((r) => {
      const im = new Image(); im.onload = im.onerror = r; im.src = `assets/mascota/${String(i + 1).padStart(4, '0')}.jpg`;
      (window.__cache ||= []).push(im);
    })));
    await window.REEL.listo();
  }, nMarcos);
  return page;
}
const lanza = () => chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--disable-gpu', '--font-render-hinting=none'] });

async function tiempos() {
  const browser = await lanza();
  const page = await abre(browser);
  const dur = await page.evaluate(() => window.REEL.DUR);
  const B = 0.5, dir = path.join(OUT, 'tiempos');
  fs.mkdirSync(dir, { recursive: true });
  const lista = [];
  for (let k = 0; k < Math.round(dur / B); k++) {
    const t = k * B + 0.2;                              // justo después del golpe, ya asentado
    await page.evaluate((t) => window.REEL.seekListo(t), t);
    const f = path.join(dir, `b${String(k).padStart(2, '0')}.png`);
    await page.screenshot({ path: f });
    lista.push(f);
  }
  await browser.close();
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(dir, 'b*.png'),
    '-vf', `scale=270:480,tile=8x${Math.ceil(lista.length / 8)}:padding=6:color=0x222222`, '-frames:v', '1', path.join(OUT, 'tiempos-hoja.jpg')]);
  console.log('hoja →', path.join(OUT, 'tiempos-hoja.jpg'));
}

async function video() {
  const browser = await lanza();
  const dur = await (async () => { const p = await abre(browser); const d = await p.evaluate(() => window.REEL.DUR); await p.close(); return d; })();
  const desde = opt('--desde', 0), hasta = opt('--hasta', dur);
  const f0 = Math.round(desde * FPS), f1 = Math.round(hasta * FPS);
  const dir = path.join(OUT, 'sub'); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const total = (f1 - f0) * SUB;
  let hechos = 0; const t0 = Date.now();
  const trabajo = async (h) => {
    const page = await abre(browser);
    for (let n = h; n < total; n += HILOS) {
      const fi = f0 + Math.floor(n / SUB), s = n % SUB;
      const t = (fi + ((s + 0.5) / SUB - 0.5) * OBTURADOR) / FPS;
      await page.evaluate((t) => window.REEL.seekListo(t), t);
      await page.screenshot({ path: path.join(dir, `${String(n).padStart(6, '0')}.jpg`), type: 'jpeg', quality: 94 });
      if (++hechos % 240 === 0) console.log(`${hechos}/${total}  ${((Date.now() - t0) / 1000).toFixed(0)} s`);
    }
    await page.close();
  };
  await Promise.all(Array.from({ length: HILOS }, (_, h) => trabajo(h)));
  await browser.close();
  const salida = path.join(OUT, desde === 0 && hasta === dur ? 'reel-muda.mp4' : `tramo-${desde}-${hasta}.mp4`);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS * SUB), '-i', path.join(dir, '%06d.jpg'),
    '-vf', `tmix=frames=${SUB},select='eq(mod(n\\,${SUB})\\,${SUB - 1})',setpts=N/${FPS}/TB`, '-r', String(FPS),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', salida], { stdio: 'inherit' });
  console.log('vídeo →', salida);
}

(args.includes('--tiempos') ? tiempos() : video()).catch((e) => { console.error(e); process.exit(1); });
