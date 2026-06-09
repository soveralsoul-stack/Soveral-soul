import React from "react";
import { Stage } from "../Stage";
import { AnimatedText } from "../AnimatedText";
import { colors, fonts, type } from "../../brand/tokens";
import { useLayout } from "../LayoutContext";

export const Services: React.FC<{ title: string; services: string[] }> = ({ title, services }) => {
  const { landscape } = useLayout();
  return (
    <Stage>
      <div style={{ width: landscape ? "78%" : "86%", textAlign: "center" }}>
        <AnimatedText>
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: type.title,
              letterSpacing: type.letterSpacingDisplay,
              textTransform: "uppercase",
              color: colors.white,
              marginBottom: landscape ? 44 : 54,
            }}
          >
            Do detalhe ao <span style={{ color: colors.blue }}>espetáculo.</span>
          </div>
        </AnimatedText>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: landscape ? "1fr 1fr" : "1fr",
            gap: landscape ? "20px 28px" : "22px",
            alignItems: "stretch",
          }}
        >
          {services.map((s, i) => (
            <AnimatedText key={s} delay={14 + i * 10}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  padding: "16px 26px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: 4,
                  background: "rgba(45,143,255,0.04)",
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.body,
                    fontSize: type.caption,
                    color: colors.blue,
                    minWidth: 44,
                    textAlign: "left",
                    letterSpacing: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: fonts.body,
                    fontWeight: 500,
                    fontSize: type.subtitle,
                    color: colors.white,
                    letterSpacing: 0.5,
                  }}
                >
                  {s}
                </span>
              </div>
            </AnimatedText>
          ))}
        </div>
        <span style={{ display: "none" }}>{title}</span>
      </div>
    </Stage>
  );
};
