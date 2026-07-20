# Agendador de Instagram na Vercel (sem servidor, sem cPanel-shell)

Publica a programação da semana via API oficial do Instagram, rodando como
**função serverless na Vercel**. As mídias continuam servidas pelo seu site
(`soveralsoul.com.br/posts`) — só o "robô" que publica é que mudou de casa.

```
vercel-publisher/
  api/publish.js   → endpoint que publica o que está na hora (e ?id= para teste)
  api/health.js    → checa se o token/conta estão ok
  ig.js            → chamadas à Graph API do Instagram
  schedule.json    → a programação da semana (dias, horas, legendas, mídias)
```

## 1) Deploy na Vercel (5 min)
1. Acesse **vercel.com** → login com o **GitHub**.
2. **Add New → Project** → importe o repositório `soveralsoul-stack/Soveral-soul`.
3. Em **Root Directory**, selecione **`vercel-publisher`** (importante!).
4. Framework Preset: **Other**. Clique **Deploy**.

## 2) Variáveis de ambiente (Vercel → Settings → Environment Variables)
Adicione (Production):
| Nome | Valor |
|------|-------|
| `IG_USER_ID` | `17841452861747596` |
| `IG_ACCESS_TOKEN` | seu token de longa duração |
| `MEDIA_BASE_URL` | `https://soveralsoul.com.br/posts` |
| `PUBLISH_SECRET` | invente uma senha aleatória (ex.: 32 caracteres) |
| `WINDOW_MINUTES` | `15` (opcional; ver dedup abaixo) |

Depois de adicionar, faça **Redeploy** (Deployments → ⋯ → Redeploy) para as
variáveis valerem.

## 3) Testar (sem cron ainda)
No navegador (troque `SUA-APP` e `SEU_SECRET`):
- **Saúde/token:** `https://SUA-APP.vercel.app/api/health?key=SEU_SECRET`
  → deve mostrar `@soveralsoul`, `account_type`, `id_confere: true`.
- **Publicar 1 Story de teste:** `https://SUA-APP.vercel.app/api/publish?key=SEU_SECRET&id=seg-story-85`
  → publica o Story dos "85%" (some em 24h). Veja o JSON de resposta e o Instagram.
- **Simular sem publicar:** acrescente `&dry=1`.

## 4) Ligar o automático — cron externo grátis
1. Crie conta grátis em **cron-job.org** (ou EasyCron).
2. **Create cronjob**:
   - **URL:** `https://SUA-APP.vercel.app/api/publish?key=SEU_SECRET`
   - **Schedule:** a cada **15 minutos** (`*/15 * * * *`).
   - Método GET. Salve e ative.
3. Pronto — a cada 15 min ele "cutuca" a função, que publica o que estiver na
   janela de horário (o `schedule.json` decide o quê e quando).

> **Tem Vercel Pro?** Aí pode dispensar o cron externo: crie um `vercel.json`
> com `{ "crons": [ { "path": "/api/publish", "schedule": "*/15 * * * *" } ] }`
> e defina `CRON_SECRET` = mesmo valor do `PUBLISH_SECRET`. (No plano grátis o
> cron nativo só roda 1x/dia — por isso usamos o externo.)

## 5) Evitar posts duplicados (recomendado, grátis)
Como a função roda a cada 15 min, vale garantir que cada post saia **uma vez só**:
1. Na Vercel → **Storage → Marketplace → Upstash (Redis)** → crie um banco grátis
   e conecte ao projeto (injeta `UPSTASH_REDIS_REST_URL` e `_TOKEN` automaticamente).
2. Redeploy. Pronto: a função passa a marcar cada post publicado na semana e não repete.
   - Com dedup ativo, pode aumentar `WINDOW_MINUTES` (ex.: `180`) sem risco.
   - **Sem** dedup, mantenha `WINDOW_MINUTES=15` (uma janela por ping).

## Manutenção
- **Token (~60 dias):** quando renovar na Meta, atualize `IG_ACCESS_TOKEN` na Vercel e Redeploy.
- **Próxima semana:** edite `vercel-publisher/schedule.json` (dias, horas, legendas,
  mídias) e faça commit — a Vercel redeploya sozinha.
- **Mídias:** continuam no cPanel em `public_html/posts/` (arquivo estático — o que
  funciona bem lá). Para trocar uma peça, suba o novo arquivo lá e ajuste o nome no schedule.
