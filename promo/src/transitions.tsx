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

// ---------------------------------------------------------------------------
// Pases 3D
// ---------------------------------------------------------------------------

// Cubo: las dos páginas son caras de un cubo que gira. La que se va se oscurece al girar.
type CubeProps = {dir: Dir};
const CubePresentation: React.FC<TransitionPresentationComponentProps<CubeProps>> = ({
  children,
  presentationProgress: p,
  presentationDirection,
  passedProps: {dir},
}) => {
  const exiting = presentationDirection === 'exiting';
  const a = exiting ? -90 * p : 90 * (1 - p);
  const shift = exiting ? -100 * p : 100 * (1 - p);
  // Un poco de retroceso en el centro del giro para que se lea el volumen.
  const back = -Math.sin(p * Math.PI) * 380;
  const t =
    dir === 'left'
      ? `perspective(2400px) translateZ(${back}px) translateX(${shift}%) rotateY(${a}deg)`
      : `perspective(2400px) translateZ(${back}px) translateY(${shift}%) rotateX(${-a}deg)`;
  const origin = dir === 'left' ? (exiting ? 'right center' : 'left center') : exiting ? 'center bottom' : 'center top';
  const shade = exiting ? 0.55 * p : 0.55 * (1 - p);
  return (
    <AbsoluteFill style={{transform: t, transformOrigin: origin, backfaceVisibility: 'hidden'}}>
      {children}
      <AbsoluteFill style={{background: C.tinta, opacity: shade}} />
    </AbsoluteFill>
  );
};
export const cube = (dir: Dir = 'left'): TransitionPresentation<CubeProps> => ({
  component: CubePresentation,
  props: {dir},
});

// Pase de página de revista: la página se levanta por el lomo izquierdo y deja ver la siguiente debajo.
type FlipProps = Record<string, never>;
const FlipPresentation: React.FC<TransitionPresentationComponentProps<FlipProps>> = ({children, presentationProgress: p, presentationDirection}) => {
  if (presentationDirection === 'entering') {
    return (
      <AbsoluteFill style={{zIndex: 0}}>
        {children}
        <AbsoluteFill style={{background: C.tinta, opacity: 0.45 * (1 - p)}} />
      </AbsoluteFill>
    );
  }
  const a = -118 * p;
  return (
    <AbsoluteFill
      style={{
        zIndex: 2,
        transform: `perspective(2600px) rotateY(${a}deg)`,
        transformOrigin: 'left center',
        backfaceVisibility: 'hidden',
        boxShadow: `${40 * p}px 0 80px rgba(20,20,20,${0.35 * Math.sin(p * Math.PI)})`,
      }}
    >
      {children}
      <AbsoluteFill style={{background: `linear-gradient(90deg, rgba(20,20,20,0) 40%, rgba(20,20,20,${0.5 * p}))`}} />
    </AbsoluteFill>
  );
};
export const flip = (): TransitionPresentation<FlipProps> => ({component: FlipPresentation, props: {}});

// Profundidad: la página se aleja al fondo y la nueva llega desde detrás de la cámara.
type DepthProps = Record<string, never>;
const DepthPresentation: React.FC<TransitionPresentationComponentProps<DepthProps>> = ({children, presentationProgress: p, presentationDirection}) => {
  if (presentationDirection === 'exiting') {
    return (
      <AbsoluteFill style={{transform: `perspective(2000px) translateZ(${-1400 * p}px) rotateX(${14 * p}deg)`, opacity: 1 - p * 0.9}}>
        {children}
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{transform: `perspective(2000px) translateZ(${900 * (1 - p)}px) rotateX(${-10 * (1 - p)}deg)`, opacity: Math.min(1, p * 1.6)}}>
      {children}
    </AbsoluteFill>
  );
};
export const depth = (): TransitionPresentation<DepthProps> => ({component: DepthPresentation, props: {}});
