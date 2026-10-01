import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {LogoSociety} from '../marca/Logo';
import {C} from '../theme';
import {F} from '../startup/estilo';
import {ICONO, Icono} from '../startup/ui';
import {Mundo, SALE, SUAVE} from '../recorte/camara';
import {FotoRasgada} from '../recorte/foto';
import {acota, Lienzo, Sonidos} from '../recorte/motor';
import {arrastre, Punto, Raton} from '../recorte/raton';
import {Boton, Cargador, Carga, Chip, Corazones, Escribe, PostIG, TarjetaReel, Titular} from './piezas';
import {Poster} from './poster';
import hook from './hook.json';

// «Tu agencia con IA» (28/09/2026), 52 s en vertical. Mezcla el vídeo startup (fondo tinta con collage
// cobalto, titulares Geist, interfaz limpia, ratón) con el papel (la foto que se arranca, sombra dura,
// letras del logo, muro de imprenta).
// 1 · La cámara del móvil ve la pizza real; al disparar, la foto se arranca como un papel y vuela a una
//     publicación; le gusta a 3 personas. Sube la tarjeta de Society; el ratón pulsa «Empezar» y el
//     botón crece hasta llenar la pantalla y se encoge en la caja amarilla del panel.
// 2 · Un único panel que la cámara recorre: fotos (las dos a la vez), petición, formato, estética
//     (el carrusel se desliza), carrusel con «me gusta», atrás, «Crear reel» y el reel real.
// 3 · Muro de palabras de imprenta que se ordena hasta formar el logo oficial.
// Sin temblor. Material real y generado: produccion/society-agencia/README.md.

// El hook (Seedance 2.5, reescalado a 2K) empieza en `hook.inicio` del clip y se coloca de modo que su
// parpadeo del disparo (`hook.disparo`) caiga en DISPARO; todo lo demás cuelga de ese momento.
export const DURACION_AGENCIA = 1570 - 198; // sin publicación ni tarjeta de Society (ADELANTO)
const PROMPT = 'Esta es mi pizza Prosciutto e rucola, genérame un carrusel';

// --- 1 · La foto -----------------------------------------------------------------------------------------
// Transición del hook (Víctor, 28/09: «super realista, minimalista y moderna»): tras el parpadeo real del
// disparo, la cámara entra en la pantalla del móvil y la foto hecha crece sin cortes mientras la mesa y
// las manos se desenfocan y se funden con el fondo. Esa misma foto es la referencia del plato: se queda
// que se sube (Víctor, 28/09): del centro va directa al hueco PLATO de la caja de subida, sin publicación
// de 3 «me gusta» ni tarjeta de Society. El resto del vídeo se adelanta ADELANTO fotogramas.
const ADELANTO = 198; // todo lo que viene después de la foto se adelanta esto
const DISPARO = 44; // parpadeo del disparo (tiempo absoluto)
const PANTALLA = {x: 278, y: 1032, w: 398, h: 258}; // pantalla del móvil en el último fotograma del hook (medida)
const ESCALA = 900 / PANTALLA.w;
const FOTO_CENTRO = {x: 90, y: 560, w: 900, h: Math.round(PANTALLA.h * ESCALA)};
const ENTRA_A = DISPARO + 4; // la cámara entra en la pantalla
const ENTRA_B = DISPARO + 36;

// Progreso de la entrada en la pantalla y la transformación que lleva la pantalla al centro.
const entradaEn = (f: number) => SUAVE(acota((f - ENTRA_A) / (ENTRA_B - ENTRA_A)));
const haciaCentro = (z: number) => {
  const s = 1 + (ESCALA - 1) * z;
  const c0 = {x: PANTALLA.x + PANTALLA.w / 2, y: PANTALLA.y + PANTALLA.h / 2};
  const c1 = {x: FOTO_CENTRO.x + FOTO_CENTRO.w / 2, y: FOTO_CENTRO.y + FOTO_CENTRO.h / 2};
  return {s, tx: c0.x + (c1.x - c0.x) * z - s * c0.x, ty: c0.y + (c1.y - c0.y) * z - s * c0.y};
};

