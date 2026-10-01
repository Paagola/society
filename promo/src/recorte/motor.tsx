import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {InkDefs} from '../components';
import {C, jitter} from '../theme';
import {ESCENAS} from './escenas';

// Motor de los vídeos de papel en stop-motion (skill papel-stopmotion). Una imagen cortada por
// skills/papel-stopmotion/scripts/recortar.py se monta sola con <Escena id="...">: cada pieza entra desde
// fuera del cuadro, se posa con sombra dura y a veces se recoloca un pelo; suena a papel al posarse.
// Orden natural: hojas de fondo (arriba → abajo), luego los objetos de lejos a cerca, cada uno de abajo
// arriba. Los `grupos` apartan piezas por zona (coordenadas 0-1 de la imagen) con su propio momento.

export const PASO = 2; // 15 imágenes por segundo
export const usePaso = () => Math.floor(useCurrentFrame() / PASO) * PASO;

export type Pieza = {i: number; x: number; y: number; w: number; h: number; z: number; t: 'h' | 'f'; o: number; cx: number; cy: number; b: number; a: number};
export type EscenaDatos = {id: string; W: number; H: number; modo: 'escena' | 'recorte'; piezas: Pieza[]};
export type Desde = 'arriba' | 'abajo' | 'izquierda' | 'derecha' | 'lados' | 'cerca';
export type Orden = 'natural' | 'base' | 'x' | 'y' | 'azar';
export type Zona = [number, number, number, number]; // x0, y0, x1, y1 en 0-1 de la imagen
export type Tramo = {en: number; dur?: number; desde?: Desde; orden?: Orden};
export type Grupo = Tramo & {zona: Zona; oculta?: number; hojas?: boolean}; // hojas: también los trozos de fondo
export type Salida = {en: number; dur?: number; desde?: Desde};

export const azar = (n: number, s = 0) => {
  const r = Math.sin(n * 12.9898 + s * 78.233) * 43758.5453;
  return r - Math.floor(r);
};
export const acota = (t: number) => Math.min(1, Math.max(0, t));
export const salida = (t: number) => 1 - Math.pow(1 - t, 3);
export const entrada = (t: number) => t * t * t;
export const SOMBRA_VUELO = (k: number) => `drop-shadow(${4 + 10 * k}px ${6 + 14 * k}px 0 rgba(20, 14, 8, 0.3))`;

type Plan = {
  p: Pieza;
  t0: number;
  v: number;
  dx: number;
  dy: number;
  r: number;
  aj: [number, number, number] | null;
  oculta: number;
  ts: number;
  sx: number;
  sy: number;
  sr: number;
};

const borde = (d: Desde, cx: number, cy: number, VW: number, VH: number): Exclude<Desde, 'lados' | 'cerca'> => {
  if (d === 'lados') return cx < VW / 2 ? 'izquierda' : 'derecha';
  if (d !== 'cerca') return d;
  const m = Math.min(cx, VW - cx, cy, VH - cy);
  return m === cy ? 'arriba' : m === VH - cy ? 'abajo' : m === cx ? 'izquierda' : 'derecha';
};

const fuera = (d: Exclude<Desde, 'lados' | 'cerca'>, X: number, Y: number, W: number, H: number, VW: number, VH: number, m: number, lat: number) =>
  d === 'arriba' ? [lat, -(Y + H) - m] : d === 'abajo' ? [lat, VH - Y + m] : d === 'izquierda' ? [-(X + W) - m, lat * 0.6] : [VW - X + m, lat * 0.6];

type EscenaProps = {
  id: string;
  x?: number; // posición y escala de la imagen en el cuadro
  y?: number;
  escala?: number;
  en: number; // momento del montaje de las piezas que no están en ningún grupo; negativo = ya montada
  dur?: number;
  desde?: Desde;
  orden?: Orden;
  grupos?: Grupo[]; // el primero que contiene el centro de la pieza se la queda
  sale?: Salida; // desmontaje: las piezas se van volando, las de delante primero
  aparece?: number; // no se pinta antes (una escena que ya está montada cuando la destapa una transición)
  hasta?: number; // deja de pintarse (cuando una transición la tapa)
  semilla?: number;
  sonido?: boolean;
};

