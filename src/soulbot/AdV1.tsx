/**
 * SoulBot · Anúncio V1 "19h42" (Reels/Story 9:16, 18s, funciona sem som).
 * Gancho do relógio, conversa real acontecendo, encaminhamento pra humana,
 * fecho de marca com CTA.
 */
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { sb, sbGrad, SB_BODY, SB_DISPLAY, SAFE_TOP, SAFE_BOTTOM, SAFE_SIDE, SAFE_RIGHT_RAIL } from "./tokens";
import { Bubble, BrandClose, Pop, SbBackground, SbMarkSolid, Typing } from "./shared";

// Ritmo calibrado pra leitura de ~3 palavras por segundo: cada mensagem
// tem tempo de ser lida antes da proxima entrar.
export const AD_V1_DURATION = 765; // 25.5s @ 30fps (fechamento com ~4.7s de tela)

const CHAT_IN = 70;
const CLOSE_AT = 625;

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [CHAT_IN - 14, CHAT_IN], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: out }}>
      <Pop at={4}>
        <div
          style={{
            fontFamily: SB_DISPLAY,
            fontWeight: 800,
            fontSize: 300,
            letterSpacing: -6,
            color: "#fff",
            textShadow: `0 0 120px ${sb.cyan}55`,
          }}
        >
          19:42
        </div>
      </Pop>
      <Pop at={18} style={{ marginTop: 10, maxWidth: 800, textAlign: "center" }}>
        <div style={{ fontFamily: SB_BODY, fontWeight: 600, fontSize: 54, lineHeight: 1.35, color: sb.ink }}>
          Cozinha lotada.
          <br />
          <span style={{ color: sb.muted }}>E o WhatsApp tocando.</span>
        </div>
      </Pop>
    </AbsoluteFill>
  );
};

const Chat: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [CHAT_IN, CHAT_IN + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const out = interpolate(frame, [CLOSE_AT - 12, CLOSE_AT + 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (frame < CHAT_IN) return null;
  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(enter, out),
        transform: `translateY(${interpolate(enter, [0, 1], [60, 0])}px)`,
        padding: `${SAFE_TOP}px ${SAFE_RIGHT_RAIL}px ${SAFE_BOTTOM + 150}px ${SAFE_SIDE}px`,
      }}
    >
      <div
        style={{
          background: sb.waBg,
          borderRadius: 44,
          overflow: "hidden",
          border: "1px solid rgba(157,176,204,.18)",
          boxShadow: "0 60px 140px -40px rgba(0,0,0,.7)",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            padding: "30px 34px",
            background: sb.waTop,
            borderBottom: "1px solid rgba(255,255,255,.05)",
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: sbGrad,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SbMarkSolid size={52} />
          </div>
          <div>
            <div style={{ fontFamily: SB_DISPLAY, fontWeight: 600, fontSize: 40, color: "#fff" }}>Sabor do Dendê</div>
            <div style={{ fontFamily: SB_BODY, fontSize: 28, color: sb.cyan }}>online agora</div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(180deg, ${sb.waBg}, ${sb.waBg2})`,
          }}
        >
          {/* Coluna ancorada no rodape: a mensagem mais nova fica sempre
              inteira e as antigas saem pelo topo, como num chat real. */}
          <div
            style={{
              position: "absolute",
              left: 30,
              right: 30,
              bottom: 30,
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
          <Bubble at={100} side="in" time="19:42">
            Oi, vocês entregam hoje? Queria uma moqueca
          </Bubble>
          <Typing from={132} to={165} />
          <Bubble at={165} side="out" time="19:42">
            Oi! Entregamos sim, até 22h aqui na região central. A{" "}
            <span style={{ color: "#7FE9D6" }}>moqueca de peixe</span> serve bem 2 pessoas
          </Bubble>
          <Bubble at={290} side="in" time="19:43">
            Perfeito. E tem sem pimenta?
          </Bubble>
          <Typing from={318} to={350} />
          <Bubble at={350} side="out" time="19:43">
            Tem sim, a gente separa a pimenta à parte. Quer que eu já chame alguém do salão pra fechar seu pedido?
          </Bubble>
          <Pop at={490} style={{ alignSelf: "center" }}>
            <div
              style={{
                fontFamily: SB_BODY,
                fontSize: 28,
                color: sb.muted,
                background: "rgba(139,92,246,.12)",
                border: "1px solid rgba(139,92,246,.35)",
                padding: "14px 30px",
                borderRadius: 100,
              }}
            >
              Cliente encaminhado pra atendente humana
            </div>
          </Pop>
          <Bubble at={515} side="out" time="19:43">
            A Fabi vai te chamar em 1 minutinho pra confirmar o endereço
          </Bubble>
          </div>
        </div>
      </div>

      <Pop at={548} style={{ position: "absolute", left: 0, right: 0, bottom: SAFE_BOTTOM + 24, textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            fontFamily: SB_DISPLAY,
            fontWeight: 700,
            fontSize: 56,
            color: "#fff",
            background: "rgba(11,24,48,.85)",
            border: "1px solid rgba(23,179,196,.35)",
            padding: "22px 48px",
            borderRadius: 28,
          }}
        >
          Ele qualifica. <span style={{ color: sb.cyan }}>Você fecha.</span>
        </div>
      </Pop>
    </AbsoluteFill>
  );
};

export const AdV1: React.FC = () => (
  <AbsoluteFill>
    <SbBackground />
    <Hook />
    <Chat />
    <BrandClose
      at={CLOSE_AT}
      tagline="Seu WhatsApp atendendo 24h. Teste grátis por 7 dias."
      cta="soulbot.app.br"
    />
  </AbsoluteFill>
);
