/**
 * ───────────────────────────────────────────────────────────────────────────
 *  ROTEIRO → FRAMES   (mapa de cenas do vídeo de 30s)
 *  SOVERAL SOUL · BUSINESS HUB — reforço de marca (hub/coworking de negócios)
 * ───────────────────────────────────────────────────────────────────────────
 *
 *  Cole/edite aqui as copys REAIS. Cada cena tem:
 *    - id, kind (componente que renderiza), startSec/durationSec, props.
 *  Base: 30 fps. 30s = 900 frames. As janelas cobrem os 30s sem buracos.
 */

import { colors } from "../brand/tokens";

export type SceneKind = "logoReveal" | "tagline" | "pillars" | "statement" | "cta";

export interface Scene {
  id: string;
  kind: SceneKind;
  startSec: number;
  durationSec: number;
  props: Record<string, unknown>;
}

export const script: Scene[] = [
  {
    id: "01-abertura",
    kind: "logoReveal",
    startSec: 0,
    durationSec: 4,
    props: {
      wordmark: "SOVERAL SOUL",
      kicker: "business hub",
    },
  },
  {
    id: "02-tagline",
    kind: "tagline",
    startSec: 4,
    durationSec: 5,
    props: {
      lines: ["Onde ideias", "viram", "negócio."],
      accentIndex: 1,
    },
  },
  {
    id: "03-pilares",
    kind: "pillars",
    startSec: 9,
    durationSec: 8,
    props: {
      title: "Um hub feito para crescer",
      pillars: [
        { label: "Estrutura & Espaço", color: colors.gold },
        { label: "Comunidade & Networking", color: colors.goldSoft },
        { label: "Crescimento & Mentoria", color: colors.wine },
      ],
    },
  },
  {
    id: "04-mensagem",
    kind: "statement",
    startSec: 17,
    durationSec: 7,
    props: {
      quote: "Aqui, empreender é coletivo.",
      attribution: "— Soveral Soul Business Hub",
    },
  },
  {
    id: "05-cta",
    kind: "cta",
    startSec: 24,
    durationSec: 6,
    props: {
      wordmark: "SOVERAL SOUL",
      cta: "Faça parte do hub.",
      handle: "@soveralsoul",
    },
  },
];