// El plano del móvil (Seedance): la cámara entra en su pantalla; lo demás se desenfoca y se funde.
const CapaHook: React.FC = () => {
  const f = useCurrentFrame();
  if (f > ENTRA_B + 4) return null;
  const z = entradaEn(f);
  const {s, tx, ty} = haciaCentro(z);
  const fundido = 1 - acota((f - (DISPARO + 10)) / 20);
  const inicio = DISPARO - hook.disparo;
  const dura = hook.fotogramas - hook.inicio;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, transformOrigin: '0 0', transform: `translate(${tx}px, ${ty}px) scale(${s})`, opacity: fundido, filter: `blur(${z * 5}px)`}}>
      <Sequence from={inicio} durationInFrames={dura} layout="none">
        <OffthreadVideo
          src={staticFile(hook.src)}
          startFrom={hook.inicio}
          style={{position: 'absolute', width: 1080, height: 1920, objectFit: 'cover'}}
          volume={(v) => interpolate(v, [0, hook.disparo + 6, hook.disparo + 14], [1, 1, 0], {extrapolateRight: 'clamp'})}
        />
      </Sequence>
      {f >= inicio + dura && <Img src={staticFile('agencia/hook-ultimo.jpg')} style={{position: 'absolute', width: 1080, height: 1920, objectFit: 'cover'}} />}
    </div>
  );
};

type Rect = {x: number; y: number; w: number; h: number; r: number};
const mezcla = (p: Rect, q: Rect, t: number): Rect => ({x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t, w: p.w + (q.w - p.w) * t, h: p.h + (q.h - p.h) * t, r: p.r + (q.r - p.r) * t});

// La foto hecha, en tiempo absoluto y por encima de todo: pantalla → centro → hueco PLATO.
const FotoViaje: React.FC = () => {
  const f = useCurrentFrame();
  const llega = PANEL_TOMA - ADELANTO; // el panel ya dibuja la foto en su hueco
  if (f < DISPARO + 2 || f >= llega) return null;
  const z = entradaEn(f);
  const {s, tx, ty} = haciaCentro(z);
  const pantalla: Rect = {x: tx + s * PANTALLA.x, y: ty + s * PANTALLA.y, w: s * PANTALLA.w, h: s * PANTALLA.h, r: 10 * (1 - z)};
  const hueco: Rect = {...HUECO_PLATO_PANTALLA, r: 24 * CAM_SUBIDA.z};
  let r = pantalla;
  if (f >= ENTRA_B) r = mezcla({...FOTO_CENTRO, r: 0}, hueco, SUAVE(acota((f - ENTRA_B - 2) / (llega - ENTRA_B - 4))));
  const aparece = acota((f - DISPARO - 2) / 5);
  const vida = Math.max(0, f - ENTRA_B);
  const vuela = f > ENTRA_A;
  return (
    <div
      style={{
        position: 'absolute',
        left: r.x,
        top: r.y,
        width: r.w,
        height: r.h,
        overflow: 'hidden',
        borderRadius: r.r,
        opacity: aparece,
        boxShadow: vuela ? '0 30px 80px rgba(0,0,0,0.45)' : '0 16px 40px rgba(0,0,0,0.35)',
      }}
    >
      <Img src={staticFile('agencia/foto-real.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1 + Math.min(0.06, vida * 0.0005)})`}} />
    </div>
  );
};

const Sonido: React.FC = () => <Sonidos ev={[{f: DISPARO + 6, src: 'audio/pizza/lanzar.wav', vol: 0.35, rate: 1.4}]} />;

// La caja de subida y la cámara del panel en ese momento.
const CAJA = {x: 230, y: 1250, w: 940, h: 520};
const CAM_SUBIDA = {x: 700, y: 1720, z: 0.98};
const HUECO_PLATO = {x: 350, y: 1290, w: 320, h: 400}; // = HUECO_A con la foto llenándolo
const HUECO_PLATO_PANTALLA = {x: (HUECO_PLATO.x - CAM_SUBIDA.x) * CAM_SUBIDA.z + 540, y: (HUECO_PLATO.y - CAM_SUBIDA.y) * CAM_SUBIDA.z + 960, w: HUECO_PLATO.w * CAM_SUBIDA.z, h: HUECO_PLATO.h * CAM_SUBIDA.z};
const PANEL_TOMA = 310; // desde aquí la foto del plato la dibuja el panel en su hueco
const CAJA_PANTALLA = {x: (CAJA.x - CAM_SUBIDA.x) * CAM_SUBIDA.z + 540, y: (CAJA.y - CAM_SUBIDA.y) * CAM_SUBIDA.z + 960, w: CAJA.w * CAM_SUBIDA.z, h: CAJA.h * CAM_SUBIDA.z};
const FondoOscuro: React.FC<{w: number; h: number; x?: number; y?: number}> = ({w, h, x = 0, y = 0}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      backgroundColor: C.tinta,
      backgroundImage: `url(${staticFile('agencia/collage.jpg')})`,
      backgroundSize: '1400px 2476px',
      backgroundPosition: `${-x - 160}px ${-y - 280}px`,
    }}
  />
);

