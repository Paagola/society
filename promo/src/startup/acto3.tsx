import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {b} from '../pizza/guion';
import {Lamas} from './acto2';
import {F, K, titular} from './estilo';
import {palabras, partir, salir, useLinea} from './gsap';
import {Fondo, Icono, ICONO, Pildora} from './ui';

// Acto 3 (tiempos 20-32): LA MISMA foto → proceso → POR FIN, A SU ALTURA.
// Sube la persiana y aparece el azul de Society. La foto borrada vuelve y aterriza como tarjeta. El
// proceso se ve paso a paso: encuadre (la ventana pasa a vertical sobre la pizza), luz (un deslizador de
// antes y después que se para a medias para que se note la diferencia) y color. Al final la ventana se
// abre a pantalla completa y queda la misma pizza con luz de estudio.

const INICIO = 20;
const s = (k: number) => (b(INICIO + k) - b(INICIO)) / 30;

// La foto del móvil, colocada para que su pizza caiga en el sitio y con el tamaño de la de estudio.
const CASADA = {w: 1665, h: 1249, x: 494, y: 832};
// Ventanas: la tarjeta 4:3 del principio, la vertical del encuadre y la pantalla entera.
const TARJETA = {l: 110, t: 858, r: 110, b: 418};
const VERTICAL = {l: 150, t: 330, r: 150, b: 615};
const px = (v: number) => `${v}px`;

