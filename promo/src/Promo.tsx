import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile} from 'remotion';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import type {TransitionPresentation} from '@remotion/transitions';
import {InkDefs} from './components';
import {WideContext} from './format';
import {C, EASE} from './theme';
import {band, sheet} from './transitions';
import {A, Gancho, Hueco, Paella, Rigatoni, Ruptura} from './scenes/Apertura';
import {Aprueba, Carrusel, Crea, D, Fotos, Historia, Reel, Resultado} from './scenes/Caso';
import {Cierre} from './scenes/Cierre';

// Orden y duración (en fotogramas a 30 fps) de cada página.
// 25/09/2026 — reescrito de cero: nada de marca ni de app hasta la ruptura.
// El turno real de Da Tonino (gancho → platos que nadie fotografía → el hueco)
// hasta que una frase lo cambia, y ahí es donde entra lo que ya existe:
// fotos → crea → aprueba → reel → carrusel → historia → resultado.
const SCENES = [
  {C: Gancho, d: A.gancho},
  {C: Rigatoni, d: A.rigatoni},
  {C: Paella, d: A.paella},
  {C: Hueco, d: A.hueco},
  {C: Ruptura, d: A.ruptura},
  {C: Fotos, d: D.fotos},
  {C: Crea, d: D.crea},
  {C: Aprueba, d: D.aprueba},
  {C: Reel, d: D.reel},
  {C: Carrusel, d: D.carrusel},
  {C: Historia, d: D.historia},
  {C: Resultado, d: D.resultado},
  {C: Cierre, d: 160},
];

type P = TransitionPresentation<Record<string, unknown>>;
// Pase entre cada página y la siguiente: hojas y bandas de color a sangre — sólidas, en 2D,
// para que cada página se lea grande de golpe (25/09/2026: se retiraron cubo, flip y
// profundidad en 3D; leían como maqueta, no como revista impresa). El color de cada banda
// funde con el fondo de la página que llega, así el corte no se nota como efecto. La banda
// de papel entre el hueco y la ruptura es a propósito: se enciende la luz de la idea.
const T: {p: P; d: number}[] = [
  {p: band(C.tinta, 'left') as never, d: 14},
  {p: band(C.tinta, 'left') as never, d: 14},
  {p: band(C.tinta, 'up') as never, d: 14},
  {p: band(C.papel, 'up') as never, d: 18},
  {p: sheet('left') as never, d: 16},
  {p: band(C.tinta, 'left') as never, d: 16},
  {p: sheet('up') as never, d: 16},
  {p: sheet('left') as never, d: 16},
  {p: band(C.cobalto, 'up') as never, d: 16},
  {p: sheet('up') as never, d: 16},
  {p: band(C.cobalto, 'left') as never, d: 16},
  {p: band(C.tinta, 'up') as never, d: 16},
];

export const PROMO_FRAMES = SCENES.reduce((a, s) => a + s.d, 0) - T.reduce((a, t) => a + t.d, 0);

// Fotograma en el que empieza cada página dentro del vídeo completo.
const START = SCENES.map((_, i) => SCENES.slice(0, i).reduce((a, s) => a + s.d, 0) - T.slice(0, i).reduce((a, t) => a + t.d, 0));
const REEL_IN = START[SCENES.findIndex((s) => s.C === Reel)];
const REEL_OUT = REEL_IN + D.reel;
const RIGATONI_IN = START[1];

// Música: silencio durante el gancho (suena el vídeo real, con su propio sonido) y entra
// al llegar el primer plato. Baja a cero mientras suena el reel en el móvil y vuelve después;
// fundido al final.
const musicVolume = (f: number) =>
  interpolate(
    f,
    [0, RIGATONI_IN, RIGATONI_IN + 20, REEL_IN - 12, REEL_IN + 4, REEL_OUT - 20, REEL_OUT + 10, PROMO_FRAMES - 40, PROMO_FRAMES],
    [0, 0, 1, 1, 0, 0, 1, 1, 0],
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
