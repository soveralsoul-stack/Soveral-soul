# Reels e Stories: zona segura e referências de motion

Memória do motor de edição (Remotion). Fonte de verdade pros vídeos verticais
da casa (SoulBot, SoveralSoul, Flowpilot). Atualizado em 21/08/2026.

## Zona segura (anúncios Reels e Stories, unificada pela Meta em março de 2026)

Tela base 1080x1920 (9:16). A Meta unificou as zonas de Stories e Reels:
um único layout serve os dois posicionamentos.

| Área | Percentual | Pixels (1080x1920) |
|---|---|---|
| Topo (status, voltar, câmera) | 14% | 270 px |
| Base (CTA "Saiba mais", perfil, legenda, barra de conversa) | 35% | 672 px |
| Laterais | 6% | 65 px cada |

Regra extra medida em capturas reais de anúncio (iPhone 1290x2796):

- O botão de CTA do anúncio começa a ~72% da altura. O limite de 35% da Meta
  já cobre isso com folga. Nunca confiar no visual de Reel orgânico: a UI de
  anúncio é maior.
- A coluna de ícones (curtir, comentar, compartilhar, salvar) ocupa a faixa
  direita de ~140 px entre ~55% e ~80% da altura. Texto e elemento crítico
  ficam fora dessa faixa. Fundo e textura podem passar por baixo.

No código: `src/soulbot/tokens.ts` exporta `SAFE_TOP`, `SAFE_BOTTOM`,
`SAFE_SIDE` e `SAFE_RIGHT_RAIL`. Toda composição vertical nova parte deles.

Fontes: [guia da zona unificada 2026](https://behaviour.digital/post/meta-reels-safe-zone-14-top-35-bottom-6-sides-the-2026-official-guide),
[Meta ad specs 2026](https://www.tryvizup.com/blog/meta-ad-specs-2026-every-dimension-size-you-need),
[safe zones em pixels](https://www.1clickreport.com/blog/meta-ads-creative-safe-zones-2026-guide).
No Gerenciador de Anúncios, o Safe Zone Guardrail da Meta confere o material
antes de subir.

## Referências de motion (aprovadas pelo Jerson, 21/08/2026)

Capturadas de dois anúncios reais gravados em tela (IMG_9589 e IMG_9590).

### 1. Tipografia em camadas (o "soco" de texto)

Como no quadro "9 horas ENFRENTANDO trânsito":

- Duas ou três linhas empilhadas com hierarquia forte: sans neutra em cinza
  claro, depois uma palavra de impacto em serif itálica caixa alta com glow
  quente (âmbar ou laranja), depois sans branca.
- Contraste de tamanho agressivo entre as linhas (a palavra de impacto é 1.5x
  a 2x as vizinhas) e leve sobreposição vertical entre elas.
- Textura de apoio atrás do bloco (grade com nós brilhantes, glow suave),
  nunca competindo com a leitura.
- Posição: terço médio da tela, entre ~40% e ~65% da altura. Fora da base de
  35% e fora da faixa de ícones à direita.
- No SoulBot: a palavra de impacto pode usar o violeta ou o ciano da marca no
  lugar do laranja da referência.

### 2. Legenda karaokê (palavra por palavra)

Como a palavra "isso" da referência:

- Uma palavra (ou dupla curta) por vez, acompanhando a fala.
- Sans arredondada, peso pesado, cor âmbar/amarela, sombra suave escura,
  leve pop de escala na entrada de cada palavra.
- Posição fixa: centro horizontal, ~50% a 55% da altura, sempre na mesma
  âncora pra não fazer o olho caçar.
- Uso: vídeos falados (depoimento do piloto, V3) e qualquer corte com voz.

### 3. Palavra ancorada no cenário

Texto de contexto que entra apoiado num elemento da cena (como "motorista de
APLICATIVO" sobre o ombro do apresentador): serif itálica de impacto na
palavra chave, sans na frase de apoio, entrada com leve slide lateral.

## Checklist antes de renderizar peça vertical nova

1. Elementos críticos dentro de 270 do topo até 672 da base, 65 nas laterais.
2. Nada crítico na faixa direita de 140 px entre 55% e 80% da altura.
3. Texto em ritmo de leitura: ~3 palavras por segundo, fechamento com 4s ou
   mais de tela.
4. Funciona sem som, sem travessão em nenhum texto, poucos emojis.
