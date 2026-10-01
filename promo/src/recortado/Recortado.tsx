import React from 'react';
import {AbsoluteFill, Audio, Img, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT, jitter} from '../theme';
import datos from './guion.json';

// «La terraza que se llena» (27/09/2026). Una sola imagen de papel generada (GPT Image 2.5), cortada en
// piezas por produccion/society-papel-recortado/scripts/recortar.py y montada aquí en stop-motion:
// cada pieza entra desde fuera del cuadro, se posa con su sombra dura y a veces se recoloca un pelo.
// La historia va en el orden de montaje: calle y terraza vacías → sube el móvil → publica → la terraza
// se llena → lema. Tiempos, direcciones y sonido salen del mismo guion (montaje.py).

type Pieza = (typeof datos.piezas)[number];

const EV = datos.eventos;
const PASO = datos.paso;
const B = datos.burbuja;

const acota = (t: number) => Math.min(1, Math.max(0, t));
const salida = (t: number) => 1 - Math.pow(1 - t, 3);
const entrada = (t: number) => t * t * t;
// salida con un pequeño pasado de frenada, para el salto de la burbuja
const rebote = (t: number) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2);

const src = (id: number) => staticFile(`recortado/piezas/${String(id).padStart(3, '0')}.png`);
const SOMBRA_VUELO = (k: number) => `drop-shadow(${4 + 10 * k}px ${6 + 14 * k}px 0 rgba(20, 14, 8, 0.3))`;

const PiezaPapel: React.FC<{p: Pieza; fs: number}> = ({p, fs}) => {
  if (fs < p.t0) return null;
  if (p.id === B.id && fs >= EV.pop) return null;
  const e = salida(acota((fs - p.t0) / p.v));
  const vuelo = 1 - e;
  let x = p.x + vuelo * p.dx;
  let y = p.y + vuelo * p.dy;
  let r = vuelo * p.r;
  const posada = p.t0 + p.v;
  if (p.aj && fs >= posada + PASO && fs < posada + 3 * PASO) {
    x += p.aj[0];
    y += p.aj[1];
    r += p.aj[2];
  }
  // el pulgar publica: el móvil se hunde un poco y vuelve
  if ((p.g === 'mano' || p.g === 'burbuja') && fs >= EV.toque && fs < EV.toque + PASO) y += 9;
  return (
    <Img
      src={src(p.id)}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: p.w,
        height: p.h,
        transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${1 + 0.04 * vuelo})`,
        filter: vuelo > 0.001 ? SOMBRA_VUELO(vuelo) : undefined,
      }}
    />
  );
};

// La burbuja de la pantalla salta, crece y se queda arriba con el nombre: es la firma.
const Burbuja: React.FC<{fs: number}> = ({fs}) => {
  if (fs < EV.pop) return null;
  const t = acota((fs - EV.pop) / EV.pop_dur);
  const e = rebote(t);
  const k = B.k0 + (1 - B.k0) * e;
  const c0 = {x: B.x0 + (B.w * B.k0) / 2, y: B.y0 + (B.h * B.k0) / 2};
  const c1 = {x: B.x1 + B.w / 2, y: B.y1 + B.h / 2};
  const cx = c0.x + (c1.x - c0.x) * salida(t);
  const cy = c0.y + (c1.y - c0.y) * salida(t) - Math.sin(Math.PI * t) * 90;
  const rot = -10 * (1 - t) + B.rot * t;
  return (
    <div
      style={{
        position: 'absolute',
        left: cx - B.w / 2,
        top: cy - B.h / 2,
        width: B.w,
        height: B.h,
        transform: `scale(${k}) rotate(${rot}deg)`,
        filter: `drop-shadow(${6 + 8 * (1 - t)}px ${9 + 10 * (1 - t)}px 0 rgba(20, 14, 8, 0.32))`,
      }}
    >
      <Img src={staticFile('recortado/burbuja.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '40%',
          transform: 'translateY(-50%)',
          textAlign: 'center',
          fontFamily: FONT.serif,
          fontStyle: 'italic',
          fontWeight: 900,
          fontSize: 118,
          color: C.cobalto,
          letterSpacing: -2,
          opacity: t > 0.3 ? 1 : 0,
        }}
      >
        Society
      </div>
    </div>
  );
};

// Recortitos que saltan con la burbuja y caen fuera del cuadro.
const Motas: React.FC<{fs: number}> = ({fs}) => {
  const dt = fs - EV.pop;
  if (dt < 0 || dt > 60) return null;
  return (
    <>
      {datos.motas.map((m, i) => {
        const x = m.x + m.vx * dt;
        const y = m.y + m.vy * dt + 1.1 * dt * dt;
        if (y > datos.H + 60) return null;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: m.s,
              height: m.s * 0.8,
              background: m.c,
              clipPath: m.clip,
              transform: `rotate(${m.vr * dt}deg)`,
              filter: 'drop-shadow(3px 4px 0 rgba(20, 14, 8, 0.3))',
            }}
          />
        );
      })}
    </>
  );
};

// Tira de papel rasgado con texto: entra desde la izquierda y, si hace falta, se va por donde vino.
const Tira: React.FC<{
  fs: number;
  mascara: number;
  fondo: string;
  x: number;
  y: number;
  rot: number;
  en: number;
  fuera?: number;
  children: React.ReactNode;
}> = ({fs, mascara, fondo, x, y, rot, en, fuera, children}) => {
  if (fs < en) return null;
  const dentro = salida(acota((fs - en) / 8));
  const sale = fuera === undefined ? 0 : entrada(acota((fs - fuera) / 8));
  const dx = -(1 - dentro) * 1300 - sale * 1400;
  const url = `url(${staticFile(`recortado/mascaras/tira-${mascara}.png`)})`;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translateX(${dx}px) rotate(${rot + (1 - dentro) * -6}deg)`,
        filter: 'drop-shadow(7px 10px 0 rgba(20, 14, 8, 0.35))',
      }}
    >
      <div
        style={{
          position: 'relative',
          background: fondo,
          padding: '22px 56px 12px',
          WebkitMaskImage: url,
          maskImage: url,
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
        <Img
          src={staticFile(`recortado/mascaras/tira-${mascara}-fibra.png`)}
          style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}
        />
      </div>
    </div>
  );
};

