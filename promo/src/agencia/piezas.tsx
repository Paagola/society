import React from 'react';
import {Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Rasgado} from '../pizza/piezas';
import {ICONO, Icono} from '../startup/ui';
import {F} from '../startup/estilo';
import {C, FONT} from '../theme';
import {ENTRA, SALE, SUAVE} from '../recorte/camara';
import {acota, azar, PASO, Sonidos} from '../recorte/motor';

// Piezas de «Tu agencia con IA»: la mezcla de las dos estéticas. Del vídeo startup, la tipografía Geist
// que sube palabra a palabra, las píldoras y las tarjetas limpias; del papel, los paneles rasgados con
// sombra dura, la cursiva de la identidad y las letras recortadas del logo. Lo que se mueve «a mano»
// (papel) va a saltos; lo que es interfaz, suave.

const paso = (f: number) => Math.floor(f / PASO) * PASO;
const SOMBRA_DURA = 'drop-shadow(10px 14px 0 rgba(10, 8, 6, 0.4))';
const FONDO: Record<string, string> = {[C.papel]: 'papel', [C.cobalto]: 'cobalto', [C.tinta]: 'tinta'};

// Panel de papel rasgado (papel, cobalto o tinta) que cae en su sitio.
export const Hoja: React.FC<{x: number; y: number; w: number; h: number; color?: string; en: number; mascara?: number; rot?: number; children?: React.ReactNode}> = ({
  x,
  y,
  w,
  h,
  color = C.papel,
  en,
  mascara = 4,
  rot = 0,
  children,
}) => {
  const f = paso(useCurrentFrame());
  const son = <Sonidos ev={[{f: en + 8, src: 'audio/pizza/pegar-1.wav', vol: 0.7, rate: 0.8}]} />;
  if (f < en) return son;
  const e = SALE(acota((f - en) / 10));
  const url = `url(${staticFile(`papel/mascaras/tira-${mascara}.png`)})`;
  return (
    <>
      {son}
      <div style={{position: 'absolute', left: x, top: y, width: w, height: h, transform: `translateY(${(1 - e) * -260}px) rotate(${rot + (1 - e) * -5}deg) scale(${1 + (1 - e) * 0.08})`, filter: SOMBRA_DURA}}>
        <div style={{position: 'absolute', inset: 0, WebkitMaskImage: url, maskImage: url, WebkitMaskSize: '100% 100%', maskSize: '100% 100%'}}>
          <Img src={staticFile(`papel/fondos/${FONDO[color] ?? 'papel'}.jpg`)} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
          <Img src={staticFile(`papel/mascaras/tira-${mascara}-fibra.png`)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
        </div>
        <div style={{position: 'absolute', inset: 0}}>{children}</div>
      </div>
    </>
  );
};

// Titular startup: cada palabra sube desde detrás de su máscara; las partes `it` van en la cursiva.
export const Titular: React.FC<{x: number; y: number; en: number; sale?: number; partes: {t: string; it?: boolean}[]; tam?: number; color?: string; ancho?: number; alinear?: 'left' | 'center'}> = ({
  x,
  y,
  en,
  sale = Infinity,
  partes,
  tam = 110,
  color = C.blanco,
  ancho = 1040,
  alinear = 'left',
}) => {
  const f = useCurrentFrame();
  let k = 0;
  if (f > sale + 30) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: ancho, textAlign: alinear, lineHeight: 1.02}}>
      {partes.map((p, i) =>
        p.t.split(' ').map((pal, j) => {
          const t = SALE(acota((f - en - k * 3) / 14)) - ENTRA(acota((f - sale - k * 2) / 10));
          k++;
          return (
            <span key={`${i}-${j}`} style={{display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: tam * 0.24, paddingBottom: tam * 0.12}}>
              <span
                style={{
                  display: 'inline-block',
                  transform: `translateY(${(1 - t) * 115}%)`,
                  fontFamily: p.it ? FONT.serif : F.sans,
                  fontStyle: p.it ? 'italic' : 'normal',
                  fontWeight: p.it ? 900 : 780,
                  fontSize: p.it ? tam * 1.02 : tam,
                  letterSpacing: p.it ? '-0.02em' : '-0.045em',
                  color,
                }}
              >
                {pal}
              </span>
            </span>
          );
        }),
      )}
    </div>
  );
};

