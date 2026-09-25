import React from 'react';
import {AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, EASE_IN, EASE_OUT, FONT, jitter, tween} from './theme';

// ---------------------------------------------------------------------------
// Fondos
// ---------------------------------------------------------------------------

// Papel arrugado: fondo de casi todo.
export const Paper: React.FC<{dark?: boolean; tint?: string}> = ({dark = false, tint}) => (
  <AbsoluteFill style={{background: tint ?? (dark ? C.tinta : C.papel)}}>
    <Img
      src={staticFile(dark ? 'img/papel-oscuro.png' : 'img/papel.png')}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        mixBlendMode: dark ? 'screen' : 'multiply',
        opacity: dark ? 0.35 : tint ? 0.55 : 0.9,
      }}
    />
  </AbsoluteFill>
);

// Filtro SVG de tinta gastada. Se declara una vez y se usa con `filter: url(#tinta)`.
export const InkDefs: React.FC = () => (
  <svg width={0} height={0} style={{position: 'absolute'}}>
    <defs>
      <filter id="tinta" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" seed="7" result="ruido" />
        <feColorMatrix
          in="ruido"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -40 30.5"
          result="huecos"
        />
        <feComposite in="SourceGraphic" in2="huecos" operator="in" result="gastado" />
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" result="onda" />
        <feDisplacementMap in="gastado" in2="onda" scale="3" />
      </filter>
    </defs>
  </svg>
);

// ---------------------------------------------------------------------------
// Tipografía
// ---------------------------------------------------------------------------

