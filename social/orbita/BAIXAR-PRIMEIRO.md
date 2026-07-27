# BAIXAR PRIMEIRO (leia antes de tudo)

Este kit tem TODO o material criado, com uma exceção: os 8 slides finais do carrossel
Órbita da Semana ed. 01 ficaram hospedados numa CDN que a sessão de origem não conseguia
acessar (bloqueio de rede do sandbox). Numa sessão com internet aberta, é um comando.

## Passo 1: baixar os 8 slides finais prontos para subir

```bash
mkdir -p assets/orbita-ed01 && cd assets/orbita-ed01
curl -L -o orbita-ed01.zip "https://d2ol7oe51mr4n9.cloudfront.net/user_34wqR7VP2yv4QwBRaAM80pGVH4g/aae6ea09-cbe1-4d0a-a138-b9196fb686d9.zip"
unzip orbita-ed01.zip
```

Resultado esperado: `orbita-ed01-01.jpg` até `orbita-ed01-08.jpg` (1080x1350, JPEG q90).
Esses são os arquivos finais, prontos para publicar. O preview em grade dos 8 está em
`assets/orbita-ed01/orbita-preview-2x.png`, use para conferir se o download veio certo.

Capa avulsa já hospedada (se precisar postar por URL pública):
https://d2ol7oe51mr4n9.cloudfront.net/user_34wqR7VP2yv4QwBRaAM80pGVH4g/b5d854c5-44d8-4abc-8473-a427eae353b3.jpg

## Passo 2 (só se o link acima expirar): regerar do zero

Está tudo em `scripts/orbita-ed01-gerador.sh`. É um script único e autocontido que:

1. baixa as 7 imagens de fundo geradas por IA (nano banana) da CDN do Higgsfield;
2. escreve `gen.py`, que monta o `ed.html` com o CSS da marca e a copy exata dos 8 slides;
3. escreve `r.js`, que abre o HTML no Playwright e tira screenshot de cada `<section class=s>`
   em 1080x1350, salvando `orbita-ed01-01.jpg` ... `orbita-ed01-08.jpg` em JPEG q90.

Como rodar:

```bash
npm i playwright && npx playwright install chromium
bash scripts/orbita-ed01-gerador.sh
```

Duas adaptações possíveis conforme o ambiente:

- **Fontes.** O script usa `@import` do Google Fonts (Big Shoulders Display 700 +
  Instrument Sans 400/600/700). Se não houver internet para fontes, troque o `@import` por
  `@font-face` apontando para arquivos locais. No ambiente Claude Code padrão elas ficam em
  `/root/.claude/skills/canvas-design/canvas-fonts/BigShoulders-Bold.ttf`,
  `InstrumentSans-Regular.ttf` e `InstrumentSans-Bold.ttf`.
- **Caminho do HTML.** O `r.js` abre `file:///home/user/work/ed.html`. Ajuste para o
  diretório real onde o script rodou.

## Passo 3: publicar

Carrossel de 8 slides no feed, com a legenda completa que está em
`docs/orbita-da-semana-ed01.md`, seção "Legenda do post". Publicar pelo pipeline próprio
da sessão (não pelo Windsor: as ações de escrita estão desativadas na conta e o conector
só aceita imagem única, sem carrossel).

Depois disso, seguir `docs/cronograma-stories.md` para os 10 stories em vídeo, que já estão
prontos em `videos/stories-v2-marca/`.
