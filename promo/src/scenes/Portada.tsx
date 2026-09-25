import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Bubble, Cutout, Headline, Logo, Paper, Sparkle, StarSticker} from '../components';
import {COPY} from '../copy';
import {C, PAD, tween} from '../theme';
import {useWide} from '../format';

// Portada de revista: «TU BAR merece QUE LO VEAN.» con la mano y la copa cruzando el titular.
export const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const wide = useWide();
  // Deriva lenta de cámara para que la portada respire.
  const zoom = 1 + tween(f, 0, 130, [0, 0.035], (t) => t);
  const [l1, l2, l3] = COPY.portada.titular;
  return (
    <AbsoluteFill>
      <Paper />
      <AbsoluteFill style={{transform: `scale(${zoom})`}}>
        <Logo size={wide ? 100 : 118} at={4} style={{position: 'absolute', left: PAD, top: wide ? 130 : 150}} />
        <Bubble x={wide ? 1560 : 760} y={wide ? 150 : 176} at={30} size={40} rot={-6} />

        <Headline
          lines={[{...l1, scale: 1.55}, l2, {...l3, scale: 0.84}]}
          size={wide ? 184 : 236}
          at={12}
          stagger={7}
          style={{position: 'absolute', left: PAD - 6, top: wide ? 290 : 360}}
        />

        <Cutout src="mano-copa-v2.png" x={wide ? 1060 : 450} y={wide ? 170 : 1130} width={wide ? 780 : 680} at={34} from={wide ? [520, 200] : [260, 520]} rot={-6} />

        <Sparkle x={wide ? 1000 : 930} y={wide ? 330 : 470} size={120} at={44} seed={1} />
        <Sparkle x={wide ? 1790 : 130} y={wide ? 900 : 1180} size={90} at={52} seed={2} />
        <Sparkle x={wide ? 1060 : 420} y={wide ? 700 : 1250} size={60} at={58} seed={3} />
        <StarSticker x={wide ? 900 : 250} y={wide ? 700 : 1400} size={wide ? 180 : 210} at={68} lines={['Nuevo']} rot={-12} />
      </AbsoluteFill>
      {/* Filete cobalto lateral: lomo de la revista */}
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 14, background: C.cobalto, transform: `scaleY(${tween(f, 0, 24)})`, transformOrigin: 'top'}} />
    </AbsoluteFill>
  );
};