const planifica = (e: EscenaDatos, pr: EscenaProps, VW: number, VH: number): Plan[] => {
  const {x = 0, y = 0, escala: k = 1, semilla: s = 0, grupos = []} = pr;
  const tramos: (Tramo & {oculta: number; lista: Pieza[]})[] = [
    {en: pr.en, dur: pr.dur ?? 90, desde: pr.desde ?? 'cerca', orden: pr.orden ?? 'natural', oculta: Infinity, lista: []},
    ...grupos.map((g) => ({...g, oculta: g.oculta ?? Infinity, lista: [] as Pieza[]})),
  ];
  for (const p of e.piezas) {
    const nx = p.cx / e.W;
    const ny = p.cy / e.H;
    // los grupos apartan figuras; el fondo se monta siempre con el resto (salvo `hojas: true`)
    const gi = grupos.findIndex((g) => (p.t === 'f' || g.hojas) && nx >= g.zona[0] && nx <= g.zona[2] && ny >= g.zona[1] && ny <= g.zona[3]);
    tramos[gi + 1].lista.push(p);
  }
  const out: Plan[] = [];
  for (const tr of tramos) {
    const clave = (p: Pieza) => {
      const j = azar(p.i, s + 9);
      switch (tr.orden) {
        case 'base':
          return -p.b + j * 50;
        case 'x':
          return p.cx + j * 40;
        case 'y':
          return p.cy + j * 40;
        case 'azar':
          return j;
        default: // hojas de arriba abajo, luego objetos de lejos a cerca y cada uno de abajo arriba
          return p.z * 100000 + (p.t === 'h' ? j * 1000 : -p.b + j * 50);
      }
    };
    const lista = [...tr.lista].sort((a, b) => clave(a) - clave(b));
    const n = lista.length;
    lista.forEach((p, i) => {
      const X = x + k * p.x;
      const Y = y + k * p.y;
      const W = k * p.w;
      const H = k * p.h;
      const d = borde(tr.desde ?? 'cerca', X + W / 2, Y + H / 2, VW, VH);
      const [dx, dy] = fuera(d, X, Y, W, H, VW, VH, 40 + 90 * azar(p.i, s + 1), (azar(p.i, s + 2) - 0.5) * 140);
      const hoja = p.t === 'h' || p.a > 60000;
      const r = (azar(p.i, s + 3) < 0.5 ? -1 : 1) * (hoja ? 2 + 3 * azar(p.i, s + 4) : 4 + 10 * azar(p.i, s + 4));
      const aj: [number, number, number] | null =
        azar(p.i, s + 5) < 0.45 ? [(azar(p.i, s + 6) - 0.5) * 4, (azar(p.i, s + 7) - 0.5) * 4, (azar(p.i, s + 8) - 0.5) * 1.6] : null;
      out.push({p, t0: Math.round(tr.en + (n > 1 ? ((tr.dur ?? 90) * i) / (n - 1) : 0)), v: hoja ? 12 : 10, dx, dy, r, aj, oculta: tr.oculta, ts: Infinity, sx: 0, sy: 0, sr: 0});
    });
  }
  if (pr.sale) {
    const orden = [...out].sort((a, b) => b.p.z - a.p.z || b.t0 - a.t0);
    const n = orden.length;
    orden.forEach((q, i) => {
      const X = x + k * q.p.x;
      const Y = y + k * q.p.y;
      const W = k * q.p.w;
      const H = k * q.p.h;
      const d = borde(pr.sale!.desde ?? 'cerca', X + W / 2, Y + H / 2, VW, VH);
      [q.sx, q.sy] = fuera(d, X, Y, W, H, VW, VH, 60, (azar(q.p.i, s + 11) - 0.5) * 160);
      q.ts = Math.round(pr.sale!.en + (n > 1 ? ((pr.sale!.dur ?? 30) * i) / (n - 1) : 0));
      q.sr = (azar(q.p.i, s + 12) - 0.5) * 24;
    });
  }
  return out.sort((a, b) => a.p.z - b.p.z || a.t0 - b.t0 || a.p.i - b.p.i);
};

// Sonido de papel: un pegado por paso en el que se posan piezas (más fuerte si son muchas o grandes),
// un soplo cuando entra una hoja grande y otro cada pocas piezas que se van.
type Evento = {f: number; src: string; vol: number; rate: number};
const eventos = (plan: Plan[], hasta: number): Evento[] => {
  const posa = new Map<number, Plan[]>();
  const ev: Evento[] = [];
  for (const q of plan) {
    const t = q.t0 + q.v;
    if (t >= 0 && t < Math.min(hasta, q.oculta)) posa.set(t, [...(posa.get(t) ?? []), q]);
    if (q.p.t === 'h' && q.t0 >= 0 && q.t0 < hasta) ev.push({f: q.t0, src: 'audio/pizza/lanzar.wav', vol: 0.15, rate: 1 + 0.2 * azar(q.p.i, 21)});
  }
  [...posa.entries()]
    .sort((a, b) => a[0] - b[0])
    .forEach(([t, qs], k) => {
      const area = qs.reduce((a, q) => a + q.p.a, 0);
      ev.push({f: t, src: `audio/pizza/pegar-${(k % 3) + 1}.wav`, vol: Math.min(0.9, 0.2 + 0.06 * qs.length + (0.3 * Math.sqrt(area)) / 400), rate: 0.85 + 0.3 * azar(t, 22)});
      if (Math.max(...qs.map((q) => q.p.a)) > 30000) ev.push({f: t, src: 'audio/pizza/caer.wav', vol: 0.3, rate: 0.8});
    });
  plan
    .filter((q) => q.ts < hasta)
    .sort((a, b) => a.ts - b.ts)
    .forEach((q, i) => {
      if (i % 5 === 0) ev.push({f: q.ts, src: 'audio/pizza/lanzar.wav', vol: 0.2, rate: 1.1 + 0.2 * azar(i, 23)});
    });
  return ev;
};

