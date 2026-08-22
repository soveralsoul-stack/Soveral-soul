/**
 * Legenda animada como PEÇA GRÁFICA, não como legenda de acessibilidade.
 * O texto carrega o vídeo e a fala acompanha. Padrão estudado em três
 * anúncios reais e documentado em docs/reels-safe-zone-e-motion-refs.md.
 *
 * Duas famílias, as duas aqui:
 *
 * `Legenda`: duas linhas. A de cima entra partida ao meio, metade da
 * esquerda e metade da direita convergindo pro centro. A de baixo se
 * constrói palavra por palavra enquanto a de cima fica PARADA. Esse
 * detalhe é o que faz parecer caro: só uma coisa se mexe por vez.
 *
 * `LegendaFrase`: uma linha só, trocada inteira a cada fala, com a
 * palavra de sentido no acento e pop curto de escala.
 *
 * Regras da marca aplicadas: no máximo duas cores por frase (branco de
 * ligação e um acento da marca), sombra escura sempre por baixo, nenhuma
 * caixa opaca atrás, e nada de sticker 3D nem emoji, que é o que as
 * referências usam e a SoveralSoul não usa.
 */
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { sb, SB_DISPLAY, SAFE_TOP, SAFE_BOTTOM, SAFE_SIDE, SAFE_RIGHT_RAIL } from "./tokens";

/** Acentos permitidos: só os da marca, pra legenda não virar arco-íris. */
export type Acento = "cyan" | "violet";

const COR: Record<Acento, string> = { cyan: sb.cyan, violet: sb.violet };

/**
 * Sombra de leitura. Duas camadas: uma colada pra recortar do fundo e uma
 * larga e difusa pra dar corpo. Sem isso o texto some em cima de céu claro
 * ou de parede branca, que é metade das filmagens.
 */
const SOMBRA = "0 2px 6px rgba(0,0,0,.55), 0 10px 40px rgba(0,0,0,.45)";

/** Âncora vertical. O terço de baixo é da UI do anúncio, então não entra. */
export type Ancora = "alto" | "meio";

const topoDaAncora = (ancora: Ancora, altura: number) =>
  ancora === "alto" ? SAFE_TOP + 40 : SAFE_TOP + (altura - SAFE_TOP - SAFE_BOTTOM) * 0.34;

interface Comum {
  /** Quadro em que a legenda entra. */
  at: number;
  /** Quadro em que sai. A saída leva 8 quadros a partir daqui. */
  ate: number;
  acento?: Acento;
  ancora?: Ancora;
  /** Oblíqua leve, como nas referências. Fica desligada por padrão. */
  italico?: boolean;
}

const SAIDA = 8;

/** Opacidade e escala da saída, comuns às duas famílias. */
function useSaida(ate: number) {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [ate, ate + SAIDA], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity: o, escala: interpolate(o, [0, 1], [0.94, 1]) };
}

/**
 * Família 2: duas linhas, convergência em cima e palavra por palavra embaixo.
 *
 * `linha1` é dividida ao meio: a primeira metade vem da esquerda, a segunda
 * da direita. Com duas palavras dá exatamente o efeito da referência.
 */
export const Legenda: React.FC<
  Comum & {
    linha1: string[];
    linha2?: string[];
    /** Inverte as cores: acento em cima e branco embaixo. */
    inverter?: boolean;
    tamanho?: number;
  }
