import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, EASE, EASE_OUT, FONT, tween} from '../theme';

// Piezas del anuncio. Regla de la pieza: una idea por pantalla, todo grande, nada en 3D.

export type Linea = {t: string; s: number; it?: boolean; fondo?: boolean};

// Titular de cartel: cada línea sube desde detrás de una máscara, en el golpe de la música.
export const Titular: React.FC<{
  lineas: Linea[];
  y: number;
  x?: number;
  color?: string;
  en?: number;
  dur?: number;
  escalon?: number;
}> = ({lineas, y, x = 64, color = C.papel, en = 0, dur = 9, escalon = 3}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', top: y, left: x, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      {lineas.map((l, i) => {
        const p = tween(f, en + i * escalon, en + i * escalon + dur, [0, 1], EASE_OUT);
        return (
          <div
            key={i}
            style={{
              overflow: 'hidden',
              paddingTop: l.s * 0.14,
              marginTop: i === 0 ? 0 : -l.s * (l.it ? 0.22 : 0.17),
              paddingRight: l.it ? l.s * 0.12 : 0,
              paddingBottom: l.it ? l.s * 0.1 : 0,
            }}
          >
            <div
              style={{
                transform: `translateY(${(1 - p) * 115}%)`,
                fontFamily: l.it ? FONT.serif : FONT.display,
                fontStyle: l.it ? 'italic' : 'normal',
                fontWeight: l.it ? 800 : 400,
                fontSize: l.s,
                lineHeight: l.it ? 1.02 : 0.92,
                letterSpacing: l.it ? '-0.03em' : '-0.01em',
                whiteSpace: 'nowrap',
                color: l.fondo ? C.tinta : color,
                background: l.fondo ? C.cobalto : undefined,
                padding: l.fondo ? `${l.s * 0.04}px ${l.s * 0.08}px 0` : undefined,
                marginLeft: l.fondo ? -l.s * 0.08 : 0,
                filter: 'url(#tinta)',
              }}
            >
              {l.t}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Hora enorme: el reloj es el hilo de la historia (22:15 → 01:47 → 9:00 → 01:47).
export const Reloj: React.FC<{texto: string; y?: number; s?: number}> = ({texto, y = 230, s = 380}) => (
  <div
    style={{
      position: 'absolute',
      top: y,
      left: 56,
      fontFamily: FONT.display,
      fontSize: s,
      lineHeight: 1,
      letterSpacing: '-0.01em',
      color: C.papel,
      filter: 'url(#tinta)',
    }}
  >
    {texto}
  </div>
);

// Oscurece la parte de arriba para que el titular se lea sobre la foto.
export const Sombra: React.FC<{fuerza?: number; hasta?: number}> = ({fuerza = 0.7, hasta = 50}) => (
  <AbsoluteFill style={{background: `linear-gradient(180deg, rgba(20,20,20,${fuerza}) 0%, rgba(20,20,20,${fuerza * 0.6}) ${hasta * 0.5}%, rgba(20,20,20,0) ${hasta}%)`}} />
);

// Foto a sangre con un empuje lento: nunca un bodegón quieto.
export const Foto: React.FC<{
  src: string;
  dur: number;
  desde?: number;
  hasta?: number;
  y0?: number;
  y1?: number;
  pos?: string;
}> = ({src, dur, desde = 1.0, hasta = 1.06, y0 = 0, y1 = 0, pos = '50% 50%'}) => {
  const f = useCurrentFrame();
  const t = tween(f, 0, dur, [0, 1], (v) => v);
  return (
    <AbsoluteFill style={{background: C.tinta, overflow: 'hidden'}}>
      <Img
        src={staticFile(src)}
        style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `translateY(${y0 + (y1 - y0) * t}px) scale(${desde + (hasta - desde) * t})`}}
      />
    </AbsoluteFill>
  );
};

