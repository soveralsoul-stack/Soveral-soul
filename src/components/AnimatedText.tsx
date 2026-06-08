import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Texto com entrada suave (fade + slide + leve blur). Frame-accurate.
 * `delay` em frames permite escalonar várias linhas/palavras.
 */
export const AnimatedText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.7 },
    durationInFrames: 30,
  });

  const y = interpolate(enter, [0, 1], [28, 0]);
  const blur = interpolate(enter, [0, 1], [10, 0]);

  return (
    <div
      style={{
        opacity: enter,
        transform: `translateY(${y}px)`,
        filter: `blur(${blur}px)`,
        willChange: "transform, opacity, filter",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
