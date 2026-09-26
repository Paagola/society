import React from 'react';
import {AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Bubble, Headline, Paper} from '../components';
import {COPY} from '../copy';
import {C, EASE_OUT, FONT, PAD, tween} from '../theme';
import {useWide} from '../format';
import {useBt} from '../timing';


// Los tres planes, como tarjetas de la app en modo oscuro.
export const Planes: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {titular, lista} = COPY.planes;
  const wide = useWide();
  const bt = useBt();
  const CARD_H = wide ? 250 : 245;
  return (
    <AbsoluteFill>
      <Paper dark />
      <Headline lines={titular} size={wide ? 300 : 270} at={0} ats={[bt(0) - 5, bt(0.5) - 5]} dur={10} color={C.papel} style={{position: 'absolute', left: PAD - 4, top: wide ? 150 : 240}} />
      {lista.map((p, i) => {
        const at = bt(0.5 + i * 0.5) - 7;
        const x = tween(f, at, at + 12, [1100, 0], EASE_OUT);
        const hot = i === 1;
        const pulse = hot ? spring({frame: f - (bt(3) - 2), fps, config: {damping: 10, stiffness: 180}}) : 0;
        const bg = hot ? C.cobalto : C.papel;
        const ink = hot ? C.papel : C.tinta;
        return (
          <div
            key={p.nombre}
            style={{
              position: 'absolute',
              left: wide ? 760 : PAD,
              right: PAD,
              top: (wide ? 150 : 780) + i * (CARD_H + 28),
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
            <Img src={staticFile(`img/${p.img}`)} style={{width: CARD_H - 44, height: CARD_H - 44, objectFit: 'cover', borderRadius: 18}} />
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10}}>
              <div style={{fontFamily: FONT.display, fontSize: 130, lineHeight: 0.92, color: ink, filter: 'url(#tinta)'}}>{p.nombre}</div>
            </div>
            <svg width={34} height={30} viewBox="0 0 24 20" fill="none" stroke={ink} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{alignSelf: 'flex-end'}}>
              <path d="M2 10 H21 M13 2 L21 10 L13 18" />
            </svg>
          </div>
        );
      })}
      <Bubble x={wide ? 1500 : 640} y={wide ? 390 : 1020} at={bt(3)} size={wide ? 38 : 42} rot={6} bg={C.mostaza} fg={C.tinta} text={COPY.planes.recomendado} tail="right" />
    </AbsoluteFill>
  );
};
