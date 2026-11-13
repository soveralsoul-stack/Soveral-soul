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
 * Vídeo do App Review (Meta), 3ª submissão: uma gravação única do Chrome em
 * inglês (demo -> login completo -> consentimento -> compositor -> agenda ->
 * Publish now -> mesmo post aberto no Instagram -> revogação) com legendas em
 * inglês, uma por cena, dizendo o que cada botão faz. Sem áudio. Cortes só
 * removem espera; login e consentimento ficam contínuos até o clique em Allow.
 *
 * ATENÇÃO: os tempos (from/to) abaixo são estimativas. Depois de gravar
 * public/appreview/main-v3.mp4, ajustar cada cena aos segundos reais.
 * Roteiro e motivo da recusa: flowpilot/docs/roteiro-video.md e CHECKLIST.md.
 * A versão da 2ª submissão (main.mp4) fica no histórico do git.
 */

const FPS = 30;
const s = (sec: number) => Math.round(sec * FPS);

type Seg = { src: string; from: number; to: number; caption: string };

const V3 = "appreview/main-v3.mp4";

export const SEGMENTS: Seg[] = [
  // 1. tela inicial da demo, URL visivel
  { src: V3, from: s(2), to: s(10),
    caption: "FlowPilot is a scheduling service for Instagram. The account owner creates posts in FlowPilot, and FlowPilot publishes them to their own account at the time they choose." },
  // 2. clique em Connect Instagram
  { src: V3, from: s(10), to: s(14),
    caption: "The \"Connect Instagram\" button starts Instagram Login, Meta's login flow." },
  // 3. tela de login do Instagram (deslogado), usuario e senha
  { src: V3, from: s(14), to: s(26),
    caption: "The owner logs in to their Instagram professional account." },
  // 4. consentimento, parado nas permissoes, ate o clique em Allow
  { src: V3, from: s(26), to: s(36),
    caption: "Consent screen: the owner grants FlowPilot basic profile access and content publishing (instagram_business_content_publish), then clicks Allow." },
  // 5. volta conectada, agenda vazia
  { src: V3, from: s(37), to: s(44),
    caption: "Back in FlowPilot, connected as the owner's account. The schedule is empty: FlowPilot only publishes what the owner creates here." },
  // 6. Feed post + escolher imagem + preview
  { src: V3, from: s(44), to: s(53),
    caption: "\"Feed post\" sets the format. \"Choose image\" uploads the owner's own photo, shown in the preview." },
  // 7. legenda
  { src: V3, from: s(53), to: s(61),
    caption: "The owner writes the caption. This exact text will appear on Instagram." },
  // 8. data/hora + Add to schedule + linha Scheduled
  { src: V3, from: s(61), to: s(70),
    caption: "The owner picks the date and time and clicks \"Add to schedule\". The post is now in their schedule, marked Scheduled." },
  // 9. paragrafo do agendador
  { src: V3, from: s(70), to: s(78),
    caption: "A scheduler runs every 15 minutes and publishes each post at its time through the Instagram API. This is why FlowPilot needs instagram_business_content_publish." },
  // 10. Publish now -> Published + Media ID
  { src: V3, from: s(78), to: s(86),
    caption: "\"Publish now\" publishes this post immediately instead of waiting for its time. FlowPilot shows the Instagram Media ID." },
  // 11. perfil no Instagram, post novo no topo
  { src: V3, from: s(90), to: s(97),
    caption: "Opening Instagram on the authorized account: the new post is at the top of the profile." },
  // 12. post aberto, imagem e legenda legiveis
  { src: V3, from: s(97), to: s(105),
    caption: "The same post, live: the image and the caption match exactly what the owner created in FlowPilot." },
  // 13. revogacao
  { src: V3, from: s(110), to: s(120),
    caption: "Access can be revoked at any time in Instagram Settings > Website permissions > Apps and websites. Our privacy policy covers data use and deletion." },
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
