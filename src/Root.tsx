import React from "react";
import { Composition } from "remotion";
import { SoveralSoul } from "./SoveralSoul";
import { StoryDado } from "./StoryDado";
import { STORIES } from "./data/stories";
import { video, video_durationInFrames, formats } from "./brand/tokens";
import { CtaVariant } from "./components/LayoutContext";
import { AdV1, AD_V1_DURATION } from "./soulbot/AdV1";
import { AdV2, AD_V2_DURATION } from "./soulbot/AdV2";

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
      {/* Stories animados (câmera lenta) — um por "dado da semana" */}
      {STORIES.map((s) => (
        <Composition
          key={s.id}
          id={`Story-${s.id}`}
          component={StoryDado}
          durationInFrames={15 * video.fps}
          fps={video.fps}
          width={1080}
          height={1920}
          defaultProps={{ storyId: s.id }}
        />
      ))}
      {/* Anúncios SoulBot (Reels/Story 9:16) */}
      <Composition
        id="SoulBot-Ad-V1"
        component={AdV1}
        durationInFrames={AD_V1_DURATION}
        fps={video.fps}
        width={1080}
        height={1920}
      />
      <Composition
        id="SoulBot-Ad-V2"
        component={AdV2}
        durationInFrames={AD_V2_DURATION}
        fps={video.fps}
        width={1080}
        height={1920}
      />
    </>
  );
};
