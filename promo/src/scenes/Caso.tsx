import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Headline, Label, Paper, PillSticker, Reveal, Sparkle, StarSticker} from '../components';
import type {Line} from '../components';
import {COPY} from '../copy';
import {useWide} from '../format';
import {C, EASE, EASE_OUT, FONT, PAD, tween} from '../theme';
import {At, Phone3D, PhotoCard, Seal, SCREEN, Stage, Stamp} from '../three';

const K = COPY.caso;

// Duraciones de cada página del caso (fotogramas a 30 fps).
export const D = {intro: 96, fotos: 140, crea: 176, aprueba: 140, reel: 330, carrusel: 156, resultado: 150};

// Número de paso en cobalto + titular, arriba a la izquierda (o columna izquierda en 16:9).
const Title: React.FC<{num: string; lines: Line[]; color?: string; o?: number}> = ({num, lines, color = C.tinta, o = 1}) => {
  const wide = useWide();
  return (
    <div style={{opacity: o}}>
      <Reveal at={2} dur={20} style={wide ? {position: 'absolute', left: PAD - 6, top: 600} : {position: 'absolute', right: PAD - 10, top: 110}}>
        <div style={{fontFamily: FONT.display, fontSize: wide ? 260 : 290, lineHeight: 1, color: C.cobalto, filter: 'url(#tinta)'}}>{num}</div>
      </Reveal>
      <Headline lines={lines} size={wide ? 190 : 200} at={4} stagger={5} color={color} style={{position: 'absolute', left: PAD - 4, top: wide ? 150 : 160}} />
    </div>
  );
};

const useSpring = (at: number, damping = 14, stiffness = 120) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - at, fps, config: {damping, stiffness}});
};

// ---------------------------------------------------------------------------
// Portadilla del caso: DE 4 FOTOS a un reel, con las cuatro fotos reales girando en un anillo.
// ---------------------------------------------------------------------------
const REALES = [
  {src: 'real-pizza.jpg', w: 360, h: 270},
  {src: 'real-paella.jpg', w: 250, h: 334},
  {src: 'real-rigatoni.jpg', w: 360, h: 252},
  {src: 'real-sala.jpg', w: 250, h: 334},
];

