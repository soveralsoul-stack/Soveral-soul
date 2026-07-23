# FlowPilot

**O piloto dos seus posts.** Agenda e publica conteúdo no Instagram do cliente,
de forma automática, nos horários definidos. Feed, stories, carrossel e reels.

Produto da **Soveral Soul** (Chapecó/SC). Domínio: **flowpilot.app.br**.

Esta pasta é **autocontida**: não depende de nada fora dela. Dá para extrair para um
repositório próprio quando quiser (ver "Extrair para repo próprio" abaixo).

## Estrutura

```
flowpilot/
├── app/        Aplicação (Vercel, serverless) — o que vai pro ar
│   ├── api/          OAuth (conectar IG), publish (cron), admin/ui (painel),
│   │                 health, recent, privacidade
│   ├── clients/      Clientes estáticos (JSON) + doc de onboarding
│   ├── fonts/        Fontes servidas pela landing
│   ├── index.html    Landing (flowpilot.app.br)
│   ├── og.png · favicon.png
│   ├── ig.js · lib.js · oauth.js   Helpers (Graph API, Upstash, OAuth)
│   └── vercel.json · package.json
├── brand/      Identidade visual
│   ├── assets.html        Gerador dos assets (ícone, perfil, favicon, wordmark)
│   ├── flowpilot-logo.html Board de conceito da logo
│   └── og.html            Fonte da imagem de compartilhamento
├── factory/    Fábrica de artes data-driven (arte a partir de JSON)
│   ├── imovel.html · generate.js · render.js · render-brands.js
│   ├── listings*.json · brands.json
│   └── nichos/            Templates por nicho
├── content/    Voz da marca
│   ├── GUIA-DE-VOZ.md      Regras de escrita (sem travessão, etc.)
│   └── caption-prompt.md   Prompt de legendas
├── docs/       App Review (Meta)
│   ├── CHECKLIST.md · roteiro-video.md · dominio-flowpilot.md
│   └── privacidade.html
├── sales/      Comercial
│   ├── prospecto.html · abordagem-whatsapp.md · plano-semanal.md
└── assets/     Compartilhado (fontes + imagens usadas por brand/factory)
    ├── fonts/  (Bebas Neue, Space Grotesk)
    └── nicho/  (fotos de exemplo)
```

## A aplicação (app/)

App serverless (Vercel). Publica na conta do cliente via **Instagram Graph API**
(`graph.instagram.com`), com token de longa duração obtido por **OAuth** (Instagram Login).
Multi-cliente: clientes estáticos em `app/clients/*.json` e dinâmicos no Upstash.

Endpoints principais:
- `GET /` — landing
- `GET /privacidade` — política de privacidade
- `GET /api/connect?client=<id>` — "Conectar Instagram" (OAuth)
- `GET /api/admin/ui?client=<id>&key=SECRET` — painel (marca/mídia/agenda)
- `GET /api/publish?client=<id>&key=SECRET` — publica os itens no horário (cron)
- `GET /api/health` · `GET /api/recent` — diagnóstico

### Deploy (Vercel)
O app está em **`flowpilot/app`**. No projeto do Vercel, defina:

> **Settings → General → Root Directory = `flowpilot/app`**

(Antes ficava em `vercel-publisher/`; ao mover para cá, é só atualizar essa config.)
Variáveis de ambiente e segredos ficam no Vercel/Upstash, nunca no repositório.

## Marca (brand/) e Fábrica (factory/)
São ferramentas de bastidor (rodam local via headless Chromium para gerar PNGs).
Referenciam fontes/imagens de `assets/`, então funcionam de dentro desta pasta sem
depender do projeto de vídeo.

## App Review (docs/)
Passo a passo para liberar publicação na conta de qualquer cliente (Acesso Avançado
ao `instagram_business_content_publish`): `docs/CHECKLIST.md` e `docs/roteiro-video.md`.

## Extrair para repositório próprio (futuro)
Como a pasta é autocontida, dá para separar assim:

```bash
# opção simples: copiar a pasta e iniciar um repo novo
cp -r flowpilot ../flowpilot-standalone && cd ../flowpilot-standalone && git init

# opção com histórico: git subtree split
git subtree split --prefix=flowpilot -b flowpilot-only
```

Depois é só criar o repositório no GitHub e apontar o Root Directory do Vercel
para a raiz (`app`) do novo repo.
