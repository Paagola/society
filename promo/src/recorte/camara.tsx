import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import {jitter} from '../theme';

// Cámara sobre un único lienzo («dashboard»): en vez de cambiar de pantalla, la cámara viaja y se centra
// en lo que se enseña. Claves {f, x, y, z}: el punto (x, y) del lienzo queda en el centro del cuadro con
// zoom z. Entre claves, curva suave; el zoom se interpola en escala logarítmica para que un acercamiento
// grande (entrar en un QR) avance a ritmo constante. `temblor` (apagado por defecto) añade un temblor a saltos.

export type Clave = {f: number; x: number; y: number; z?: number; r?: number; curva?: (t: number) => number};

export const SUAVE = Easing.bezier(0.65, 0, 0.35, 1);
export const SALE = Easing.bezier(0.16, 1, 0.3, 1);
export const ENTRA = Easing.bezier(0.7, 0, 0.84, 0);

export const enClaves = (f: number, claves: Clave[]) => {
  const k = claves;
  if (f <= k[0].f) return {x: k[0].x, y: k[0].y, z: k[0].z ?? 1, r: k[0].r ?? 0};
  for (let i = 0; i < k.length - 1; i++) {
    const a = k[i];
    const b = k[i + 1];
    if (f <= b.f) {
      const t = (b.curva ?? SUAVE)((f - a.f) / Math.max(1, b.f - a.f));
      const za = Math.log(a.z ?? 1);
      const zb = Math.log(b.z ?? 1);
      return {x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: Math.exp(za + (zb - za) * t), r: (a.r ?? 0) + ((b.r ?? 0) - (a.r ?? 0)) * t};
    }
  }
  const u = k[k.length - 1];
  return {x: u.x, y: u.y, z: u.z ?? 1, r: u.r ?? 0};
};

export const Mundo: React.FC<{claves: Clave[]; desde?: number; hasta?: number; fondo?: string; temblor?: boolean; children: React.ReactNode}> = ({claves, desde = -Infinity, hasta = Infinity, fondo, temblor = false, children}) => {
  const f = useCurrentFrame();
  const {width: VW, height: VH} = useVideoConfig();
  if (f < desde || f >= hasta) return null;
  const c = enClaves(f, claves);
  const p = Math.floor(f / 2) * 2;
  const t = temblor ? 1 : 0;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: fondo}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transformOrigin: '0 0',
          transform: `translate(${VW / 2 + t * jitter(p, 41, 0.7, 2)}px, ${VH / 2 + t * jitter(p, 42, 0.7, 2)}px) scale(${c.z}) rotate(${c.r}deg) translate(${-c.x}px, ${-c.y}px)`,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
