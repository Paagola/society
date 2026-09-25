import {Easing, interpolate, staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';

// Paleta de society-identidad-editorial (regla 60 / 30 / 10).
export const C = {
  papel: '#ECE8DC',
  cobalto: '#2440E0',
  mostaza: '#F5C518',
  tinta: '#141414',
  blanco: '#FFFFFF',
};

// Fuentes servidas desde public/fonts (subconjunto latino de Google Fonts, licencia OFL),
// para que el render no dependa de la red.
const face = (family: string, file: string, weight: string, style = 'normal') =>
  loadFont({family, url: staticFile(`fonts/${file}`), weight, style, format: 'woff2'});

face('Anton', 'Anton.woff2', '400');
face('Playfair Display', 'PlayfairDisplay-italic.woff2', '700 900', 'italic');
face('Schibsted Grotesk', 'SchibstedGrotesk.woff2', '400 800');
face('Space Mono', 'SpaceMono.woff2', '700');

export const FONT = {
  // Titulares: grotesca ultracondensada y pesada.
  display: 'Anton',
  // Acento: la palabra en cursiva de cada titular y el logotipo «Society».
  serif: 'Playfair Display',
  // Interfaz y texto.
  ui: 'Schibsted Grotesk',
  // Etiquetas pequeñas en mayúsculas.
  mono: 'Space Mono',
};

export const W = 1080;
export const H = 1920;
export const FPS = 30;
export const PAD = 72;

// Curvas: entrada seca de imprenta y frenada larga.
export const EASE = Easing.bezier(0.76, 0, 0.18, 1);
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN = Easing.bezier(0.7, 0, 0.84, 0);

export const tween = (
  frame: number,
  from: number,
  to: number,
  out: [number, number] = [0, 1],
  easing = EASE,
) =>
  interpolate(frame, [from, to], out, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

// Temblor de stop-motion: cambia cada `step` fotogramas, como un recorte recolocado a mano.
export const jitter = (frame: number, seed: number, amp = 1, step = 4) => {
  const k = Math.floor(frame / step) + seed * 17.13;
  const r = Math.sin(k * 12.9898 + seed * 78.233) * 43758.5453;
  return (r - Math.floor(r) - 0.5) * 2 * amp;
};
