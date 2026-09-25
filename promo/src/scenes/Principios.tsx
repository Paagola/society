import React from 'react';
import {AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Cutout, Headline, Paper, Sparkle} from '../components';
import {COPY} from '../copy';
import {C, FONT, PAD} from '../theme';
import {useWide} from '../format';

export const BEAT = 55;
const DIAS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

// Semana de publicaciones: cada día se marca en cobalto.
const Semana: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wide = useWide();
  return (
    <div style={{position: 'absolute', left: wide ? 1000 : PAD, right: PAD, top: wide ? 400 : 1260, display: 'flex', gap: 14}}>
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
  const p = COPY.principios[i];
  const wide = useWide();
  const out = i < 2 ? BEAT - 10 : undefined;
  return (
    <AbsoluteFill>
      <Headline lines={p.titular} size={wide ? 200 : 218} at={2} stagger={5} out={out} color={C.papel} style={{position: 'absolute', left: PAD - 4, top: wide ? 210 : 240}} />
      {i === 0 && <Cutout src="mano-copa.png" x={wide ? 1180 : 380} y={wide ? 140 : 1050} width={wide ? 620 : 640} at={6} from={[0, 700]} rot={-4} out={out} />}
      {i === 1 && <Cutout src="plato-trama.png" x={wide ? 980 : 120} y={wide ? 320 : 1180} width={wide ? 860 : 860} at={6} from={[0, 700]} rot={3} out={out} />}
      {i === 2 && <Semana />}
    </AbsoluteFill>
  );
};

// Tres principios en modo oscuro: tinta de fondo, papel en el texto.
export const Principios: React.FC = () => {
  const wide = useWide();
  return (
  <AbsoluteFill>
    <Paper dark />
    {[0, 1, 2].map((i) => (
      <Sequence key={i} from={i * BEAT} durationInFrames={i < 2 ? BEAT + 4 : undefined} layout="none">
        <Beat i={i} />
      </Sequence>
    ))}
    <Sparkle x={wide ? 900 : 960} y={wide ? 200 : 1040} size={90} at={8} color={C.papel} seed={9} />
  </AbsoluteFill>
  );
};