export const Etiqueta: React.FC<{x: number; y: number; texto: string; en: number; color?: string}> = ({x, y, texto, en, color = 'rgba(245,244,240,0.7)'}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', left: x, top: y, fontFamily: F.mono, fontSize: 30, letterSpacing: '0.14em', textTransform: 'uppercase', color, opacity: acota((f - en) / 8)}}>
      {texto}
    </div>
  );
};

// Texto que se escribe letra a letra, con cursor parpadeante y tecleo.
export const Escribe: React.FC<{texto: string; en: number; dur: number; tam?: number; color?: string; cursor?: string; ancho: number}> = ({texto, en, dur, tam = 58, color = C.tinta, cursor: colorCursor = C.cobalto, ancho}) => {
  const f = useCurrentFrame();
  const n = Math.max(0, Math.min(texto.length, Math.floor(((f - en) / dur) * texto.length)));
  const ev = Array.from(texto).map((c, i) => ({f: Math.round(en + (i * dur) / texto.length), src: 'audio/pizza/tic.wav', vol: c === ' ' ? 0 : 0.35, rate: 1.1 + 0.3 * azar(i, 51)})).filter((e) => e.vol > 0);
  const cursor = Math.floor(f / 12) % 2 === 0 || (f >= en && f < en + dur);
  return (
    <>
      <Sonidos ev={ev} />
      <div style={{width: ancho, fontFamily: F.sans, fontWeight: 560, fontSize: tam, lineHeight: 1.18, letterSpacing: '-0.02em', color}}>
        {f < en ? <span style={{opacity: 0.4}}>Escribe aquí lo que necesitas…</span> : texto.slice(0, n)}
        {f >= en && <span style={{display: 'inline-block', width: 5, height: tam * 1.05, marginLeft: 4, verticalAlign: 'text-bottom', background: colorCursor, opacity: cursor ? 1 : 0}} />}
      </div>
    </>
  );
};

// Píldora de opción (formato) que se marca en cobalto.
export const Chip: React.FC<{x: number; y: number; w: number; texto: string; forma: [number, number]; sel?: number}> = ({x, y, w, texto, forma, sel = Infinity}) => {
  const f = useCurrentFrame();
  const s = SALE(acota((f - sel) / 8));
  const k = 70 / Math.max(forma[0], forma[1]);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: 150,
        borderRadius: 75,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 26,
        background: s > 0 ? C.cobalto : 'rgba(245,244,240,0.06)',
        border: `3px solid ${s > 0 ? C.cobalto : 'rgba(245,244,240,0.35)'}`,
        transform: `scale(${1 + 0.08 * s * (1 - acota((f - sel - 8) / 10))})`,
        fontFamily: F.sans,
        fontWeight: 760,
        fontSize: 56,
        color: C.blanco,
      }}
    >
      <div style={{width: forma[0] * k, height: forma[1] * k, border: `5px solid ${C.blanco}`, borderRadius: 8}} />
      {texto}
    </div>
  );
};

// Botón principal (el único mostaza de la pantalla, con texto en tinta).
export const Boton: React.FC<{x: number; y: number; w: number; texto: string; pulsa?: number; color?: string; tinta?: string}> = ({x, y, w, texto, pulsa = Infinity, color = C.mostaza, tinta = C.tinta}) => {
  const f = useCurrentFrame();
  const p = f >= pulsa && f < pulsa + 8 ? 0.93 : 1;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: 150,
        borderRadius: 75,
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: F.sans,
        fontWeight: 780,
        fontSize: 58,
        letterSpacing: '-0.03em',
        color: tinta,
        transform: `scale(${p})`,
        boxShadow: '10px 14px 0 rgba(10, 8, 6, 0.4)',
      }}
    >
      {texto}
    </div>
  );
};

