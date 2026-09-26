import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {b} from '../pizza/guion';
import {F, K, titular} from './estilo';
import {palabras, SplitText, useLinea} from './gsap';
import {Fondo} from './ui';

// Acto 5 (tiempos 46-57): PUBLICA menos, LLENA MÁS. → firma.
// Sobre azul, el cartel de la marca y las tres piezas que han salido de una sola foto, en abanico. El
// subrayado amarillo de «llena más» es el único amarillo de la pieza. Firma: cada letra de «Society» es
// una ventana a una foto del anuncio (la marca está hecha de tus fotos) y luego se vuelve blanca.

const INICIO = 46;
const s = (k: number) => (b(INICIO + k) - b(INICIO)) / 30;

const PIEZAS = [
  {src: 'pizza/a1/base/040.jpg', w: 300, h: 533, x: 110, y: 1180, rot: -8},
  {src: 'anuncio/lamina-01.jpg', w: 380, h: 475, x: 350, y: 1150, rot: 0},
  {src: 'pizza/paella/030.jpg', w: 300, h: 533, x: 670, y: 1180, rot: 8},
];

// Una foto distinta dentro de cada letra de la firma.
const FOTOS = [
  'anuncio/foto-movil-pizza.jpg',
  'anuncio/pizza-estudio.jpg',
  'anuncio/lamina-01.jpg',
  'pizza/paella/030.jpg',
  'pizza/a1/base/030.jpg',
  'anuncio/sala-noche.jpg',
  'anuncio/lamina-03.jpg',
];

export const Acto5: React.FC = () => {
  const raiz = useLinea((tl, q) => {
    palabras(tl, q('.t-publica')[0], 0.02, 0.07);
    palabras(tl, q('.t-menos')[0], s(0.5), 0.07);
    palabras(tl, q('.t-llena')[0], s(1), 0.07);
    tl.fromTo(q('.subrayado'), {drawSVG: '0%'}, {drawSVG: '100%', duration: 0.45, ease: 'power2.inOut'}, s(1) + 0.4);
    tl.fromTo(q('.pieza'), {y: 900, rotation: 0}, {y: 0, rotation: (i) => PIEZAS[i].rot, duration: 0.7, stagger: 0.09, ease: 'back.out(1.2)'}, s(2));
    // pase a la firma
    tl.to(q('.pagina-publica'), {yPercent: -100, duration: 0.55, ease: 'corte'}, s(6) - 0.1);
    tl.fromTo(q('.pagina-firma'), {yPercent: 100}, {yPercent: 0, duration: 0.55, ease: 'corte'}, s(6) - 0.1);
    const foto = SplitText.create(q('.firma-foto')[0], {type: 'chars'});
    const blanca = SplitText.create(q('.firma-blanca')[0], {type: 'chars'});
    foto.chars.forEach((c, i) => {
      Object.assign((c as HTMLElement).style, {
        backgroundImage: `url(${staticFile(FOTOS[i % FOTOS.length])})`,
        backgroundSize: 'cover',
        backgroundPosition: '50% 55%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      });
    });
    tl.fromTo(foto.chars, {yPercent: 110, autoAlpha: 0}, {yPercent: 0, autoAlpha: 1, duration: 0.6, stagger: 0.05, ease: 'entra'}, s(6) + 0.3);
    tl.fromTo(blanca.chars, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.25, stagger: 0.05, ease: 'power1.inOut'}, s(8));
    tl.fromTo(q('.lema'), {autoAlpha: 0, y: 24}, {autoAlpha: 1, y: 0, duration: 0.5}, s(8) + 0.35);
  });

  return (
    <AbsoluteFill ref={raiz}>
      <AbsoluteFill className="pagina-publica">
        <Fondo color={K.azul} halo="rgba(90,120,255,0.5)" />
        <div style={{position: 'absolute', left: 64, top: 180}}>
          <div className="t-publica" style={titular(230)}>
            Publica
          </div>
          <div className="t-menos" style={titular(230)}>
            menos,
          </div>
          <div className="t-llena" style={{...titular(230), position: 'relative'}}>
            llena más.
            <svg width={560} height={60} viewBox="0 0 560 60" style={{position: 'absolute', left: 430, top: 200}}>
              <path className="subrayado" d="M8 38 C 140 18, 300 16, 552 30" fill="none" stroke={K.amarillo} strokeWidth={16} strokeLinecap="round" />
            </svg>
          </div>
        </div>
        {PIEZAS.map((p, i) => (
          <div
            key={i}
            className="pieza"
            style={{position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h, borderRadius: 30, overflow: 'hidden', boxShadow: '0 40px 80px rgba(5,10,60,0.5), 0 0 0 2px rgba(255,255,255,0.18)'}}
          >
            <Img src={staticFile(p.src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
        ))}
      </AbsoluteFill>

      <AbsoluteFill className="pagina-firma">
        <Fondo />
        <div style={{position: 'absolute', left: 0, right: 0, top: 690, display: 'flex', justifyContent: 'center'}}>
          <div style={{position: 'relative'}}>
            <div className="firma-foto" style={{...titular(290, 820), letterSpacing: '-0.06em'}}>
              Society
            </div>
            <div className="firma-blanca" style={{position: 'absolute', left: 0, top: 0, ...titular(290, 820), letterSpacing: '-0.06em'}}>
              Society
            </div>
          </div>
        </div>
        <div className="lema" style={{position: 'absolute', left: 0, right: 0, top: 1040, textAlign: 'center', fontFamily: F.sans, fontWeight: 500, fontSize: 70, letterSpacing: '-0.03em', color: K.gris}}>
          tu agencia con IA
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
