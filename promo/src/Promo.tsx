import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import type {TransitionPresentation} from '@remotion/transitions';
import {InkDefs} from './components';
import {WideContext} from './format';
import {C, EASE} from './theme';
import {band, flip, sheet} from './transitions';
import {beatFrame, CUTS, END_FRAME, SceneBeatProvider} from './timing';
import {Portada} from './scenes/Portada';
import {Problema} from './scenes/Problema';
import {Marca} from './scenes/Marca';
import {Aprueba, Carrusel, CasoIntro, Crea, Fotos, Reel, Resultado} from './scenes/Caso';
import {Planes} from './scenes/Planes';
import {Cierre} from './scenes/Cierre';

type P = TransitionPresentation<Record<string, unknown>>;

// Orden de las páginas y pase de salida de cada una. El centro de cada pase cae en el tiempo de la
// música indicado en src/timeline.json («cuts»). Tres pases, cada uno con su papel:
//   hoja  → página siguiente del mismo capítulo;
//   página (flip) → cambio de capítulo;
//   banda → golpe de color en los momentos de impacto.
const SCENES: {id: string; C: React.FC; out?: {p: P; d: number}}[] = [
  {id: 'Portada', C: Portada, out: {p: sheet('up') as never, d: 12}},
  {id: 'Problema', C: Problema, out: {p: band(C.cobalto, 'left') as never, d: 14}},
  {id: 'Marca', C: Marca, out: {p: flip() as never, d: 18}},
  {id: 'CasoIntro', C: CasoIntro, out: {p: sheet('left') as never, d: 12}},
  {id: 'Fotos', C: Fotos, out: {p: sheet('left') as never, d: 12}},
  {id: 'Crea', C: Crea, out: {p: sheet('left') as never, d: 12}},
  {id: 'Aprueba', C: Aprueba, out: {p: sheet('left') as never, d: 12}},
  {id: 'Carrusel', C: Carrusel, out: {p: flip() as never, d: 18}},
  {id: 'Reel', C: Reel, out: {p: band(C.mostaza, 'up') as never, d: 14}},
  {id: 'Resultado', C: Resultado, out: {p: flip() as never, d: 18}},
  {id: 'Planes', C: Planes, out: {p: sheet('up') as never, d: 12}},
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
      {/* Banda sonora premezclada (scripts/banda_sonora.py): música + audio original del reel, a −14 LUFS. */}
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
