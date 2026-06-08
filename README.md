# Soveral Soul — Vídeo de Marca (30s)

Vídeo de marca produzido em **Remotion** (React → MP4), com render **100% local**,
frame-accurate e controle total de texto/logo. Sem dependência de cloud/cloudfront.

## Por que Remotion
- **Pixel-perfect**: tipografia e logo controlados por código, não por editor visual.
- **Identidade por tokens**: cores, fontes e tamanhos vivem em `src/brand/tokens.ts`
  (única fonte de verdade). Trocar lá propaga para todas as cenas.
- **Render local**: o `@remotion/renderer` traz o próprio ffmpeg embutido — não
  precisa de ffmpeg no sistema, nem de rede no momento do render.

## Estrutura
```
src/
  brand/tokens.ts        → identidade da marca (cores, fontes, specs)  ← EDITAR
  data/script.ts         → roteiro convertido em cenas/frames          ← EDITAR
  components/
    Stage.tsx            → fundo de palco compartilhado
    AnimatedText.tsx     → entrada de texto reutilizável
    scenes/              → uma cena por arquivo
  SoveralSoul.tsx        → monta o roteiro em Sequences (timeline)
  Root.tsx               → registra a composição (30s, 1080x1080, 30fps)
```

## Comandos
```bash
npm install          # instala dependências (Node 18+)
npm run dev          # abre o Remotion Studio (preview ao vivo no browser)
npm run typecheck    # checa tipos
npm run build        # renderiza out/soveral-soul.mp4
npm run build:still  # exporta um frame único (PNG) para conferência rápida
```

## Como personalizar
1. **Cores/fontes/specs reais** → `src/brand/tokens.ts`.
   - Formato (feed 1:1 / reels 9:16 / wide 16:9) é definido em `video.width/height`.
2. **Copys e tempos de cada cena** → `src/data/script.ts` (em segundos; o código
   converte para frames automaticamente).
3. **Fonte oficial da marca** → use `@remotion/google-fonts` em `src/Root.tsx` e
   troque os nomes em `tokens.fonts`.

> Os textos e a paleta atuais são **placeholders elegantes**. Substitua pelos
> valores reais do handoff + roteiro.
