import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {C, FONT} from '../theme';

// «El sistema», en papel: un collage de seis carteles verticales sobre una mesa, en un solo espacio 3D.
// Cada paso del proceso es una pieza física (foto impresa, nota, sello, copias, calendario).
// Coordenadas de mundo: cada cartel mide 1620 × 2880 (un 1080 × 1920 a 1,5×).

export const PANEL = {w: 1620, h: 2880, hueco: 150};
export const TABLERO = {w: PANEL.w * 3 + PANEL.hueco * 4, h: PANEL.h * 2 + PANEL.hueco * 3};
// Esquina de cada cartel: fila 1 de izquierda a derecha, fila 2 de derecha a izquierda (recorrido en zigzag).
const col = (c: number) => PANEL.hueco + c * (PANEL.w + PANEL.hueco);
const fila = (f: number) => PANEL.hueco + f * (PANEL.h + PANEL.hueco);
export const POS = {
  antes: [col(0), fila(0)],
  contar: [col(1), fila(0)],
  society: [col(2), fila(0)],
  piezas: [col(2), fila(1)],
  cuando: [col(1), fila(1)],
  despues: [col(0), fila(1)],
} as const;
export const centro = (k: keyof typeof POS): [number, number] => [POS[k][0] + PANEL.w / 2, POS[k][1] + PANEL.h / 2];

// ── Utilidades de papel ────────────────────────────────────────────────────

const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Borde arrancado: polígono con el perfil irregular de un papel roto a mano.
export const desgarro = (w: number, h: number, seed: number, amp = 10, paso = 14) => {
  const r = rng(seed);
  const p: string[] = [];
  for (let x = 0; x <= w; x += paso) p.push(`${x}px ${r() * amp}px`);
  for (let y = 0; y <= h; y += paso) p.push(`${w - r() * amp}px ${y}px`);
  for (let x = w; x >= 0; x -= paso) p.push(`${x}px ${h - r() * amp}px`);
  for (let y = h; y >= 0; y -= paso) p.push(`${r() * amp}px ${y}px`);
  return `polygon(${p.join(',')})`;
};

// Línea de rotura en diagonal: lo que queda por debajo (true) o lo arrancado (false).
const rotura = (w: number, h: number, seed: number, y0: number, y1: number, abajo: boolean) => {
  const r = rng(seed);
  const linea: string[] = [];
  for (let x = 0; x <= w; x += 12) linea.push(`${x}px ${y0 + ((y1 - y0) * x) / w + (r() - 0.5) * 34}px`);
  return abajo ? `polygon(${linea.join(',')}, ${w}px ${h}px, 0px ${h}px)` : `polygon(0px 0px, ${w}px 0px, ${linea.slice().reverse().join(',')})`;
};

const SOMBRA = 'drop-shadow(0 26px 30px rgba(10,10,10,.38)) drop-shadow(0 4px 6px rgba(10,10,10,.25))';

// Hoja del tablero: papel arrugado (o cobalto, o tinta) con su textura.
const Hoja: React.FC<{x: number; y: number; tono?: 'papel' | 'cobalto' | 'tinta'; rot?: number; children?: React.ReactNode}> = ({x, y, tono = 'papel', rot = 0, children}) => {
  const bg = tono === 'papel' ? C.papel : tono === 'cobalto' ? C.cobalto : C.tinta;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: PANEL.w, height: PANEL.h, transform: `rotate(${rot}deg)`, transformStyle: 'preserve-3d', filter: SOMBRA}}>
      <div style={{position: 'absolute', inset: 0, background: bg, overflow: 'hidden'}}>
        <Img
          src={staticFile(tono === 'tinta' ? 'img/papel-oscuro.png' : 'img/papel.png')}
          style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: tono === 'tinta' ? 'screen' : 'multiply', opacity: tono === 'papel' ? 0.95 : tono === 'cobalto' ? 0.55 : 0.4}}
        />
      </div>
      {children}
    </div>
  );
};