// Tramo del reel real de Da Tonino, sin su sonido (la música del anuncio manda).
export const Clip: React.FC<{desde: number}> = ({desde}) => (
  <AbsoluteFill style={{background: C.tinta}}>
    <OffthreadVideo src={staticFile('video/reel-v6.mp4')} startFrom={Math.round(desde * 30)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
  </AbsoluteFill>
);

// Carrusel sobre papel: las láminas (4:5) como piezas impresas. Entran deslizando, el pulgar
// las pasa en cada golpe y siempre asoma el borde de la siguiente, como en Instagram.
export const Carrusel: React.FC<{laminas: string[]; pasos: number[]; top: number; w?: number}> = ({laminas, pasos, top, w = 900}) => {
  const f = useCurrentFrame();
  const gap = 40;
  const x0 = (1080 - w) / 2;
  const pos = -1 + tween(f, 0, 8, [0, 1], EASE_OUT) + pasos.reduce((a, en) => a + tween(f, en, en + 7, [0, 1], EASE), 0);
  const h = Math.round(w * 1.25);
  return (
    <>
      {laminas.map((n, i) => (
        <div
          key={n}
          style={{
            position: 'absolute',
            top,
            left: x0 + (i - pos) * (w + gap),
            width: w,
            height: h,
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 34px 80px rgba(20,20,20,.35), 0 6px 16px rgba(20,20,20,.22)',
          }}
        >
          <Img src={staticFile(`anuncio/lamina-${n}.jpg`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
      ))}
    </>
  );
};

// Recorte de trama de la marca: entra desde abajo y se asienta.
export const Recorte: React.FC<{src: string; w: number; x: number; y: number; en?: number; rot?: number}> = ({src, w, x, y, en = 0, rot = 0}) => {
  const f = useCurrentFrame();
  const p = tween(f, en, en + 14, [0, 1], EASE_OUT);
  return (
    <Img
      src={staticFile(src)}
      style={{position: 'absolute', left: x, top: y, width: w, transform: `translateY(${(1 - p) * 420}px) rotate(${rot + (1 - p) * 5}deg)`, opacity: f < en ? 0 : 1}}
    />
  );
};

// La foto del carrete tal cual: horizontal, a todo el ancho.
export const FotoMovil: React.FC<{top: number}> = ({top}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top, height: 810, overflow: 'hidden'}}>
      <Img src={staticFile('anuncio/foto-movil-pizza.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1 + tween(f, 0, 45, [0, 0.16], (v) => v)}) translateX(${tween(f, 0, 45, [0, -30], (v) => v)}px)`}} />
    </div>
  );
};

// Notificación de Society: el único momento de producto. Grande, con un solo botón.
export const Aviso: React.FC<{en: number; toque: number; top?: number}> = ({en, toque, top = 690}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entra = spring({frame: f - en, fps, config: {damping: 15, stiffness: 150}});
  const pulsa = tween(f, toque, toque + 3) - tween(f, toque + 4, toque + 9);
  const hecho = f >= toque + 4;
  return (
    <div
      style={{
        position: 'absolute',
        left: 56,
        right: 56,
        top,
        opacity: f < en ? 0 : 1,
        transform: `translateY(${(1 - entra) * -900}px)`,
        background: '#FBF9F3',
        border: `6px solid ${C.tinta}`,
        borderRadius: 48,
        padding: '42px 50px 48px',
        boxShadow: '0 40px 90px rgba(20,20,20,.28)',
      }}
    >
      <div style={{fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 900, fontSize: 64, lineHeight: 1, color: C.cobalto, letterSpacing: '-0.035em'}}>Society</div>
      <div style={{fontFamily: FONT.ui, fontWeight: 800, fontSize: 92, lineHeight: 1.02, color: C.tinta, marginTop: 18, letterSpacing: '-0.025em'}}>Tu semana, lista.</div>
      <div style={{fontFamily: FONT.ui, fontWeight: 600, fontSize: 50, color: C.tinta, opacity: 0.72, marginTop: 14}}>Reel · Carrusel · Historias</div>
      <div
        style={{
          marginTop: 38,
          height: 128,
          borderRadius: 64,
          background: hecho ? C.cobalto : C.mostaza,
          color: hecho ? C.papel : C.tinta,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 22,
          fontFamily: FONT.ui,
          fontWeight: 800,
          fontSize: 60,
          transform: `scale(${1 - pulsa * 0.06})`,
        }}
      >
        {hecho && (
          <svg width={58} height={48} viewBox="0 0 24 20" fill="none" stroke={C.papel} strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 11 L9 17 L22 3" />
          </svg>
        )}
        {hecho ? 'Aprobado' : 'Aprobar'}
        {!hecho && (
          <svg width={54} height={46} viewBox="0 0 24 20" fill="none" stroke={C.tinta} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 10 H21 M13 2 L21 10 L13 18" />
          </svg>
        )}
      </div>
    </div>
  );
};

// Antes → después con una banda cobalto que barre de izquierda a derecha y destapa la foto nueva.
export const AntesDespues: React.FC<{en: number; dur?: number; antes: React.ReactNode; despues: React.ReactNode}> = ({en, dur = 11, antes, despues}) => {
  const f = useCurrentFrame();
  const p = tween(f, en, en + dur, [0, 1], EASE);
  const borde = -18 + 136 * p;
  const clip = (v: number) => `inset(0 ${Math.max(0, 100 - v)}% 0 0)`;
  return (
    <AbsoluteFill>
      {antes}
      <AbsoluteFill style={{clipPath: clip(borde - 18)}}>{despues}</AbsoluteFill>
      <AbsoluteFill style={{background: C.cobalto, clipPath: `inset(0 ${Math.max(0, 100 - borde)}% 0 ${Math.max(0, borde - 18)}%)`}} />
    </AbsoluteFill>
  );
};
