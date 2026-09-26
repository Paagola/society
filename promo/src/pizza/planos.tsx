import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {Paper} from '../components';
import {C, EASE, EASE_IN, EASE_OUT, tween} from '../theme';
import {Sombra} from '../anuncio/piezas';
import {PantallaCarta} from './carta';
import {Firma} from './firma';
import {Anillo, Desliza, Historia, PiezaReel} from './formatos';
import {b, PLANO, PROCESO, REEL, TEXTO} from './guion';
import {PapelArrugado} from './papel3d';
import {Cartel, colocar, Fuente, Rasgado, SOMBRA} from './piezas';

const largo = (p: readonly [number, number]) => b(p[1]) - b(p[0]);

// La foto del móvil en los planos 2 y 5: casi a todo el ancho, girada y pisando el final del titular
// (como «DIEZ» detrás de las hojas). En los dos planos va igual, para que se lea «la misma foto».
const FOTO = {escala: 1.3, x: 540, y: 1195, giro: -5};
const tiempo = (p: readonly [number, number], k: number) => b(p[0] + k) - b(p[0]);

// 1 · ESTA PIZZA es de DIEZ. La rúcula del reel real a cámara lenta; «DIEZ» queda detrás de las hojas
// que caen: el texto vive dentro del plano, no encima.
export const PlanoDiez: React.FC = () => {
  const f = useCurrentFrame();
  const n = String(Math.min(53, f)).padStart(3, '0');
  return (
    <AbsoluteFill style={{background: C.tinta}}>
      <Img src={staticFile(`pizza/a1/base/${n}.jpg`)} style={{width: 1080, height: 1920}} />
      <Cartel lineas={[{t: 'DIEZ.', s: 400}]} en={[tiempo(PLANO.diez, 1)]} y={505} />
      <Img src={staticFile(`pizza/a1/hojas/${n}.png`)} style={{position: 'absolute', left: 0, top: 400, width: 1080, height: 660}} />
      <Cartel lineas={TEXTO.diez} en={[0, 7]} y={165} />
    </AbsoluteFill>
  );
};

// 2 · EN EL MÓVIL, de CUATRO. Clic: la misma pizza en la foto del móvil, un recorte pequeño sobre la
// mesa. El hostelero la da por mala: se arruga hacia dentro, con la foto escondida, y se tira.
export const PlanoCuatro: React.FC = () => {
  const f = useCurrentFrame();
  const L = largo(PLANO.cuatro);
  const arr0 = tiempo(PLANO.cuatro, 4);
  const cae = tween(f, 2, 9, [0, 1], EASE_OUT);
  // se arruga en 18 fotogramas, sin prisa al principio (los bordes se doblan) y se cierra al final;
  // luego coge impulso (sube un poco) y se tira hacia abajo, a la papelera, acelerando
  const p = tween(f, arr0, arr0 + 18, [0, 1], (v) => v * v * (3 - 2 * v) * 0.35 + v * 0.65);
  const impulso = tween(f, arr0 + 18, arr0 + 21, [0, 1], EASE_OUT);
  const lanza = tween(f, arr0 + 21, L, [0, 1], (v) => v * v);
  const empuje = tween(f, 9, arr0, [0, 0.035], (v) => v);
  return (
    <AbsoluteFill style={{background: C.tinta}}>
      <Paper dark />
      <Cartel lineas={TEXTO.cuatro} en={[5, 10, tiempo(PLANO.cuatro, 1)]} y={150} />
      {f >= 2 && (
        <PapelArrugado
          w={760}
          h={570}
          sombra={0.6}
          e={{
            p,
            x: FOTO.x + lanza * 140,
            y: FOTO.y - (1 - cae) * 50 - p * 70 - impulso * 60 + lanza * 1250,
            escala: (FOTO.escala + (1 - cae) * 0.1 + empuje) * (1 - 0.15 * lanza),
            rz: FOTO.giro + p * 22 - impulso * 12 + lanza * 240,
            rx: p * 20 - lanza * 120,
            ry: -p * 26,
          }}
        />
      )}
      {f < 2 && <AbsoluteFill style={{background: '#000'}} />}
    </AbsoluteFill>
  );
};

