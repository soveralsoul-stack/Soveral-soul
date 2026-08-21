# SoulBot · Campanha Meta de lançamento (rascunho pronto pra subir)

Status: aguardando decisão de conta de anúncios e resolução de pagamento.
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
