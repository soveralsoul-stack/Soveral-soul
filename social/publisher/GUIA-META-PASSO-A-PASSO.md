# Guia passo a passo — Publicar no Instagram pela API (SoveralSoul)

Objetivo: deixar o agendador (`run-due.js`) publicando sozinho. Você vai obter
3 coisas: **IG_USER_ID**, **IG_ACCESS_TOKEN** (longa duração) e **MEDIA_BASE_URL**.

> 💡 Dica-chave: como você vai publicar na **sua própria conta**, e será **admin do
> app**, dá pra usar tudo com o app em **modo de Desenvolvimento** — sem passar por
> App Review. Isso economiza semanas de burocracia.

---

## PARTE 1 — Contas (5 min)
1. No app do Instagram: **Configurações → Conta → Mudar para conta profissional →
   Comercial (Business)**.
2. Vincule o Instagram a uma **Página do Facebook** (crie uma se não tiver):
   no IG, **Editar perfil → Página → conectar/criar Página**.
   *(A Página pode ser simples; ela é só a "ponte" exigida pela API.)*

## PARTE 2 — Criar o App no Meta (10 min)
3. Acesse **developers.facebook.com** → **Get Started** (login com o Facebook que
   administra a Página) → aceite os termos.
4. **My Apps → Create App**.
   - Caso peça "Use case", escolha **Other → Business**.
   - Nome do app: `SoveralSoul Publisher` (qualquer nome). Crie.
5. No painel do app, adicione o produto **Instagram** (ou "Instagram Graph API")
   → **Set up**.
6. Anote em **App settings → Basic**: o **App ID** e o **App Secret** (clique em Show).

## PARTE 3 — Token + IG_USER_ID (15 min)

> 🟢 **Fluxo NOVO (Instagram API com login do Instagram) — foi o usado aqui:**
> - O token gerado pelo botão **já é de longa duração (~60 dias)** → **pule** a
>   troca `oauth/access_token?grant_type=fb_exchange_token` (aquilo é do fluxo clássico).
> - A base da API é **`graph.instagram.com`** (já é o padrão do `ig.js`; nada a fazer).
> - IG_USER_ID: `GET https://graph.instagram.com/me?fields=user_id,username`.
> - Renovar depois: volte na tela e gere de novo, **ou** chame
>   `GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TOKEN`.
>
> O passo a passo abaixo com o Graph API Explorer é do **fluxo clássico (Facebook Login)** —
> use só se tiver ido por esse caminho (aí defina `GRAPH_BASE=https://graph.facebook.com` no `.env`).

Vamos usar o **Graph API Explorer**: developers.facebook.com/tools/explorer

7. No topo direito do Explorer, selecione o seu app (`SoveralSoul Publisher`).
8. Clique em **Add a Permission** e marque:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_show_list`
   - `pages_read_engagement`
   - `business_management`
9. Clique em **Generate Access Token** → faça login/autorize → escolha a **Página**
   e o **Instagram** da SoveralSoul quando perguntar. Isso gera um **token curto**.
10. **Descubra a Página e o IG_USER_ID.** No campo de consulta do Explorer, rode:
    ```
    GET  me/accounts
    ```
    → copie o `id` da sua Página (campo `id`). Depois rode (troque `PAGE_ID`):
    ```
    GET  PAGE_ID?fields=instagram_business_account
    ```
    → o `instagram_business_account.id` é o seu **IG_USER_ID**. ✅

11. **Troque o token curto por um de longa duração (60 dias).** No navegador, abra
    (troque APP_ID, APP_SECRET e TOKEN_CURTO):
    ```
    https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=TOKEN_CURTO
    ```
    → a resposta traz `access_token`: esse é o seu **IG_ACCESS_TOKEN**. ✅

12. **Garanta o modo Desenvolvimento + seu papel no app.** Em **App Roles → Roles**,
    confirme que você é **Administrator**. Com o app em *Development*, as permissões
    avançadas funcionam pra você (dono/admin) sem App Review.

## PARTE 4 — Hospedar as mídias (5 min)
13. Suba a pasta `social/publish-media/` (as 7 imagens .jpg + os 3 stories .mp4 +
    o reel .mp4) para um lugar **público**. Opções:
    - **Seu site**: crie `soveralsoul.com.br/posts/` e jogue os arquivos lá.
    - Ou **Cloudinary / AWS S3 / Bunny** (todos têm plano grátis).
    Teste abrindo no navegador: `https://SEU_HOST/posts/carousel-1.jpg` tem que
    baixar/abrir a imagem. Esse `https://SEU_HOST/posts` é o **MEDIA_BASE_URL**.

## PARTE 5 — Ligar o agendador (5 min)
14. Na sua máquina/servidor (precisa de Node 18+):
    ```bash
    cd social/publisher
    cp .env.example .env
    ```
    Edite o `.env`:
    ```
    IG_USER_ID=coloque_o_id_do_passo_10
    IG_ACCESS_TOKEN=coloque_o_token_do_passo_11
    MEDIA_BASE_URL=https://SEU_HOST/posts
    ```
15. **Simule** (não publica):
    ```bash
    node --env-file=.env run-due.js --dry
    ```
    Confira se as URLs das mídias estão certas.
16. **Ative o cron** (publica sozinho a semana toda):
    ```cron
    */10 * * * * cd /CAMINHO/social/publisher && node --env-file=.env run-due.js >> publisher.log 2>&1
    ```
    *(No Windows, use o Agendador de Tarefas chamando `node --env-file=.env run-due.js`.)*

## PARTE 6 — Manutenção
- O token dura **~60 dias**. Antes de expirar, repita o passo 11 e atualize o `.env`.
- Para a **próxima semana**, edite textos/mídias no `schedule.json` (o controle é por
  semana ISO, então não duplica dentro da mesma semana).
- Limite da API: **25 publicações / 24h** por conta.

## Se algo der erro
- `(#10) Application does not have permission` → falta uma permissão do passo 8, ou
  você não é admin do app (passo 12).
- `Media ... not found / not accessible` → a URL não está pública (passo 13).
- Story/Reels demora → é normal: vídeo processa antes de publicar (o runner espera).
