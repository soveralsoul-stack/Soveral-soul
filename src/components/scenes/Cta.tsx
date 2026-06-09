import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../Stage";
import { AnimatedText } from "../AnimatedText";
import { Logo, Wordmark } from "../Logo";
import { colors, fonts, type } from "../../brand/tokens";
import { CtaVariant } from "../LayoutContext";

export const Cta: React.FC<{
  headline: string;
  whatsapp: string;
  handle: string;
  variant: CtaVariant;
}> = ({ headline, whatsapp, handle, variant }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 13, mass: 0.6 }, durationInFrames: 26 });
  const pillIn = interpolate(frame, [30, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const isIg = variant === "instagram";
  const headlineText = isIg ? "Acompanhe os bastidores. Todo dia." : headline;
  const kicker = isIg ? "Siga no Instagram" : "Fale agora no WhatsApp";
  const pillText = isIg ? handle : whatsapp;

  return (
    <Stage>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, textAlign: "center" }}>
        <div style={{ transform: `scale(${pop})`, opacity: pop }}>
          <Logo size={150} />
        </div>
        <AnimatedText delay={10}>
          <Wordmark fontSize={type.title} letterSpacing={4} />
        </AnimatedText>
        <AnimatedText delay={18}>
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 400,
              fontSize: type.body,
              color: colors.muted,
              maxWidth: 760,
            }}
          >
            {headlineText}
          </div>
        </AnimatedText>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: pillIn,
            transform: `translateY(${interpolate(pillIn, [0, 1], [12, 0])}px)`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: type.caption,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: colors.muted,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              padding: "14px 32px",
              borderRadius: 3,
              background: colors.blue,
              color: colors.bg,
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: type.subtitle,
              letterSpacing: 1,
            }}
          >
            {pillText}
          </div>
        </div>
      </div>
    </Stage>
  );
};