const Apertura: React.FC = () => {
  const f = useCurrentFrame();
  if (f > PANEL_TOMA - ADELANTO + 4) return null;
  return (
    <AbsoluteFill>
      <Mundo claves={[{f: 0, ...CAM_SUBIDA}]}>
        <FondoOscuro x={-900} y={-1600} w={6200} h={12400} />
      </Mundo>
      <CapaHook />
      <Sonido />
    </AbsoluteFill>
  );
};

// --- 2 · El panel ----------------------------------------------------------------------------------------
const X0 = 230; // margen del panel: todo entre x = 230 y 1170
const AN = 940;
const XE = (i: number) => 350 + i * 760; // estéticas: tarjetas grandes en fila
const YE = 3490;
const CENTRADA = [684, 712, 738, 764, 790]; // cuándo queda centrada cada tarjeta (el carrusel se desliza)
const RUTA: Punto[] = [
  {f: 330, x: 1200, y: 2500},
  {f: 354, x: 940, y: 2150, clic: true},
  {f: 376, x: 935, y: 1480},
  {f: 380, x: 935, y: 1480},
  {f: 396, x: 1080, y: 1820},
  {f: 460, x: 1080, y: 1000},
  {f: 474, x: 700, y: 760, clic: true},
  {f: 562, x: 1000, y: 1000},
  {f: 600, x: 700, y: 2875},
  {f: 606, x: 700, y: 2875, clic: true},
  {f: 628, x: 700, y: 3095},
  {f: 636, x: 700, y: 3095, clic: true},
  {f: 670, x: 720, y: 3960},
  {f: 790, x: 690, y: 3940},
  {f: 802, x: 700, y: 3940, clic: true},
  {f: 818, x: 900, y: 4300},
  {f: 1080, x: 850, y: 5000},
  {f: 1100, x: X0 + 69, y: 4845, clic: true},
  {f: 1130, x: 900, y: 6700},
  {f: 1140, x: 700, y: 6920, clic: true},
  {f: 1170, x: 1300, y: 7400},
];
const SUELTA = 378;
const COGE_SALA = [354, SUELTA] as const;
const HUECO_A = {x: 350, y: 1290};
const HUECO_B = {x: 730, y: 1290};
const MINI = 0.8; // la foto subida llena su hueco (400 x 500 → 320 x 400)

