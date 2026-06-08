import React from "react";
import { Stage } from "../Stage";
import { AnimatedText } from "../AnimatedText";
import { colors, fonts, type } from "../../brand/tokens";

export const Tagline: React.FC<{ lines: string[]; accentIndex: number }> = ({
  lines,
  accentIndex,
}) => {
  return (
    <Stage>
      <div style={{ textAlign: "center" }}>
        {lines.map((line, i) => (
          <AnimatedText key={i} delay={i * 10}>
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: type.hero,
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: type.letterSpacingTight,
                color: i === accentIndex ? colors.gold : colors.cream,
                fontStyle: i === accentIndex ? "italic" : "normal",
              }}
            >
              {line}
            </div>
          </AnimatedText>
        ))}
      </div>
    </Stage>
  );
};
