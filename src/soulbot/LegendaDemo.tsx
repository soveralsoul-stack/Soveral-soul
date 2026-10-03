/**
 * Vitrine do sistema de legenda: mostra as duas famílias rodando em cima do
 * fundo da marca, pra conferir ritmo e leitura antes de aplicar em filmagem.
 *
 * Não é peça de publicação, é banco de prova. Quando entrar vídeo real, o
 * `SbBackground` sai e o `<OffthreadVideo>` entra no lugar, o resto fica.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { SbBackground } from "./shared";
import { Legenda, LegendaFrase } from "./Legenda";

export const LEGENDA_DEMO_DURATION = 330; // 11s @ 30fps

export const LegendaDemo: React.FC = () => (
  <AbsoluteFill>
    <SbBackground />

    {/* Família 2, convergência em cima e palavra por palavra embaixo */}
    <Legenda at={6} ate={96} linha1={["Sem", "planilha"]} linha2={["e", "sem", "código"]} acento="cyan" />

    {/* Mesma família invertida: o acento sobe e o branco desce */}
    <Legenda
      at={110}
      ate={200}
      linha1={["Responde", "na hora"]}
      linha2={["dia", "e", "noite"]}
      acento="violet"
      inverter
    />

    {/* Família 1, frase trocada inteira, com a palavra de sentido no acento */}
    <LegendaFrase at={214} ate={264} palavras={["ele", "não", "inventa"]} acento="cyan" />
    <LegendaFrase at={272} ate={322} palavras={["você", "fecha"]} acento="violet" />
  </AbsoluteFill>
);
