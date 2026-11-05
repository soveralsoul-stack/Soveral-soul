# Roteiro de gravação — vídeo do App Review (FlowPilot)

A Meta exige um screencast curto mostrando **a permissão `instagram_business_content_publish`
sendo usada de ponta a ponta**. Este é o item que mais reprova submissão, então siga o
script sem cortes que "pulem" a autorização ou a publicação.

- **Produto:** FlowPilot · **Empresa/CNPJ:** Soveral Soul (é o negócio que faz a
  Verificação de Negócio e hospeda a política de privacidade).
- **Duração alvo:** 90–120 s. **Uma tomada contínua por etapa.**
- **Idioma:** a narração falada é **opcional** (pode ser em português, ou vídeo mudo);
  o que precisa estar **em inglês** são as **legendas na tela** (uma por cena, na edição) —
  o revisor costuma ser internacional e avalia o que vê. Os textos PT + EN estão no
  checklist `gravacao.html`.
- **Grave a tela com o cursor visível** e mostre a **barra de URL** nos momentos-chave.

---

## Versão 3 (3ª submissão) — demo com compositor

> As duas primeiras versões mostravam uma agenda pronta e um cartão de teste nosso.
> Esta mostra o usuário **criando o próprio post** e o FlowPilot publicando. É o que
> separa um app de agendamento de "uso desnecessário" (1.6).

**Antes de gravar:** nome do app no painel = **FlowPilot** (ver `CHECKLIST.md`); se a
conta de teste já estiver conectada, clique em "Disconnect this account" na `/demo` e
revogue em Instagram → Apps e sites, para gravar a conexão limpa. Tenha uma foto
qualquer no computador (do celular serve) e o Instagram da conta aberto noutra aba.

Uma gravação só do Chrome, sem áudio; as legendas EN entram na edição (`src/AppReview.tsx`).

| # | Tela | Legenda (EN) |
|---|------|--------------|
| 1 | `/demo` inicial, URL visível | FlowPilot is a scheduling service for Instagram. The owner connects their Instagram professional account to get started. |
| 2 | Login + consentimento, parado 3 s nas duas permissões, até "Permitir" | Instagram Login: the owner grants basic profile access and content publishing (instagram_business_content_publish). |
| 3 | Volta conectada, agenda vazia | Back in FlowPilot, connected. The schedule is empty: everything FlowPilot publishes is created by the owner. |
| 4 | Feed post → escolhe a foto → preview aparece → escreve a legenda | The owner creates a post: uploads their own image and writes the caption. |
| 5 | Escolhe data/hora (uns 10 min à frente) → Add to schedule → linha "Scheduled" | They pick the date and time. The post goes into their publishing schedule. |
| 6 | Mostra o parágrafo do agendador | A scheduler runs every 15 minutes and publishes each post at its time, through the Instagram Graph API. That is why the app needs the publishing permission. |
| 7 | Clica "Publish now" → "Published" + Media ID | To skip the wait, the owner clicks Publish now. FlowPilot publishes the post and returns the Media ID. |
| 8 | Aba do Instagram → atualiza o perfil → abre o post com a legenda | The post is live on the authorized account, with the image and caption the owner created. |
| 9 | (opcional) Story: mesmo fluxo, formato Story, Publish now, anel no perfil | Stories work the same way. |
| 10 | Instagram → Configurações → Permissões do site → Apps e sites → FlowPilot | Access can be revoked at any time in Instagram settings. Our privacy policy covers data use and deletion. |

**Campo "How your app uses this permission"** (substitui o texto anterior):
> FlowPilot is a social media scheduling service for small businesses. Its core and only
> function is to publish content that the account owner creates in FlowPilot to their
> own Instagram professional account at the time they choose.
>
> How the permission is used: the owner connects their account with Instagram Login. In
> FlowPilot they upload an image, write the caption, choose the format (feed post or story)
> and the date and time. The post is saved in their publishing schedule. A scheduler runs
> every 15 minutes and, when a post's time comes, uses instagram_business_content_publish to
> create the media container and publish it to that account. Without this permission no
> post in the schedule can be published, so the product has no function.
>
> FlowPilot never publishes content the owner did not create or schedule, never publishes
> to an account that did not authorize it, and does not read or modify other content.
>
> How to test (no credentials needed): open https://www.flowpilot.app.br/demo, click
> Connect Instagram and log in with any Instagram professional account you control. Grant
> the permissions. Back in FlowPilot, upload any image, write a caption, keep the suggested
> time and click Add to schedule. Then click Publish now (or wait for the scheduled time)
> and open the account's Instagram profile to see the post. "Disconnect this account"
> removes your schedule and images; access can also be revoked in Instagram settings.

---

> A partir daqui, o roteiro da 1ª versão (referência).

## Antes de gravar (preparação — 10 min)

Deixe tudo aberto e pronto para não travar durante a tomada:

1. **App em modo Live** no painel da Meta, com ícone (o do FlowPilot), nome e e-mail.
2. Uma **conta Instagram de teste** (pode ser a `@soveralsoul`) já **conectável**.
   - Se ainda não estiver conectada, comece o vídeo pela conexão (é o ideal).
   - Se já estiver, **revogue antes** (Instagram > Apps e sites) para gravar a conexão limpa.
