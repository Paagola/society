import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import type {TransitionPresentation} from '@remotion/transitions';
import {InkDefs} from './components';
import {WideContext} from './format';
import {C, EASE} from './theme';
import {band, sheet} from './transitions';
import {beatFrame, CUTS, END_FRAME, SceneBeatProvider} from './timing';
import {Gancho, Hueco, Paella, Rigatoni, Ruptura} from './scenes/Apertura';
import {Aprueba, Carrusel, Crea, Fotos, Historia, Reel, Resultado} from './scenes/Caso';
import {Cierre} from './scenes/Cierre';

type P = TransitionPresentation<Record<string, unknown>>;

// Promo combinada (27/09/2026): la historia de la versión de Víctor del 25/09 sobre la rejilla musical
// de la v3 de Juanma.
//   · De Víctor: nada de marca ni de app hasta la ruptura. El turno real de Da Tonino (gancho con el
//     sonido del reel → platos que nadie fotografía → el hueco) hasta que una frase lo cambia; después,
//     lo que ya existe: fotos → propone → eliges → carrusel → reel → historia → resultado.
//   · De la v3: cada corte cae en un tiempo de la música (src/timeline.json), banda sonora CC0 premezclada
//     con el audio del reel (scripts/banda_sonora.py) y el caso de Da Tonino rehecho.
//   · Pases solo en 2D, hojas y bandas de color a sangre (Víctor, 25/09: se retiraron cubo, flip y
//     profundidad; leían como maqueta, no como revista impresa). La banda de papel entre el hueco y la
//     ruptura es a propósito: se enciende la luz de la idea. La banda mostaza marca la vuelta de la música.
// El centro de cada pase cae en el tiempo indicado en src/timeline.json («cuts»).
const SCENES: {id: string; C: React.FC; out?: {p: P; d: number}}[] = [
  {id: 'Gancho', C: Gancho, out: {p: band(C.tinta, 'left') as never, d: 14}},
  {id: 'Rigatoni', C: Rigatoni, out: {p: band(C.tinta, 'left') as never, d: 14}},
  {id: 'Paella', C: Paella, out: {p: band(C.tinta, 'up') as never, d: 14}},
  {id: 'Hueco', C: Hueco, out: {p: band(C.papel, 'up') as never, d: 18}},
  {id: 'Ruptura', C: Ruptura, out: {p: sheet('left') as never, d: 16}},
  {id: 'Fotos', C: Fotos, out: {p: band(C.tinta, 'left') as never, d: 16}},
  {id: 'Crea', C: Crea, out: {p: sheet('up') as never, d: 16}},
  {id: 'Aprueba', C: Aprueba, out: {p: sheet('left') as never, d: 16}},
  {id: 'Carrusel', C: Carrusel, out: {p: band(C.cobalto, 'up') as never, d: 16}},
  {id: 'Reel', C: Reel, out: {p: band(C.mostaza, 'up') as never, d: 14}},
  {id: 'Historia', C: Historia, out: {p: band(C.cobalto, 'left') as never, d: 16}},
  {id: 'Resultado', C: Resultado, out: {p: band(C.tinta, 'up') as never, d: 16}},
  {id: 'Cierre', C: Cierre},
];

// Primer fotograma y duración de cada página a partir de los tiempos de corte.
const cutF = SCENES.map((s) => beatFrame(CUTS[s.id]));
const starts = SCENES.map((s, i) => (i === 0 ? 0 : cutF[i] - Math.floor(SCENES[i - 1].out!.d / 2)));
const ends = SCENES.map((s, i) => (s.out ? cutF[i + 1] + (s.out.d - Math.floor(s.out.d / 2)) : END_FRAME));
export const LAYOUT = SCENES.map((s, i) => ({id: s.id, start: starts[i], dur: ends[i] - starts[i], cut: CUTS[s.id]}));
export const PROMO_FRAMES = END_FRAME;

export const Promo: React.FC<{wide: boolean}> = ({wide}) => (
  <WideContext.Provider value={wide}>
    <AbsoluteFill style={{background: C.tinta}}>
      <InkDefs />
      {/* Banda sonora premezclada (scripts/banda_sonora.py): sonido del reel en el gancho, música y audio
          original del reel en el caso, a −14 LUFS. Los vídeos van silenciados. */}
      <Audio src={staticFile('audio/banda-sonora.wav')} />
      <TransitionSeries>
        {SCENES.map(({C: Scene, out}, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={LAYOUT[i].dur}>
              <SceneBeatProvider cut={LAYOUT[i].cut} start={LAYOUT[i].start}>
                <Scene />
              </SceneBeatProvider>
            </TransitionSeries.Sequence>
            {out && <TransitionSeries.Transition presentation={out.p} timing={linearTiming({durationInFrames: out.d, easing: EASE})} />}
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  </WideContext.Provider>
);