export const CasoIntro: React.FC = () => {
  const f = useCurrentFrame();
  const wide = useWide();
  const tilt = tween(f, 0, 30, [78, 0], EASE_OUT);
  const ring = useSpring(10, 18, 70);
  return (
    <AbsoluteFill>
      <Paper tint={C.cobalto} />
      <Stage x={wide ? 1380 : 540} y={wide ? 560 : 1360} rx={-10} ry={-f * 1.6}>
        {REALES.map((r, i) => {
          const a = i * 90;
          return (
            <At key={r.src} ry={a} z={0} s={ring}>
              <div style={{transform: `translateZ(${wide ? 380 : 420}px)`}}>
                <PhotoCard src={r.src} w={r.w * 0.85} h={r.h * 0.85} angle={a - f * 1.6} />
              </div>
            </At>
          );
        })}
      </Stage>
      <Label color={C.mostaza} size={wide ? 30 : 34} style={{position: 'absolute', left: PAD, top: wide ? 110 : 190, opacity: tween(f, 2, 12)}}>
        {K.etiqueta}
      </Label>
      <div style={{position: 'absolute', left: 0, top: 0, perspective: 1600, perspectiveOrigin: '30% 30%'}}>
        <div style={{transform: `rotateX(${tilt}deg)`, transformOrigin: '0 50% 0'}}>
          <Headline lines={K.titular} size={wide ? 230 : 240} at={4} stagger={7} color={C.papel} style={{position: 'absolute', left: PAD - 6, top: wide ? 180 : 280}} />
        </div>
      </div>
      <Sparkle x={wide ? 1000 : 920} y={wide ? 180 : 250} size={100} at={24} seed={21} color={C.mostaza} />
      <Sparkle x={wide ? 820 : 150} y={wide ? 900 : 1760} size={70} at={34} seed={22} color={C.papel} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 01 · Tus fotos: las cuatro fotos reales caen sobre una mesa en perspectiva.
// ---------------------------------------------------------------------------
const MESA = [
  {src: 'real-pizza.jpg', w: 420, h: 315, x: -150, y: -290, rz: -8, cap: 'Real · pizza'},
  {src: 'real-paella.jpg', w: 300, h: 400, x: 195, y: -140, rz: 7, cap: 'Real · paella'},
  {src: 'real-rigatoni.jpg', w: 410, h: 287, x: -170, y: 170, rz: 5, cap: 'Real · rigatoni'},
  {src: 'real-sala.jpg', w: 300, h: 400, x: 190, y: 290, rz: -6, cap: 'Real · sala'},
];

export const Fotos: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wide = useWide();
  const rx = tween(f, 0, D.fotos, [58, 40], (t) => t);
  const rz = tween(f, 0, D.fotos, [-8, 5], (t) => t);
  return (
    <AbsoluteFill>
      <Paper />
      <Stage x={wide ? 1250 : 540} y={wide ? 560 : 1240} persp={2000} rx={rx} rz={rz} z={wide ? -200 : 0}>
        {MESA.map((m, i) => {
          const s = spring({frame: f - 12 - i * 9, fps, config: {damping: 13, stiffness: 110, mass: 0.9}});
          return (
            <At key={m.src} x={m.x} y={m.y} z={(1 - s) * 1300} rz={m.rz + (1 - s) * 30} rx={(1 - s) * -30} o={f < 12 + i * 9 ? 0 : 1}>
              <PhotoCard src={m.src} w={m.w} h={m.h} caption={m.cap} angle={rz * 3 + i * 10} />
            </At>
          );
        })}
      </Stage>
      <Title num={K.fotos.num} lines={K.fotos.titular} />
      <StarSticker x={wide ? 820 : 830} y={wide ? 880 : 1720} size={wide ? 190 : 220} at={62} lines={K.fotos.sello} rot={-10} />
      <Sparkle x={wide ? 1780 : 110} y={wide ? 170 : 620} size={90} at={30} seed={23} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 02 · La IA propone: anillo 3D con todo lo generado; lo descartado se sella y cae.
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
  const n = GENERADAS.length;
  const R = wide ? 560 : 700;
  const grow = useSpring(4, 16, 60);
  const ry = -f * 0.95 - 30;
  let k = 0;
  return (
    <AbsoluteFill>
      <Paper dark />
      <Stage x={wide ? 1340 : 540} y={wide ? 560 : 1250} persp={2400} rx={-8} ry={ry}>
        {GENERADAS.map((g, i) => {
          const a = (i * 360) / n;
          const facing = Math.cos(((a + ry) * Math.PI) / 180);
          const idx = g.ok ? -1 : k++;
          const stampAt = 66 + idx * 5;
          const stamp = g.ok ? 0 : spring({frame: f - stampAt, fps, config: {damping: 12, stiffness: 200}});
          const drop = g.ok ? 0 : tween(f, stampAt + 26, stampAt + 50, [0, 1], EASE);
          return (
            <At key={g.src} ry={a} s={grow}>
              <div style={{transform: `translateZ(${R}px) translateY(${drop * 900}px) rotateX(${drop * -50}deg)`, opacity: (0.35 + 0.65 * Math.max(0, facing)) * (1 - drop)}}>
                <PhotoCard src={g.src} w={250} h={330} dark angle={a + ry}>
                  <Stamp text={K.crea.descartada} p={stamp} size={40} />
                </PhotoCard>
              </div>
            </At>
          );
        })}
      </Stage>
      <Title num={K.crea.num} lines={K.crea.titular} color={C.papel} />
      <Sparkle x={wide ? 1800 : 980} y={wide ? 900 : 1780} size={80} at={40} seed={24} color={C.mostaza} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 03 · Tú eliges: las seis aprobadas llegan desde el fondo y reciben el sello mostaza.
// ---------------------------------------------------------------------------
const APROBADAS = GENERADAS.filter((g) => g.ok).map((g) => g.src);

export const Aprueba: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wide = useWide();
  const cw = wide ? 240 : 262;
  const ch = Math.round(cw * 1.24);
  const gx = cw + 50;
  const gy = ch + 60;
  const ry = -9 + Math.sin(f / 30) * 6;
  return (
    <AbsoluteFill>
      <Paper />
      <Stage x={wide ? 1280 : 540} y={wide ? 580 : 1260} persp={2200} rx={14} ry={ry}>
        {APROBADAS.map((src, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const s = spring({frame: f - 6 - i * 5, fps, config: {damping: 15, stiffness: 90}});
          const seal = spring({frame: f - 48 - i * 7, fps, config: {damping: 9, stiffness: 180}});
          return (
            <At key={src} x={(col - 1) * gx} y={(row - 0.5) * gy} z={(1 - s) * -2200 + seal * 30} ry={(1 - s) * 60} rz={(i % 2 ? 2 : -2) * s} o={Math.min(1, s * 3)}>
              <PhotoCard src={src} w={cw} h={ch} angle={ry + col * 12}>
                <Seal p={f >= 48 + i * 7 ? seal : 0} size={cw * 0.42} />
              </PhotoCard>
            </At>
          );
        })}
      </Stage>
      <Title num={K.aprueba.num} lines={K.aprueba.titular} />
      <Sparkle x={wide ? 1830 : 100} y={wide ? 160 : 700} size={90} at={50} seed={25} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 04 · Y sale el reel: móvil 3D con el reel v6 real; la cámara entra en la pantalla y vuelve a salir.
// ---------------------------------------------------------------------------
export const Reel: React.FC = () => {
  const f = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const wide = useWide();
  const enter = spring({frame: f, fps, config: {damping: 17, stiffness: 70}});
  const push = tween(f, 116, 148, [0, 1], EASE) - tween(f, 262, 294, [0, 1], EASE);
  const base = wide ? 0.4 : 0.44;
  const full = height / SCREEN.h;
  const s = base + (full - base) * push;
  const cx = interpolate(push, [0, 1], [wide ? 1330 : 540, width / 2]);
  const cy = interpolate(push, [0, 1], [wide ? 560 : 1250, height / 2]);
  const orbit = tween(f, 20, 116, [0, 24], (t) => t) + tween(f, 294, 330, [0, -10], EASE_OUT);
  const ry = (-80 * (1 - enter) - 14 + orbit) * (1 - push);
  const rx = (12 * (1 - enter) + 4 + Math.sin(f / 26) * 2) * (1 - push);
  const z = -1000 * (1 - enter);
  const titleOut = 1 - tween(f, 116, 132);
  return (
    <AbsoluteFill>
      <Paper />
      <Title num={K.reel.num} lines={K.reel.titular} o={titleOut} />
      <Stage x={cx} y={cy} persp={3200} rx={rx} ry={ry} z={z}>
        <At s={s} y={Math.sin(f / 22) * 10 * (1 - push)}>
          <Phone3D video="video/reel-v6.mp4" angle={ry} />
        </At>
      </Stage>
      <Sparkle x={wide ? 1790 : 120} y={wide ? 200 : 820} size={90} at={30} seed={26} />
      <PillSticker x={wide ? 1560 : 560} y={wide ? 820 : 1640} at={300} size={wide ? 36 : 44} rot={-6} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 05 · Y el carrusel: las siete láminas en carrusel 3D (coverflow).
// ---------------------------------------------------------------------------
const LAMINAS = ['01', '02', '03', '04', '05', '06', '07'].map((n) => `lamina-${n}.jpg`);

export const Carrusel: React.FC = () => {
  const f = useCurrentFrame();
  const wide = useWide();
  const cw = wide ? 420 : 560;
  const ch = Math.round(cw * 1.25);
  let c = 0;
  for (let i = 0; i < 6; i++) c += tween(f, 22 + i * 18, 36 + i * 18, [0, 1], EASE);
  const enter = tween(f, 0, 24, [0, 1], EASE_OUT);
  return (
    <AbsoluteFill>
      <Paper />
      <Stage x={wide ? 1280 : 540} y={wide ? 590 : 1230} persp={2200} rx={6}>
        {LAMINAS.map((src, i) => {
          const d = i - c;
          const ad = Math.abs(d);
          const sg = Math.sign(d);
          const x = d * (wide ? 150 : 170) + sg * Math.min(ad, 1) * (wide ? 200 : 250);
          return (
            <At key={src} x={x} z={-ad * 260 - (1 - enter) * 1500} ry={-Math.max(-1, Math.min(1, d)) * 52} o={ad > 3.4 ? 0 : enter}>
              <div style={{boxShadow: '0 40px 80px rgba(20,20,20,.35)'}}>
                <PhotoCard src={src} w={cw} h={ch} border={0} angle={d * 30} />
              </div>
            </At>
          );
        })}
      </Stage>
      <Title num={K.carrusel.num} lines={K.carrusel.titular} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Resultado: antes → después en tres tarjetas 3D y el remate.
// ---------------------------------------------------------------------------
const CADENA = [
  {src: 'real-pizza.jpg', w: 300, h: 225, cap: 'Foto real'},
  {src: 'gen-01-portada.jpg', w: 250, h: 310, cap: 'Aprobada'},
  {src: 'lamina-01.jpg', w: 250, h: 312, cap: 'Publicada'},
];

export const Resultado: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wide = useWide();
  const sway = Math.sin(f / 34) * 8;
  return (
    <AbsoluteFill>
      <Paper tint={C.cobalto} />
      <Headline lines={K.resultado.titular} size={wide ? 190 : 210} at={2} stagger={6} color={C.papel} style={{position: 'absolute', left: PAD - 6, top: wide ? 110 : 170}} />
      <Stage x={wide ? 1320 : 540} y={wide ? 560 : 1030} persp={2000} rx={8} ry={sway}>
        {CADENA.map((c, i) => {
          const s = spring({frame: f - 14 - i * 10, fps, config: {damping: 14, stiffness: 110}});
          const x = (i - 1) * (wide ? 330 : 340);
          return (
            <React.Fragment key={c.src}>
              <At x={x} ry={(1 - s) * 85 - (i - 1) * 14} z={(1 - s) * -800 + (i === 2 ? 60 : 0)} o={Math.min(1, s * 3)}>
                <PhotoCard src={c.src} w={c.w} h={c.h} caption={c.cap} angle={sway + i * 14} />
              </At>
              {i < 2 && (
                <At x={x + (wide ? 165 : 170)} z={80} s={spring({frame: f - 24 - i * 10, fps, config: {damping: 10, stiffness: 180}})}>
                  <svg width={70} height={60} viewBox="0 0 24 20" fill="none" stroke={C.mostaza} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 10 H21 M13 2 L21 10 L13 18" />
                  </svg>
                </At>
              )}
            </React.Fragment>
          );
        })}
      </Stage>
      <Headline lines={K.resultado.remate} size={wide ? 170 : 190} at={46} stagger={6} color={C.papel} style={{position: 'absolute', left: PAD - 6, top: wide ? 700 : 1380}} />
      <StarSticker x={wide ? 1700 : 840} y={wide ? 920 : 1750} size={wide ? 200 : 230} at={72} lines={K.resultado.sello} rot={9} />
    </AbsoluteFill>
  );
};
