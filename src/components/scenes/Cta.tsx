import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Stage } from "../Stage";
import { AnimatedText } from "../AnimatedText";
import { colors, fonts, gradients, type } from "../../brand/tokens";

export const Cta: React.FC<{ wordmark: string; cta: string; handle: string }> = ({
  wordmark,
  cta,
  handle,
}) => {
  const frame = useCurrentFrame();
  const lineWidth = interpolate(frame, [10, 40], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage>
      <div style={{ textAlign: "center" }}>
        <AnimatedText>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: type.subtitle,
              color: colors.creamDim,
              marginBottom: 30,
            }}
          >
            {cta}
          </div>
        </AnimatedText>
        <AnimatedText delay={10}>
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: type.title,
              fontWeight: 600,
              letterSpacing: type.letterSpacingWide,
              color: colors.cream,
            }}
          >
            {wordmark}
          </div>
        </AnimatedText>
        <div
          style={{
            height: 2,
            width: lineWidth,
            margin: "24px auto 0",
            background: gradients.goldSheen,
          }}
        />
        <AnimatedText delay={28}>
          <div
            style={{
              marginTop: 22,
              fontFamily: fonts.body,
              fontSize: type.body,
              letterSpacing: 3,
              color: colors.goldSoft,
            }}
          >
            {handle}
          </div>
        </AnimatedText>
      </div>
    </Stage>
  );
};
