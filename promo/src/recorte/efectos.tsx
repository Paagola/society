import React from 'react';
import {Img, staticFile, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';
import {acota, azar, entrada, salida, Sonidos, usePaso} from './motor';

// Efectos explicativos de los vídeos de papel. Todo entra como un recorte (desliza, cae o se estampa),
// se mueve a saltos y suena a papel. Tamaños grandes: una idea por pantalla.

type Lado = 'izquierda' | 'derecha' | 'arriba' | 'abajo';
const lejos = (d: Lado, VW: number, VH: number) =>
  d === 'izquierda' ? [-VW - 200, 0] : d === 'derecha' ? [VW + 200, 0] : d === 'arriba' ? [0, -VH - 200] : [0, VH + 200];

// Tira de papel rasgado con texto: entra deslizando y, si se le da `fuera`, se va por el mismo lado.
export const Tira: React.FC<{
  en: number;
  fuera?: number;
  x: number;
  y: number;
  rot?: number;
  fondo?: string;
  mascara?: number;
  desde?: Lado;
  children: React.ReactNode;
}> = ({en, fuera, x, y, rot = 0, fondo = C.tinta, mascara = 0, desde = 'izquierda', children}) => {
  const f = usePaso();
  const {width: VW, height: VH} = useVideoConfig();
  const son = <Sonidos ev={[{f: en, src: 'audio/pizza/lanzar.wav', vol: 0.45, rate: 1}, {f: en + 8, src: 'audio/pizza/pegar-2.wav', vol: 0.9, rate: 0.8}, ...(fuera === undefined ? [] : [{f: fuera, src: 'audio/pizza/lanzar.wav', vol: 0.4, rate: 0.9}])]} />;
  if (f < en) return son;
  const [lx, ly] = lejos(desde, VW, VH);
  const k = (1 - salida(acota((f - en) / 8))) + (fuera === undefined ? 0 : entrada(acota((f - fuera) / 8)));
  const url = `url(${staticFile(`papel/mascaras/tira-${mascara}.png`)})`;
  return (
    <>
      {son}
      <div style={{position: 'absolute', left: x, top: y, transform: `translate(${k * lx}px, ${k * ly}px) rotate(${rot - k * 6}deg)`, filter: 'drop-shadow(7px 10px 0 rgba(20, 14, 8, 0.35))'}}>
        <div style={{position: 'relative', background: fondo, padding: '22px 56px 12px', WebkitMaskImage: url, maskImage: url, WebkitMaskSize: '100% 100%', maskSize: '100% 100%', whiteSpace: 'nowrap'}}>
          {children}
          <Img src={staticFile(`papel/mascaras/tira-${mascara}-fibra.png`)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
        </div>
      </div>
    </>
  );
};

export const palo = (tam: number, color: string = C.papel): React.CSSProperties => ({fontFamily: FONT.display, fontSize: tam, color, textTransform: 'uppercase', lineHeight: 1.08});
export const cursiva = (tam: number, color: string = C.papel): React.CSSProperties => ({fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 900, fontSize: tam, color, lineHeight: 1.1});

// Titular en dos tiras: una palabra en palo seco y el remate en cursiva (la fórmula de la identidad).
export const Titulo: React.FC<{en: number; fuera?: number; x: number; y: number; palo: string; cursiva: string; tam?: number; fondo1?: string; fondo2?: string; desde?: Lado}> = ({
  en,
  fuera,
  x,
  y,
  palo: p,
  cursiva: c,
  tam = 150,
  fondo1 = C.tinta,
  fondo2 = C.cobalto,
  desde = 'izquierda',
}) => (
  <>
    <Tira en={en} fuera={fuera} x={x} y={y} rot={-2} fondo={fondo1} mascara={0} desde={desde}>
      <span style={palo(tam)}>{p}</span>
    </Tira>
    <Tira en={en + 6} fuera={fuera === undefined ? undefined : fuera + 3} x={x + 60} y={y + tam * 1.12 + 40} rot={1.5} fondo={fondo2} mascara={1} desde={desde}>
      <span style={cursiva(tam * 0.88)}>{c}</span>
    </Tira>
  </>
);

// Recurso gráfico de la identidad (flecha, círculo, destellos, pegatina…) que se estampa o entra deslizando.
export const Recurso: React.FC<{nombre: string; en: number; fuera?: number; x: number; y: number; w: number; rot?: number; entra?: 'golpe' | Lado; volteo?: boolean}> = ({
  nombre,
  en,
  fuera,
  x,
  y,
  w,
  rot = 0,
  entra = 'golpe',
  volteo = false,
}) => {
  const f = usePaso();
  const {width: VW, height: VH} = useVideoConfig();
  const son = <Sonidos ev={[{f: en + (entra === 'golpe' ? 4 : 8), src: 'audio/pizza/pegar-3.wav', vol: 0.8, rate: 1.1}, ...(fuera === undefined ? [] : [{f: fuera, src: 'audio/pizza/lanzar.wav', vol: 0.3, rate: 1.2}])]} />;
  if (f < en) return son;
  const va = fuera === undefined ? 0 : entrada(acota((f - fuera) / 8));
  if (va >= 1) return son;
  let t = '';
  if (entra === 'golpe') {
    const e = salida(acota((f - en) / 6));
    t = `scale(${1 + (1 - e) * 0.8}) rotate(${(1 - e) * -14}deg)`;
  } else {
    const e = 1 - salida(acota((f - en) / 8));
    const [lx, ly] = lejos(entra, VW, VH);
    t = `translate(${e * lx}px, ${e * ly}px) rotate(${e * 8}deg)`;
  }
  const alto = 1 - salida(acota((f - en) / 6)) + va;
  return (
    <>
      {son}
      <Img
        src={staticFile(`papel/recursos/${nombre}.png`)}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: w,
          transform: `${t} translateY(${va * VH}px) rotate(${rot}deg)${volteo ? ' scaleX(-1)' : ''}`,
          filter: `drop-shadow(${5 + 8 * alto}px ${7 + 10 * alto}px 0 rgba(20, 14, 8, 0.3))`,
        }}
      />
    </>
  );
};

