import React from 'react';
import {Img, OffthreadVideo, Sequence, staticFile} from 'remotion';
import {C, FONT} from './theme';

// ---------------------------------------------------------------------------
// Piezas 3D con CSS: escenario con perspectiva, tarjetas de foto y móvil con grosor.
// Todo se coloca con translate3d desde el centro del escenario.
// ---------------------------------------------------------------------------

// Escenario: un punto de fuga en (x, y) y una cámara que puede inclinarse y girar.
export const Stage: React.FC<{
  x: number;
  y: number;
  persp?: number;
  rx?: number;
  ry?: number;
  rz?: number;
  z?: number;
  children: React.ReactNode;
}> = ({x, y, persp = 2200, rx = 0, ry = 0, rz = 0, z = 0, children}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 0, height: 0, perspective: persp, perspectiveOrigin: '0 0'}}>
    <div style={{position: 'absolute', transformStyle: 'preserve-3d', transform: `translateZ(${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`}}>
      {children}
    </div>
  </div>
);

// Objeto dentro del escenario, centrado en su punto.
export const At: React.FC<{
  x?: number;
  y?: number;
  z?: number;
  rx?: number;
  ry?: number;
  rz?: number;
  s?: number;
  o?: number;
  children: React.ReactNode;
}> = ({x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, s = 1, o = 1, children}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      transformStyle: 'preserve-3d',
      transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${s})`,
    }}
  >
    {/* La opacidad va en una capa interior: en el contenedor 3D aplanaría la profundidad (preserve-3d). */}
    {o < 1 ? <div style={{opacity: o}}>{children}</div> : children}
  </div>
);

// Brillo que barre la foto según el ángulo: da sensación de papel fotográfico con volumen.
const Sheen: React.FC<{angle: number}> = ({angle}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(${110 + angle}deg, rgba(255,255,255,0) 30%, rgba(255,255,255,${0.1 + Math.min(0.22, Math.abs(angle) / 250)}) 50%, rgba(255,255,255,0) 70%)`,
      pointerEvents: 'none',
    }}
  />
);

// Tarjeta de foto impresa: borde de papel, pie en mono y sombra.
export const PhotoCard: React.FC<{
  src: string;
  w: number;
  h: number;
  caption?: string;
  angle?: number;
  border?: number;
  dark?: boolean;
  // Recorte dentro del marco: ampliación y punto de anclaje (p. ej. para dejar fuera a un comensal).
  zoom?: number;
  origin?: string;
  children?: React.ReactNode;
}> = ({src, w, h, caption, angle = 0, border, dark = false, zoom = 1, origin = '50% 50%', children}) => {
  const b = border ?? Math.round(w * 0.045);
  const foot = caption ? Math.round(w * 0.13) : b;
  return (
    <div
      style={{
        position: 'relative',
        width: w + b * 2,
        height: h + b + foot,
        background: dark ? '#1d1c1a' : '#F7F4EC',
        boxShadow: '0 30px 60px rgba(20,20,20,.28), 0 4px 10px rgba(20,20,20,.18)',
        borderRadius: 6,
      }}
    >
      <div style={{position: 'absolute', left: b, top: b, width: w, height: h, overflow: 'hidden', borderRadius: 2}}>
        <Img src={staticFile(`caso/${src}`)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})`, transformOrigin: origin}} />
      </div>
      {caption && (
        <div
          style={{
            position: 'absolute',
            left: b,
            right: b,
            bottom: 0,
            height: foot,
            display: 'flex',
            alignItems: 'center',
            fontFamily: FONT.mono,
            fontWeight: 700,
            fontSize: Math.round(foot * 0.34),
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: dark ? C.papel : C.tinta,
          }}
        >
          {caption}
        </div>
      )}
      <Sheen angle={angle} />
      {children}
    </div>
  );
};

// Sello estampado sobre una tarjeta (DESCARTADA, APROBADA…).
export const Stamp: React.FC<{text: string; p: number; color?: string; bg?: string; size?: number; rot?: number}> = ({
  text,
  p,
  color = C.tinta,
  bg = 'rgba(236,232,220,.9)',
  size = 38,
  rot = -14,
}) => {
  if (p <= 0) return null;
  const s = 1.8 - 0.8 * Math.min(1, p);
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '46%',
        transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${s})`,
        opacity: Math.min(1, p * 2),
        border: `${size * 0.12}px solid ${color}`,
        outline: `${size * 0.06}px solid ${color}`,
        outlineOffset: size * 0.08,
        color,
        background: bg,
        fontFamily: FONT.display,
        fontSize: size,
        letterSpacing: '0.04em',
        padding: `${size * 0.1}px ${size * 0.35}px ${size * 0.05}px`,
        whiteSpace: 'nowrap',
        filter: 'url(#tinta)',
      }}
    >
      {text}
    </div>
  );
};

