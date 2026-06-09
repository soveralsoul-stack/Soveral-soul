/**
 * ───────────────────────────────────────────────────────────────────────────
 *  ROTEIRO → FRAMES   (vídeo de reforço de marca · 30s)
 *  SOVERAL SOUL · BUSINESS HUB — Marketing · Eventos · Audiovisual
 * ───────────────────────────────────────────────────────────────────────────
 *  Copys reais extraídas do site oficial. Base 30 fps → 30s = 900 frames.
 *  Cortes (s): 0 · 3.5 · 7 · 10.5 · 17 · 22.5 · 26 — alinhados aos impactos da trilha.
 */

export type SceneKind =
  | "logoIntro"
  | "heroImpact"
  | "reposition"
  | "services"
  | "portfolio"
  | "authority"
  | "cta";

export interface Scene {
  id: string;
  kind: SceneKind;
  startSec: number;
  durationSec: number;
  props: Record<string, unknown>;
}

export const script: Scene[] = [
  {
    id: "01-logo",
    kind: "logoIntro",
    startSec: 0,
    durationSec: 3.5,
    props: { eyebrow: "Marketing · Eventos · Audiovisual" },
  },
  {
    id: "02-impacto",
    kind: "heroImpact",
    startSec: 3.5,
    durationSec: 3.5,
    props: { pre: "Sua marca", merece: "merece", impact: "IMPACTO." },
  },
  {
    id: "03-reposicionamento",
    kind: "reposition",
    startSec: 7,
    durationSec: 3.5,
    props: { negate: "Não somos uma agência." },
  },
  {
    id: "04-servicos",
    kind: "services",
    startSec: 10.5,
    durationSec: 6.5,
    props: {
      title: "Do detalhe ao espetáculo.",
      services: [
        "Tráfego Pago",
        "Gestão de Redes & Conteúdo",
        "Landing Pages",
        "Produção Audiovisual",
        "Sonorização & ProAudio",
        "Produção de Eventos",
      ],
    },
  },
  {
    id: "05-portfolio",
    kind: "portfolio",
    startSec: 17,
    durationSec: 5.5,
    props: {
      label: "Projetos realizados",
      caption: "Case eXata Imobiliária · Chapecó/SC",
      photos: [
        "galeria/EXATA_04.jpg",
        "galeria/IMG_3936.jpg",
        "galeria/EXATA_01.jpg",
        "galeria/EXATA_05.jpg",
        "galeria/EXATA_06.jpg",
        "galeria/IMG_3919.jpg",
      ],
    },
  },
  {
    id: "06-autoridade",
    kind: "authority",
    startSec: 22.5,
    durationSec: 3.5,
    props: {
      line: "Empresas sérias escolhem parceiros sérios.",
      place: "Chapecó · SC",
    },
  },
  {
    id: "07-cta",
    kind: "cta",
    startSec: 26,
    durationSec: 4,
    props: {
      headline: "Feito para quem leva a marca a sério.",
      whatsapp: "wa.me/55 49 99911-8781",
      handle: "@soveralsoul",
    },
  },
];
