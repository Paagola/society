import React from 'react';
import {Composition} from 'remotion';
import {Promo, PROMO_FRAMES} from './Promo';
import {FPS, H, W} from './theme';

export const Root: React.FC = () => (
  <>
    {/* Vertical para Reels e historias */}
    <Composition id="SocietyPromo" component={Promo} durationInFrames={PROMO_FRAMES} fps={FPS} width={W} height={H} defaultProps={{wide: false}} />
    {/* Apaisado para web, YouTube y presentaciones */}
    <Composition id="SocietyPromoWide" component={Promo} durationInFrames={PROMO_FRAMES} fps={FPS} width={H} height={W} defaultProps={{wide: true}} />
  </>
);
