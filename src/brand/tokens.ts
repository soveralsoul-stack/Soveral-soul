/**
 * ───────────────────────────────────────────────────────────────────────────
 *  SOVERAL SOUL · DESIGN TOKENS  (única fonte de verdade da identidade)
 * ───────────────────────────────────────────────────────────────────────────
 *
 *  >>> PLACEHOLDER <<<
 *  Os valores abaixo são uma base elegante provisória. Substitua pelos tokens
 *  REAIS vindos do arquivo de handoff (cores hex, fontes, espaçamentos da marca).
 *  Tudo no vídeo lê daqui — trocar aqui propaga para todas as cenas.
 */

export const colors = {
  // Fundo principal — plum profundo
  bg: "#1A0E1F",
  bgDeep: "#0E060F",
  // Acento — dourado quente
  gold: "#D9A441",
  goldSoft: "#E9C77B",
  // Texto
  cream: "#F5ECE0",
  creamDim: "rgba(245, 236, 224, 0.62)",
  // Secundária — vinho
  wine: "#7A2C46",
} as const;

export const gradients = {
  // Gradiente de palco usado nos fundos de cena
  stage: `radial-gradient(120% 120% at 50% 0%, ${colors.bg} 0%, ${colors.bgDeep} 70%)`,
  goldSheen: `linear-gradient(100deg, ${colors.gold} 0%, ${colors.goldSoft} 50%, ${colors.gold} 100%)`,
} as const;

/**
 * Font stack offline-safe. Garante render local sem rede.
 * Para usar a fonte oficial da marca via @remotion/google-fonts, importe-a em
 * src/Root.tsx (ex.: `loadFont` de "@remotion/google-fonts/PlayfairDisplay")
 * e troque os nomes abaixo.
 */
export const fonts = {
  display: '"Playfair Display", "Georgia", "Times New Roman", serif',
  body: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
} as const;

export const type = {
  // Tamanhos em px na base 1080p
  hero: 116,
  title: 78,
  subtitle: 44,
  body: 34,
  caption: 24,
  letterSpacingTight: -2,
  letterSpacingWide: 8,
} as const;

// Especificações de saída — alinhar ao handoff
export const video = {
  fps: 30,
  durationInSeconds: 30,
} as const;

export const video_durationInFrames = video.fps * video.durationInSeconds; // 900

// Lado de referência do design. As cenas são autoradas num "palco" quadrado
// de 1080 e escaladas para caber em qualquer formato (ver SafeArea).
export const DESIGN_BASE = 1080;

// Os 3 formatos de entrega gerados a partir da MESMA composição.
export const formats = [
  { id: "SoveralSoul-Vertical", label: "Reels/Stories 9:16", width: 1080, height: 1920 },
  { id: "SoveralSoul-Square", label: "Feed 1:1", width: 1080, height: 1080 },
  { id: "SoveralSoul-Wide", label: "YouTube 16:9", width: 1920, height: 1080 },
] as const;
