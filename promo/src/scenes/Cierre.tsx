import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Bubble, Button, Cutout, Headline, Label, Logo, Paper, Sparkle} from '../components';
import {COPY} from '../copy';
import {C, PAD, tween} from '../theme';
import {Folio} from './Folio';
import {useWide} from '../format';

// Cierre: firma, lema y llamada a la acción.
export const Cierre: React.FC = () => {
  const f = useCurrentFrame();
  const wide = useWide();
  const press = tween(f, 104, 108) - tween(f, 109, 116);
  return (
    <AbsoluteFill>
      <Paper />
      <Folio page={8} />
      <div style={{position: 'absolute', top: wide ? 150 : 230, width: wide ? 'auto' : '100%', left: wide ? PAD : 0, display: 'flex', justifyContent: 'center'}}>
        <Logo size={wide ? 220 : 250} at={4} />
      </div>
      <Bubble x={wide ? 700 : 730} y={wide ? 130 : 210} at={26} size={40} rot={8} />
      <Headline
        lines={COPY.cierre.titular}
        size={wide ? 140 : 150}
        at={18}
        stagger={6}
        align={wide ? 'left' : 'center'}
        style={wide ? {position: 'absolute', left: PAD - 4, top: 480} : {position: 'absolute', left: 0, right: 0, top: 640}}
      />
      <Cutout src="mano-copa-v2.png" x={wide ? 1150 : 470} y={wide ? 170 : 1080} width={wide ? 720 : 640} at={30} from={[300, 600]} rot={-8} />
      <Sparkle x={wide ? 1080 : 130} y={wide ? 300 : 1260} size={90} at={34} seed={10} />
      <Sparkle x={wide ? 1820 : 960} y={wide ? 880 : 1000} size={70} at={40} seed={11} />
      <div style={{position: 'absolute', left: PAD, top: wide ? 740 : 1420, width: 470, opacity: tween(f, 44, 56), transform: `translateY(${tween(f, 44, 60, [40, 0])}px)`}}>
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
