import type {CSSProperties} from 'react';
import {staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';

// «La pizza que nadie vio», versión startup (Víctor, 26/09/2026): la misma historia, sin papel.
// Fondos oscuros y algunos en azul; letras en blanco; azul para letras solo sobre fondo blanco;
// el amarillo, muy de vez en cuando.
export const K = {
  negro: '#0A0A0C',
  panel: '#131317',
  linea: 'rgba(255,255,255,0.07)',
  blanco: '#F5F4F0',
  gris: 'rgba(245,244,240,0.62)',
  azul: '#2440E0',
  azulHondo: '#1A2FB0',
  amarillo: '#F5C518',
};

// Geist (Vercel, licencia OFL): grotesca de startup para todo el vídeo.
loadFont({family: 'Geist', url: staticFile('fonts/Geist.woff2'), weight: '100 900', format: 'woff2'});
loadFont({family: 'Geist Mono', url: staticFile('fonts/GeistMono.woff2'), weight: '400 700', format: 'woff2'});

export const F = {sans: 'Geist', mono: 'Geist Mono'};

// Titular: grande, apretado y seco.
export const titular = (s: number, peso = 780): CSSProperties => ({
  fontFamily: F.sans,
  fontWeight: peso,
  fontSize: s,
  lineHeight: 0.98,
  letterSpacing: '-0.045em',
  color: K.blanco,
  whiteSpace: 'nowrap',
});
