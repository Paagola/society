import React from 'react';
import {Composition} from 'remotion';
import {Promo, PROMO_FRAMES} from './Promo';
import {Anuncio} from './anuncio/Anuncio';
import {DURACION} from './anuncio/guion';
import {SistemaStoryboard, TOMAS} from './sistema/Storyboard';
import {PapelStoryboard, TOMAS_PAPEL} from './papel/Storyboard';
import {FPS, H, W} from './theme';
import {PapelPrueba} from './pizza/Prueba';
import {Pizza} from './pizza/Pizza';
import {DURACION as DURACION_PIZZA} from './pizza/guion';
import {Startup, DURACION_STARTUP} from './startup/Startup';
import {Recortado, DURACION_RECORTADO} from './recortado/Recortado';
import {ComoFunciona, DURACION_COMO_FUNCIONA} from './recorte/guiones/ComoFunciona';
import {LogoOficial} from './marca/LogoOficial';
import {Agencia, DURACION_AGENCIA} from './agencia/Agencia';

export const Root: React.FC = () => (
  <>
    {/* «Tu agencia con IA»: de 3 «me gusta» al panel de Society, papel + startup, cámara sobre un solo lienzo (28/09/2026) */}
    <Composition id="SocietyAgencia" component={Agencia} durationInFrames={DURACION_AGENCIA} fps={FPS} width={W} height={H} />
    {/* «Así funciona Society»: vídeo explicativo en papel con el motor de recorte automático (27/09/2026), vertical */}
    <Composition id="SocietyComoFunciona" component={ComoFunciona} durationInFrames={DURACION_COMO_FUNCIONA} fps={FPS} width={W} height={H} />
    {/* Logotipo oficial (fotograma fijo para la identidad) */}
    <Composition id="SocietyLogo" component={LogoOficial} durationInFrames={60} fps={FPS} width={1080} height={1080} />
    {/* «La terraza que se llena»: escena de papel cortada en piezas y montada en stop-motion (27/09/2026), vertical */}
    <Composition id="SocietyRecortado" component={Recortado} durationInFrames={DURACION_RECORTADO} fps={FPS} width={W} height={H} />
    {/* «La pizza que nadie vio», versión startup con GSAP (26/09/2026), vertical */}
    <Composition id="SocietyPizzaStartup" component={Startup} durationInFrames={DURACION_STARTUP} fps={FPS} width={W} height={H} />
    {/* Anuncio «La pizza que nadie vio» (concepto A con los cambios del 26/09/2026), vertical */}
    <Composition id="SocietyPizza" component={Pizza} durationInFrames={DURACION_PIZZA} fps={FPS} width={W} height={H} />
    {/* Banco de pruebas del papel que se arruga */}
    <Composition id="PapelPrueba" component={PapelPrueba} durationInFrames={70} fps={FPS} width={W} height={H} />
    {/* Anuncio «El sistema» en papel: storyboard, un fotograma por toma */}
    <Composition id="PapelStoryboard" component={PapelStoryboard} durationInFrames={TOMAS_PAPEL.length} fps={FPS} width={W} height={H} />
    {/* Anuncio «El sistema»: storyboard, un fotograma por toma */}
    <Composition id="SistemaStoryboard" component={SistemaStoryboard} durationInFrames={TOMAS.length} fps={FPS} width={W} height={H} />
    {/* Anuncio «La 1:47» (vertical, Reels) */}
    <Composition id="SocietyAnuncio" component={Anuncio} durationInFrames={DURACION} fps={FPS} width={W} height={H} />
    {/* Vertical para Reels e historias */}
    <Composition id="SocietyPromo" component={Promo} durationInFrames={PROMO_FRAMES} fps={FPS} width={W} height={H} defaultProps={{wide: false}} />
    {/* Apaisado para web, YouTube y presentaciones */}
    <Composition id="SocietyPromoWide" component={Promo} durationInFrames={PROMO_FRAMES} fps={FPS} width={H} height={W} defaultProps={{wide: true}} />
  </>
);
