/**
 * SoulBot · Anúncio V2 "Quantos você perdeu?" (Reels/Story 9:16, 15s).
 * Tipografia em ritmo batendo a dor, flash da conversa, fecho com CTA.
 */
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { sb, SB_BODY, SB_DISPLAY, SAFE_BOTTOM, SAFE_TOP } from "./tokens";
import { BrandClose, Bubble, Pop, SbBackground, Typing } from "./shared";

// Ritmo calibrado pra leitura: cada frase de impacto fica ~2.8s na tela.
export const AD_V2_DURATION = 585; // 19.5s @ 30fps (fechamento com ~4.7s de tela)

const CHAT_AT = 262;
const CLOSE_AT = 445;

/** Frase que entra com soco (escala 1.14 -> 1) e sai antes da próxima. */
const Punch: React.FC<{
  from: number;
  to: number;
  children: React.ReactNode;
}> = ({ from, to, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < from || frame > to + 10) return null;
  const p = spring({ frame: frame - from, fps, config: { damping: 60, mass: 0.6 }, durationInFrames: 16 });
  const out = interpolate(frame, [to - 8, to + 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
        opacity: Math.min(p, out),
        transform: `scale(${interpolate(p, [0, 1], [1.14, 1])})`,
      }}
    >
      <div
        style={{
          fontFamily: SB_DISPLAY,
          fontWeight: 800,
          fontSize: 96,
          lineHeight: 1.16,
          letterSpacing: -2,
          textAlign: "center",
          color: "#fff",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

const ChatFlash: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < CHAT_AT) return null;
  const enter = interpolate(frame, [CHAT_AT, CHAT_AT + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const out = interpolate(frame, [CLOSE_AT - 12, CLOSE_AT + 4], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, out), padding: `${SAFE_TOP + 60}px 54px ${SAFE_BOTTOM}px` }}>
      <div
        style={{
          background: sb.waBg,
          borderRadius: 44,
          border: "1px solid rgba(157,176,204,.18)",
          boxShadow: "0 60px 140px -40px rgba(0,0,0,.7)",
          padding: "44px 30px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        <Bubble at={CHAT_AT + 10} side="in" time="19:42">
          Oi, ainda dá tempo de pedir pra hoje?
        </Bubble>
        <Typing from={CHAT_AT + 40} to={CHAT_AT + 62} />
        <Bubble at={CHAT_AT + 62} side="out" time="19:42">
          Dá sim! Entregamos até 22h. Me diz seu bairro que eu já confirmo a taxa
        </Bubble>
      </div>
      <Pop at={CHAT_AT + 100} style={{ marginTop: 46, textAlign: "center" }}>
        <div
          style={{
            fontFamily: SB_BODY,
            fontWeight: 600,
            fontSize: 46,
            lineHeight: 1.4,
            color: sb.ink,
            padding: "0 30px",
          }}
        >
          O SoulBot responde na hora,{" "}
          <span style={{ color: sb.cyan }}>não inventa</span> e te chama pra fechar.
        </div>
      </Pop>
    </AbsoluteFill>
  );
};

export const AdV2: React.FC = () => (
  <AbsoluteFill>
    <SbBackground />
    <Punch from={4} to={85}>
      3 clientes chamaram
      <br />
      <span style={{ color: sb.cyan }}>ontem à noite.</span>
    </Punch>
    <Punch from={89} to={170}>
      Você respondeu
      <br />
      às 9h da manhã.
    </Punch>
    <Punch from={174} to={258}>
      Dois já tinham comprado
      <br />
      <span style={{ color: sb.violet }}>do concorrente.</span>
    </Punch>
    <ChatFlash />
    <BrandClose at={CLOSE_AT} tagline="Atendimento com IA no WhatsApp, 24h, com a sua cara." cta="Chama no WhatsApp" />
  </AbsoluteFill>
);
