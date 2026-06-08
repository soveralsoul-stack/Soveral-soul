import React from "react";
import { Stage } from "../Stage";
import { AnimatedText } from "../AnimatedText";
import { colors, fonts, type } from "../../brand/tokens";

interface Pillar {
  label: string;
  color: string;
}

export const Pillars: React.FC<{ title: string; pillars: Pillar[] }> = ({
  title,
  pillars,
}) => {
  return (
    <Stage>
      <div style={{ textAlign: "center", width: "82%" }}>
        <AnimatedText>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: type.subtitle,
              color: colors.creamDim,
              marginBottom: 56,
              letterSpacing: 1,
            }}
          >
            {title}
          </div>
        </AnimatedText>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {pillars.map((p, i) => (
            <AnimatedText key={p.label} delay={18 + i * 16}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                }}
              >
                <span style={{ width: 14, height: 14, borderRadius: 14, background: p.color }} />
                <span
                  style={{
                    fontFamily: fonts.display,
                    fontSize: type.title,
                    fontWeight: 600,
                    color: colors.cream,
                  }}
                >
                  {p.label}
                </span>
              </div>
            </AnimatedText>
          ))}
        </div>
      </div>
    </Stage>
  );
};
