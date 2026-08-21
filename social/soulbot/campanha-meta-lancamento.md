# SoulBot · Campanha Meta de lançamento (rascunho pronto pra subir)

Status: campanha e conjunto CRIADOS e PAUSADOS em 21/08/2026. Falta subir os
vídeos e criar os anúncios.
Criativos prontos: `out/soulbot-ad-v1-9x16.mp4` e `out/soulbot-ad-v2-9x16.mp4`.

## Configuração

- Objetivo: Interações (mensagens), destino WhatsApp
- Página remetente: Soveral Soul (171082249598362)
- Número de destino: +55 49 99911-8781
- Posicionamentos: Reels e Stories (Instagram e Facebook), 9:16
- Local: Chapecó SC + 50 km
- Idade: 25-55
- Orçamento sugerido: R$ 25 por dia, teste A/B dos dois criativos, 14 dias
- Link de destino com origem marcada:
  https://wa.me/5549999118781?text=Vim%20pelo%20anuncio%20do%20SoulBot

## Anúncio A, criativo V1 "19h42"

Texto principal:
Seu cliente manda mensagem às 19h42, no meio do corre. Se ninguém responde
na hora, ele pergunta pro concorrente.
O SoulBot atende o WhatsApp da sua empresa 24h, tira dúvida, qualifica o
cliente e te chama quando é hora de fechar. Você ensina ele conversando,
sem planilha e sem código.
Seu número continua no seu celular.

Título: Seu WhatsApp atendendo 24h
Descrição: Atendimento com IA, feito em Chapecó
CTA: Enviar mensagem

## Anúncio B, criativo V2 "Quantos você perdeu?"

Texto principal:
Três clientes chamaram ontem à noite. Você respondeu de manhã. Dois já
tinham comprado de outro.
O SoulBot responde na hora, dia e noite. Ele não inventa: fora do que você
ensinou, ele confirma e te encaminha. Não fecha negócio sozinho, qualifica
e chama você.
Sem app novo, sem perder o controle do seu número.

Título: Quantos clientes você perdeu por demorar?
Descrição: Atendimento com IA no WhatsApp
CTA: Enviar mensagem

## Observações

- Sem travessão em nenhum texto, conforme regra da marca.
- Os dois criativos funcionam sem som, tudo legendado em tela.
- Zona segura Meta 2026 aplicada: 14% topo, 35% base, 6% laterais.

## Situação das contas de anúncio (verificado em 21/08/2026)

| Conta | Moeda | Situação | Pode rodar? |
|---|---|---|---|
| Jerd Soveral `...892770` | BRL | Encerrada | Não |
| Jerd Soveral `...252733` | BRL | Pendência financeira em aberto | Só após quitar |
| SSHub Clientes `...934650` | USD | Somente leitura | Não |
| SoveralSoul Business Hub `...892858` | USD | Somente leitura | Não |

A tentativa de criar a campanha na SoveralSoul Business Hub foi recusada pela
própria Meta com erro "Blocked Mutation For Read Only Ad Account". O rótulo
"Read-Only" no nome não é apelido: é uma trava real da plataforma, essas contas
existem só para leitura de dados e não aceitam campanha, conjunto nem anúncio.

Conclusão: hoje nenhuma conta consegue receber a campanha. Caminhos possíveis,
os dois dependem do Jerson:

1. Quitar a pendência da conta BRL `...252733` no Gerenciador de Pagamentos.
   Vantagem: moeda certa (real), sem câmbio nem IOF sobre a verba.
2. Criar uma conta de anúncios nova em BRL dentro do negócio Soveral, com
   cartão próprio do SoulBot.

## O que falta pra subir (depois de resolver a conta)

- Os dois MP4 precisam estar na biblioteca de mídia da conta. O upload por API
  exige URL pública, e os arquivos são locais. Mais rápido: arrastar os dois
  vídeos no Gerenciador de Anúncios. Depois disso eu monto criativo e anúncio.
- Segmentação de Chapecó precisa da chave de cidade da Meta. As ferramentas
  disponíveis aqui não fazem essa busca, então a cidade entra pelo Gerenciador
  ou o Jerson passa a chave.

## Estrutura criada na Meta (21/08/2026)

Pagamento quitado pelo Jerson, a conta BRL `1636115483252733` (Jerd Soveral)
voltou a ACTIVE. É a conta real de trabalho, com histórico de campanhas e uma
CTWA anterior ("Edicao IA p/ Corretores").

- Campanha `120251777041510597` · SoulBot | Lançamento | Mensagens WhatsApp | Ago26
  - Objetivo OUTCOME_ENGAGEMENT, leilão, CBO R$ 25 por dia, PAUSADA
