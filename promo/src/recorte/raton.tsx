import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {SALE, SUAVE} from './camara';
import {acota, Sonidos} from './motor';

// Ratón de demostración: recorre puntos {f, x, y} del lienzo con curva suave, hace clic donde se le
// pide (se hunde, sale una onda cobalto y suena) y puede llevar cosas arrastradas (ver `arrastre`).

export type Punto = {f: number; x: number; y: number; clic?: boolean};

export const enRuta = (f: number, ruta: Punto[]) => {
  if (f <= ruta[0].f) return {x: ruta[0].x, y: ruta[0].y};
  for (let i = 0; i < ruta.length - 1; i++) {
    const a = ruta[i];
    const b = ruta[i + 1];
    if (f <= b.f) {
      const t = SUAVE((f - a.f) / Math.max(1, b.f - a.f));
      return {x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t};
    }
  }
  const u = ruta[ruta.length - 1];
  return {x: u.x, y: u.y};
};

export const Raton: React.FC<{ruta: Punto[]; desde: number; hasta: number; tam?: number; agarrado?: [number, number][]}> = ({ruta, desde, hasta, tam = 64, agarrado = []}) => {
  const f = useCurrentFrame();
  const clics = ruta.filter((p) => p.clic);
  const son = <Sonidos ev={clics.flatMap((p) => [{f: p.f, src: 'audio/pizza/tic.wav', vol: 0.9, rate: 1}, {f: p.f, src: 'audio/pizza/clic.wav', vol: 0.35, rate: 1.3}])} />;
  if (f < desde || f >= hasta) return son;
  const {x, y} = enRuta(f, ruta);
  const aparece = SALE(acota((f - desde) / 8));
  const c = clics.find((p) => f >= p.f && f < p.f + 14);
  const hundido = c ? 1 - 0.18 * Math.max(0, 1 - Math.abs(f - c.f - 2) / 4) : 1;
  const lleva = agarrado.some(([a, b]) => f >= a && f < b);
  return (
    <>
      {son}
      {c && (
        <div
          style={{
            position: 'absolute',
            left: c.x - 60,
            top: c.y - 60,
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: `6px solid ${C.cobalto}`,
            transform: `scale(${0.3 + 1.1 * acota((f - c.f) / 12)})`,
            opacity: 1 - acota((f - c.f) / 12),
          }}
        />
      )}
      <svg
        width={tam}
        height={tam}
        viewBox="0 0 24 24"
        style={{
          position: 'absolute',
          left: x - tam * 0.2,
          top: y - tam * 0.1,
          transformOrigin: '20% 10%',
          transform: `scale(${aparece * hundido * (lleva ? 0.92 : 1)})`,
          filter: 'drop-shadow(4px 6px 0 rgba(10, 8, 6, 0.35))',
          overflow: 'visible',
        }}
      >
        {lleva ? (
          <path d="M8 11V5.5a1.5 1.5 0 0 1 3 0V10m0-1.5V4a1.5 1.5 0 0 1 3 0v5m0-1a1.5 1.5 0 0 1 3 0v2m0 0a1.5 1.5 0 0 1 3 0V15a7 7 0 0 1-7 7h-1.5a6 6 0 0 1-5-2.7L4 15.5a1.6 1.6 0 0 1 2.6-1.9L8 15V11" fill={C.blanco} stroke={C.tinta} strokeWidth={1.4} strokeLinejoin="round" />
        ) : (
          <path d="M5 2.5l14 9.2-6.3 1.2 3.6 6.8-2.9 1.5-3.6-6.8L5 19.2z" fill={C.blanco} stroke={C.tinta} strokeWidth={1.4} strokeLinejoin="round" />
        )}
      </svg>
    </>
  );
};

// Posición de algo que el ratón coge: quieto en `origen` hasta `coge`, pegado al ratón hasta `suelta`
// (con un poco de giro de arrastre) y luego encaja en `destino` con su escala.
export const arrastre = (
  f: number,
  ruta: Punto[],
  coge: number,
  suelta: number,
  origen: {x: number; y: number; s?: number; r?: number},
  destino: {x: number; y: number; s?: number; r?: number},
  agarre: {x: number; y: number},
) => {
  if (f < coge) return {x: origen.x, y: origen.y, s: origen.s ?? 1, r: origen.r ?? 0, alza: 0};
  if (f < suelta) {
    const p = enRuta(f, ruta);
    const q = enRuta(f - 2, ruta);
    const alza = SALE(acota((f - coge) / 6));
    return {x: p.x - agarre.x, y: p.y - agarre.y, s: (origen.s ?? 1) * (1 + 0.05 * alza), r: (origen.r ?? 0) * (1 - alza) + Math.max(-8, Math.min(8, (p.x - q.x) * 0.4)), alza};
  }
  const p = enRuta(suelta, ruta);
  const t = SALE(acota((f - suelta) / 10));
  const x0 = p.x - agarre.x;
  const y0 = p.y - agarre.y;
  return {x: x0 + (destino.x - x0) * t, y: y0 + (destino.y - y0) * t, s: (origen.s ?? 1) + ((destino.s ?? 1) - (origen.s ?? 1)) * t, r: (destino.r ?? 0) * t, alza: 1 - t};
};
