# OAuth do Instagram — configuração (evitar "redirect_uri mismatch")

O app monta o `redirect_uri` assim (em `app/oauth.js`):
1. se existir a env **`OAUTH_REDIRECT_URI`**, usa ela (fixa);
2. senão, deriva do host da requisição → `https://<host>/api/oauth/callback`.

O `authorize` e a troca de código usam **o mesmo** valor, então batem entre si.
O que causa "redirect_uri mismatch" é o `redirect_uri` **não estar cadastrado** na
lista de permitidos do app na Meta, ou o fluxo rodar num host diferente do cadastrado.

## Recomendado: fixar o domínio canônico
Assim todo fluxo usa uma única URL (a do domínio próprio), independente de o usuário
ter entrado por `www`, apex, ou uma URL de preview do Vercel.

**Vercel → Settings → Environment Variables:**
```
OAUTH_REDIRECT_URI = https://www.flowpilot.app.br/api/oauth/callback
```
(Defina para Production. Ao mudar env, faça um redeploy.)

## Meta → app → Instagram → Business login settings
Em **Valid OAuth Redirect URIs**, cadastre (pode ter mais de uma):
```
https://flowpilot.app.br/api/oauth/callback
https://www.flowpilot.app.br/api/oauth/callback
https://soveral-soul-tve4.vercel.app/api/oauth/callback
```
- A 1ª é a canônica (a que o `OAUTH_REDIRECT_URI` fixa).
- A 3ª ajuda a **testar antes do DNS propagar** (fluxo pela URL do Vercel).
- A do `www` só é necessária se você for usar `www`.

## Variáveis de ambiente necessárias (Vercel)
| Env | Para quê |
|---|---|
| `INSTAGRAM_APP_ID` | client_id do OAuth (start/authorize) |
| `INSTAGRAM_APP_SECRET` | troca de código e token longo |
| `OAUTH_REDIRECT_URI` | fixa o callback canônico (recomendado) |
| `PUBLISH_SECRET` | protege `/api/publish`, `/api/health`, admin |
| `IG_ACCESS_TOKEN` | token da @soveralsoul (fallback do cliente estático) |
| `UPSTASH_REDIS_REST_URL` / `..._TOKEN` | dedup + tokens/clientes dinâmicos |
| `GRAPH_BASE` (opcional) | default `https://graph.instagram.com` |

## Teste rápido (quando o revisor for reproduzir)
1. Abrir `https://flowpilot.app.br/api/connect?client=<slug>`.
2. "Conectar Instagram" → login → **conceder** `instagram_business_content_publish`.
3. Callback mostra "Instagram conectado · @conta". Token longo guardado no Upstash.
- Se der mismatch: confira se a URL da barra (host) tem callback cadastrado na Meta,
  ou fixe `OAUTH_REDIRECT_URI` como acima.