// Foto impresa con borde de papel arrancado.
const Foto: React.FC<{src: string; x: number; y: number; w: number; h: number; rot?: number; seed: number; pos?: string; borde?: number; gris?: boolean}> = ({src, x, y, w, h, rot = 0, seed, pos = '50% 50%', borde = 26, gris}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, transform: `rotate(${rot}deg)`, filter: SOMBRA}}>
    <div style={{position: 'absolute', inset: 0, background: '#f6f3ec', clipPath: desgarro(w, h, seed, 16, 16)}} />
    <div style={{position: 'absolute', left: borde, top: borde, width: w - borde * 2, height: h - borde * 2, clipPath: desgarro(w - borde * 2, h - borde * 2, seed + 7, 7, 18)}}>
      <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, filter: gris ? 'grayscale(1) contrast(1.25)' : undefined}} />
    </div>
  </div>
);

const Cinta: React.FC<{x: number; y: number; w?: number; rot?: number}> = ({x, y, w = 330, rot = 0}) => (
  <Img src={staticFile('papel/cinta.png')} style={{position: 'absolute', left: x, top: y, width: w, transform: `rotate(${rot}deg)`, opacity: 0.92}} />
);

const Pegatina: React.FC<{src: string; x: number; y: number; w: number; rot?: number; children?: React.ReactNode}> = ({src, x, y, w, rot = 0, children}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, transform: `rotate(${rot}deg)`, filter: 'drop-shadow(0 14px 16px rgba(10,10,10,.3))'}}>
    <Img src={staticFile(src)} style={{width: '100%', display: 'block'}} />
    {children && <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>{children}</div>}
  </div>
);

// Titular de cartel: condensada en mayúsculas y una línea en serif cursiva.
export type L = {t: string; s: number; it?: boolean};
export const Titular: React.FC<{lineas: L[]; x: number; y: number; color?: string}> = ({lineas, x, y, color = C.tinta}) => (
  <div style={{position: 'absolute', left: x, top: y, filter: 'url(#tinta)'}}>
    {lineas.map((l, i) => (
      <div
        key={i}
        style={{
          fontFamily: l.it ? FONT.serif : FONT.display,
          fontStyle: l.it ? 'italic' : 'normal',
          fontWeight: l.it ? 800 : 400,
          fontSize: l.s,
          lineHeight: l.it ? 1.0 : 0.9,
          letterSpacing: l.it ? '-0.035em' : '-0.005em',
          whiteSpace: 'nowrap',
          color,
          marginTop: i === 0 ? 0 : l.it ? -l.s * 0.08 : -l.s * 0.04,
        }}
      >
        {l.t}
      </div>
    ))}
  </div>
);

const Mono: React.FC<{t: string; s: number; color?: string; style?: React.CSSProperties}> = ({t, s, color = C.tinta, style}) => (
  <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: s, letterSpacing: '0.06em', textTransform: 'uppercase', color, ...style}}>{t}</div>
);

// Publicación impresa: tarjeta de papel con cabecera, foto y me gusta (sin logotipos de ninguna red).
const Publicacion: React.FC<{x: number; y: number; w: number; rot?: number; foto: string; megusta: string; lleno?: boolean; seed: number; pos?: string}> = ({x, y, w, rot = 0, foto, megusta, lleno, seed, pos}) => {
  const fh = Math.round(w * 0.8);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, transform: `rotate(${rot}deg)`, filter: SOMBRA}}>
      <div style={{background: '#fbf9f4', clipPath: desgarro(w, fh + 330, seed, 8, 22), padding: '0 0 10px'}}>
        <div style={{height: 150, display: 'flex', alignItems: 'center', gap: 26, padding: '0 44px'}}>
          <div style={{width: 84, height: 84, borderRadius: 42, background: C.cobalto}} />
          <Mono t="tu_restaurante" s={46} style={{textTransform: 'none', letterSpacing: '0.01em'}} />
        </div>
        <Img src={staticFile(foto)} style={{width: '100%', height: fh, objectFit: 'cover', objectPosition: pos, display: 'block'}} />
        <div style={{height: 170, display: 'flex', alignItems: 'center', gap: 30, padding: '0 44px'}}>
          <svg width={92} height={92} viewBox="0 0 24 24" fill={lleno ? C.cobalto : 'none'} stroke={lleno ? C.cobalto : C.tinta} strokeWidth={2.2} strokeLinejoin="round">
            <path d="M12 20.5S3.5 15.4 3.5 9.3C3.5 6.4 5.6 4.5 8 4.5c1.7 0 3.1.9 4 2.3.9-1.4 2.3-2.3 4-2.3 2.4 0 4.5 1.9 4.5 4.8 0 6.1-8.5 11.2-8.5 11.2z" />
          </svg>
          <div style={{fontFamily: FONT.display, fontSize: 108, color: C.tinta, lineHeight: 1}}>{megusta}</div>
        </div>
      </div>
    </div>
  );
};

