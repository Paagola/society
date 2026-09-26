import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, staticFile} from 'remotion';
import {C, FONT} from '../theme';

// El sistema entero en un solo plano: un lienzo oscuro con nodos conectados que se encienden.
// Coordenadas de mundo a doble resolución (2160 de ancho). La cámara decide qué se ve.

export const MUNDO = {w: 2160, h: 5000};
export const FONDO = '#0c0c0e';
export const BRILLO = '79,107,255'; // cobalto aclarado para el halo

export type Nodos = 'antes' | 'contar' | 'society' | 'salidas' | 'cuando' | 'despues';
export type Estado = {
  on: Partial<Record<Nodos, number>>;
  pulso?: Partial<Record<'a' | 'b' | 'c' | 'd' | 'e', number>>;
  texto?: string;
  chips?: boolean[];
  escaneo?: number; // 0 = foto del móvil, 1 = foto de estudio
  pasos?: number; // pasos de agencia completados (0-4)
  dia?: boolean;
  megusta?: number;
  sinTitulos?: boolean;
};

export const it = (t: string) => (
  <span style={{fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 800, letterSpacing: '-0.03em'}}>{t}</span>
);

const Nodo: React.FC<{x: number; y: number; w: number; h: number; titulo: React.ReactNode; on?: number; sinTitulo?: boolean; children?: React.ReactNode}> = ({
  x,
  y,
  w,
  h,
  titulo,
  on = 1,
  sinTitulo,
  children,
}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w}}>
    <div style={{height: 150, fontFamily: FONT.display, fontSize: 128, lineHeight: 1, color: C.papel, opacity: sinTitulo ? 0 : 0.28 + 0.72 * on, whiteSpace: 'nowrap'}}>{titulo}</div>
    <div
      style={{
        position: 'relative',
        width: w,
        height: h,
        borderRadius: 44,
        overflow: 'hidden',
        background: '#17171b',
        border: `5px solid rgba(${BRILLO},${0.22 + 0.78 * on})`,
        boxShadow: `0 0 ${90 * on}px rgba(${BRILLO},${0.6 * on}), 0 0 ${240 * on}px rgba(36,64,224,${0.42 * on}), inset 0 0 ${70 * on}px rgba(${BRILLO},${0.16 * on})`,
      }}
    >
      <div style={{position: 'absolute', inset: 0, opacity: 0.3 + 0.7 * on}}>{children}</div>
    </div>
  </div>
);

const Conexion: React.FC<{d: string; on?: number; pulso?: number}> = ({d, on = 0, pulso}) => (
  <svg width={MUNDO.w} height={MUNDO.h} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
    <path d={d} fill="none" stroke={`rgba(${BRILLO},${0.14 + 0.5 * on})`} strokeWidth={9} strokeLinecap="round" />
    {pulso !== undefined && on > 0 && (
      <path
        d={d}
        fill="none"
        stroke="#9fb0ff"
        strokeWidth={16}
        strokeLinecap="round"
        pathLength={1000}
        strokeDasharray="160 840"
        strokeDashoffset={-pulso * 1000 + 160}
        style={{filter: `drop-shadow(0 0 22px rgba(${BRILLO},1))`}}
      />
    )}
  </svg>
);

const Corazon: React.FC<{s: number; lleno?: boolean}> = ({s, lleno}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={lleno ? '#ff3b5c' : 'none'} stroke={lleno ? '#ff3b5c' : C.papel} strokeWidth={2.1} strokeLinejoin="round">
    <path d="M12 20.5S3.5 15.4 3.5 9.3C3.5 6.4 5.6 4.5 8 4.5c1.7 0 3.1.9 4 2.3.9-1.4 2.3-2.3 4-2.3 2.4 0 4.5 1.9 4.5 4.8 0 6.1-8.5 11.2-8.5 11.2z" />
  </svg>
);

