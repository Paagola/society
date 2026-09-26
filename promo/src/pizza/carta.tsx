import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, EASE, FONT, tween} from '../theme';

// La carta en el móvil del cliente, antes de reservar: los platos están, pero sin una sola foto.
// Es la foto que el hostelero tiró en el plano anterior. Platos del material real de Da Tonino, sin
// precios (no están verificados) y sin nombre del local: es la carta de cualquiera.

const GRIS = '#8E8A82';
const HUECO = '#E9E6DF';

const SinFoto: React.FC<{s: number}> = ({s}) => (
  <div
    style={{
      width: s,
      height: s,
      borderRadius: 20,
      background: HUECO,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    }}
  >
    <svg width={s * 0.42} height={s * 0.34} viewBox="0 0 48 38" fill="none" stroke="#B4AFA5" strokeWidth={3.2} strokeLinejoin="round" strokeLinecap="round">
      <rect x={2} y={2} width={44} height={34} rx={6} />
      <circle cx={33} cy={12} r={4} />
      <path d="M4 32 L17 18 L27 28 L33 22 L44 33" />
    </svg>
    <div style={{fontFamily: FONT.ui, fontWeight: 700, fontSize: 21, color: '#A7A298'}}>sin foto</div>
  </div>
);

const Plato: React.FC<{nombre: string; nota: string}> = ({nombre, nota}) => (
  <div style={{display: 'flex', gap: 24, alignItems: 'center', padding: '22px 0', borderBottom: '2px solid #EFECE6'}}>
    <SinFoto s={150} />
    <div>
      <div style={{fontFamily: FONT.ui, fontWeight: 800, fontSize: 35, lineHeight: 1.08, color: C.tinta, letterSpacing: '-0.015em'}}>{nombre}</div>
      <div style={{fontFamily: FONT.ui, fontWeight: 500, fontSize: 25, lineHeight: 1.25, color: GRIS, marginTop: 8}}>{nota}</div>
    </div>
  </div>
);

const Seccion: React.FC<{t: string}> = ({t}) => (
  <div style={{fontFamily: FONT.ui, fontWeight: 800, fontSize: 24, letterSpacing: '0.16em', color: GRIS, marginTop: 30}}>{t}</div>
);

export const PantallaCarta: React.FC<{w: number; h: number; scroll: [number, number]}> = ({w, h, scroll}) => {
  const f = useCurrentFrame();
  const dy = tween(f, scroll[0], scroll[1], [0, -190], EASE);
  const cabecera = 262;
  return (
    <div style={{width: w, height: h, background: '#FFFFFF', position: 'relative', overflow: 'hidden'}}>
      {/* la lista se desliza por debajo de la cabecera, que se queda fija como en cualquier app */}
      <div style={{position: 'absolute', left: 0, right: 0, top: cabecera, bottom: 0, overflow: 'hidden'}}>
        <div style={{padding: '0 34px', transform: `translateY(${dy}px)`}}>
          <Seccion t="PIZZAS" />
          <Plato nombre="Prosciutto e rucola" nota="Tomate, mozzarella, jamón crudo y rúcula" />
          <Seccion t="PASTA" />
          <Plato nombre="Rigatoni" nota="En salsa rosa" />
          <Seccion t="ARROCES" />
          <Plato nombre="Paella de marisco" nota="Gambas, mejillones y almejas" />
          <div style={{height: 260}} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: cabecera, padding: '0 34px', background: '#FFFFFF'}}>
        {/* barra de estado */}
        <div style={{height: 78, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', fontFamily: FONT.ui, fontWeight: 700, fontSize: 27, color: C.tinta, paddingBottom: 6}}>
          <span style={{marginLeft: 22}}>21:30</span>
          <span style={{marginRight: 18, letterSpacing: '0.1em'}}>● ● ▮</span>
        </div>
        <div style={{fontFamily: FONT.ui, fontWeight: 800, fontSize: 64, color: C.tinta, letterSpacing: '-0.03em', marginTop: 26}}>‹ Carta</div>
        {/* pestañas */}
        <div style={{display: 'flex', gap: 26, marginTop: 20, fontFamily: FONT.ui, fontSize: 27, color: GRIS, fontWeight: 600, borderBottom: '2px solid #EFECE6'}}>
          <span style={{paddingBottom: 14}}>Info</span>
          <span style={{paddingBottom: 12, color: C.tinta, fontWeight: 800, borderBottom: `5px solid ${C.tinta}`}}>Carta</span>
          <span style={{paddingBottom: 14}}>Opiniones</span>
          <span style={{paddingBottom: 14}}>Fotos (0)</span>
        </div>
      </div>
      {/* botón fijo de reservar */}
      <div style={{position: 'absolute', left: 34, right: 34, bottom: 40, height: 104, borderRadius: 52, background: C.tinta, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.ui, fontWeight: 800, fontSize: 36}}>
        Reservar mesa
      </div>
    </div>
  );
};
