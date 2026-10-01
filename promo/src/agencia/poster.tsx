import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {letrasLogo, LogoSociety} from '../marca/Logo';
import {C, FONT} from '../theme';
import {ENTRA, SALE, SUAVE} from '../recorte/camara';
import {acota, azar, PASO, Sonidos} from '../recorte/motor';

// Cartel final como el de imprenta de la referencia (TAXI!!): un muro de palabras de madera en cobalto y
// tinta, cada una entrando de una forma distinta. Sin cambiar de pantalla, las palabras se ordenan:
// cada una viaja a su sitio y se convierte en una letra recortada del logo, y la última en el lema.

type Entrada = 'izquierda' | 'cae' | 'zoom' | 'teclea' | 'mascara' | 'gira' | 'letras' | 'derecha';
const PALABRAS: {t: string; c: string; e: Entrada}[] = [
  {t: 'REELS', c: C.cobalto, e: 'izquierda'},
  {t: 'POSTS', c: C.tinta, e: 'cae'},
  {t: 'SEO', c: C.cobalto, e: 'zoom'},
  {t: 'HISTORIAS', c: C.cobalto, e: 'teclea'},
  {t: 'COMENTARIOS', c: C.tinta, e: 'mascara'},
  {t: 'RESEÑAS', c: C.cobalto, e: 'gira'},
  {t: 'CARRUSELES', c: C.tinta, e: 'letras'},
  {t: 'GOOGLE', c: C.cobalto, e: 'derecha'},
];
const FONDO_PAL = ['REELS', 'SEO', 'POSTS', 'IA', 'HISTORIAS', 'RESEÑAS', 'SEO', 'REELS', 'POSTS', 'IA', 'GOOGLE', 'CARRUSELES'];
const CADA = 7; // fotogramas entre palabra y palabra
const LOGO = {cx: 540, cy: 860};

