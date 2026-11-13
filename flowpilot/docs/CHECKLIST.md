# Checklist — App Review + Verificação de Negócio (Instagram content publishing)

Objetivo: sair de "publica só na minha conta" (modo Dev / testadores) para
**publicar na conta de clientes** (Acesso Avançado ao `instagram_business_content_publish`).

> Seu app usa o fluxo **Instagram API com login do Instagram** (`graph.instagram.com`).
> A permissão a aprovar é **`instagram_business_content_publish`** (Acesso Avançado).
> Isso exige **App Review** + **Verificação de Negócio**. Leva de dias a ~2 semanas.
> A interface da Meta muda de vez em quando; siga os prompts que aparecem no painel.

## Pré-requisitos (antes de submeter)
- [ ] App dentro de um **Portfólio de Negócios** (Meta Business Manager).
- [ ] Produto **Instagram** configurado no app (o mesmo que você já usa).
- [ ] **App em modo Live** (não Development), com ícone, nome, categoria e e-mail de contato.
- [ ] **Política de Privacidade** publicada numa URL pública (use a página que preparei:
      `flowpilot.app.br/privacidade`). Cole essa URL em App Settings > Basic.
- [ ] **URL de exclusão de dados** (ou instruções de exclusão) — a mesma política já cobre isso.
- [ ] **Verificação de Negócio** concluída (Business Settings > Security Center):
      documento da empresa (CNPJ/contrato social) + comprovante. Pode levar alguns dias.

## Submissão do App Review
1. Painel do app > **App Review > Permissions and Features**.
2. Localize **`instagram_business_content_publish`** > **Request Advanced Access**.
3. Preencha:
   - [ ] **Como o app usa a permissão** (texto claro): "O FlowPilot (by Soveral Soul) agenda
         e publica posts (feed, carrossel, stories, reels) na conta de Instagram do próprio
         usuário, que autoriza o acesso. O usuário fornece as artes/legendas; o app apenas
         publica em nome dele, nos horários definidos." (texto pronto em `roteiro-video.md`)
   - [ ] **Screencast** demonstrando o fluxo completo (ver `roteiro-video.md`).
   - [ ] **Passos para o revisor reproduzir** (credenciais/instruções de teste).
4. Envie e acompanhe o status.

## O que o revisor precisa VER no vídeo (senão reprova)
- [ ] Usuário fazendo **login/autorização** do Instagram no seu app.
- [ ] A tela pedindo a permissão **`instagram_business_content_publish`**.
- [ ] O app **criando e publicando** um post de verdade.
- [ ] O post **aparecendo** na conta do Instagram.
- [ ] Como o usuário **revoga** o acesso (ou onde vê isso).

## Motivos comuns de REPROVAÇÃO (evite)
- Vídeo não mostra a permissão sendo usada de ponta a ponta.
- Política de privacidade ausente, genérica ou sem falar de exclusão de dados.
- App ainda em Development, ou negócio não verificado.
- Descrição vaga de "como usa a permissão".
- Sem instruções/credenciais pro revisor testar.

## Enquanto o Review não sai (dá pra vender e entregar já)
- Adicione a conta IG de cada cliente como **testador do app** (Roles > Instagram Testers).
  Com o app em Dev/checkpoint, você publica na conta deles sem Review. Serve pros
  primeiros clientes (há limite de testadores).
- Ao aprovar o Review, remove essa limitação e escala pra qualquer cliente.

## Ordem sugerida
1. Publicar a **política de privacidade** (URL).
2. Iniciar a **Verificação de Negócio** (demora, começa cedo).
3. Gravar o **vídeo** (roteiro pronto).
4. Preencher e **submeter** o App Review.

## Histórico do App Review

### 1ª submissão — 26/07/2026 → rejeitada em 11/08
- Aprovadas: `instagram_business_basic`, `public_profile`.
- Rejeitada: `instagram_business_content_publish`, Política do Desenvolvedor 1.6
  ("caso de uso inválido ou desnecessário para a funcionalidade principal").
- Causa real: o campo de uso só tinha roteiro de teste, sem descrever o produto, e a
  demo mostrava um botão "publicar post de teste" sem nenhuma agenda visível.

