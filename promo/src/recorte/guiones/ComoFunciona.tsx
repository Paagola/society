import React from 'react';
import {LogoSociety} from '../../marca/Logo';
import {C} from '../../theme';
import {Motas, Pegatina, Recurso, Titulo} from '../efectos';
import {Escena, Fondo, Lienzo} from '../motor';
import {TransHoja, TransTiras} from '../transiciones';

// «Así funciona Society» (27/09/2026), 29 s en vertical. Explica la app en tres pasos con sus pantallas
// reales (society-identidad-editorial/pantallas 3, 4 y 5) entre el problema y el resultado:
// terraza vacía → 1 cuéntale qué hay hoy → 2 elige el estilo → 3 publica → terraza llena → logo.
// Escenas cortadas con skills/papel-stopmotion (terraza, pantalla-3, pantalla-4, pantalla-5).

// Zonas de la terraza (0-1, medidas en promo/out/papel/terraza/rejilla.png): la mano con el móvil y los
// clientes de cada mesa; el camarero (x ≈ 0,55) queda fuera para que la calle vacía lo tenga.
const MANO: [number, number, number, number] = [0.58, 0.74, 1, 1];
const MESA_IZQ: [number, number, number, number] = [0, 0.57, 0.5, 0.87];
const MESA_DER: [number, number, number, number] = [0.6, 0.57, 1, 0.87];
const NUNCA = 1e9;

// cambios de escena (mitad de cada transición)
const T1 = 202;
const T2 = 331;
const T3 = 460;
const T4 = 600;
const T5 = 768;
export const DURACION_COMO_FUNCIONA = 870;

const Paso: React.FC<{n: number; desde: number; hasta: number; palo: string; cursiva: string; pantalla: string; children?: React.ReactNode}> = ({n, desde, hasta, palo, cursiva, pantalla, children}) => (
  <>
    <Fondo desde={desde} hasta={hasta} />
    <Pegatina n={n} en={desde + 6} x={40} y={90} tam={190} />
    <Titulo en={desde + 10} x={236} y={100} palo={palo} cursiva={cursiva} tam={130} />
    <Escena id={pantalla} x={241} y={560} escala={1} en={desde + 20} dur={56} orden="y" desde="lados" hasta={hasta} />
    {children}
  </>
);

export const ComoFunciona: React.FC = () => (
  <Lienzo>
    {/* 1 · El problema: la calle se monta, pero la terraza está vacía */}
    <Escena id="terraza" en={4} dur={140} hasta={T1 + 2} grupos={[{zona: MANO, en: NUNCA}, {zona: MESA_IZQ, en: NUNCA}, {zona: MESA_DER, en: NUNCA}]} />
    <Titulo en={150} fuera={T1 - 12} x={60} y={1420} palo="Terraza" cursiva="vacía." />
    <TransTiras en={T1 - 11} />

    {/* 2 · Los tres pasos, con las pantallas de la app */}
    <Paso n={1} desde={T1} hasta={T2 + 2} palo="Cuéntale" cursiva="qué hay hoy" pantalla="pantalla-3">
      <Recurso nombre="flecha" en={T1 + 84} x={-20} y={1010} w={300} rot={12} />
    </Paso>
    <TransHoja en={T2 - 12} />
    <Paso n={2} desde={T2} hasta={T3 + 2} palo="Elige" cursiva="el estilo" pantalla="pantalla-4">
      <Recurso nombre="circulo" en={T2 + 84} x={500} y={960} w={360} rot={-78} />
    </Paso>
    <TransTiras en={T3 - 11} colores={[C.tinta, C.cobalto, C.papel, C.cobalto, C.tinta, C.cobalto]} />
    <Paso n={3} desde={T3} hasta={T4 + 2} palo="Publica" cursiva="con un toque" pantalla="pantalla-5">
      <Recurso nombre="destellos" en={T3 + 84} x={800} y={1560} w={200} />
      <Motas en={T3 + 90} x={700} y={1720} />
    </Paso>
    <TransHoja en={T4 - 12} color={C.tinta} />

    {/* 3 · El resultado: la calle ya está; sube el móvil y llegan los clientes */}
    <Escena
      id="terraza"
      en={-1000}
      aparece={T4}
      hasta={T5 + 2}
      grupos={[
        {zona: MANO, en: T4 + 6, dur: 20, desde: 'abajo', orden: 'base'},
        {zona: MESA_IZQ, en: T4 + 36, dur: 60, desde: 'izquierda', orden: 'base'},
        {zona: MESA_DER, en: T4 + 42, dur: 60, desde: 'derecha', orden: 'base'},
      ]}
    />
    <Titulo en={T4 + 108} fuera={T5 - 12} x={40} y={1500} palo="Terraza" cursiva="llena." tam={140} />
    <TransHoja en={T5 - 12} color={C.tinta} />

    {/* 4 · Logo oficial sobre tinta */}
    <Fondo tipo="tinta" desde={T5} />
    <LogoSociety en={T5 + 6} lema={T5 + 34} cy={860} paso={2} />
    <Motas en={T5 + 26} x={540} y={900} n={16} />
  </Lienzo>
);