3. **Uma arte + legenda prontas** para publicar de verdade (um post real, simples).
   - No `clients/soveralsoul.json`, tenha um item de agenda com um `id` fácil, ex.: `demo`.
4. Duas abas abertas:
   - **Aba A:** `https://flowpilot.app.br/api/connect?client=soveralsoul` (tela Conectar).
   - **Aba B:** o **Instagram** da conta de teste (para mostrar o post no ar).
5. Um app de screen recording (Loom, OBS, ou a gravação nativa do sistema). 1080p.

> Dica: faça um "ensaio" clicando o fluxo uma vez sem gravar, para saber a ordem.

---

## Shot list (cena a cena)

### 1 · Abertura — o que é o app (0:00–0:08)
- **Tela:** a página `/api/connect` (mostra o nome FlowPilot + botão "Conectar Instagram").
- **Deixe a barra de URL visível.**
- **Narração:**
  > "This is FlowPilot, by Soveral Soul. It schedules and publishes Instagram posts
  > on behalf of the account owner, at the times they choose."

### 2 · Autorização + a permissão (0:08–0:40) — **A CENA MAIS IMPORTANTE**
- Clique em **"Conectar Instagram"**. Isso leva ao login/autorização do Instagram.
- **Mostre a tela de login** do Instagram e faça o login da conta de teste.
- **Pare na tela de consentimento** e mostre claramente a permissão sendo concedida:
  **"Publish content" / `instagram_business_content_publish`**.
  - *Não corte aqui.* Deixe a permissão legível por 2–3 segundos.
- Clique em **Permitir/Allow**. Volta para a tela de sucesso ("Instagram conectado · @conta").
- **Narração:**
  > "First, the account owner connects their Instagram and grants the content
  > publishing permission. FlowPilot never posts without this explicit authorization."

### 3 · Publicação real (0:40–1:05)
- Vá para a aba/URL que dispara a publicação de UM item, ao vivo:
  ```
  https://flowpilot.app.br/api/publish?key=SEU_SECRET&client=soveralsoul&id=demo
  ```
  - Mostre a **resposta JSON** com `"ok": true` / o id publicado (prova de que o app publicou).
- **Narração:**
  > "Once connected, FlowPilot creates the media container and publishes the post
  > to the authorized account through the Instagram Graph API."

> Alternativa (se preferir mostrar o produto e não a URL): dispare pelo **painel/cron**
> e mostre o disparo. O essencial é o revisor ver o app **publicando**, não um mock.

### 4 · Prova — o post no ar (1:05–1:20)
- Vá para a **aba B (Instagram)** da conta de teste e **atualize o perfil**.
- **Mostre o post recém-publicado** aparecendo no feed/stories.
- **Narração:**
  > "Here is the post now live on the Instagram profile that authorized the app."

### 5 · Revogação (1:20–1:35)
- Abra **Instagram > Configurações > Apps e sites** (ou Accounts Center > Conexões).
- Mostre onde o FlowPilot aparece e que dá para **remover o acesso**.
- **Narração:**
  > "The user can revoke access at any time in Instagram settings. Our privacy
  > policy explains what data we use and how it is deleted."

---

## Narração completa (copie e leia — inglês)

> This is FlowPilot, by Soveral Soul. It schedules and publishes Instagram posts on
> behalf of the account owner, at the times they choose.
> First, the account owner connects their Instagram and grants the content publishing
> permission. FlowPilot never posts without this explicit authorization.
> Once connected, FlowPilot creates the media container and publishes the post to the
> authorized account through the Instagram Graph API.
> Here is the post now live on the Instagram profile that authorized the app.
> The user can revoke access at any time in Instagram settings. Our privacy policy
> explains what data we use and how it is deleted.

---

## Depois de gravar — o que colar no formulário do Review

**"How your app uses this permission"** (campo do `instagram_business_content_publish`):
> FlowPilot (by Soveral Soul) schedules and publishes content — feed images, carousels,
> stories and reels — to the Instagram Business account of the user who authorized it.
> The user provides the media and captions and defines a posting schedule; FlowPilot
> only publishes on their behalf at those times. The account is connected via the
> Instagram Login (OAuth) consent screen, and the user can revoke access at any time.

**"Steps for the reviewer to reproduce"** (instruções + credenciais de teste):
> 1. Open the connect page: https://www.flowpilot.app.br/api/connect?client=teste
> 2. Click "Conectar Instagram" and log in with the test account provided below.
> 3. On the consent screen, grant the "Publish content" permission.
> 4. The app then publishes a scheduled post to that account (see the demo video).
> 5. The published post appears on the account's Instagram profile.
>
> Test IG account: <usuário> / <senha>   (conta profissional de teste)
> App base URL: https://www.flowpilot.app.br

> ⚠️ Coloque credenciais de teste reais e **descartáveis**, nunca as suas pessoais.
> Não versione senhas neste repositório — preencha direto no formulário da Meta.

---

## Dicas para não reprovar
- Uma tomada contínua por etapa; nada de cortes que escondam a autorização.
- A **permissão exata** precisa aparecer legível na tela de consentimento.
- Use **conta e post reais** (nada de tela falsa/mock).
- Deixe a **URL do app visível** ao autorizar.
- Inclua **passos + credenciais** para o revisor reproduzir.
- App **Live** + **negócio verificado** antes de submeter (ver `CHECKLIST.md`).
