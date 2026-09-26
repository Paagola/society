import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Brush, Cutout, Dot, Headline, Paper, Reveal, Sparkle} from '../components';
import {COPY} from '../copy';
import {C, EASE, FONT, PAD, tween} from '../theme';
import {useWide} from '../format';
import {useBt} from '../timing';

// El día a día de un hostelero: la pregunta, cinco tareas que se tachan a contratiempo
// y el remate sobre cobalto en el tiempo fuerte.
export const Problema: React.FC = () => {
  const f = useCurrentFrame();
  const bt = useBt();
  const {pregunta, tareas, remate} = COPY.problema;
  const wide = useWide();
  const panelAt = bt(8);
  const panel = tween(f, panelAt - 9, panelAt, [100, 0], EASE);
  // En apaisado la lista se lee como un índice de revista.
  const ROW_TOP = wide ? 135 : 300;
  const ROW_H = wide ? 160 : 235;
  const VERB = wide ? 150 : 196;
  const out = bt(2.5);
  return (
    <AbsoluteFill>
      <Paper />

      {/* Fase A: la pregunta de cada mañana */}
      <Headline lines={pregunta} size={wide ? 250 : 300} at={bt(0) - 6} stagger={4} dur={11} out={out} style={{position: 'absolute', left: PAD - 6, top: wide ? 215 : 330}} />
      <Cutout src="movil-mano.png" x={wide ? 1140 : 500} y={wide ? 230 : 1160} width={wide ? 620 : 500} at={bt(0) - 4} dur={16} from={[0, 700]} rot={5} out={out - 2} />
      <Sparkle x={wide ? 1050 : 880} y={wide ? 230 : 1080} size={110} at={bt(1)} seed={4} />

      {/* Fase B: una tarea por corchea */}
      {tareas.map((t, i) => {
        const at = bt(3 + i * 0.5) - 3;
        const strike = bt(6 + i * 0.25) - 2;
        const top = ROW_TOP + i * ROW_H;
        return (
          <div key={t.verbo} style={{position: 'absolute', left: PAD, right: PAD, top}}>
            <Reveal at={at} dur={9} style={{paddingTop: VERB * 0.12, marginTop: -VERB * 0.08}}>
              <div style={{fontFamily: FONT.display, fontSize: VERB, lineHeight: 0.92, color: C.tinta, filter: 'url(#tinta)'}}>{t.verbo}</div>
            </Reveal>
            <div style={{height: 3, background: C.tinta, width: `${tween(f, at + 2, at + 14) * 100}%`, marginTop: 10}} />
            <div style={{position: 'absolute', left: -12, top: VERB * 0.62, transform: 'rotate(-2deg)'}}>
              <Brush width={t.verbo.length * VERB * 0.46 + 30} at={strike} dur={6} thick={1.3} />
            </div>
          </div>
        );
      })}

      {/* Fase C: remate sobre cobalto, en el tiempo fuerte */}
      <AbsoluteFill style={{transform: `translateY(${panel}%)`}}>
        <Paper tint={C.cobalto} />
        <Headline lines={remate} size={wide ? 230 : 255} at={panelAt - 3} stagger={bt(9) - bt(8)} dur={10} color={C.papel} style={{position: 'absolute', left: PAD - 6, top: wide ? 290 : 560}} />
        <Cutout src="plato-trama.png" x={wide ? 1000 : 170} y={wide ? 360 : 1150} width={820} at={panelAt} dur={18} from={[0, 500]} rot={-4} />
        <Dot x={wide ? 1800 : 930} y={wide ? 320 : 1120} size={70} at={bt(10)} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