### 2ª submissão — 02/09/2026 → rejeitada
O que mudou antes de reenviar:
- `/demo` mostra a **tabela da agenda** da conta conectada e o botão vira
  "Run the scheduler now". Tela inicial reescrita em torno da agenda.
- `/api/demo-reset` + botão "Not your account? Disconnect and connect another",
  para o revisor nunca herdar a conta de quem testou antes.
- Cron ignora o cliente `reviewer` (publica só pelo botão).
- Caminho de revogação corrigido: Settings → Website permissions → Apps and websites.
- `/termos` no ar; Configurações do app → Básico com os quatro URLs, e-mail
  `comercial@soveralsoul.com.br` e domínio `flowpilot.app.br`.
- Screencast regravado (`out/flowpilot/app-review-v2.mp4`, 74s, legendas EN):
  demo → consentimento com as duas permissões → agenda → Media ID → story no
  perfil → revogação. Fonte das legendas: `src/AppReview.tsx`.
- Campo de uso com as três seções pedidas pela Meta (funcionalidade, integração,
  experiência), o "how to test" e as notas de reenvio, tudo num campo só.

Solicitação de 02/09/2026 19:25, envio registrado no painel em 11/09/2026 15:05, só
`content_publish`. **Recusada.** Renovadas no mesmo envio: `instagram_basic`,
`instagram_business_basic`, `public_profile`.

**Motivo exato (lido no painel em 13/11/2026, Análise do app → Envios → feedback):**
- Título: **"Screencast não alinhado com detalhes do caso de uso"**, Política do
  Desenvolvedor 1.6.
- A Meta diz que **o caso de uso é permitido**; o problema é só o vídeo: "o screencast
  enviado não demonstra a experiência completa do caso de uso descrito nas observações
  do envio".
- Pede um screencast novo com: (1) o fluxo de login completo da Meta; (2) o usuário
  concedendo a permissão; (3) a experiência completa do caso de uso; (4) o Guia de
  gravação de tela, incluindo **inglês como idioma da interface**, legendas e dicas
  explicando o que fazem os botões e outros elementos da tela; (5) se for servidor a
  servidor, dizer isso no envio (não é o nosso caso).
- Notas do analista (texto original, em inglês): "To verify content publish, please
  re-record: compose and publish a post from your app, then open the Instagram client
  and show the same post visible on the linked account. Ensure the post's caption and
  media match what was submitted."

Leitura: confirma a hipótese. O revisor queria ver o post **sendo composto dentro do
app** e depois **o mesmo post, com a mesma imagem e a mesma legenda**, no Instagram.
O vídeo v2 publicava um story pronto nosso (story nem tem legenda), então não havia
o que comparar. O compositor da 3ª submissão resolve isso, desde que o vídeo use
**post de feed** e mostre a legenda aberta no Instagram.

### Conferência do painel em 13/11/2026
- App **Publicado** (Live). Categoria: Utilitários e produtividade.
- Nome de exibição: **ainda "SoveralSoul Publisher"** (trocar para FlowPilot).
- Nome do app do Instagram (Casos de uso → API do Instagram → Configuração da API com
  login do Instagram): **"SoveralSoul Publisher-IG"**. Depois de trocar o nome de
  exibição, usar o botão "Sincronizar nome do app" nessa tela.
- Ícone: arquivo `appiconmeta1024.png` carregado, mas a miniatura aparece em branco no
  painel e quebrada na barra lateral. Recarregar o ícone do FlowPilot (1024x1024).
- Domínio `flowpilot.app.br`, e-mail `comercial@soveralsoul.com.br`, Privacidade
  `/privacidade`, Termos `/termos`, exclusão de dados (URL de instruções)
  `/privacidade`, site `https://www.flowpilot.app.br/`: ok.
- Verificação da empresa (Analisar → Verificação): **Verificado**.
- Verificação de Uso de Dados: concluída.
- A `/demo` no ar mostrava "Another Instagram account is connected to this demo from a
  different browser": alguém conectou de outro navegador. Desconectar antes de gravar.

### Teste da `/demo` no ar em 13/11/2026 (conta @soveralsoul, post de feed)
- Connect Instagram → consentimento → volta "Connected: @soveralsoul", agenda vazia: ok.
- Imagem 2400x1260 recortada no navegador para 1080x567 JPEG (59 KB); legenda
  "FlowPilot test post, Nov 13. Scheduled and published from FlowPilot."; Add to
  schedule → linha "Scheduled" às 12:03: ok.
