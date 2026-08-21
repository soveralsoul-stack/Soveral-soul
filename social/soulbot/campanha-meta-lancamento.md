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
