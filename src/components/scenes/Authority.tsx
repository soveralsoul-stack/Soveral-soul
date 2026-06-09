import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Stage } from "../Stage";
import { AnimatedText } from "../AnimatedText";
import { Waveform } from "../Waveform";
import { colors, fonts, type } from "../../brand/tokens";

export const Authority: React.FC<{ line: string; place: string }> = ({ line, place }) => {
  const frame = useCurrentFrame();
  const waveIn = interpolate(frame, [6, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Stage>
      <div style={{ textAlign: "center", width: "82%" }}>
        <AnimatedText>
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: type.title,
              lineHeight: 1.05,
              letterSpacing: type.letterSpacingDisplay,
              textTransform: "uppercase",
              color: colors.white,
            }}
          >
            {line}
          </div>
        </AnimatedText>
        <div style={{ display: "flex", justifyContent: "center", margin: "40px 0 24px" }}>
          <Waveform width={620} intensity={waveIn} maxHeight={70} barCount={64} />
        </div>
        <AnimatedText delay={18}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: type.body,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: colors.blue,
            }}
          >
            {place}
          </div>
        </AnimatedText>
      </div>
    </Stage>
  );
};
