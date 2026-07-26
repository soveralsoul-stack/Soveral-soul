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
> 1. Open the connect page: https://flowpilot.app.br/api/connect?client=demo
> 2. Click "Conectar Instagram" and log in with the test account provided below.
> 3. On the consent screen, grant the "Publish content" permission.
> 4. The app then publishes a scheduled post to that account (see the demo video).
> 5. The published post appears on the account's Instagram profile.
>
> Test IG account: <usuário> / <senha>   (conta profissional de teste)
> App base URL: https://flowpilot.app.br

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
