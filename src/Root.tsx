import React from "react";
import { Composition } from "remotion";
import { SoveralSoul } from "./SoveralSoul";
import { StoryIA85 } from "./StoryIA85";
import { video, video_durationInFrames, formats } from "./brand/tokens";
import { CtaVariant } from "./components/LayoutContext";

const ctaVariants: { suffix: string; value: CtaVariant }[] = [
  { suffix: "WhatsApp", value: "whatsapp" },
  { suffix: "Instagram", value: "instagram" },
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {formats.map((f) =>
        ctaVariants.map((c) => (
          <Composition
            key={`${f.id}-${c.suffix}`}
            id={`${f.id}-${c.suffix}`}
            component={SoveralSoul}
            durationInFrames={video_durationInFrames}
            fps={video.fps}
            width={f.width}
            height={f.height}
            defaultProps={{ ctaVariant: c.value }}
          />
        ))
      )}
      {/* Stories animado (câmera lenta) — dado da semana: 85% */}
      <Composition
        id="Story-IA85"
        component={StoryIA85}
        durationInFrames={15 * video.fps}
        fps={video.fps}
        width={1080}
        height={1920}
      />
    </>
  );
};
