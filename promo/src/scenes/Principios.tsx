import React from 'react';
import {AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Body, Cutout, Headline, Label, Paper, Sparkle} from '../components';
import {COPY} from '../copy';
import {C, FONT, PAD, tween} from '../theme';
import {Folio} from './Folio';

export const BEAT = 55;
const DIAS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

// Semana de publicaciones: cada día se marca en cobalto.
const Semana: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{position: 'absolute', left: PAD, right: PAD, top: 1260, display: 'flex', gap: 14}}>
      {DIAS.map((d, i) => {
        const s = spring({frame: f - (14 + i * 4), fps, config: {damping: 12, stiffness: 200}});
        return (
          <div key={d} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
            <div style={{fontFamily: FONT.display, fontSize: 64, color: C.papel}}>{d}</div>
            <div style={{width: '100%', aspectRatio: '1', borderRadius: 18, border: `3px solid ${C.papel}`, boxSizing: 'border-box', position: 'relative', overflow: 'hidden'}}>
              <div style={{position: 'absolute', inset: 6, borderRadius: 12, background: i === 4 ? C.mostaza : C.cobalto, transform: `scale(${s})`}} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Beat: React.FC<{i: number}> = ({i}) => {
  const f = useCurrentFrame();
  const p = COPY.principios[i];
  const out = i < 2 ? BEAT - 10 : undefined;
  return (
    <AbsoluteFill>
      <Label size={24} color={C.papel} style={{position: 'absolute', left: PAD, top: 200, opacity: tween(f, 2, 10) - (out ? tween(f, out, out + 6) : 0)}}>
        Principio {String(i + 1).padStart(2, '0')} / 03
      </Label>
      <Headline lines={p.titular} size={218} at={2} stagger={5} out={out} color={C.papel} style={{position: 'absolute', left: PAD - 4, top: 240}} />
      <Body size={40} color={C.papel} style={{position: 'absolute', left: PAD, top: 810, width: 800, opacity: tween(f, 12, 22) - (out ? tween(f, out, out + 6) : 0)}}>
        {p.texto}
      </Body>
      {i === 0 && <Cutout src="mano-copa.png" x={380} y={1050} width={640} at={6} from={[0, 700]} rot={-4} out={out} />}
      {i === 1 && <Cutout src="plato-trama.png" x={120} y={1180} width={860} at={6} from={[0, 700]} rot={3} out={out} />}
      {i === 2 && <Semana />}
    </AbsoluteFill>
  );
};

// Tres principios en modo oscuro: tinta de fondo, papel en el texto.
export const Principios: React.FC = () => (
  <AbsoluteFill>
    <Paper dark />
    <Folio page={6} dark />
    {[0, 1, 2].map((i) => (
      <Sequence key={i} from={i * BEAT} durationInFrames={i < 2 ? BEAT + 4 : undefined} layout="none">
        <Beat i={i} />
      </Sequence>
    ))}
    <Sparkle x={960} y={1040} size={90} at={8} color={C.papel} seed={9} />
  </AbsoluteFill>
);
