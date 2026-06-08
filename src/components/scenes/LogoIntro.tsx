import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../Stage";
import { Logo, Wordmark } from "../Logo";
import { Waveform } from "../Waveform";
import { colors, fonts, type } from "../../brand/tokens";

export const LogoIntro: React.FC<{ eyebrow: string }> = ({ eyebrow }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({ frame, fps, config: { damping: 12, mass: 0.6 }, durationInFrames: 30 });
  const wordIn = spring({ frame: frame - 14, fps, config: { damping: 200 }, durationInFrames: 24 });
  const eyebrowOp = interpolate(frame, [28, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const waveIn = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Stage>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
        <div style={{ transform: `scale(${pop})`, opacity: pop }}>
          <Logo size={210} />
        </div>
        <div style={{ opacity: wordIn, transform: `translateY(${interpolate(wordIn, [0, 1], [18, 0])}px)` }}>
          <Wordmark fontSize={type.title} letterSpacing={4} />
        </div>
        <div
          style={{
            opacity: eyebrowOp,
            fontFamily: fonts.body,
            fontSize: type.caption,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: colors.muted,
          }}
        >
          {eyebrow}
        </div>
        <div style={{ marginTop: 10 }}>
          <Waveform width={520} intensity={waveIn} maxHeight={90} />
        </div>
      </div>
    </Stage>
  );
};
