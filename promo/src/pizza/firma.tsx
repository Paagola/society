import React from 'react';
import {LogoSociety} from '../marca/Logo';

// Firma: «Society» con cada letra recortada de una página distinta del propio anuncio (el papel crudo,
// la foto del móvil, la lámina del carrusel, la mostaza, la persiana, el cobalto y la carta). La marca
// está hecha de las mismas piezas que ha ido enseñando. Cada letra se pega en su golpe.
// Desde el 27/09/2026 es el logotipo oficial de Society: vive en marca/Logo.tsx.
export const Firma: React.FC<{en: number; lema: number}> = ({en, lema}) => <LogoSociety en={en} lema={lema} />;
