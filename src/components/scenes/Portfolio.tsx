import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts, type } from "../../brand/tokens";
import { useLayout } from "../LayoutContext";

export const Portfolio: React.FC<{ label: string; caption: string; photos: string[] }> = ({
  label,
  caption,
  photos,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { landscape, dw, dh } = useLayout();

  const tileH = landscape ? 560 : 600;
  const tileW = landscape ? 520 : 440;
  const gap = 24;
  const drift = frame * 2.0; // px/frame — deslize lento

  const headIn = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 22 });

  return (
    <AbsoluteFill style={{ width: dw, height: dh, overflow: "hidden" }}>
      {/* Filmstrip */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          display: "flex",
          gap,
          transform: `translate(calc(-50% - ${drift}px), -50%)`,
        }}
      >
        {photos.map((src, i) => {
          const inn = spring({ frame: frame - 6 - i * 6, fps, config: { damping: 200 }, durationInFrames: 26 });
          const kb = interpolate(frame, [0, 165], [1.06, 1.14]); // ken burns sutil
          return (
            <div
              key={src}
              style={{
                width: tileW,
                height: tileH,
                borderRadius: 8,
                overflow: "hidden",
                border: `1px solid ${colors.border}`,
                boxShadow: `0 24px 60px rgba(0,0,0,0.45)`,
                opacity: inn,
                transform: `translateY(${interpolate(inn, [0, 1], [40, 0])}px)`,
                flex: "0 0 auto",
              }}
            >
              <Img
                src={staticFile(src)}
                style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${kb})` }}
              />
            </div>
          );
        })}
      </div>

      {/* Esfumaçado nas bordas para fundir com o fundo */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, ${colors.bg} 0%, transparent 14%, transparent 86%, ${colors.bg} 100%)`,
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${colors.bg} 0%, transparent 22%, transparent 72%, rgba(6,8,15,0.92) 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Rótulo + legenda */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "70px 0",
          opacity: headIn,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: fonts.body,
            fontSize: type.caption,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: colors.blue,
          }}
        >
          <span style={{ width: 30, height: 1, background: colors.blue }} />
          {label}
          <span style={{ width: 30, height: 1, background: colors.blue }} />
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: type.subtitle,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: colors.white,
          }}
        >
          {caption}
        </div>
      </div>
    </AbsoluteFill>
  );
};