// Fotos del usuario, limpias y vivas; el ratón se lleva las dos a la vez.
const FotoArrastrada: React.FC<{src: string; en: number; x: number; y: number; r: number; coge: readonly [number, number]; hueco: {x: number; y: number}; agarre: {x: number; y: number}; semilla: number}> = ({
  src,
  en,
  x,
  y,
  r,
  coge,
  hueco,
  agarre,
  semilla,
}) => {
  const f = useCurrentFrame();
  const a = arrastre(f, RUTA, coge[0], coge[1], {x, y, r}, {x: hueco.x, y: hueco.y, s: MINI}, agarre);
  return (
    <div style={{position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: `translate(${a.x}px, ${a.y}px) rotate(${a.r}deg) scale(${a.s})`, zIndex: a.alza > 0 ? 5 : 2}}>
      <FotoRasgada src={src} x={0} y={0} w={400} h={500} en={en} n={5} dur={10} semilla={semilla} costuras={false} radio={24} vida="deriva" />
      <div style={{position: 'absolute', left: -10, top: -10, width: 420, height: 520, borderRadius: 32, border: `8px solid ${C.cobalto}`, opacity: a.alza}} />
    </div>
  );
};

// La caja de subida: amarilla con huecos blancos.
const CajaSubida: React.FC = () => {
  const f = useCurrentFrame();
  const hueco = (x: number, y: number, texto: string, lleno: number) => (
    <div
      style={{
        position: 'absolute',
        left: x - CAJA.x,
        top: y - CAJA.y,
        width: 320,
        height: 400,
        borderRadius: 24,
        background: '#FFFFFF',
        opacity: f < lleno ? 1 : 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        fontFamily: F.mono,
        fontSize: 26,
        letterSpacing: '0.16em',
        color: 'rgba(20,20,20,0.55)',
      }}
    >
      <span style={{fontFamily: F.sans, fontSize: 96, lineHeight: 1, letterSpacing: 0, opacity: f < lleno ? 1 : 0, color: C.tinta}}>+</span>
      <span style={{opacity: f < lleno ? 1 : 0}}>{texto}</span>
    </div>
  );
  return (
    <div style={{position: 'absolute', left: CAJA.x, top: CAJA.y, width: CAJA.w, height: CAJA.h, borderRadius: 40, border: `8px solid ${C.mostaza}`, boxSizing: 'border-box', background: 'transparent', opacity: SALE(acota((f - 290) / 10))}}>
      {hueco(HUECO_A.x, HUECO_A.y, 'PLATO', PANEL_TOMA)}
      {hueco(HUECO_B.x, HUECO_B.y, 'LOCAL', SUELTA + 6)}
    </div>
  );
};