// Pegatina numerada para los pasos: estallido mostaza con la cifra en tinta.
export const Pegatina: React.FC<{n: number | string; en: number; fuera?: number; x: number; y: number; tam?: number}> = ({n, en, fuera, x, y, tam = 200}) => {
  const f = usePaso();
  if (f < en) return <Recurso nombre="explosion" en={en} fuera={fuera} x={x} y={y} w={tam} />;
  const e = salida(acota((f - en) / 6));
  const va = fuera === undefined ? 0 : entrada(acota((f - fuera) / 8));
  return (
    <>
      <Recurso nombre="explosion" en={en} fuera={fuera} x={x} y={y} w={tam} rot={-8} />
      {va < 1 && (
        <div
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: tam,
            height: tam * 0.97,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...palo(tam * 0.55, C.tinta),
            transform: `scale(${1 + (1 - e) * 0.8}) rotate(${-8 + (1 - e) * -14}deg) translateY(${va * 2200}px)`,
          }}
        >
          {n}
        </div>
      )}
    </>
  );
};

// Recortitos que saltan de un punto y caen fuera del cuadro (al publicar, al pegar el logo…).
export const Motas: React.FC<{en: number; x: number; y: number; n?: number}> = ({en, x, y, n = 22}) => {
  const f = usePaso();
  const dt = f - en;
  if (dt < 0 || dt > 60) return null;
  const colores = [C.cobalto, C.papel, C.tinta, C.cobalto, C.papel, C.mostaza];
  return (
    <>
      {Array.from({length: n}, (_, i) => {
        const a = -Math.PI * (0.05 + 0.9 * azar(i, 31));
        const v = 18 + 24 * azar(i, 32);
        const s = 12 + 18 * azar(i, 33);
        const pts = Array.from({length: 6}, (_, j) => {
          const t = (j / 6) * Math.PI * 2 + azar(i * 7 + j, 34);
          const r = 0.55 + 0.45 * azar(i * 7 + j, 35);
          return `${50 + 50 * r * Math.cos(t)}% ${50 + 50 * r * Math.sin(t)}%`;
        }).join(', ');
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x + v * Math.cos(a) * dt,
              top: y + v * Math.sin(a) * dt + 1.1 * dt * dt,
              width: s,
              height: s * 0.8,
              background: colores[i % colores.length],
              clipPath: `polygon(${pts})`,
              transform: `rotate(${(azar(i, 36) - 0.5) * 50 * dt}deg)`,
              filter: 'drop-shadow(3px 4px 0 rgba(20, 14, 8, 0.3))',
            }}
          />
        );
      })}
    </>
  );
};
