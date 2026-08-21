# Apontar flowpilot.app.br → Vercel (e ajustar a Meta)

Domínio comprado: **flowpilot.app.br** (Registro.br). Objetivo: o produto inteiro
(Conectar, publicar, política) responder em `flowpilot.app.br`, em vez de `*.vercel.app`.
Isso deixa o App Review mais forte (domínio próprio e coerente).

## 1. Adicionar o domínio no Vercel
1. No projeto **soveral-soul-tve4** (o que está no ar) → **Settings > Domains**.
2. **Add** `flowpilot.app.br` e também `www.flowpilot.app.br` (opcional).
3. O Vercel mostra os registros DNS a criar. Anote o que ele pedir (costuma ser):
   - **A** para a raiz `flowpilot.app.br` → `76.76.21.21`
   - (ou) **CNAME** `www` → `cname.vercel-dns.com`
   > Use exatamente os valores que o Vercel exibir na sua tela — eles mandam.

## 2. Criar os registros no Registro.br
1. Entre em **registro.br** → seus domínios → **flowpilot.app.br** → **Editar DNS / DNS**.
2. Se estiver usando o DNS do próprio Registro.br, adicione os registros que o Vercel pediu
   (o **A** na raiz e/ou o **CNAME** do www). Salve.
3. Propaga em minutos a algumas horas. No Vercel, o domínio fica **Valid/Verified** e o
   **HTTPS** é emitido automaticamente.

> Alternativa: apontar os *nameservers* do domínio para o Vercel/Cloudflare. Não é
> obrigatório — criar os registros A/CNAME no Registro.br já resolve.

## 3. Endereços finais (depois de apontar)
- Conectar Instagram: `https://flowpilot.app.br/api/connect?client=<id>`
- Painel do cliente:   `https://flowpilot.app.br/api/admin/ui?client=<id>&key=SECRET`
- Publicar (cron):     `https://flowpilot.app.br/api/publish?client=<id>&key=SECRET`
- Política:            `https://flowpilot.app.br/privacidade`
- Saúde / recentes:    `https://flowpilot.app.br/api/health` · `/api/recent`

## 4. Ajustar na Meta (App Settings)
Com o domínio no ar, troque para o domínio próprio:
- **App Domains:** `flowpilot.app.br`
- **Privacy Policy URL:** `https://flowpilot.app.br/privacidade`
- **Data Deletion:** a mesma política cobre (ou URL de instruções de exclusão).
- **Valid OAuth Redirect URIs** (Instagram Login): inclua
  `https://flowpilot.app.br/api/oauth/callback`
  > O `oauth.js` monta o redirect a partir do host da requisição, então ao acessar
  > por `flowpilot.app.br` o callback já sai com esse domínio. Só garanta que a URI
  > acima esteja na lista de permitidas no painel da Meta.

## 5. Hospedar a política de privacidade
Duas opções:
- **Simples:** publique `docs/app-review/privacidade.html` como
  `https://flowpilot.app.br/privacidade` (uma rota estática/página no Vercel).
- **Rápido agora:** se quiser, dá pra servir por uma função `api/privacidade.js` que
  devolve o HTML — me avisa que eu crio.

## Observação
- `.app.br` é domínio Registro.br (BR), **não** o `.app` global — não há exigência de
  HSTS-preload. O HTTPS vem do Vercel de qualquer forma.
- O e-mail de exclusão de dados segue `comercial@soveralsoul.com.br` (da empresa Soveral Soul).