- Publish now → "Published to @soveralsoul", Media ID 17975462889185457: ok.
- `/m/<id>.jpg` responde 200, `image/jpeg`, 1080x567: ok.
- No Instagram web o post apareceu no topo do perfil (`/p/Dfr5HasIIzG/`) com a
  legenda idêntica. A imagem ficou cinza no navegador, mas a foto de perfil e um
  destaque também não carregavam na mesma sessão: falha de carregamento do Instagram
  web nesse Chrome, não do post. Conferir no app do celular.
- Achados para a gravação:
  - Como o app já estava autorizado, o Instagram mostrou o consentimento curto
    ("Você conectou anteriormente..."), **sem a lista de permissões**. Antes de gravar,
    remover o app em Apps and websites para a tela completa aparecer.
  - O consentimento mostrou "SoveralSoul Publisher-IG" e estava em português. O nome
    foi trocado no mesmo dia (agora "FlowPilot - IG"); falta o idioma.
  - O campo de arquivo da `/demo` usa o botão nativo do Chrome ("Escolher arquivo"),
    que segue o idioma do navegador. Gravar com o Chrome em inglês, ou trocar por um
    botão próprio "Choose image".

### 3ª submissão — preparação
O que mudou:
- **Compositor na `/demo`**: o revisor envia a própria imagem, escreve a legenda,
  escolhe feed ou story e a data/hora. O post entra na agenda dele e sai no horário
  pelo cron (a cada 15 min), ou na hora pelo "Publish now". A demo começa vazia:
  tudo o que é publicado foi o usuário que criou.
- A imagem é recortada no navegador para um formato aceito (feed entre 4:5 e
  1.91:1, story 1080x1920), vai em JPEG para o Upstash (`media:<id>`, expira 3 dias
  depois do horário) e o Instagram busca em `flowpilot.app.br/m/<id>.jpg`.
- A conta da demo fica presa ao navegador que conectou (cookie `fp_demo`): quem
  abrir `/demo` de outro lugar vê só a tela de conectar, nunca a conta de outro.
- O cron agora publica a **fila** do cliente `reviewer` (posts que o próprio usuário
  agendou). A agenda semanal continua nunca rodando nessa conta.

Falta fazer (Rodrigo):
- [x] **Nome do app = FlowPilot** (13/11/2026). Básico → Nome de exibição agora é
      "FlowPilot"; na API do Instagram, "Sincronizar nome do app" deixou
      **"FlowPilot - IG"** (a Meta põe o sufixo sozinha). A tela de consentimento já
      mostra "FlowPilot - IG".
- [x] Ícone (13/11/2026): o antigo (`appiconmeta1024.png`) não abria nem no recorte
      da Meta ("Couldn't load the image"). Removido e trocado por
      `brand/flowpilot-icon-1024.png` (degradê do FlowPilot com a seta branca; o recorte
      da Meta pegou o quadrado de dentro, sem a moldura). Salvo em Básico.
      Obs.: no Chrome usado, as imagens dos servidores da Meta não carregavam (ícone e
      posts do Instagram ficavam cinza); conferir o ícone em outro navegador ou no celular.
      Obs. 2: o `app/favicon.png` tem um defeito na ponta da seta (o caminho SVG do logo
      fecha no ponto errado); o ícone novo foi desenhado sem esse defeito.
- [ ] Testar a `/demo` no ar com uma conta real (feed e story) antes de gravar.
- [ ] Antes de gravar: Instagram e Chrome em **inglês** (pedido do feedback de 11/09)
      e Instagram deslogado no navegador, para o login completo aparecer no vídeo.
- [ ] No vídeo, o post principal é de **feed** (story não tem legenda para comparar) e
      termina com o post aberto no Instagram, imagem e legenda legíveis.
- [ ] Regravar o vídeo com o roteiro novo (`roteiro-video.md`, versão 3).
- [ ] Reescrever o campo de uso com o texto novo (mesmo arquivo).

### Se recusar de novo
Ler o motivo no painel (o e-mail não traz). Se for 1.6 outra vez, o próximo passo
é abrir um ticket no Suporte para Desenvolvedores citando o Media ID publicado
na demo e pedindo revisão humana.
