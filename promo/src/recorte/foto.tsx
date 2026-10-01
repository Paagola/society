import React, {useMemo} from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {acota, azar, PASO, salida, Sonidos} from './motor';

// Foto de papel en pocos trozos grandes: cualquier imagen se parte al vuelo en n trozos (Voronoi con los
// bordes interiores rasgados) que entran volando a saltos y encajan; después la foto no se queda quieta
// (zoom lento, deriva y un leve balanceo). No necesita cortar nada antes ni crea piezas en disco: los
// trozos son la misma imagen recortada con clip-path, así que monta rápido y pesa poco.

type Pt = [number, number];
type Trozo = {pts: Pt[]; cx: number; cy: number; clip: string; d: string};

const corta = (pol: {v: Pt; t: number}[], a: number, b: number, c: number, etiqueta: number) => {
  // conserva la parte con a*x + b*y <= c; la arista nueva sobre la recta lleva `etiqueta`
  const out: {v: Pt; t: number}[] = [];
  const n = pol.length;
  const dentro = (p: Pt) => a * p[0] + b * p[1] <= c;
  const cruce = (p: Pt, q: Pt): Pt => {
    const dp = a * p[0] + b * p[1] - c;
    const dq = a * q[0] + b * q[1] - c;
    const t = dp / (dp - dq);
    return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  };
  for (let i = 0; i < n; i++) {
    const cur = pol[i];
    const sig = pol[(i + 1) % n];
    const ci = dentro(cur.v);
    const si = dentro(sig.v);
    if (ci && si) out.push(cur);
    else if (ci && !si) {
      out.push(cur);
      out.push({v: cruce(cur.v, sig.v), t: etiqueta});
    } else if (!ci && si) out.push({v: cruce(cur.v, sig.v), t: cur.t});
  }
  return out;
};

const rasga = (A: Pt, B: Pt, i: number, j: number, amp: number): Pt[] => {
  // mismo borde visto desde los dos trozos: orden canónico y ruido que depende solo de la pareja (i, j)
  const inv = A[0] > B[0] || (A[0] === B[0] && A[1] > B[1]);
  const [P, Q] = inv ? [B, A] : [A, B];
  const L = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
  const nx = -(Q[1] - P[1]) / (L || 1);
  const ny = (Q[0] - P[0]) / (L || 1);
  const k = Math.max(2, Math.round(L / 14));
  const s = Math.min(i, j) * 131 + Math.max(i, j) * 17;
  const pts: Pt[] = [];
  for (let m = 1; m < k; m++) {
    const t = m / k;
    const d = amp * (0.9 * Math.sin(Math.PI * t) * (azar(s, 1) - 0.5) * 2 + 0.45 * Math.sin(3 * Math.PI * t + azar(s, 2) * 6) * Math.sin(Math.PI * t) + 0.35 * (azar(s * 7 + m, 3) - 0.5));
    pts.push([P[0] + (Q[0] - P[0]) * t + nx * d, P[1] + (Q[1] - P[1]) * t + ny * d]);
  }
  return inv ? pts.reverse() : pts;
};

export const trocea = (w: number, h: number, n: number, semilla: number): Trozo[] => {
  const cols = Math.max(1, Math.round(Math.sqrt((n * w) / h)));
  const filas = Math.max(1, Math.ceil(n / cols));
  const sem: Pt[] = [];
  for (let r = 0; r < filas; r++)
    for (let c = 0; c < cols && sem.length < n; c++)
      sem.push([((c + 0.2 + 0.6 * azar(r * 9 + c, semilla + 1)) * w) / cols, ((r + 0.2 + 0.6 * azar(r * 9 + c, semilla + 2)) * h) / filas]);
  const amp = Math.min(w, h) * 0.018;
  return sem.map((s, i) => {
    let pol: {v: Pt; t: number}[] = [
      {v: [0, 0], t: -1},
      {v: [w, 0], t: -1},
      {v: [w, h], t: -1},
      {v: [0, h], t: -1},
    ];
    sem.forEach((o, j) => {
      if (j === i) return;
      const a = o[0] - s[0];
      const b = o[1] - s[1];
      const c = (o[0] * o[0] + o[1] * o[1] - s[0] * s[0] - s[1] * s[1]) / 2;
      pol = corta(pol, a, b, c, j);
    });
    const pts: Pt[] = [];
    pol.forEach((p, k) => {
      pts.push(p.v);
      if (p.t >= 0) pts.push(...rasga(p.v, pol[(k + 1) % pol.length].v, i, p.t, amp));
    });
    const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length;
    const cy = pts.reduce((a, p) => a + p[1], 0) / pts.length;
    return {
      pts,
      cx,
      cy,
      clip: `polygon(${pts.map((p) => `${p[0].toFixed(1)}px ${p[1].toFixed(1)}px`).join(', ')})`,
      d: `M${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('L')}Z`,
    };
  });
};