// Sello redondo mostaza con visto bueno.
export const Seal: React.FC<{p: number; size?: number; x?: string; y?: string}> = ({p, size = 120, x = '78%', y = '10%'}) => {
  if (p <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: size,
        background: C.mostaza,
        boxShadow: '0 0 0 6px #fff, 0 10px 20px rgba(20,20,20,.25)',
        transform: `scale(${1.6 - 0.6 * Math.min(1, p)}) rotate(${(1 - Math.min(1, p)) * 40 - 8}deg)`,
        opacity: Math.min(1, p * 2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width={size * 0.44} height={size * 0.36} viewBox="0 0 24 20" fill="none" stroke={C.tinta} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 11 L9 17 L22 3" />
      </svg>
      <div style={{fontFamily: FONT.display, fontSize: size * 0.17, color: C.tinta, marginTop: size * 0.03, letterSpacing: '0.04em'}}>APROBADA</div>
    </div>
  );
};

// Móvil con grosor real (seis caras). La pantalla mide 1080 × 1920 px y el móvil se escala desde fuera,
// así el vídeo se ve nítido cuando la cámara se mete en la pantalla.
export const SCREEN = {w: 1080, h: 1920};
const BEZEL = 42;
const DEPTH = 64;
export const Phone3D: React.FC<{
  video: string;
  startFrom?: number;
  volume?: number;
  angle?: number;
  // Fotograma local en que se enciende la pantalla (antes, cristal negro con reflejo).
  onAt?: number;
  // 0–1: cuánto se ven la isla y el brillo; se apagan cuando la cámara está dentro de la pantalla.
  chrome?: number;
}> = ({video, startFrom = 0, volume = 1, angle = 0, onAt = 0, chrome = 1}) => {
  const W = SCREEN.w + BEZEL * 2;
  const H = SCREEN.h + BEZEL * 2;
  const R = 150;
  const side: React.CSSProperties = {position: 'absolute', background: 'linear-gradient(90deg,#2b2b2b,#0d0d0d 40%,#2b2b2b)', backfaceVisibility: 'hidden'};
  return (
    <div style={{position: 'relative', width: W, height: H, transformStyle: 'preserve-3d'}}>
      {/* Laterales */}
      <div style={{...side, width: DEPTH, height: H - R * 2, left: -DEPTH / 2, top: R, transform: 'rotateY(-90deg)'}} />
      <div style={{...side, width: DEPTH, height: H - R * 2, left: W - DEPTH / 2, top: R, transform: 'rotateY(90deg)'}} />
      <div style={{...side, width: W - R * 2, height: DEPTH, left: R, top: -DEPTH / 2, transform: 'rotateX(90deg)'}} />
      <div style={{...side, width: W - R * 2, height: DEPTH, left: R, top: H - DEPTH / 2, transform: 'rotateX(-90deg)'}} />
      {/* Trasera */}
      <div style={{position: 'absolute', inset: 0, borderRadius: R, background: C.cobalto, transform: `translateZ(${-DEPTH / 2}px) rotateY(180deg)`, backfaceVisibility: 'hidden'}}>
        <div style={{position: 'absolute', left: 90, top: 90, width: 300, height: 300, borderRadius: 80, background: '#1a2fb0'}} />
        <div style={{position: 'absolute', right: 0, left: 0, bottom: 260, textAlign: 'center', fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 900, fontSize: 170, color: C.papel}}>Society</div>
      </div>
      {/* Frontal */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: R * (0.3 + 0.7 * chrome),
          background: C.tinta,
          transform: `translateZ(${DEPTH / 2}px)`,
          backfaceVisibility: 'hidden',
          boxShadow: 'inset 0 0 0 4px #3a3a3a',
        }}
      >
        <div style={{position: 'absolute', left: BEZEL, top: BEZEL, width: SCREEN.w, height: SCREEN.h, borderRadius: (R - BEZEL) * chrome, overflow: 'hidden', background: '#000'}}>
          <Sequence from={onAt} layout="none">
            <OffthreadVideo src={staticFile(video)} startFrom={startFrom} volume={volume} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </Sequence>
          <div style={{position: 'absolute', top: 36, left: '50%', width: 300, height: 88, marginLeft: -150, borderRadius: 60, background: '#000', opacity: chrome}} />
          <div style={{position: 'absolute', inset: 0, opacity: chrome}}>
            <Sheen angle={angle} />
          </div>
        </div>
      </div>
    </div>
  );
};
