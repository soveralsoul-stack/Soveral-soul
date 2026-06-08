import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, gradients } from "../brand/tokens";

/**
 * Fundo de palco compartilhado: gradiente navy da marca + grid sutil + glow
 * azul + vinheta. Mantém consistência visual entre todas as cenas.
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
      {/* Grid técnico sutil */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${colors.border} 1px, transparent 1px), linear-gradient(90deg, ${colors.border} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: 0.18,
        }}
      />
      {/* Glow azul central */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(420px 300px at 50% 42%, rgba(45,143,255,0.10), transparent 70%)`,
        }}
      />
      {children}
      {/* Vinheta */}
      <AbsoluteFill
        style={{
          boxShadow: `inset 0 0 260px 70px ${colors.bg}`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
