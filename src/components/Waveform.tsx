import React from "react";
import { useCurrentFrame } from "remotion";
import { colors } from "../brand/tokens";
import { useAudioViz } from "./AudioVizContext";

/** Pseudo-aleatório determinístico por barra (frame-accurate, sem Math.random). */
const seeded = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Waveform — assinatura visual da marca (vem da logo).
 * Quando há trilha, reage ao ÁUDIO REAL (espectro do <AudioVizContext>); sem
 * trilha, cai para uma animação sintética determinística (idêntica em qualquer
 * máquina). Barras simétricas em torno do centro (graves no meio).
 */
export const Waveform: React.FC<{
  width: number;
  barCount?: number;
  maxHeight?: number;
  intensity?: number; // 0..1 — para entrar/sair suavemente
  align?: "center" | "bottom";
}> = ({ width, barCount = 56, maxHeight = 120, intensity = 1, align = "center" }) => {
  const frame = useCurrentFrame();
  const viz = useAudioViz();
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
        let level: number;
        if (viz && viz.length) {
          // simétrico: centro = graves (banda 0), bordas = agudos
          const center = (barCount - 1) / 2;
          const d = Math.abs(i - center) / Math.max(1, center); // 0 no centro → 1 nas bordas
          const idx = Math.min(viz.length - 1, Math.round(d * (viz.length - 1)));
          const amp = Math.sqrt(Math.min(1, viz[idx] * 1.6));
          // micro-movimento pra nunca ficar 100% chapado
          const shimmer = 0.06 * Math.abs(Math.sin(i * 0.7 + frame * 0.25 + seeded(i) * 6));
          level = 0.1 + 0.9 * amp + shimmer;
        } else {
          const phase = seeded(i) * Math.PI * 2;
          const wave =
            Math.sin(i * 0.45 + frame * 0.16 + phase) * 0.5 +
            Math.sin(i * 1.3 - frame * 0.11) * 0.3 +
            (seeded(i + 99) - 0.5) * 0.5;
          level = 0.16 + 0.84 * Math.abs(wave);
        }
        const h = Math.min(maxHeight, level * maxHeight) * intensity;
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
