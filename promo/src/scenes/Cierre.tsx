import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Bubble, Button, Cutout, Headline, Label, Logo, Paper, Sparkle} from '../components';
import {COPY} from '../copy';
import {C, PAD, tween} from '../theme';
import {Folio} from './Folio';

// Cierre: firma, lema y llamada a la acción.
export const Cierre: React.FC = () => {
  const f = useCurrentFrame();
  const press = tween(f, 104, 108) - tween(f, 109, 116);
  return (
    <AbsoluteFill>
      <Paper />
      <Folio page={8} />
      <div style={{position: 'absolute', top: 230, width: '100%', display: 'flex', justifyContent: 'center'}}>
        <Logo size={250} at={4} />
      </div>
      <Bubble x={730} y={210} at={26} size={40} rot={8} />
      <Headline lines={COPY.cierre.titular} size={150} at={18} stagger={6} align="center" style={{position: 'absolute', left: 0, right: 0, top: 640}} />
      <Cutout src="mano-copa-v2.png" x={470} y={1080} width={640} at={30} from={[300, 600]} rot={-8} />
      <Sparkle x={130} y={1260} size={90} at={34} seed={10} />
      <Sparkle x={960} y={1000} size={70} at={40} seed={11} />
      <div style={{position: 'absolute', left: PAD, top: 1420, width: 470, opacity: tween(f, 44, 56), transform: `translateY(${tween(f, 44, 60, [40, 0])}px)`}}>
        <Button label={COPY.cierre.boton} size={44} press={press} />
        <Label size={24} style={{marginTop: 30}}>
          Llega en {COPY.cierre.fecha}
        </Label>
        <Label size={24} color={C.cobalto} style={{marginTop: 6}}>
          @society
        </Label>
      </div>
    </AbsoluteFill>
  );
};
