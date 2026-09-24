import React from 'react';
import {AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Body, Bubble, Headline, Paper} from '../components';
import {COPY} from '../copy';
import {C, EASE_OUT, FONT, PAD, tween} from '../theme';
import {Folio} from './Folio';

const CARD_H = 270;

// Los tres planes, como tarjetas de la app en modo oscuro.
export const Planes: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {titular, lista} = COPY.planes;
  return (
    <AbsoluteFill>
      <Paper dark />
      <Folio page={7} dark />
      <Headline lines={titular} size={300} at={2} stagger={6} color={C.papel} style={{position: 'absolute', left: PAD - 4, top: 130}} />
      <Body size={34} color={C.papel} style={{position: 'absolute', right: PAD, top: 330, width: 360, textAlign: 'right', opacity: tween(f, 14, 26)}}>
        De tu ficha de Google a los reels. Tú eliges hasta dónde.
      </Body>
      {lista.map((p, i) => {
        const at = 14 + i * 8;
        const x = tween(f, at, at + 22, [1100, 0], EASE_OUT);
        const hot = i === 1;
        const pulse = hot ? spring({frame: f - 70, fps, config: {damping: 10, stiffness: 160}}) : 0;
        const bg = hot ? C.cobalto : C.papel;
        const ink = hot ? C.papel : C.tinta;
        return (
          <div
            key={p.nombre}
            style={{
              position: 'absolute',
              left: PAD,
              right: PAD,
              top: 720 + i * (CARD_H + 32),
              height: CARD_H,
              borderRadius: 30,
              background: bg,
              display: 'flex',
              gap: 28,
              padding: 22,
              boxSizing: 'border-box',
              transform: `translateX(${x}px) scale(${1 + 0.035 * pulse})`,
            }}
          >
            <Img src={staticFile(`img/${p.img}`)} style={{width: 226, height: 226, objectFit: 'cover', borderRadius: 18}} />
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10}}>
              <div style={{fontFamily: FONT.display, fontSize: 104, lineHeight: 0.92, color: ink, filter: 'url(#tinta)'}}>{p.nombre}</div>
              <Body size={28} color={ink}>
                {p.texto}
              </Body>
            </div>
            <svg width={34} height={30} viewBox="0 0 24 20" fill="none" stroke={ink} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{alignSelf: 'flex-end'}}>
              <path d="M2 10 H21 M13 2 L21 10 L13 18" />
            </svg>
          </div>
        );
      })}
      <Bubble x={700} y={1000} at={74} size={30} rot={6} bg={C.mostaza} fg={C.tinta} text="Recomendado" tail="right" />
    </AbsoluteFill>
  );
};
