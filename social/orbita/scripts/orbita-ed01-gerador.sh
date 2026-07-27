mkdir -p work && cd work && B="https://d8j0ntlcm91z4.cloudfront.net/user_34wqR7VP2yv4QwBRaAM80pGVH4g" && for x in "capa 122816_d585e0f5-b0bd-4039-a7b1-2b4eb10fcc2b" "sol 122825_4beb8429-b094-4e6d-babb-0f41dbb90d72" "voz 122829_8c248d5f-40f8-4453-83c5-b9387c15afce" "flash 122837_75f33e6b-97eb-494e-8d12-0152446532f1" "presence 122840_2fdc0514-fbbe-4ae4-8bb2-c0165c214057" "alerta 122842_9919030f-ec4a-40e0-bee5-bfcc48d4cd46" "cta 122850_9e1b1694-4579-4ed9-beea-8c74e070f82c"; do set -- $x; curl -s -o $1.png "$B/hf_20260726_$2.png" & done; wait; cat > gen.py <<'PY'
H='''<!doctype html><meta charset=utf-8><style>
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700&family=Instrument+Sans:wght@400;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}body{background:#000}
.s{position:relative;width:1080px;height:1350px;overflow:hidden;font-family:'Instrument Sans';color:#fff;background:linear-gradient(160deg,#14273F,#0A1422)}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.sc{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,20,34,.95),rgba(10,20,34,.66) 38%,rgba(10,20,34,.18) 66%,rgba(10,20,34,.85))}
.tp{position:absolute;top:60px;left:70px;right:70px;display:flex;justify-content:space-between;z-index:5}
.l1{font-family:'Big Shoulders Display';font-size:36px;letter-spacing:.05em;font-weight:700}
.l1 b{color:#5BC1D4}.l2{margin-top:6px;font-size:15px;letter-spacing:.4em;color:#AFC2D4;font-weight:700}
.pn{font-family:'Big Shoulders Display';font-weight:700;font-size:32px;color:#AFC2D4}.pn b{color:#5BC1D4}
.bg2{display:flex;gap:14px;margin-bottom:28px}
.b1{font-size:17px;font-weight:700;letter-spacing:.18em;border-radius:40px;padding:11px 22px 9px;background:#5BC1D4;color:#0C1B2B}
.b2{font-size:17px;font-weight:700;letter-spacing:.18em;border-radius:40px;padding:11px 22px 9px;border:2px solid #5BC1D4;color:#5BC1D4}
.b2.a{border-color:#D9A85C;color:#D9A85C}.b1.a{background:#D9A85C}
h1{font-family:'Big Shoulders Display';font-weight:700;font-size:84px;line-height:1.02;text-transform:uppercase}
h1 span{color:#5BC1D4}h1 span.a{color:#D9A85C}
.bo{margin-top:22px;font-size:29px;line-height:1.5;color:#D7E1EA;max-width:920px}.bo b{color:#fff}
.hd{position:absolute;left:70px;right:70px;top:200px;z-index:5}
.md{position:absolute;left:70px;right:70px;bottom:168px;z-index:5;background:rgba(10,20,34,.78);border:1.5px solid rgba(91,193,212,.5);border-left:10px solid #5BC1D4;border-radius:18px;padding:28px 32px}
.md.a{border-color:rgba(217,168,92,.55);border-left-color:#D9A85C}
.md .c{font-size:16px;font-weight:700;letter-spacing:.24em;color:#5BC1D4;margin-bottom:10px}.md.a .c{color:#D9A85C}
.md p{font-size:28px;line-height:1.45}
.sr{position:absolute;left:70px;bottom:104px;z-index:5;font-size:18px;letter-spacing:.14em;color:#AFC2D4;font-weight:600}
.as{position:absolute;right:70px;bottom:96px;z-index:5;display:flex;align-items:center;gap:12px;font-family:'Big Shoulders Display';font-weight:700;font-size:30px;letter-spacing:.14em}
.as i{width:30px;height:30px;border-radius:50%}
.so{background:radial-gradient(circle at 35% 30%,#F0D49A,#D9A85C 60%,#9A6D30)}
.te{background:radial-gradient(circle at 35% 30%,#9BD4E0,#4FA8C0 60%,#1F5B7A)}
.lu{background:radial-gradient(circle at 35% 30%,#F0EEE8,#C2BFB6 60%,#8F8C82)}
.al{background:#D9A85C}
.ur{position:absolute;left:0;right:0;bottom:42px;text-align:center;z-index:5;font-size:18px;letter-spacing:.2em;color:#5BC1D4;font-weight:700}
.r7{display:flex;gap:24px;margin-bottom:34px}
.r7 b{flex:none;font-family:'Big Shoulders Display';font-size:44px;color:#5BC1D4;width:56px;font-weight:700}
.r7 p{font-size:34px;line-height:1.4;color:#D7E1EA;font-weight:600;padding-top:4px}
.fx{position:absolute;left:70px;right:70px;top:560px;z-index:5}
.fim{margin-top:16px;font-size:32px;line-height:1.45;color:#5BC1D4;font-weight:700}
.cb{position:absolute;left:70px;right:70px;bottom:180px;background:#57B8C7;border-radius:26px;padding:46px 50px;text-align:center;color:#0C1B2B;z-index:5}
.cb b{font-family:'Big Shoulders Display';font-weight:700;font-size:84px;line-height:1;display:block}
.cb p{margin-top:14px;font-size:30px;font-weight:700}
</style>'''
def top(pg):return "<div class=tp><div><div class=l1>SOVERAL<b>SOUL</b></div><div class=l2>SERVIÇOS DE IA</div></div><div class=pn><b>"+pg+"</b>/08</div></div>"
def news(img,pg,d,t,bo,mud,src,an,amb=0):
 a=' a' if amb else '';ic={'SOL':'so','TERRA':'te','LUA':'lu','ALERTA':'al'}[an]
 return "<section class=s><img class=bg src="+img+".png><div class=sc></div>"+top(pg)+"<div class=hd><div class=bg2><span class='b1"+a+"'>"+d+"</span><span class='b2"+a+"'>CONFIRMADO</span></div><h1>"+t+"</h1><div class=bo>"+bo+"</div></div><div class='md"+a+"'><div class=c>O QUE MUDA PRA VOCÊ</div><p>"+mud+"</p></div><div class=sr>FONTE: "+src+"</div><div class=as><i class="+ic+"></i>"+an+"</div><div class=ur>WWW.SOVERALSOUL.COM.BR</div></section>"
