import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile} from 'remotion';
import {b, REEL} from '../pizza/guion';
import {Historia} from '../pizza/formatos';
import {F, K, titular} from './estilo';
import {palabras, partir, salir, useLinea} from './gsap';
import {Fondo, Icono, ICONO} from './ui';

// Acto 4 (tiempos 32-46): UN REEL. → UN CARRUSEL. → UNA HISTORIA.
// La foto de estudio se encoge hasta una tarjeta vertical y empieza el reel real de Da Tonino, con su
// interfaz. El reel se va deslizando y entra el carrusel en anillo (la referencia de Víctor) sobre azul.
// Para la historia se dibuja el aro de historias de Instagram y se abre hasta la historia publicada.

const INICIO = 32;
const s = (k: number) => (b(INICIO + k) - b(INICIO)) / 30;
const f = (k: number) => b(INICIO + k) - b(INICIO);
const CARTA = {l: 170, t: 440, w: 740, h: 1316};
const px = (v: number) => `${v}px`;
const LAMINAS = ['anuncio/lamina-01.jpg', 'anuncio/lamina-02.jpg', 'anuncio/lamina-03.jpg', 'anuncio/lamina-07.jpg'];

// Interfaz de Reels: iconos a la derecha y la cuenta abajo.
const UIReel: React.FC = () => (
  <AbsoluteFill>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0) 62%, rgba(0,0,0,0.55) 100%)'}} />
    <div style={{position: 'absolute', right: 26, bottom: 150, display: 'flex', flexDirection: 'column', gap: 34, alignItems: 'center'}}>
      {[ICONO.corazon, ICONO.comentario, ICONO.enviar].map((d, i) => (
        <Icono key={i} d={d} s={62} ancho={2.2} />
      ))}
    </div>
    <div style={{position: 'absolute', left: 28, bottom: 56, display: 'flex', alignItems: 'center', gap: 18, fontFamily: F.sans, color: '#fff'}}>
      <Img src={staticFile('pizza/avatar-sala.jpg')} style={{width: 70, height: 70, borderRadius: 35, border: '2px solid #fff'}} />
      <div>
        <div style={{fontWeight: 700, fontSize: 32}}>Da Tonino</div>
        <div style={{fontWeight: 500, fontSize: 24, opacity: 0.8}}>♫ Audio original</div>
      </div>
    </div>
  </AbsoluteFill>
);

