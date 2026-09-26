import React, {createContext, useContext} from 'react';
import TL from './timeline.json';
import {FPS} from './theme';

// Rejilla musical de la pieza. La banda sonora (scripts/banda_sonora.py) se monta sobre la misma
// rejilla, así que todo lo que cae en beatFrame(n) cae en un tiempo de la música.
export const BPM = TL.bpm; // 132,983: pulso medido de la canción del reel; la música se estira a él
export const BEAT_S = 60 / BPM;
export const BEAT_F = BEAT_S * FPS; // ≈ 13,5 fotogramas por tiempo
export const beatFrame = (n: number) => Math.round((TL.t0 + n * BEAT_S) * FPS);

export const CUTS = TL.cuts as Record<string, number>;
export const FINAL_BEAT = TL.final;
export const END_FRAME = beatFrame(TL.final) + Math.round(TL.tail_s * FPS);
export const REEL = TL.reel;

// Cada escena conoce el tiempo en que entra (el centro de su pase) y su primer fotograma absoluto.
type SceneBeat = {cut: number; start: number};
const Ctx = createContext<SceneBeat>({cut: 0, start: 0});
export const SceneBeatProvider: React.FC<SceneBeat & {children: React.ReactNode}> = ({cut, start, children}) => (
  <Ctx.Provider value={{cut, start}}>{children}</Ctx.Provider>
);

// bt(k): fotograma local de la escena en el que cae el tiempo k contado desde su entrada.
export const useBt = () => {
  const {cut, start} = useContext(Ctx);
  return (k: number) => beatFrame(cut + k) - start;
};
