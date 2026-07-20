# Plano de conteúdo — Semana (SoveralSoul Business Hub)

**Tema-âncora:** IA & Automação no marketing — posicionar a SoveralSoul como *a operação por trás do crescimento*.
**Base:** notícias do resumo matinal (14/07). **CTA de venda padrão:** "Saia dos 85%. Chame no WhatsApp."

| Dia | Formato | Tema / Gancho | Fonte | CTA |
|-----|---------|---------------|-------|-----|
| **Seg** | Carrossel (4:5) + Stories | **"O dado da semana": 85% sem estratégia formal de IA** — o gargalo é a operação. *(este post — pronto)* | Supermetrics · 14/07 | Saia dos 85% → WhatsApp |
| **Ter** | Reels 9:16 (vídeo) + Feed | **Bastidores / autoridade** — case eXata Imobiliária (reuso do vídeo de marca) | Portfólio próprio | "Quer um evento assim? Chama." |
| **Qua** | Carrossel (4:5) | **Agentes de IA no atendimento** — o que a onda PwC+OpenAI significa pra PMEs (atendimento que não dorme) | AI Agent Store | "Vamos automatizar seu atendimento" |
| **Qui** | Card 1:1 + Stories | **Evento presencial → contato no CRM** (cobertura de dados >97%) — conecta Produção de Eventos + automação | Popl × Apollo.io · 14/07 | "Seu próximo evento pode gerar leads" |
| **Sex** | Card 1:1 (CTA) + Stories | **Oferta/conversão:** "Saia dos 85%" — estruture marketing + IA com a SoveralSoul | — | WhatsApp / link na bio |

## Racional
- **Seg (dado)** abre a semana com autoridade e retenção (número forte + carrossel educativo).
- **Ter (prova)** mostra entrega real — quebra objeção de "vocês fazem mesmo?".
- **Qua/Qui (educativo)** mantêm o tema quente e reforçam serviços (automação, eventos).
- **Sex (oferta)** capitaliza a audiência aquecida com o CTA de venda.

## Como reaproveitar o template (bater 1 card por semana)
Os arquivos em `social/` são o kit reutilizável:
- `brand.css` — cores/fontes/componentes da marca (não precisa mexer).
- `card.html` — card único; formato via `?f=feed` (4:5), `?f=square` (1:1) ou `?f=story` (9:16).
- `carousel.html` — carrossel de 4 slides.
- `render.js` — gera todos os PNGs em `out/`.

**Para o "dado da semana" seguinte**, edite só os textos em `card.html`/`carousel.html`:
1. o número (`.stat` → ex.: `72%`),
2. a frase de apoio (`.sub`),
3. o destaque secundário (`.note`) e a **fonte/data**.

Depois rode:
```bash
node social/render.js
```
Saídas: `out/card-feed-4x5.png`, `out/card-square-1x1.png`, `out/card-story-9x16.png`, `out/carousel-1..4.png`.

> Dica: mantenha sempre a estrutura **número grande → frase → destaque → fonte → CTA**. É o que dá consistência de marca e escaneabilidade no feed.
