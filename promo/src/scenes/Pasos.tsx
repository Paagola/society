import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Headline, Paper, PillSticker, Phone, Reveal, Sparkle} from '../components';
import {COPY} from '../copy';
import {C, EASE, FONT, PAD, tween} from '../theme';
import {useWide} from '../format';
import {PantallaBusca, PantallaHoy, PantallaQueda, SCREEN_W} from './Pantallas';

export const STEP = 115;

// Cómo funciona: tres pasos contados fuera del móvil y enseñados dentro, en la app.
export const Pasos: React.FC = () => {
  const f = useCurrentFrame();
  const wide = useWide();
  const PHONE_W = wide ? 480 : 640;
  const slide = tween(f, STEP - 6, STEP + 10, [0, 1], EASE) + tween(f, STEP * 2 - 6, STEP * 2 + 10, [0, 1], EASE);
  const inner = PHONE_W * (1 - 0.064);
  const scale = inner / SCREEN_W;
  const phoneIn = tween(f, 0, 22, [900, 0], EASE);
  return (
    <AbsoluteFill>
      <Paper />

      {COPY.pasos.map((p, i) => {
        const at = i * STEP;
        const out = i < 2 ? at + STEP - 8 : undefined;
        return (
          <React.Fragment key={p.num}>
            <Reveal at={at + 2} out={out} dur={20} style={wide ? {position: 'absolute', left: PAD - 6, top: 640} : {position: 'absolute', right: PAD - 10, top: 120}}>
              <div style={{fontFamily: FONT.display, fontSize: 300, lineHeight: 1, color: C.cobalto, filter: 'url(#tinta)'}}>{p.num}</div>
            </Reveal>
            <Headline lines={p.titular} size={200} at={at + 4} stagger={5} out={out} style={{position: 'absolute', left: PAD - 4, top: 170}} />
          </React.Fragment>
        );
      })}

      <Phone width={PHONE_W} style={{position: 'absolute', left: wide ? 1240 : 250, top: wide ? 130 : 680, transform: `translateY(${phoneIn}px) rotate(-3deg)`}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: SCREEN_W, transform: `scale(${scale})`, transformOrigin: 'top left'}}>
          <div style={{position: 'absolute', left: 0, top: 0, transform: `translateX(${-slide * SCREEN_W}px)`}}>
            <div style={{position: 'absolute', left: 0}}>
              <PantallaBusca />
            </div>
            <div style={{position: 'absolute', left: SCREEN_W}}>
              <PantallaHoy start={STEP} />
            </div>
            <div style={{position: 'absolute', left: SCREEN_W * 2}}>
              <PantallaQueda start={STEP * 2} />
            </div>
          </div>
        </div>
      </Phone>

      <Sparkle x={wide ? 1130 : 170} y={wide ? 300 : 900} size={110} at={20} seed={7} />
      <Sparkle x={wide ? 1810 : 200} y={wide ? 820 : 1500} size={70} at={STEP + 20} seed={8} />
      <PillSticker x={wide ? 900 : 40} y={wide ? 700 : 1290} at={STEP * 2 + 66} size={44} rot={-7} />
    </AbsoluteFill>
  );
};
