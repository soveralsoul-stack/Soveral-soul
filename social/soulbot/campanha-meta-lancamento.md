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
  - ATENÇÃO: o "25-55" do nome estava errado, ver a seção de público no fim
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

## Anúncios refeitos com trilha e copy do autocadastro (21/08/2026)

O Jerson subiu na biblioteca da conta os dois vídeos editados por ele, com a
trilha que ele mesmo montou. Criativo na Meta é imutável, então os anúncios
foram recriados do zero, não editados.

Vídeos usados (casados por DURAÇÃO, não por nome, porque houve arquivo com nome
trocado na biblioteca):
- `1063053452871477` soulbotadv19x16.mp4, 25,5s, é o V1
- `1937567700218736` soulbotadv29x16.mp4, 19,5s, é o V2

Anúncios novos, os dois PAUSADOS sob o conjunto `120251779060030597`:
- `120251781301630597` · SoulBot | Site A | 19h42 | 9x16 | trilha
- `120251781304220597` · SoulBot | Site B | Quantos você perdeu | 9x16 | trilha

O que mudou em relação aos anteriores:
- Copy do funil de autocadastro, com o teste grátis de 7 dias no texto e no
  título, no lugar de "veja funcionando" e "entenda como funciona"
- Botão SIGN_UP ("Cadastre-se") no lugar de LEARN_MORE ("Saiba mais"), casando
  com o botão que a pessoa encontra ao chegar na landing
- `conversion_domain` soulbot.app.br declarado, que é o que liga o anúncio à
  medição de eventos agregados do domínio
- Identidade @soveralsoul confirmada: `page_platform` voltou INSTAGRAM nos dois

A `link_description` foi aceita desta vez. Ela tinha caído fora nos anúncios de
WhatsApp, mas ali a recusa vinha do CTA de WhatsApp, não da descrição em si.

Anúncios antigos de tráfego, ARQUIVADOS pra não serem ativados por engano:
- `120251779068370597` e `120251779077060597`

Sem erro de bloqueio de entrega em campanha, conjunto ou anúncios.

### Pixel confirmado em produção

O pixel `1553214922923491` (Soulbot LP) está recebendo evento de verdade:
PageView registrado em 21/08 no site publicado. Ou seja, a instalação na landing
está de pé, não é só código no repositório.

Ainda não há CompleteRegistration porque ninguém criou conta pelo anúncio, o
que é o esperado com a campanha parada.

### Próxima decisão: meta de otimização do conjunto

O conjunto está em LINK_CLICKS, escolhido quando não havia pixel. Com o pixel
funcionando, dá pra passar pra LANDING_PAGE_VIEWS, que faz a Meta buscar quem
de fato abre a página em vez de quem só clica e desiste no meio do carregamento.
Costuma render menos cliques e mais gente chegando de verdade.

Trocado em 21/08/2026 a pedido do Jerson. O conjunto `120251779060030597`
está agora em LANDING_PAGE_VIEWS.

Detalhe da montagem: a primeira tentativa mandou junto um `promoted_object` com
o `pixel_id`, e a Meta recusou com "Promoted Object Invalid". Em campanha de
tráfego o destino é o link do criativo, não um objeto promovido, então o campo
sai sozinho e a troca passa limpa. Guardar isso pra próxima.

## Campanha NO AR (21/08/2026)

Ativada a pedido do Jerson, os três níveis ligados, que é o que a Meta exige
pra entregar. Ativar só o anúncio não faz nada acontecer enquanto campanha e
conjunto seguem pausados.

- Campanha `120251779058870597` · ACTIVE · R$ 25,00 BRL por dia (CBO)
- Conjunto `120251779060030597` · ACTIVE · otimizando por LANDING_PAGE_VIEWS
- `120251781304220597` · Site B | Quantos você perdeu · ACTIVE, já aprovado
- `120251781301630597` · Site A | 19h42 · ACTIVE, em PENDING_REVIEW

O anúncio A entra em entrega assim que a análise da Meta liberar. Não é erro,
é a fila de revisão normal, e não bloqueia o B de rodar enquanto isso.

