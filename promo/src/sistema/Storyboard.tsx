import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {InkDefs, Logo} from '../components';
import {C, FONT} from '../theme';
import {Titular} from '../anuncio/piezas';
import type {Linea} from '../anuncio/piezas';
import {Camara, Cursor, Estado, Grano, Mundo} from './lienzo';

// Storyboard del anuncio «El sistema»: un fotograma por toma, todo en el mismo plano.
type Toma = {cam: [number, number, number]; estado: Estado; cursor?: [number, number, number]; titular?: Linea[]; corazones?: boolean; cierre?: boolean};

const TODO: Estado['on'] = {antes: 1, contar: 1, society: 1, salidas: 1, cuando: 1, despues: 1};

export const TOMAS: Toma[] = [
  // 1 · Gancho: la foto del móvil publicada tal cual, 3 me gusta
  {cam: [560, 830, 1.05], estado: {on: {antes: 1}, sinTitulos: true}, titular: [{t: '¿ASÍ', s: 190}, {t: 'subes', it: true, s: 170}, {t: 'TUS PLATOS?', s: 150}]},
  // 2 · La cámara se abre: el lienzo, y la foto entra en el sistema
  {cam: [1080, 780, 0.6], estado: {on: {antes: 1, contar: 0.55}, pulso: {a: 0.55}, texto: ''}, cursor: [480, 690, 0]},
  // 3 · Qué contar: se escribe la frase
  {cam: [1600, 600, 1.3], estado: {on: {antes: 0.4, contar: 1}, texto: 'Pizza de jamón y rúcu', chips: [false, false, false]}},
  // 4 · Formatos y «Crear»
  {cam: [1600, 880, 1.0], estado: {on: {antes: 0.4, contar: 1}, chips: [true, true, true]}, cursor: [560, 1265, 0.45]},
  // 5 · Society: la foto se convierte y se cumplen los pasos de agencia
  {cam: [1080, 2000, 0.72], estado: {on: {antes: 0.35, contar: 0.45, society: 1}, pulso: {b: 0.85}, escaneo: 0.56, pasos: 2}},
  // 6 · Salen el post, el reel y la historia
  {cam: [1080, 3010, 0.5], estado: {on: {society: 0.7, salidas: 1}, pulso: {c: 0.62}}},
  // 7 · Cuándo: se programa para el viernes a las 20:30
  {cam: [560, 4420, 1.0], estado: {on: {salidas: 0.5, cuando: 1}, pulso: {d: 0.7}}, cursor: [690, 660, 0.35]},
  // 8 · Después: la misma pizza, publicada a su hora
  {cam: [1600, 4420, 1.05], estado: {on: {cuando: 0.5, despues: 1}, pulso: {e: 0.5}}, corazones: true},
  // 9 · El sistema entero funcionando
  {cam: [1080, 2500, 0.382], estado: {on: TODO, pulso: {a: 0.2, b: 0.5, c: 0.35, d: 0.8, e: 0.4}}},
  // 10 · Cierre
  {cam: [1080, 2500, 0.382], estado: {on: TODO}, cierre: true},
];

const Corazones: React.FC = () => (
  <>
    {[
      [300, 1180, 90, 1],
      [420, 980, 70, 0.8],
      [250, 820, 56, 0.55],
      [520, 760, 48, 0.4],
      [380, 600, 40, 0.28],
    ].map(([x, y, s, o], i) => (
      <svg key={i} width={s} height={s} viewBox="0 0 24 24" style={{position: 'absolute', left: x, top: y, opacity: o}} fill="#ff3b5c">
        <path d="M12 20.5S3.5 15.4 3.5 9.3C3.5 6.4 5.6 4.5 8 4.5c1.7 0 3.1.9 4 2.3.9-1.4 2.3-2.3 4-2.3 2.4 0 4.5 1.9 4.5 4.8 0 6.1-8.5 11.2-8.5 11.2z" />
      </svg>
    ))}
  </>
);

export const SistemaStoryboard: React.FC = () => {
  const f = useCurrentFrame();
  const t = TOMAS[Math.min(f, TOMAS.length - 1)];
  const [x, y, s] = t.cam;
  return (
    <AbsoluteFill style={{background: '#0c0c0e'}}>
      <InkDefs />
      <AbsoluteFill style={{filter: t.cierre ? 'brightness(0.3) blur(2px)' : undefined}}>
        <Camara x={x} y={y} s={s}>
          <Mundo {...t.estado} />
        </Camara>
      </AbsoluteFill>
      {t.titular && (
        <>
          <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(12,12,14,.92) 0%, rgba(12,12,14,.6) 18%, rgba(12,12,14,0) 30%)'}} />
          <Titular lineas={t.titular} y={40} en={-60} />
        </>
      )}
      {t.corazones && <Corazones />}
      {t.cursor && <Cursor x={t.cursor[0]} y={t.cursor[1]} clic={t.cursor[2]} />}
      {t.cierre && (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <Titular lineas={[{t: 'PUBLICA', s: 250}, {t: 'menos,', it: true, s: 215}, {t: 'LLENA MÁS.', s: 202}]} y={430} x={110} en={-60} />
          <div style={{position: 'absolute', top: 1260, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Logo size={200} at={-60} color={C.papel} />
            <div style={{fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 800, fontSize: 70, color: C.papel, marginTop: 24}}>tu agencia con IA</div>
          </div>
        </AbsoluteFill>
      )}
      <Grano />
    </AbsoluteFill>
  );
};
