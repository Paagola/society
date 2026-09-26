import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Paper} from '../components';
import {C} from '../theme';
import {PapelArrugado} from './papel3d';

// Banco de pruebas del papel: 0-30 se arruga, 30-40 bola, 40-70 se abre con las marcas.
export const PapelPrueba: React.FC = () => {
  const f = useCurrentFrame();
  const p = f < 30 ? f / 30 : f < 40 ? 1 : Math.max(0, 1 - (f - 40) / 30);
  const marcas = f < 40 ? 0 : 1;
  return (
    <AbsoluteFill style={{background: f < 40 ? C.tinta : C.cobalto}}>
      {f < 40 ? <Paper dark /> : <Paper tint={C.cobalto} />}
      <PapelArrugado w={760} h={570} e={{p, marcas, y: 1150, rz: -4 + 30 * p, rx: 25 * p, ry: -20 * p}} />
    </AbsoluteFill>
  );
};
