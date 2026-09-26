import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Bubble, Button, Cutout, Headline, Logo, Paper, Sparkle} from '../components';
import {COPY} from '../copy';
import {EASE_OUT, PAD, tween} from '../theme';
import {useWide} from '../format';
import {FINAL_BEAT, CUTS, useBt} from '../timing';

// Cierre: firma, lema y llamada a la acción. En el último golpe de la música (tiempo 8 de la escena)
// el botón se pulsa, la página da un pequeño golpe y saltan los destellos; después, el acorde se apaga.
export const Cierre: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wide = useWide();
  const bt = useBt();
  const hitAt = bt(FINAL_BEAT - CUTS.Cierre);
  const press = tween(f, hitAt - 3, hitAt) - tween(f, hitAt + 1, hitAt + 9);
  const bump = spring({frame: f - hitAt, fps, config: {damping: 9, stiffness: 220, mass: 0.6}});
  const scale = f < hitAt ? 1 : 1 + 0.025 * (1 - bump);
  const btnIn = tween(f, bt(3) - 6, bt(3), [0, 1], EASE_OUT);
  return (
    <AbsoluteFill>
      <Paper />
      <AbsoluteFill style={{transform: `scale(${scale})`}}>
        <div style={{position: 'absolute', top: wide ? 150 : 260, width: wide ? 'auto' : '100%', left: wide ? PAD : 0, display: 'flex', justifyContent: 'center'}}>
          <Logo size={wide ? 220 : 250} at={bt(0) - 10} />
        </div>
        <Bubble x={wide ? 700 : 740} y={wide ? 130 : 240} at={bt(2.5)} size={wide ? 42 : 46} rot={8} />
        <Headline
          lines={COPY.cierre.titular}
          size={wide ? 150 : 158}
          at={0}
          ats={[bt(1) - 5, bt(1.5) - 5]}
          dur={10}
          align={wide ? 'left' : 'center'}
          style={wide ? {position: 'absolute', left: PAD - 4, top: 480} : {position: 'absolute', left: 0, right: 0, top: 640}}
        />
        <Cutout src="mano-copa-v2.png" x={wide ? 1150 : 470} y={wide ? 170 : 1060} width={wide ? 720 : 640} at={bt(2) - 8} dur={16} from={[300, 600]} rot={-8} />
        <Sparkle x={wide ? 1080 : 130} y={wide ? 300 : 1200} size={90} at={bt(2.5)} seed={10} />
        <Sparkle x={wide ? 1820 : 950} y={wide ? 880 : 1000} size={70} at={bt(3)} seed={11} />
        {/* Destellos del golpe final */}
        <Sparkle x={wide ? 1040 : 560} y={wide ? 860 : 1330} size={120} at={hitAt} seed={12} />
        <Sparkle x={wide ? 90 : 90} y={wide ? 930 : 1560} size={80} at={hitAt + 2} seed={13} />
        <div
          style={{
            position: 'absolute',
            left: PAD,
            top: wide ? 760 : 1400,
            width: wide ? 520 : 560,
            opacity: btnIn,
            transform: `translateY(${(1 - btnIn) * 50}px)`,
          }}
        >
          <Button label={COPY.cierre.boton} size={wide ? 52 : 60} press={press} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