export type Vida = 'zoom' | 'deriva' | 'quieta';

export const FotoRasgada: React.FC<{
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  en: number; // primer trozo
  n?: number; // trozos (5-9 = grandes)
  dur?: number; // tiempo en que entran todos
  semilla?: number;
  costuras?: boolean; // deja las juntas de papel a la vista (fibra clara); si no, al encajar la foto se une
  vida?: Vida;
  radio?: number;
  rot?: number;
  sombra?: boolean;
  posicion?: string; // object-position
  hasta?: number;
  sonido?: boolean;
  lejos?: number; // distancia desde la que llegan los trozos
}> = ({src, x, y, w, h, en, n = 7, dur = 18, semilla = 1, costuras = true, vida = 'zoom', radio = 0, rot = 0, sombra = true, posicion = 'center', hasta = Infinity, sonido = true, lejos = 900}) => {
  const fr = useCurrentFrame();
  const f = Math.floor(fr / PASO) * PASO;
  const trozos = useMemo(() => trocea(w, h, n, semilla), [w, h, n, semilla]);
  const V = 10;
  const t0 = trozos.map((_, i) => Math.round(en + (dur * i) / Math.max(1, trozos.length - 1)));
  const encajada = en + dur + V;
  const ev = useMemo(
    () => (sonido ? t0.map((t, i) => ({f: t + V, src: `audio/pizza/pegar-${(i % 3) + 1}.wav`, vol: 0.55, rate: 0.9 + 0.2 * azar(i, semilla + 5)})) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [en, dur, n, semilla, sonido],
  );
  if (fr >= hasta) return null;
  // vida: continua (no a saltos), para que la foto respire como en un vídeo de producto
  const tv = Math.max(0, fr - encajada);
  const zoom = vida === 'quieta' ? 1 : 1 + Math.min(0.1, tv * 0.0007);
  const dx = vida === 'deriva' ? Math.sin(tv / 55) * w * 0.02 : vida === 'zoom' ? Math.sin(tv / 70) * w * 0.008 : 0;
  const dy = vida === 'deriva' ? Math.cos(tv / 65) * h * 0.015 : 0;
  const balanceo = vida === 'quieta' ? 0 : Math.sin(tv / 50 + semilla) * 0.5;
  const flota = vida === 'quieta' ? 0 : Math.sin(tv / 40 + semilla) * 5;
  const imagen = (
    <Img
      src={staticFile(src)}
      style={{position: 'absolute', left: 0, top: 0, width: w, height: h, objectFit: 'cover', objectPosition: posicion, transform: `translate(${dx}px, ${dy}px) scale(${zoom})`}}
    />
  );
  const unida = !costuras && f >= encajada;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: w,
          height: h,
          transform: `rotate(${rot + balanceo}deg) translateY(${flota}px)`,
          filter: sombra && f >= encajada ? 'drop-shadow(10px 14px 0 rgba(10, 8, 6, 0.35))' : undefined,
        }}
      >
        {unida ? (
          <div style={{position: 'absolute', inset: 0, borderRadius: radio, overflow: 'hidden'}}>{imagen}</div>
        ) : (
          trozos.map((tz, i) => {
            if (f < t0[i]) return null;
            const e = salida(acota((f - t0[i]) / V));
            const vuelo = 1 - e;
            const ang = Math.atan2(tz.cy - h / 2, tz.cx - w / 2) + (azar(i, semilla + 3) - 0.5) * 0.8;
            const dist = lejos * (0.8 + 0.4 * azar(i, semilla + 4));
            const giro = (azar(i, semilla + 6) - 0.5) * 30;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transformOrigin: `${tz.cx}px ${tz.cy}px`,
                  transform: `translate(${Math.cos(ang) * dist * vuelo}px, ${Math.sin(ang) * dist * vuelo}px) rotate(${giro * vuelo}deg) scale(${1 + 0.06 * vuelo})`,
                  filter: vuelo > 0.001 ? `drop-shadow(${6 + 12 * vuelo}px ${8 + 16 * vuelo}px 0 rgba(10, 8, 6, 0.35))` : undefined,
                }}
              >
                <div style={{position: 'absolute', inset: 0, clipPath: tz.clip, borderRadius: radio, overflow: 'hidden'}}>
                  {imagen}
                  {costuras && (
                    <svg width={w} height={h} style={{position: 'absolute', left: 0, top: 0}}>
                      <path d={tz.d} fill="none" stroke="#EFE8DA" strokeWidth={7} strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
      <Sonidos ev={ev} />
    </>
  );
};