const Pildora: React.FC<{t: string; x: number; y: number; rot?: number; bg?: string; fg?: string}> = ({t, x, y, rot = 0, bg = C.papel, fg = C.tinta}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `rotate(${rot}deg)`,
      padding: '30px 64px 24px',
      borderRadius: 90,
      background: bg,
      color: fg,
      fontFamily: FONT.display,
      fontSize: 118,
      lineHeight: 1,
      border: `12px solid #fff`,
      boxShadow: '0 16px 26px rgba(10,10,10,.3)',
    }}
  >
    {t}
  </div>
);

// ── Estado de cada paso (para poses fijas del storyboard y, después, para animar) ──
export type Estado = {
  texto?: string; // lo que se ha escrito en la nota
  pildoras?: number; // cuántas píldoras de formato se han pegado (0-3)
  arrancado?: number; // 0 = foto del móvil entera; 1 = arrancada del todo
  pasos?: number; // pasos de agencia sellados (0-4)
  viernes?: boolean; // pegatina del viernes puesta
  megusta?: string;
};

export const Tablero: React.FC<{e?: Estado}> = ({e = {}}) => {
  const {texto = 'Pizza de jamón y rúcula, recién salida.', pildoras = 3, arrancado = 0.55, pasos = 4, viernes = true, megusta = '962 ME GUSTA'} = e;
  const [ax, ay] = POS.antes;
  const [bx, by] = POS.contar;
  const [sx, sy] = POS.society;
  const [px, py] = POS.piezas;
  const [cx, cy] = POS.cuando;
  const [dx, dy] = POS.despues;
  // Foto que se arranca en el sello de Society
  const tw = 1360;
  const th = 1360;
  const y0 = th * (0.18 + 0.7 * arrancado);
  const y1 = th * (0.02 + 0.7 * arrancado);
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: TABLERO.w, height: TABLERO.h, transformStyle: 'preserve-3d'}}>
      {/* 1 · Antes: así subes tus platos */}
      <Hoja x={ax} y={ay} rot={-0.6}>
        <Titular lineas={[{t: '¿ASÍ', s: 420}, {t: 'subes', it: true, s: 360}, {t: 'TUS PLATOS?', s: 300}]} x={100} y={110} />
        <Publicacion x={430} y={1130} w={1060} rot={4} foto="anuncio/foto-movil-pizza.jpg" megusta="3 ME GUSTA" seed={11} />
        <Cinta x={560} y={1050} rot={-8} />
        <Cinta x={1180} y={1110} rot={10} w={300} />
        <Img src={staticFile('anuncio/mano-movil.png')} style={{position: 'absolute', left: -60, top: 1800, width: 760, transform: 'rotate(-10deg)', filter: 'drop-shadow(0 22px 26px rgba(10,10,10,.35))'}} />
        <Pegatina src="papel/destello.png" x={1300} y={230} w={200} rot={8} />
      </Hoja>

      {/* 2 · Qué hay hoy: una nota y los formatos */}
      <Hoja x={bx} y={by} tono="cobalto" rot={0.8}>
        <Titular lineas={[{t: '¿QUÉ HAY', s: 330}, {t: 'hoy?', it: true, s: 320}]} x={110} y={120} color={C.papel} />
        <div style={{position: 'absolute', left: 90, top: 900, width: 1440, height: 980, transform: 'rotate(-2.5deg)', filter: SOMBRA}}>
          <Img src={staticFile('papel/rasgado.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
          <div style={{position: 'absolute', left: 150, right: 150, top: 200, fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 800, fontSize: 120, lineHeight: 1.08, letterSpacing: '-0.025em', color: C.tinta}}>
            {texto}
            <span style={{display: 'inline-block', width: 10, height: 110, background: C.cobalto, marginLeft: 10, verticalAlign: '-14px'}} />
          </div>
        </div>
        {pildoras > 0 && <Pildora t="POST" x={140} y={2060} rot={-6} />}
        {pildoras > 1 && <Pildora t="REEL" x={620} y={2140} rot={4} />}
        {pildoras > 2 && <Pildora t="HISTORIA" x={880} y={2420} rot={-3} bg={C.mostaza} />}
      </Hoja>

      {/* 3 · Society: la foto del móvil se arranca y aparece la de estudio */}
      <Hoja x={sx} y={sy} rot={-0.4}>
        <div style={{position: 'absolute', left: 110, top: 120}}>
          <div style={{fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 900, fontSize: 330, lineHeight: 1, letterSpacing: '-0.045em', color: C.tinta, filter: 'url(#tinta)'}}>Society</div>
          <Img src={staticFile('papel/subrayado.png')} style={{width: 1080, marginTop: -30, marginLeft: -10}} />
        </div>
        <div style={{position: 'absolute', left: 130, top: 760, width: tw, height: th, transformStyle: 'preserve-3d'}}>
          <Foto src="anuncio/pizza-estudio.jpg" x={0} y={0} w={tw} h={th} seed={31} pos="50% 62%" />
          {/* Lo que aún no se ha arrancado */}
          <div style={{position: 'absolute', inset: 0, clipPath: rotura(tw, th, 5, y0, y1, true)}}>
            <Foto src="anuncio/foto-movil-pizza.jpg" x={0} y={0} w={tw} h={th} seed={32} />
          </div>
          {/* El trozo arrancado, que se levanta */}
          {arrancado > 0 && arrancado < 1 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transformOrigin: '100% 50%',
                transform: `translate(${980 * arrancado}px, ${90 * arrancado}px) rotateY(${-48 * arrancado}deg) rotate(${9 * arrancado}deg)`,
                filter: 'drop-shadow(0 60px 50px rgba(10,10,10,.5))',
              }}
            >
              <div style={{position: 'absolute', inset: 0, clipPath: rotura(tw, th, 5, y0, y1, false)}}>
                <Foto src="anuncio/foto-movil-pizza.jpg" x={0} y={0} w={tw} h={th} seed={32} />
              </div>
            </div>
          )}
        </div>
        <div style={{position: 'absolute', left: 130, top: 2240, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '44px 50px'}}>
          {['Estrategia', 'Guion', 'Producción', 'Revisión'].map((t, i) => (
            <div key={t} style={{display: 'flex', alignItems: 'center', gap: 26}}>
              <div style={{width: 100, height: 100, border: `9px solid ${C.tinta}`, background: i < pasos ? C.cobalto : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none'}}>
                {i < pasos && (
                  <svg width={64} height={54} viewBox="0 0 24 20" fill="none" stroke={C.papel} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 11 L9 17 L22 3" />
                  </svg>
                )}
              </div>
              <Mono t={t} s={84} />
            </div>
          ))}
        </div>
      </Hoja>

      {/* 4 · Una foto, tres piezas */}
      <Hoja x={px} y={py} rot={0.6}>
        <Titular lineas={[{t: 'UNA FOTO,', s: 300}, {t: 'tres piezas.', it: true, s: 250}]} x={110} y={110} />
        <Foto src="anuncio/pizza-estudio.jpg" x={70} y={900} w={760} h={950} rot={-5} seed={41} pos="50% 62%" />
        <Foto src="papel/reel-porcion.jpg" x={760} y={760} w={760} h={1350} rot={4} seed={42} />
        <Foto src="anuncio/historia-mesa.jpg" x={260} y={1760} w={640} h={1000} rot={-2} seed={43} />
        <Cinta x={260} y={850} rot={-10} w={300} />
        <Cinta x={1000} y={700} rot={8} w={300} />
        <div style={{position: 'absolute', left: 1060, top: 1320, width: 170, height: 170, borderRadius: 85, background: C.cobalto, border: '12px solid #fff', boxShadow: '0 14px 20px rgba(10,10,10,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width={70} height={80} viewBox="0 0 20 24">
            <path d="M3 2 L19 12 L3 22 Z" fill={C.papel} />
          </svg>
        </div>
        <Pegatina src="papel/megafono.png" x={980} y={2180} w={560} rot={-6} />
      </Hoja>

      {/* 5 · El viernes a las 20:30 */}
      <Hoja x={cx} y={cy} rot={-0.7}>
        <Titular lineas={[{t: 'EL VIERNES,', s: 290}, {t: 'a las 20:30.', it: true, s: 250}]} x={110} y={120} />
        <div style={{position: 'absolute', left: 110, top: 930, width: 1400, display: 'flex', justifyContent: 'space-between'}}>
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => (
            <div key={d} style={{width: 180, height: 260, background: '#fbf9f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.display, fontSize: 170, color: C.tinta, boxShadow: '0 10px 16px rgba(10,10,10,.22)'}}>
              {d}
            </div>
          ))}
        </div>
        {viernes && (
          <Pegatina src="papel/estallido.png" x={838} y={850} w={360} rot={-8}>
            <div style={{fontFamily: FONT.display, fontSize: 100, lineHeight: 0.95, color: C.tinta}}>
              VIE
              <br />
              20:30
            </div>
          </Pegatina>
        )}
        <Foto src="anuncio/pizza-estudio.jpg" x={420} y={1500} w={820} h={1030} rot={3} seed={51} pos="50% 62%" />
        <Cinta x={680} y={1440} rot={-4} w={320} />
      </Hoja>

      {/* 6 · Después: la misma pizza, a su hora */}
      <Hoja x={dx} y={dy} tono="tinta" rot={0.5}>
        <Titular lineas={[{t: '962', s: 520}, {t: 'me gusta.', it: true, s: 300}]} x={110} y={60} color={C.papel} />
        <Publicacion x={300} y={1100} w={1100} rot={-3} foto="anuncio/pizza-estudio.jpg" megusta={megusta} lleno seed={61} pos="50% 62%" />
        <Pegatina src="papel/corazon.png" x={90} y={1500} w={300} rot={-12} />
        <Pegatina src="papel/corazon.png" x={1300} y={1020} w={240} rot={14} />
        <Pegatina src="papel/estallido.png" x={1060} y={2330} w={500} rot={9}>
          <div style={{fontFamily: FONT.display, fontSize: 120, lineHeight: 0.92, color: C.tinta}}>
            MÁS
            <br />
            MESAS
          </div>
        </Pegatina>
      </Hoja>
    </div>
  );
};

// Cámara 3D: (x, y) del tablero en el centro de la pantalla, zoom s, inclinación y giro.
export const Camara3D: React.FC<{x: number; y: number; s: number; incl?: number; giro?: number; children: React.ReactNode}> = ({x, y, s, incl = 0, giro = 0, children}) => (
  <AbsoluteFill style={{perspective: 2600, perspectiveOrigin: '50% 45%', background: '#1a1917', overflow: 'hidden'}}>
    <AbsoluteFill style={{opacity: 0.5}}>
      <Img src={staticFile('img/papel-oscuro.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </AbsoluteFill>
    <div style={{position: 'absolute', left: 540, top: 960, transformStyle: 'preserve-3d', transformOrigin: '0 0', transform: `rotateX(${incl}deg) rotateZ(${giro}deg) scale(${s}) translate(${-x}px, ${-y}px)`}}>
      {children}
    </div>
  </AbsoluteFill>
);
