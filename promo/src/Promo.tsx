import React from 'react';
import {AbsoluteFill} from 'remotion';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import type {TransitionPresentation} from '@remotion/transitions';
import {InkDefs} from './components';
import {WideContext} from './format';
import {C, EASE} from './theme';
import {band, sheet} from './transitions';
import {Portada} from './scenes/Portada';
import {Problema} from './scenes/Problema';
import {Marca} from './scenes/Marca';
import {Pasos, STEP} from './scenes/Pasos';
import {Feed} from './scenes/Feed';
import {BEAT, Principios} from './scenes/Principios';
import {Planes} from './scenes/Planes';
import {Cierre} from './scenes/Cierre';

// Orden y duración (en fotogramas a 30 fps) de cada página de la revista.
const SCENES = [
  {C: Portada, d: 120},
  {C: Problema, d: 196},
  {C: Marca, d: 120},
  {C: Pasos, d: STEP * 3},
  {C: Feed, d: 160},
  {C: Principios, d: BEAT * 3 + 15},
  {C: Planes, d: 150},
  {C: Cierre, d: 160},
];

// Pase entre cada página y la siguiente.
const T: {p: TransitionPresentation<Record<string, unknown>>; d: number}[] = [
  {p: sheet('up') as never, d: 14},
  {p: sheet('up') as never, d: 14},
  {p: band(C.cobalto, 'left') as never, d: 18},
  {p: sheet('left') as never, d: 14},
  {p: band(C.cobalto, 'up') as never, d: 18},
  {p: sheet('left') as never, d: 14},
  {p: band(C.cobalto, 'up') as never, d: 18},
];

export const PROMO_FRAMES = SCENES.reduce((a, s) => a + s.d, 0) - T.reduce((a, t) => a + t.d, 0);

export const Promo: React.FC<{wide: boolean}> = ({wide}) => (
  <WideContext.Provider value={wide}>
  <AbsoluteFill style={{background: C.papel}}>
    <InkDefs />
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
