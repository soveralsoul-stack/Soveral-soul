/**
 * Painel de admin (formulário) para preencher a marca/mídia/agenda de um cliente,
 * sem montar JSON na mão. Fala com /api/admin/client (mesmo segredo).
 *
 *   /api/admin/ui?key=SECRET&client=<id>
 *
 * A página carrega o registro atual (GET) e salva as alterações (POST) via fetch.
 * O segredo NÃO fica embutido no HTML: é lido do campo e mandado só nas chamadas.
 */
module.exports = async (req, res) => {
  const client = (req.query && req.query.client) || "";
  res.setHeader("content-type", "text/html; charset=utf-8");
  res.end(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Painel do cliente · PostPilot</title>
<style>
  *{margin:0;box-sizing:border-box} :root{--a1:#4f8cff;--a2:#7c5cff}
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
    background:radial-gradient(120% 60% at 50% 0%,#101528,#06080f);color:#e8eef8;min-height:100vh;padding:28px 18px}
  .wrap{max-width:720px;margin:0 auto}
  h1{font-size:1.5rem;display:flex;align-items:center;gap:12px}
  .mk{width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,var(--a1),var(--a2));
    display:flex;align-items:center;justify-content:center}
  .mk svg{width:20px;height:20px;fill:#fff}
  .sub{color:#8a97c2;margin:6px 0 22px;font-size:.92rem}
  .card{background:rgba(255,255,255,.03);border:1px solid #1a2240;border-radius:14px;padding:20px;margin-bottom:16px}
  .card h2{font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:#7f8fc0;margin-bottom:14px}
  label{display:block;font-size:.82rem;color:#9fb0c9;margin:12px 0 5px}
  input,select,textarea{width:100%;background:#0c1224;border:1px solid #232c4e;border-radius:9px;
    color:#e8eef8;padding:11px 12px;font-size:.95rem;font-family:inherit}
  textarea{resize:vertical;min-height:64px;line-height:1.5}
  .row{display:flex;gap:12px} .row>*{flex:1}
  .btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--a1),var(--a2));
    color:#fff;font-weight:700;border:0;border-radius:10px;padding:14px 22px;font-size:1rem;cursor:pointer}
  .btn:disabled{opacity:.5;cursor:default}
  .ghost{background:none;border:1px dashed #2d3760;color:#9fb0c9;font-weight:600;padding:10px 16px;border-radius:9px;cursor:pointer}
  .sched-item{border:1px solid #232c4e;border-radius:11px;padding:14px;margin-bottom:12px;position:relative}
  .sched-item .del{position:absolute;top:10px;right:10px;background:none;border:0;color:#e0556b;cursor:pointer;font-size:1.1rem}
  .bar{display:flex;gap:12px;align-items:center;margin-top:8px}
  .msg{padding:12px 14px;border-radius:9px;margin-bottom:16px;font-size:.9rem;display:none}
  .msg.ok{background:rgba(45,180,120,.12);border:1px solid #1f6b4a;color:#7ee2b0;display:block}
  .msg.err{background:rgba(224,85,107,.12);border:1px solid #7a2636;color:#f2a3b0;display:block}
  .hint{font-size:.78rem;color:#61728e;margin-top:4px}
  .gate{max-width:420px;margin:8vh auto;text-align:center}
</style></head><body>
<div class="wrap">
  <h1><span class="mk"><svg viewBox="0 0 24 24"><path d="M21.7 2.3a1 1 0 0 0-1.05-.23L2.9 8.36c-.86.32-.8 1.57.09 1.8l6.2 1.6 1.6 6.2c.23.9 1.48.95 1.8.09l6.29-17.7a1 1 0 0 0-.18-1.05zM10.3 12.3l7.3-6.4-5.1 7.9-.9 3.5-1.3-5z"/></svg></span>Painel do cliente</h1>
  <p class="sub">Cliente: <b id="cid">${client || "(defina ?client=)"}</b> · preencha e salve. A conta do Instagram é conectada pelo link de OAuth, não aqui.</p>

  <div id="gate" class="card gate" style="display:none">
    <h2>Acesso</h2>
    <label>Chave de admin (secret)</label>
    <input id="key" type="password" placeholder="cole a chave">
    <div class="bar" style="justify-content:center"><button class="btn" onclick="load()">Entrar</button></div>
    <p class="hint">A chave não é salva no servidor; fica só neste navegador.</p>
  </div>

  <div id="app" style="display:none">
    <div id="msg" class="msg"></div>

    <div class="card">
      <h2>Dados</h2>
      <label>Nome do cliente</label><input id="name" placeholder="Ex.: Labela">
      <label>URL base das mídias (pasta pública com as imagens/vídeos)</label>
      <input id="mediaBaseUrl" placeholder="https://.../posts">
      <p class="hint">Cada item da agenda referencia um arquivo dentro dessa pasta.</p>
      <div class="row">
        <div><label>Fuso (horas UTC)</label><input id="timezoneOffsetHours" type="number" value="-3"></div>
        <div><label>Janela de publicação (horas)</label><input id="windowHours" type="number" value="6"></div>
        <div><label>Nicho</label><input id="niche" placeholder="imovel / food / ..."></div>
      </div>
    </div>

    <div class="card">
      <h2>Marca</h2>
      <div class="row">
        <div><label>Nome (aceita &lt;b&gt;)</label><input id="b_name" placeholder="LA&lt;b&gt;BELA&lt;/b&gt;"></div>
        <div><label>Sigla</label><input id="b_mark" placeholder="LB"></div>
      </div>
      <div class="row">
        <div><label>Cor de destaque</label><input id="b_accent" placeholder="#4f8cff"></div>
        <div><label>Cor do CTA</label><input id="b_cta" placeholder="#7c5cff"></div>
      </div>
      <div class="row">
        <div><label>@handle</label><input id="b_handle" placeholder="@labela"></div>
        <div><label>Cidade</label><input id="b_city" placeholder="Chapecó/SC"></div>
      </div>
    </div>

    <div class="card">
      <h2>Agenda</h2>
      <div id="sched"></div>
      <button class="ghost" onclick="addRow()">+ adicionar post</button>
      <p class="hint">dow: 0=dom, 1=seg … 6=sáb. type: image, carousel, reels ou story.</p>
    </div>

    <div class="bar">
      <button id="save" class="btn" onclick="save()">Salvar</button>
      <span id="saving" class="hint" style="display:none">salvando…</span>
    </div>
  </div>
</div>

<script>
const CLIENT = ${JSON.stringify(client)};
const DOW = [["1","seg"],["2","ter"],["3","qua"],["4","qui"],["5","sex"],["6","sáb"],["0","dom"]];
const TYPES = ["image","carousel","reels","story"];
const $ = id => document.getElementById(id);
let KEY = "";

function show(kind, text){ const m=$("msg"); m.className="msg "+kind; m.textContent=text; if(kind)window.scrollTo({top:0,behavior:"smooth"}); }
function api(method, body){
  return fetch("/api/admin/client?client="+encodeURIComponent(CLIENT)+"&key="+encodeURIComponent(KEY),
    { method, headers:{ "content-type":"application/json" }, body: body?JSON.stringify(body):undefined })
    .then(async r => { const j=await r.json().catch(()=>({})); if(!r.ok) throw new Error(j.error||("HTTP "+r.status)); return j; });
}

function schedRow(it){
  it = it||{};
  const wrap=document.createElement("div"); wrap.className="sched-item";
  const opt=(arr,val)=>arr.map(o=>{const v=Array.isArray(o)?o[0]:o,l=Array.isArray(o)?o[1]:o;return '<option value="'+v+'"'+(String(val)===String(v)?" selected":"")+'>'+l+'</option>';}).join("");
  wrap.innerHTML =
    '<button class="del" title="remover" onclick="this.parentNode.remove()">✕</button>'+
    '<div class="row">'+
      '<div style="flex:.8"><label>id</label><input class="f_id" value="'+(it.id||"")+'" placeholder="seg"></div>'+
      '<div style="flex:.8"><label>dia</label><select class="f_dow">'+opt(DOW,it.dow)+'</select></div>'+
      '<div style="flex:.7"><label>hora</label><input class="f_time" value="'+(it.time||"09:00")+'" placeholder="09:00"></div>'+
      '<div style="flex:.9"><label>tipo</label><select class="f_type">'+opt(TYPES,it.type||"image")+'</select></div>'+
    '</div>'+
    '<label>mídia (arquivos separados por vírgula)</label>'+
    '<input class="f_media" value="'+((it.media||[]).join(", "))+'" placeholder="post1.jpg, post2.jpg">'+
    '<label>legenda</label>'+
    '<textarea class="f_caption" placeholder="texto do post">'+(it.caption||"")+'</textarea>';
  return wrap;
}
function addRow(it){ $("sched").appendChild(schedRow(it)); }
function collectSchedule(){
  return [...document.querySelectorAll("#sched .sched-item")].map(w=>{
    const g=c=>w.querySelector(c);
    const media=g(".f_media").value.split(",").map(s=>s.trim()).filter(Boolean);
    const o={ id:g(".f_id").value.trim(), dow:Number(g(".f_dow").value), time:g(".f_time").value.trim(),
      type:g(".f_type").value, media, caption:g(".f_caption").value };
    return o;
  }).filter(o=>o.id);
}

function fill(c){
  c=c||{};
  $("name").value=c.name||""; $("mediaBaseUrl").value=c.mediaBaseUrl||"";
  if(c.timezoneOffsetHours!=null)$("timezoneOffsetHours").value=c.timezoneOffsetHours;
  if(c.windowHours!=null)$("windowHours").value=c.windowHours;
  $("niche").value=c.niche||"";
  const b=c.brand||{};
  $("b_name").value=b.name||""; $("b_mark").value=b.mark||""; $("b_accent").value=b.accent||"";
  $("b_cta").value=b.cta||""; $("b_handle").value=b.handle||""; $("b_city").value=b.city||"";
  $("sched").innerHTML=""; (c.schedule||[]).forEach(addRow);
  if(!(c.schedule||[]).length) addRow();
}

function load(){
  KEY = $("key").value.trim();
  if(!CLIENT){ show("err","Faltou ?client=<id> na URL."); return; }
  if(!KEY){ show("err","Cole a chave de admin."); return; }
  api("GET").then(j=>{
    localStorage.setItem("pp_key", KEY);
    $("gate").style.display="none"; $("app").style.display="block";
    fill(j.client); show("", "");
  }).catch(e=>{ show("err","Não entrou: "+e.message); $("gate").style.display="block"; });
}

function save(){
  const patch = {
    name:$("name").value.trim(), mediaBaseUrl:$("mediaBaseUrl").value.trim(),
    timezoneOffsetHours:Number($("timezoneOffsetHours").value),
    windowHours:Number($("windowHours").value),
    niche:$("niche").value.trim(),
    brand:{ name:$("b_name").value.trim(), mark:$("b_mark").value.trim(), accent:$("b_accent").value.trim(),
      cta:$("b_cta").value.trim(), handle:$("b_handle").value.trim(), city:$("b_city").value.trim() },
    schedule: collectSchedule(),
  };
  $("save").disabled=true; $("saving").style.display="inline";
  api("POST", patch).then(j=>{
    show("ok","Salvo. "+ (j.client&&j.client.schedule?j.client.schedule.length:0) +" post(s) na agenda.");
    fill(j.client);
  }).catch(e=> show("err","Erro ao salvar: "+e.message))
  .finally(()=>{ $("save").disabled=false; $("saving").style.display="none"; });
}

// entrada: tenta a chave salva; senão mostra o portão
(function(){
  const saved = localStorage.getItem("pp_key");
  if(saved){ $("key").value=saved; load(); }
  else { $("gate").style.display="block"; }
})();
</script>
</body></html>`);
};
