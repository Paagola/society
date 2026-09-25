import React from 'react';
import {AbsoluteFill} from 'remotion';
import type {TransitionPresentation, TransitionPresentationComponentProps} from '@remotion/transitions';
import {C} from './theme';

type Dir = 'up' | 'left';

// Pase de hoja: la página nueva entra por encima de la anterior, que se hunde un poco.
type SheetProps = {dir: Dir};
const SheetPresentation: React.FC<TransitionPresentationComponentProps<SheetProps>> = ({
  children,
  presentationProgress: p,
  presentationDirection,
  passedProps: {dir},
}) => {
  if (presentationDirection === 'exiting') {
    const t = dir === 'up' ? `translateY(${-18 * p}%)` : `translateX(${-18 * p}%)`;
    return (
      <AbsoluteFill style={{transform: `${t} scale(${1 - 0.04 * p})`, filter: `brightness(${1 - 0.35 * p})`}}>
        {children}
      </AbsoluteFill>
    );
  }
  const t = dir === 'up' ? `translateY(${100 - 100 * p}%)` : `translateX(${100 - 100 * p}%)`;
  return (
    <AbsoluteFill style={{transform: t, boxShadow: '0 -30px 60px rgba(20,20,20,.25)'}}>
      {children}
    </AbsoluteFill>
  );
};
export const sheet = (dir: Dir = 'up'): TransitionPresentation<SheetProps> => ({
  component: SheetPresentation,
  props: {dir},
});

// Barrido de color: una banda cobalto (o mostaza) cruza la página y destapa la siguiente.
type BandProps = {color: string; dir: Dir};
const BandPresentation: React.FC<TransitionPresentationComponentProps<BandProps>> = ({
  children,
  presentationProgress: p,
  presentationDirection,
  passedProps: {color, dir},
}) => {
  if (presentationDirection === 'exiting') {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  // La banda entra primero y la página nueva la sigue.
  const edge = 118 - 136 * p; // borde de la página nueva, en %
  const clip = (v: number) =>
    dir === 'up' ? `inset(${Math.max(0, v)}% 0 0 0)` : `inset(0 0 0 ${Math.max(0, v)}%)`;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: color, clipPath: clip(edge - 18)}} />
      <AbsoluteFill style={{clipPath: clip(edge)}}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
export const band = (color: string = C.cobalto, dir: Dir = 'up'): TransitionPresentation<BandProps> => ({
  component: BandPresentation,
  props: {color, dir},
});
