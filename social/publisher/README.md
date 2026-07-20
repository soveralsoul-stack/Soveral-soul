# Agendador de postagens — Instagram (Graph API)

Publica a programação da semana **automaticamente** via API oficial do Instagram.
Importante: a Graph API **não agenda** post orgânico — ela publica na hora. Então
este agendador roda por **cron** (a cada 10 min) e publica o que está no horário.

> ⚠️ Rode isto **na sua máquina/servidor** (não no ambiente efêmero do Claude).
> O container do Claude é temporário e não guarda seu token nem roda cron 24/7.

## Pré-requisitos (uma vez)
1. **Instagram Business ou Creator** ligado a uma **Página do Facebook**.
2. Um **App no Meta for Developers** com os produtos *Instagram Graph API* e as
   permissões: `instagram_basic`, `instagram_content_publish`, `pages_show_list`,
   `business_management`.
3. **Token de longa duração** (60 dias, renovável) do usuário/sistema com acesso à Página.
4. **IG_USER_ID** — o id numérico da conta IG Business
   (`GET /me/accounts` → pega a Página → `GET /{page-id}?fields=instagram_business_account`).
5. **Mídias em URL pública** — as imagens (JPEG) e vídeos (MP4 H.264/AAC) precisam
   estar acessíveis por URL. Suba a pasta `../publish-media/` (+ os vídeos) para um
   host público (seu site, S3, Cloudinary, etc.) e aponte `MEDIA_BASE_URL` para ela.

## Configuração
```bash
cd social/publisher
cp .env.example .env      # preencha IG_USER_ID, IG_ACCESS_TOKEN, MEDIA_BASE_URL
node --env-file=.env run-due.js --dry   # simula (não publica) — confere as URLs
```

## Publicar automaticamente (cron)
Agende o runner a cada 10 minutos. Ele só publica o que está dentro da janela
(`windowHours`) e ainda não foi publicado na semana (controle em `state.json`).
```cron
*/10 * * * * cd /caminho/para/social/publisher && node --env-file=.env run-due.js >> publisher.log 2>&1
```

## O que será publicado (schedule.json)
| Dia | Hora | Tipo | Mídia |
|-----|------|------|-------|
| Seg | 09:00 | Carrossel | carousel-1..4.jpg |
| Seg | 19:00 | Story | story-ia85.mp4 |
| Ter | 12:00 | Reels | reel-marca-9x16.mp4 |
| Qua | 09:00 | Feed | card-atendimento.jpg |
| Qua | 19:00 | Story | story-atendimento.mp4 |
| Qui | 09:00 | Feed | card-eventos.jpg |
| Qui | 19:00 | Story | story-eventos.mp4 |
| Sex | 17:00 | Feed (CTA) | carousel-4.jpg |

Horários no fuso `timezoneOffsetHours` (padrão −3, Chapecó/SP). Edite dias, horas,
mídias e legendas em `schedule.json`. Para a semana seguinte, atualize os textos/mídias
— o `state.json` é por semana ISO, então não duplica dentro da mesma semana.

## Limitações honestas
- **Stories via API**: suportado para conta Business, mas alguns recursos (stickers,
  link nativo) não são definíveis por API. Publica o vídeo como story normal.
- **Limite**: até 25 publicações por 24h por conta.
- **Vídeos**: processamento é assíncrono; o runner aguarda ficar `FINISHED` antes de publicar.
- **Token**: expira em ~60 dias; renove e atualize o `.env`.
