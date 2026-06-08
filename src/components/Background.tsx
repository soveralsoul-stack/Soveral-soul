import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, gradients } from "../brand/tokens";

/**
 * Fundo de marca que preenche o FRAME INTEIRO em qualquer formato (9:16, 1:1,
 * 16:9). Fica fora da área de design escalada, então não há nenhuma "borda de
 * quadrado" denunciando o formato de origem. É persistente entre as cenas.
 */
export const Background: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: gradients.stage }}>
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
          background: `radial-gradient(48% 36% at 50% 42%, rgba(45,143,255,0.10), transparent 70%)`,
        }}
      />
      {/* Vinheta nas bordas reais do frame */}
      <AbsoluteFill
        style={{
          boxShadow: `inset 0 0 260px 70px ${colors.bg}`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