const palo: React.CSSProperties = {fontFamily: FONT.display, color: C.papel, textTransform: 'uppercase', lineHeight: 1.08};
const cursiva: React.CSSProperties = {fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 900, color: C.papel, lineHeight: 1.1};

export const DURACION_RECORTADO = datos.duracion;

export const Recortado: React.FC = () => {
  const f = useCurrentFrame();
  const fs = Math.floor(f / PASO) * PASO;
  // cámara de stop-motion: el cuadro se mueve un pelo y la luz parpadea entre toma y toma
  const jx = jitter(fs, 1, 0.9, PASO);
  const jy = jitter(fs, 2, 0.9, PASO);
  const luz = 1 + jitter(fs, 3, 0.012, PASO);
  return (
    <AbsoluteFill style={{backgroundColor: C.papel, overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `translate(${jx}px, ${jy}px) scale(1.006)`, filter: `brightness(${luz})`}}>
        <Img src={staticFile('recortado/fondo.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
        {datos.piezas.map((p) => (
          <PiezaPapel key={p.id} p={p} fs={fs} />
        ))}
        <Tira fs={fs} mascara={0} fondo={C.tinta} x={60} y={1400} rot={-2} en={EV.titular} fuera={EV.titular_fuera}>
          <span style={{...palo, fontSize: 190}}>Terraza</span>
        </Tira>
        <Tira fs={fs} mascara={1} fondo={C.cobalto} x={200} y={1590} rot={1.5} en={EV.titular + 6} fuera={EV.titular_fuera + 3}>
          <span style={{...cursiva, fontSize: 170}}>vacía.</span>
        </Tira>
        <Motas fs={fs} />
        <Burbuja fs={fs} />
        <Tira fs={fs} mascara={2} fondo={C.tinta} x={110} y={500} rot={-1.5} en={EV.lema}>
          <span style={{...palo, fontSize: 116}}>Publica </span>
          <span style={{...cursiva, fontSize: 108}}>menos,</span>
        </Tira>
        <Tira fs={fs} mascara={3} fondo={C.cobalto} x={200} y={650} rot={1.5} en={EV.lema + 8}>
          <span style={{...palo, fontSize: 130}}>Llena más.</span>
        </Tira>
      </AbsoluteFill>
      <Audio src={staticFile('recortado/foley.wav')} />
    </AbsoluteFill>
  );
};