export const Poster: React.FC<{en: number; junta: number; lemaTexto: string}> = ({en, junta, lemaTexto}) => {
  const fr = useCurrentFrame();
  const f = Math.floor(fr / PASO) * PASO; // lo que es papel, a saltos
  const {width: VW, height: VH} = useVideoConfig();
  if (fr < en) return null;
  const letras = letrasLogo(LOGO.cx, LOGO.cy, 1);
  const altoFila = (VH - 160) / PALABRAS.length;
  const sube = SALE(acota((f - en) / 10));
  const url = `url(${staticFile('papel/mascaras/hoja.png')})`;
  const lemaEn = junta + 10 + 7 * 3 + 12;
  const ev = [
    {f: en, src: 'audio/pizza/lanzar.wav', vol: 0.5, rate: 0.8},
    ...PALABRAS.map((p, i) => ({f: en + 8 + i * CADA + (p.e === 'cae' || p.e === 'zoom' ? 6 : 2), src: i % 2 ? 'audio/pizza/caer.wav' : 'audio/pizza/pegar-3.wav', vol: 0.8, rate: 0.9 + 0.05 * i})),
    {f: junta, src: 'audio/pizza/lanzar.wav', vol: 0.6, rate: 1.2},
  ];
  return (
    <>
      <Sonidos ev={ev} />
      {/* hoja de papel que sube y tapa el panel; se queda de fondo hasta el final */}
      <div style={{position: 'absolute', left: 0, top: VH - (VH + 190) * sube, width: VW, height: 2300}}>
        <div style={{position: 'absolute', inset: 0, WebkitMaskImage: url, maskImage: url, WebkitMaskSize: '100% 100%', maskSize: '100% 100%'}}>
          <Img src={staticFile('papel/fondos/papel.jpg')} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
      </div>
      {/* capa clara de palabras sueltas; al ordenarse todo, salen por los bordes */}
      {FONDO_PAL.map((t, i) => {
        const t0 = en + 6 + i * 3;
        if (f < t0) return null;
        const va = ENTRA(acota((fr - junta - (i % 4)) / 12));
        const x = (azar(i, 81) * 0.9 - 0.05) * VW;
        const y = (i / FONDO_PAL.length) * VH;
        const s = 90 + 160 * azar(i, 82);
        const lado = x < VW / 2 ? -1 : 1;
        return (
          <div
            key={`f${i}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              fontFamily: FONT.display,
              fontSize: s,
              lineHeight: 1,
              color: C.cobalto,
              opacity: 0.2 * (1 - va),
              transform: `translateX(${lado * va * 900}px) rotate(${azar(i, 83) < 0.4 ? -90 : 0}deg)`,
              transformOrigin: '0 0',
              filter: 'url(#tinta)',
            }}
          >
            {t}
          </div>
        );
      })}
      {/* el muro: cada palabra con su propia entrada */}
      {PALABRAS.map((p, i) => {
        const t0 = en + 8 + i * CADA;
        if (f < t0) return null;
        const tam = Math.min(altoFila * 1.02, (VW - 80) / (p.t.length * 0.47));
        const cx = VW / 2;
        const cy = 80 + i * altoFila + altoFila / 2;
        const d = fr - t0;
        // ordenarse: viaja al centro de su letra del logo (o al lema) y se encoge hasta desaparecer en ella
        const destino = i < letras.length ? letras[i] : {x: LOGO.cx, y: LOGO.cy + 300, w: 900, h: 90};
        const sj = i < letras.length ? junta + i * 3 : lemaEn - 10;
        const j = SUAVE(acota((fr - sj) / 10));
        if (j >= 1) return null;
        const escalaFinal = (destino.h * 0.7) / tam;
        let tx = 0;
        let ty = 0;
        let rot = 0;
        let esc = 1;
        let clip = '';
        let texto: React.ReactNode = p.t;
        switch (p.e) {
          case 'izquierda': {
            const e = SALE(acota(d / 10));
            tx = -(1 - e) * 1400;
            rot = (1 - e) * -4;
            break;
          }
          case 'derecha': {
            const e = SALE(acota(d / 12));
            tx = (1 - e) * 1400 + Math.sin(e * Math.PI) * -40;
            break;
          }
          case 'cae': {
            const e = acota((f - t0) / 8);
            ty = e < 1 ? -(1 - e * e) * 900 : 0;
            ty += f >= t0 + 8 && f < t0 + 12 ? -20 : 0; // rebote de papel
            rot = (1 - e) * 8;
            break;
          }
          case 'zoom':
            esc = 1 + (1 - SALE(acota((f - t0) / 6))) * 3.2;
            rot = (1 - SALE(acota((f - t0) / 6))) * -12;
            break;
          case 'teclea': {
            const n = Math.min(p.t.length, Math.floor(d / 1.2) + 1);
            texto = p.t.slice(0, n);
            break;
          }
          case 'mascara':
            clip = `inset(${(1 - SALE(acota(d / 12))) * 100}% 0 0 0)`;
            ty = (1 - SALE(acota(d / 12))) * 60;
            break;
          case 'gira': {
            const e = SALE(acota((f - t0) / 8));
            rot = (1 - e) * 90;
            esc = 0.6 + 0.4 * e;
            break;
          }
          case 'letras':
            texto = Array.from(p.t).map((l, k) => {
              const tk = t0 + k;
              const e = SALE(acota((f - tk) / 8));
              const ang = azar(k, 97) * Math.PI * 2;
              return (
                <span key={k} style={{display: 'inline-block', opacity: f < tk ? 0 : 1, transform: `translate(${Math.cos(ang) * 700 * (1 - e)}px, ${Math.sin(ang) * 700 * (1 - e)}px) rotate(${(1 - e) * 60}deg)`}}>
                  {l}
                </span>
              );
            });
            break;
        }
        const x = cx + (destino.x - cx) * j;
        const y = cy + (destino.y - cy) * j;
        const s = esc * (1 + (escalaFinal - 1) * j);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) rotate(${rot + j * (azar(i, 98) - 0.5) * 30}deg) scale(${s})`,
              fontFamily: FONT.display,
              fontSize: tam,
              lineHeight: 1,
              whiteSpace: 'nowrap',
              color: p.c,
              opacity: 1 - acota((j - 0.75) / 0.25),
              clipPath: clip || undefined,
              filter: 'url(#tinta)',
            }}
          >
            {texto}
          </div>
        );
      })}
      {/* las letras del logo nacen donde llega cada palabra; el lema, donde llega la última */}
      <LogoSociety en={junta + 10} lema={lemaEn} cx={LOGO.cx} cy={LOGO.cy} paso={2} temblor={false} lemaTexto={lemaTexto} lemaTam={72} lemaColor={C.tinta} />
    </>
  );
};