// La foto que hizo el móvil, ya en su hueco (llega volando por encima de la transición: FotoViaje).
const FotoPlato: React.FC = () => {
  const f = useCurrentFrame();
  if (f < PANEL_TOMA) return null;
  return (
    <div style={{position: 'absolute', left: HUECO_PLATO.x, top: HUECO_PLATO.y, width: HUECO_PLATO.w, height: HUECO_PLATO.h, borderRadius: 24, overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.35)', zIndex: 2}}>
      <Img src={staticFile('agencia/foto-real.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.06 + Math.sin((f - PANEL_TOMA) / 60) * 0.01})`}} />
    </div>
  );
};

const CartaEstetica: React.FC<{src: string; i: number; en: number; semilla: number}> = ({src, i, en, semilla}) => {
  const f = useCurrentFrame();
  const h = i < 4 ? SALE(acota((f - CENTRADA[i]) / 6)) * (1 - SUAVE(acota((f - CENTRADA[i] - 14) / 8))) : 0;
  return (
    <div style={{position: 'absolute', left: XE(i) + desliza(f), top: YE, width: 700, height: 875, transform: `translateY(${-22 * h}px) scale(${1 + 0.035 * h})`, zIndex: h > 0 ? 3 : 1}}>
      {i < 4 && <Sonidos ev={[{f: CENTRADA[i], src: 'audio/pizza/tic.wav', vol: 0.4, rate: 1.4}]} />}
      <FotoRasgada src={src} x={0} y={0} w={700} h={875} en={en} n={6} dur={10} semilla={semilla} costuras={false} radio={30} vida="deriva" />
      <div style={{position: 'absolute', inset: -12, borderRadius: 40, border: `10px solid ${C.cobalto}`, opacity: h}} />
    </div>
  );
};

// Desplazamiento del carrusel de estéticas: cada tarjeta pasa al centro (la cámara no se mueve).
const desliza = (f: number) => {
  let i = 0;
  let t = 0;
  for (let k = 1; k < CENTRADA.length; k++) {
    if (f >= CENTRADA[k] - 12) {
      i = k - 1;
      t = SUAVE(acota((f - (CENTRADA[k] - 12)) / 12));
    }
  }
  return -760 * (i + t);
};

const TuEstetica: React.FC<{clic: number}> = ({clic}) => {
  const f = useCurrentFrame();
  const listo = f >= clic + 28;
  return (
    <div style={{position: 'absolute', left: XE(4) + desliza(f), top: YE, width: 700, height: 875}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 30,
          border: '6px dashed rgba(245,244,240,0.55)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          fontFamily: F.sans,
          fontWeight: 720,
          fontSize: 64,
          color: C.blanco,
          opacity: f < clic + 4 ? 1 : 0,
        }}
      >
        <span style={{fontSize: 200, lineHeight: 1}}>+</span>
        Tu estética
      </div>
      <FotoRasgada src="agencia/estetica.jpg" x={0} y={0} w={700} h={875} en={clic + 4} n={6} dur={12} semilla={9} costuras={false} radio={30} lejos={1300} vida="quieta" />
      {listo && (
        <div
          style={{
            position: 'absolute',
            left: 40,
            bottom: -44,
            padding: '16px 32px',
            borderRadius: 50,
            background: C.cobalto,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: F.sans,
            fontWeight: 720,
            fontSize: 42,
            color: C.blanco,
            transform: `scale(${SALE(acota((f - clic - 28) / 6))})`,
          }}
        >
          <Icono d={ICONO.check} s={48} ancho={3} /> Tu estética
        </div>
      )}
    </div>
  );
};

// Lámina del carrusel: quieta, sin zoom (el texto va dentro de la imagen).
const LaminaViva: React.FC<{src: string; w: number; en: number}> = ({src, w}) => <Img src={staticFile(src)} style={{position: 'absolute', width: w, height: w * 1.25, objectFit: 'cover'}} />;

const Opcion: React.FC<{y: number; texto: string; estado: 'hecho' | 'activo' | 'normal'; en: number; pulsa?: number; aro?: boolean}> = ({y, texto, estado, en, pulsa = Infinity, aro}) => {
  const f = useCurrentFrame();
  const e = SALE(acota((f - en) / 10));
  const p = f >= pulsa && f < pulsa + 8 ? 0.95 : 1;
  return (
    <div
      style={{
        position: 'absolute',
        left: X0,
        top: y,
        width: AN,
        height: 140,
        borderRadius: 70,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        padding: '0 44px',
        boxSizing: 'border-box',
        background: estado === 'activo' ? C.cobalto : 'rgba(245,244,240,0.06)',
        border: `3px solid ${estado === 'activo' ? C.cobalto : 'rgba(245,244,240,0.35)'}`,
        fontFamily: F.sans,
        fontWeight: 740,
        fontSize: 54,
        color: C.blanco,
        opacity: estado === 'hecho' ? 0.55 * e : e,
        transform: `translateX(${(1 - e) * 200}px) scale(${p})`,
      }}
    >
      {estado === 'hecho' && <Icono d={ICONO.check} s={56} ancho={3} />}
      {aro && <div style={{width: 56, height: 56, borderRadius: 28, border: `5px solid ${C.mostaza}`}} />}
      {texto}
    </div>
  );
};

// Un bloque que entra (sube y aparece) cuando la cámara llega a él.
const Entra: React.FC<{en: number; style: React.CSSProperties; children: React.ReactNode}> = ({en, style, children}) => {
  const f = useCurrentFrame();
  if (f < en) return null;
  const e = SALE(acota((f - en) / 12));
  return <div style={{...style, opacity: e, transform: `translateY(${(1 - e) * 60}px)`}}>{children}</div>;
};

const Panel: React.FC = () => (
  <div style={{position: 'absolute', left: 0, top: 0, width: 1400, height: 9904}}>
    <FondoOscuro x={-900} y={-1600} w={6200} h={12400} />

    {/* fotos: caja amarilla con huecos blancos; el ratón lleva las dos fotos a la vez */}
    <Titular x={X0} y={1030} en={300} partes={[{t: 'Sube tus'}, {t: 'fotos.', it: true}]} tam={100} ancho={AN} alinear="center" />
    <CajaSubida />
    <Cargador cx={700} cy={1730} a={380} b={390} tam={110} />
    <FotoPlato />
    <FotoArrastrada src="agencia/sala.jpg" en={318} x={740} y={1900} r={4} coge={COGE_SALA} hueco={HUECO_B} agarre={{x: 160, y: 210}} semilla={5} />

    {/* cabecera y petición: contenedor blanco, texto con margen */}
    <LogoSociety en={444} cx={700} cy={170} escala={0.32} paso={2} temblor={false} />
    <Titular x={X0} y={330} en={452} partes={[{t: '¿Qué quieres'}, {t: 'crear hoy?', it: true}]} tam={100} ancho={AN} alinear="center" />
    <Entra en={456} style={{position: 'absolute', left: X0, top: 570, width: AN, height: 360, borderRadius: 40, background: '#FFFFFF', boxShadow: '10px 14px 0 rgba(10,8,6,0.35)'}}>
      <div style={{position: 'absolute', left: 56, top: 46, fontFamily: F.mono, fontSize: 28, letterSpacing: '0.14em', color: C.cobalto}}>TU PETICIÓN</div>
      <div style={{position: 'absolute', left: 56, top: 104}}>
        <Escribe texto={PROMPT} en={480} dur={78} ancho={AN - 112} tam={52} />
      </div>
    </Entra>

    {/* formato y continuar */}
    <Titular x={X0} y={2560} en={570} partes={[{t: 'Elige el'}, {t: 'formato.', it: true}]} tam={100} ancho={AN} alinear="center" />
    <Chip x={X0} y={2800} w={290} texto="1:1" forma={[1, 1]} />
    <Chip x={X0 + 325} y={2800} w={290} texto="4:5" forma={[4, 5]} sel={606} />
    <Chip x={X0 + 650} y={2800} w={290} texto="9:16" forma={[9, 16]} />
    <Boton x={400} y={3020} w={600} texto="Continuar →" pulsa={636} />

    {/* estética: tarjetas grandes; se desliza el carrusel, no la cámara */}
    <Titular x={X0} y={3290} en={648} partes={[{t: 'Elige tu'}, {t: 'estética.', it: true}]} tam={100} ancho={AN} alinear="center" />
    <CartaEstetica src="agencia/post1.jpg" i={0} en={652} semilla={11} />
    <CartaEstetica src="agencia/post2.jpg" i={1} en={658} semilla={12} />
    <CartaEstetica src="agencia/post3.jpg" i={2} en={664} semilla={13} />
    <CartaEstetica src="agencia/post4.jpg" i={3} en={670} semilla={14} />
    <TuEstetica clic={802} />
    <Carga x={350} y={4440} w={700} a={836} b={876} texto="Creando tu carrusel…" hecho="Carrusel listo" />

    {/* resultado */}
    <Titular x={X0} y={4600} en={916} partes={[{t: 'Tu'}, {t: 'carrusel.', it: true}]} tam={100} ancho={AN} alinear="center" />
    <PostIG
      x={X0}
      y={4780}
      w={AN}
      en={922}
      cambios={[1030, 1058]}
      likes={[976, 1060, 0, 1284]}
      pie="Prosciutto e rucola · Da Tonino"
      atras={1100}
      laminas={[
        // el texto va dentro de cada imagen, con la tipografía de la estética subida (carrusel-N.jpg)
        <FotoRasgada key="1" src="agencia/carrusel-1.jpg" x={0} y={0} w={AN} h={AN * 1.25} en={926} n={6} dur={12} costuras={false} sombra={false} vida="quieta" />,
        <LaminaViva key="2" src="agencia/carrusel-2.jpg" w={AN} en={1030} />,
        <LaminaViva key="3" src="agencia/carrusel-3.jpg" w={AN} en={1058} />,
      ]}
    />
    <Corazones x={700} y={5950} en={976} dur={80} n={22} />

    {/* crear reel */}
    <Titular x={X0} y={6470} en={1124} partes={[{t: 'Y ahora,'}, {t: 'un reel.', it: true}]} tam={100} ancho={AN} alinear="center" />
    <Opcion y={6680} texto="Crear carrusel" estado="hecho" en={1128} />
    <Opcion y={6850} texto="Crear reel" estado="activo" en={1132} pulsa={1140} />
    <Opcion y={7020} texto="Crear historia" estado="normal" en={1136} aro />
    <TarjetaReel x={310} y={7250} w={780} en={1144} video={1168} dur={170} fuente="agencia/reel-sin-pasta.mp4" />

    <Raton ruta={RUTA} desde={330} hasta={1180} agarrado={[[COGE_SALA[0], SUELTA]]} />
  </div>
);

const musica = (fr: number) =>
  interpolate(fr, [0, 20, 1140 - ADELANTO, 1156 - ADELANTO, 1330 - ADELANTO, 1346 - ADELANTO, 1540 - ADELANTO, 1570 - ADELANTO], [0, 0.22, 0.22, 0.05, 0.05, 0.3, 0.3, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const Agencia: React.FC = () => (
  <Lienzo>
    <Apertura />
    <Sequence from={-ADELANTO}>
      <Resto />
    </Sequence>
    <FotoViaje />
    <Audio src={staticFile('audio/loyalty-freak-music-cant-stop-my-feet.mp3')} volume={musica} />
  </Lienzo>
);

// Todo lo que va después de la foto, escrito en su tiempo original (se adelanta ADELANTO fotogramas).
const Resto: React.FC = () => (
  <>

    {/* 2 · el panel (aparece debajo del botón que llena la pantalla) */}
    <Mundo
      desde={288}
      hasta={1340}
      claves={[
        {f: 288, ...CAM_SUBIDA},
        {f: 370, ...CAM_SUBIDA},
        {f: 392, x: 700, y: 1480, z: 1.1},
        {f: 432, x: 700, y: 1480, z: 1.1},
        {f: 466, x: 700, y: 800, z: 1},
        {f: 562, x: 700, y: 800, z: 1},
        {f: 580, x: 700, y: 1650, z: 0.9},
        {f: 600, x: 700, y: 2880, z: 1},
        {f: 612, x: 700, y: 2880, z: 1},
        {f: 626, x: 700, y: 3095, z: 1.2},
        {f: 640, x: 700, y: 3095, z: 1.2},
        {f: 664, x: 700, y: 3930, z: 0.98},
        {f: 876, x: 700, y: 3930, z: 0.98},
        {f: 916, x: 700, y: 5540, z: 0.9},
        {f: 1080, x: 700, y: 5540, z: 0.9},
        {f: 1092, x: 560, y: 5100, z: 1.1},
        {f: 1102, x: 560, y: 5100, z: 1.1},
        {f: 1124, x: 700, y: 6860, z: 1},
        {f: 1142, x: 700, y: 6860, z: 1},
        {f: 1166, x: 700, y: 7940, z: 0.9},
        {f: 1330, x: 700, y: 7940, z: 0.93},
      ]}
    >
      <Panel />
    </Mundo>

    {/* 3 · el muro de palabras se ordena en el logo */}
    <Poster en={1330} junta={1424} lemaTexto="Gestiona toda tu empresa con ayuda de IA" />
  </>
);