// Publicación en un perfil (genérica, sin logotipos de ninguna red).
const Publicacion: React.FC<{foto: string; megusta: number; lleno?: boolean; alto: number; pos?: string}> = ({foto, megusta, lleno, alto, pos = '50% 50%'}) => (
  <>
    <div style={{height: 130, display: 'flex', alignItems: 'center', gap: 26, padding: '0 40px'}}>
      <div style={{width: 76, height: 76, borderRadius: 38, overflow: 'hidden', border: `4px solid ${C.papel}`}}>
        <Img src={staticFile('anuncio/foto-movil-pizza.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>
      <div style={{fontFamily: FONT.ui, fontWeight: 700, fontSize: 46, color: C.papel}}>tu_restaurante</div>
    </div>
    <Img src={staticFile(foto)} style={{width: '100%', height: alto, objectFit: 'cover', objectPosition: pos, display: 'block'}} />
    <div style={{height: 150, display: 'flex', alignItems: 'center', gap: 28, padding: '0 40px'}}>
      <Corazon s={70} lleno={lleno} />
      <div style={{fontFamily: FONT.ui, fontWeight: 800, fontSize: 56, color: C.papel}}>{megusta.toLocaleString('es-ES')} me gusta</div>
    </div>
  </>
);

const Chip: React.FC<{t: string; on?: boolean}> = ({t, on}) => (
  <div
    style={{
      padding: '20px 42px',
      borderRadius: 60,
      fontFamily: FONT.ui,
      fontWeight: 700,
      fontSize: 50,
      color: on ? C.papel : 'rgba(236,232,220,.7)',
      background: on ? C.cobalto : 'transparent',
      border: `4px solid ${on ? '#5b74ff' : 'rgba(236,232,220,.3)'}`,
    }}
  >
    {t}
  </div>
);

export const Mundo: React.FC<Estado> = ({
  on,
  pulso = {},
  texto = 'Pizza de jamón y rúcula, recién salida.',
  chips = [true, true, true],
  escaneo = 1,
  pasos = 4,
  dia = true,
  megusta = 962,
  sinTitulos,
}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: MUNDO.w, height: MUNDO.h, background: FONDO}}>
    <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(236,232,220,.09) 3px, transparent 3.6px)', backgroundSize: '64px 64px'}} />

    {/* Conexiones: el dato viaja de un paso al siguiente */}
    <Conexion d="M 1040 800 L 1120 800" on={on.contar} pulso={pulso.a} />
    <Conexion d="M 560 1300 C 560 1450, 860 1440, 860 1600" on={on.society} pulso={pulso.b} />
    <Conexion d="M 1600 1300 C 1600 1450, 1300 1440, 1300 1600" on={on.society} pulso={pulso.b} />
    <Conexion d="M 1080 2310 C 1080 2440, 400 2450, 400 2620" on={on.salidas} pulso={pulso.c} />
    <Conexion d="M 1080 2310 L 1080 2620" on={on.salidas} pulso={pulso.c} />
    <Conexion d="M 1080 2310 C 1080 2440, 1730 2450, 1730 2620" on={on.salidas} pulso={pulso.c} />
    <Conexion d="M 400 3420 C 400 3660, 560 3700, 560 3940" on={on.cuando} pulso={pulso.d} />
    <Conexion d="M 1040 4370 L 1120 4370" on={on.despues} pulso={pulso.e} />

    {/* Antes: la foto del móvil, publicada tal cual */}
    <Nodo x={80} y={150} w={960} h={1000} titulo="ANTES" on={on.antes ?? 0} sinTitulo={sinTitulos}>
      <Publicacion foto="anuncio/foto-movil-pizza.jpg" megusta={3} alto={720} />
    </Nodo>

    {/* Lo que quieres contar */}
    <Nodo x={1120} y={150} w={960} h={1000} titulo={<>QUÉ {it('contar')}</>} on={on.contar ?? 0} sinTitulo={sinTitulos}>
      <div style={{position: 'absolute', left: 44, right: 44, top: 56, height: 560, borderRadius: 30, border: `4px solid rgba(${BRILLO},.55)`, padding: '38px 42px', fontFamily: FONT.ui, fontWeight: 600, fontSize: 74, lineHeight: 1.16, color: C.papel}}>
        {texto}
        <span style={{display: 'inline-block', width: 7, height: 76, background: '#9fb0ff', marginLeft: 8, verticalAlign: '-12px'}} />
      </div>
      <div style={{position: 'absolute', left: 44, right: 44, top: 666, display: 'flex', gap: 22}}>
        {['Post', 'Reel', 'Historia'].map((t, i) => (
          <Chip key={t} t={t} on={chips[i]} />
        ))}
      </div>
      <div style={{position: 'absolute', left: 44, right: 44, bottom: 50, height: 130, borderRadius: 65, background: C.mostaza, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.ui, fontWeight: 800, fontSize: 60, color: C.tinta}}>
        Crear
      </div>
    </Nodo>

    {/* Society: el criterio de agencia que convierte la foto */}
    <Nodo
      x={330}
      y={1450}
      w={1500}
      h={860}
      titulo={<span style={{fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 900, letterSpacing: '-0.04em'}}>Society</span>}
      on={on.society ?? 0}
      sinTitulo={sinTitulos}
    >
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 760, overflow: 'hidden'}}>
        <Img src={staticFile('anuncio/foto-movil-pizza.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />
        <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 0 ${100 - escaneo * 100}% 0)`}}>
          <Img src={staticFile('anuncio/pizza-estudio.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 62%'}} />
        </div>
        {escaneo > 0 && escaneo < 1 && (
          <div style={{position: 'absolute', left: 0, right: 0, top: `${escaneo * 100}%`, height: 12, marginTop: -6, background: '#c9d2ff', boxShadow: `0 0 50px 16px rgba(${BRILLO},.9)`}} />
        )}
      </div>
      <div style={{position: 'absolute', left: 830, right: 40, top: 110, display: 'flex', flexDirection: 'column', gap: 46}}>
        {['Estrategia', 'Guion', 'Producción', 'Revisión'].map((t, i) => (
          <div key={t} style={{display: 'flex', alignItems: 'center', gap: 26, fontFamily: FONT.ui, fontWeight: 700, fontSize: 66, color: i < pasos ? C.papel : 'rgba(236,232,220,.35)'}}>
            <div style={{width: 70, height: 70, borderRadius: 35, background: i < pasos ? C.cobalto : 'transparent', border: `4px solid ${i < pasos ? '#5b74ff' : 'rgba(236,232,220,.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {i < pasos && (
                <svg width={40} height={34} viewBox="0 0 24 20" fill="none" stroke={C.papel} strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 11 L9 17 L22 3" />
                </svg>
              )}
            </div>
            {t}
          </div>
        ))}
      </div>
    </Nodo>

    {/* Lo que sale: un post, un reel y una historia */}
    <Nodo x={80} y={2460} w={640} h={800} titulo="POST" on={on.salidas ?? 0} sinTitulo={sinTitulos}>
      <Img src={staticFile('anuncio/pizza-estudio.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 62%'}} />
    </Nodo>
    <Nodo x={790} y={2460} w={580} h={1030} titulo="REEL" on={on.salidas ?? 0} sinTitulo={sinTitulos}>
      <OffthreadVideo src={staticFile('video/reel-v6.mp4')} startFrom={105} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </Nodo>
    <Nodo x={1440} y={2460} w={580} h={1030} titulo="HISTORIA" on={on.salidas ?? 0} sinTitulo={sinTitulos}>
      <Img src={staticFile('anuncio/historia-mesa.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      <div style={{position: 'absolute', left: 28, right: 28, top: 28, display: 'flex', gap: 12}}>
        {[1, 0.55, 0].map((v, i) => (
          <div key={i} style={{flex: 1, height: 10, borderRadius: 5, background: 'rgba(236,232,220,.35)', overflow: 'hidden'}}>
            <div style={{width: `${v * 100}%`, height: '100%', background: C.papel}} />
          </div>
        ))}
      </div>
    </Nodo>

    {/* Cuándo: la agenda de la semana */}
    <Nodo x={80} y={3790} w={960} h={1000} titulo={<>{it('cuándo')}</>} on={on.cuando ?? 0} sinTitulo={sinTitulos}>
      <div style={{position: 'absolute', left: 44, right: 44, top: 70, display: 'flex', justifyContent: 'space-between'}}>
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => {
          const v = d === 'V' && dia;
          return (
            <div key={d} style={{width: 112, height: 160, borderRadius: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.display, fontSize: 88, color: v ? C.papel : 'rgba(236,232,220,.5)', background: v ? C.cobalto : 'rgba(236,232,220,.06)', border: v ? '4px solid #5b74ff' : 'none'}}>
              {d}
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 44, right: 44, top: 290, height: 420, borderRadius: 30, overflow: 'hidden', border: `4px solid rgba(${BRILLO},.5)`}}>
        <Img src={staticFile('anuncio/pizza-estudio.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 60%', opacity: dia ? 1 : 0.35}} />
      </div>
      <div style={{position: 'absolute', left: 44, right: 44, bottom: 50, height: 170, borderRadius: 34, background: dia ? C.mostaza : 'rgba(236,232,220,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.ui, fontWeight: 800, fontSize: 80, color: dia ? C.tinta : 'rgba(236,232,220,.5)'}}>
        Viernes · 20:30
      </div>
    </Nodo>

    {/* Después: la misma pizza, publicada a su hora */}
    <Nodo x={1120} y={3790} w={960} h={1000} titulo="DESPUÉS" on={on.despues ?? 0} sinTitulo={sinTitulos}>
      <Publicacion foto="anuncio/pizza-estudio.jpg" megusta={megusta} lleno alto={720} pos="50% 62%" />
    </Nodo>
  </div>
);

// Cámara: el punto (x, y) del mundo queda en el centro de la pantalla, con escala s.
export const Camara: React.FC<{x: number; y: number; s: number; children: React.ReactNode}> = ({x, y, s, children}) => (
  <AbsoluteFill style={{overflow: 'hidden', background: FONDO}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: MUNDO.w, height: MUNDO.h, transformOrigin: '0 0', transform: `translate(${540 - x * s}px, ${960 - y * s}px) scale(${s})`}}>{children}</div>
  </AbsoluteFill>
);

// Grano fino por encima de todo: el guiño al papel de la marca sin copiar su estética.
export const Grano: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0.18}}>
    <Img src={staticFile('img/papel-oscuro.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
  </AbsoluteFill>
);

// Cursor de ratón en pantalla (no escala con la cámara), con onda al hacer clic.
export const Cursor: React.FC<{x: number; y: number; clic?: number}> = ({x, y, clic = 0}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 0, height: 0}}>
    {clic > 0 && (
      <div style={{position: 'absolute', left: -70 * clic, top: -70 * clic, width: 140 * clic, height: 140 * clic, borderRadius: '50%', border: `5px solid rgba(159,176,255,${1 - clic})`}} />
    )}
    <svg width={70} height={88} viewBox="0 0 24 30" style={{position: 'absolute', left: -5, top: -3, filter: 'drop-shadow(0 8px 14px rgba(0,0,0,.6))'}}>
      <path d="M2 2 L2 24 L8 18.5 L12 28 L16 26.3 L12 17 L20 17 Z" fill="#fff" stroke="#111" strokeWidth={1.5} strokeLinejoin="round" />
    </svg>
  </div>
);
