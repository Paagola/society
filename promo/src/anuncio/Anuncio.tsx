import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {InkDefs, Logo, Paper} from '../components';
import {C, FONT, tween} from '../theme';
import {b, DURACION, MUSICA_CORTA, MUSICA_DESDE, MUSICA_VUELVE, REEL, TEXTO} from './guion';
import {AntesDespues, Aviso, Carrusel, Clip, Foto, FotoMovil, Recorte, Reloj, Sombra, Titular} from './piezas';

// «La 1:47». El servicio va a color y con música; el cierre, en blanco y negro y en silencio;
// Society entra con la notificación de la mañana y con ella vuelven la música y el color.

const Escena: React.FC<{de: number; a: number; children: React.ReactNode}> = ({de, a, children}) => (
  <Sequence from={b(de)} durationInFrames={b(a) - b(de)}>
    {children}
  </Sequence>
);

const Sonido: React.FC<{src: string; en: number; vol?: number}> = ({src, en, vol = 1}) => (
  <Sequence from={en} durationInFrames={90}>
    <Audio src={staticFile(`audio/anuncio/${src}.wav`)} volume={vol} />
  </Sequence>
);

// 22:15 → 22:48 en unos fotogramas: el servicio pasa volando.
const RelojServicio: React.FC = () => {
  const f = useCurrentFrame();
  const min = Math.round(tween(f, 0, 9, [15, 48]));
  return <Reloj texto={`22:${String(min).padStart(2, '0')}`} />;
};

