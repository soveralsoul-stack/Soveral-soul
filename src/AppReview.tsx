import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Series,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BODY } from "./brand/fonts";

/**
 * Vídeo do App Review (Meta), 2ª submissão: uma gravação única do Chrome
 * (demo -> consentimento -> agenda -> publicação -> perfil -> revogação) com
 * legendas em inglês, uma por cena. Sem áudio. Cortes só removem espera; a
 * cena de consentimento fica contínua até o clique em Permitir.
 */

const FPS = 30;
const s = (sec: number) => Math.round(sec * FPS);

type Seg = { src: string; from: number; to: number; caption: string };

export const SEGMENTS: Seg[] = [
  // 1. tela inicial da demo
  { src: "appreview/main.mp4", from: s(3), to: s(12),
    caption: "FlowPilot is a scheduling service. The account owner connects their Instagram professional account to get started." },
  // 2. consentimento com as duas permissoes visiveis, ate o clique em Permitir
  { src: "appreview/main.mp4", from: s(13.5), to: s(26),
    caption: "Instagram Login: the owner grants two permissions, basic profile access and content publishing (instagram_business_content_publish)." },
  // 3. tabela da agenda
  { src: "appreview/main.mp4", from: s(27), to: s(38),
    caption: "Back in FlowPilot: the publishing schedule for the connected account. This table is the product." },
  // 4. explicacao do agendador + botao
  { src: "appreview/main.mp4", from: s(38), to: s(47.5),
    caption: "A scheduler runs every 15 minutes and publishes each item at its time. This is the only reason the app needs the publishing permission." },
  // 5. clique e Media ID
  { src: "appreview/main.mp4", from: s(47.5), to: s(54),
    caption: "The owner runs the scheduler now. FlowPilot publishes the first item through the Instagram Graph API and returns the Media ID." },
  // 6. perfil no Instagram, anel de story
  { src: "appreview/main.mp4", from: s(80.5), to: s(87.5),
    caption: "Opening Instagram: the authorized account now has a new story." },
  // 7. story aberto
  { src: "appreview/main.mp4", from: s(87.5), to: s(93.5),
    caption: "The story published by FlowPilot, live on the authorized account." },
  // 8. revogacao
  { src: "appreview/main.mp4", from: s(112.5), to: s(118),
    caption: "Access can be revoked at any time in Instagram settings." },
  { src: "appreview/main.mp4", from: s(118.5), to: s(127),
    caption: "Website permissions > Apps and websites lists SoveralSoul Publisher, where the owner can remove it. Our privacy policy covers data use and deletion." },
];

export const APP_REVIEW_DURATION = SEGMENTS.reduce(
  (acc, seg) => acc + (seg.to - seg.from),
  0
);

const Caption: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center" }}>
      <div
        style={{
          opacity,
          marginBottom: 42,
          maxWidth: 1500,
          background: "rgba(8, 12, 26, 0.88)",
          border: "1px solid rgba(79, 140, 255, 0.45)",
          borderRadius: 16,
          padding: "20px 36px",
          fontFamily: BODY,
          fontWeight: 600,
          fontSize: 36,
          lineHeight: 1.35,
          color: "#eaf0ff",
          textAlign: "center",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const AppReview: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Series>
        {SEGMENTS.map((seg, i) => (
          <Series.Sequence key={i} durationInFrames={seg.to - seg.from}>
            <OffthreadVideo
              muted
              src={staticFile(seg.src)}
              startFrom={seg.from}
              endAt={seg.to}
              style={{ width: "100%", height: "100%" }}
            />
            <Caption text={seg.caption} />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
