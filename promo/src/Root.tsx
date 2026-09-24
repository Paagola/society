import React from 'react';
import {Composition} from 'remotion';
import {Promo, PROMO_FRAMES} from './Promo';
import {FPS, H, W} from './theme';

export const Root: React.FC = () => (
  <Composition id="SocietyPromo" component={Promo} durationInFrames={PROMO_FRAMES} fps={FPS} width={W} height={H} />
);
