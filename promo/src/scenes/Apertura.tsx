import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {Cutout, Headline, Label, Paper, Typed} from '../components';
import {COPY} from '../copy';
import {C, EASE_OUT, FONT, PAD, tween} from '../theme';
import {useWide} from '../format';

const K = COPY.apertura;

// Duraciones (fotogramas a 30 fps) de cada fase de la apertura.
// Nada de marca todavía: el turno real, tal cual, hasta la ruptura.
export const A = {gancho: 75, rigatoni: 68, paella: 68, hueco: 96, ruptura: 84};

// ---------------------------------------------------------------------------
// 1 · Gancho: el reel real ya en marcha, a pantalla completa, con su propio
// sonido — sin marco de móvil, sin logo. La acción física más fuerte que hay.
// ---------------------------------------------------------------------------
export const Gancho: React.FC = () => (
  <AbsoluteFill style={{background: C.tinta}}>
    <OffthreadVideo src={staticFile('video/reel-v6.mp4')} endAt={A.gancho} volume={1} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
  </AbsoluteFill>
);

// ---------------------------------------------------------------------------
// 2 y 3 · Platos reales que salen, uno detrás de otro. Solo la hora como
// rótulo: el turno sigue, nadie se para a fotografiar nada de esto.
// ---------------------------------------------------------------------------
const PlatoDeTurno: React.FC<{src: string; hora: string; dur: number}> = ({src, hora, dur}) => {
  const f = useCurrentFrame();
  const zoom = 1 + tween(f, 0, dur, [0, 0.07], (t) => t);
  return (
    <AbsoluteFill style={{background: C.tinta}}>
      <AbsoluteFill style={{transform: `scale(${zoom})`}}>
        <Img src={staticFile(`caso/${src}`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(20,20,20,.6), rgba(20,20,20,0) 42%)'}} />
      <Label color={C.papel} size={30} style={{position: 'absolute', left: PAD, bottom: 64, opacity: tween(f, 6, 18)}}>
        {hora}
      </Label>
    </AbsoluteFill>
  );
};
export const Rigatoni: React.FC = () => <PlatoDeTurno src="real-rigatoni.jpg" hora="22:47" dur={A.rigatoni} />;
export const Paella: React.FC = () => <PlatoDeTurno src="real-paella.jpg" hora="23:12" dur={A.paella} />;

// ---------------------------------------------------------------------------
// 4 · El hueco: la sala real, y el único pensamiento del hostelero. Ninguna
// lista de tareas — una sola frase, en primera persona, que crea el problema.
// ---------------------------------------------------------------------------
export const Hueco: React.FC = () => {
  const f = useCurrentFrame();
  const wide = useWide();
  const zoom = 1 + tween(f, 0, A.hueco, [0, 0.06], (t) => t);
  return (
    <AbsoluteFill style={{background: C.tinta}}>
      <AbsoluteFill style={{transform: `scale(${zoom})`}}>
        <Img src={staticFile('caso/real-sala.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(20,20,20,.78), rgba(20,20,20,.1) 58%)'}} />
      <Headline
        lines={K.hueco}
        size={wide ? 108 : 116}
        at={32}
        stagger={6}
        color={C.papel}
        align={wide ? 'left' : 'center'}
        style={wide ? {position: 'absolute', left: PAD - 4, bottom: 140} : {position: 'absolute', left: 36, right: 36, bottom: 230}}
      />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 5 · Ruptura: coge el móvil y escribe una frase real. Único momento donde
// aparece Society — pequeño, como una firma, no como un cartel.
// ---------------------------------------------------------------------------
export const Ruptura: React.FC = () => {
  const f = useCurrentFrame();
  const wide = useWide();
  return (
    <AbsoluteFill>
      <Paper />
      <Cutout src="movil-mano.png" x={wide ? 1180 : 260} y={wide ? 240 : 620} width={wide ? 600 : 560} at={2} from={[0, 240]} rot={-4} />
      <div style={{position: 'absolute', left: 40, right: 40, top: wide ? 700 : 1280, textAlign: 'center', opacity: tween(f, 24, 34)}}>
        <div
          style={{
            display: 'inline-block',
            background: C.tinta,
            color: C.papel,
            fontFamily: FONT.ui,
            fontWeight: 700,
            fontSize: wide ? 38 : 42,
            padding: '18px 30px',
            borderRadius: 20,
            filter: 'url(#tinta)',
          }}
        >
          <Typed text={K.frase} at={26} cps={13} />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: wide ? 130 : 220,
          display: 'flex',
          justifyContent: 'center',
          opacity: tween(f, 60, 72),
          transform: `translateY(${tween(f, 60, 72, [16, 0], EASE_OUT)}px)`,
        }}
      >
        <Label size={26} color={C.cobalto}>
          con Society
        </Label>
      </div>
    </AbsoluteFill>
  );
};