// Línea que sube desde detrás de una máscara.
export const Reveal: React.FC<{
  at: number;
  dur?: number;
  out?: number;
  from?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({at, dur = 16, out, from = 110, children, style}) => {
  const f = useCurrentFrame();
  const y = tween(f, at, at + dur, [from, 0], EASE_OUT) + (out === undefined ? 0 : tween(f, out, out + 12, [0, -150]));
  const o = out === undefined ? 1 : 1 - tween(f, out + 6, out + 12);
  return (
    <div style={{overflow: 'hidden', ...style}}>
      <div style={{transform: `translateY(${y}%)`, opacity: o}}>{children}</div>
    </div>
  );
};

export type Line = {t: string; it?: boolean; scale?: number};

// Titular de la marca: mayúsculas condensadas y una sola palabra en serif cursiva.
export const Headline: React.FC<{
  lines: Line[];
  size: number;
  at: number;
  stagger?: number;
  out?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
}> = ({lines, size, at, stagger = 5, out, color = C.tinta, align = 'left', style}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center', ...style}}>
    {lines.map((l, i) => {
      const s = size * (l.scale ?? 1);
      return (
        <Reveal
          key={i}
          at={at + i * stagger}
          out={out === undefined ? undefined : out + i * 2}
          style={{
            // Hueco arriba para tildes y abajo para descendentes, compensado con margen.
            paddingTop: s * 0.16,
            marginTop: (i === 0 ? 0 : l.it ? -s * 0.1 : -s * 0.06) - s * 0.16,
            paddingBottom: l.it ? s * 0.06 : 0,
            paddingRight: l.it ? s * 0.08 : 0,
          }}
        >
          <div
            style={
              l.it
                ? {
                    fontFamily: FONT.serif,
                    fontStyle: 'italic',
                    fontWeight: 800,
                    fontSize: s * 0.86,
                    lineHeight: 1.02,
                    letterSpacing: '-0.035em',
                    whiteSpace: 'nowrap',
                    color,
                    filter: 'url(#tinta)',
                  }
                : {
                    fontFamily: FONT.display,
                    fontSize: s,
                    lineHeight: 0.92,
                    letterSpacing: '-0.012em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    color,
                    filter: 'url(#tinta)',
                  }
            }
          >
            {l.t}
          </div>
        </Reveal>
      );
    })}
  </div>
);

// Etiqueta en mono pequeña.
export const Label: React.FC<{children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties}> = ({
  children,
  color = C.tinta,
  size = 24,
  style,
}) => (
  <div
    style={{
      fontFamily: FONT.mono,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      lineHeight: 1.3,
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Body: React.FC<{children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties}> = ({
  children,
  color = C.tinta,
  size = 34,
  style,
}) => (
  <div style={{fontFamily: FONT.ui, fontWeight: 500, fontSize: size, lineHeight: 1.28, letterSpacing: '-0.01em', color, ...style}}>
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Recursos gráficos
// ---------------------------------------------------------------------------

// Entrada de pegatina: cae grande, se pega con rebote y queda un poco torcida.
const useSlap = (at: number, rot: number) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - at, fps, config: {damping: 11, stiffness: 190, mass: 0.7}});
  return {
    visible: f >= at,
    transform: `scale(${1.7 - 0.7 * s}) rotate(${rot + (1 - s) * 16 + jitter(f, rot, 0.6)}deg)`,
    opacity: Math.min(1, (f - at) / 3),
  };
};

// Borde blanco troquelado alrededor de cualquier forma.
const DIECUT =
  'drop-shadow(5px 0 0 #fff) drop-shadow(-5px 0 0 #fff) drop-shadow(0 5px 0 #fff) drop-shadow(0 -5px 0 #fff) drop-shadow(0 6px 8px rgba(20,20,20,.18))';

export const Sparkle: React.FC<{
  x: number;
  y: number;
  size: number;
  at: number;
  color?: string;
  seed?: number;
}> = ({x, y, size, at, color = C.cobalto, seed = 1}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - at, fps, config: {damping: 9, stiffness: 160}});
  const twinkle = 1 + 0.08 * Math.sin((f + seed * 9) / 6);
  if (f < at) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        transform: `scale(${s * twinkle}) rotate(${(1 - s) * -90 + jitter(f, seed, 3)}deg)`,
        overflow: 'visible',
      }}
    >
      <path
        d="M0,-48 C4,-10 10,-4 48,0 C10,4 4,10 0,48 C-4,10 -10,4 -48,0 C-10,-4 -4,-10 0,-48 Z"
        fill="none"
        stroke={color}
        strokeWidth={4.5}
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Bocadillo «@society»: la firma secundaria de la marca.
export const Bubble: React.FC<{
  x: number;
  y: number;
  at: number;
  size?: number;
  rot?: number;
  bg?: string;
  fg?: string;
  text?: string;
  tail?: 'left' | 'right';
}> = ({x, y, at, size = 44, rot = -4, bg = C.cobalto, fg = C.papel, text = '@society', tail = 'left'}) => {
  const slap = useSlap(at, rot);
  if (!slap.visible) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: slap.transform, opacity: slap.opacity, filter: DIECUT}}>
      <div
        style={{
          background: bg,
          color: fg,
          fontFamily: FONT.ui,
          fontWeight: 700,
          fontSize: size,
          letterSpacing: '-0.02em',
          padding: `${size * 0.32}px ${size * 0.55}px ${size * 0.36}px`,
          borderRadius: size * 0.6,
          position: 'relative',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
        <svg
          width={size * 0.7}
          height={size * 0.55}
          viewBox="0 0 28 22"
          style={{position: 'absolute', bottom: -size * 0.45, [tail]: size * 0.5, transform: tail === 'right' ? 'scaleX(-1)' : undefined}}
        >
          <path d="M0,0 L28,0 L4,22 Z" fill={bg} />
        </svg>
      </div>
    </div>
  );
};

const starPath = (points: number, outer: number, inner: number) => {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    pts.push(`${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`);
  }
  return `M${pts.join('L')}Z`;
};

// Pegatina de estrella: «NUEVO», «MÁS MESAS».
export const StarSticker: React.FC<{
  x: number;
  y: number;
  size: number;
  at: number;
  lines: string[];
  rot?: number;
  bg?: string;
  fg?: string;
}> = ({x, y, size, at, lines, rot = 8, bg = C.mostaza, fg = C.tinta}) => {
  const slap = useSlap(at, rot);
  if (!slap.visible) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        transform: slap.transform,
        opacity: slap.opacity,
        filter: DIECUT,
      }}
    >
      <svg width={size} height={size} viewBox="-50 -50 100 100" style={{position: 'absolute'}}>
        <path d={starPath(14, 50, 41)} fill={bg} />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT.display,
          color: fg,
          fontSize: size * (lines.length > 1 ? 0.2 : 0.22),
          lineHeight: 0.95,
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        {lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
    </div>
  );
};