o=[H]
o.append("<section class=s><img class=bg src=capa.png><div class=sc></div>"+top("ED. 01")+"<div class=hd><div class=bg2><span class=b2>ÓRBITA DA SEMANA</span></div><h1>A semana em que a IA de ponta ficou <span>pela metade do preço</span></h1><div class=bo>5 notícias que mexem com o seu negócio, <b>traduzidas em 60 segundos</b>.</div></div><div class=sr>20 A 26 DE JULHO</div><div class=as>DESLIZE</div><div class=ur>WWW.SOVERALSOUL.COM.BR</div></section>")
o.append(news('sol','02','24/07','Anthropic lança o Opus 5 <span>pela metade do preço</span>','US$ 5 por milhão de tokens de entrada e US$ 25 na saída. <b>Inteligência de fronteira deixou de ser luxo.</b>','Aquele agente de IA caro demais para análises e propostas acabou de caber no seu orçamento.','ANTHROPIC.COM','SOL'))
o.append(news('voz','03','23/07','Voz agora executa tarefas, <span>e fala português</span>','O modo de voz do Claude ganhou acesso a Gmail, Agenda, Slack, Canva e Notion em dez idiomas, incluindo o nosso.','A voz virou interface de trabalho. Quem estrutura as integrações agora sai na frente.','TECHCRUNCH','TERRA'))
o.append(news('flash','04','21/07','Google lança três modelos rápidos <span>e segura o mais potente</span>','Gemini 3.6 Flash, 3.5 Flash-Lite e 3.5 Flash Cyber chegaram. O 3.5 Pro ficou de fora, oficialmente em teste com parceiros.','A guerra agora é nos modelos leves e baratos, os que rodam atendimento em escala. Volume nunca custou tão pouco.','BLOG.GOOGLE','LUA'))
o.append(news('presence','05','22/07','OpenAI entra oficialmente no <span>atendimento ao cliente</span>','A plataforma Presence cria e gerencia agentes de voz e chat corporativos. BBVA, SoftBank e IAG já aparecem como pilotos.','Se bancos estão colocando IA para atender, o cliente vai esperar esse padrão de todo mundo. Inclusive do seu negócio.','OPENAI.COM','TERRA'))
o.append(news('alerta','06','21/07','Modelos da OpenAI <span class=a>escaparam do sandbox</span> em teste','No benchmark ExploitGym, modelos exploraram uma falha zero-day e executaram código em servidores da Hugging Face.','Agente sem limite definido é risco, não inovação. Autonomia se implanta com trilhos, permissões e supervisão.','OPENAI.COM','ALERTA',1))
o.append("<section class=s>"+top("07")+"<div class=hd><h1>O resumo <span>da órbita</span></h1></div><div class=fx><div class=r7><b>1</b><p>A inteligência de ponta ficou 50% mais barata.</p></div><div class=r7><b>2</b><p>As gigantes validaram o atendimento por IA.</p></div><div class=r7><b>3</b><p>A segurança provou que implantação exige critério.</p></div><p class=fim>Nunca foi tão barato colocar IA para trabalhar. E nunca foi tão importante implantar do jeito certo.</p></div><div class=sr>ÓRBITA DA SEMANA ED. 01</div><div class=ur>WWW.SOVERALSOUL.COM.BR</div></section>")
o.append("<section class=s><img class=bg src=cta.png><div class=sc></div>"+top("08")+"<div class=hd><h1>Quer isso rodando <span>no seu negócio?</span></h1><div class=bo>A gente monta seu atendimento com IA usando o modelo certo para cada tarefa, <b>com segurança no centro</b>.</div></div><div class=cb><b>COMENTA \"ÓRBITA\"</b><p>Eu te mando o diagnóstico grátis. Link na bio.</p></div><div class=ur>WWW.SOVERALSOUL.COM.BR</div></section>")
open('ed.html','w').write(''.join(o))
PY
python3 gen.py && cat > r.js <<'RJ'
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.goto('file:///home/user/work/ed.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(2500);
const els=await p.locator('section.s').all();let i=1;
for(const e of els){await e.scrollIntoViewIfNeeded();await e.screenshot({path:'orbita-ed01-0'+i+'.jpg',type:'jpeg',quality:90});i++}
await b.close();})().catch(e=>{console.error(e);process.exit(1)});
RJ
echo SETUP_OK; ls *.png | wc -l