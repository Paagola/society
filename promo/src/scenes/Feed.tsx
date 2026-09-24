import React from 'react';
import {AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Body, Brush, Headline, Line, Paper} from '../components';
import {COPY} from '../copy';
import {C, FONT, PAD, tween} from '../theme';
import {Folio} from './Folio';

const TILE = 300;
const GAP = 18;

type Tile =
  | {kind: 'poster'; bg: 'papel' | 'cobalto'; lines: Line[]; img?: string; imgStyle?: React.CSSProperties; extra?: 'dot' | 'brush' | 'nuevo' | 'bubble'}
  | {kind: 'photo'; img: string};

// Los nueve posts del feed de la guía de identidad, en miniatura.
const TILES: Tile[] = [
  {kind: 'poster', bg: 'papel', lines: [{t: 'TU TERRAZA'}, {t: 'merece', it: true}, {t: 'llenarse', it: true}], img: 'mano-copa-v2.png', imgStyle: {width: 190, left: -10, bottom: -20}, extra: 'bubble'},
  {kind: 'poster', bg: 'cobalto', lines: [{t: 'MÁS MESAS,'}, {t: 'menos', it: true}, {t: 'esfuerzo', it: true}], extra: 'nuevo'},
  {kind: 'poster', bg: 'papel', lines: [{t: 'NADIE VA'}, {t: 'a donde', it: true}, {t: 'no ve', it: true}], img: 'movil-mano.png', imgStyle: {width: 150, right: 8, bottom: 8}},
  {kind: 'poster', bg: 'cobalto', lines: [{t: 'EL MENÚ'}, {t: 'del día,', it: true}, {t: 'bonito', it: true}], extra: 'dot'},
  {kind: 'photo', img: 'alcachofas-color.png'},
  {kind: 'poster', bg: 'papel', lines: [{t: 'HECHO'}, {t: 'con IA', it: true}], img: 'coctel.png', imgStyle: {width: 160, right: 10, bottom: 10}},
  {kind: 'photo', img: 'bar-esquina.png'},
  {kind: 'poster', bg: 'papel', lines: [{t: 'ESTAMOS'}, {t: 'ABIERTOS'}], extra: 'brush'},
  {kind: 'poster', bg: 'cobalto', lines: [], img: 'mano-copa-v2.png', imgStyle: {width: 280, left: 0, bottom: -10}, extra: 'bubble'},
];
const ORDER = [4, 0, 8, 2, 6, 1, 5, 3, 7];

const PostTile: React.FC<{tile: Tile; at: number}> = ({tile, at}) => {
  const ink = tile.kind === 'poster' && tile.bg === 'cobalto' ? C.papel : C.tinta;
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 4}}>
      {tile.kind === 'photo' ? (
        <Img src={staticFile(`img/${tile.img}`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      ) : (
        <>
          <Paper tint={tile.bg === 'cobalto' ? C.cobalto : undefined} />
          {tile.img && <Img src={staticFile(`img/${tile.img}`)} style={{position: 'absolute', ...tile.imgStyle}} />}
          <Headline lines={tile.lines} size={56} at={at + 4} stagger={3} color={ink} style={{position: 'absolute', left: 16, top: 6}} />
          {tile.extra === 'dot' && <div style={{position: 'absolute', right: 22, bottom: 22, width: 30, height: 30, borderRadius: 20, background: C.mostaza}} />}
          {tile.extra === 'brush' && (
            <div style={{position: 'absolute', left: 18, top: 190}}>
              <Brush width={230} at={at + 10} />
            </div>
          )}
          {tile.extra === 'nuevo' && (
            <div
              style={{
                position: 'absolute',
                right: 16,
                bottom: 22,
                background: C.mostaza,
                color: C.tinta,
                fontFamily: FONT.display,
                fontSize: 30,
                padding: '8px 16px',
                transform: 'rotate(-8deg)',
                borderRadius: 6,
              }}
            >
              NUEVO
            </div>
          )}
          {tile.extra === 'bubble' && (
            <div
              style={{
                position: 'absolute',
                right: 14,
                bottom: 30,
                background: C.mostaza,
                color: C.tinta,
                fontFamily: FONT.ui,
                fontWeight: 700,
                fontSize: 20,
                padding: '8px 13px',
                borderRadius: 16,
                transform: 'rotate(-6deg)',
              }}
            >
              @society
            </div>
          )}
        </>
      )}
    </div>
  );
};

// El resultado: un feed entero, con criterio y con la marca del local.
export const Feed: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const zoom = 1 + tween(f, 30, 160, [0, 0.05], (t) => t);
  const gridW = TILE * 3 + GAP * 2;
  return (
    <AbsoluteFill>
      <Paper />
      <Folio page={5} />
      <Headline lines={COPY.feed.titular} size={240} at={4} stagger={6} style={{position: 'absolute', left: PAD - 4, top: 130}} />
      <Body size={32} style={{position: 'absolute', right: PAD, top: 450, width: 330, textAlign: 'right', opacity: tween(f, 18, 30)}}>
        Posts, carruseles, historias y reels con criterio.
      </Body>
      <div
        style={{
          position: 'absolute',
          left: (1080 - gridW) / 2,
          top: 620,
          width: gridW,
          height: gridW,
          transform: `scale(${zoom})`,
        }}
      >
        {TILES.map((tile, i) => {
          const at = 14 + ORDER.indexOf(i) * 6;
          const s = spring({frame: f - at, fps, config: {damping: 13, stiffness: 160}});
          const col = i % 3;
          const row = Math.floor(i / 3);
          const rot = ((i * 37) % 7) - 3;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: col * (TILE + GAP),
                top: row * (TILE + GAP),
                width: TILE,
                height: TILE,
                opacity: f < at ? 0 : 1,
                transform: `translateY(${(1 - s) * 120}px) scale(${1.25 - 0.25 * s}) rotate(${rot * (1 - s)}deg)`,
                boxShadow: `0 ${10 * (1 - s)}px ${30 * (1 - s)}px rgba(20,20,20,.2)`,
              }}
            >
              <PostTile tile={tile} at={at} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
