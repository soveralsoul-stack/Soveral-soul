import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { script, Scene } from "./data/script";
import { video } from "./brand/tokens";
import { Background } from "./components/Background";
import { AudioVizContext } from "./components/AudioVizContext";
import { LayoutContext, CtaVariant } from "./components/LayoutContext";
import { LogoIntro } from "./components/scenes/LogoIntro";
import { HeroImpact } from "./components/scenes/HeroImpact";
import { Reposition } from "./components/scenes/Reposition";
import { Services } from "./components/scenes/Services";
import { Portfolio } from "./components/scenes/Portfolio";
import { Authority } from "./components/scenes/Authority";
import { Cta } from "./components/scenes/Cta";

const FADE = 12; // frames de fade in/out por cena
const AUDIO_SRC = "audio/trilha.wav";

export type SoveralSoulProps = {
  ctaVariant: CtaVariant;
};

/** Envelope com fade in/out — suaviza a transição entre cenas. */
const SceneFade: React.FC<{ durationInFrames: number; children: React.ReactNode }> = ({
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, FADE, durationInFrames - FADE, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const renderScene = (scene: Scene, ctaVariant: CtaVariant): React.ReactNode => {
  const p = scene.props as any;
  switch (scene.kind) {
    case "logoIntro":
      return <LogoIntro {...p} />;
    case "heroImpact":
      return <HeroImpact {...p} />;
    case "reposition":
      return <Reposition {...p} />;
    case "services":
      return <Services {...p} />;
    case "portfolio":
      return <Portfolio {...p} />;
    case "authority":
      return <Authority {...p} />;
    case "cta":
      return <Cta {...p} variant={ctaVariant} />;
    default:
      return null;
  }
};

/**
 * O conteúdo é autorado num "palco" e escalado para caber no frame, centralizado.
 * Em landscape (16:9) o palco é mais largo (1920×1080), liberando layouts que
 * usam a largura; em retrato/quadrado é 1080×1080.
 */
const SafeArea: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { width, height } = useVideoConfig();
  const landscape = width > height * 1.2;
  const dw = landscape ? 1920 : 1080;
  const dh = 1080;
  const scale = Math.min(width / dw, height / dh);
  return (
    <LayoutContext.Provider value={{ landscape, dw, dh }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: dw, height: dh, transform: `scale(${scale})` }}>
          {children}
        </div>
      </AbsoluteFill>
    </LayoutContext.Provider>
  );
};

export const SoveralSoul: React.FC<SoveralSoulProps> = ({ ctaVariant }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audioData = useAudioData(staticFile(AUDIO_SRC));
  const viz =
    audioData != null
      ? visualizeAudio({ fps, frame, audioData, numberOfSamples: 32, optimizeFor: "accuracy" })
      : null;

  return (
    <AbsoluteFill>
      <Audio src={staticFile(AUDIO_SRC)} />
      <Background />
      <AudioVizContext.Provider value={viz}>
        <SafeArea>
          {script.map((scene) => {
            const from = Math.round(scene.startSec * video.fps);
            const durationInFrames = Math.round(scene.durationSec * video.fps);
            return (
              <Sequence key={scene.id} from={from} durationInFrames={durationInFrames} name={scene.id}>
                <SceneFade durationInFrames={durationInFrames}>
                  {renderScene(scene, ctaVariant)}
                </SceneFade>
              </Sequence>
            );
          })}
        </SafeArea>
      </AudioVizContext.Provider>
    </AbsoluteFill>
  );
};
