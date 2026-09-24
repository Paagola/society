import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Body, Bubble, Cutout, Headline, Label, Logo, Paper, Sparkle, StarSticker} from '../components';
import {COPY} from '../copy';
import {C, PAD, tween} from '../theme';
import {Folio} from './Folio';

// Portada de revista: «TU BAR merece QUE LO VEAN.» con la mano y la copa cruzando el titular.
export const Portada: React.FC = () => {
  const f = useCurrentFrame();
  // Deriva lenta de cámara para que la portada respire.
  const zoom = 1 + tween(f, 0, 130, [0, 0.035], (t) => t);
  const [l1, l2, l3] = COPY.portada.titular;
  return (
    <AbsoluteFill>
      <Paper />
      <AbsoluteFill style={{transform: `scale(${zoom})`}}>
        <Logo size={118} at={4} style={{position: 'absolute', left: PAD, top: 150}} />
        <Bubble x={760} y={176} at={30} size={40} rot={-6} />

        <Headline
          lines={[{...l1, scale: 1.55}, l2, {...l3, scale: 0.84}]}
          size={236}
          at={12}
          stagger={7}
          style={{position: 'absolute', left: PAD - 6, top: 360}}
        />

        <Cutout src="mano-copa-v2.png" x={450} y={1130} width={680} at={34} from={[260, 520]} rot={-6} />

        <Sparkle x={930} y={470} size={120} at={44} seed={1} />
        <Sparkle x={130} y={1180} size={90} at={52} seed={2} />
        <Sparkle x={420} y={1250} size={60} at={58} seed={3} />

        <div style={{position: 'absolute', left: PAD, top: 1560, width: 470}}>
          <Label size={20} style={{opacity: tween(f, 50, 62), marginBottom: 14}}>
            En este número
          </Label>
          <Body size={32} style={{opacity: tween(f, 54, 68)}}>
            {COPY.portada.entradilla}
          </Body>
        </div>
        <StarSticker x={250} y={1400} size={210} at={68} lines={['Nuevo']} rot={-12} />
      </AbsoluteFill>
      <Folio page={1} />
      {/* Filete cobalto lateral: lomo de la revista */}
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 14, background: C.cobalto, transform: `scaleY(${tween(f, 0, 24)})`, transformOrigin: 'top'}} />
    </AbsoluteFill>
  );
};
