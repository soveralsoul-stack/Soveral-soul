# Exata · disparo do pré-lançamento dos studios

Ideia do Willian (áudio de 29/10/2026): um card com pouca informação, imagem de Chapecó que não polua, e um disparo pelo WhatsApp para os leads que já estão no SSHub, dos antigos aos que estão chegando, para trazer o lead de volta. Ainda não dá para falar em "100 vezes", então a entrada aparece como "facilitada de um jeito que você nunca viu". Sem link na mensagem, porque o povo acha que é vírus e não clica.

## 1. O card

- Template: `social/orbita/templates/exata-prelancamento.html`
- Render: `node social/orbita/build/render-exata-prelancamento.js`
- Saída: `social/orbita/build/exata-prelancamento-4x5.jpg` (1080x1350, cabeçalho do WhatsApp e feed) e `exata-prelancamento-1x1.jpg` (1080x1080, reserva)
- Foto: `social/acervo/por-do-sol-chapeco.jpg`, o skyline de Chapecó no pôr do sol, escurecida em cima e embaixo para a escrita mandar.
- Identidade da Exata, pelo manual de marca 2025/26 (Teeza): faixa no azul tradicional **#0047BA**, chapado, porque o manual proíbe aplicar a marca sobre outro tom de azul; logo oficial na versão branca (`social/acervo/exata-imobiliaria-branca.svg`, com "imobiliária" no laranja #FF6100), acima do mínimo digital de 45 px e com a margem de segurança da altura do "e". O dourado continua como cor de destaque da campanha.
- A fonte da marca (Anteb) fica restrita ao logo, que entra como vetor oficial; os textos do card usam as fontes do kit.

Texto do card:

> PRÉ-LANÇAMENTO · CHAPECÓ
> **Sair do aluguel ainda em 2026?**
> MINHA CASA, MINHA VIDA · FINANCIADO
> Studios com área de lazer completa, a 550 m da Av. Getúlio Vargas.
> **Entrada facilitada como você nunca viu**
> Você está convidado para a apresentação exclusiva.

## 2. Modelo de mensagem para a Meta aprovar

Categoria **Marketing**, idioma `pt_BR`. São dois modelos: o com imagem é o plano A, e o só de texto entra se a Meta recusar a imagem.

### A) `prelancamento_studios_img` (cabeçalho com imagem)

- **Cabeçalho:** imagem, `exata-prelancamento-4x5.jpg`
- **Corpo:**

```
Olá! Aqui é da Exata Imóveis.

Estamos preparando o pré-lançamento de studios com área de lazer completa, a 550 m da Av. Getúlio Vargas, numa das regiões mais centrais de Chapecó.

São apartamentos financiados pelo Minha Casa, Minha Vida. Para quem quer sair do aluguel ainda em 2026, a entrada vai ser facilitada de um jeito que você nunca viu. As condições do pré-lançamento só serão mostradas pessoalmente, na apresentação do empreendimento.

Você está convidado. Quer reservar um horário para conhecer?
```

- **Rodapé:** `Exata Imóveis · Chapecó/SC`
- **Botões (resposta rápida):** `Quero conhecer` · `Agora não`
- **Botão de descadastro de marketing** (opção nativa da Meta): `Não quero receber`

### B) `prelancamento_studios_txt` (só texto, caso a imagem não passe)

- **Cabeçalho:** texto, `Pré-lançamento em Chapecó`
- **Corpo, rodapé e botões:** iguais aos do modelo A.

Sem variável de nome de propósito: o nome do contato no SSHub muitas vezes é o apelido do perfil do WhatsApp (emoji, "~", número), e um "Olá, 🌻!" derruba a mensagem.

## 3. Para quem vai

Base de leads da Exata no SSHub em 29/10/2026, já sem os marcados como "não é lead", sem os números internos (corretores e equipe), sem quem já virou contrato e só com números do Brasil: **10.120 leads**.

| Lote | Quem | Leads |
|---|---|---|
| 1 | Entraram nos últimos 90 dias | 957 |
| 2 | Entre 3 e 6 meses | 1.226 |
| 3 | Entre 6 e 12 meses | 2.389 |
| 4 | Mais de 12 meses (legado do Re9sys/Moov) | 5.548 |

A ordem importa: quem chegou há pouco lembra da Exata, responde mais e bloqueia menos. Bloqueio e denúncia em massa derrubam a qualidade do número, e o número que dispara é o mesmo que recebe os leads da roleta.

## 4. Antes de disparar: o limite do número

A checagem de saúde do SSHub (29/10, 17h) marcou o principal **+55 49 3331-0700** como **"limitado"**: o nome de exibição ainda não foi aprovado pela Meta, então o número fica no limite mais baixo de conversas que a empresa pode iniciar por dia. Responder cliente continua normal.

Na prática, enquanto esse aviso estiver lá:

- o lote 1 sozinho já passa do limite de um dia e precisa ser fatiado em envios diários;
- disparar a base inteira de uma vez não sai, e as mensagens além do limite falham.

Por isso o primeiro passo é destravar o nome de exibição no Gerenciador do WhatsApp. Com o limite subindo, os lotes podem ser maiores.

## 5. Como disparar pelo SSHub

A tela de campanhas do SSHub dispara um modelo aprovado para os contatos com uma **etiqueta** (foi assim na `retomada_carteira`, de 09/09, com a etiqueta `resgate-davi`: 68 enviados, 0 falhas). O caminho:

1. Aprovar o modelo A (ou o B) na Meta.
2. Etiquetar o lote no SSHub, por exemplo `prelanc-studios-l1`.
3. Criar a campanha com o modelo e a etiqueta do lote.
4. Avisar os corretores do plantão: quem responder "Quero conhecer" cai na fila como conversa aberta pelo cliente.

Etiquetar 957 contatos à mão não dá. A etiqueta do lote 1 pode ser aplicada direto no banco com o SQL abaixo. Ele **ainda não foi rodado**, porque mexe na base de produção e precisa do ok de quem responde pelo SSHub:

```sql
update contacts c
set tags = array_append(coalesce(c.tags, '{}'), 'prelanc-studios-l1')
where c.org_id = '346b866b-a4d7-44b8-aee5-7adaa2af237f'
  and not coalesce(c.nao_lead, false)
  and coalesce(c.status, '') <> 'contrato'
  and left(regexp_replace(c.wa_phone, '\D', '', 'g'), 2) = '55'
  and c.created_at >= now() - interval '90 days'
  and not exists (
    select 1 from org_member_telefones t
    where t.org_id = c.org_id
      and right(regexp_replace(t.telefone, '\D', '', 'g'), 8) = right(regexp_replace(c.wa_phone, '\D', '', 'g'), 8))
  and not ('prelanc-studios-l1' = any(coalesce(c.tags, '{}')));
```

Para os lotes seguintes, troque a etiqueta e a janela de `created_at`.

## 6. Legenda de apoio (feed/stories)

```
Sair do aluguel ainda em 2026?

Vem aí o pré-lançamento de studios com área de lazer completa, a 550 m da Av. Getúlio Vargas, no coração de Chapecó.

Financiados pelo Minha Casa, Minha Vida, com entrada facilitada como você nunca viu. As condições do pré-lançamento só serão apresentadas pessoalmente.

Quer ser convidado para a apresentação? Chama a Exata no WhatsApp.

#ExataImóveis #Chapecó #PréLançamento #SairDoAluguel #MinhaCasaMinhaVida #Studio
```
