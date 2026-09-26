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

export const Root: React.FC = () => (
  <>
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
