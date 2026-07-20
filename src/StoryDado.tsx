import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { colors, fonts } from "./brand/tokens";
import { Background } from "./components/Background";
import { Logo, Wordmark } from "./components/Logo";
import { Waveform } from "./components/Waveform";
import { AudioVizContext } from "./components/AudioVizContext";
import { STORIES } from "./data/stories";

const AUDIO_SRC = "audio/trilha.wav";

/** Reveal lento (fade + slide + leve blur) — dá o ar "câmera lenta". */
const Reveal: React.FC<{
  at: number;
  dur?: number;
  y?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ at, dur = 40, y = 26, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 200, mass: 1.1 }, durationInFrames: dur });
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [y, 0])}px)`,
        filter: `blur(${interpolate(p, [0, 1], [8, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const StoryDado: React.FC<{ storyId: string }> = ({ storyId }) => {
  const data = STORIES.find((s) => s.id === storyId) ?? STORIES[0];
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const audioData = useAudioData(staticFile(AUDIO_SRC));
  const viz =
    audioData != null
      ? visualizeAudio({ fps, frame, audioData, numberOfSamples: 32, optimizeFor: "accuracy" })
      : null;

  // stat: contagem numérica (0 → countTo) ou texto fixo (ex.: "24/7")
  const counted =
    data.countTo != null
      ? `${Math.round(
          interpolate(frame, [52, 150], [0, data.countTo], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
        )}%`
      : data.statText ?? "";
  const pop = spring({ frame: frame - 52, fps, config: { damping: 14, mass: 0.8 }, durationInFrames: 60 });
  const statScale = interpolate(pop, [0, 1], [0.86, 1]);

  const drift = interpolate(frame, [0, durationInFrames], [1.0, 1.035]);
  const waveIn = interpolate(frame, [300, 360], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const outro = interpolate(frame, [durationInFrames - 24, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  const statStyle: React.CSSProperties = {
    fontFamily: fonts.display,
    fontSize: 470,
    lineHeight: 0.8,
    letterSpacing: 2,
    background: `linear-gradient(160deg, #fff 0%, ${colors.blue} 62%, ${colors.cyan} 100%)`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  const subLine: React.CSSProperties = {
    fontFamily: fonts.display,
    fontSize: 76,
    lineHeight: 0.98,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.white,
  };

  return (
    <AbsoluteFill>
      <Audio src={staticFile(AUDIO_SRC)} volume={0.9} />
      <Background />
      <AudioVizContext.Provider value={viz}>
        <AbsoluteFill style={{ padding: "150px 84px 160px", display: "flex", flexDirection: "column", opacity: outro }}>
          {/* header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Reveal at={4} y={0}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <Logo size={72} />
                <Wordmark fontSize={40} letterSpacing={3} />
              </div>
            </Reveal>
            <Reveal at={14} y={0}>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: colors.blue,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 3,
                  padding: "9px 16px",
                }}
              >
                {data.pill}
              </div>
            </Reveal>
          </div>

          {/* bloco central */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transform: `scale(${drift})`,
              transformOrigin: "left center",
            }}
          >
            <Reveal at={34} style={{ marginBottom: 6 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontFamily: fonts.body,
                  fontSize: 20,
                  letterSpacing: 6,
                  textTransform: "uppercase",
                  color: colors.muted,
                }}
              >
                <span style={{ width: 44, height: 1, background: colors.blue }} /> O dado da semana
              </div>
            </Reveal>

            <div style={{ ...statStyle, transform: `scale(${statScale})`, transformOrigin: "left bottom" }}>
              {counted}
            </div>

            <div style={{ marginTop: 8 }}>
              {data.sub.map((l, i) => (
                <Reveal key={i} at={132 + i * 14}>
                  <div style={{ ...subLine, color: l.blue ? colors.blue : colors.white }}>{l.t}</div>
                </Reveal>
              ))}
            </div>

            <Reveal at={205} style={{ marginTop: 44 }}>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  padding: "30px 34px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  background: "rgba(45,143,255,0.05)",
                }}
              >
                <span style={{ width: 5, borderRadius: 5, background: `linear-gradient(180deg, ${colors.cyan}, ${colors.blueDim})` }} />
                <p style={{ fontFamily: fonts.body, fontSize: 30, lineHeight: 1.42, color: "#cdd6e6" }}>{data.note}</p>
              </div>
            </Reveal>

            <Reveal at={252} style={{ marginTop: 22 }}>
              <div style={{ fontFamily: fonts.body, fontSize: 20, letterSpacing: 1, color: colors.muted }}>{data.source}</div>
            </Reveal>
          </div>

          {/* rodapé: fecho em largura cheia + (waveform | handle) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Reveal at={300}>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 64,
                  lineHeight: 0.98,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: colors.white,
                }}
              >
                {data.take}
              </div>
            </Reveal>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
              <Waveform width={440} intensity={waveIn} maxHeight={60} barCount={28} align="bottom" />
              <Reveal at={320} y={0}>
                <div style={{ fontFamily: fonts.body, fontSize: 22, letterSpacing: 2, color: colors.muted, textAlign: "right" }}>
                  Marketing · Eventos · Audiovisual
                  <br />
                  <b style={{ color: colors.white }}>@soveralsoul</b>
                </div>
              </Reveal>
            </div>
          </div>
        </AbsoluteFill>
      </AudioVizContext.Provider>
    </AbsoluteFill>
  );
};
