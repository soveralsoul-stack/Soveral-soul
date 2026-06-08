/**
 * ───────────────────────────────────────────────────────────────────────────
 *  SOVERAL SOUL · BUSINESS HUB — DESIGN TOKENS
 *  Marketing · Eventos · Audiovisual — Chapecó, SC
 * ───────────────────────────────────────────────────────────────────────────
 *  Fonte de verdade da identidade, extraída do site oficial (soveralsoul.com.br).
 */

import { DISPLAY, BODY } from "./fonts";

export const colors = {
  // Fundos (navy quase-preto → azul profundo)
  bg: "#06080f",
  bg2: "#0b0e1a",
  bg3: "#101528",
  // Acento azul da marca
  blue: "#2d8fff",
  blueDim: "#1a6fd4",
  cyan: "#00d4ff",
  // Texto
  white: "#e8eef8",
  muted: "#6b7a99",
  border: "#1a2240",
} as const;

export const gradients = {
  // Palco: navy profundo com leve glow azul no topo
  stage: `radial-gradient(120% 90% at 50% 12%, ${colors.bg3} 0%, ${colors.bg2} 45%, ${colors.bg} 100%)`,
  // Brilho do wordmark/linhas
  blueSheen: `linear-gradient(100deg, ${colors.blueDim} 0%, ${colors.blue} 45%, ${colors.cyan} 100%)`,
} as const;

export const fonts = {
  display: DISPLAY, // 'Bebas Neue' — títulos
  body: BODY, // 'Space Grotesk' — corpo
} as const;

export const type = {
  // Tamanhos em px na base de design 1080
  hero: 168, // Bebas Neue é condensada → pode ser grande
  title: 92,
  subtitle: 46,
  body: 32,
  caption: 24,
  letterSpacingDisplay: 2,
  letterSpacingWide: 6,
} as const;

// Especificações de saída
export const video = {
  fps: 30,
  durationInSeconds: 30,
} as const;

export const video_durationInFrames = video.fps * video.durationInSeconds; // 900

// Lado de referência do design. As cenas são autoradas num palco quadrado de
// 1080 e escaladas para caber em qualquer formato (ver SafeArea).
export const DESIGN_BASE = 1080;

// Os 3 formatos gerados a partir da MESMA composição.
export const formats = [
  { id: "SoveralSoul-Vertical", label: "Reels/Stories 9:16", width: 1080, height: 1920 },
  { id: "SoveralSoul-Square", label: "Feed 1:1", width: 1080, height: 1080 },
  { id: "SoveralSoul-Wide", label: "YouTube 16:9", width: 1920, height: 1080 },
] as const;