- Conjunto `120251777047180597` · Chapecó e região 50km | 25-55 | Donos de negócio
  - Meta de otimização CONVERSATIONS, destino WHATSAPP, página Soveral Soul
  - Posicionamentos: Stories e Reels no Instagram e no Facebook
  - Geo: raio de 50 km em torno de -27.1009, -52.6156 (chave de cidade 248896,
    região 459), reaproveitado da campanha CTWA que já rodou nessa conta
  - PAUSADO

Links diretos:
- Campanha: https://www.facebook.com/adsmanager/manage/campaigns/edit?act=1636115483252733&selected_campaign_ids=120251777041510597
- Conjunto: https://www.facebook.com/adsmanager/manage/adsets/edit?act=1636115483252733&selected_adset_ids=120251777047180597

## Pendências pra ativar

1. Subir `soulbot-ad-v1-9x16.mp4` e `soulbot-ad-v2-9x16.mp4` na biblioteca de
   mídia da conta. O upload por API exige URL pública sem autenticação e os
   arquivos são locais, então vai pelo Gerenciador mesmo.
2. Confirmar que o número +55 49 99911-8781 é o WhatsApp conectado à página
   Soveral Soul. Anúncio de clique pro WhatsApp entrega as mensagens no número
   ligado à página, não num link solto.
3. Decidir a declaração de conteúdo gerado por IA no anúncio. Os vídeos são
   renderizados por código (Remotion), não por IA generativa, mas a declaração
   é responsabilidade do anunciante e vale a decisão do Jerson.

## Anúncios criados (21/08/2026)

Vídeos na biblioteca da conta de anúncios:
- `1370917495240826` soulbotadv19x16.mp4 (25,5s)
- `1856818371969361` soulbotadv29x16.mp4 (19,5s)

Anúncios, os dois PAUSADOS sob o conjunto `120251777047180597`:
- `120251777495080597` · SoulBot | A | 19h42 | 9x16
- `120251777506990597` · SoulBot | B | Quantos você perdeu | 9x16

Nenhum erro de bloqueio de entrega na campanha, conjunto ou anúncios.

### Aprendizados da montagem (pra próxima campanha CTWA)

1. O destino do WhatsApp NÃO vem de link `wa.me` no criativo. A Meta recusa
   com "Too many parameters in Call To Action". O número é o que estiver
   conectado à página, e o criativo leva
   `call_to_action: {type: WHATSAPP_MESSAGE, value: {app_destination: WHATSAPP}}`.
   Consequência: o texto de origem ("Vim pelo anúncio do SoulBot") não entra
   por link. Se quiser mensagem pré-preenchida, configura no Gerenciador.
2. A descrição (link_description) não é aceita junto do CTA de WhatsApp, então
   a linha "Atendimento com IA, feito em Chapecó" ficou de fora. O texto
   principal e o título entraram inteiros.
3. Vídeo exige miniatura explícita. Sem imagem própria enviada, dá pra usar a
   URL do campo `picture` do próprio vídeo, que a Meta gera no upload.
4. O criativo montado pelo atalho simplificado da ferramenta não vira CTWA
   válido ("Invalid Creative For Objective"). Precisa do `object_story_spec`
   escrito na mão dentro da criação do anúncio.

### Pendências antes de ativar

- Nenhuma conta do Instagram aparece vinculada a essa conta de anúncios. O
  conjunto mira Stories e Reels no Instagram, mas o criativo saiu com
  identidade só de Facebook. Vale vincular o Instagram da marca na conta de
  anúncios, senão a entrega no Instagram fica prejudicada.
- Confirmar que o WhatsApp conectado à página Soveral Soul é o 49 99911-8781.
- Declaração de conteúdo gerado por IA: não foi preenchida, é decisão do dono.

## Instagram vinculado e anúncios refeitos (21/08/2026)

O Jerson vinculou o Instagram. Confirmado por API na conta de anúncios:
`17841452861747596` · @soveralsoul.

Como criativo na Meta é imutável, os dois anúncios foram recriados com a
identidade do Instagram embutida (`instagram_user_id` no criativo e dentro do
`object_story_spec`). A confirmação de que pegou está no campo `page_platform`
do retorno, que passou de FACEBOOK para INSTAGRAM.

Anúncios válidos, os dois PAUSADOS:
- `120251778260180597` · SoulBot | A | 19h42 | 9x16 | IG
- `120251778263790597` · SoulBot | B | Quantos você perdeu | 9x16 | IG

Anúncios antigos (sem Instagram), ARQUIVADOS pra não serem ativados por engano:
- `120251777495080597` e `120251777506990597`

Sem erro de bloqueio de entrega em campanha, conjunto ou anúncios.

