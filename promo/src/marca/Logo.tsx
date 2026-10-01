import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {C, EASE_OUT, FONT, jitter, tween} from '../theme';
import {Rasgado} from '../pizza/piezas';

// Logotipo oficial de Society (Víctor, 27/09/2026): «Society» con cada letra recortada de un papel
// distinto (papel crudo, foto, tinta, mostaza, chapa, cobalto y blanco), como una nota de recortes, y
// debajo «tu agencia con IA» en la cursiva. Nació como firma de «La pizza que nadie vio». Va sobre tinta.
// Cada letra se pega en su golpe; con `paso` = 2 se mueve a saltos, como el resto de los vídeos de papel.

type Letra = {
  c: string;
  w: number;
  h: number;
  fondo: string | {src: string; w: number; x: number; y: number};
  color: string;
  fuente: string;
  it?: boolean;
  peso?: number;
  s: number;
  rot: number;
  dy: number;
  ty?: number; // ajuste óptico de la letra dentro de su recorte
};

const LETRAS: Letra[] = [
  {c: 'S', w: 176, h: 232, fondo: C.papel, color: C.cobalto, fuente: FONT.serif, it: true, peso: 900, s: 232, rot: -4, dy: -6, ty: -8},
  {c: 'o', w: 150, h: 176, fondo: {src: 'anuncio/foto-movil-pizza.jpg', w: 1100, x: 470, y: 380}, color: C.papel, fuente: FONT.display, s: 230, rot: 3, dy: 34, ty: -22},
  {c: 'c', w: 140, h: 180, fondo: '#141210', color: '#F6F1E9', fuente: 'Montserrat', peso: 700, s: 200, rot: -2, dy: 30, ty: -12},
  {c: 'i', w: 104, h: 234, fondo: C.mostaza, color: C.tinta, fuente: FONT.mono, peso: 700, s: 210, rot: 5, dy: -8, ty: -2},
  {c: 'e', w: 150, h: 180, fondo: {src: 'pizza/persiana/chapa.png', w: 1080, x: 250, y: 610}, color: C.papel, fuente: FONT.serif, it: true, peso: 900, s: 200, rot: -5, dy: 32, ty: -16},
  {c: 't', w: 124, h: 230, fondo: C.cobalto, color: C.papel, fuente: FONT.ui, peso: 800, s: 214, rot: 3, dy: -4, ty: -4},
  {c: 'y', w: 150, h: 244, fondo: '#FFFFFF', color: C.tinta, fuente: FONT.serif, it: true, peso: 900, s: 226, rot: -3, dy: 40, ty: -30},
];

const SOLAPE = 10;
export const ANCHO_LOGO = LETRAS.reduce((a, l) => a + l.w, 0) - SOLAPE * (LETRAS.length - 1);

// Centro y tamaño de cada letra en el cuadro (para que otras piezas vayan a convertirse en ellas).
export const letrasLogo = (cx = 540, cy = 860, escala = 1) => {
  let x = -ANCHO_LOGO / 2;
  return LETRAS.map((l) => {
    const c = {x: cx + escala * (x + l.w / 2), y: cy + escala * l.dy, w: escala * l.w, h: escala * l.h};
    x += l.w - SOLAPE;
    return c;
  });
};

export const LogoSociety: React.FC<{
  en: number; // primera letra
  lema?: number | null; // «tu agencia con IA»; null = sin lema
  cx?: number; // centro de las letras
  cy?: number;
  escala?: number;
  paso?: number; // 1 = continuo; 2 = stop-motion
  lemaTexto?: string;
  lemaTam?: number; // el lema parte en líneas si no cabe en 1000 px
  lemaColor?: string;
  temblor?: boolean; // las letras ya pegadas tiemblan un pelo
}> = ({en, lema = null, cx = 540, cy = 860, escala = 1, paso = 1, lemaTexto = 'tu agencia con IA', lemaTam = 88, lemaColor = C.papel, temblor = true}) => {
  const f = Math.floor(useCurrentFrame() / paso) * paso;
  let x = -ANCHO_LOGO / 2;
  const pl = lema === null ? 0 : tween(f, lema, lema + 9, [0, 1], EASE_OUT);
  return (
    <AbsoluteFill style={{transform: `translate(${cx}px, ${cy}px) scale(${escala})`, transformOrigin: '0 0'}}>
      {LETRAS.map((l, i) => {
        const x0 = x;
        x += l.w - SOLAPE;
        const t0 = en + i * 3;
        if (f < t0) return null;
        const p = tween(f, t0, t0 + 4, [0, 1], EASE_OUT);
        const quieto = temblor && f > t0 + 4;
        return (
          <Rasgado
            key={i}
            mascara={`letra-${i}`}
            w={l.w}
            h={l.h}
            style={{
              left: x0 + (quieto ? jitter(f, i + 1, 1, 4) : 0),
              top: -l.h / 2 + l.dy + (quieto ? jitter(f, i + 9, 1, 4) : 0),
              transform: `rotate(${l.rot + (1 - p) * 8 * (i % 2 ? 1 : -1)}deg) scale(${1 + (1 - p) * 0.35})`,
              zIndex: i % 2 ? 2 : 1,
            }}
          >
            {typeof l.fondo === 'string' ? (
              <AbsoluteFill style={{background: l.fondo}} />
            ) : (
              <Img src={staticFile(l.fondo.src)} style={{position: 'absolute', width: l.fondo.w, left: -l.fondo.x, top: -l.fondo.y}} />
            )}
            {typeof l.fondo === 'string' && l.fondo !== '#FFFFFF' && (
              <Img
                src={staticFile(l.fondo === '#141210' ? 'img/papel-oscuro.png' : 'img/papel.png')}
                style={{position: 'absolute', width: 780, left: -100 * i, top: -60 * i, mixBlendMode: l.fondo === '#141210' ? 'screen' : 'multiply', opacity: 0.45}}
              />
            )}
            <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <span
                style={{
                  fontFamily: l.fuente,
                  fontStyle: l.it ? 'italic' : 'normal',
                  fontWeight: l.peso ?? 400,
                  fontSize: l.s,
                  lineHeight: 1,
                  color: l.color,
                  transform: `translateY(${l.ty ?? 0}px)`,
                }}
              >
                {l.c}
              </span>
            </AbsoluteFill>
          </Rasgado>
        );
      })}
      {lema !== null && (
        <div
          style={{
            position: 'absolute',
            top: 220,
            left: -500,
            width: 1000,
            textAlign: 'center',
            lineHeight: 1.12,
            fontFamily: FONT.serif,
            fontStyle: 'italic',
            fontWeight: 800,
            fontSize: lemaTam,
            color: lemaColor,
            letterSpacing: '-0.03em',
            opacity: pl,
            transform: `translateY(${(1 - pl) * 24}px)`,
            filter: 'url(#tinta)',
          }}
        >
          {lemaTexto}
        </div>
      )}
    </AbsoluteFill>
  );
};
