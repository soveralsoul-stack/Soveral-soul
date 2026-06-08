import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Stage } from "../Stage";
import { AnimatedText } from "../AnimatedText";
import { colors, fonts, type } from "../../brand/tokens";

export const HeroImpact: React.FC<{ pre: string; merece: string; impact: string }> = ({
  pre,
  merece,
  impact,
}) => {
  const frame = useCurrentFrame();
  // brilho que varre o "IMPACTO."
  const sheen = interpolate(frame, [22, 55], [-120, 220], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const line: React.CSSProperties = {
    fontFamily: fonts.display,
    fontSize: type.hero,
    lineHeight: 0.92,
    letterSpacing: type.letterSpacingDisplay,
    color: colors.white,
    textTransform: "uppercase",
  };

  return (
    <Stage>
      <div style={{ textAlign: "center" }}>
        <AnimatedText>
          <div style={line}>{pre}</div>
        </AnimatedText>
        <AnimatedText delay={8}>
          <div style={line}>{merece}</div>
        </AnimatedText>
        <AnimatedText delay={16}>
          <div style={{ position: "relative", ...line, color: colors.blue }}>
            {impact}
            {/* varredura de brilho */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(100deg, transparent 40%, rgba(0,212,255,0.65) 50%, transparent 60%)`,
                transform: `translateX(${sheen}%)`,
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
            />
          </div>
        </AnimatedText>
      </div>
    </Stage>
  );
};
