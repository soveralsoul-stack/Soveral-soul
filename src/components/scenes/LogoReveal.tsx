import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../Stage";
import { colors, fonts, gradients, type } from "../../brand/tokens";

export const LogoReveal: React.FC<{ wordmark: string; kicker: string }> = ({
  wordmark,
  kicker,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 40 });
  const letterSpacing = interpolate(reveal, [0, 1], [40, type.letterSpacingWide]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);

  // Linha dourada que se expande sob o wordmark
  const lineWidth = interpolate(reveal, [0.3, 1], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kickerOpacity = interpolate(frame, [22, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage>
      <div style={{ textAlign: "center", opacity }}>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: type.title,
            fontWeight: 600,
            color: colors.cream,
            letterSpacing,
            whiteSpace: "nowrap",
          }}
        >
          {wordmark}
        </div>
        <div
          style={{
            height: 2,
            width: lineWidth,
            margin: "28px auto 0",
            background: gradients.goldSheen,
          }}
        />
        <div
          style={{
            marginTop: 24,
            fontFamily: fonts.body,
            fontSize: type.caption,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: colors.goldSoft,
            opacity: kickerOpacity,
          }}
        >
          {kicker}
        </div>
      </div>
    </Stage>
  );
};