export const Sonidos: React.FC<{ev: Evento[]}> = ({ev}) => (
  <>
    {ev.map((e, i) => (
      <Sequence key={i} from={e.f} durationInFrames={30} layout="none">
        <Audio src={staticFile(e.src)} volume={e.vol} playbackRate={e.rate} />
      </Sequence>
    ))}
  </>
);

export const Escena: React.FC<EscenaProps> = (pr) => {
  const f = usePaso();
  const {width: VW, height: VH} = useVideoConfig();
  const e = ESCENAS[pr.id];
  if (!e) throw new Error(`Escena «${pr.id}» sin cortar: python skills/papel-stopmotion/scripts/recortar.py IMAGEN --id ${pr.id}`);
  const clave = JSON.stringify(pr);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const plan = useMemo(() => planifica(e, pr, VW, VH), [clave, VW, VH]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ev = useMemo(() => (pr.sonido === false ? [] : eventos(plan, pr.hasta ?? Infinity)), [plan]);
  const k = pr.escala ?? 1;
  const x0 = pr.x ?? 0;
  const y0 = pr.y ?? 0;
  const pintar = (pr.hasta === undefined || f < pr.hasta) && (pr.aparece === undefined || f >= pr.aparece);
  return (
    <>
      {pintar &&
        plan.map((q) => {
          if (f < q.t0 || f >= q.oculta) return null;
          const u = entrada(acota((f - q.ts) / 8));
          if (u >= 1) return null;
          const vuelo = 1 - salida(acota((f - q.t0) / q.v));
          let X = x0 + k * q.p.x + vuelo * q.dx + u * q.sx;
          let Y = y0 + k * q.p.y + vuelo * q.dy + u * q.sy;
          let r = vuelo * q.r + u * q.sr;
          const posada = q.t0 + q.v;
          if (q.aj && f >= posada + PASO && f < posada + 3 * PASO) {
            X += q.aj[0];
            Y += q.aj[1];
            r += q.aj[2];
          }
          const alto = Math.max(vuelo, u);
          return (
            <Img
              key={q.p.i}
              src={staticFile(`papel/${pr.id}/${String(q.p.i).padStart(3, '0')}.png`)}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: k * q.p.w,
                height: k * q.p.h,
                transform: `translate(${X}px, ${Y}px) rotate(${r}deg) scale(${1 + 0.04 * alto})`,
                filter: alto > 0.001 ? SOMBRA_VUELO(alto) : undefined,
              }}
            />
          );
        })}
      <Sonidos ev={ev} />
    </>
  );
};

// Hoja de fondo a pantalla completa (papel crudo, cobalto o tinta) entre dos momentos.
export const Fondo: React.FC<{tipo?: 'papel' | 'cobalto' | 'tinta'; desde?: number; hasta?: number}> = ({tipo = 'papel', desde = -Infinity, hasta = Infinity}) => {
  const f = usePaso();
  if (f < desde || f >= hasta) return null;
  return <Img src={staticFile(`papel/fondos/${tipo}.jpg`)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />;
};

// Lienzo de todos los vídeos de papel. Con `temblor` el cuadro se mueve un pelo y la luz parpadea entre
// toma y toma; va apagado por defecto: en un vídeo entero marea (Víctor, 28/09/2026).
export const Lienzo: React.FC<{children: React.ReactNode; temblor?: boolean}> = ({children, temblor = false}) => {
  const f = usePaso();
  return (
    <AbsoluteFill style={{backgroundColor: C.papel, overflow: 'hidden'}}>
      <InkDefs />
      <AbsoluteFill
        style={
          temblor
            ? {transform: `translate(${jitter(f, 1, 0.9, PASO)}px, ${jitter(f, 2, 0.9, PASO)}px) scale(1.006)`, filter: `brightness(${1 + jitter(f, 3, 0.012, PASO)})`}
            : undefined
        }
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
