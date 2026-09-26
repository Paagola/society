import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {C, EASE_OUT, FONT, jitter, tween} from '../theme';
import type {Linea} from '../anuncio/piezas';

// Piezas del anuncio «La pizza que nadie vio»: todo es papel. Cada imagen es un recorte con el borde
// rasgado y su fibra clara, con sombra, y entra como se coloca un recorte sobre la mesa.

// Tipografía del carrusel de Da Tonino (OFL), para lo que es del restaurante: la historia y la letra «c».
loadFont({family: 'Cinzel', url: staticFile('fonts/Cinzel.ttf'), weight: '400 900', format: 'truetype'});
loadFont({family: 'Pinyon Script', url: staticFile('fonts/PinyonScript.ttf'), weight: '400', format: 'truetype'});
loadFont({family: 'Montserrat', url: staticFile('fonts/Montserrat.ttf'), weight: '100 900', format: 'truetype'});

export const SOMBRA = 'drop-shadow(0 22px 24px rgba(10,10,10,.42)) drop-shadow(0 3px 5px rgba(10,10,10,.3))';

// Cartel: titular de la marca (Anton + una palabra en Playfair cursiva). Cada línea sube desde detrás
// de su máscara en su propio fotograma (`en` por línea), para que caiga en el golpe que le toca.
export const Cartel: React.FC<{
  lineas: Linea[];
  en: number[];
  y: number;
  x?: number;
  color?: string;
  dur?: number;
}> = ({lineas, en, y, x = 64, color = C.papel, dur = 9}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', top: y, left: x, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      {lineas.map((l, i) => {
        const p = tween(f, en[i] ?? en[en.length - 1], (en[i] ?? en[en.length - 1]) + dur, [0, 1], EASE_OUT);
        return (
          <div
            key={i}
            style={{
              overflow: 'hidden',
              paddingTop: l.s * 0.14,
              marginTop: i === 0 ? 0 : -l.s * (l.it ? 0.22 : 0.17),
              paddingRight: l.it ? l.s * 0.12 : 0,
              paddingBottom: l.it ? l.s * 0.1 : 0,
            }}
          >
            <div
              style={{
                transform: `translateY(${(1 - p) * 115}%)`,
                fontFamily: l.it ? FONT.serif : FONT.display,
                fontStyle: l.it ? 'italic' : 'normal',
                fontWeight: l.it ? 800 : 400,
                fontSize: l.s,
                lineHeight: l.it ? 1.02 : 0.92,
                letterSpacing: l.it ? '-0.03em' : '-0.01em',
                whiteSpace: 'nowrap',
                color,
                filter: 'url(#tinta)',
              }}
            >
              {l.t}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Recorte colocado a mano: llega un poco grande y alto, se asienta en seco y luego tiembla apenas,
// como un recorte recolocado en una animación de papel.
export const colocar = (f: number, en: number, seed: number, dur = 7) => {
  const p = tween(f, en, en + dur, [0, 1], EASE_OUT);
  const quieto = f > en + dur;
  return {
    visible: f >= en,
    escala: 1 + (1 - p) * 0.1,
    dy: (1 - p) * -34,
    rot: (1 - p) * 3 + (quieto ? jitter(f, seed, 0.18, 4) : 0),
    jx: quieto ? jitter(f, seed + 3, 1.1, 4) : 0,
    jy: quieto ? jitter(f, seed + 5, 1.1, 4) : 0,
  };
};

// Pieza rasgada: cualquier contenido (vídeo, interfaz) recortado con la máscara de papel roto y su
// franja de fibra clara encima. La sombra sigue la forma del rasgado.
export const Rasgado: React.FC<{
  mascara: string;
  w: number;
  h: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({mascara, w, h, children, style}) => {
  const url = `url(${staticFile(`pizza/mascaras/${mascara}.png`)})`;
  return (
    <div style={{position: 'absolute', width: w, height: h, filter: SOMBRA, ...style}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          WebkitMaskImage: url,
          maskImage: url,
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
        }}
      >
        {children}
        <Img src={staticFile(`pizza/mascaras/${mascara}-fibra.png`)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
      </div>
    </div>
  );
};

// Línea de fuente de un dato: pequeña pero legible (≥ 32 px) y el tiempo suficiente.
export const Fuente: React.FC<{texto: string; y: number; en: number; color?: string}> = ({texto, y, en, color = C.tinta}) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: 66,
        fontFamily: FONT.ui,
        fontWeight: 600,
        fontSize: 34,
        color,
        opacity: tween(f, en, en + 6, [0, 0.78]),
      }}
    >
      {texto}
    </div>
  );
};
