import React from "react";
import { Img, staticFile } from "remotion";
import { colors, fonts } from "../brand/tokens";

/** Logo redonda da SoveralSoul (vocalista sobre waveform) com anel azul. */
export const Logo: React.FC<{ size?: number }> = ({ size = 180 }) => {
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <div
        style={{
          position: "absolute",
          inset: -10,
          borderRadius: "50%",
          border: `1px solid ${colors.blue}`,
          opacity: 0.35,
        }}
      />
      <Img
        src={staticFile("logo-soveralsoul.png")}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: `0 0 60px 0 rgba(45,143,255,0.35)`,
        }}
      />
    </div>
  );
};

/** Wordmark "Soveral Soul" — Soul em azul. */
export const Wordmark: React.FC<{ fontSize: number; letterSpacing?: number }> = ({
  fontSize,
  letterSpacing = 2,
}) => {
  return (
    <span
      style={{
        fontFamily: fonts.display,
        fontSize,
        letterSpacing,
        color: colors.white,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      SOVERAL<span style={{ color: colors.blue }}>SOUL</span>
    </span>
  );
};
