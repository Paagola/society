import React from 'react';
import {Img, staticFile, useVideoConfig} from 'remotion';
import {C} from '../theme';
import {acota, entrada, salida, Sonidos, usePaso} from './motor';

// Transiciones de papel. Cada una tapa el cuadro entero justo a mitad de su duración: ese es el
// fotograma en el que el guion cambia de escena (`en + dur / 2`).

const papel = (color: string) => (color === C.cobalto ? 'cobalto' : color === C.tinta ? 'tinta' : 'papel');

// Tiras rasgadas que cruzan el cuadro alternando de lado: entran, lo tapan y siguen hasta salir.
export const TransTiras: React.FC<{en: number; dur?: number; colores?: string[]; n?: number}> = ({en, dur = 22, colores = [C.cobalto, C.tinta, C.cobalto, C.papel, C.tinta, C.cobalto], n = 6}) => {
  const f = usePaso();
  const {width: VW, height: VH} = useVideoConfig();
  const son = <Sonidos ev={Array.from({length: n}, (_, i) => ({f: en + i, src: 'audio/pizza/lanzar.wav', vol: 0.3, rate: 0.9 + 0.05 * i})).concat([{f: en + dur / 2, src: 'audio/pizza/pegar-1.wav', vol: 0.7, rate: 0.7}])} />;
  if (f < en || f > en + dur + n) return son;
  const alto = (VH / n) * 1.35;
  const mitad = dur / 2;
  return (
    <>
      {son}
      {Array.from({length: n}, (_, i) => {
        const t = f - en - i * 0.5;
        const izq = i % 2 === 0;
        // entra (0 → tapa) en la primera mitad y sigue hasta salir por el otro lado en la segunda
        const x = t < mitad ? -(1 - salida(acota(t / mitad))) : entrada(acota((t - mitad) / mitad));
        const X = (izq ? 1 : -1) * x * (VW + 160);
        const url = `url(${staticFile(`papel/mascaras/tira-${4 + (i % 2)}.png`)})`;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: -80,
              top: (i * VH) / n - alto * 0.13,
              width: VW + 160,
              height: alto,
              transform: `translateX(${X}px) rotate(${(i % 2 ? 1 : -1) * 1.2}deg)`,
              filter: 'drop-shadow(0 10px 0 rgba(20, 14, 8, 0.3))',
            }}
          >
            <div style={{position: 'absolute', inset: 0, WebkitMaskImage: url, maskImage: url, WebkitMaskSize: '100% 100%', maskSize: '100% 100%'}}>
              <Img src={staticFile(`papel/fondos/${papel(colores[i % colores.length])}.jpg`)} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
              <Img src={staticFile(`papel/mascaras/tira-${4 + (i % 2)}-fibra.png`)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
            </div>
          </div>
        );
      })}
    </>
  );
};

// Hoja entera rasgada arriba y abajo que sube desde abajo, tapa el cuadro y se va por arriba.
export const TransHoja: React.FC<{en: number; dur?: number; color?: string}> = ({en, dur = 24, color = C.cobalto}) => {
  const f = usePaso();
  const {width: VW, height: VH} = useVideoConfig();
  const son = <Sonidos ev={[{f: en, src: 'audio/pizza/lanzar.wav', vol: 0.5, rate: 0.8}, {f: en + dur / 2, src: 'audio/pizza/alisar.wav', vol: 0.5, rate: 1}]} />;
  if (f < en || f > en + dur) return son;
  const H = 2300;
  const mitad = dur / 2;
  const t = f - en;
  // posición del borde de arriba: de abajo del cuadro a tapar (−190) y luego hasta salir por arriba
  const top = t < mitad ? VH - (VH + 190) * salida(acota(t / mitad)) : -190 - (H - 190) * entrada(acota((t - mitad) / mitad));
  const url = `url(${staticFile('papel/mascaras/hoja.png')})`;
  return (
    <>
      {son}
      <div style={{position: 'absolute', left: 0, top, width: VW, height: H, filter: 'drop-shadow(0 -10px 0 rgba(20, 14, 8, 0.3))'}}>
        <div style={{position: 'absolute', inset: 0, WebkitMaskImage: url, maskImage: url, WebkitMaskSize: '100% 100%', maskSize: '100% 100%'}}>
          <Img src={staticFile(`papel/fondos/${papel(color)}.jpg`)} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
          <Img src={staticFile('papel/mascaras/hoja-fibra.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
        </div>
      </div>
    </>
  );
};