export const Acto4: React.FC = () => {
  const raiz = useLinea((tl, q) => {
    const r = q('.escena')[0];
    salir(tl, partir(q('.t-porfin')[0]), 0);
    salir(tl, partir(q('.t-altura')[0]), 0.04);
    tl.to(q('.degradado'), {autoAlpha: 0, duration: 0.4}, 0.1);
    // la foto de estudio se encoge hasta la tarjeta del reel
    tl.to(r, {'--l': px(CARTA.l), '--t': px(CARTA.t), '--r': px(1080 - CARTA.l - CARTA.w), '--b': px(1920 - CARTA.t - CARTA.h), '--rad': '48px', duration: 0.65, ease: 'corte'}, 0);
    tl.fromTo(q('.sombra-reel'), {autoAlpha: 0}, {autoAlpha: 1, duration: 0.4}, 0.3);
    tl.fromTo(q('.ui-reel'), {autoAlpha: 0}, {autoAlpha: 1, duration: 0.3}, s(1));
    palabras(tl, q('.t-reel')[0], 0.25, 0.08);
    // pase al carrusel: el reel sale a la izquierda y entra la página azul por la derecha
    tl.to(q('.pagina-reel'), {x: -1160, duration: 0.5, ease: 'corte'}, s(4) - 0.08);
    tl.fromTo(q('.pagina-carrusel'), {x: 1080}, {x: 0, duration: 0.5, ease: 'corte'}, s(4) - 0.08);
    palabras(tl, q('.t-carrusel')[0], s(4) + 0.25, 0.08);
    const anillo = q('.anillo')[0];
    tl.set(anillo, {z: -1000, rotationY: 90}, 0);
    tl.to(anillo, {rotationY: 0, duration: 0.8, ease: 'entra'}, s(4) - 0.08);
    [5, 6, 7, 8].forEach((k) => tl.to(anillo, {rotationY: `-=${360 / 8}`, duration: 0.42, ease: 'corte'}, s(k) - 0.1));
    tl.fromTo(q('.desliza'), {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0, duration: 0.4}, s(5));
    // pase a la historia: se dibuja el aro y se abre la historia
    tl.fromTo(q('.pagina-historia'), {autoAlpha: 0}, {autoAlpha: 1, duration: 0.01}, s(9));
    tl.fromTo(q('.aro-trazo'), {drawSVG: '0%'}, {drawSVG: '100%', duration: 0.4, ease: 'power2.inOut'}, s(9) + 0.02);
    tl.fromTo(q('.aro'), {scale: 0.6, autoAlpha: 0}, {scale: 1, autoAlpha: 1, duration: 0.3}, s(9));
    tl.to(q('.aro'), {autoAlpha: 0, scale: 1.4, duration: 0.25, ease: 'power2.in'}, s(9) + 0.45);
    tl.fromTo(
      q('.ventana-historia'),
      {width: 180, height: 180, left: 540 - 90, top: 1040 - 90, borderRadius: 90},
      {width: CARTA.w, height: CARTA.h, left: CARTA.l, top: CARTA.t, borderRadius: 48, duration: 0.6, ease: 'corte'},
      s(9) + 0.42,
    );
    palabras(tl, q('.t-historia')[0], s(9) + 0.3, 0.08);
  });

  const estiloVar = {'--l': '0px', '--t': '0px', '--r': '0px', '--b': '0px', '--rad': '0px'} as React.CSSProperties;
  const cortes = [f(1), f(2), f(3), f(4) + 20];

  return (
    <AbsoluteFill ref={raiz}>
      {/* UN REEL. */}
      <AbsoluteFill className="pagina-reel">
        <Fondo />
        <AbsoluteFill className="escena" style={estiloVar}>
          <div
            className="sombra-reel"
            style={{position: 'absolute', left: 'var(--l)', top: 'var(--t)', right: 'var(--r)', bottom: 'var(--b)', borderRadius: 'var(--rad)', boxShadow: '0 60px 120px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,255,255,0.12)'}}
          />
          <AbsoluteFill style={{clipPath: 'inset(var(--t) var(--r) var(--b) var(--l) round var(--rad))'}}>
            <Img src={staticFile('pizza/estudio-hoja.png')} style={{position: 'absolute', left: 0, top: -45, width: 1080, height: 1990, transform: 'scale(1.05)', transformOrigin: '50% 62%'}} />
            <div style={{position: 'absolute', left: CARTA.l, top: CARTA.t, width: CARTA.w, height: CARTA.h}}>
              {REEL.slice(0, 3).map((desde, i) => (
                <Sequence key={i} from={cortes[i]} durationInFrames={cortes[i + 1] - cortes[i]} premountFor={30}>
                  <OffthreadVideo src={staticFile('video/reel-v6.mp4')} startFrom={Math.round(desde * 30)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                </Sequence>
              ))}
              <div className="ui-reel" style={{position: 'absolute', inset: 0, opacity: 0, visibility: 'hidden'}}>
                <UIReel />
              </div>
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
        <AbsoluteFill className="degradado" style={{background: 'linear-gradient(180deg, rgba(8,8,10,0.75) 0%, rgba(8,8,10,0) 42%)'}} />
        <div style={{position: 'absolute', left: 64, top: 170}}>
          <div className="t-porfin" style={titular(170)}>
            Por fin,
          </div>
          <div className="t-altura" style={titular(170)}>
            a su altura.
          </div>
        </div>
        <div className="t-reel" style={{position: 'absolute', left: 64, top: 180, ...titular(190)}}>
          Un reel.
        </div>
      </AbsoluteFill>

      {/* UN CARRUSEL. */}
      <AbsoluteFill className="pagina-carrusel" style={{overflow: 'hidden'}}>
        <Fondo color={K.azul} halo="rgba(90,120,255,0.5)" />
        <div style={{position: 'absolute', left: 540, top: 1060, width: 0, height: 0, perspective: 2100, perspectiveOrigin: '0px 1100px'}}>
          <div className="anillo" style={{position: 'absolute', transformStyle: 'preserve-3d'}}>
            {Array.from({length: 8}, (_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: -360,
                  top: -450,
                  width: 720,
                  height: 900,
                  borderRadius: 30,
                  overflow: 'hidden',
                  transform: `rotateY(${i * 45}deg) translateZ(1000px)`,
                  backfaceVisibility: 'hidden',
                  boxShadow: '0 0 0 2px rgba(255,255,255,0.15)',
                }}
              >
                <Img src={staticFile(LAMINAS[i % 4])} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
            ))}
          </div>
        </div>
        <div
          className="desliza"
          style={{
            position: 'absolute',
            top: 1590,
            left: 540,
            transform: 'translateX(-50%)',
            height: 112,
            padding: '0 50px',
            borderRadius: 56,
            border: `3px solid ${K.blanco}`,
            background: 'rgba(255,255,255,0.14)',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            fontFamily: F.sans,
            fontWeight: 700,
            fontSize: 52,
            color: K.blanco,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            opacity: 0,
            visibility: 'hidden',
          }}
        >
          Desliza
          <Icono d="M4 12h15 M13 6l6 6-6 6" s={52} color={K.blanco} ancho={2.6} />
        </div>
        <div className="t-carrusel" style={{position: 'absolute', left: 64, top: 180, ...titular(168)}}>
          Un carrusel.
        </div>
      </AbsoluteFill>

      {/* UNA HISTORIA. */}
      <AbsoluteFill className="pagina-historia" style={{opacity: 0, visibility: 'hidden'}}>
        <Fondo />
        <div className="ventana-historia" style={{position: 'absolute', overflow: 'hidden', boxShadow: '0 60px 120px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,255,255,0.12)'}}>
          <div style={{position: 'absolute', left: '50%', top: '50%', width: CARTA.w, height: CARTA.h, marginLeft: -CARTA.w / 2, marginTop: -CARTA.h / 2}}>
            <Sequence from={f(9)} layout="none">
              <Historia w={CARTA.w} h={CARTA.h} dur={f(14) - f(9)} />
            </Sequence>
          </div>
        </div>
        <div className="aro" style={{position: 'absolute', left: 540 - 130, top: 1040 - 130, width: 260, height: 260}}>
          <svg width={260} height={260} viewBox="0 0 260 260" style={{position: 'absolute', inset: 0}}>
            <defs>
              <linearGradient id="aroIG" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#F5C518" />
                <stop offset="0.5" stopColor="#FF3D6E" />
                <stop offset="1" stopColor="#8A3DFF" />
              </linearGradient>
            </defs>
            <circle className="aro-trazo" cx={130} cy={130} r={118} fill="none" stroke="url(#aroIG)" strokeWidth={10} strokeLinecap="round" transform="rotate(-90 130 130)" />
          </svg>
          <Img src={staticFile('pizza/avatar-sala.jpg')} style={{position: 'absolute', left: 30, top: 30, width: 200, height: 200, borderRadius: 100}} />
        </div>
        <div className="t-historia" style={{position: 'absolute', left: 64, top: 180, ...titular(170)}}>
          Una historia.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
