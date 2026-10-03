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

## Legendas animadas (referências aprovadas pelo Jerson, 21/08/2026)

Três anúncios reais gravados de tela: um do wesalescrm e dois do lucassena.
Não são legenda de acessibilidade, são legenda como peça gráfica, o texto
carrega o vídeo e a fala só acompanha. É esse tipo que queremos usar.

Quadros de referência em `docs/refs/`, extraídos em rajada de 8 a 10 quadros
por segundo, que é o que deixa a animação visível.

### Denominador comum das três

- Uma fonte só, sans geométrica de peso pesado, levemente oblíqua, entrelinha
  apertada. Nada de fonte fina ou de duas famílias disputando.
- No máximo DUAS cores por frase: um neutro (branco) pra ligação e um acento
  pra palavra que carrega o sentido. O acento muda de frase pra frase, o
  neutro nunca muda.
- Sombra escura suave por baixo do texto, sempre. É o que segura a leitura
  quando o fundo é claro ou tem movimento.
- O ritmo é o da fala, não do relógio: a frase troca quando a pessoa termina
  de dizer, então o texto nunca fica órfão na tela.
- Nada de caixa retangular opaca atrás. Quando tem fundo, é fosco e discreto.

### Família 1: frase inteira com palavra de destaque

`docs/refs/legenda-frase-destaque.jpg`

Uma linha por vez, trocada inteira, sem acumular: "usuários *ilimitados!*"
some e entra "sem *fidelidade!*".

- Primeira palavra branca, segunda no acento. O acento troca a cada frase
  (violeta numa, verde na outra), o que dá variedade sem virar arco-íris.
- Entrada com pop de escala curto, uns 4 a 6 quadros, com leve passada do
  ponto e volta. Sem slide, sem fade longo.
- Um sticker 3D acompanha a frase logo acima, ilustrando a palavra de
  destaque (selo verificado pra "usuários", documento com caneta pra
  "fidelidade"), e ele também se mexe.
- Posição: centro horizontal, faixa média-baixa da tela, sempre na mesma
  âncora. O olho não caça.
- **No SoulBot, o sticker 3D não serve**: a marca não usa emoji nem ícone de
  banco. O lugar dele é um ícone nosso de `components/icones.tsx` no mesmo
  traço, ou nada. O acento sai do ciano e do violeta da marca.

### Família 2: duas linhas, convergência e palavra por palavra

`docs/refs/legenda-duas-linhas.jpg`

A mais elaborada das três, e a que eu recomendo pro SoulBot.

- Linha 1 entra partida ao meio: "Sem" vem da esquerda, "precisar" vem da
  direita, as duas convergem pro centro e assentam com leve overshoot. Dura
  uns 8 a 10 quadros.
- Linha 2 aparece logo abaixo, menor, e se constrói PALAVRA POR PALAVRA da
  esquerda pra direita, acumulando: "estar" → "estar nos" → "estar nos
  Estados" → "estar nos Estados Unidos". Cada palavra com pop curto.
- Enquanto a linha 2 se constrói, a linha 1 fica parada. Só uma coisa se
  mexe por vez, e é isso que faz parecer caro em vez de agitado.
- Cor: linha 1 branca, linha 2 no acento âmbar. No fecho da frase pode
  inverter (acento em cima, branco embaixo), como no outro quadro.
- Posição: terço superior, bem acima da UI do anúncio.

### Família 3: painel fosco com cantoneiras

`docs/refs/legenda-painel-cantoneiras.jpg`

Variante da família 2 pra momento de mais peso.

- Mesmo par de linhas, mas sobre um painel translúcido fosco, com duas
  cantoneiras em L nos cantos opostos, como uma mira enquadrando a frase.
- A linha de cima é a de destaque (âmbar com acabamento metálico) e a de
  baixo é a branca de apoio, invertendo a hierarquia da família 2.
- O painel entra e sai junto com a frase, não fica permanente.
- Serve pro dado ou pra promessa central do vídeo, uma vez por peça. Usado
  em toda frase, cansa.

### Regra de posição que vale pras três

Nenhuma das referências põe legenda no terço de baixo, e não é acaso: ali
mora a UI do anúncio (botão, perfil, legenda do post). Elas ficam entre o
terço superior e o meio da tela. Isso bate com o que já está medido acima:
os 672 px de base e a faixa de 140 px à direita continuam valendo, e legenda
animada não é exceção.

### No motor: `src/soulbot/Legenda.tsx`

Feito em 21/08/2026. Duas famílias, as duas parametrizadas:

- `<Legenda linha1={[...]} linha2={[...]} />` é a família 2. A `linha1` é
  dividida ao meio, a primeira metade vem da esquerda e a segunda da direita.
  A `linha2` se constrói palavra por palavra, começando 14 quadros depois,
  quando a de cima já assentou. `inverter` troca acento e branco de lugar.
- `<LegendaFrase palavras={[...]} destaque={i} />` é a família 1, uma linha
  trocada inteira, com pop curto de escala.
- `acento` aceita só `cyan` ou `violet`, os da marca. Não dá pra passar cor
  solta de propósito: é o que impede a legenda de virar arco-íris.
- `ancora` fica em `alto` ou `meio`. O terço de baixo não é opção.
- `italico` existe pra imitar a oblíqua das referências, desligado por padrão.

Banco de prova: composição `SoulBot-Legenda-Demo`, em `LegendaDemo.tsx`.
Quando entrar filmagem real, o `SbBackground` sai e o `<OffthreadVideo>`
entra no lugar, o resto do arquivo continua igual.

**Achado da montagem, vale pra qualquer animação lateral que a gente fizer:**
a convergência começava com 260 px de deslocamento e a palavra da esquerda
entrava em x=26, dentro da margem lateral de 65 px que nós mesmos definimos.
Só apareceu porque os quadros de entrada foram varridos um a um procurando
pixel claro dentro da margem, e não olhando de olho. Ficou em 130 px mais
fade de 8 quadros: enquanto a palavra viaja ela está fraca, quando fica
legível já chegou. Varredura de 88 quadros depois da correção: limpo.
Movimento que entra de fora da tela precisa ser medido, não estimado.
