import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {InkDefs, Logo} from '../components';
import {C, FONT} from '../theme';
import {Camara3D, centro, Estado, Tablero, TABLERO, Titular} from './tablero';

// Storyboard de «El sistema» en papel: una pose por toma, todas en el mismo espacio 3D.
type Toma = {cam: [number, number, number, number, number]; e?: Estado; cierre?: boolean};

const [ax, ay] = centro('antes');
const [bx, by] = centro('contar');
const [sx, sy] = centro('society');
const [px, py] = centro('piezas');
const [cx, cy] = centro('cuando');
const [dx, dy] = centro('despues');

export const TOMAS_PAPEL: Toma[] = [
  {cam: [ax, ay, 0.64, 6, -1], e: {arrancado: 0}},
  {cam: [(ax + bx) / 2, ay + 60, 0.36, 30, -7], e: {texto: '', pildoras: 0, arrancado: 0}},
  {cam: [bx, by, 0.64, 5, 1], e: {texto: 'Pizza de jamón y rúcu', pildoras: 1, arrancado: 0}},
  {cam: [sx, sy, 0.64, 7, -1], e: {arrancado: 0.78, pasos: 3}},
  {cam: [px, py, 0.62, 6, 1], e: {arrancado: 1}},
  {cam: [cx, cy, 0.64, 5, -1], e: {arrancado: 1}},
  {cam: [dx, dy, 0.64, 6, 1], e: {arrancado: 1}},
  {cam: [TABLERO.w / 2, TABLERO.h / 2 + 250, 0.19, 32, -9], e: {arrancado: 1}},
  {cam: [TABLERO.w / 2, TABLERO.h / 2 + 250, 0.19, 32, -9], e: {arrancado: 1}, cierre: true},
];

export const PapelStoryboard: React.FC = () => {
  const f = useCurrentFrame();
  const t = TOMAS_PAPEL[Math.min(f, TOMAS_PAPEL.length - 1)];
  const [x, y, s, incl, giro] = t.cam;
  return (
    <AbsoluteFill style={{background: '#1a1917'}}>
      <InkDefs />
      <AbsoluteFill style={{filter: t.cierre ? 'brightness(0.32) saturate(0.8)' : undefined}}>
        <Camara3D x={x} y={y} s={s} incl={incl} giro={giro}>
          <Tablero e={t.e} />
        </Camara3D>
      </AbsoluteFill>
      {t.cierre && (
        <AbsoluteFill>
          <Titular lineas={[{t: 'PUBLICA', s: 250}, {t: 'menos,', it: true, s: 215}, {t: 'LLENA MÁS.', s: 202}]} x={110} y={430} color={C.papel} />
          <div style={{position: 'absolute', top: 1270, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Logo size={200} at={-60} color={C.papel} />
            <div style={{fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 800, fontSize: 70, color: C.papel, marginTop: 24}}>tu agencia con IA</div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
