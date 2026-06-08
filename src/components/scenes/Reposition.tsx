import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Stage } from "../Stage";
import { AnimatedText } from "../AnimatedText";
import { colors, fonts, type } from "../../brand/tokens";

export const Reposition: React.FC<{ negate: string; affirm: string }> = ({ negate, affirm }) => {
  const frame = useCurrentFrame();
  // risco que corta o "Não somos uma agência."
  const strike = interpolate(frame, [30, 48], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const negateDim = interpolate(frame, [40, 56], [1, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Stage>
      <div style={{ textAlign: "center", width: "84%" }}>
        <AnimatedText>
          <div style={{ position: "relative", display: "inline-block", opacity: negateDim }}>
            <span
              style={{
                fontFamily: fonts.body,
                fontWeight: 500,
                fontSize: type.subtitle,
                color: colors.muted,
              }}
            >
              {negate}
            </span>
            <div
              style={{
                position: "absolute",
                top: "52%",
                left: 0,
                height: 3,
                width: `${strike}%`,
                background: colors.blue,
              }}
            />
          </div>
        </AnimatedText>
        <AnimatedText delay={20}>
          <div
            style={{
              marginTop: 34,
              fontFamily: fonts.display,
              fontSize: type.title,
              lineHeight: 1.02,
              letterSpacing: type.letterSpacingDisplay,
              textTransform: "uppercase",
              color: colors.white,
            }}
          >
            Somos a <span style={{ color: colors.blue }}>operação</span>
            <br />
            por trás do seu crescimento.
          </div>
        </AnimatedText>
        {/* parâmetro affirm guardado caso queira voltar à versão em texto corrido */}
        <span style={{ display: "none" }}>{affirm}</span>
      </div>
    </Stage>
  );
};
