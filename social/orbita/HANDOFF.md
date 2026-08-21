# SOVERALSOUL — KIT DE HANDOFF (Instagram / FlowPilot)

Data do pacote: 27/07/2026
Origem: sessão Cowork (Claude) de criação de conteúdo SoveralSoul
Destino: nova sessão (Claude Code) com pipeline próprio de postagem automática no Instagram (sem Windsor)

Este documento é a fonte única de verdade do que foi construído. Uma nova sessão que ler este arquivo consegue continuar o trabalho sem nenhum outro contexto.

> **Antes de qualquer coisa, leia `BAIXAR-PRIMEIRO.md`.** Os 8 slides finais do carrossel da ed. 01 estão numa URL externa (a sessão de origem não alcançava a CDN). São dois comandos para trazer, e o gerador completo está em `scripts/orbita-ed01-gerador.sh` caso precise regerar.

---

## 1. O negócio e o perfil

- Marca: SoveralSoul IA & Automação (Chapecó/SC)
- Instagram: @soveralsoul (business account id Meta: 17841452861747596)
- Site: www.soveralsoul.com.br
- Oferta: agentes de IA, automação, atendimento 24h no WhatsApp, diagnóstico grátis (link na bio)
- Voz: especialista que demonstra domínio sem se autoproclamar; traduz notícia técnica em impacto de negócio

## 2. Identidade visual (tokens da marca)

Fundo: gradiente `#14273F -> #0A1422` (radial `#1D3A5C` no topo). Texto branco `#FFFFFF`, texto suave `#AFC2D4` / `#CBD8E4`, corpo `#E2EAF2`. Destaque ciano `#5BC1D4`. CTA teal `#57B8C7` com texto `#0C1B2B`. Alerta âmbar `#D9A85C`.

Tipografia: Big Shoulders Display 700 para manchetes em CAIXA ALTA (nos templates: fontes locais em `/root/.claude/skills/canvas-design/canvas-fonts/BigShoulders-Bold.ttf`; em outro ambiente, usar Google Fonts). Corpo: Instrument Sans (Regular/Bold).

Componentes recorrentes: logo `SOVERAL<b>SOUL</b>` + subtítulo "SERVIÇOS DE IA" (letter-spacing largo), constelação SVG de pontos e linhas, círculos de check ciano, rodapé `WWW.SOVERALSOUL.COM.BR`, numeração de página `NN/NN` com número em ciano.

### Framework Sol, Terra e Lua (metáfora central do perfil)
- SOL = máxima capacidade (orbe dourado, radial `#F0D49A -> #D9A85C -> #9A6D30`) — análises, propostas, negociação
- TERRA = equilíbrio (orbe teal `#9BD4E0 -> #4FA8C0 -> #1F5B7A`) — qualificação, atendimento com critério
- LUA = rapidez e economia (orbe cinza `#F0EEE8 -> #C2BFB6 -> #8F8C82`) — respostas em escala, custo mínimo
- ALERTA = âmbar `#D9A85C` (notícias de risco/segurança)

### Regras editoriais permanentes (ordem do Gestor)
1. PROIBIDO travessão (—) e separadores de IA no texto. Pontuação natural sempre.
2. Toda notícia tem selo CONFIRMADO ou RUMOR e fonte citada no card.
3. Máximo 5 notícias por edição do Órbita.
4. Todo card de notícia termina com o bloco fixo "O QUE MUDA PRA VOCÊ".
5. Uma notícia de segurança/risco por edição quando houver.

## 3. Mapa do kit

```
templates/   slides.html (carrossel v1 creme, superado)
             slides2.html (carrossel Sol/Terra/Lua, creme, superado no visual)
             stories.html (stories v1 creme, superado)
             stories2.html (10 stories ANIMADOS na marca atual  <- TEMPLATE PRINCIPAL DE VIDEO)
             cta-foto.html (slide 8 do Órbita + story CTA com foto do estúdio  <- TEMPLATE PRINCIPAL COM FOTO)
scripts/     render.py / render2.py (screenshot estático 1080x1350 via Playwright)
             render_stories.py / render_stories2.py (vídeo frame a frame  <- PIPELINE DE VIDEO)
assets/      feed-v1/ e feed-sol-terra-lua/ (carrosséis finais JPG + legendas)
             orbita-ed01/ (slide 8 com foto, story CTA, preview em grade dos 8 slides)
             fotos/ (estudio.jpg 640px, estudio-hd.jpg 1400px tratada, selfie1/2)
videos/      stories-v1-creme/ (10 mp4, superados)
             stories-v2-marca/ (10 mp4 FINAIS, 1080x1920, 9s, sem áudio  <- USAR ESTES)
docs/        orbita-da-semana-ed01.md (conceito da série + copy completa da ed. 01 + legenda)
             cronograma-stories.md (agenda de 5 dias, 2 stories/dia 12h e 19h, sugestão de sticker)
             flowpilot-modulo-respostas.md (conceito do módulo de respostas automáticas)
             philosophy.md (filosofia de design da 1a fase, referência histórica)
```

## 4. Pipelines técnicos (como reproduzir)

### 4.1 Arte estática (feed 1080x1350, story 1080x1920)
HTML + CSS com tamanhos fixos em px -> Playwright abre o arquivo -> screenshot de cada `section` -> JPEG q90. Ver `scripts/render.py`.

### 4.2 Vídeo motion graphics sem ferramenta de vídeo (o truque principal)
Animações 100% em CSS dentro de `stories2.html` (cada story é uma section, selecionada por `?s={n}`). O script:
1. abre a página no Playwright;
2. pausa tudo: `document.getAnimations().forEach(a => a.pause())`;
3. para cada frame t (FPS=30, DUR=9.0s): `a.currentTime = t*1000` em todas as animações e tira screenshot JPEG;
4. monta com ffmpeg: `libx264, yuv420p, crf 18, fps 30`.
Determinístico, sem drift. Ver `scripts/render_stories2.py`. Sem áudio de propósito: o Gestor adiciona música no app do Instagram.