Sem erro de bloqueio de entrega em nenhum dos quatro.

### O que olhar nos primeiros dias

- Se o A ficar preso em PENDING_REVIEW por muitas horas, vale conferir se não
  virou rejeição. A ferramenta de erros não cobre rejeição de anúncio, isso só
  aparece no Gerenciador.
- CompleteRegistration no pixel é a métrica que interessa de verdade: clique e
  visualização de página medem o caminho, conta criada mede o resultado.
- O orçamento é de campanha (CBO), então a Meta distribui entre A e B sozinha.
  Se um dos dois comer tudo cedo, é ela escolhendo, não erro de montagem.

### Ainda em aberto

- Declaração de conteúdo gerado por IA nos anúncios: não preenchida. Os vídeos
  são renderizados por código (Remotion), não por IA generativa, mas a
  declaração é responsabilidade do anunciante.
- Ficha da SoveralSoul: `phone_number_id` e `donos` seguem como PREENCHER,
  travados enquanto o 8781 não estiver no app SOVERBOT.


## Público: o que estava errado e o que foi corrigido (21/08/2026)

O Jerson perguntou se o público tinha sido segmentado pra empresários, donos de
pequenos negócios, clínicas e restaurantes. Fui ler a segmentação guardada em
vez de confiar na memória, e achei duas coisas fora do lugar.

**Não havia nenhuma camada de perfil.** Nem interesse, nem comportamento, nem
cargo. O conjunto mirava qualquer pessoa dentro do raio.

**A idade não era a do nome.** O conjunto se chamava "25-55" e a segmentação
guardada era 18 a 65. O doc aqui repetia o "25-55" do nome, então estava
errado desde a criação.

A causa das duas coisas é a mesma: **Advantage+ Público ligado**. Com ele
ligado, idade e interesse viram sugestão e a Meta expande à vontade. Não
adianta preencher e achar que restringiu.

Corrigido por API: idade agora 25-65 e o conjunto renomeado pra
`Chapecó e região 50km | 25-65 | Site`.

### Por que estreitar aqui não sufoca a entrega

Chapecó e 50 km tem por volta de 300 mil adultos de 25 a 65. Donos de negócio
são uns 10% disso, perto de 30 mil pessoas. Com R$ 25 por dia a CPM de R$ 9 dá
cerca de 2.800 impressões diárias, ou 39 mil em 14 dias. Contra 30 mil pessoas
a frequência fica em torno de 1,3, que é confortável. Ou seja: dá pra estreitar
sem faltar público, e com R$ 14 gastos o aprendizado mal tinha começado, que é
a melhor hora pra mexer.

### Camada de perfil: por que ficou pro Gerenciador

Segmentação por interesse na API exige o ID numérico real de cada interesse, e
as ferramentas disponíveis nesta sessão não têm busca de segmentação. Chutar ID
miraria outra coisa sem avisar, então não foi feito por aqui. Fica no
Gerenciador, onde a Meta resolve o ID enquanto se digita o nome.

Lista passada pro Jerson, em ordem de valor:

1. Comportamento: Administradores de Página do Facebook. É o melhor proxy que
   existe: quem administra página de empresa tem empresa. A Meta ainda deixa
   refinar por categoria da página, onde aparecem restaurante, loja, clínica.
2. Cargo: Proprietário de empresa, Proprietários de pequenas empresas.
3. Interesse, pra alargar: Empreendedorismo, Pequenas e médias empresas,
   Negócios.

Junto com a lista, três avisos que fazem a diferença entre funcionar e não
funcionar: desligar o Advantage+ Público antes (senão vira sugestão), não
marcar "Expansão da segmentação detalhada" no fim da seção (ela desfaz o
estreitamento), e olhar o medidor de tamanho de público, mantendo acima de uns
20 mil pra verba não engasgar.

### Lição pra próxima campanha

Nome de conjunto não é fonte de verdade, é rótulo que alguém digitou. A
segmentação real só se sabe lendo o campo `targeting` da API. Este doc chegou a
afirmar "25-55" por acreditar no nome.