> = ({
  at,
  ate,
  linha1,
  linha2 = [],
  acento = "cyan",
  ancora = "alto",
  italico = false,
  inverter = false,
  tamanho = 88,
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const saida = useSaida(ate);
  if (frame < at || frame > ate + SAIDA) return null;

  // Convergência da linha 1. Mola com pouco damping pra passar do ponto e
  // voltar, que é o assentamento das referências.
  const conv = spring({
    frame: frame - at,
    fps,
    config: { damping: 14, mass: 0.5, stiffness: 110 },
    durationInFrames: 22,
  });
  // 130 px, não 260: com 260 a palavra da esquerda entrava em x=26 num teste
  // medido, dentro da margem lateral de 65 px que a própria casa definiu.
  // Junto com o fade de 8 quadros abaixo, o trajeto inteiro fica dentro.
  const desloc = interpolate(conv, [0, 1], [130, 0]);
  // Enquanto viaja, a palavra está fraca. Quando fica legível, já chegou.
  const entrada = interpolate(frame - at, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const meio = Math.ceil(linha1.length / 2);
  const esquerda = linha1.slice(0, meio);
  const direita = linha1.slice(meio);

  // A linha 2 só começa depois da linha 1 assentar. Uma coisa por vez.
  const inicioL2 = at + 14;
  const passo = 6;

  const corCima = inverter ? COR[acento] : "#fff";
  const corBaixo = inverter ? "#fff" : COR[acento];

  const base: React.CSSProperties = {
    fontFamily: SB_DISPLAY,
    fontWeight: 800,
    letterSpacing: -1.5,
    textShadow: SOMBRA,
    transform: italico ? "skewX(-5deg)" : undefined,
    whiteSpace: "nowrap",
  };

  return (
    <AbsoluteFill
      style={{
        paddingTop: topoDaAncora(ancora, height),
        paddingLeft: SAFE_SIDE,
        paddingRight: SAFE_RIGHT_RAIL,
        alignItems: "center",
        opacity: saida.opacity,
      }}
    >
      <div style={{ transform: `scale(${saida.escala})`, textAlign: "center" }}>
        <div style={{ display: "flex", gap: 22, justifyContent: "center", alignItems: "baseline" }}>
          {esquerda.map((p, i) => (
            <div
              key={`e${i}`}
              style={{
                ...base,
                fontSize: tamanho,
                color: corCima,
                opacity: entrada,
                transform: `translateX(${-desloc}px)`,
              }}
            >
              {p}
            </div>
          ))}
          {direita.map((p, i) => (
            <div
              key={`d${i}`}
              style={{
                ...base,
                fontSize: tamanho,
                color: corCima,
                opacity: entrada,
                transform: `translateX(${desloc}px)`,
              }}
            >
              {p}
            </div>
          ))}
        </div>

        {linha2.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 18,
              justifyContent: "center",
              alignItems: "baseline",
              marginTop: 14,
              flexWrap: "wrap",
            }}
          >
            {linha2.map((p, i) => (
              <PalavraPop key={i} at={inicioL2 + i * passo} style={{ ...base, fontSize: tamanho * 0.72, color: corBaixo }}>
                {p}
              </PalavraPop>
            ))}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

/**
 * Palavra que entra com pop curto. Fora do layout antes da hora, senão a
 * linha já nasce com a largura final e as palavras não parecem entrar.
 */
const PalavraPop: React.FC<{ at: number; style: React.CSSProperties; children: React.ReactNode }> = ({
  at,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < at) return null;
  const p = spring({ frame: frame - at, fps, config: { damping: 16, mass: 0.4 }, durationInFrames: 12 });
  return (
    <div
      style={{
        ...style,
        opacity: p,
        transform: `${style.transform ?? ""} scale(${interpolate(p, [0, 1], [0.82, 1])}) translateY(${interpolate(
          p,
          [0, 1],
          [12, 0],
        )}px)`,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Família 1: uma linha, trocada inteira. `destaque` é o índice da palavra
 * que recebe o acento, normalmente a última.
 */
export const LegendaFrase: React.FC<
  Comum & {
    palavras: string[];
    destaque?: number;
    tamanho?: number;
  }
> = ({ at, ate, palavras, destaque, acento = "cyan", ancora = "meio", italico = false, tamanho = 84 }) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const saida = useSaida(ate);
  if (frame < at || frame > ate + SAIDA) return null;

  const p = spring({ frame: frame - at, fps, config: { damping: 12, mass: 0.45 }, durationInFrames: 14 });
  const idx = destaque ?? palavras.length - 1;

  return (
    <AbsoluteFill
      style={{
        paddingTop: topoDaAncora(ancora, height),
        paddingLeft: SAFE_SIDE,
        paddingRight: SAFE_RIGHT_RAIL,
        alignItems: "center",
        opacity: saida.opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          flexWrap: "wrap",
          transform: `scale(${interpolate(p, [0, 1], [0.86, 1]) * saida.escala})`,
        }}
      >
        {palavras.map((palavra, i) => (
          <div
            key={i}
            style={{
              fontFamily: SB_DISPLAY,
              fontWeight: 800,
              fontSize: tamanho,
              letterSpacing: -1.5,
              textShadow: SOMBRA,
              transform: italico ? "skewX(-5deg)" : undefined,
              color: i === idx ? COR[acento] : "#fff",
            }}
          >
            {palavra}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
