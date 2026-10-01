import React from 'react';
import {AbsoluteFill} from 'remotion';
import {InkDefs, Paper} from '../components';
import {LogoSociety} from './Logo';

// Logotipo oficial sobre tinta, montado del todo a partir del fotograma 40 (para sacar la imagen fija).
export const LogoOficial: React.FC = () => (
  <AbsoluteFill>
    <Paper dark />
    <InkDefs />
    <LogoSociety en={0} lema={20} cy={470} />
  </AbsoluteFill>
);
