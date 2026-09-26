import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Bubble, Cutout, Headline, Logo, Paper, Sparkle, StarSticker} from '../components';
import {COPY} from '../copy';
import {C, PAD, tween} from '../theme';
import {useWide} from '../format';
import {useBt} from '../timing';

// Portada de revista: «TU BAR merece QUE LO VEAN.» con la mano y la copa cruzando el titular.
// El fotograma 1 ya lleva marca y titular; cada línea y cada recurso entra en un tiempo de la música.
export const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const wide = useWide();
  const bt = useBt();
  // Deriva lenta de cámara para que la portada respire.
  const zoom = 1 + tween(f, 0, bt(8), [0, 0.04], (t) => t);
  const [l1, l2, l3] = COPY.portada.titular;
  return (
    <AbsoluteFill>
      <Paper />
      <AbsoluteFill style={{transform: `scale(${zoom})`}}>
        <Logo size={wide ? 100 : 118} at={-30} style={{position: 'absolute', left: PAD, top: wide ? 110 : 250}} />
        <Bubble x={wide ? 1560 : 740} y={wide ? 130 : 270} at={bt(3)} size={wide ? 40 : 46} rot={-6} />

        {/* «TU BAR» ya está en el fotograma 0; «merece» entra en el tiempo 1 y «QUE LO VEAN.» en el 2. */}
        <Headline
          lines={[{...l1, scale: 1.55}, l2, {...l3, scale: 0.84}]}
          size={wide ? 184 : 236}
          at={0}
          ats={[-30, bt(1) - 5, bt(2) - 5]}
          dur={10}
          style={{position: 'absolute', left: PAD - 6, top: wide ? 270 : 470}}
        />

        <Cutout
          src="mano-copa-v2.png"
          x={wide ? 1060 : 430}
          y={wide ? 170 : 1150}
          width={wide ? 780 : 680}
          at={bt(3) - 6}
          dur={16}
          from={wide ? [520, 200] : [260, 520]}
          rot={-6}
        />

        <Sparkle x={wide ? 1000 : 930} y={wide ? 330 : 560} size={120} at={bt(4)} seed={1} />
        <Sparkle x={wide ? 1790 : 130} y={wide ? 900 : 1260} size={90} at={bt(4.5)} seed={2} />
        <Sparkle x={wide ? 1060 : 400} y={wide ? 700 : 1330} size={60} at={bt(5)} seed={3} />
        <StarSticker x={wide ? 900 : 250} y={wide ? 700 : 1420} size={wide ? 190 : 220} at={bt(6)} lines={['Nuevo']} rot={-12} />
      </AbsoluteFill>
      {/* Filete cobalto lateral: lomo de la revista */}
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 14, background: C.cobalto}} />
    </AbsoluteFill>
  );
};