export const Acto3: React.FC = () => {
  const raiz = useLinea((tl, q) => {
    const r = q('.escena')[0];
    // sube la persiana y se va el titular del acto 2
    const viejo = [partir(q('.t-nadie1')[0]), partir(q('.t-nadie2')[0]), partir(q('.t-nadie3')[0])];
    viejo.forEach((v, i) => salir(tl, v, 0.02 * i));
    tl.to(q('.lama'), {yPercent: -1700, duration: 0.5, stagger: 0.018, ease: 'power3.in'}, 0.05);
    // vuelve la foto borrada y aterriza como tarjeta
    tl.fromTo(q('.tarjeta'), {y: 1250, rotation: 7}, {y: 0, rotation: 0, duration: 0.7, ease: 'back.out(1.15)'}, s(1) - 0.45);
    const a = palabras(tl, q('.t-misma')[0], s(2), 0.08);
    // 1 · encuadre: la ventana pasa a vertical y la foto crece hasta casar con la de estudio
    const p0 = s(5);
    salir(tl, a, p0 - 0.1);
    tl.fromTo(q('.pildora'), {autoAlpha: 0, y: 40}, {autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.07}, p0);
    tl.to(r, {'--l': px(VERTICAL.l), '--t': px(VERTICAL.t), '--r': px(VERTICAL.r), '--b': px(VERTICAL.b), '--rad': '44px', duration: 0.75, ease: 'corte'}, p0 + 0.15);
    tl.to(q('.movil-foto'), {x: 0, y: 0, scale: 1, duration: 0.75, ease: 'corte'}, p0 + 0.15);
    tl.to(q('.p1 .relleno'), {scaleX: 1, duration: 0.35, ease: 'corte'}, p0 + 0.7);
    tl.to(q('.p1 .nombre'), {color: K.azul, duration: 0.2}, p0 + 0.8);
    // 2 · luz: el deslizador recorre la foto, se para a medias y termina
    const p1 = s(6);
    tl.to(q('.p2 .relleno'), {scaleX: 1, duration: 0.35, ease: 'corte'}, p1);
    tl.to(q('.p2 .nombre'), {color: K.azul, duration: 0.2}, p1 + 0.1);
    tl.fromTo(q('.comparar'), {autoAlpha: 0}, {autoAlpha: 1, duration: 0.2}, p1);
    tl.fromTo(r, {'--x': px(1080 - VERTICAL.r)}, {'--x': px(540), duration: 0.45, ease: 'power3.out'}, p1 + 0.05);
    tl.to(r, {'--x': px(VERTICAL.l), duration: 0.4, ease: 'power3.in'}, p1 + 0.85);
    // 3 · color
    tl.to(q('.p3 .relleno'), {scaleX: 1, duration: 0.35, ease: 'corte'}, s(7) + 0.25);
    tl.to(q('.p3 .nombre'), {color: K.azul, duration: 0.2}, s(7) + 0.35);
    // la ventana se abre a pantalla completa: por fin, a su altura
    const p2 = s(8);
    tl.to([...q('.pildora'), ...q('.comparar')], {autoAlpha: 0, duration: 0.25, stagger: 0.03}, p2 - 0.05);
    tl.to(r, {'--l': '0px', '--t': '0px', '--r': '0px', '--b': '0px', '--rad': '0px', '--x': '0px', duration: 0.6, ease: 'corte'}, p2);
    tl.to(q('.sombra-tarjeta'), {autoAlpha: 0, duration: 0.3}, p2 + 0.3);
    tl.fromTo(q('.degradado'), {autoAlpha: 0}, {autoAlpha: 1, duration: 0.4}, p2 + 0.3);
    tl.fromTo(q('.estudio'), {scale: 1}, {scale: 1.05, duration: s(12) - p2, ease: 'none'}, p2);
    palabras(tl, q('.t-porfin')[0], p2 + 0.35, 0.07);
    palabras(tl, q('.t-altura')[0], s(9), 0.07);
  });

  const estiloVar = {
    '--l': px(TARJETA.l),
    '--t': px(TARJETA.t),
    '--r': px(TARJETA.r),
    '--b': px(TARJETA.b),
    '--rad': '36px',
    '--x': px(1080 - VERTICAL.r),
  } as React.CSSProperties;

  return (
    <AbsoluteFill ref={raiz}>
      <Fondo color={K.azul} halo="rgba(90,120,255,0.55)" />
      <AbsoluteFill className="escena" style={estiloVar}>
        <AbsoluteFill className="tarjeta">
          <div
            className="sombra-tarjeta"
            style={{position: 'absolute', left: 'var(--l)', top: 'var(--t)', right: 'var(--r)', bottom: 'var(--b)', borderRadius: 'var(--rad)', boxShadow: '0 50px 110px rgba(5,10,60,0.55)'}}
          />
          <AbsoluteFill style={{clipPath: 'inset(var(--t) var(--r) var(--b) var(--l) round var(--rad))'}}>
            {/* la foto del móvil, reducida a tarjeta 4:3 al principio */}
            <div
              className="movil-foto"
              style={{
                position: 'absolute',
                left: CASADA.x - CASADA.w / 2,
                top: CASADA.y - CASADA.h / 2,
                width: CASADA.w,
                height: CASADA.h,
                transform: `translate(${540 - CASADA.x}px, ${1180 - CASADA.y}px) scale(${860 / CASADA.w})`,
              }}
            >
              <Img src={staticFile('anuncio/foto-movil-pizza.jpg')} style={{width: '100%', height: '100%'}} />
            </div>
            {/* la misma pizza con luz de estudio, que asoma a la derecha del deslizador */}
            <AbsoluteFill style={{clipPath: 'inset(0 0 0 var(--x))'}}>
              <Img className="estudio" src={staticFile('pizza/estudio-hoja.png')} style={{position: 'absolute', left: 0, top: -45, width: 1080, height: 1990, transformOrigin: '50% 62%'}} />
            </AbsoluteFill>
          </AbsoluteFill>
          {/* deslizador de antes y después */}
          <AbsoluteFill className="comparar" style={{opacity: 0, visibility: 'hidden'}}>
            <div style={{position: 'absolute', left: 'calc(var(--x) - 3px)', top: 'var(--t)', bottom: 'var(--b)', width: 6, background: K.blanco, boxShadow: '0 0 20px rgba(0,0,0,0.35)'}} />
            <div
              style={{
                position: 'absolute',
                left: 'calc(var(--x) - 52px)',
                top: 'calc(var(--t) + (1920px - var(--t) - var(--b)) / 2 - 52px)',
                width: 104,
                height: 104,
                borderRadius: 52,
                background: K.blanco,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
              }}
            >
              <Icono d="M15 6l-6 6 6 6" s={40} color={K.azul} ancho={3} />
              <Icono d="M9 6l6 6-6 6" s={40} color={K.azul} ancho={3} />
            </div>
            {[
              {t: 'Antes', lado: {left: 'calc(var(--l) + 26px)'}},
              {t: 'Después', lado: {right: 'calc(var(--r) + 26px)'}},
            ].map((e) => (
              <div
                key={e.t}
                style={{
                  position: 'absolute',
                  top: 'calc(var(--t) + 26px)',
                  ...e.lado,
                  padding: '12px 26px',
                  borderRadius: 30,
                  background: 'rgba(10,10,12,0.6)',
                  fontFamily: F.sans,
                  fontWeight: 650,
                  fontSize: 34,
                  color: K.blanco,
                  letterSpacing: '-0.01em',
                }}
              >
                {e.t}
              </div>
            ))}
          </AbsoluteFill>
        </AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill className="degradado" style={{background: 'linear-gradient(180deg, rgba(8,8,10,0.75) 0%, rgba(8,8,10,0) 42%)', opacity: 0, visibility: 'hidden'}} />
      {/* pasos del proceso */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1360, display: 'flex', justifyContent: 'center', gap: 22}}>
        <div className="pildora p1">
          <Pildora texto="Encuadre" />
        </div>
        <div className="pildora p2">
          <Pildora texto="Luz" />
        </div>
        <div className="pildora p3">
          <Pildora texto="Color" />
        </div>
      </div>
      {/* lo que queda del acto 2 y los titulares de este */}
      <Lamas />
      <div style={{position: 'absolute', left: 64, top: 600}}>
        <div className="t-nadie1" style={titular(190)}>
          Nadie va
        </div>
        <div className="t-nadie2" style={titular(190)}>
          a donde
        </div>
        <div className="t-nadie3" style={titular(190)}>
          no ve.
        </div>
      </div>
      <div className="t-misma" style={{position: 'absolute', left: 64, top: 330, ...titular(190)}}>
        La misma
        <br />
        foto.
      </div>
      <div style={{position: 'absolute', left: 64, top: 170}}>
        <div className="t-porfin" style={titular(170)}>
          Por fin,
        </div>
        <div className="t-altura" style={titular(170)}>
          a su altura.
        </div>
      </div>
    </AbsoluteFill>
  );
};
