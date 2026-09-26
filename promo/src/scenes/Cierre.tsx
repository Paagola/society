import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Cutout, Headline, Label, Logo, Paper, Sparkle} from '../components';
import {COPY} from '../copy';
import {C, PAD, tween} from '../theme';
import {useWide} from '../format';

// Cierre: la sala llena es el argumento; la marca firma pequeño, no vende.
export const Cierre: React.FC = () => {
  const f = useCurrentFrame();
  const wide = useWide();
  return (
    <AbsoluteFill>
      <Paper />
      <Headline
        lines={COPY.cierre.titular}
        size={wide ? 140 : 150}
        at={10}
        stagger={6}
        align={wide ? 'left' : 'center'}
        style={wide ? {position: 'absolute', left: PAD - 4, top: 220} : {position: 'absolute', left: 0, right: 0, top: 340}}
      />
      <Cutout src="mano-copa-v2.png" x={wide ? 1150 : 470} y={wide ? 260 : 1080} width={wide ? 700 : 620} at={26} from={[300, 600]} rot={-8} />
      <Sparkle x={wide ? 1080 : 130} y={wide ? 380 : 1260} size={90} at={30} seed={10} />
      <Sparkle x={wide ? 1820 : 960} y={wide ? 900 : 1020} size={70} at={36} seed={11} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: wide ? 90 : 150, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: tween(f, 48, 62)}}>
        <Logo size={wide ? 110 : 120} at={48} />
        <Label size={22} color={C.tinta} style={{opacity: 0.7}}>
          {COPY.cierre.fecha}
        </Label>
      </div>
    </AbsoluteFill>
  );
};
