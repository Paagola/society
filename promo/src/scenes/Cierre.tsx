import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Cutout, Headline, Label, Logo, Paper, Sparkle} from '../components';
import {COPY} from '../copy';
import {C, PAD, tween} from '../theme';
import {useWide} from '../format';
import {FINAL_BEAT, CUTS, useBt} from '../timing';

// Cierre: la sala llena es el argumento; la marca firma pequeño, no vende (Víctor, 25/09/2026).
// Sobre la rejilla musical de la v3: el titular entra en los tiempos 1 y 1,5, la mano en el 2 y la
// firma en el 3. En el último golpe de la música la página da un pequeño golpe y saltan los destellos;
// después, el acorde se apaga.
export const Cierre: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wide = useWide();
  const bt = useBt();
  const hitAt = bt(FINAL_BEAT - CUTS.Cierre);
  const bump = spring({frame: f - hitAt, fps, config: {damping: 9, stiffness: 220, mass: 0.6}});
  const scale = f < hitAt ? 1 : 1 + 0.025 * (1 - bump);
  const firma = tween(f, bt(3) - 6, bt(3) + 8);
  return (
    <AbsoluteFill>
      <Paper />
      <AbsoluteFill style={{transform: `scale(${scale})`}}>
        <Headline
          lines={COPY.cierre.titular}
          size={wide ? 140 : 150}
          at={0}
          ats={[bt(1) - 5, bt(1.5) - 5]}
          dur={10}
          align={wide ? 'left' : 'center'}
          style={wide ? {position: 'absolute', left: PAD - 4, top: 220} : {position: 'absolute', left: 0, right: 0, top: 340}}
        />
        <Cutout src="mano-copa-v2.png" x={wide ? 1150 : 470} y={wide ? 240 : 1010} width={wide ? 700 : 620} at={bt(2) - 8} dur={16} from={[300, 600]} rot={-8} />
        <Sparkle x={wide ? 1080 : 130} y={wide ? 380 : 1260} size={90} at={bt(2.5)} seed={10} />
        <Sparkle x={wide ? 1820 : 960} y={wide ? 900 : 1020} size={70} at={bt(3)} seed={11} />
        {/* Destellos del golpe final, en el hueco libre a la izquierda de la mano */}
        <Sparkle x={wide ? 1000 : 170} y={wide ? 820 : 1540} size={110} at={hitAt} seed={12} />
        <Sparkle x={wide ? 560 : 330} y={wide ? 640 : 1420} size={76} at={hitAt + 2} seed={13} />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: wide ? 90 : 150, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: firma}}>
          <Logo size={wide ? 110 : 120} at={bt(3) - 6} />
          <Label size={22} color={C.tinta} style={{opacity: 0.7}}>
            {COPY.cierre.fecha}
          </Label>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
