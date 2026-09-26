import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {C, EASE, EASE_OUT, FONT, tween} from '../theme';

// Los tres formatos que salen de la misma foto: el reel, el carrusel y la historia. Cada uno en su
// marco y como pieza de papel rasgada.

// ── UN REEL. ─────────────────────────────────────────────────────────────────
// Cortes al pulso del reel real de Da Tonino, dentro de su recorte.
export const PiezaReel: React.FC<{tramos: number[]; cortes: number[]}> = ({tramos, cortes}) => (
  <AbsoluteFill style={{background: C.tinta}}>
    {tramos.map((desde, i) => (
      <Sequence key={i} from={cortes[i]} durationInFrames={(cortes[i + 1] ?? cortes[i] + 60) - cortes[i]} premountFor={30}>
        <OffthreadVideo src={staticFile('video/reel-v6.mp4')} startFrom={Math.round(desde * 30)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

// ── UN CARRUSEL. ─────────────────────────────────────────────────────────────
// El carrusel de la referencia: las láminas en un anillo que gira. Avanza una lámina en cada tiempo,
// como el pulgar que desliza, y la de delante es siempre la que se lee entera.
export const Anillo: React.FC<{laminas: string[]; pasos: number[]; y: number}> = ({laminas, pasos, y}) => {
  const f = useCurrentFrame();
  const N = laminas.length;
  const paso = 360 / N;
  const cw = 720;
  const ch = 900;
  const R = 1000;
  const entrada = tween(f, 0, 14, [paso * 2, 0], EASE_OUT);
  const giro = entrada + pasos.reduce((a, en) => a + tween(f, en - 3, en + 6, [0, paso], EASE), 0);
  return (
    <>
      {/* suelo: una elipse más oscura que asienta el anillo, como el disco de la referencia */}
      <div
        style={{
          position: 'absolute',
          left: -260,
          width: 1600,
          top: y + 360,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(closest-side, rgba(10,20,90,.45), rgba(10,20,90,0))',
        }}
      />
      {/* la cámara mira desde un poco más abajo que el anillo: las láminas de los lados caen, como en la referencia */}
      <div style={{position: 'absolute', left: 540, top: y, width: 0, height: 0, perspective: 2100, perspectiveOrigin: '0px 1100px'}}>
        <div style={{position: 'absolute', transformStyle: 'preserve-3d', transform: `translateZ(${-R}px) rotateY(${-giro}deg)`}}>
          {laminas.map((n, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: -cw / 2,
                top: -ch / 2,
                width: cw,
                height: ch,
                transform: `rotateY(${i * paso}deg) translateZ(${R}px)`,
                backfaceVisibility: 'hidden',
              }}
            >
              <Img src={staticFile(`pizza/carrusel/${n}.png`)} style={{width: '100%', height: '100%'}} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Píldora de la referencia, con el gesto del carrusel.
export const Desliza: React.FC<{y: number; en: number}> = ({y, en}) => {
  const f = useCurrentFrame();
  const p = tween(f, en, en + 8, [0, 1], EASE_OUT);
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: 540,
        transform: `translate(-50%, 0) scale(${0.9 + 0.1 * p})`,
        opacity: p,
        height: 118,
        padding: '0 54px',
        borderRadius: 59,
        border: `5px solid ${C.papel}`,
        background: 'rgba(236,232,220,.16)',
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        fontFamily: FONT.display,
        fontSize: 76,
        color: C.papel,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
      }}
    >
      DESLIZA
      <svg width={70} height={46} viewBox="0 0 35 23" fill="none" stroke={C.papel} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 11.5 H31 M21 2 L31 11.5 L21 21" />
      </svg>
    </div>
  );
};

// ── UNA HISTORIA. ────────────────────────────────────────────────────────────
// La historia ya publicada: la paella con su vapor, el texto con la tipografía del restaurante, el
// enlace de reserva y la interfaz de Instagram (barras, cabecera y respuesta).
const CREMA = '#F6F1E9';

const Icono: React.FC<{d: string; s?: number}> = ({d, s = 46}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export const Historia: React.FC<{w: number; h: number; dur: number}> = ({w, h, dur}) => {
  const f = useCurrentFrame();
  const k = Math.min(67, f + 1);
  const avance = tween(f, 0, dur, [0.08, 0.92], (v) => v);
  const texto = tween(f, 8, 17, [0, 1], EASE_OUT);
  const enlace = tween(f, 16, 24, [0, 1], EASE_OUT);
  return (
    <AbsoluteFill style={{background: '#0d0c0b'}}>
      <Img src={staticFile(`pizza/paella/${String(k).padStart(3, '0')}.jpg`)} style={{width: w, height: h, objectFit: 'cover'}} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,0) 16%, rgba(0,0,0,0) 80%, rgba(0,0,0,.5) 100%)'}} />
      {/* barras de progreso: tres historias, esta es la segunda */}
      <div style={{position: 'absolute', top: 24, left: 22, right: 22, display: 'flex', gap: 8}}>
        {[1, avance, 0].map((v, i) => (
          <div key={i} style={{flex: 1, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.38)', overflow: 'hidden'}}>
            <div style={{width: `${v * 100}%`, height: '100%', background: '#FFFFFF'}} />
          </div>
        ))}
      </div>
      {/* cabecera */}
      <div style={{position: 'absolute', top: 50, left: 22, right: 22, display: 'flex', alignItems: 'center', gap: 18}}>
        {/* avatar: la sala real (el logo del local está pendiente de recibir) */}
        <Img src={staticFile('pizza/avatar-sala.jpg')} style={{width: 76, height: 76, borderRadius: 38, border: '3px solid rgba(255,255,255,.85)'}} />
        <span style={{fontFamily: FONT.ui, fontWeight: 800, fontSize: 32, color: '#FFFFFF'}}>Da Tonino</span>
        <span style={{fontFamily: FONT.ui, fontWeight: 500, fontSize: 30, color: 'rgba(255,255,255,.75)'}}>2 h</span>
        <span style={{marginLeft: 'auto', fontFamily: FONT.ui, fontWeight: 800, fontSize: 38, color: '#FFFFFF', letterSpacing: '0.1em'}}>···</span>
      </div>
      {/* texto de la historia, con la tipografía del carrusel */}
      <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center', opacity: texto, transform: `translateY(${(1 - texto) * 30}px)`}}>
        <div style={{fontFamily: 'Cinzel', fontWeight: 400, fontSize: 118, letterSpacing: '0.1em', color: CREMA, lineHeight: 1}}>PAELLA</div>
        <div style={{fontFamily: 'Pinyon Script', fontSize: 104, color: CREMA, lineHeight: 1.2, marginTop: 4}}>de marisco</div>
      </div>
      {/* enlace de reserva */}
      <div
        style={{
          position: 'absolute',
          top: 980,
          left: '50%',
          transform: `translateX(-50%) rotate(-3deg) scale(${0.7 + 0.3 * enlace})`,
          opacity: enlace,
          background: '#FFFFFF',
          borderRadius: 18,
          padding: '20px 34px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          boxShadow: '0 8px 20px rgba(0,0,0,.3)',
          whiteSpace: 'nowrap',
        }}
      >
        <svg width={44} height={44} viewBox="0 0 24 24" fill="none" stroke="#2F6FDE" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
          <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
        </svg>
        <span style={{fontFamily: FONT.ui, fontWeight: 800, fontSize: 38, color: '#2F6FDE', letterSpacing: '0.02em'}}>RESERVA TU MESA</span>
      </div>
      {/* respuesta */}
      <div style={{position: 'absolute', bottom: 34, left: 22, right: 22, display: 'flex', alignItems: 'center', gap: 22}}>
        <div style={{flex: 1, height: 84, borderRadius: 42, border: '3px solid rgba(255,255,255,.8)', display: 'flex', alignItems: 'center', paddingLeft: 30, fontFamily: FONT.ui, fontWeight: 500, fontSize: 30, color: '#FFFFFF'}}>
          Enviar mensaje
        </div>
        <Icono d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3.3 5 6.8 5c2 0 3.6 1.1 5.2 3 1.6-1.9 3.2-3 5.2-3 3.5 0 5.6 3.6 4.3 6.8C19.5 16.4 12 21 12 21z" />
        <Icono d="M22 3 L11 14 M22 3 L15 21 L11 14 L3 10 Z" />
      </div>
    </AbsoluteFill>
  );
};
