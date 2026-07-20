# Como adicionar um cliente novo (multi-tenant)

O sistema é multi-cliente. Cada cliente é isolado: agenda, marca, conta IG e token
próprios. O **@soveralsoul** é o cliente #1 (referência).

## Passos para onboarding de um cliente (ex.: `labela`)

1. **Criar `clients/labela.json`** (copie o `soveralsoul.json` e ajuste). NÃO coloque
   o token aqui — só o **nome** da env var em `tokenEnv`:
   ```json
   {
     "id": "labela",
     "name": "Labela",
     "igUserId": "178414XXXXXXXXXXX",
     "tokenEnv": "IG_TOKEN_LABELA",
     "mediaBaseUrl": "https://.../labela/posts",
     "timezoneOffsetHours": -3,
     "windowHours": 6,
     "brand": { "accent": "#...", "cta": "#...", "handle": "@labela", "city": "..." },
     "schedule": [ /* posts da semana */ ]
   }
   ```

2. **Registrar em `clients/index.js`:**
   ```js
   labela: require("./labela.json"),
   ```

3. **Token do cliente na Vercel** → Settings → Environment Variables:
   - `IG_TOKEN_LABELA` = token de longa duração da conta da Labela.
   - Redeploy.

4. **Mídias públicas do cliente** → hospedar as artes em `mediaBaseUrl`
   (site do cliente, um bucket, ou uma subpasta sua).

5. **IG do cliente** precisa estar como **tester do app** (fase dev) ou o app já
   aprovado no **App Review** (produção).

6. **Cron do cliente** → apontar um cron para:
   ```
   https://SEU-APP.vercel.app/api/publish?key=SEU_SECRET&client=labela
   ```

## Verificar um cliente
- Saúde/token: `/api/health?key=SECRET&client=labela`
- O que está no ar: `/api/recent?key=SECRET&client=labela`
- Publicar 1 item de teste: `/api/publish?key=SECRET&client=labela&id=<id>`

## Notas
- Sem `&client=`, usa o cliente padrão (`DEFAULT_CLIENT`, ou `soveralsoul`).
- O dedup (Upstash) é **por cliente** (`ig:<cliente>:<semana>:<id>`), então um cliente
  nunca interfere no outro.
- Segredos (tokens) **nunca** entram no repositório — só em env vars da Vercel.
