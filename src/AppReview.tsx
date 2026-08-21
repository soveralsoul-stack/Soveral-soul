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
 * Vídeo do App Review (Meta): monta os trechos gravados (OBS + espelhamento do
 * celular) e sobrepõe as legendas em inglês, uma por cena. 1080p30, sem áudio.
 * Cortes só removem espera; a cena de autorização (consentimento) fica contínua.
 */

const FPS = 30;
const s = (sec: number) => Math.round(sec * FPS);

type Seg = { src: string; from: number; to: number; caption: string };

export const SEGMENTS: Seg[] = [
  {
    src: "appreview/main.mp4",
    from: s(14),
    to: s(19),
    caption:
      "FlowPilot (by Soveral Soul) schedules and publishes Instagram posts for the account owner.",
  },
  {
    src: "appreview/main.mp4",
    from: s(40),
    to: s(64),
    caption:
      "The account owner connects their Instagram and grants the content publishing permission.",
  },
  {
    src: "appreview/main.mp4",
    from: s(109),
    to: s(118),
    caption:
      "FlowPilot publishes the post to the authorized account via the Instagram Graph API.",
  },
  {
    src: "appreview/proof.mp4",
    from: s(9),
    to: s(18),
    caption: "The post is now live on the authorized Instagram profile.",
  },
  {
    src: "appreview/proof.mp4",
    from: s(44),
    to: s(52),
    caption:
      "Access can be revoked anytime in Instagram settings. Our privacy policy covers data use and deletion.",
  },
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
