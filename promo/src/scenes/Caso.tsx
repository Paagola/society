import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Headline, Paper, PillSticker, Sparkle, StarSticker, Tag} from '../components';
import type {Line} from '../components';
import {COPY} from '../copy';
import {useWide} from '../format';
import {C, EASE, EASE_OUT, FONT, PAD, tween} from '../theme';
import {At, Phone3D, PhotoCard, Seal, SCREEN, Stage, Stamp} from '../three';
import {BEAT_F, CUTS, REEL, useBt} from '../timing';

const K = COPY.caso;

// Zona segura de Reels (1080 × 1920): arriba 210 px, abajo 310 px, derecha 84 px.
// Los titulares de paso empiezan en y = 250 y nada importante baja de y = 1600.

// Número de paso en cobalto (se estampa en el tiempo de entrada) + titular.
const Title: React.FC<{num: string; lines: Line[]; color?: string; o?: number}> = ({num, lines, color = C.tinta, o = 1}) => {
  const wide = useWide();
  const bt = useBt();
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - (bt(0) - 2), fps, config: {damping: 11, stiffness: 210, mass: 0.7}});
  return (
    // Capa propia por encima del escenario 3D: si no, Chrome puede pintar las tarjetas cercanas encima del titular.
    <div style={{position: 'absolute', inset: 0, zIndex: 10, opacity: o}}>
      <div
        style={{
          position: 'absolute',
          ...(wide ? {left: PAD - 6, top: 600} : {right: PAD + 20, top: 215}),
          fontFamily: FONT.display,
          fontSize: wide ? 260 : 270,
          lineHeight: 1,
          color: C.cobalto,
          filter: 'url(#tinta)',
          transform: `scale(${f < bt(0) - 2 ? 0 : 1.6 - 0.6 * s}) rotate(${(1 - s) * -8}deg)`,
          transformOrigin: wide ? '0 50%' : '100% 50%',
          opacity: Math.min(1, s * 3),
        }}
      >
        {num}
      </div>
      <Headline lines={lines} size={wide ? 190 : 196} at={0} ats={[bt(0) - 5, bt(0.5) - 5]} dur={10} color={color} style={{position: 'absolute', left: PAD - 4, top: wide ? 150 : 250}} />
    </div>
  );
};

const useSpring = (at: number, damping = 14, stiffness = 120, mass = 1) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - at, fps, config: {damping, stiffness, mass}});
};

// La foto real de los rigatoni se amplía desde arriba a la izquierda: se ve el plato entero
// y queda fuera la manga del comensal (arriba a la derecha).
const RIGATONI = {zoom: 1.5, origin: '0% 0%'};

// Aspecto de una tarjeta en un anillo según hacia dónde mira: las de atrás, más oscuras y desenfocadas
// (profundidad de campo); `extra` añade otro filtro (desenfoque de movimiento).
const ringLook = (facing: number, extra = ''): React.CSSProperties => {
  const back = Math.max(0, Math.min(1, (0.85 - facing) / 1.6));
  const dof = back * 5;
  return {filter: `${extra} blur(${dof.toFixed(2)}px) brightness(${(1 - back * 0.35).toFixed(3)})`.trim()};
};

// Reflejo en el suelo (brillo de mesa lacada), sobre fondo oscuro o claro.
const REFLECT_DARK: React.CSSProperties = {WebkitBoxReflect: 'below 14px linear-gradient(transparent 62%, rgba(255,255,255,.22))'} as React.CSSProperties;
const REFLECT_LIGHT: React.CSSProperties = {WebkitBoxReflect: 'below 18px linear-gradient(transparent 58%, rgba(255,255,255,.34))'} as React.CSSProperties;

// Filtro SVG de desenfoque de movimiento solo en horizontal (en el plano de cada tarjeta).
const MotionBlurDefs: React.FC<{id: string; amount: number}> = ({id, amount}) => (
  <svg width={0} height={0} style={{position: 'absolute'}}>
    <defs>
      <filter id={id} x="-25%" y="-5%" width="150%" height="110%">
        <feGaussianBlur stdDeviation={`${amount.toFixed(2)} 0`} />
      </filter>
    </defs>
  </svg>
);