// Píldora «LISTO PARA PUBLICAR» con megáfono.
export const PillSticker: React.FC<{x: number; y: number; at: number; size?: number; rot?: number; bg?: string; fg?: string}> = ({
  x,
  y,
  at,
  size = 40,
  rot = -5,
  bg = C.cobalto,
  fg = C.papel,
}) => {
  const slap = useSlap(at, rot);
  if (!slap.visible) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: slap.transform, opacity: slap.opacity, filter: DIECUT}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: size * 0.4,
          background: bg,
          border: `${size * 0.09}px solid ${fg}`,
          outline: `${size * 0.12}px solid ${bg}`,
          borderRadius: size * 2,
          padding: `${size * 0.28}px ${size * 0.7}px ${size * 0.28}px ${size * 0.5}px`,
        }}
      >
        <svg width={size * 1.3} height={size * 1.1} viewBox="0 0 52 44" fill="none" stroke={fg} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 16 L4 28 L12 28 L30 38 L30 6 L12 16 Z" />
          <path d="M12 28 L15 40" />
          <path d="M38 14 L46 10 M38 22 L48 22 M38 30 L46 34" />
        </svg>
        <div style={{fontFamily: FONT.ui, fontWeight: 800, fontSize: size * 0.62, lineHeight: 1.05, color: fg, textTransform: 'uppercase'}}>
          Listo para
          <br />
          publicar
        </div>
      </div>
    </div>
  );
};

// Punto mostaza de esquina.
export const Dot: React.FC<{x: number; y: number; size: number; at: number; color?: string}> = ({x, y, size, at, color = C.mostaza}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - at, fps, config: {damping: 8, stiffness: 200}});
  return (
    <div
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: size,
        background: color,
        transform: `scale(${f < at ? 0 : s})`,
      }}
    />
  );
};

// Pincelada cobalto que se dibuja de izquierda a derecha.
export const Brush: React.FC<{
  width: number;
  at: number;
  dur?: number;
  color?: string;
  thick?: number;
  style?: React.CSSProperties;
}> = ({width, at, dur = 14, color = C.cobalto, thick = 1, style}) => {
  const f = useCurrentFrame();
  const id = 'brush' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const p = tween(f, at, at + dur, [0, 1], EASE_OUT);
  const h = width * 0.11 * thick;
  return (
    <svg width={width} height={h} viewBox="0 0 300 33" preserveAspectRatio="none" style={{display: 'block', overflow: 'visible', ...style}}>
      <defs>
        <clipPath id={id}>
          <rect x={0} y={-10} width={300 * p} height={60} />
        </clipPath>
      </defs>
      <path
        clipPath={`url(#${id})`}
        d="M2,24 C60,12 150,6 298,4 C296,9 292,11 286,12 C200,14 110,20 12,31 C5,32 0,28 2,24 Z"
        fill={color}
        style={{filter: 'url(#tinta)'}}
      />
    </svg>
  );
};

// Logotipo principal: «Society» en serif cursiva con subrayado de pincel.
export const Logo: React.FC<{size: number; at: number; color?: string; line?: string; style?: React.CSSProperties}> = ({
  size,
  at,
  color = C.tinta,
  line = C.cobalto,
  style,
}) => {
  const f = useCurrentFrame();
  const clip = tween(f, at, at + 18, [100, 0], EASE_OUT);
  return (
    <div style={{display: 'inline-flex', flexDirection: 'column', ...style}}>
      <div
        style={{
          fontFamily: FONT.serif,
          fontStyle: 'italic',
          fontWeight: 900,
          fontSize: size,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color,
          clipPath: `inset(-20% ${clip}% -20% -5%)`,
          paddingRight: size * 0.08,
        }}
      >
        Society
      </div>
      <Brush width={size * 3.1} at={at + 10} color={line} style={{marginTop: -size * 0.06, marginLeft: -size * 0.05}} />
    </div>
  );
};