// Barra de carga con su texto; al terminar, el check.
export const Carga: React.FC<{x: number; y: number; w: number; a: number; b: number; texto: string; hecho: string; color?: string}> = ({x, y, w, a, b, texto, hecho, color = C.blanco}) => {
  const f = useCurrentFrame();
  if (f < a) return null;
  const t = SUAVE(acota((f - a) / (b - a)));
  const fin = f >= b;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w}}>
      <Sonidos ev={[{f: b, src: 'audio/pizza/pop.wav', vol: 0.8, rate: 1}]} />
      <div style={{display: 'flex', alignItems: 'center', gap: 16, fontFamily: F.sans, fontWeight: 650, fontSize: 44, color}}>
        {fin && <Icono d={ICONO.check} s={52} color={color} ancho={3} />}
        {fin ? hecho : `${texto} ${Math.round(t * 100)} %`}
      </div>
      <div style={{marginTop: 18, height: 16, borderRadius: 8, background: 'rgba(245,244,240,0.2)', overflow: 'hidden'}}>
        <div style={{width: `${t * 100}%`, height: '100%', background: color}} />
      </div>
    </div>
  );
};

// Letras recortadas con la estética del logo: cada una de un papel, fuente y giro distintos.
const ESTILOS = [
  {fondo: C.papel, color: C.cobalto, fuente: FONT.serif, it: true, peso: 900},
  {fondo: 'agencia/pizza.jpg', color: C.papel, fuente: FONT.display, peso: 400},
  {fondo: '#141210', color: '#F6F1E9', fuente: 'Montserrat', peso: 700},
  {fondo: C.mostaza, color: C.tinta, fuente: FONT.mono, peso: 700},
  {fondo: C.cobalto, color: C.papel, fuente: FONT.ui, peso: 800},
  {fondo: '#FFFFFF', color: C.tinta, fuente: FONT.serif, it: true, peso: 900},
  {fondo: C.papel, color: C.tinta, fuente: FONT.display, peso: 400},
];
export const Recortes: React.FC<{texto: string; x: number; y: number; tam: number; en: number; cada?: number; semilla?: number}> = ({texto, x, y, tam, en, cada = 2, semilla = 0}) => {
  const f = paso(useCurrentFrame());
  let cx = 0;
  let k = 0;
  const letras = Array.from(texto).map((c, i) => {
    if (c === ' ') {
      cx += tam * 0.3;
      return null;
    }
    const st = ESTILOS[(i + semilla) % ESTILOS.length];
    const w = tam * (/[IJL1]/.test(c) ? 0.52 : /[MW]/.test(c) ? 0.95 : 0.74);
    const h = tam * 1.08;
    const l = {c, st, w, h, x: cx, t: en + k * cada, rot: (azar(i, semilla + 61) - 0.5) * 10, dy: (azar(i, semilla + 62) - 0.5) * tam * 0.16, m: (i + semilla) % 7};
    cx += w - tam * 0.05;
    k++;
    return l;
  });
  return (
    <div style={{position: 'absolute', left: x, top: y}}>
      <Sonidos ev={letras.filter(Boolean).map((l, i) => ({f: l!.t + 3, src: `audio/pizza/pegar-${(i % 3) + 1}.wav`, vol: 0.6, rate: 1.1}))} />
      {letras.map((l, i) => {
        if (!l || f < l.t) return null;
        const p = SALE(acota((f - l.t) / 4));
        const foto = l.st.fondo.includes('/');
        return (
          <Rasgado
            key={i}
            mascara={`letra-${l.m}`}
            w={l.w}
            h={l.h}
            style={{left: l.x, top: l.dy, transform: `rotate(${l.rot + (1 - p) * 10}deg) scale(${1 + (1 - p) * 0.4})`, zIndex: i % 2}}
          >
            {foto ? (
              <Img src={staticFile(l.st.fondo)} style={{position: 'absolute', width: '240%', left: `-${40 + 10 * (i % 4)}%`, top: '-40%'}} />
            ) : (
              <div style={{position: 'absolute', inset: 0, background: l.st.fondo}} />
            )}
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <span style={{fontFamily: l.st.fuente, fontStyle: l.st.it ? 'italic' : 'normal', fontWeight: l.st.peso, fontSize: tam * 0.86, lineHeight: 1, color: l.st.color, textTransform: 'uppercase'}}>{l.c}</span>
            </div>
          </Rasgado>
        );
      })}
    </div>
  );
};

