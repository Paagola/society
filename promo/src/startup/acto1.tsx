import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {b} from '../pizza/guion';
import {F, K, titular} from './estilo';
import {palabras, salir, useLinea} from './gsap';
import {Estado, Fondo, Icono, ICONO, MOVIL, Movil} from './ui';

// Acto 1 (tiempos 0-10): ESTA PIZZA es de 10 → EN EL MÓVIL, de 4.
// La pizza real va a cámara lenta y el «10» queda detrás de las hojas que caen. Clic: la imagen se
// congela y la cámara se aleja hasta que es la pantalla de un móvil; el número baja contando hasta 4 y en
// la pantalla aparece la foto que de verdad hay en el móvil. El hostelero la borra: a la papelera.

const s = (k: number) => b(k) / 30; // segundos desde el inicio del acto (empieza en el tiempo 0)
const CLIC = b(4);
export const POS = {x: 260, y: 650}; // esquina del móvil
// dónde acaba el marcador «4»: a la derecha del titular, con la altura de sus dos líneas
export const MARCADOR = {x: 330, y: -468, scale: 0.44};
const PANT = {w: MOVIL.w - 2 * MOVIL.borde, h: MOVIL.h - 2 * MOVIL.borde};
const FOTO = {w: PANT.w, h: Math.round((PANT.w * 510) / 680)};
const PAPELERA = {x: 452, y: PANT.h - 78};

const Toque: React.FC<{className: string; x: number; y: number}> = ({className, x, y}) => (
  <div
    className={className}
    style={{position: 'absolute', left: x - 60, top: y - 60, width: 120, height: 120, borderRadius: 60, background: 'rgba(255,255,255,0.35)', opacity: 0}}
  />
);