### Observação sobre a miniatura

A capa dos dois vídeos é o primeiro quadro, que na nossa animação é o fundo
navy quase vazio (o relógio do V1 só entra no quadro 4). Em Reels e Stories o
vídeo dá play sozinho, então isso quase não aparece, mas se incomodar dá pra
escolher outro quadro como capa na edição do anúncio no Gerenciador. A outra
saída seria renderizar com conteúdo já no quadro 0, o que exige novo upload.

## Campanha de tráfego pra landing (21/08/2026)

Criada porque o caminho do WhatsApp travou: o 8781 está registrado na Cloud API
(WABA SoveralSoul Business Hub) e o fluxo da Caixa de Entrada da página exige
número livre no app WhatsApp Business. Os dois são mutuamente exclusivos.
Anúncio de tráfego não depende de número conectado, então destrava o lançamento.

- Campanha `120251779058870597` · SoulBot | Landing | Tráfego | Ago26
  - OUTCOME_TRAFFIC, leilão, CBO R$ 25 por dia, PAUSADA
- Conjunto `120251779060030597` · Chapecó e região 50km | 25-55 | Site
  - Otimização LINK_CLICKS, destino WEBSITE, mesma geo e posicionamentos
- Anúncios, os dois PAUSADOS e com identidade @soveralsoul:
  - `120251779068370597` · SoulBot | Site A | 19h42 | 9x16
  - `120251779077060597` · SoulBot | Site B | Quantos você perdeu | 9x16

Links com marcação de origem:
- A: soulbot.app.br/?utm_source=facebook&utm_medium=paid&utm_campaign=soulbot_landing_ago26&utm_content=v1_19h42
- B: soulbot.app.br/?utm_source=facebook&utm_medium=paid&utm_campaign=soulbot_landing_ago26&utm_content=v2_quantos_perdeu

Sem erro de bloqueio de entrega.

### Por que LINK_CLICKS e não LANDING_PAGE_VIEWS

A landing não tem pixel da Meta instalado. Sem pixel, a Meta não consegue medir
quem de fato abriu a página, só quem clicou. Instalar o pixel liberaria otimizar
por visualização de página e, mais pra frente, por conversão (clique no botão de
WhatsApp da landing). É a próxima melhoria de maior retorno da campanha.

### Ressalva do fecho dos vídeos

O cartão final dos dois vídeos diz "Chama no WhatsApp", enquanto o botão do
anúncio diz "Saiba mais" e leva ao site. A landing tem o WhatsApp como CTA
principal, então o caminho continua coerente, mas se incomodar dá pra renderizar
uma variante com o fecho apontando pro site.

## Copy revisada pro funil de autocadastro (21/08/2026)

O produto ganhou autocadastro e 7 dias de teste grátis, e a landing trocou os
botões de WhatsApp por "Criar minha conta grátis". A copy anterior falava em
conhecer o produto e não mencionava o teste, que é o gancho mais forte.

Muda também o botão do anúncio: de "Saiba mais" (LEARN_MORE) pra "Cadastre-se"
(SIGN_UP), casando com o botão que a pessoa encontra ao chegar.

### Anúncio A, criativo V1 "19h42"

Texto principal:
Seu cliente manda mensagem às 19h42, no meio do corre. Se ninguém responde na
hora, ele pergunta pro concorrente.

O SoulBot atende o WhatsApp da sua empresa 24h, tira dúvida, qualifica o cliente
e te chama quando é hora de fechar. Você ensina ele conversando, sem planilha e
sem código.

Crie sua conta em soulbot.app.br e teste grátis por 7 dias.

Título: Teste o SoulBot grátis por 7 dias
Descrição: Atendimento com IA, feito em Chapecó
Botão: Cadastre-se

### Anúncio B, criativo V2 "Quantos você perdeu"

Texto principal:
Três clientes chamaram ontem à noite. Você respondeu de manhã. Dois já tinham
comprado de outro.

O SoulBot responde na hora, dia e noite. Ele não inventa: fora do que você
ensinou, ele confirma e te encaminha. Não fecha negócio sozinho, qualifica e
chama você.

Monte o seu em soulbot.app.br. Sete dias grátis, sem instalar nada.

Título: Quantos clientes você perdeu por demorar?
Descrição: Sete dias grátis, sem instalar nada
Botão: Cadastre-se

### Quando aplicar

Criativo na Meta é imutável, então trocar copy exige recriar os anúncios. Como
os vídeos também mudaram (fecho novo apontando pro site), o certo é fazer as
duas coisas de uma vez, quando os MP4 novos estiverem na biblioteca da conta.
Assim não se queima uma rodada de anúncio à toa.
