/**
 * Peças compartilhadas dos anúncios SoulBot: fundo, símbolo, wordmark,
 * bolhas de chat e fecho de marca. Base de design: 1080x1920 (9:16).
 */
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { sb, sbGrad, sbStage, SB_BODY, SB_DISPLAY, SAFE_BOTTOM } from "./tokens";

/** Fundo navy com glows ciano/violeta, mesma atmosfera da landing. */
export const SbBackground: React.FC = () => (
  <AbsoluteFill style={{ background: sbStage }}>
    <div
      style={{
        position: "absolute",
        width: 700,
        height: 700,
        borderRadius: "50%",
        background: sb.cyan,
        filter: "blur(180px)",
        opacity: 0.16,
        top: -220,
        right: -180,
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 760,
        height: 760,
        borderRadius: "50%",
        background: sb.violet,
        filter: "blur(200px)",
        opacity: 0.13,
        bottom: -260,
        left: -240,
      }}
    />
  </AbsoluteFill>
);

/** Símbolo da marca: balão de conversa com hub de 3 nós. */
export const SbMark: React.FC<{ size?: number }> = ({ size = 140 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <defs>
      <linearGradient id="sbmg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={sb.cyan} />
        <stop offset="1" stopColor={sb.violet} />
      </linearGradient>
    </defs>
    <path
      d="M7 5h26a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H16l-8 6v-6H7a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4Z"
      fill="url(#sbmg)"
      opacity={0.16}
    />
    <path
      d="M7 5h26a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H16l-8 6v-6H7a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4Z"
      fill="none"
      stroke="url(#sbmg)"
      strokeWidth={1.6}
    />
    <circle cx={14} cy={14} r={2.7} fill="url(#sbmg)" />
    <circle cx={27} cy={12} r={2.7} fill={sb.cyan} />
    <circle cx={24} cy={24} r={2.7} fill={sb.violet} />
    <path d="M14 14 27 12 24 24 14 14" fill="none" stroke="url(#sbmg)" strokeWidth={1.4} strokeLinejoin="round" />
  </svg>
);

export const SbWordmark: React.FC<{ size?: number }> = ({ size = 96 }) => (
  <div style={{ fontFamily: SB_DISPLAY, fontWeight: 800, fontSize: size, letterSpacing: 1 }}>
    <span style={{ color: "#fff" }}>SOUL</span>
    <span style={{ color: sb.cyan }}>BOT</span>
  </div>
);

/** Entrada com mola: fade + subida + blur saindo (padrão da casa). */
export const Pop: React.FC<{
  at: number;
  dur?: number;
  y?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ at, dur = 26, y = 34, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Antes da hora, fora do layout: num chat ancorado no rodape, elemento
  // invisivel ocupando espaco empurraria as mensagens visiveis pra cima.
  if (frame < at) return null;
  const p = spring({ frame: frame - at, fps, config: { damping: 200, mass: 0.9 }, durationInFrames: dur });
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [y, 0])}px)`,
        filter: `blur(${interpolate(p, [0, 1], [6, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Indicador de digitando (3 pontos pulsando), some quando a resposta entra. */
export const Typing: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  const enter = interpolate(frame, [from, from + 8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        alignSelf: "flex-start",
        background: sb.waIn,
        borderRadius: 26,
        borderBottomLeftRadius: 8,
        padding: "26px 34px",
        display: "flex",
        gap: 12,
        opacity: enter,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: sb.muted,
            opacity: 0.4 + 0.6 * Math.abs(Math.sin((frame - from) / 6 + i * 1.1)),
          }}
        />
      ))}
    </div>
  );
};

export interface BubbleProps {
  at: number;
  side: "in" | "out";
  time: string;
  children: React.ReactNode;
}

/** Bolha de chat no estilo da landing, dimensionada pra 1080 de largura. */
export const Bubble: React.FC<BubbleProps> = ({ at, side, time, children }) => (
  <Pop
    at={at}
    y={26}
    style={{
      alignSelf: side === "in" ? "flex-start" : "flex-end",
      maxWidth: "82%",
    }}
  >
    <div
      style={{
        background: side === "in" ? sb.waIn : sb.waOut,
        borderRadius: 26,
        borderBottomLeftRadius: side === "in" ? 8 : 26,
        borderBottomRightRadius: side === "out" ? 8 : 26,
        padding: "26px 32px",
        fontFamily: SB_BODY,
        fontSize: 40,
        lineHeight: 1.42,
        color: sb.ink,
      }}
    >
      {children}
      <div style={{ fontSize: 26, color: "rgba(234,241,251,.45)", textAlign: "right", marginTop: 8 }}>{time}</div>
    </div>
  </Pop>
);

/** Fecho de marca: símbolo, wordmark, tagline e CTA. Ocupa a tela toda. */
export const BrandClose: React.FC<{ at: number; tagline: string; cta: string }> = ({ at, tagline, cta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 200 }, durationInFrames: 30 });
  if (frame < at) return null;
  return (
    <AbsoluteFill style={{ opacity: p }}>
      <SbBackground />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: SAFE_BOTTOM - 120,
        }}
      >
        <Pop at={at + 2}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SbMark size={220} />
          </div>
        </Pop>
        <Pop at={at + 8} style={{ marginTop: 30 }}>
          <SbWordmark size={110} />
        </Pop>
        <Pop at={at + 14} style={{ marginTop: 26, maxWidth: 760, textAlign: "center" }}>
          <div style={{ fontFamily: SB_BODY, fontWeight: 500, fontSize: 42, lineHeight: 1.4, color: sb.muted }}>
            {tagline}
          </div>
        </Pop>
        <Pop at={at + 20} style={{ marginTop: 56 }}>
          <div
            style={{
              background: sbGrad,
              color: "#06111F",
              fontFamily: SB_DISPLAY,
              fontWeight: 700,
              fontSize: 44,
              padding: "30px 64px",
              borderRadius: 24,
              boxShadow: "0 22px 70px -18px rgba(23,179,196,.55)",
            }}
          >
            {cta}
          </div>
        </Pop>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