// Recorte fotográfico con trama: entra desplazándose y queda flotando un poco.
export const Cutout: React.FC<{
  src: string;
  x: number;
  y: number;
  width: number;
  at: number;
  from?: [number, number];
  rot?: number;
  dur?: number;
  float?: number;
  out?: number;
  style?: React.CSSProperties;
}> = ({src, x, y, width, at, from = [0, 600], rot = 0, dur = 24, float = 6, out, style}) => {
  const f = useCurrentFrame();
  const p = tween(f, at, at + dur, [0, 1], EASE_OUT);
  const q = out === undefined ? 0 : tween(f, out, out + 14, [0, 1], EASE_IN);
  const dx = from[0] * (1 - p) - from[0] * q;
  const dy = from[1] * (1 - p) + Math.sin(f / 22) * float * p + from[1] * q;
  return (
    <Img
      src={staticFile(`img/${src}`)}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        transform: `translate(${dx}px, ${dy}px) rotate(${rot + (1 - p) * 6}deg)`,
        opacity: f < at ? 0 : 1 - q,
        ...style,
      }}
    />
  );
};

// Móvil plano con barra de estado, como en las pantallas de la guía.
export const Phone: React.FC<{
  width: number;
  dark?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({width, dark = false, children, style}) => {
  const h = width * 2.06;
  const ink = dark ? C.papel : C.tinta;
  return (
    <div
      style={{
        width,
        height: h,
        borderRadius: width * 0.15,
        background: C.tinta,
        padding: width * 0.032,
        boxSizing: 'border-box',
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: width * 0.125,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Paper dark={dark} />
        <div
          style={{
            position: 'absolute',
            top: width * 0.03,
            left: '50%',
            width: width * 0.3,
            height: width * 0.085,
            marginLeft: -width * 0.15,
            borderRadius: width,
            background: C.tinta,
            zIndex: 10,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: width * 0.045,
            left: width * 0.1,
            right: width * 0.09,
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: FONT.ui,
            fontWeight: 700,
            fontSize: width * 0.042,
            color: ink,
            zIndex: 11,
          }}
        >
          <span>9:41</span>
          <span style={{display: 'flex', gap: width * 0.012, alignItems: 'flex-end'}}>
            {[0.4, 0.6, 0.8, 1].map((k) => (
              <span key={k} style={{width: width * 0.009, height: width * 0.03 * k, background: ink, borderRadius: 2}} />
            ))}
            <span
              style={{
                marginLeft: width * 0.02,
                width: width * 0.06,
                height: width * 0.03,
                border: `2px solid ${ink}`,
                borderRadius: 4,
                padding: 1,
                boxSizing: 'border-box',
              }}
            >
              <span style={{display: 'block', width: '80%', height: '100%', background: ink, borderRadius: 2}} />
            </span>
          </span>
        </div>
        <div style={{position: 'absolute', inset: 0}}>{children}</div>
      </div>
    </div>
  );
};

// Botón principal: píldora mostaza con texto tinta y flecha.
export const Button: React.FC<{label: string; size: number; press?: number; style?: React.CSSProperties; bg?: string; fg?: string; border?: string}> = ({
  label,
  size,
  press = 0,
  style,
  bg = C.mostaza,
  fg = C.tinta,
  border,
}) => (
  <div
    style={{
      background: bg,
      color: fg,
      border: border ? `${size * 0.07}px solid ${border}` : undefined,
      boxSizing: 'border-box',
      borderRadius: size * 2,
      height: size * 2.3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: size * 0.5,
      fontFamily: FONT.ui,
      fontWeight: 700,
      fontSize: size,
      transform: `scale(${1 - press * 0.06})`,
      ...style,
    }}
  >
    {label}
    <svg width={size * 0.95} height={size * 0.8} viewBox="0 0 24 20" fill="none" stroke={fg} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 10 H21 M13 2 L21 10 L13 18" />
    </svg>
  </div>
);

// Texto que se escribe letra a letra, con cursor.
export const Typed: React.FC<{text: string; at: number; cps?: number; cursor?: boolean; style?: React.CSSProperties}> = ({
  text,
  at,
  cps = 18,
  cursor = true,
  style,
}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const n = Math.max(0, Math.min(text.length, Math.floor(((f - at) / fps) * cps)));
  const blink = cursor && Math.floor(f / 8) % 2 === 0;
  return (
    <span style={style}>
      {text.slice(0, n)}
      <span style={{opacity: blink ? 1 : 0, fontWeight: 400}}>|</span>
    </span>
  );
};
