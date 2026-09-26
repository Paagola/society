import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile} from 'remotion';
import {b, DURACION, MUSICA_CORTA, MUSICA_VUELVE} from '../pizza/guion';
import {Acto1} from './acto1';
import {Acto2} from './acto2';
import {Acto3} from './acto3';
import {Acto4} from './acto4';
import {Acto5} from './acto5';
import {K} from './estilo';

// «La pizza que nadie vio», versión startup: la misma historia, la misma música y la misma rejilla que
// la versión de papel (promo/src/pizza), con motion design hecho con GSAP (greensock/gsap-skills).

export const DURACION_STARTUP = DURACION;

const Acto: React.FC<{de: number; a: number; children: React.ReactNode}> = ({de, a, children}) => (
  <Sequence from={b(de)} durationInFrames={b(a) - b(de)} premountFor={30}>
    {children}
  </Sequence>
);

const Sonido: React.FC<{src: string; en: number; vol?: number}> = ({src, en, vol = 1}) => (
  <Sequence from={Math.round(en)} durationInFrames={60}>
    <Audio src={staticFile(`audio/${src}.wav`)} volume={vol} />
  </Sequence>
);

const serie = (src: string, desde: number, cada: number, n: number, vol: number) =>
  Array.from({length: n}, (_, i) => <Sonido key={`${src}-${desde}-${i}`} src={src} en={desde + i * cada} vol={vol} />);

export const Startup: React.FC = () => (
  <AbsoluteFill style={{background: K.negro}}>
    <Acto de={0} a={10}>
      <Acto1 />
    </Acto>
    <Acto de={10} a={20}>
      <Acto2 />
    </Acto>
    <Acto de={20} a={32}>
      <Acto3 />
    </Acto>
    <Acto de={32} a={46}>
      <Acto4 />
    </Acto>
    <Acto de={46} a={57}>
      <Acto5 />
    </Acto>

    {/* Música: suena con la pizza real, se corta con el clic y vuelve cuando aterriza la foto en Society */}
    <Sequence durationInFrames={MUSICA_CORTA}>
      <Audio
        src={staticFile('audio/musica.m4a')}
        volume={(f) => interpolate(f, [0, 2, MUSICA_CORTA - 2, MUSICA_CORTA], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />
    </Sequence>
    <Sequence from={MUSICA_CORTA} durationInFrames={MUSICA_VUELVE - MUSICA_CORTA + 10}>
      <Audio
        src={staticFile('audio/anuncio/ambiente.wav')}
        volume={(f) => interpolate(f, [0, 6, MUSICA_VUELVE - MUSICA_CORTA, MUSICA_VUELVE - MUSICA_CORTA + 10], [0, 0.6, 0.6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />
    </Sequence>
    <Sequence from={MUSICA_VUELVE}>
      <Audio
        src={staticFile('audio/musica.m4a')}
        startFrom={MUSICA_VUELVE}
        volume={(f) =>
          interpolate(f, [0, 3, DURACION - MUSICA_VUELVE - 24, DURACION - MUSICA_VUELVE], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
        }
      />
    </Sequence>

    {/* Efectos, uno por acción */}
    <Sonido src="pizza/clic" en={b(4)} />
    {serie('pizza/tic', b(4) + 3, 1.5, 6, 0.55)}
    <Sonido src="anuncio/toque" en={b(8)} vol={0.8} />
    <Sonido src="anuncio/toque" en={b(8.5) + 2} vol={0.8} />
    <Sonido src="pizza/arrugar" en={b(8.5) + 4} vol={0.85} />
    <Sonido src="anuncio/desliza" en={b(10) + 4} vol={0.6} />
    {serie('pizza/pop', b(11) + 3, 2, 4, 0.45)}
    {serie('pizza/tic', b(12), 4.5, 3, 0.6)}
    <Sonido src="anuncio/persiana" en={b(15)} vol={0.8} />
    <Sonido src="anuncio/golpe" en={b(17)} vol={0.8} />
    <Sonido src="anuncio/persiana" en={b(20)} vol={0.45} />
    <Sonido src="pizza/lanzar" en={b(21) - 12} vol={0.7} />
    <Sonido src="pizza/pop" en={b(21) - 1} vol={0.8} />
    {serie('pizza/pop', b(25), 2, 3, 0.45)}
    <Sonido src="pizza/encuadre" en={b(25) + 5} vol={0.7} />
    <Sonido src="pizza/tic" en={b(25) + 21} vol={0.6} />
    <Sonido src="pizza/tic" en={b(26)} vol={0.6} />
    <Sonido src="pizza/escanear" en={b(26) + 1} vol={0.8} />
    <Sonido src="pizza/tic" en={b(27) + 8} vol={0.6} />
    <Sonido src="pizza/lanzar" en={b(28)} vol={0.6} />
    <Sonido src="pizza/lanzar" en={b(32)} vol={0.55} />
    <Sonido src="pizza/pop" en={b(33)} vol={0.5} />
    <Sonido src="anuncio/desliza" en={b(36) - 2} vol={0.8} />
    {[37, 38, 39, 40].map((k) => (
      <Sonido key={k} src="anuncio/desliza" en={b(k) - 3} vol={0.4} />
    ))}
    <Sonido src="anuncio/toque" en={b(41) + 1} vol={0.8} />
    <Sonido src="pizza/pop" en={b(41) + 13} vol={0.6} />
    <Sonido src="anuncio/golpe" en={b(46)} vol={0.85} />
    {serie('pizza/pop', b(48), 3, 3, 0.55)}
    <Sonido src="pizza/lanzar" en={b(52) - 3} vol={0.55} />
    {serie('pizza/tic', b(52) + 9, 1.5, 7, 0.5)}
  </AbsoluteFill>
);