const Cierre: React.FC = () => {
  const f = useCurrentFrame();
  const firma = b(64) - b(59);
  return (
    <AbsoluteFill>
      <Foto src="anuncio/sala-noche.jpg" dur={b(67) - b(59)} desde={1.0} hasta={1.08} />
      <Sombra fuerza={0.75} hasta={55} />
      <Sequence durationInFrames={firma}>
        <Titular lineas={TEXTO.cierre} y={250} />
      </Sequence>
      <Sequence from={firma}>
        <AbsoluteFill style={{background: C.tinta, opacity: tween(f, firma, firma + 8, [0, 0.55])}} />
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <Logo size={270} at={2} color={C.papel} />
          <div style={{fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 800, fontSize: 84, color: C.papel, letterSpacing: '-0.03em', marginTop: 34, opacity: tween(f, firma + 8, firma + 16)}}>
            tu agencia con IA
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

export const Anuncio: React.FC = () => (
  <AbsoluteFill style={{background: C.tinta}}>
    <InkDefs />

    {/* 1 · Gancho: pleno servicio, a color, con la acción ya en marcha */}
    <Escena de={0} a={5}>
      <Clip desde={REEL.rucula} />
      <Sombra fuerza={0.55} hasta={45} />
      <Reloj texto="22:15" />
    </Escena>

    {/* 2 · El servicio sigue: la porción y la caña */}
    <Escena de={5} a={9}>
      <Sequence durationInFrames={b(7) - b(5)}>
        <Clip desde={REEL.porcion} />
      </Sequence>
      <Sequence from={b(7) - b(5)}>
        <Clip desde={REEL.cana} />
      </Sequence>
      <Sombra fuerza={0.55} hasta={45} />
      <RelojServicio />
    </Escena>

    {/* 3 · Corte a blanco y negro y silencio: se baja la persiana */}
    <Escena de={9} a={13}>
      <Foto src="anuncio/persiana.jpg" dur={b(13) - b(9)} desde={1.2} hasta={1.08} y0={-180} y1={0} />
      <Sombra fuerza={0.6} hasta={45} />
      <Reloj texto="01:47" />
    </Escena>

    {/* 4 · Cocina cerrada */}
    <Escena de={13} a={16}>
      <Foto src="anuncio/sillas.jpg" dur={b(16) - b(13)} desde={1.05} hasta={1.22} y0={40} y1={-60} />
      <Titular lineas={TEXTO.cocina} y={250} />
    </Escena>

    {/* 5 · Empieza la segunda jornada: Instagram pendiente, ¿y hoy qué publico? */}
    <Escena de={16} a={23}>
      <AbsoluteFill style={{background: C.tinta}} />
      <Recorte src="anuncio/mano-movil.png" w={1020} x={90} y={870} en={1} rot={-3} />
      <Sequence durationInFrames={b(19) - b(16)}>
        <Titular lineas={TEXTO.instagram} y={250} />
      </Sequence>
      <Sequence from={b(19) - b(16)}>
        <Titular lineas={TEXTO.pregunta} y={240} />
      </Sequence>
    </Escena>

    {/* 6 · El carrete: la foto real del móvil, horizontal, como se ve al abrirla */}
    <Escena de={23} a={26}>
      <AbsoluteFill style={{background: C.tinta}} />
      <FotoMovil top={660} />
      <Titular lineas={TEXTO.esto} y={250} />
    </Escena>

    {/* 7 · Mañana. El móvil se bloquea */}
    <Escena de={26} a={29}>
      <Foto src="anuncio/bloqueo.jpg" dur={b(29) - b(26)} desde={1.0} hasta={1.13} pos="60% 60%" />
      <Sombra fuerza={0.5} hasta={40} />
      <Titular lineas={TEXTO.manana} y={260} />
    </Escena>

    {/* 8 · La consecuencia, con el cartel de la marca */}
    <Escena de={29} a={34}>
      <Paper />
      <Titular lineas={TEXTO.nadie} y={520} x={62} color={C.tinta} dur={10} escalon={4} />
    </Escena>

    {/* 9 · 9:00, con el café: entra Society y vuelve el color */}
    <Escena de={34} a={41}>
      <Paper />
      <Titular lineas={TEXTO.cafe} y={190} color={C.tinta} />
      <Recorte src="anuncio/mano-cafe.png" w={760} x={380} y={1260} en={4} rot={-4} />
      <Aviso en={6} toque={60} />
    </Escena>

    {/* 10 · De tu misma foto: la foto del móvil se convierte en la del plato */}
    <Escena de={41} a={45}>
      <AntesDespues
        en={9}
        antes={
          <AbsoluteFill style={{background: C.tinta}}>
            <FotoMovil top={555} />
          </AbsoluteFill>
        }
        despues={
          <AbsoluteFill>
            <Foto src="anuncio/pizza-estudio.jpg" dur={b(45) - b(41)} desde={1.18} hasta={1.02} pos="50% 70%" />
            <Sombra fuerza={0.55} hasta={50} />
          </AbsoluteFill>
        }
      />
      <Titular lineas={TEXTO.misma} y={250} en={20} />
    </Escena>

    {/* 11 · «Tu semana, lista», día a día: cada formato en su propio marco, nunca mezclados */}
    <Escena de={45} a={48}>
      <Sequence durationInFrames={b(46) - b(45)}>
        <Clip desde={REEL.paella} />
      </Sequence>
      <Sequence from={b(46) - b(45)} durationInFrames={b(47) - b(46)}>
        <Clip desde={REEL.emplatado} />
      </Sequence>
      <Sequence from={b(47) - b(45)}>
        <Clip desde={REEL.jamon} />
      </Sequence>
      <Sombra fuerza={0.8} hasta={55} />
      <Titular lineas={TEXTO.lunes} y={250} />
    </Escena>
    <Escena de={48} a={51}>
      <Paper />
      <Titular lineas={TEXTO.miercoles} y={170} color={C.tinta} />
      <Carrusel laminas={['01', '02', '04']} pasos={[b(49) - b(48), b(50) - b(48)]} top={610} />
    </Escena>
    <Escena de={51} a={54}>
      <Foto src="anuncio/historia-mesa.jpg" dur={b(54) - b(51)} desde={1.0} hasta={1.08} pos="50% 62%" />
      <Sombra fuerza={0.65} hasta={48} />
      <Titular lineas={TEXTO.viernes} y={250} />
    </Escena>

    {/* 12 · La frase de la marca */}
    <Escena de={54} a={59}>
      <Paper tint={C.cobalto} />
      <Titular lineas={TEXTO.publica} y={230} escalon={4} />
      <Recorte src="anuncio/mano-copa.png" w={820} x={300} y={1060} en={6} rot={-6} />
    </Escena>

    {/* 13 · 01:47 otra vez, ya a color y sin nada pendiente; firma */}
    <Escena de={59} a={67}>
      <Cierre />
    </Escena>

    {/* Sonido */}
    <Sequence durationInFrames={MUSICA_CORTA}>
      <Audio
        src={staticFile('audio/musica.m4a')}
        volume={(f) => interpolate(f, [0, 2, MUSICA_CORTA - 3, MUSICA_CORTA], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />
    </Sequence>
    <Sequence from={MUSICA_CORTA} durationInFrames={b(34) - MUSICA_CORTA + 14}>
      <Audio
        src={staticFile('audio/anuncio/ambiente.wav')}
        volume={(f) => interpolate(f, [0, 8, b(34) - MUSICA_CORTA, b(34) - MUSICA_CORTA + 14], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />
    </Sequence>
    <Sonido src="persiana" en={b(9)} vol={0.85} />
    <Sonido src="desliza" en={b(23)} vol={0.9} />
    <Sonido src="bloqueo" en={b(26) + 6} vol={0.9} />
    <Sonido src="golpe" en={b(29)} vol={0.85} />
    <Sonido src="notificacion" en={b(34) + 6} vol={0.8} />
    <Sonido src="toque" en={b(34) + 60} vol={0.9} />
    <Sequence from={MUSICA_VUELVE}>
      <Audio
        src={staticFile('audio/musica.m4a')}
        startFrom={MUSICA_DESDE}
        volume={(f) =>
          interpolate(f, [0, 3, DURACION - MUSICA_VUELVE - 30, DURACION - MUSICA_VUELVE], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
        }
      />
    </Sequence>
  </AbsoluteFill>
);
