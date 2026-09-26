import React from 'react';
import {AbsoluteFill} from 'remotion';
import {F, K} from './estilo';

// Piezas de interfaz de la versión startup: fondo con retícula, móvil, píldoras e iconos de línea.

// Fondo oscuro (o azul) con una retícula muy suave y un halo que da profundidad.
export const Fondo: React.FC<{color?: string; halo?: string; className?: string}> = ({color = K.negro, halo, className}) => (
  <AbsoluteFill className={className} style={{background: color}}>
    <AbsoluteFill
      style={{
        backgroundImage: `linear-gradient(${K.linea} 1px, transparent 1px), linear-gradient(90deg, ${K.linea} 1px, transparent 1px)`,
        backgroundSize: '120px 120px',
        backgroundPosition: '-1px -1px',
        maskImage: 'radial-gradient(ellipse 90% 70% at 50% 45%, #000 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 45%, #000 30%, transparent 100%)',
      }}
    />
    {halo && <AbsoluteFill style={{background: `radial-gradient(ellipse 70% 45% at 50% 62%, ${halo}, transparent 70%)`}} />}
  </AbsoluteFill>
);

// Móvil: marco negro de aluminio, pantalla con esquinas de iPhone e isla dinámica.
export const MOVIL = {w: 560, h: 1150, borde: 16, radio: 92};
export const Movil: React.FC<{children: React.ReactNode; className?: string; style?: React.CSSProperties}> = ({children, className, style}) => (
  <div
    className={className}
    style={{
      position: 'absolute',
      width: MOVIL.w,
      height: MOVIL.h,
      borderRadius: MOVIL.radio,
      background: '#0D0D10',
      boxShadow: '0 0 0 2px rgba(255,255,255,0.16), 0 0 0 9px #1B1B20, 0 0 0 11px rgba(255,255,255,0.10), 0 60px 120px rgba(0,0,0,0.55)',
      ...style,
    }}
  >
    <div
      className="pantalla"
      style={{position: 'absolute', inset: MOVIL.borde, borderRadius: MOVIL.radio - MOVIL.borde, overflow: 'hidden', background: '#000'}}
    >
      {children}
    </div>
    <div style={{position: 'absolute', top: 34, left: '50%', width: 150, height: 44, marginLeft: -75, borderRadius: 22, background: '#000'}} />
  </div>
);

// Barra de estado de iOS (hora e iconos), en claro u oscuro.
export const Estado: React.FC<{oscuro?: boolean}> = ({oscuro = true}) => {
  const c = oscuro ? '#FFFFFF' : '#0B0B0D';
  return (
    <div style={{position: 'absolute', top: 30, left: 44, right: 40, display: 'flex', justifyContent: 'space-between', fontFamily: F.sans, fontWeight: 650, fontSize: 30, color: c}}>
      <span>21:34</span>
      <span style={{display: 'flex', gap: 10, alignItems: 'center'}}>
        <svg width={34} height={22} viewBox="0 0 34 22">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 9} y={16 - i * 5} width={6} height={6 + i * 5} rx={1.5} fill={c} />
          ))}
        </svg>
        <svg width={50} height={24} viewBox="0 0 50 24">
          <rect x={1} y={1} width={42} height={22} rx={6} fill="none" stroke={c} strokeOpacity={0.5} strokeWidth={2} />
          <rect x={4} y={4} width={30} height={16} rx={3.5} fill={c} />
          <rect x={45} y={8} width={3} height={8} rx={1.5} fill={c} fillOpacity={0.5} />
        </svg>
      </span>
    </div>
  );
};

// Icono de línea (trazo de 2 px en una caja de 24).
export const Icono: React.FC<{d: string; s?: number; color?: string; className?: string; ancho?: number}> = ({d, s = 48, color = '#FFFFFF', className, ancho = 2}) => (
  <svg className={className} width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={ancho} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export const ICONO = {
  compartir: 'M12 3v12 M7 8l5-5 5 5 M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6',
  corazon: 'M12 20s-7-4.4-9-8.8C1.7 8.1 3.7 5 7 5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.3 0 5.3 3.1 4 6.2C19 15.6 12 20 12 20z',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 11v6 M12 7.5v.5',
  papelera: 'M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13 M10 11v6 M14 11v6',
  atras: 'M15 5l-7 7 7 7',
  enviar: 'M21 3L10 14 M21 3l-7 18-4-7-7-4z',
  comentario: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z',
  check: 'M5 12.5l4.5 4.5L19 7',
};

// Píldora de estado (pasos del proceso): borde fino, y rellena con check cuando está hecha.
export const Pildora: React.FC<{texto: string; className?: string}> = ({texto, className}) => (
  <div
    className={className}
    style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      height: 96,
      padding: '0 36px 0 30px',
      borderRadius: 48,
      border: '2px solid rgba(255,255,255,0.35)',
      background: 'rgba(255,255,255,0.08)',
      fontFamily: F.sans,
      fontWeight: 650,
      fontSize: 44,
      letterSpacing: '-0.02em',
      color: K.blanco,
      whiteSpace: 'nowrap',
    }}
  >
    <div className="relleno" style={{position: 'absolute', inset: -2, borderRadius: 48, background: K.blanco, transformOrigin: '0% 50%', transform: 'scaleX(0)'}} />
    <div className="marca" style={{position: 'relative', width: 44, height: 44, borderRadius: 22, border: '3px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Icono d={ICONO.check} s={32} color={K.azul} ancho={3.2} className="tic" />
    </div>
    <span className="nombre" style={{position: 'relative'}}>{texto}</span>
  </div>
);