// La app de Fotos con la foto del móvil y la hoja para borrarla; en el acto 2, ya vacía.
export const AppFotos: React.FC<{conFoto?: boolean}> = ({conFoto = false}) => (
  <AbsoluteFill style={{background: '#000'}}>
    <Estado />
    <div style={{position: 'absolute', top: 96, left: 30, right: 30, display: 'flex', alignItems: 'center', fontFamily: F.sans, color: '#fff'}}>
      <Icono d={ICONO.atras} s={46} color="#0A84FF" ancho={2.6} />
      <div style={{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
        <div style={{fontWeight: 700, fontSize: 34}}>Hoy</div>
        <div style={{fontWeight: 500, fontSize: 24, opacity: 0.7}}>21:34</div>
      </div>
      <span style={{fontWeight: 500, fontSize: 32, color: '#0A84FF'}}>Editar</span>
    </div>
    {conFoto && (
      <div className="foto" style={{position: 'absolute', left: 0, top: (PANT.h - FOTO.h) / 2, width: FOTO.w, height: FOTO.h}}>
        <Img src={staticFile('anuncio/foto-movil-pizza.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>
    )}
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 42, display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
      <Icono d={ICONO.compartir} s={50} color="#0A84FF" />
      <Icono d={ICONO.corazon} s={50} color="#0A84FF" />
      <Icono d={ICONO.info} s={50} color="#0A84FF" />
      <div className="papelera">
        <Icono d={ICONO.papelera} s={50} color="#0A84FF" />
      </div>
    </div>
    {conFoto && (
      <>
        <div className="hoja" style={{position: 'absolute', left: 18, right: 18, bottom: 22}}>
          <div style={{borderRadius: 30, background: '#2C2C30', padding: '26px 0', textAlign: 'center', fontFamily: F.sans}}>
            <div style={{fontSize: 24, color: 'rgba(255,255,255,0.55)', paddingBottom: 22, borderBottom: '1px solid rgba(255,255,255,0.12)'}}>
              Esta foto se eliminará.
            </div>
            <div style={{fontSize: 38, fontWeight: 600, color: '#FF453A', paddingTop: 24}}>Eliminar foto</div>
          </div>
          <div
            style={{
              marginTop: 14,
              borderRadius: 30,
              background: '#2C2C30',
              padding: '26px 0',
              textAlign: 'center',
              fontFamily: F.sans,
              fontSize: 38,
              fontWeight: 700,
              color: '#0A84FF',
            }}
          >
            Cancelar
          </div>
        </div>
        <Toque className="toque1" x={PAPELERA.x} y={PAPELERA.y} />
        <Toque className="toque2" x={PANT.w / 2} y={PANT.h - 182} />
      </>
    )}
  </AbsoluteFill>
);

export const Acto1: React.FC = () => {
  const f = useCurrentFrame();
  const n = String(Math.min(53, f)).padStart(3, '0');
  // el marcador baja de 10 a 4 justo después del clic, una unidad por fotograma y medio
  const valor = f < CLIC + 3 ? 10 : Math.round(interpolate(f, [CLIC + 3, CLIC + 12], [10, 4], {extrapolateRight: 'clamp'}));

  const raiz = useLinea((tl, q) => {
    const t1 = q('.t-esta')[0];
    const t2 = q('.t-movil')[0];
    const a = palabras(tl, t1, 0.02, 0.07);
    tl.fromTo(q('.numero'), {scale: 0.55, autoAlpha: 0}, {scale: 1, autoAlpha: 1, duration: 0.8}, s(1) - 0.1);
    // clic: parpadeo del obturador y la imagen congelada dentro del móvil
    const c = CLIC / 30;
    tl.set(q('.parpadeo'), {autoAlpha: 1}, c).set(q('.parpadeo'), {autoAlpha: 0}, c + 2 / 30);
    tl.set([q('.video'), q('.hojas')], {autoAlpha: 0}, c + 1 / 30);
    tl.set(q('.movil'), {autoAlpha: 1}, c + 1 / 30);
    tl.fromTo(q('.movil'), {y: -255, scale: (1080 / PANT.w) * 1.01}, {y: 0, scale: 1, duration: 0.75, ease: 'corte'}, c + 2 / 30);
    salir(tl, a, c);
    tl.to(q('.numero'), {...MARCADOR, duration: 0.7, ease: 'corte'}, c + 2 / 30);
    palabras(tl, t2, c + 0.25, 0.07);
    // en el tiempo 5 la pantalla enseña la foto de verdad
    tl.set(q('.congelado'), {autoAlpha: 0}, s(5));
    // tiempo 8: toca la papelera, sube la hoja de acciones, toca «Eliminar foto» y la foto cae dentro
    tl.fromTo(q('.toque1'), {scale: 0.2, autoAlpha: 0.9}, {scale: 1.6, autoAlpha: 0, duration: 0.35, ease: 'power2.out'}, s(8));
    tl.fromTo(q('.hoja'), {yPercent: 120}, {yPercent: 0, duration: 0.3, ease: 'entra'}, s(8) + 0.08);
    tl.fromTo(q('.toque2'), {scale: 0.2, autoAlpha: 0.9}, {scale: 1.6, autoAlpha: 0, duration: 0.35, ease: 'power2.out'}, s(8.5) + 0.05);
    tl.to(q('.hoja'), {yPercent: 120, duration: 0.25, ease: 'power3.in'}, s(8.5) + 0.12);
    tl.to(q('.foto'), {x: PAPELERA.x - PANT.w / 2, y: PAPELERA.y - PANT.h / 2, scale: 0.04, rotation: 18, duration: 0.42, ease: 'power3.in'}, s(8.5) + 0.12);
    tl.fromTo(q('.papelera'), {scale: 1}, {scale: 1.35, duration: 0.1, ease: 'power2.out', yoyo: true, repeat: 1}, s(8.5) + 0.54);
  });

  return (
    <AbsoluteFill ref={raiz}>
      <Fondo />
      {/* la pizza real, a cámara lenta y a sangre */}
      <Img className="video" src={staticFile(`pizza/a1/base/${n}.jpg`)} style={{position: 'absolute', width: 1080, height: 1920}} />
      {/* el móvil: al principio su pantalla ocupa todo el encuadre */}
      <Movil className="movil" style={{left: POS.x, top: POS.y, transformOrigin: `${MOVIL.w / 2}px ${MOVIL.h / 2}px`, opacity: 0, visibility: 'hidden'}}>
        <AppFotos conFoto />
        {/* lo que se acaba de fotografiar, congelado: se ve hasta que aparece la foto de verdad */}
        <Img
          className="congelado"
          src={staticFile('pizza/a1/base/053.jpg')}
          style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </Movil>
      {/* el marcador: 10 detrás de las hojas; luego sube al titular y cuenta hasta 4 */}
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
          fontVariantNumeric: 'tabular-nums',
          opacity: 0,
          visibility: 'hidden',
        }}
      >
        {valor}
      </div>
      <Img className="hojas" src={staticFile(`pizza/a1/hojas/${n}.png`)} style={{position: 'absolute', left: 0, top: 400, width: 1080, height: 660}} />
      <div className="t-esta" style={{position: 'absolute', left: 64, top: 110, ...titular(150)}}>
        Esta pizza
        <br />
        es de
      </div>
      <div className="t-movil" style={{position: 'absolute', left: 64, top: 150, ...titular(132)}}>
        En el móvil,
        <br />
        de
      </div>
      <AbsoluteFill className="parpadeo" style={{background: '#000', opacity: 0, visibility: 'hidden'}} />
    </AbsoluteFill>
  );
};
