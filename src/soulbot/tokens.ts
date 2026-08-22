/**
 * SOULBOT · DESIGN TOKENS (anúncios)
 * Marca do produto SoulBot (soulbot.app.br), irmã da SoveralSoul.
 * Fonte de verdade: identidade fechada na landing do repo soulbot.
 */
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const sb = {
  // Fundos navy
  navy900: "#0B1830",
  navy800: "#0E1E3C",
  navy700: "#16305C",
  // Acentos
  cyan: "#17B3C4",
  violet: "#8B5CF6",
  // Texto
  ink: "#EAF1FB",
  muted: "#9DB0CC",
  // Chat (mesmos tons da landing)
  waTop: "#0F2338",
  waBg: "#0C1C2E",
  waBg2: "#0A1826",
  waIn: "#12283F",
  waOut: "#134D3F",
} as const;

export const sbGrad = `linear-gradient(100deg, ${sb.cyan} 0%, ${sb.violet} 100%)`;
export const sbStage = `radial-gradient(120% 90% at 70% 8%, ${sb.navy700} 0%, ${sb.navy800} 45%, ${sb.navy900} 100%)`;

export const SB_DISPLAY = "Sora";
export const SB_BODY = "Inter";

for (const w of ["400", "600", "700", "800"] as const) {
  loadFont({
    family: SB_DISPLAY,
    url: staticFile(`fonts/Sora-${w}.ttf`),
    weight: w,
  });
}

loadFont({
  family: SB_BODY,
  url: staticFile("fonts/Inter-var.ttf"),
  weight: "400 700", // variável
});

// Zonas seguras de Reels/Stories (unificadas pela Meta em marco de 2026):
// topo 14%, base 35%, laterais 6% na tela 1080x1920. Medido tambem em
// capturas reais de anuncio (botao "Saiba mais" comeca a ~72% da altura).
// Detalhes e referencias: docs/reels-safe-zone-e-motion-refs.md
export const SAFE_TOP = 270; // 14% de 1920
export const SAFE_BOTTOM = 672; // 35% de 1920
export const SAFE_SIDE = 65; // 6% de 1080
// Coluna de icones (curtir/comentar/compartilhar): ocupa a faixa direita
// de ~140px entre ~55% e ~80% da altura. Elementos criticos ficam fora dela.
export const SAFE_RIGHT_RAIL = 140;
