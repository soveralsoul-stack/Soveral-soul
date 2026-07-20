import React from "react";
import { colors } from "../brand/tokens";

const b: React.CSSProperties = { color: "#fff" };
const blue: React.CSSProperties = { color: colors.blue };

export interface StoryData {
  id: string; // sufixo do id da composição (Story-<id>)
  pill: string;
  countTo?: number; // stat numérico (conta 0 → N e mostra "N%")
  statText?: string; // stat em texto (ex.: "24/7")
  sub: { t: string; blue?: boolean }[]; // até 3 linhas do subtítulo
  note: React.ReactNode;
  source: string;
  take: React.ReactNode; // fecho (2 linhas)
}

export const STORIES: StoryData[] = [
  {
    id: "IA85",
    pill: "IA & Automação",
    countTo: 85,
    sub: [
      { t: "das empresas seguem" },
      { t: "sem estratégia", blue: true },
      { t: "formal de IA.", blue: true },
    ],
    note: (
      <>
        E só <b style={b}>11% das equipes</b> têm dados de marketing acessíveis e de qualidade. O
        gargalo não é a ferramenta — é a <b style={b}>operação</b>.
      </>
    ),
    source: "Fonte: Relatório Supermetrics · 14/07/2025",
    take: (
      <>
        Não seja mais
        <br />
        uma <span style={blue}>estatística.</span>
      </>
    ),
  },
  {
    id: "Atendimento",
    pill: "IA & Atendimento",
    statText: "24/7",
    sub: [
      { t: "seu atendimento com IA" },
      { t: "não dorme,", blue: true },
      { t: "não perde lead.", blue: true },
    ],
    note: (
      <>
        <b style={b}>PwC e OpenAI</b> lançaram agentes de atendimento para contact centers (AI Agent
        Store). O que era coisa de gigante agora escala pra <b style={b}>qualquer negócio</b>.
      </>
    ),
    source: "Fonte: PwC × OpenAI · AI Agent Store · jul/2025",
    take: (
      <>
        Responda em
        <br />
        <span style={blue}>segundos.</span>
      </>
    ),
  },
  {
    id: "Eventos",
    pill: "IA & Eventos",
    countTo: 97,
    sub: [
      { t: "de cobertura: cada" },
      { t: "contato de evento" },
      { t: "vira lead no CRM.", blue: true },
    ],
    note: (
      <>
        A parceria <b style={b}>Popl × Apollo.io</b> usa enriquecimento por IA para transformar cada
        interação presencial em <b style={b}>lead qualificado</b> — automaticamente.
      </>
    ),
    source: "Fonte: Popl × Apollo.io · 14/07/2025",
    take: (
      <>
        Seu evento não termina
        <br />
        no <span style={blue}>aperto de mão.</span>
      </>
    ),
  },
];
