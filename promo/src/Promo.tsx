import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile} from 'remotion';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import type {TransitionPresentation} from '@remotion/transitions';
import {InkDefs} from './components';
import {WideContext} from './format';
import {C, EASE} from './theme';
import {band, cube, depth, flip, sheet} from './transitions';
import {Portada} from './scenes/Portada';
import {Problema} from './scenes/Problema';
import {Marca} from './scenes/Marca';
import {Aprueba, Carrusel, CasoIntro, Crea, D, Fotos, Reel, Resultado} from './scenes/Caso';
import {Planes} from './scenes/Planes';
import {Cierre} from './scenes/Cierre';

// Orden y duración (en fotogramas a 30 fps) de cada página.
// Del problema a la marca y, después, el caso real de Da Tonino contado paso a paso.
const SCENES = [
  {C: Portada, d: 120},
  {C: Problema, d: 196},
  {C: Marca, d: 116},
  {C: CasoIntro, d: D.intro},
  {C: Fotos, d: D.fotos},
  {C: Crea, d: D.crea},
  {C: Aprueba, d: D.aprueba},
  {C: Reel, d: D.reel},
  {C: Carrusel, d: D.carrusel},
  {C: Resultado, d: D.resultado},
  {C: Planes, d: 140},
  {C: Cierre, d: 160},
];

type P = TransitionPresentation<Record<string, unknown>>;
// Pase entre cada página y la siguiente: hojas y bandas de la revista, más cubo, página y profundidad en 3D.
const T: {p: P; d: number}[] = [
  {p: sheet('up') as never, d: 14},
  {p: band(C.cobalto, 'left') as never, d: 18},
  {p: cube('left') as never, d: 24},
  {p: flip() as never, d: 26},
  {p: cube('left') as never, d: 24},
  {p: depth() as never, d: 22},
  {p: cube('up') as never, d: 24},
  {p: flip() as never, d: 26},
  {p: depth() as never, d: 22},
  {p: band(C.mostaza, 'up') as never, d: 18},
  {p: flip() as never, d: 26},
];

export const PROMO_FRAMES = SCENES.reduce((a, s) => a + s.d, 0) - T.reduce((a, t) => a + t.d, 0);

// Fotograma en el que empieza cada página dentro del vídeo completo.
const START = SCENES.map((_, i) => SCENES.slice(0, i).reduce((a, s) => a + s.d, 0) - T.slice(0, i).reduce((a, t) => a + t.d, 0));
const REEL_IN = START[SCENES.findIndex((s) => s.C === Reel)];
const REEL_OUT = REEL_IN + D.reel;

// Música: la canción del propio reel en bucle. Baja a cero mientras suena el reel en el móvil
// (el reel trae su audio) y vuelve después; fundido al final.
const musicVolume = (f: number) =>
  interpolate(
    f,
    [0, 10, REEL_IN - 12, REEL_IN + 4, REEL_OUT - 20, REEL_OUT + 10, PROMO_FRAMES - 40, PROMO_FRAMES],
    [0, 1, 1, 0, 0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

export const Promo: React.FC<{wide: boolean}> = ({wide}) => (
  <WideContext.Provider value={wide}>
    <AbsoluteFill style={{background: C.tinta}}>
      <InkDefs />
      <Audio src={staticFile('audio/musica.m4a')} volume={musicVolume} />
      <TransitionSeries>
        {SCENES.map(({C: Scene, d}, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={d}>
              <Scene />
            </TransitionSeries.Sequence>
            {T[i] && <TransitionSeries.Transition presentation={T[i].p} timing={linearTiming({durationInFrames: T[i].d, easing: EASE})} />}
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  </WideContext.Provider>
);