Pegadinha de CSS já paga: em `inset:auto` combinado com `top/left`, o `inset:auto` precisa vir ANTES na declaração, senão anula os offsets.

### 4.3 Artes da Órbita ed. 01 com fundos de IA (workaround de rede)
O sandbox local bloqueia cloudfront.net (CDN do Higgsfield e do Instagram). A composição da ed. 01 foi feita DENTRO do sandbox remoto do Higgsfield (`sandbox_exec`): gerar HTML lá, rodar Playwright lá (`PLAYWRIGHT_BROWSERS_PATH=/ms-playwright`), zipar e subir via `media_upload` + curl PUT + `media_confirm`, que devolve URL pública permanente. Numa sessão Claude Code com internet aberta isso deixa de ser necessário: basta baixar as URLs abaixo diretamente.

## 5. URLs externas permanentes (baixar na nova sessão)

- **Slides finais Órbita ed. 01 (orbita-ed01-01.jpg ... orbita-ed01-08.jpg), ZIP:**
  https://d2ol7oe51mr4n9.cloudfront.net/user_34wqR7VP2yv4QwBRaAM80pGVH4g/aae6ea09-cbe1-4d0a-a138-b9196fb686d9.zip
- **Capa da ed. 01 já hospedada (pronta para postar via URL pública, JPEG 4:5):**
  https://d2ol7oe51mr4n9.cloudfront.net/user_34wqR7VP2yv4QwBRaAM80pGVH4g/b5d854c5-44d8-4abc-8473-a427eae353b3.jpg
Estes arquivos NÃO estão no kit porque o sandbox de origem não alcançava a CDN. O preview visual dos 8 slides está em `assets/orbita-ed01/orbita-preview-2x.png`.

Se as URLs acima expirarem, os slides são regeráveis integralmente: `scripts/orbita-ed01-gerador.sh` é o gerador completo e autocontido (baixa os 7 fundos de IA, monta o HTML com a copy exata dos 8 slides e renderiza em 1080x1350 via Playwright). Instruções passo a passo em `BAIXAR-PRIMEIRO.md`.

## 6. Estado da publicação (o que falta postar)

### Órbita da Semana ed. 01 (estreia aprovada pelo Gestor, "sobe mesmo fora do horário")
- Carrossel de 8 slides: baixar do ZIP acima e publicar no feed com a legenda completa que está em `docs/orbita-da-semana-ed01.md` (seção "Legenda do post").
- Bloqueio na sessão anterior: a publicação ia sair via Windsor (`execute_action` / instagram `create_image_post`, só aceita 1 imagem, sem carrossel) e falhou com "Write actions are disabled" (ativa em https://onboard.windsor.ai/app/team-management). **Na nova sessão Claude Code o pipeline próprio de postagem substitui o Windsor e permite carrossel de verdade. Preferir o pipeline próprio.**
- Stories da ed. 01: story CTA com foto (`assets/orbita-ed01/orbita-ed01-story-cta-foto.jpg`) tem caixa teal VAZIA em y=860px, altura 340px: é o espaço reservado para o sticker de link do diagnóstico.

### Stories Sol/Terra/Lua (10 vídeos v2)
- Publicar 2 por dia, 12h e 19h, na ordem 01..10, seguindo `docs/cronograma-stories.md` (tem sugestão de sticker por story).
- Story 10 tem banner teal vazio: reservado para sticker de link.
- Vídeos sem áudio de propósito (música é adicionada no app).

## 7. Automação semanal já agendada (fica NESTA conta Claude, segue valendo)

Ciclo: SEXTA apuração de notícias -> SÁBADO montagem conjunta -> DOMINGO publicação.
- `trig_01PJ1u7ZAGDbgka39mKzTr1Z`: sexta 12:00 UTC (9h BRT), apuração automática da semana com regras editoriais embutidas (próxima: 31/07)
- `trig_01FMf5ivnz7RPa2yTHMtAerY`: sábado 13:00 UTC (10h BRT), lembrete de montagem (próxima: 01/08)
Essas tarefas agendadas rodam em sessões novas do Cowork, não dependem desta sessão. Se a nova sessão Claude Code assumir TODO o ciclo, avisar para desativar as duas.

## 8. FlowPilot (produto)

`docs/flowpilot-modulo-respostas.md` descreve o módulo de respostas automáticas estilo ManyChat sobre a arquitetura do agente WhatsApp existente: Gatilhos, Condições, Ações e Fluxos; 4 diferenciais (automação nasce junto do post, intenção via Lua em vez de keyword, roteamento Sol/Terra/Lua, funil que termina no WhatsApp); regras da Meta 2026; MVP em 4 fases. Fase 1 = caso ÓRBITA: comentário com palavra-chave -> private reply com link do diagnóstico. O CTA "COMENTA ÓRBITA" dos posts já foi desenhado para alimentar esse fluxo.

## 9. Checklist de arranque na nova sessão

1. Descompactar o kit e ler este arquivo.
2. Baixar o ZIP da ed. 01 (URL na seção 5) para ter os 8 slides finais.
3. Publicar a ed. 01 (carrossel + legenda) pelo pipeline próprio de postagem.
4. Programar os stories conforme `docs/cronograma-stories.md`.
5. Para novas edições do Órbita: reaproveitar `templates/cta-foto.html` e o padrão visual da seção 2; respeitar as regras editoriais da seção 2 (sem travessão, selos, "O QUE MUDA PRA VOCÊ").