// 3 · 3 DE CADA 4 miran la carta ANTES DE RESERVAR. El dato con su fuente, y la carta en el móvil del
// cliente: los platos están, las fotos no.
export const PlanoCarta: React.FC = () => {
  const f = useCurrentFrame();
  const entra = tween(f, 0, 11, [0, 1], EASE_OUT);
  return (
    <AbsoluteFill>
      <Paper />
      <Cartel lineas={TEXTO.carta} en={[2, 8, tiempo(PLANO.carta, 1)]} y={138} color={C.tinta} />
      <Fuente texto="Fuente: TheFork lab, España, julio de 2026" y={612} en={18} />
      <div style={{position: 'absolute', left: 116, top: 684 + (1 - entra) * 1350, width: 1475, height: 1741, transform: `rotate(${(1 - entra) * 7}deg)`, transformOrigin: '30% 20%'}}>
        <div style={{position: 'absolute', left: 158.9, top: 67.9, width: 531, height: 1154, transform: 'rotate(1.9deg)', borderRadius: 66, overflow: 'hidden'}}>
          <PantallaCarta w={531} h={1154} scroll={[22, 50]} />
        </div>
        <Img src={staticFile('pizza/mano-carta.png')} style={{position: 'absolute', left: 0, top: 0, width: 1475, height: 1741, filter: SOMBRA}} />
      </div>
    </AbsoluteFill>
  );
};

// Las tres piezas de la persiana en su sitio final (también sirve de salida del plano 4).
const PiezasPersiana: React.FC<{interior: number; chapa: number; persona: number; personaX?: number; rot?: number}> = ({interior, chapa, persona, personaX = 0, rot = 0}) => (
  <>
    <Img src={staticFile('pizza/persiana/interior.png')} style={{position: 'absolute', left: 0, top: -8 + interior, width: 1080, height: 1935, filter: SOMBRA, transform: `rotate(${rot}deg)`}} />
    <Img src={staticFile('pizza/persiana/chapa.png')} style={{position: 'absolute', left: 0, top: -8 + chapa, width: 1080, height: 1935, filter: SOMBRA}} />
    <Img src={staticFile('pizza/persiana/persona.png')} style={{position: 'absolute', left: personaX, top: -8 + persona, width: 1080, height: 1935, filter: SOMBRA}} />
  </>
);

// 4 · NADIE VA a donde NO VE. La persiana se monta por partes, como un collage: primero el interior
// del local, luego baja la chapa, luego llega la persona y de un tirón la cierra.
export const PlanoPersiana: React.FC = () => {
  const f = useCurrentFrame();
  const t1 = tiempo(PLANO.persiana, 1);
  const t2 = tiempo(PLANO.persiana, 2);
  const t3 = tiempo(PLANO.persiana, 3);
  const pi = tween(f, 0, 9, [0, 1], EASE_OUT);
  const baja = tween(f, t1 - 2, t1 + 8, [0, 1], EASE_IN);
  const rebote = f > t1 + 8 ? Math.sin(Math.min(1, (f - t1 - 8) / 5) * Math.PI) * -16 : 0;
  const pp = tween(f, t2, t2 + 8, [0, 1], EASE_OUT);
  const tiron = tween(f, t3, t3 + 10, [0, 110], EASE);
  return (
    <AbsoluteFill style={{background: C.tinta}}>
      <Paper dark />
      <PiezasPersiana interior={(1 - pi) * 760} chapa={(1 - baja) * -1960 + rebote + tiron} persona={tiron} personaX={(1 - pp) * 760} rot={(1 - pi) * 3} />
      <AbsoluteFill style={{opacity: baja}}>
        <Sombra fuerza={0.88} hasta={66} />
      </AbsoluteFill>
      <Cartel lineas={TEXTO.nadie} en={[2, t1, t3]} y={210} />
    </AbsoluteFill>
  );
};

// Marcas de recorte: cuatro esquinas que pasan del borde de la foto al del encuadre vertical.
const Esquinas: React.FC<{x0: number; y0: number; x1: number; y1: number; opacidad: number}> = ({x0, y0, x1, y1, opacidad}) => {
  const L = 96;
  const g = 11;
  const esq: [number, number, number, number][] = [
    [x0, y0, 1, 1],
    [x1, y0, -1, 1],
    [x0, y1, 1, -1],
    [x1, y1, -1, -1],
  ];
  return (
    <AbsoluteFill style={{opacity: opacidad}}>
      {esq.map(([x, y, sx, sy], i) => (
        <React.Fragment key={i}>
          <div style={{position: 'absolute', left: sx > 0 ? x : x - L, top: sy > 0 ? y : y - g, width: L, height: g, background: C.papel, boxShadow: '0 2px 6px rgba(0,0,0,.35)'}} />
          <div style={{position: 'absolute', left: sx > 0 ? x : x - g, top: sy > 0 ? y : y - L, width: g, height: L, background: C.papel, boxShadow: '0 2px 6px rgba(0,0,0,.35)'}} />
        </React.Fragment>
      ))}
    </AbsoluteFill>
  );
};

// La barra de luz se lanza, se para a media foto para que se vea el antes y el después, y termina.
const pausa = (v: number) => 0.5 + 4 * (v - 0.5) ** 3;