// Luz suave detrás del objeto principal de la escena.
const Glow: React.FC<{x: number; y: number; r: number; color: string}> = ({x, y, r, color}) => (
  <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`}} />
);

// ---------------------------------------------------------------------------
// Portadilla del caso: etiqueta grande, «DE 4 FOTOS a un reel.» y las cuatro fotos reales en abanico.
// ---------------------------------------------------------------------------
const REALES = ['real-pizza.jpg', 'real-paella.jpg', 'real-rigatoni.jpg', 'real-sala.jpg'];

// Portadilla del caso: las cuatro fotos reales se reparten en abanico, una por corchea, como un
// fotógrafo que enseña su tira de copias. Todas giran en su propio plano y cada una va unos
// píxeles por encima de la anterior: se solapan sin atravesarse.
export const CasoIntro: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wide = useWide();
  const bt = useBt();
  const tilt = tween(f, bt(0) - 8, bt(1), [70, 0], EASE_OUT);
  const cw = wide ? 300 : 340;
  const ch = Math.round(cw * 1.27);
  const Rf = wide ? 560 : 620; // radio del abanico
  const pivotY = wide ? 600 : 700; // pivote del abanico, por debajo del centro
  const stageX = wide ? 1420 : 540;
  const stageY = wide ? 600 : 1150;
  return (
    <AbsoluteFill>
      <Paper tint={C.cobalto} />
      <Glow x={stageX} y={stageY + 40} r={wide ? 560 : 640} color="rgba(236,232,220,.18)" />
      <Stage x={stageX} y={stageY} persp={2200} rx={-6 + Math.sin(f / 34) * 3} ry={Math.sin(f / 26) * 8}>
        {REALES.map((src, i) => {
          const startF = bt(1 + i * 0.5) - 6;
          if (f < startF) return null;
          const sp = spring({frame: f - startF, fps, config: {damping: 14, stiffness: 150, mass: 0.8}});
          const theta = (i - 1.5) * 15 * sp; // grados
          const t = (theta * Math.PI) / 180;
          const x = Rf * Math.sin(t);
          const y = pivotY - Rf * Math.cos(t) + (1 - sp) * 420;
          return (
            <At key={src} x={x} y={y} z={10 + i * 18} rz={theta} s={0.7 + 0.3 * sp}>
              <div style={{boxShadow: `0 ${24 + i * 4}px 50px rgba(10,20,80,.35)`, borderRadius: 6}}>
                <PhotoCard src={src} w={cw} h={ch} angle={theta * 2 + Math.sin(f / 26) * 12} />
              </div>
            </At>
          );
        })}
      </Stage>
      <Tag x={PAD} y={wide ? 90 : 250} at={bt(0.5) - 3} text={K.etiqueta} size={wide ? 52 : 58} rot={-2} />
      <div style={{position: 'absolute', left: 0, top: 0, perspective: 1600, perspectiveOrigin: '30% 30%', zIndex: 10}}>
        <div style={{transform: `rotateX(${tilt}deg)`, transformOrigin: '0 50% 0'}}>
          <Headline lines={K.titular} size={wide ? 220 : 236} at={0} ats={[bt(0) - 6, bt(0.5) - 5]} dur={10} color={C.papel} style={{position: 'absolute', left: PAD - 6, top: wide ? 200 : 380}} />
        </div>
      </div>
      <Sparkle x={wide ? 1000 : 930} y={wide ? 200 : 360} size={100} at={bt(1.5)} seed={21} color={C.mostaza} />
      <Sparkle x={wide ? 820 : 150} y={wide ? 930 : 1560} size={70} at={bt(3)} seed={22} color={C.papel} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 01 · Tus fotos: las cuatro fotos reales caen sobre la mesa, una por tiempo, y se apilan.
// Cada foto aterriza plana exactamente en su tiempo y a una altura propia (de abajo arriba),
// así ninguna atraviesa a otra: la caída acelera como con gravedad, sin muelle que la hunda.
// Al tocar la mesa: rebote corto, golpe de cámara y la etiqueta del plato.
// ---------------------------------------------------------------------------
const MESA = [
  {src: 'real-pizza.jpg', w: 470, h: 352, x: -185, y: -330, rz: -7, tag: K.fotos.platos[0]},
  {src: 'real-paella.jpg', w: 330, h: 440, x: 215, y: -195, rz: 6, tag: K.fotos.platos[1]},
  {src: 'real-rigatoni.jpg', w: 460, h: 322, x: -195, y: 185, rz: 4, tag: K.fotos.platos[2], ...RIGATONI},
  {src: 'real-sala.jpg', w: 330, h: 440, x: 205, y: 300, rz: -5, tag: K.fotos.platos[3]},
];
const STACK = 14; // separación vertical entre fotos apiladas (px en el espacio 3D)

// Proyección de un punto del escenario a pantalla, igual que el CSS de <Stage> (rotateZ → rotateX → perspectiva).
const project = (px: number, py: number, pz: number, rx: number, rz: number, persp: number, z0 = 0) => {
  const cz = Math.cos((rz * Math.PI) / 180);
  const sz = Math.sin((rz * Math.PI) / 180);
  const x1 = px * cz - py * sz;
  const y1 = px * sz + py * cz;
  const cx = Math.cos((rx * Math.PI) / 180);
  const sx = Math.sin((rx * Math.PI) / 180);
  const y2 = y1 * cx - pz * sx;
  const z2 = y1 * sx + pz * cx + z0;
  const k = persp / (persp - z2);
  return {x: x1 * k, y: y2 * k};
};

export const Fotos: React.FC = () => {
  const f = useCurrentFrame();
  const wide = useWide();
  const bt = useBt();
  const persp = 2000;
  const rx = tween(f, 0, bt(8), [50, 42], (t) => t);
  const rz = tween(f, 0, bt(8), [-5, 3], (t) => t);
  const fallF = BEAT_F * 0.95;
  const landAt = MESA.map((_, i) => bt(1 + i));
  // Golpe de cámara al aterrizar cada foto (se amortigua en unos 6 fotogramas).
  let shakeX = 0;
  let shakeY = 0;
  landAt.forEach((t, i) => {
    const d = f - t;
    if (d >= 0 && d < 14) {
      const k = Math.exp(-d / 3.2);
      shakeX += Math.sin(d * 2.1 + i) * 5 * k;
      shakeY += (Math.cos(d * 2.7) * 7 + 4) * k;
    }
  });
  const stageZ = wide ? 40 : 0;
  const sx = (wide ? 1230 : 540) + shakeX;
  const sy = (wide ? 545 : 1150) + shakeY;
  const cards = MESA.map((m, i) => {
    const p = tween(f, landAt[i] - fallF, landAt[i], [0, 1], (t) => t * t);
    const d = f - landAt[i];
    const bounce = d > 0 ? 22 * Math.exp(-d / 3.5) * Math.abs(Math.sin(d / 2.2)) : 0;
    const base = 6 + i * STACK;
    return {m, i, p, visible: f >= landAt[i] - fallF, z: base + (1 - p) * 950 + bounce, base};
  });
  return (
    <AbsoluteFill>
      <Paper />
      <Stage x={sx} y={sy} persp={persp} rx={rx} rz={rz} z={stageZ}>
        {cards.map(({m, i, p, visible, z, base}) => {
          if (!visible) return null;
          const lift = z - base;
          return (
            <React.Fragment key={m.src}>
              {/* Sombra de contacto: se afila y se oscurece a medida que la foto baja. */}
              <At x={m.x + lift * 0.06} y={m.y + lift * 0.08} z={base - 2} rz={m.rz + (1 - p) * 22}>
                <div
                  style={{
                    width: m.w + 30,
                    height: m.h + 60,
                    borderRadius: 12,
                    background: 'rgba(20,20,20,.45)',
                    filter: `blur(${6 + lift * 0.03}px)`,
                    opacity: 0.55 * p ** 4,
                  }}
                />
              </At>
              <At x={m.x} y={m.y} z={z} rz={m.rz + (1 - p) * 22} rx={(1 - p) * -24} ry={(1 - p) * 10}>
                <PhotoCard src={m.src} w={m.w} h={m.h} angle={rz * 3 + i * 10} zoom={'zoom' in m ? m.zoom : 1} origin={'origin' in m ? m.origin : undefined} />
              </At>
            </React.Fragment>
          );
        })}
      </Stage>
      {/* Etiqueta de cada plato, colocada sobre su foto (proyectada al plano de la pantalla). */}
      {cards.map(({m, i, base}) => {
        const pt = project(m.x - m.w * 0.36, m.y - m.h * 0.5 - 10, base + 20, rx, rz, persp, stageZ);
        return (
          <Tag
            key={m.tag}
            x={sx + pt.x}
            y={sy + pt.y - 30}
            at={landAt[i] + 1}
            text={m.tag}
            size={wide ? 38 : 44}
            rot={i % 2 ? 4 : -4}
            anchor="center"
            bg={i % 2 ? C.papel : C.mostaza}
          />
        );
      })}
      <Title num={K.fotos.num} lines={K.fotos.titular} />
      <StarSticker x={wide ? 820 : 870} y={wide ? 880 : 1500} size={wide ? 200 : 220} at={bt(5) + 1} lines={K.fotos.sello} rot={-10} />
      <Sparkle x={wide ? 1780 : 110} y={wide ? 170 : 640} size={90} at={bt(1.5)} seed={23} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 02 · La IA propone: anillo 3D con todo lo generado. El anillo gira a golpes de corchea
// y trae al frente cada propuesta descartada justo cuando recibe el sello; luego cae.
// ---------------------------------------------------------------------------
const GENERADAS: {src: string; ok: boolean}[] = [
  {src: 'gen-01-portada.jpg', ok: true},
  {src: 'key-K1-descartado-paredes-grises.jpg', ok: false},
  {src: 'gen-02-borde.jpg', ok: true},
  {src: 'gen-descartada-06-mesa-luz-de-dia.jpg', ok: false},
  {src: 'gen-03-prosciutto.jpg', ok: true},
  {src: 'key-K2-masa.jpg', ok: false},
  {src: 'gen-04-rucula.jpg', ok: true},
  {src: 'key-K1-sala-pizza.jpg', ok: false},
  {src: 'gen-05-porcion.jpg', ok: true},
  {src: 'gen-descartada-04-rucula-sin-hueco-titulo.jpg', ok: false},
  {src: 'gen-06-mesa.jpg', ok: true},
  {src: 'key-K4-rigatoni.jpg', ok: false},
  {src: 'key-K5-paella.jpg', ok: false},
  {src: 'key-K3-rucula.jpg', ok: false},
];

export const Crea: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wide = useWide();
  const bt = useBt();
  const n = GENERADAS.length;
  // Radio con hueco entre tarjetas vecinas: la cuerda entre centros supera el ancho de la tarjeta
  // (con 700 px se tocaban los bordes y se cortaban entre sí).
  const CW = wide ? 250 : 300;
  const R = wide ? 650 : 790;
  const grow = useSpring(bt(0) - 6, 16, 70);
  const angle = (i: number) => (i * 360) / n;
  const discarded = GENERADAS.map((g, i) => (g.ok ? -1 : i)).filter((i) => i >= 0);
  // Tiempo del sello de cada descartada: una por corchea, del tiempo 2 al 5,5.
  const stampT = discarded.map((_, k) => bt(2 + k * 0.5));
  // Giro del anillo: llega a −ángulo de la descartada k exactamente en su sello, con frenada seca.
  const keysT = [0, ...stampT, bt(8)];
  const keysA = [-angle(discarded[0]) + 70, ...discarded.map((i) => -angle(i)), -angle(discarded[discarded.length - 1]) - 40];
  let ry = keysA[0];
  for (let s = 0; s < keysT.length - 1; s++) {
    if (f >= keysT[s]) {
      const p = interpolate(f, [keysT[s], keysT[s + 1]], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const eased = s === 0 || s === keysT.length - 2 ? EASE_OUT(p) : EASE(p);
      ry = keysA[s] + (keysA[s + 1] - keysA[s]) * eased;
    }
  }
  // Velocidad del giro → desenfoque de movimiento horizontal (solo mientras el anillo corre).
  const ryAt = (fr: number) => {
    let v = keysA[0];
    for (let s2 = 0; s2 < keysT.length - 1; s2++) {
      if (fr >= keysT[s2]) {
        const p2 = interpolate(fr, [keysT[s2], keysT[s2 + 1]], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        v = keysA[s2] + (keysA[s2 + 1] - keysA[s2]) * (s2 === 0 || s2 === keysT.length - 2 ? EASE_OUT(p2) : EASE(p2));
      }
    }
    return v;
  };
  const speed = Math.abs(ryAt(f + 0.5) - ryAt(f - 0.5)) * (Math.PI / 180) * R; // px por fotograma
  const blur = Math.min(14, speed * 0.18);
  return (
    <AbsoluteFill>
      <Paper dark />
      <MotionBlurDefs id="mbRing" amount={blur} />
      <Glow x={wide ? 1340 : 540} y={wide ? 620 : 1200} r={wide ? 460 : 560} color="rgba(245,197,24,.14)" />
      <Stage x={wide ? 1340 : 540} y={wide ? 590 : 1150} persp={2400} rx={-8} ry={ry}>
        {GENERADAS.map((g, i) => {
          const a = angle(i);
          const facing = Math.cos(((a + ry) * Math.PI) / 180);
          const k = discarded.indexOf(i);
          const stampAt = k >= 0 ? stampT[k] - 2 : 0;
          const stamp = k < 0 ? 0 : spring({frame: f - stampAt, fps, config: {damping: 12, stiffness: 240}});
          const drop = k < 0 ? 0 : tween(f, stampAt + BEAT_F * 0.6, stampAt + BEAT_F * 1.4, [0, 1], (t) => t * t);
          return (
            <At key={g.src} ry={a} s={grow}>
              <div style={{transform: `translateZ(${R}px) translateY(${drop * 1100}px) rotateX(${drop * -55}deg)`, opacity: (0.3 + 0.7 * Math.max(0, facing)) * (1 - drop)}}>
                <div style={{...ringLook(facing, blur > 0.4 && facing > 0 ? 'url(#mbRing)' : ''), ...REFLECT_DARK}}>
                  <PhotoCard src={g.src} w={CW} h={Math.round(CW * 1.32)} dark angle={a + ry}>
                    <Stamp text={K.crea.descartada} p={f >= stampAt ? stamp : 0} size={44} />
                  </PhotoCard>
                </div>
              </div>
            </At>
          );
        })}
      </Stage>
      <Title num={K.crea.num} lines={K.crea.titular} color={C.papel} />
      <StarSticker x={wide ? 1780 : 860} y={wide ? 900 : 1500} size={wide ? 190 : 210} at={bt(1) - 1} lines={K.crea.sello} rot={8} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 03 · Tú eliges: las seis aprobadas llegan desde el fondo y reciben el sello mostaza, una por corchea.
// ---------------------------------------------------------------------------
const APROBADAS = GENERADAS.filter((g) => g.ok).map((g) => g.src);

export const Aprueba: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wide = useWide();
  const bt = useBt();
  const cw = wide ? 240 : 270;
  const ch = Math.round(cw * 1.24);
  const gx = cw + 48;
  const gy = ch + 56;
  const ry = -9 + Math.sin(f / 30) * 6;
  return (
    <AbsoluteFill>
      <Paper />
      <Stage x={wide ? 1280 : 540} y={wide ? 580 : 1190} persp={2200} rx={14} ry={ry}>
        {APROBADAS.map((src, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const s = spring({frame: f - (bt(i * 0.25) - 8), fps, config: {damping: 15, stiffness: 110}});
          const sealAt = bt(2 + i * 0.5) - 2;
          const seal = spring({frame: f - sealAt, fps, config: {damping: 9, stiffness: 200}});
          return (
            <At key={src} x={(col - 1) * gx} y={(row - 0.5) * gy} z={(1 - s) * -2200 + seal * 30} ry={(1 - s) * 60} rz={(i % 2 ? 2 : -2) * s} o={Math.min(1, s * 3)}>
              <PhotoCard src={src} w={cw} h={ch} angle={ry + col * 12}>
                <Seal p={f >= sealAt ? seal : 0} size={cw * 0.44} />
              </PhotoCard>
            </At>
          );
        })}
      </Stage>
      <Title num={K.aprueba.num} lines={K.aprueba.titular} />
      <Sparkle x={wide ? 1830 : 110} y={wide ? 160 : 700} size={90} at={bt(5)} seed={25} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 04 · Y sale el carrusel. Plano de producto: las siete láminas llegan repartidas como cartas
// y forman una tira en perspectiva sobre una mesa lacada (con reflejo). En cada tiempo la tira
// se desliza una lámina con desenfoque de movimiento; la lámina activa se adelanta y el
// contador gira como un marcador. Las tarjetas están en el mismo plano con hueco entre ellas:
// ninguna atraviesa a otra.
// ---------------------------------------------------------------------------
const LAMINAS = ['01', '02', '03', '04', '05', '06', '07'].map((n) => `lamina-${n}.jpg`);
const SWIPE = Easing.bezier(0.72, 0, 0.16, 1);

export const Carrusel: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wide = useWide();
  const bt = useBt();
  const n = LAMINAS.length;
  const cw = wide ? 400 : 580;
  const ch = Math.round(cw * 1.25);
  const pitch = cw + (wide ? 56 : 72);
  const stepF = BEAT_F * 0.5;
  // Posición de la tira: cada deslizamiento termina justo en el tiempo 1, 2, … 6.
  const cAt = (fr: number) => {
    let c = 0;
    for (let k = 1; k < n; k++) c += tween(fr, bt(k) - stepF, bt(k), [0, 1], SWIPE);
    return c;
  };
  const c = cAt(f);
  const speed = Math.abs(cAt(f + 0.5) - cAt(f - 0.5)) * pitch;
  const blur = Math.min(28, speed * 0.32);
  const stageX = wide ? 1400 : 540;
  const stageY = wide ? 560 : 1075;
  const ry = (wide ? -18 : -15) + Math.sin(f / 38) * 2.5;
  const rx = 7;
  const active = Math.round(c);
  // Contador tipo marcador: la columna de cifras rueda con la tira.
  const counterSize = wide ? 110 : 140;
  return (
    <AbsoluteFill>
      <Paper />
      {/* Mesa: el papel se oscurece un poco bajo la tira para que el reflejo tenga dónde apoyarse. */}
      <AbsoluteFill style={{background: `linear-gradient(180deg, rgba(20,20,20,0) ${wide ? 52 : 50}%, rgba(20,20,20,.10) ${wide ? 78 : 74}%, rgba(20,20,20,0) 100%)`}} />
      <MotionBlurDefs id="mbCarr" amount={blur} />
      <Stage x={stageX} y={stageY} persp={wide ? 1700 : 1900} rx={rx} ry={ry}>
        {LAMINAS.map((src, i) => {
          // Reparto de entrada: cada lámina llega desde la derecha y el fondo, una tras otra.
          const deal = spring({frame: f - (bt(-0.7 + i * 0.13) - 2), fps, config: {damping: 17, stiffness: 130, mass: 0.9}});
          const d = i - c;
          const ad = Math.abs(d);
          const act = Math.max(0, 1 - ad);
          const x = d * pitch + (1 - deal) * (1500 + i * 120);
          const z = act * (wide ? 70 : 90) - (1 - deal) * 900;
          const shade = Math.min(0.5, Math.max(0, ad - 0.35) * 0.22);
          // En 16:9 las láminas ya vistas se apagan antes de llegar a la columna del titular.
          const o = (wide ? Math.max(0, Math.min(1, d < 0 ? (1.55 + d) / 0.55 : (3.2 - d) / 0.8)) : Math.max(0, Math.min(1, (3.6 - ad) / 0.8))) * Math.min(1, deal * 2);
          return (
            <At key={src} x={x} z={z} ry={(1 - deal) * -40} rz={(1 - deal) * 8} s={1 + act * 0.035} o={o}>
              <div style={{...REFLECT_LIGHT}}>
                <div
                  style={{
                    position: 'relative',
                    filter: blur > 0.4 ? 'url(#mbCarr)' : undefined,
                    boxShadow: `0 ${30 + act * 20}px ${60 + act * 30}px rgba(20,20,20,${0.28 + act * 0.12}), 0 0 0 ${act * 7}px ${C.mostaza}`,
                    borderRadius: 6,
                  }}
                >
                  <PhotoCard src={src} w={cw} h={ch} border={0} angle={d * 24 + ry} />
                  <div style={{position: 'absolute', inset: 0, background: '#141414', opacity: shade, borderRadius: 6}} />
                </div>
              </div>
            </At>
          );
        })}
      </Stage>
      <Title num={K.carrusel.num} lines={K.carrusel.titular} />
      {/* Marcador «01/07» y paginación: se mueven con la tira. */}
      <div style={{position: 'absolute', zIndex: 10, left: PAD, top: wide ? 890 : 1440, display: 'flex', alignItems: 'flex-end', gap: 14, opacity: tween(f, bt(0), bt(0.5))}}>
        <div style={{height: counterSize, overflow: 'hidden'}}>
          <div style={{transform: `translateY(${-c * counterSize}px)`}}>
            {LAMINAS.map((_, i) => (
              <div key={i} style={{height: counterSize, fontFamily: FONT.display, fontSize: counterSize, lineHeight: 1, color: C.cobalto, filter: 'url(#tinta)'}}>
                {String(i + 1).padStart(2, '0')}
              </div>
            ))}
          </div>
        </div>
        <div style={{fontFamily: FONT.display, fontSize: counterSize * 0.46, lineHeight: 1.1, color: C.tinta, paddingBottom: counterSize * 0.06}}>/ 07</div>
        <div style={{display: 'flex', gap: 10, marginLeft: 18, paddingBottom: counterSize * 0.2}}>
          {LAMINAS.map((_, i) => {
            const on = Math.max(0, 1 - Math.abs(i - c));
            return <div key={i} style={{width: 16 + on * 26, height: 16, borderRadius: 8, background: on > 0.5 ? C.mostaza : C.tinta, opacity: 0.35 + on * 0.65}} />;
          })}
        </div>
      </div>
      {active === n - 1 && <Tag x={wide ? 1560 : 700} y={wide ? 150 : 1470} at={bt(n - 1) + 1} text={K.carrusel.listo} size={wide ? 44 : 52} rot={-6} />}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 05 · Y el reel: el móvil entra con la pantalla apagada, se enciende en el tiempo 3,
// la cámara se mete en la pantalla y aterriza en el primer golpe del reel (tiempo 4).
// Se ve a pantalla completa hasta su cartela; la cámara sale y la cartela se lee en el móvil.
// El sonido del reel va en la banda sonora (el vídeo va silenciado aquí).
// ---------------------------------------------------------------------------
export const Reel: React.FC = () => {
  const f = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const wide = useWide();
  const bt = useBt();
  const onBeat = REEL.screen_on_beat - CUTS.Reel; // 3: se enciende la pantalla
  const inB = REEL.downbeat_beat - CUTS.Reel; // 4: primer golpe del reel
  const enter = spring({frame: f - bt(-0.5), fps, config: {damping: 17, stiffness: 80}});
  // Entrada en la pantalla: acelera y frena en seco en el golpe.
  const pushIn = tween(f, bt(onBeat) + 2, bt(inB), [0, 1], (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2));
  const pushOut = tween(f, bt(26), bt(28), [0, 1], EASE);
  const push = pushIn - pushOut;
  const base = wide ? 0.4 : 0.44;
  const hold = wide ? 0.46 : 0.55; // al salir, el móvil queda más grande para leer la cartela
  const full = height / SCREEN.h;
  const rest = f < bt(20) ? base : hold;
  const s = rest + (full - rest) * push;
  const cxRest = f < bt(20) ? (wide ? 1330 : 540) : wide ? 1250 : 540;
  const cyRest = f < bt(20) ? (wide ? 560 : 1180) : wide ? 560 : 1000;
  const cx = interpolate(push, [0, 1], [cxRest, width / 2]);
  const cy = interpolate(push, [0, 1], [cyRest, height / 2]);
  const orbit = f < bt(20) ? tween(f, 0, bt(onBeat), [0, 22], (t) => t) : tween(f, bt(26), bt(32), [-8, 6], EASE_OUT);
  const ry = (-80 * (1 - enter) - 14 + orbit) * (1 - push);
  const rx = (12 * (1 - enter) + 4 + Math.sin(f / 26) * 2) * (1 - push);
  const z = -1000 * (1 - enter);
  const titleOut = wide ? 1 : 1 - tween(f, bt(onBeat), bt(onBeat) + 8);
    const chrome = 1 - tween(push, 0.55, 0.95, [0, 1], (t) => t);
  return (
    <AbsoluteFill>
      <Paper />
      <Title num={K.reel.num} lines={K.reel.titular} o={titleOut} />
      <Stage x={cx} y={cy} persp={3200} rx={rx} ry={ry} z={z}>
        <At s={s} y={Math.sin(f / 22) * 10 * (1 - push)}>
          <Phone3D video={REEL.file} startFrom={Math.round(REEL.start_from_s * fps)} volume={0} onAt={bt(onBeat)} angle={ry} chrome={chrome} />
        </At>
      </Stage>
      {push < 0.05 && <Sparkle x={wide ? 1790 : 120} y={wide ? 200 : 820} size={90} at={bt(1)} seed={26} />}
      <PillSticker x={wide ? 1520 : 520} y={wide ? 840 : 1480} at={bt(28.5) - 1} size={wide ? 40 : 48} rot={-6} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Resultado (entra con la vuelta de la música): foto real → propuesta aprobada → lámina lista.
// ---------------------------------------------------------------------------
const CADENA = [
  {src: 'real-pizza.jpg', w: 300, h: 225},
  {src: 'gen-01-portada.jpg', w: 250, h: 310},
  {src: 'lamina-01.jpg', w: 250, h: 312},
];

export const Resultado: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wide = useWide();
  const bt = useBt();
  const sway = Math.sin(f / 34) * 7;
  const gap = wide ? 340 : 330;
  const stageX = wide ? 1300 : 540;
  const stageY = wide ? 570 : 1010;
  return (
    <AbsoluteFill>
      <Paper tint={C.cobalto} />
      <Headline lines={K.resultado.titular} size={wide ? 190 : 210} at={0} ats={[bt(0) - 5, bt(0.5) - 5]} dur={10} color={C.papel} style={{position: 'absolute', left: PAD - 6, top: wide ? 110 : 250}} />
      <Stage x={stageX} y={stageY} persp={2000} rx={8} ry={sway}>
        {CADENA.map((c, i) => {
          const s = spring({frame: f - (bt(1 + i) - 7), fps, config: {damping: 14, stiffness: 140}});
          const x = (i - 1) * gap;
          return (
            <React.Fragment key={c.src}>
              <At x={x} ry={(1 - s) * 85 - (i - 1) * 12} z={(1 - s) * -800 + (i === 2 ? 60 : 0)} o={Math.min(1, s * 3)}>
                <PhotoCard src={c.src} w={c.w} h={c.h} angle={sway + i * 14} />
              </At>
              {i < 2 && (
                <At x={x + gap / 2} z={80} s={spring({frame: f - (bt(1.5 + i) - 3), fps, config: {damping: 10, stiffness: 200}})}>
                  <svg width={70} height={60} viewBox="0 0 24 20" fill="none" stroke={C.mostaza} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 10 H21 M13 2 L21 10 L13 18" />
                  </svg>
                </At>
              )}
            </React.Fragment>
          );
        })}
      </Stage>
      {/* Etiquetas grandes encima de cada tarjeta (sustituyen a los pies en mono). */}
      {K.resultado.cadena.map((t, i) => (
        <Tag
          key={t}
          x={stageX + (i - 1) * gap}
          y={stageY - (wide ? 260 : 270)}
          at={bt(1 + i) - 1}
          text={t}
          size={wide ? 46 : 50}
          rot={i === 1 ? 3 : -3}
          anchor="center"
          bg={i === 1 ? C.papel : C.mostaza}
        />
      ))}
      <Headline lines={K.resultado.remate} size={wide ? 170 : 180} at={0} ats={[bt(4) - 5, bt(4.5) - 5]} dur={10} color={C.papel} style={{position: 'absolute', left: PAD - 6, top: wide ? 720 : 1260}} />
      <StarSticker x={wide ? 1700 : 870} y={wide ? 900 : 370} size={wide ? 200 : 220} at={bt(6) - 1} lines={K.resultado.sello} rot={9} />
    </AbsoluteFill>
  );
};
