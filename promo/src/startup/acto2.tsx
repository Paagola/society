import React from 'react';
import {AbsoluteFill} from 'remotion';
import {b} from '../pizza/guion';
import {PantallaCarta} from '../pizza/carta';
import {AppFotos, MARCADOR, POS} from './acto1';
import {F, K, titular} from './estilo';
import {palabras, partir, salir, useLinea} from './gsap';
import {Fondo, MOVIL, Movil} from './ui';

// Acto 2 (tiempos 10-20): 3 DE CADA 4 miran la carta ANTES DE RESERVAR → NADIE VA a donde NO VE.
// El mismo móvil pasa de Fotos (ya sin la foto) a la carta del restaurante: los platos están, las fotos
// no. Tres de cuatro círculos se encienden. Después baja una persiana de lamas que encajan en la
// retícula del fondo y lo cierra todo.

const INICIO = 10;
const s = (k: number) => (b(INICIO + k) - b(INICIO)) / 30; // segundos desde el inicio del acto
const PANT = {w: MOVIL.w - 2 * MOVIL.borde, h: MOVIL.h - 2 * MOVIL.borde};
const LAMAS = 16; // 16 lamas de 120 px: caen justo sobre las líneas de la retícula

export const Lamas: React.FC = () => (
  <>
    {Array.from({length: LAMAS}, (_, i) => (
      <div
        key={i}
        className="lama"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: i * 120,
          height: 120,
          background: 'linear-gradient(180deg, #1D1D22 0%, #16161A 55%, #111114 100%)',
          boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.07), inset 0 -3px 0 rgba(0,0,0,0.55)',
        }}
      />
    ))}
  </>
);

export const Acto2: React.FC = () => {
  const raiz = useLinea((tl, q) => {
    // sale el titular del acto 1 y la pantalla cambia de app
    const viejo = partir(q('.t-movil')[0]);
    salir(tl, viejo, 0.02);
    tl.to(q('.numero'), {yPercent: -60, autoAlpha: 0, duration: 0.35, ease: 'power3.in'}, 0.02);
    tl.to(q('.app-fotos'), {xPercent: -35, autoAlpha: 0.3, duration: 0.45, ease: 'corte'}, 0.12);
    tl.fromTo(q('.app-carta'), {xPercent: 100}, {xPercent: 0, duration: 0.45, ease: 'corte'}, 0.12);
    // el dato
    const t1 = palabras(tl, q('.t-dato')[0], 0.3, 0.06);
    const t2 = palabras(tl, q('.t-carta')[0], s(1), 0.05);
    tl.fromTo(q('.circulo'), {scale: 0, autoAlpha: 0}, {scale: 1, autoAlpha: 1, duration: 0.45, stagger: 0.06, ease: 'back.out(1.8)'}, s(1) + 0.1);
    tl.fromTo(q('.circulo .lleno'), {scale: 0}, {scale: 1, duration: 0.3, stagger: 0.15, ease: 'back.out(2)'}, s(2));
    tl.fromTo(q('.fuente'), {autoAlpha: 0, y: 10}, {autoAlpha: 1, y: 0, duration: 0.4}, s(2) + 0.2);
    // la persiana: primero se va el dato, luego caen las lamas de abajo arriba
    salir(tl, t1, s(5) - 0.3);
    salir(tl, t2, s(5) - 0.28);
    tl.to([...q('.circulo'), ...q('.fuente')], {autoAlpha: 0, y: -30, duration: 0.3, stagger: 0.02, ease: 'power3.in'}, s(5) - 0.3);
    tl.fromTo(q('.lama').reverse(), {yPercent: -1700}, {yPercent: 0, duration: 0.55, stagger: 0.022, ease: 'cae'}, s(5));
    palabras(tl, q('.t-nadie1')[0], s(5) + 0.55, 0.07);
    palabras(tl, q('.t-nadie2')[0], s(6), 0.07);
    palabras(tl, q('.t-nadie3')[0], s(7), 0.07);
  });

  return (
    <AbsoluteFill ref={raiz}>
      <Fondo />
      <Movil style={{left: POS.x, top: POS.y}}>
        <div className="app-fotos" style={{position: 'absolute', inset: 0}}>
          <AppFotos />
        </div>
        <div className="app-carta" style={{position: 'absolute', inset: 0}}>
          <PantallaCarta w={PANT.w} h={PANT.h} scroll={[b(INICIO + 3) - b(INICIO), b(INICIO + 4) - b(INICIO)]} />
        </div>
      </Movil>
      {/* lo que queda del acto 1, en su sitio, para que salga */}
      <div className="t-movil" style={{position: 'absolute', left: 64, top: 150, ...titular(132)}}>
        En el móvil,
        <br />
        de
      </div>
      <div
        className="numero"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 330,
          textAlign: 'center',
          ...titular(800, 820),
          letterSpacing: '-0.07em',
          lineHeight: 1,
          transform: `translate(${MARCADOR.x}px, ${MARCADOR.y}px) scale(${MARCADOR.scale})`,
        }}
      >
        4
      </div>
      {/* el dato, con su fuente */}
      <div className="t-dato" style={{position: 'absolute', left: 64, top: 120, ...titular(150)}}>
        3 de cada 4
      </div>
      <div className="t-carta" style={{position: 'absolute', left: 66, top: 290, ...titular(76, 560), letterSpacing: '-0.03em', lineHeight: 1.08}}>
        miran la carta
        <br />
        antes de reservar.
      </div>
      <div style={{position: 'absolute', left: 64, top: 482, display: 'flex', gap: 22}}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="circulo" style={{width: 64, height: 64, borderRadius: 32, border: `4px solid ${K.blanco}`, position: 'relative'}}>
            {i < 3 && <div className="lleno" style={{position: 'absolute', inset: 6, borderRadius: 26, background: K.blanco}} />}
          </div>
        ))}
      </div>
      <div className="fuente" style={{position: 'absolute', left: 66, top: 574, fontFamily: F.mono, fontWeight: 500, fontSize: 28, color: K.gris, letterSpacing: '0.02em'}}>
        Fuente: TheFork lab · España · julio de 2026
      </div>
      {/* la persiana */}
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
    </AbsoluteFill>
  );
};