// La hoja de estudio en su sitio (la misma posición con la que empieza «A SU ALTURA»).
const HojaEstudio: React.FC<{escala: number}> = ({escala}) => (
  <Img
    src={staticFile('pizza/estudio-hoja.png')}
    style={{position: 'absolute', left: 0, top: -45, width: 1080, height: 1990, transform: `scale(${escala})`, transformOrigin: '50% 62%'}}
  />
);

// 5 · LA MISMA foto. La persiana se levanta y aparece Society (cobalto). La bola que se tiró cae,
// bota y se abre: la foto sale de dentro, con las marcas de haber estado arrugada.
// Después, el proceso, a la vista: se plancha (fuera pliegues), se reencuadra en vertical sobre la
// pizza (marcas de recorte) y una barra de luz la convierte en la foto de estudio. La pizza del móvil
// y la de estudio coinciden en tamaño y sitio, así que la barra parte la misma pizza en antes y después.
export const PlanoMisma: React.FC = () => {
  const f = useCurrentFrame();
  const t1 = tiempo(PLANO.misma, 1);
  const t3 = tiempo(PLANO.misma, 3);
  const {plancha, encuadre, luz, fin} = PROCESO;
  const sube = tween(f, 0, 10, [0, -2150], EASE_IN);
  const cae = tween(f, 4, t1, [0, 1], EASE_IN);
  const bote = f >= t1 && f < t1 + 8 ? Math.sin(((f - t1) / 8) * Math.PI) * -34 : 0;
  const aplasta = f >= t1 ? tween(f, t1, t1 + 5, [1, 0], EASE_OUT) : 0;
  const abre = tween(f, t1 + 4, t1 + 26, [1, 0], EASE);
  // 1 · planchar
  const liso = tween(f, plancha, plancha + 11, [0, 1], EASE);
  // 2 · reencuadrar: la foto crece hasta que su pizza ocupa el sitio y el tamaño de la de estudio
  const zoom = tween(f, encuadre, encuadre + 12, [0, 1], EASE);
  const fuera = tween(f, encuadre, encuadre + 7, [0, 1], EASE_IN);
  // 3 · luz: la barra sube desde abajo y deja la foto de estudio detrás
  const barra = f < luz ? 1920 : 1920 * (1 - pausa(tween(f, luz, fin, [0, 1], (v) => v)));
  const marco = {
    x0: 70 + (50 - 70) * zoom,
    y0: 845 + (60 - 845) * zoom,
    x1: 1010 + (1030 - 1010) * zoom,
    y1: 1545 + (1860 - 1545) * zoom,
  };
  return (
    <AbsoluteFill>
      <Paper tint={C.cobalto} />
      {f >= 4 && (
        <PapelArrugado
          w={760}
          h={570}
          sombra={0.42}
          e={{
            p: abre,
            marcas: 1 - liso,
            liso,
            x: FOTO.x + (494 - FOTO.x) * zoom,
            y: -380 + cae * (FOTO.y + 380) + bote + (832 - FOTO.y) * zoom,
            escala: FOTO.escala + (2.19 - FOTO.escala) * zoom,
            rz: FOTO.giro + (1 - cae) * 200 - FOTO.giro * zoom,
            rx: (1 - cae) * -130,
            ry: (1 - abre) * 10,
            sx: 1 + aplasta * 0.16,
            sy: 1 - aplasta * 0.13,
          }}
        />
      )}
      {f >= luz && (
        <>
          <AbsoluteFill style={{clipPath: `inset(${barra}px 0 0 0)`}}>
            <HojaEstudio escala={1} />
          </AbsoluteFill>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: barra - 13,
              height: 26,
              background: C.papel,
              boxShadow: '0 0 0 3px rgba(20,20,20,.25), 0 10px 30px rgba(10,10,10,.45)',
            }}
          />
        </>
      )}
      {f >= encuadre && <Esquinas {...marco} opacidad={tween(f, encuadre, encuadre + 4, [0, 1]) * tween(f, fin - 4, fin, [1, 0])} />}
      <AbsoluteFill style={{transform: `translateY(${-fuera * 700}px)`, opacity: 1 - fuera}}>
        <Cartel lineas={TEXTO.misma} en={[t3, t3 + 6]} y={335} />
      </AbsoluteFill>
      {f < 11 && (
        <AbsoluteFill style={{transform: `translateY(${sube}px)`}}>
          <AbsoluteFill style={{background: C.tinta}} />
          <PiezasPersiana interior={0} chapa={110} persona={110} />
          <Sombra fuerza={0.88} hasta={66} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

// 6 · por fin, A SU ALTURA. La misma pizza, ya con luz de estudio, a sangre.
export const PlanoAltura: React.FC = () => {
  const f = useCurrentFrame();
  const L = largo(PLANO.altura);
  return (
    <AbsoluteFill style={{background: C.tinta}}>
      <HojaEstudio escala={tween(f, 0, L, [1.0, 1.05], (v) => v)} />
      <AbsoluteFill style={{opacity: tween(f, 0, 6, [0, 1])}}>
        <Sombra fuerza={0.55} hasta={45} />
      </AbsoluteFill>
      <Cartel lineas={TEXTO.altura} en={[3, tiempo(PLANO.altura, 1)]} y={200} />
    </AbsoluteFill>
  );
};

// 7 · UN REEL. El reel real de Da Tonino, cortado al pulso, en su recorte. Sale deslizando a la
// izquierda, como se pasa un carrusel.
export const PlanoReel: React.FC = () => {
  const f = useCurrentFrame();
  const L = largo(PLANO.reel);
  const c = colocar(f, 0, 3, 6);
  const sale = tween(f, L, L + 9, [0, -1150], EASE_IN);
  const cortes = [0, tiempo(PLANO.reel, 1), tiempo(PLANO.reel, 2), tiempo(PLANO.reel, 3)];
  return (
    <AbsoluteFill style={{background: C.tinta}}>
      <Paper dark />
      <AbsoluteFill style={{transform: `translateX(${sale}px)`}}>
        <Rasgado mascara="reel" w={1000} h={1776} style={{left: 40 + c.jx, top: 72 + c.dy + c.jy, transform: `rotate(${-1.2 + c.rot}deg) scale(${c.escala})`}}>
          <PiezaReel tramos={REEL} cortes={cortes} />
          <Sombra fuerza={0.6} hasta={30} />
        </Rasgado>
        <Cartel lineas={TEXTO.reel} en={[3]} y={170} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// 8 · UN CARRUSEL. Entra deslizando desde la derecha. Las láminas de Da Tonino en el anillo de la
// referencia, que avanza una lámina en cada tiempo.
export const PlanoCarrusel: React.FC = () => {
  const f = useCurrentFrame();
  const entra = tween(f, 0, 9, [1080, 0], EASE_OUT);
  const pasos = [1, 2, 3, 4].map((k) => tiempo(PLANO.carrusel, k));
  const laminas = ['01', '02', '03', '07', '01', '02', '03', '07'];
  return (
    <AbsoluteFill style={{transform: `translateX(${entra}px)`}}>
      <Paper tint={C.cobalto} />
      <Anillo laminas={laminas} pasos={pasos} y={1050} />
      <Desliza y={1600} en={16} />
      <Cartel lineas={TEXTO.carrusel} en={[6]} y={180} />
    </AbsoluteFill>
  );
};

// 9 · UNA HISTORIA. La historia ya publicada, en vertical, como una pieza de papel.
export const PlanoHistoria: React.FC = () => {
  const f = useCurrentFrame();
  const L = largo(PLANO.historia);
  const entra = tween(f, 0, 11, [0, 1], EASE_OUT);
  return (
    <AbsoluteFill>
      <Paper />
      <Cartel lineas={TEXTO.historia} en={[4]} y={150} color={C.tinta} />
      <Rasgado mascara="historia" w={740} h={1316} style={{left: 170, top: 520 + (1 - entra) * 1450, transform: `rotate(${-2 - (1 - entra) * 5}deg)`}}>
        <Historia w={740} h={1316} dur={L} />
      </Rasgado>
    </AbsoluteFill>
  );
};

// 10 · PUBLICA menos, LLENA MÁS. El cartel de la marca y el café de la mañana, con su fondo transparente.
export const PlanoPublica: React.FC = () => {
  const f = useCurrentFrame();
  const t2 = tiempo(PLANO.publica, 2);
  const entra = tween(f, t2 - 6, t2 + 4, [0, 1], EASE_OUT);
  return (
    <AbsoluteFill>
      <Paper tint={C.cobalto} />
      <Cartel lineas={TEXTO.publica} en={[0, 7, tiempo(PLANO.publica, 1)]} y={220} />
      <Img
        src={staticFile('anuncio/mano-cafe.png')}
        style={{position: 'absolute', left: 230, top: 1110 + (1 - entra) * 900, width: 887, height: 830, filter: SOMBRA, transform: `rotate(${-3 - (1 - entra) * 6}deg)`}}
      />
    </AbsoluteFill>
  );
};

// 11 · Firma: «Society» en recortes de las páginas del anuncio.
export const PlanoFirma: React.FC = () => (
  <AbsoluteFill style={{background: C.tinta}}>
    <Paper dark />
    <Firma en={4} lema={30} />
  </AbsoluteFill>
);
