#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gera os 8 slides da Órbita da Semana ed. 01 (1080x1350).
Diferença para o gerador original: os fundos de IA ficaram numa CDN inacessível,
então cada slide usa um fundo gerado em CSS/SVG dentro da identidade da marca
(gradiente + constelação + orbe Sol/Terra/Lua/Alerta). Copy e layout idênticos.
"""
import io, os

CSS = """
@font-face{font-family:'BS';src:url('fonts/BigShoulders-Bold.ttf') format('truetype');font-weight:700}
@font-face{font-family:'IS';src:url('fonts/InstrumentSans-Regular.ttf') format('truetype');font-weight:400}
@font-face{font-family:'IS';src:url('fonts/InstrumentSans-Bold.ttf') format('truetype');font-weight:700}
*{margin:0;padding:0;box-sizing:border-box}body{background:#000}
.s{position:relative;width:1080px;height:1350px;overflow:hidden;font-family:'IS';color:#fff;
   background:radial-gradient(120% 80% at 50% 0%,#1D3A5C,#14273F 45%,#0A1422)}
.bg{position:absolute;inset:0;overflow:hidden}
.sc{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,20,34,.92),rgba(10,20,34,.55) 38%,rgba(10,20,34,.30) 66%,rgba(10,20,34,.92))}
.tp{position:absolute;top:60px;left:70px;right:70px;display:flex;justify-content:space-between;z-index:5}
.l1{font-family:'BS';font-size:36px;letter-spacing:.05em;font-weight:700}
.l1 b{color:#5BC1D4}.l2{margin-top:6px;font-size:15px;letter-spacing:.4em;color:#AFC2D4;font-weight:700}
.pn{font-family:'BS';font-weight:700;font-size:32px;color:#AFC2D4}.pn b{color:#5BC1D4}
.bg2{display:flex;gap:14px;margin-bottom:28px}
.b1{font-size:17px;font-weight:700;letter-spacing:.18em;border-radius:40px;padding:11px 22px 9px;background:#5BC1D4;color:#0C1B2B}
.b2{font-size:17px;font-weight:700;letter-spacing:.18em;border-radius:40px;padding:11px 22px 9px;border:2px solid #5BC1D4;color:#5BC1D4}
.b2.a{border-color:#D9A85C;color:#D9A85C}.b1.a{background:#D9A85C}
h1{font-family:'BS';font-weight:700;font-size:84px;line-height:1.02;text-transform:uppercase}
h1 span{color:#5BC1D4}h1 span.a{color:#D9A85C}
.bo{margin-top:22px;font-size:29px;line-height:1.5;color:#D7E1EA;max-width:920px}.bo b{color:#fff}
.hd{position:absolute;left:70px;right:70px;top:200px;z-index:5}
.md{position:absolute;left:70px;right:70px;bottom:168px;z-index:5;background:rgba(10,20,34,.88);
    border:1.5px solid rgba(91,193,212,.5);border-left:10px solid #5BC1D4;border-radius:18px;padding:28px 32px}
.md.a{border-color:rgba(217,168,92,.55);border-left-color:#D9A85C}
.md .c{font-size:16px;font-weight:700;letter-spacing:.24em;color:#5BC1D4;margin-bottom:10px}.md.a .c{color:#D9A85C}
.md p{font-size:28px;line-height:1.45}
.sr{position:absolute;left:70px;bottom:104px;z-index:5;font-size:18px;letter-spacing:.14em;color:#AFC2D4;font-weight:700}
.as{position:absolute;right:70px;bottom:96px;z-index:5;display:flex;align-items:center;gap:12px;
    font-family:'BS';font-weight:700;font-size:30px;letter-spacing:.14em}
.as i{width:30px;height:30px;border-radius:50%}
.so{background:radial-gradient(circle at 35% 30%,#F0D49A,#D9A85C 60%,#9A6D30)}
.te{background:radial-gradient(circle at 35% 30%,#9BD4E0,#4FA8C0 60%,#1F5B7A)}
.lu{background:radial-gradient(circle at 35% 30%,#F0EEE8,#C2BFB6 60%,#8F8C82)}
.al{background:#D9A85C}
.ur{position:absolute;left:0;right:0;bottom:42px;text-align:center;z-index:5;font-size:18px;letter-spacing:.2em;color:#5BC1D4;font-weight:700}
.r7{display:flex;gap:24px;margin-bottom:34px}
.r7 b{flex:none;font-family:'BS';font-size:44px;color:#5BC1D4;width:56px;font-weight:700}
.r7 p{font-size:34px;line-height:1.4;color:#D7E1EA;font-weight:700;padding-top:4px}
.fx{position:absolute;left:70px;right:70px;top:560px;z-index:5}
.fim{margin-top:16px;font-size:32px;line-height:1.45;color:#5BC1D4;font-weight:700}
.cb{position:absolute;left:70px;right:70px;bottom:180px;background:#57B8C7;border-radius:26px;
    padding:46px 50px;text-align:center;color:#0C1B2B;z-index:5}
.cb b{font-family:'BS';font-weight:700;font-size:84px;line-height:1;display:block}
.cb p{margin-top:14px;font-size:30px;font-weight:700}
/* orbe grande de fundo (substitui a foto de IA) */
.orb{position:absolute;border-radius:50%;filter:blur(2px)}
.glow{position:absolute;border-radius:50%;filter:blur(90px);opacity:.55}
.grid{position:absolute;inset:0;opacity:.10;
  background-image:linear-gradient(#5BC1D4 1px,transparent 1px),linear-gradient(90deg,#5BC1D4 1px,transparent 1px);
  background-size:90px 90px;
  -webkit-mask-image:radial-gradient(closest-side at 50% 55%,#000 30%,transparent 85%)}
.wave{position:absolute;left:0;right:0;bottom:330px;height:420px;opacity:.5}
"""

STARS = """<svg class=bg style="z-index:1" width=1080 height=1350>
<g fill="#CBD8E4">%s</g>
<g stroke="#5BC1D4" stroke-width="1" opacity=".35">%s</g></svg>"""


def stars():
    import random
    random.seed(7)
    pts = [(random.randint(20, 1060), random.randint(20, 1330)) for _ in range(70)]
    dots = "".join(
        f'<circle cx="{x}" cy="{y}" r="{1.4 if i % 3 else 2.4}" opacity="{.25 + (i % 5) * .12:.2f}"/>'
        for i, (x, y) in enumerate(pts))
    lines = "".join(
        f'<line x1="{pts[i][0]}" y1="{pts[i][1]}" x2="{pts[i+1][0]}" y2="{pts[i+1][1]}"/>'
        for i in range(0, 14, 2))
    return STARS % (dots, lines)


def orb(kind, size, top, left):
    grads = {
        "SOL": "radial-gradient(circle at 34% 30%,#F7E6BE,#D9A85C 55%,#8A5F27 100%)",
        "TERRA": "radial-gradient(circle at 34% 30%,#BFE6EE,#4FA8C0 55%,#1B4C66 100%)",
        "LUA": "radial-gradient(circle at 34% 30%,#F6F4EE,#C2BFB6 55%,#7E7B72 100%)",
        "ALERTA": "radial-gradient(circle at 34% 30%,#F3D9A8,#D9A85C 55%,#8A5F27 100%)",
    }
    halo = {"SOL": "#D9A85C", "TERRA": "#4FA8C0", "LUA": "#C2BFB6", "ALERTA": "#D9A85C"}[kind]
    return (f'<div class=glow style="width:{size*1.5:.0f}px;height:{size*1.5:.0f}px;'
            f'top:{top-size*.25:.0f}px;left:{left-size*.25:.0f}px;background:{halo}"></div>'
            f'<div class=orb style="width:{size}px;height:{size}px;top:{top}px;left:{left}px;'
            f'background:{grads[kind]};box-shadow:0 0 90px rgba(0,0,0,.45) inset"></div>')


def waves(color="#5BC1D4"):
    import math
    paths = []
    for k in range(7):
        pts = []
        for x in range(0, 1081, 20):
            y = 210 + k * 22 + math.sin(x / 150 + k * .7) * (46 - k * 4) + math.sin(x / 47) * 7
            pts.append(f"{x},{y:.1f}")
        paths.append(f'<polyline fill="none" stroke="{color}" stroke-width="2" '
                     f'opacity="{.5 - k*.05:.2f}" points="{" ".join(pts)}"/>')
    return f'<svg class=wave viewBox="0 0 1080 420">{"".join(paths)}</svg>'


def top(pg):
    return ("<div class=tp><div><div class=l1>SOVERAL<b>SOUL</b></div>"
            "<div class=l2>SERVIÇOS DE IA</div></div>"
            f"<div class=pn><b>{pg}</b>/08</div></div>")


def bgfor(kind, variant=0):
    """Fundo da marca: grade + estrelas + orbe do arquétipo."""
    layout = [(520, 620, 560), (470, 700, -60), (600, 560, 640), (430, 740, 120)][variant % 4]
    size, t, l = layout
    inner = '<div class=grid></div>' + stars()
    if kind == "VOZ":
        inner += waves()
    else:
        inner += orb(kind, size, t, l)
    return f'<div class=bg style="z-index:0">{inner}</div><div class=sc></div>'


def news(bgkind, variant, pg, d, t, bo, mud, src, an, amb=0):
    a = " a" if amb else ""
    ic = {"SOL": "so", "TERRA": "te", "LUA": "lu", "ALERTA": "al"}[an]
    return ("<section class=s>" + bgfor(bgkind, variant) + top(pg) +
            f"<div class=hd><div class=bg2><span class='b1{a}'>{d}</span>"
            f"<span class='b2{a}'>CONFIRMADO</span></div><h1>{t}</h1>"
            f"<div class=bo>{bo}</div></div>"
            f"<div class='md{a}'><div class=c>O QUE MUDA PRA VOCÊ</div><p>{mud}</p></div>"
            f"<div class=sr>FONTE: {src}</div>"
            f"<div class=as><i class={ic}></i>{an}</div>"
            "<div class=ur>WWW.SOVERALSOUL.COM.BR</div></section>")


o = [f"<!doctype html><meta charset=utf-8><style>{CSS}</style>"]

# 01 capa
o.append("<section class=s>" + bgfor("SOL", 1) + top("ED. 01") +
         "<div class=hd><div class=bg2><span class=b2>ÓRBITA DA SEMANA</span></div>"
         "<h1>A semana em que a IA de ponta ficou <span>pela metade do preço</span></h1>"
         "<div class=bo>5 notícias que mexem com o seu negócio, "
         "<b>traduzidas em 60 segundos</b>.</div></div>"
         "<div class=sr>20 A 26 DE JULHO</div><div class=as>DESLIZE</div>"
         "<div class=ur>WWW.SOVERALSOUL.COM.BR</div></section>")

# 02..06 notícias
o.append(news("SOL", 0, "02", "24/07",
              "Anthropic lança o Opus 5 <span>pela metade do preço</span>",
              "US$ 5 por milhão de tokens de entrada e US$ 25 na saída. "
              "<b>Inteligência de fronteira deixou de ser luxo.</b>",
              "Aquele agente de IA caro demais para análises e propostas acabou de caber no seu orçamento.",
              "ANTHROPIC.COM", "SOL"))
o.append(news("VOZ", 0, "03", "23/07",
              "Voz agora executa tarefas, <span>e fala português</span>",
              "O modo de voz do Claude ganhou acesso a Gmail, Agenda, Slack, Canva e Notion "
              "em dez idiomas, incluindo o nosso.",
              "A voz virou interface de trabalho. Quem estrutura as integrações agora sai na frente.",
              "TECHCRUNCH", "TERRA"))
o.append(news("LUA", 2, "04", "21/07",
              "Google lança três modelos rápidos <span>e segura o mais potente</span>",
              "Gemini 3.6 Flash, 3.5 Flash-Lite e 3.5 Flash Cyber chegaram. O 3.5 Pro ficou de fora, "
              "oficialmente em teste com parceiros.",
              "A guerra agora é nos modelos leves e baratos, os que rodam atendimento em escala. "
              "Volume nunca custou tão pouco.",
              "BLOG.GOOGLE", "LUA"))
o.append(news("TERRA", 3, "05", "22/07",
              "OpenAI entra oficialmente no <span>atendimento ao cliente</span>",
              "A plataforma Presence cria e gerencia agentes de voz e chat corporativos. "
              "BBVA, SoftBank e IAG já aparecem como pilotos.",
              "Se bancos estão colocando IA para atender, o cliente vai esperar esse padrão de "
              "todo mundo. Inclusive do seu negócio.",
              "OPENAI.COM", "TERRA"))
o.append(news("ALERTA", 1, "06", "21/07",
              'Modelos da OpenAI <span class=a>escaparam do sandbox</span> em teste',
              "No benchmark ExploitGym, modelos exploraram uma falha zero-day e executaram código "
              "em servidores da Hugging Face.",
              "Agente sem limite definido é risco, não inovação. Autonomia se implanta com trilhos, "
              "permissões e supervisão.",
              "OPENAI.COM", "ALERTA", 1))

# 07 resumo
o.append("<section class=s>" + bgfor("TERRA", 2) + top("07") +
         "<div class=hd><h1>O resumo <span>da órbita</span></h1></div>"
         "<div class=fx>"
         "<div class=r7><b>1</b><p>A inteligência de ponta ficou 50% mais barata.</p></div>"
         "<div class=r7><b>2</b><p>As gigantes validaram o atendimento por IA.</p></div>"
         "<div class=r7><b>3</b><p>A segurança provou que implantação exige critério.</p></div>"
         "<p class=fim>Nunca foi tão barato colocar IA para trabalhar. E nunca foi tão importante "
         "implantar do jeito certo.</p></div>"
         "<div class=sr>ÓRBITA DA SEMANA ED. 01</div>"
         "<div class=ur>WWW.SOVERALSOUL.COM.BR</div></section>")

# 08 CTA (usa a foto do estúdio, que veio no kit)
o.append("<section class=s>"
         '<div class=bg style="z-index:0">'
         '<img src="estudio-hd.jpg" style="position:absolute;inset:0;width:100%;height:100%;'
         'object-fit:cover;object-position:60% 40%">'
         '</div><div class=sc style="background:linear-gradient(180deg,rgba(10,20,34,.90),'
         'rgba(10,20,34,.60) 40%,rgba(10,20,34,.80))"></div>' + top("08") +
         "<div class=hd><h1>Quer isso rodando <span>no seu negócio?</span></h1>"
         "<div class=bo>A gente monta seu atendimento com IA usando o modelo certo para cada "
         "tarefa, <b>com segurança no centro</b>.</div></div>"
         '<div class=cb><b>COMENTA "ÓRBITA"</b>'
         "<p>Eu te mando o diagnóstico grátis. Link na bio.</p></div>"
         "<div class=ur>WWW.SOVERALSOUL.COM.BR</div></section>")

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ed.html")
with io.open(out, "w", encoding="utf-8") as f:
    f.write("".join(o))
print("ed.html gerado:", out)