// Corazones que suben desde un punto.
export const Corazones: React.FC<{x: number; y: number; en: number; dur: number; n?: number}> = ({x, y, en, dur, n = 18}) => {
  const f = useCurrentFrame();
  return (
    <>
      {Array.from({length: n}, (_, i) => {
        const t0 = en + (dur * i) / n;
        const t = (f - t0) / 40;
        if (t < 0 || t > 1) return null;
        const col = [C.cobalto, '#E8324A', C.papel, C.mostaza][i % 4];
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x + (azar(i, 71) - 0.5) * 260 + Math.sin(t * 6 + i) * 30,
              top: y - SALE(t) * (380 + 200 * azar(i, 72)),
              opacity: 1 - t * t,
              transform: `scale(${0.6 + 0.8 * azar(i, 73)}) rotate(${(azar(i, 74) - 0.5) * 40}deg)`,
            }}
          >
            <svg width={70} height={70} viewBox="0 0 24 24">
              <path d={ICONO.corazon} fill={col} stroke={C.tinta} strokeWidth={1.2} />
            </svg>
          </div>
        );
      })}
    </>
  );
};

const numero = (n: number) => Math.round(n).toLocaleString('es-ES');

// Publicación de Instagram (la tarjeta, no una pantalla de móvil): cabecera, láminas que se deslizan,
// acciones y un contador de «Me gusta» que sube.
export const PostIG: React.FC<{
  x: number;
  y: number;
  w: number;
  en: number;
  laminas: React.ReactNode[];
  cambios?: number[]; // fotogramas en los que pasa a la lámina siguiente
  likes: [number, number, number, number]; // desde, hasta, valor inicial, valor final
  pie?: string;
  atras?: number; // pulsa la flecha de volver
}> = ({x, y, w, en, laminas, cambios = [], likes, pie, atras = Infinity}) => {
  const f = useCurrentFrame();
  const fp = paso(f);
  if (fp < en) return null;
  const e = SALE(acota((fp - en) / 10));
  const hImg = w * 1.25;
  let idx = 0;
  let desliza = 0;
  cambios.forEach((c, i) => {
    if (f >= c) {
      idx = i + 1;
      desliza = 1 - SUAVE(acota((f - c) / 12));
    }
  });
  const likesV = likes[2] + (likes[3] - likes[2]) * SALE(acota((f - likes[0]) / (likes[1] - likes[0])));
  const lleno = f >= likes[0];
  const pulsaAtras = f >= atras && f < atras + 8 ? 0.85 : 1;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, transform: `translateY(${(1 - e) * 300}px) rotate(${(1 - e) * 4}deg)`, filter: SOMBRA_DURA}}>
      <Sonidos ev={cambios.map((c) => ({f: c, src: 'audio/pizza/lanzar.wav', vol: 0.3, rate: 1.4}))} />
      <div style={{background: '#FAF8F2', borderRadius: 34, overflow: 'hidden'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, padding: '26px 30px'}}>
          <div style={{width: 78, height: 78, borderRadius: 42, border: `4px solid ${C.cobalto}`, transform: `scale(${pulsaAtras})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Icono d={ICONO.atras} s={46} color={C.tinta} ancho={2.6} />
          </div>
          <Img src={staticFile('agencia/sala.jpg')} style={{width: 78, height: 78, borderRadius: 40, objectFit: 'cover'}} />
          <div style={{fontFamily: F.sans, fontWeight: 720, fontSize: 40, color: C.tinta}}>Da Tonino</div>
        </div>
        <div style={{position: 'relative', width: w, height: hImg, overflow: 'hidden', background: '#111'}}>
          {laminas.map((l, i) => {
            const off = (i - idx) * w + (i === idx ? desliza * w : i === idx - 1 ? desliza * w : 0);
            if (Math.abs(off) >= w) return null;
            return (
              <div key={i} style={{position: 'absolute', left: 0, top: 0, width: w, height: hImg, transform: `translateX(${off}px)`}}>
                {l}
              </div>
            );
          })}
          <div style={{position: 'absolute', bottom: 24, width: '100%', display: 'flex', justifyContent: 'center', gap: 12}}>
            {laminas.map((_, i) => (
              <div key={i} style={{width: 16, height: 16, borderRadius: 8, background: i === idx ? C.blanco : 'rgba(255,255,255,0.45)'}} />
            ))}
          </div>
        </div>
        <div style={{padding: '24px 30px 34px'}}>
          <div style={{display: 'flex', gap: 30}}>
            <svg width={62} height={62} viewBox="0 0 24 24">
              <path d={ICONO.corazon} fill={lleno ? '#E8324A' : 'none'} stroke={lleno ? '#E8324A' : C.tinta} strokeWidth={2} />
            </svg>
            <Icono d={ICONO.comentario} s={62} color={C.tinta} />
            <Icono d={ICONO.enviar} s={62} color={C.tinta} />
          </div>
          <div style={{marginTop: 18, fontFamily: F.sans, fontWeight: 760, fontSize: 44, color: C.tinta}}>{numero(likesV)} Me gusta</div>
          {pie && <div style={{marginTop: 8, fontFamily: F.sans, fontWeight: 450, fontSize: 36, color: 'rgba(20,20,20,0.75)'}}>{pie}</div>}
        </div>
      </div>
    </div>
  );
};

// Tarjeta del reel (como la del vídeo startup): el reel real de Da Tonino dentro de una tarjeta de papel.
// `tramos`: trozos del reel [desde, hasta) en fotogramas que se encadenan con corte seco (sin los macarrones).
export const TarjetaReel: React.FC<{x: number; y: number; w: number; en: number; video: number; dur: number; tramos?: [number, number][]; fuente?: string}> = ({
  x,
  y,
  w,
  en,
  video,
  dur,
  tramos = [[0, 100000]],
  fuente = 'agencia/reel.mp4',
}) => {
  const fr = useCurrentFrame();
  let t0 = video;
  const piezasReel = tramos.map(([a, b], i) => {
    const d = Math.min(b - a, video + dur - t0);
    const s = {from: t0, d, a, i};
    t0 += Math.max(0, d);
    return s;
  });
  const f = paso(fr);
  if (f < en) return null;
  const e = SALE(acota((f - en) / 10));
  const h = (w * 16) / 9;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, transform: `translateY(${(1 - e) * 400}px) rotate(${(1 - e) * -6 + 1.5}deg)`, filter: SOMBRA_DURA}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 40, overflow: 'hidden', background: '#000', border: `8px solid ${C.papel}`}}>
        {/* hasta que arranca, el primer fotograma quieto: el reel se ve entero desde su segundo 0 */}
        {fr < video && <Img src={staticFile('agencia/reel-inicio.jpg')} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />}
        {piezasReel
          .filter((p) => p.d > 0)
          .map((p) => (
            <Sequence key={p.i} from={p.from} durationInFrames={p.d} layout="none">
              <OffthreadVideo src={staticFile(fuente)} startFrom={p.a} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} volume={0.9} />
            </Sequence>
          ))}
        <div style={{position: 'absolute', top: 30, left: 34, fontFamily: F.sans, fontWeight: 760, fontSize: 44, color: C.blanco}}>Reels</div>
        <div style={{position: 'absolute', bottom: 40, left: 34, display: 'flex', alignItems: 'center', gap: 16}}>
          <Img src={staticFile('agencia/sala.jpg')} style={{width: 64, height: 64, borderRadius: 32, objectFit: 'cover', border: `3px solid ${C.blanco}`}} />
          <span style={{fontFamily: F.sans, fontWeight: 700, fontSize: 36, color: C.blanco}}>Da Tonino</span>
        </div>
        <div style={{position: 'absolute', right: 26, bottom: 150, display: 'flex', flexDirection: 'column', gap: 34}}>
          <Icono d={ICONO.corazon} s={60} />
          <Icono d={ICONO.comentario} s={60} />
          <Icono d={ICONO.enviar} s={60} />
        </div>
      </div>
    </div>
  );
};

// Papeleta de Society (tinta, rasgada) con el logo recortado, el mensaje y el QR.
export const Papeleta: React.FC<{w: number; h: number; children?: React.ReactNode}> = ({w, h, children}) => {
  const url = `url(${staticFile('papel/mascaras/tira-5.png')})`;
  return (
    <div style={{position: 'absolute', inset: 0, width: w, height: h}}>
      <div style={{position: 'absolute', inset: 0, WebkitMaskImage: url, maskImage: url, WebkitMaskSize: '100% 100%', maskSize: '100% 100%'}}>
        <Img src={staticFile('papel/fondos/tinta.jpg')} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
        <Img src={staticFile('papel/mascaras/tira-5-fibra.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
      </div>
      {children}
    </div>
  );
};

// Carga circular: el aro se llena y acaba en un check; sin texto.
export const Cargador: React.FC<{cx: number; cy: number; a: number; b: number; tam?: number; color?: string; fondo?: string}> = ({cx, cy, a, b, tam = 170, color = C.tinta, fondo = '#FFFFFF'}) => {
  const f = useCurrentFrame();
  if (f < a || f > b + 26) return null;
  const e = SALE(acota((f - a) / 8)) * (1 - acota((f - b - 16) / 10));
  const t = SUAVE(acota((f - a) / (b - a)));
  const r = tam * 0.36;
  const L = 2 * Math.PI * r;
  const hecho = f >= b;
  return (
    <div style={{position: 'absolute', left: cx - tam / 2, top: cy - tam / 2, width: tam, height: tam, borderRadius: tam / 2, background: fondo, transform: `scale(${0.6 + 0.4 * e})`, opacity: e, boxShadow: '10px 14px 0 rgba(10,8,6,0.25)'}}>
      <Sonidos ev={[{f: b, src: 'audio/pizza/pop.wav', vol: 0.8, rate: 1}]} />
      <svg width={tam} height={tam} viewBox={`0 0 ${tam} ${tam}`}>
        <circle cx={tam / 2} cy={tam / 2} r={r} fill="none" stroke="rgba(20,20,20,0.12)" strokeWidth={tam * 0.08} />
        <circle
          cx={tam / 2}
          cy={tam / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={tam * 0.08}
          strokeLinecap="round"
          strokeDasharray={`${L * t} ${L}`}
          transform={`rotate(${-90 + (1 - t) * 180 + f * 4} ${tam / 2} ${tam / 2})`}
        />
        {hecho && <path d={`M${tam * 0.34} ${tam * 0.52} l${tam * 0.11} ${tam * 0.11} l${tam * 0.22} ${-tam * 0.24}`} fill="none" stroke={color} strokeWidth={tam * 0.08} strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
    </div>
  );
};

// Contenedor de interfaz normal: fondo translúcido y borde fino (o discontinuo), entra suave.
export const Caja: React.FC<{x: number; y: number; w: number; h: number; en: number; discontinua?: boolean; children?: React.ReactNode}> = ({x, y, w, h, en, discontinua, children}) => {
  const f = useCurrentFrame();
  if (f < en) return null;
  const e = SALE(acota((f - en) / 12));
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, opacity: e, transform: `translateY(${(1 - e) * 40}px)`}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 40, background: 'rgba(245,244,240,0.07)', border: `3px ${discontinua ? 'dashed' : 'solid'} rgba(245,244,240,0.32)`}} />
      <div style={{position: 'absolute', inset: 0}}>{children}</div>
    </div>
  );
};

// Tres personas le dan a «me gusta»: su avatar entra en la fila y un corazón late sobre la foto.
const Persona: React.FC<{color: string; tinta: string; tam: number}> = ({color, tinta, tam}) => (
  <svg width={tam} height={tam} viewBox="0 0 40 40">
    <circle cx={20} cy={20} r={19} fill={color} stroke="#FAF8F2" strokeWidth={2.5} />
    <circle cx={20} cy={15.5} r={6.5} fill={tinta} />
    <path d="M8.5 33c1.8-6.2 6.2-9 11.5-9s9.7 2.8 11.5 9" fill={tinta} />
  </svg>
);
export const MeGustan: React.FC<{x: number; y: number; foto: {x: number; y: number; w: number; h: number}; tiempos: number[]}> = ({x, y, foto, tiempos}) => {
  const f = useCurrentFrame();
  const colores = [
    [C.cobalto, C.papel],
    [C.mostaza, C.tinta],
    ['#E9E3D3', C.cobalto],
  ];
  return (
    <>
      <Sonidos ev={tiempos.map((t, i) => ({f: t, src: 'audio/pizza/pop.wav', vol: 0.8, rate: 1 + 0.08 * i}))} />
      {tiempos.map((t, i) => {
        if (f < t) return null;
        const d = f - t;
        const golpe = d < 18 ? Math.sin((d / 18) * Math.PI) : 0;
        return (
          <React.Fragment key={i}>
            <div style={{position: 'absolute', left: foto.x + foto.w / 2 - 110, top: foto.y + foto.h / 2 - 110, opacity: golpe, transform: `scale(${0.4 + 1.1 * golpe})`}}>
              <svg width={220} height={220} viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.35))'}}>
                <path d={ICONO.corazon} fill="#FFFFFF" />
              </svg>
            </div>
            <div style={{position: 'absolute', left: x + i * 58, top: y, zIndex: 3 - i, transform: `scale(${SALE(acota(d / 8))})`}}>
              <Persona color={colores[i][0]} tinta={colores[i][1]} tam={78} />
              <svg width={34} height={34} viewBox="0 0 24 24" style={{position: 'absolute', right: -6, bottom: -4}}>
                <circle cx={12} cy={12} r={12} fill="#E8324A" />
                <path d={ICONO.corazon} fill="#FFFFFF" transform="translate(4.2 4.6) scale(0.65)" />
              </svg>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

// QR que se construye módulo a módulo: primero las tres esquinas, luego el resto al azar.
export const QRModulos: React.FC<{x: number; y: number; lado: number; en: number; dur: number; matriz: string[]}> = ({x, y, lado, en, dur, matriz}) => {
  const f = useCurrentFrame();
  if (f < en) return null;
  const n = matriz.length;
  const m = lado / n;
  const esquina = (r: number, c: number) => (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  const pad = 26;
  const e = SALE(acota((f - en) / 8));
  return (
    <div
      style={{
        position: 'absolute',
        left: x - pad,
        top: y - pad,
        width: lado + 2 * pad,
        height: lado + 2 * pad,
        borderRadius: 24,
        background: '#F2EEE3',
        transform: `scale(${0.85 + 0.15 * e})`,
        opacity: e,
        boxShadow: '10px 14px 0 rgba(10,8,6,0.35)',
      }}
    >
      <Sonidos ev={Array.from({length: 8}, (_, i) => ({f: en + 4 + Math.round((dur * i) / 8), src: 'audio/pizza/tic.wav', vol: 0.3, rate: 1.4 + 0.05 * i}))} />
      {matriz.flatMap((fila, r) =>
        Array.from(fila).map((v, c) => {
          if (v !== '1') return null;
          const t0 = esquina(r, c) ? en + 2 : en + 4 + Math.round(azar(r * n + c, 91) * dur);
          const k = SALE(acota((f - t0) / 4));
          if (k <= 0) return null;
          return <div key={`${r}-${c}`} style={{position: 'absolute', left: pad + c * m, top: pad + r * m, width: m + 0.6, height: m + 0.6, background: C.tinta, transform: `scale(${k})`}} />;
        }),
      )}
    </div>
  );
};

// Portada con la tipografía de la estética subida (grid.png): versalitas romanas finas y espaciadas,
// un filete y una cursiva pequeña; aparece como en una revista, sin papel.
export const PortadaGrid: React.FC<{w: number; en: number; antes: string; linea1: string; linea2: string; despues: string}> = ({w, en, antes, linea1, linea2, despues}) => {
  const f = useCurrentFrame();
  const a = (d: number, dur = 16) => SALE(acota((f - en - d) / dur));
  const romana = (tam: number, t: number): React.CSSProperties => ({
    fontFamily: 'Cinzel',
    fontWeight: 500,
    fontSize: tam,
    letterSpacing: `${0.06 + (1 - t) * 0.3}em`,
    color: '#F4EFE4',
    opacity: t,
    lineHeight: 1.05,
    textShadow: '0 2px 18px rgba(0,0,0,0.5)',
  });
  return (
    <div style={{position: 'absolute', left: 0, top: 70, width: w, textAlign: 'center'}}>
      <div style={{...romana(30, a(0)), letterSpacing: `${0.42 + (1 - a(0)) * 0.3}em`, fontWeight: 400}}>{antes}</div>
      <div style={{...romana(108, a(6, 22)), marginTop: 26}}>{linea1}</div>
      <div style={romana(108, a(12, 22))}>{linea2}</div>
      <div style={{width: 220 * a(20), height: 2, background: 'rgba(244,239,228,0.7)', margin: '28px auto 18px'}} />
      <div style={{fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 400, fontSize: 48, color: '#F4EFE4', opacity: a(24)}}>{despues}</div>
    </div>
  );
};

export {ENTRA, SALE, SUAVE};
