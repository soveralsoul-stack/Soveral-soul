import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, gradients } from "../brand/tokens";

/**
 * Fundo de palco compartilhado por todas as cenas — garante consistência de
 * marca (gradiente + vinheta sutil) sem repetir CSS em cada componente.
 */
export const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AbsoluteFill
      style={{
        background: gradients.stage,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
      {/* Vinheta */}
      <AbsoluteFill
        style={{
          boxShadow: `inset 0 0 240px 80px ${colors.bgDeep}`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
