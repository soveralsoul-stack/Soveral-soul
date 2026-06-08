import React from "react";
import { Composition } from "remotion";
import { SoveralSoul } from "./SoveralSoul";
import { video, video_durationInFrames, formats } from "./brand/tokens";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {formats.map((f) => (
        <Composition
          key={f.id}
          id={f.id}
          component={SoveralSoul}
          durationInFrames={video_durationInFrames}
          fps={video.fps}
          width={f.width}
          height={f.height}
        />
      ))}
    </>
  );
};
