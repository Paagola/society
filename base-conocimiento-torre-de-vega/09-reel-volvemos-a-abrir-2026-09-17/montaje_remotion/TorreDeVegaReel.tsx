import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  CalculateMetadataFunction,
  OffthreadVideo,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Vertical 9:16 Reel for Torre de Vega: hard cuts between clips, approved
// typography (Bodoni MT Regular, wide tracking, hairline rule, soft shadow,
// never a black outline).

const FPS = 30;
const FONT_FAMILY = "TdvBodoni";

export type ReelShot = {
  id: string;
  src: string;
  /** Seconds into the source clip where this shot starts. */
  from: number;
  duration: number;
  /** Push-in over the shot, e.g. 0.04 = 4 %. Negative pulls out. */
  push?: number;
  muted?: boolean;
  volume?: number;
};

export type ReelTitle = {
  text: string;
  start: number;
  end: number;
  /** Vertical centre of the text block, in px from the top of 1920. */
  y: number;
  fontSize?: number;
  tracking?: number;
};

export type ReelBrandCard = {
  start: number;
  end: number;
  y: number;
  title: string;
  subtitle: string;
};

export type TorreDeVegaReelProps = {
  shots: ReelShot[];
  titles: ReelTitle[];
  brand?: ReelBrandCard;
  voice?: { src: string; start: number; volume?: number };
  music?: { src: string; volume?: number };
};

const useBodoni = () => {
  const [handle] = useState(() => delayRender("Loading Bodoni MT"));
  useEffect(() => {
    const face = new FontFace(FONT_FAMILY, `url(${staticFile("reel09/BOD_R.TTF")})`);
    face
      .load()
      .then((loaded) => {
        document.fonts.add(loaded);
        continueRender(handle);
      })
      .catch((err) => {
        console.error(err);
        continueRender(handle);
      });
  }, [handle]);
};

const textShadow =
  "0 0 14px rgba(0,0,0,0.6), 0 0 34px rgba(0,0,0,0.5), 0 0 70px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.45)";

const Shot: React.FC<{ shot: ReelShot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  const total = Math.round(shot.duration * FPS);
  const push = shot.push ?? 0;
  const scale = interpolate(frame, [0, total], [1, 1 + push], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <OffthreadVideo
        src={staticFile(shot.src)}
        trimBefore={Math.round(shot.from * FPS)}
        muted={shot.muted ?? true}
        volume={shot.volume ?? 1}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

const fadeWindow = (frame: number, startF: number, endF: number, fadeIn: number, fadeOut: number) => {
  if (frame < startF || frame >= endF) return 0;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const inO = fadeIn > 0 ? interpolate(frame, [startF, startF + fadeIn], [0, 1], clamp) : 1;
  const outO = fadeOut > 0 ? interpolate(frame, [endF - fadeOut, endF], [1, 0], clamp) : 1;
  return Math.min(inO, outO);
};

const Title: React.FC<{ title: ReelTitle; isFirst: boolean }> = ({ title, isFirst }) => {
  const frame = useCurrentFrame();
  const startF = Math.round(title.start * FPS);
  const endF = Math.round(title.end * FPS);
  // The hook title is on screen from frame 1 (rule 12), so no fade-in there.
  const opacity = fadeWindow(frame, startF, endF, isFirst ? 0 : 6, 5);
  const rise = isFirst ? 0 : interpolate(frame, [startF, startF + 12], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fontSize = title.fontSize ?? 50;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: title.y - fontSize / 2 + rise,
        textAlign: "center",
        fontFamily: FONT_FAMILY,
        fontSize,
        letterSpacing: `${(title.tracking ?? 340) / 1000}em`,
        color: "#FFFFFF",
        textShadow,
        opacity,
        whiteSpace: "nowrap",
        // letter-spacing adds trailing space after the last glyph; compensate
        paddingLeft: `${(title.tracking ?? 340) / 1000}em`,
      }}
    >
      {title.text}
    </div>
  );
};

const BrandCard: React.FC<{ brand: ReelBrandCard }> = ({ brand }) => {
  const frame = useCurrentFrame();
  const startF = Math.round(brand.start * FPS);
  const endF = Math.round(brand.end * FPS);
  const titleOpacity = fadeWindow(frame, startF, endF + 1, 9, 1);
  const rule = interpolate(frame, [startF + 4, startF + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subOpacity = fadeWindow(frame, startF + 8, endF + 1, 9, 1);
  const common: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: FONT_FAMILY,
    color: "#FFFFFF",
    textShadow,
    whiteSpace: "nowrap",
  };
  return (
    <>
      <div style={{ ...common, top: brand.y - 58, fontSize: 60, letterSpacing: "0.42em", paddingLeft: "0.42em", opacity: titleOpacity }}>
        {brand.title}
      </div>
      <div
        style={{
          position: "absolute",
          left: 540 - 180 * rule,
          width: 360 * rule,
          top: brand.y + 26,
          height: 2,
          background: "#FFFFFF",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          opacity: titleOpacity,
        }}
      />
      <div style={{ ...common, top: brand.y + 50, fontSize: 38, letterSpacing: "0.5em", paddingLeft: "0.5em", opacity: subOpacity }}>
        {brand.subtitle}
      </div>
    </>
  );
};

export const calculateReelMetadata: CalculateMetadataFunction<TorreDeVegaReelProps> = async ({ props }) => {
  let t = 0;
  for (const s of props.shots) t += s.duration;
  return { durationInFrames: Math.max(1, Math.round(t * FPS)), fps: FPS, width: 1080, height: 1920 };
};

export const TorreDeVegaReel: React.FC<TorreDeVegaReelProps> = ({ shots, titles, brand, voice, music }) => {
  useBodoni();
  const { durationInFrames } = useVideoConfig();
  let cursor = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {shots.map((shot) => {
        const from = Math.round(cursor * FPS);
        cursor += shot.duration;
        return (
          <Sequence key={shot.id} from={from} durationInFrames={Math.round(shot.duration * FPS)} name={shot.id}>
            <Shot shot={shot} />
          </Sequence>
        );
      })}
      {titles.map((title, i) => (
        <Title key={`${title.text}-${i}`} title={title} isFirst={i === 0 && title.start === 0} />
      ))}
      {brand ? <BrandCard brand={brand} /> : null}
      {voice ? (
        <Sequence from={Math.round(voice.start * FPS)} name="voz">
          <Audio src={staticFile(voice.src)} volume={voice.volume ?? 1} />
        </Sequence>
      ) : null}
      {music ? (
        <Audio
          src={staticFile(music.src)}
          volume={(f) =>
            (music.volume ?? 0.2) *
            Math.min(
              interpolate(f, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
              interpolate(f, [durationInFrames - 30, durationInFrames], [1, 0], { extrapolateLeft: "clamp" }),
            )
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};
