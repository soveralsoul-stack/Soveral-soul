import React from "react";
import { useCurrentFrame } from "remotion";
import { colors } from "../brand/tokens";

/** Pseudo-aleatório determinístico por barra (frame-accurate, sem Math.random). */
const seeded = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Waveform de áudio animada — assinatura visual da marca (vem da logo).
 * Determinística por frame, então renderiza idêntica em qualquer máquina.
 */
export const Waveform: React.FC<{
  width: number;
  barCount?: number;
  maxHeight?: number;
  intensity?: number; // 0..1 — para entrar/sair suavemente
  align?: "center" | "bottom";
}> = ({ width, barCount = 56, maxHeight = 120, intensity = 1, align = "center" }) => {
  const frame = useCurrentFrame();
  const gap = 6;
  const barWidth = Math.max(2, (width - gap * (barCount - 1)) / barCount);

  return (
    <div
      style={{
        display: "flex",
        alignItems: align === "center" ? "center" : "flex-end",
        justifyContent: "center",
        gap,
        width,
        height: maxHeight,
      }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const phase = seeded(i) * Math.PI * 2;
        const wave =
          Math.sin(i * 0.45 + frame * 0.16 + phase) * 0.5 +
          Math.sin(i * 1.3 - frame * 0.11) * 0.3 +
          (seeded(i + 99) - 0.5) * 0.5;
        const h = (0.16 + 0.84 * Math.abs(wave)) * maxHeight * intensity;
        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: Math.max(2, h),
              borderRadius: barWidth,
              background: `linear-gradient(180deg, ${colors.cyan} 0%, ${colors.blue} 60%, ${colors.blueDim} 100%)`,
              opacity: 0.85 * intensity,
            }}
          />
        );
      })}
    </div>
  );
};
