# Como adicionar um cliente (onboarding)

O sistema é multi-cliente e isolado (agenda, marca, conta IG e token próprios).
Há dois jeitos: **self-service (recomendado)** e **estático (via arquivo)**.

## A) Self-service (via OAuth + admin) — sem deploy
Fluxo para onboardar um cliente novo (ex.: `labela`), sem tocar em código:

1. **Cliente conecta o Instagram:** envie a ele o link
   ```
   https://SEU-APP.vercel.app/api/connect?client=labela
   ```
   Ele clica em "Conectar Instagram" e autoriza. O sistema:
   - guarda o **token de longa duração** no Upstash (`igtoken:client:labela`);
   - cria o **registro do cliente** capturando o `igUserId` e `@username` automaticamente.

2. **Você preenche marca/mídia/agenda** (uma vez) no **painel** — formulário, sem JSON:
   ```
   https://SEU-APP.vercel.app/api/admin/ui?key=SECRET&client=labela
   ```
   Cola a chave, preenche os campos (dados, marca, agenda com adicionar/remover posts) e salva.
   (Por baixo ele usa a API `POST /api/admin/client`; para automações dá pra chamar direto com o
   mesmo body `{ name, mediaBaseUrl, timezoneOffsetHours, windowHours, brand:{...}, schedule:[...] }`.
   Ver o registro cru: `GET /api/admin/client?key=SECRET&client=labela`.)

3. **Mídias públicas** do cliente hospedadas em `mediaBaseUrl`.

4. **Cron do cliente:**
   ```
   https://SEU-APP.vercel.app/api/publish?key=SECRET&client=labela
   ```

Pronto. Nenhum arquivo editado, nenhum deploy.

## B) Estático (via arquivo no repo)
Para clientes "fixos" (ex.: o próprio `soveralsoul`): crie `clients/<id>.json`,
registre em `clients/index.js`, e ponha o token na env `tokenEnv`. (Detalhe do modelo:
ver `soveralsoul.json`.)

## Verificar um cliente
- Saúde/token: `/api/health?key=SECRET&client=labela`
- O que está no ar: `/api/recent?key=SECRET&client=labela`
- Publicar 1 item de teste: `/api/publish?key=SECRET&client=labela&id=<id>`

## Notas
- Antes do **App Review**, o IG do cliente precisa ser **testador do app**.
- O token vem primeiro do OAuth (Upstash); se não houver, cai no env `tokenEnv`.
- Dedup é por cliente (`ig:<cliente>:<semana>:<id>`), sem interferência entre contas.
- Segredos (tokens) nunca ficam no repositório.
