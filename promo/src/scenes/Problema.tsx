import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Brush, Cutout, Dot, Headline, Label, Paper, Reveal, Sparkle} from '../components';
import {COPY} from '../copy';
import {C, EASE, FONT, PAD, tween} from '../theme';
import {Folio} from './Folio';
import {useWide} from '../format';


// El día a día de un hostelero: cinco tareas que se tachan, y el remate sobre cobalto.
export const Problema: React.FC = () => {
  const f = useCurrentFrame();
  const {pregunta, tareas, remate} = COPY.problema;
  const wide = useWide();
  const panel = tween(f, 146, 164, [100, 0], EASE);
  // En apaisado la lista se lee como un índice de revista: verbo a la izquierda, nota a la derecha.
  const ROW_TOP = wide ? 135 : 250;
  const ROW_H = wide ? 160 : 250;
  const VERB = wide ? 150 : 200;
  return (
    <AbsoluteFill>
      <Paper />
      <Folio page={2} />

      {/* Fase A: la pregunta de cada mañana */}
      <Label size={22} style={{position: 'absolute', left: PAD, top: wide ? 130 : 250, opacity: tween(f, 4, 12) - tween(f, 48, 54)}}>
        Cada mañana, la misma pregunta
      </Label>
      <Headline lines={pregunta} size={wide ? 250 : 310} at={4} stagger={6} out={46} style={{position: 'absolute', left: PAD - 6, top: wide ? 215 : 300}} />
      <Cutout src="movil-mano.png" x={wide ? 1140 : 500} y={wide ? 230 : 1180} width={wide ? 620 : 500} at={14} from={[0, 700]} rot={5} out={44} />
      <Sparkle x={wide ? 1050 : 880} y={wide ? 230 : 1080} size={110} at={24} seed={4} />

      {/* Fase B: la lista de tareas */}
      {tareas.map((t, i) => {
        const at = 56 + i * 11;
        const top = ROW_TOP + i * ROW_H;
        return (
          <div key={t.verbo} style={{position: 'absolute', left: PAD, right: PAD, top}}>
            <div style={{display: 'flex', justifyContent: 'space-between', opacity: tween(f, at, at + 8), ...(wide ? {position: 'absolute', right: 0, top: VERB * 0.55, gap: 40} : {})}}>
              <Label size={22}>{t.nota}</Label>
              <Label size={22}>{String(i + 1).padStart(2, '0')}</Label>
            </div>
            <Reveal at={at} style={{paddingTop: VERB * 0.12, marginTop: -VERB * 0.08}}>
              <div style={{fontFamily: FONT.display, fontSize: VERB, lineHeight: 0.92, color: C.tinta, filter: 'url(#tinta)'}}>{t.verbo}</div>
            </Reveal>
            <div style={{height: 3, background: C.tinta, width: `${tween(f, at + 2, at + 18) * 100}%`, marginTop: 10}} />
            <div style={{position: 'absolute', left: -12, top: VERB * 0.62, transform: 'rotate(-2deg)'}}>
              <Brush width={t.verbo.length * VERB * 0.46 + 30} at={112 + i * 5} dur={10} thick={1.3} />
            </div>
          </div>
        );
      })}

      {/* Fase C: remate sobre cobalto */}
      <AbsoluteFill style={{transform: `translateY(${panel}%)`}}>
        <Paper tint={C.cobalto} />
        <Folio page={2} color={C.papel} />
        <Label size={22} color={C.papel} style={{position: 'absolute', left: PAD, top: wide ? 250 : 560, opacity: tween(f, 160, 168)}}>
          Y todo eso, con el local abierto
        </Label>
        <Headline lines={remate} size={wide ? 230 : 255} at={156} stagger={7} color={C.papel} style={{position: 'absolute', left: PAD - 6, top: wide ? 290 : 600}} />
        <Cutout src="plato-trama.png" x={wide ? 1000 : 200} y={wide ? 360 : 1260} width={wide ? 820 : 820} at={162} from={[0, 500]} rot={-4} />
        <Dot x={wide ? 1800 : 940} y={wide ? 320 : 1180} size={70} at={174} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
