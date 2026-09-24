import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Label} from '../components';
import {COPY} from '../copy';
import {C, PAD, tween} from '../theme';

// Cabecera y pie de revista: número, sección y página.
export const Folio: React.FC<{page: number; dark?: boolean; color?: string; footer?: boolean}> = ({page, dark = false, color, footer = true}) => {
  const f = useCurrentFrame();
  const ink = color ?? (dark ? C.papel : C.tinta);
  const o = tween(f, 2, 14);
  const rule = tween(f, 0, 22);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          top: 58,
          left: PAD,
          right: PAD,
          display: 'flex',
          justifyContent: 'space-between',
          opacity: o,
        }}
      >
        <Label size={20} color={ink}>
          {COPY.folio.numero}
        </Label>
        <Label size={20} color={ink}>
          p. {String(page).padStart(2, '0')}
        </Label>
      </div>
      <div style={{position: 'absolute', top: 96, left: PAD, width: `calc((100% - ${PAD * 2}px) * ${rule})`, height: 3, background: ink}} />
      <div
        style={{
          position: 'absolute',
          bottom: 56,
          left: PAD,
          right: PAD,
          display: footer ? 'flex' : 'none',
          justifyContent: 'space-between',
          opacity: o,
        }}
      >
        <Label size={20} color={ink}>
          {COPY.folio.seccion}
        </Label>
        <Label size={20} color={ink}>
          @society
        </Label>
      </div>
    </AbsoluteFill>
  );
};
