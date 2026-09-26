import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile} from 'remotion';
import {InkDefs} from '../components';
import {C} from '../theme';
import {b, DURACION, MUSICA_CORTA, MUSICA_VUELVE, PLANO, PROCESO} from './guion';
import {PlanoAltura, PlanoCarrusel, PlanoCarta, PlanoCuatro, PlanoDiez, PlanoFirma, PlanoHistoria, PlanoMisma, PlanoPersiana, PlanoPublica, PlanoReel} from './planos';

// «La pizza que nadie vio». La pizza real va en vídeo, a color y con música. En el móvil se vuelve un
// recorte de papel que el hostelero arruga y tira; la canción se corta con el clic. Society recoge la
// misma bola, la abre y la pone a su altura: reel, carrusel e historia. Todo el anuncio es papel.

const Plano: React.FC<{p: readonly [number, number]; extra?: number; children: React.ReactNode}> = ({p, extra = 0, children}) => (
  <Sequence from={b(p[0])} durationInFrames={b(p[1]) - b(p[0]) + extra} premountFor={30}>
    {children}
  </Sequence>
);

const Sonido: React.FC<{src: string; en: number; vol?: number}> = ({src, en, vol = 1}) => (
  <Sequence from={en} durationInFrames={60}>
    <Audio src={staticFile(`audio/${src}.wav`)} volume={vol} />
  </Sequence>
);

const t = (p: readonly [number, number], k = 0) => b(p[0] + k);

export const Pizza: React.FC = () => (
  <AbsoluteFill style={{background: C.tinta}}>
    <InkDefs />

    <Plano p={PLANO.diez}>
      <PlanoDiez />
    </Plano>
    <Plano p={PLANO.cuatro}>
      <PlanoCuatro />
    </Plano>
    <Plano p={PLANO.carta}>
      <PlanoCarta />
    </Plano>
    <Plano p={PLANO.persiana}>
      <PlanoPersiana />
    </Plano>
    {/* incluye el proceso: planchar, reencuadrar y cambiar la luz */}
    <Plano p={PLANO.misma}>
      <PlanoMisma />
    </Plano>
    <Plano p={PLANO.altura}>
      <PlanoAltura />
    </Plano>
    {/* el reel sale deslizando por debajo del carrusel que entra */}
    <Plano p={PLANO.reel} extra={9}>
      <PlanoReel />
    </Plano>
    <Plano p={PLANO.carrusel}>
      <PlanoCarrusel />
    </Plano>
    <Plano p={PLANO.historia}>
      <PlanoHistoria />
    </Plano>
    <Plano p={PLANO.publica}>
      <PlanoPublica />
    </Plano>
    <Plano p={PLANO.firma}>
      <PlanoFirma />
    </Plano>

    {/* Música: suena mientras la pizza es real, se corta con el clic y vuelve cuando cae la bola */}
    <Sequence durationInFrames={MUSICA_CORTA}>
      <Audio
        src={staticFile('audio/musica.m4a')}
        volume={(f) => interpolate(f, [0, 2, MUSICA_CORTA - 2, MUSICA_CORTA], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />
    </Sequence>
    <Sequence from={MUSICA_CORTA} durationInFrames={MUSICA_VUELVE - MUSICA_CORTA + 10}>
      <Audio
        src={staticFile('audio/anuncio/ambiente.wav')}
        volume={(f) => interpolate(f, [0, 6, MUSICA_VUELVE - MUSICA_CORTA, MUSICA_VUELVE - MUSICA_CORTA + 10], [0, 0.7, 0.7, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />
    </Sequence>
    <Sequence from={MUSICA_VUELVE}>
      <Audio
        src={staticFile('audio/musica.m4a')}
        startFrom={MUSICA_VUELVE}
        volume={(f) =>
          interpolate(f, [0, 3, DURACION - MUSICA_VUELVE - 24, DURACION - MUSICA_VUELVE], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
        }
      />
    </Sequence>

    {/* Efectos: uno por acción */}
    <Sonido src="pizza/clic" en={t(PLANO.cuatro)} />
    <Sonido src="pizza/pegar-1" en={t(PLANO.cuatro) + 8} vol={0.7} />
    <Sonido src="pizza/arrugar" en={t(PLANO.cuatro, 4)} />
    <Sonido src="pizza/lanzar" en={t(PLANO.cuatro, 4) + 21} vol={0.8} />
    <Sonido src="pizza/pegar-2" en={t(PLANO.carta) + 10} vol={0.75} />
    <Sonido src="pizza/pegar-3" en={t(PLANO.persiana) + 8} vol={0.75} />
    <Sonido src="anuncio/persiana" en={t(PLANO.persiana, 1) - 2} vol={0.85} />
    <Sonido src="pizza/pegar-1" en={t(PLANO.persiana, 2) + 7} vol={0.75} />
    <Sonido src="anuncio/golpe" en={t(PLANO.persiana, 3)} vol={0.85} />
    <Sonido src="anuncio/persiana" en={t(PLANO.misma)} vol={0.5} />
    <Sonido src="pizza/caer" en={t(PLANO.misma, 1)} />
    <Sonido src="pizza/abrir" en={t(PLANO.misma, 1) + 4} vol={0.9} />
    <Sonido src="pizza/alisar" en={t(PLANO.misma) + PROCESO.plancha} vol={0.8} />
    <Sonido src="pizza/encuadre" en={t(PLANO.misma) + PROCESO.encuadre + 10} vol={0.8} />
    <Sonido src="pizza/escanear" en={t(PLANO.misma) + PROCESO.luz} vol={0.85} />
    <Sonido src="pizza/pegar-2" en={t(PLANO.reel) + 3} vol={0.7} />
    <Sonido src="anuncio/desliza" en={t(PLANO.carrusel) - 2} vol={0.8} />
    {[1, 2, 3, 4].map((k) => (
      <Sonido key={k} src="anuncio/desliza" en={t(PLANO.carrusel, k) - 3} vol={0.45} />
    ))}
    <Sonido src="pizza/pegar-3" en={t(PLANO.historia) + 10} vol={0.7} />
    <Sonido src="anuncio/toque" en={t(PLANO.historia) + 14} vol={0.8} />
    <Sonido src="anuncio/golpe" en={t(PLANO.publica)} vol={0.85} />
    <Sonido src="pizza/pegar-1" en={t(PLANO.publica, 2) + 3} vol={0.75} />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <Sonido key={i} src={`pizza/pegar-${(i % 3) + 1}`} en={t(PLANO.firma) + 4 + i * 3 + 2} vol={0.6} />
    ))}
  </AbsoluteFill>
);
