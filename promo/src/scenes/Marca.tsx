import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Brush, Bubble, Paper, Reveal, Sparkle, StarSticker} from '../components';
import {COPY} from '../copy';
import {C, EASE_OUT, FONT, tween} from '../theme';
import {useWide} from '../format';
import {useBt} from '../timing';


// Presentación de la marca: SOCIETY en condensada, la O se convierte en el punto cobalto.
export const Marca: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wide = useWide();
  const bt = useBt();
  const SIZE = wide ? 300 : 330;
  // La O se convierte en el punto cobalto justo en el tiempo 2; la mancha mostaza, a contratiempo.
  const dot = spring({frame: f - (bt(2) - 3), fps, config: {damping: 10, stiffness: 190}});
  const splash = spring({frame: f - (bt(2.5) - 2), fps, config: {damping: 9, stiffness: 160}});
  return (
    <AbsoluteFill>
      <Paper />

      <div style={{position: 'absolute', top: wide ? 190 : 420, width: '100%', display: 'flex', justifyContent: 'center'}}>
        {'SOCIETY'.split('').map((ch, i) => {
          const y = tween(f, bt(0) - 4 + i * 2, bt(0) + 8 + i * 2, [110, 0], EASE_OUT);
          const isO = i === 1;
          return (
            <div key={i} style={{overflow: 'hidden', paddingTop: SIZE * 0.1, position: 'relative'}}>
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: SIZE,
                  lineHeight: 0.92,
                  color: C.tinta,
                  transform: `translateY(${y}%)`,
                  opacity: isO ? 1 - dot : 1,
                  filter: 'url(#tinta)',
                }}
              >
                {ch}
              </div>
              {isO && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '56%',
                      width: SIZE * 0.3,
                      height: SIZE * 0.3,
                      marginLeft: SIZE * 0.02,
                      marginTop: -SIZE * 0.33,
                      borderRadius: '50%',
                      background: C.mostaza,
                      transform: `scale(${splash})`,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '56%',
                      width: SIZE * 0.42,
                      height: SIZE * 0.42,
                      marginLeft: -SIZE * 0.21,
                      marginTop: -SIZE * 0.21,
                      borderRadius: '50%',
                      background: C.cobalto,
                      transform: `scale(${dot})`,
                    }}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>

      <div style={{position: 'absolute', top: wide ? 560 : 820, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Reveal at={bt(3) - 5} dur={11} style={{paddingBottom: 20, paddingRight: 20}}>
          <div style={{fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 800, fontSize: 128, letterSpacing: '-0.035em', color: C.tinta, lineHeight: 1.05}}>
            {COPY.marca.lema}
          </div>
        </Reveal>
        <Brush width={760} at={bt(3.5) - 2} dur={9} style={{marginTop: -18}} />
      </div>

      <Bubble x={wide ? 1320 : 690} y={wide ? 130 : 330} at={bt(4)} size={42} rot={6} />
      <Sparkle x={wide ? 380 : 130} y={wide ? 250 : 330} size={100} at={bt(2.5)} seed={5} />
      <Sparkle x={wide ? 1560 : 960} y={wide ? 700 : 1060} size={80} at={bt(3)} seed={6} />
      <StarSticker x={wide ? 1660 : 800} y={wide ? 860 : 1400} size={wide ? 220 : 250} at={bt(4.5)} lines={COPY.marca.sello} rot={10} />
    </AbsoluteFill>
  );
};
