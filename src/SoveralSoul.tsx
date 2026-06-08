import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { script, Scene } from "./data/script";
import { video, gradients, DESIGN_BASE } from "./brand/tokens";
import { LogoReveal } from "./components/scenes/LogoReveal";
import { Tagline } from "./components/scenes/Tagline";
import { Pillars } from "./components/scenes/Pillars";
import { Statement } from "./components/scenes/Statement";
import { Cta } from "./components/scenes/Cta";

const FADE = 12; // frames de fade in/out por cena

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

const renderScene = (scene: Scene): React.ReactNode => {
  const p = scene.props as any;
  switch (scene.kind) {
    case "logoReveal":
      return <LogoReveal {...p} />;
    case "tagline":
      return <Tagline {...p} />;
    case "pillars":
      return <Pillars {...p} />;
    case "statement":
      return <Statement {...p} />;
    case "cta":
      return <Cta {...p} />;
    default:
      return null;
  }
};

/**
 * O design é autorado num palco quadrado de DESIGN_BASE e escalado para caber
 * em qualquer formato (9:16, 1:1, 16:9), centralizado. Assim a tipografia fica
 * legível e consistente nos 3 formatos a partir de uma única composição.
 */
const SafeArea: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { width, height } = useVideoConfig();
  const scale = Math.min(width, height) / DESIGN_BASE;
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: DESIGN_BASE, height: DESIGN_BASE, transform: `scale(${scale})` }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const SoveralSoul: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: gradients.stage }}>
      {/* Fundo persistente de marca preenche o frame inteiro (incl. as bordas
          que sobram nos formatos não-quadrados) e evita piscar branco nas
          transições. */}
      <SafeArea>
        {script.map((scene) => {
          const from = Math.round(scene.startSec * video.fps);
          const durationInFrames = Math.round(scene.durationSec * video.fps);
          return (
            <Sequence key={scene.id} from={from} durationInFrames={durationInFrames} name={scene.id}>
              <SceneFade durationInFrames={durationInFrames}>{renderScene(scene)}</SceneFade>
            </Sequence>
          );
        })}
      </SafeArea>
    </AbsoluteFill>
  );
};
