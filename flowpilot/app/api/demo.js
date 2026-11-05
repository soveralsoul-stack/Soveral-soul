/**
 * Demo page for the Meta App Review reviewer.
 *   https://www.flowpilot.app.br/demo   (rewrite -> /api/demo)
 *
 * No credentials required: the reviewer connects THEIR OWN Instagram professional
 * account and then uses the product as a customer would: uploads an image, writes
 * the caption, picks a date and time, and the post goes into their publishing
 * schedule. The scheduler (cron) publishes it at that time; "Publish now" skips
 * the wait. This exercises instagram_business_basic (identify the connected
 * account) and instagram_business_content_publish (publish what the user created).
 *
 * A 1a e a 2a submissao foram recusadas por "caso de uso desnecessario" (1.6):
 * o revisor via uma agenda pronta e um cartao de teste nosso, nunca um post dele.
 * Por isso a demo agora comeca vazia e tudo o que sai foi o usuario que criou.
 */
const { resolveClient } = require("../lib");
const { DEMO_CLIENT, demoAccount } = require("../demo-auth");

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const FORMAT = { image: "Feed post", story: "Story" };

function statusCell(q) {
  if (q.status === "published") {
    return `<span class="badge ok2">Published</span>
      <div class="meta">Media ID <code>${esc(q.mediaId)}</code></div>`;
  }
  const failed = q.status === "failed"
    ? `<span class="badge bad">Failed</span><div class="meta">${esc(String(q.error || "").slice(0, 140))}</div>`
    : `<span class="badge">Scheduled</span>`;
  return `${failed}
    <div class="acts">
      <form method="POST" action="/api/demo-publish"><input type="hidden" name="item" value="${esc(q.id)}">
        <button class="btn3" type="submit">Publish now</button></form>
      <form method="POST" action="/api/demo-delete"><input type="hidden" name="item" value="${esc(q.id)}">
        <button class="lnk" type="submit">Remove</button></form>
    </div>`;
}

const queueRows = (queue) => [...queue]
  .sort((a, b) => Date.parse(b.at) - Date.parse(a.at))
  .map((q) => `<tr>
    <td><time data-at="${esc(q.at)}">${esc(q.at.slice(0, 16).replace("T", " "))} UTC</time></td>
    <td><div class="post"><img class="th ${q.type}" src="/m/${esc(q.id)}.jpg" alt="">
      <div><b>${FORMAT[q.type] || esc(q.type)}</b>
      <div class="cap">${esc(q.caption ? q.caption.slice(0, 90) + (q.caption.length > 90 ? "…" : "") : q.type === "story" ? "Stories have no caption" : "No caption")}</div></div></div></td>
    <td>${statusCell(q)}</td></tr>`)
  .join("");

const page = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>FlowPilot — App Review demo</title>
<link rel="icon" type="image/png" href="/favicon.png">
<style>
  :root{--a1:#4f8cff;--a2:#7c5cff}
  *{margin:0;box-sizing:border-box}
  [hidden]{display:none!important}
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
    background:radial-gradient(120% 60% at 50% 0%,#101528,#06080f);color:#e8eef8;
    min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 16px;line-height:1.6}
  .box{max-width:680px;width:100%;background:rgba(255,255,255,.03);border:1px solid #1a2240;
    border-radius:16px;padding:40px 34px}
  @media (max-width:560px){.box{padding:28px 18px}}
  .brand{display:flex;align-items:center;gap:11px;margin-bottom:22px}
  .brand svg{width:38px;height:38px}
  .wm{font-weight:700;font-size:1.3rem;letter-spacing:-.02em}
  .wm .g{background:linear-gradient(120deg,var(--a1),var(--a2));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
  h1{font-size:1.45rem;margin-bottom:12px}
  h2{font-size:1.02rem;margin:30px 0 12px;color:#cfe0f5}
  p{color:#9fb0c9}
  table{width:100%;border-collapse:collapse;font-size:.9rem;color:#c3d2e6}
  th{text-align:left;font-weight:700;color:#8fa4c0;font-size:.76rem;letter-spacing:.08em;
    text-transform:uppercase;padding:0 10px 8px 0;border-bottom:1px solid #1a2240}
  td{padding:11px 10px 11px 0;border-bottom:1px solid #131a33;vertical-align:top}
  ol{color:#9fb0c9;padding-left:20px;margin:14px 0}
  ol li{margin-bottom:7px}
  .btn{display:inline-flex;align-items:center;gap:10px;margin-top:22px;
    background:linear-gradient(120deg,var(--a1),var(--a2));color:#fff;font-weight:700;
    text-decoration:none;border:0;padding:15px 26px;border-radius:11px;font-size:1.03rem;cursor:pointer;
    box-shadow:0 10px 30px rgba(79,140,255,.35);font-family:inherit}
  .btn:disabled{opacity:.55;cursor:default;box-shadow:none}
  .btn2{background:none;border:1px solid #2a3560;color:#9fb0c9;padding:10px 16px;border-radius:9px;
    font-size:.88rem;cursor:pointer;font-family:inherit}
  .btn2:hover{border-color:#4f8cff;color:#e8eef8}
  .btn3{background:#1b2650;border:1px solid #33427a;color:#e8eef8;padding:6px 12px;border-radius:8px;
    font-size:.82rem;font-weight:600;cursor:pointer;font-family:inherit}
  .btn3:hover{border-color:#4f8cff}
  .lnk{background:none;border:0;color:#7d8daa;font-size:.8rem;cursor:pointer;font-family:inherit;padding:6px 4px;text-decoration:underline}
  .acts{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:8px}
  .ok{background:rgba(45,180,120,.12);border:1px solid #1f6b4a;color:#7ee2b0;
    padding:12px 14px;border-radius:10px;margin:16px 0;font-size:.94rem}
  .err{background:rgba(224,85,107,.12);border:1px solid #7a2636;color:#f2a3b0;
    padding:12px 14px;border-radius:10px;margin:16px 0;font-size:.94rem}
  .small{margin-top:14px;font-size:.85rem;color:#61728e}
  a{color:var(--a1)}
  code{font-family:ui-monospace,Consolas,monospace;font-size:.86em;background:#0c1224;
    border:1px solid #232c4e;border-radius:6px;padding:1px 6px;word-break:break-all}
  .card{background:#0a0f20;border:1px solid #1a2240;border-radius:12px;padding:20px}
  .lbl{display:block;font-size:.8rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
    color:#8fa4c0;margin:18px 0 8px}
  .lbl:first-child{margin-top:0}
  .seg{display:flex;gap:8px;flex-wrap:wrap}
  .seg label{display:flex;align-items:center;gap:8px;border:1px solid #2a3560;border-radius:9px;
    padding:9px 14px;cursor:pointer;color:#c3d2e6;font-size:.92rem}
  .seg input{accent-color:#4f8cff}
  .seg label:has(input:checked){border-color:#4f8cff;background:rgba(79,140,255,.1);color:#fff}
  input[type=file],input[type=datetime-local],textarea{width:100%;font:inherit;font-size:.95rem;color:#e8eef8;
    background:#060a17;border:1px solid #2a3560;border-radius:9px;padding:10px 12px}
  input[type=datetime-local]{color-scheme:dark;max-width:280px}
  textarea{resize:vertical;min-height:96px}
  .count{font-size:.78rem;color:#61728e;text-align:right;margin-top:4px}
  .pv{display:flex;gap:14px;align-items:center;margin-top:12px}
  .pv img{max-height:180px;max-width:180px;border-radius:8px;border:1px solid #232c4e}
  .pv span{font-size:.85rem;color:#7d8daa}
  .post{display:flex;gap:10px;align-items:flex-start}
  .th{width:46px;height:58px;object-fit:cover;border-radius:6px;border:1px solid #232c4e;flex:none;background:#0c1224}
  .th.story{height:74px;width:42px}
  .cap{font-size:.82rem;color:#7d8daa;word-break:break-word}
  .meta{font-size:.78rem;color:#7d8daa;margin-top:4px;word-break:break-word}
  .meta code{word-break:normal;white-space:nowrap}
  .badge{display:inline-block;font-size:.74rem;font-weight:700;letter-spacing:.04em;padding:2px 9px;
    border-radius:99px;background:rgba(79,140,255,.14);color:#9cc0ff;border:1px solid #2c4a8a}
  .badge.ok2{background:rgba(45,180,120,.12);color:#7ee2b0;border-color:#1f6b4a}
  .badge.bad{background:rgba(224,85,107,.12);color:#f2a3b0;border-color:#7a2636}
  @media (max-width:560px){th:first-child,td:first-child{width:84px}.th{display:none}}
</style></head><body><div class="box">
  <div class="brand">
    <svg viewBox="0 0 100 100"><defs><linearGradient id="fp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f8cff"/><stop offset="1" stop-color="#7c5cff"/></linearGradient></defs><rect width="100" height="100" rx="24" fill="url(#fp)"/><rect x="12" y="12" width="76" height="76" rx="18" fill="none" stroke="#fff" stroke-width="4"/><g transform="translate(50 50) scale(2.05) translate(-12 -9)"><path fill="#fff" d="M21.7 2.3a1 1 0 0 0-1.05-.23L2.9 8.36c-.86.32-.8 1.57.09 1.8l6.2 1.6 1.6 6.2c.23.9 1.48.95 1.8.09l6.29-17.7a1 1 0 0 0-.18-1.05z"/></g></svg>
    <span class="wm">Flow<span class="g">Pilot</span></span>
  </div>
  ${body}
</div></body></html>`;

// Compositor: o navegador recorta/redimensiona a imagem para um formato que o
// Instagram aceita (feed entre 4:5 e 1.91:1; story em 1080x1920) e envia em JPEG.
const COMPOSER_JS = `
(function(){
  var f = document.getElementById('compose'); if (!f) return;
  var file = document.getElementById('file'), pv = document.getElementById('pv'),
      pvimg = document.getElementById('pvimg'), pvinfo = document.getElementById('pvinfo'),
      cap = document.getElementById('cap'), capwrap = document.getElementById('capwrap'),
      count = document.getElementById('count'), when = document.getElementById('when'),
      go = document.getElementById('go'), msg = document.getElementById('msg');
  var src = null, jpeg = null;
  var pad = function(n){ return String(n).padStart(2,'0'); };
  var local = function(d){ return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'T'+pad(d.getHours())+':'+pad(d.getMinutes()); };
  var soon = new Date(Date.now() + 10*60e3); when.value = local(soon); when.min = local(new Date());
  var type = function(){ return f.querySelector('input[name=type]:checked').value; };

  function render(){
    if (!src) return;
    var w = src.naturalWidth, h = src.naturalHeight, c = document.createElement('canvas'), x = c.getContext('2d');
    if (type() === 'story') {
      c.width = 1080; c.height = 1920; x.fillStyle = '#000'; x.fillRect(0,0,1080,1920);
      var s = Math.min(1080/w, 1920/h), dw = w*s, dh = h*s;
      x.drawImage(src, (1080-dw)/2, (1920-dh)/2, dw, dh);
    } else {
      var sx = 0, sy = 0, sw = w, sh = h, r = w/h;
      if (r < 0.8) { sh = w/0.8; sy = (h-sh)/2; } else if (r > 1.91) { sw = h*1.91; sx = (w-sw)/2; }
      var k = Math.min(1, 1080/sw); c.width = Math.round(sw*k); c.height = Math.round(sh*k);
      x.drawImage(src, sx, sy, sw, sh, 0, 0, c.width, c.height);
    }
    var q = 0.88; jpeg = c.toDataURL('image/jpeg', q);
    while (jpeg.length > 1000000 && q > 0.4) { q -= 0.08; jpeg = c.toDataURL('image/jpeg', q); }
    pvimg.src = jpeg; pv.hidden = false;
    pvinfo.textContent = c.width + ' x ' + c.height + ' JPEG, ' + Math.round(jpeg.length*0.75/1024) + ' KB. This is exactly what will be published.';
  }
  function sync(){ capwrap.hidden = type() === 'story'; render(); }
  f.querySelectorAll('input[name=type]').forEach(function(r){ r.addEventListener('change', sync); });
  cap.addEventListener('input', function(){ count.textContent = cap.value.length + ' / 2200'; });
  file.addEventListener('change', function(){
    msg.innerHTML = ''; jpeg = null;
    var fl = file.files[0]; if (!fl) return;
    var img = new Image();
    img.onload = function(){
      if (img.naturalWidth < 320) { msg.innerHTML = '<div class="err">This image is too small. Use one at least 320 px wide.</div>'; return; }
      src = img; render();
    };
    img.onerror = function(){ msg.innerHTML = '<div class="err">Could not read this image. Try a JPEG or PNG.</div>'; };
    img.src = URL.createObjectURL(fl);
  });
  f.addEventListener('submit', function(e){
    e.preventDefault(); msg.innerHTML = '';
    if (!jpeg) { msg.innerHTML = '<div class="err">Choose an image first.</div>'; return; }
    var at = new Date(when.value);
    if (isNaN(at)) { msg.innerHTML = '<div class="err">Pick a date and time.</div>'; return; }
    go.disabled = true; go.textContent = 'Saving...';
    fetch('/api/demo-schedule', { method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: type(), caption: cap.value, at: at.toISOString(), image: jpeg }) })
      .then(function(r){ return r.json(); })
      .then(function(j){
        if (j.ok) { location.href = '/demo?scheduled=1'; return; }
        msg.innerHTML = '<div class="err"></div>'; msg.firstChild.textContent = j.error || 'Something went wrong.';
        go.disabled = false; go.textContent = 'Add to schedule';
      })
      .catch(function(){ msg.innerHTML = '<div class="err">Network error. Please try again.</div>'; go.disabled = false; go.textContent = 'Add to schedule'; });
  });
})();
document.querySelectorAll('time[data-at]').forEach(function(t){
  var d = new Date(t.getAttribute('data-at'));
  if (!isNaN(d)) t.textContent = d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
});`;

module.exports = async (req, res) => {
  res.setHeader("content-type", "text/html; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  const q = req.query || {};

  let acc = null;
  try { acc = await demoAccount(req); } catch { /* segue como não conectado */ }

  // ainda não conectou (ou a conta conectada é de outro navegador): instruções + conectar
  if (!acc || acc.other) {
    const taken = acc && acc.other ? `<div class="err">Another Instagram account is connected to this demo from a
      different browser. Connecting yours replaces it; you will never see or post to someone else's account.</div>` : "";
    return res.end(page(`
      <h1>App Review demo — no credentials needed</h1>
      <p>FlowPilot is a scheduling service for Instagram. You upload your image, write the caption,
      choose the date and time, and FlowPilot publishes it to your Instagram professional account
      at that moment. To try it, connect <b>your own</b> Instagram professional account:</p>
      ${taken}
      <ol>
        <li>Click <b>Connect Instagram</b> below.</li>
        <li>Log in with your Instagram professional (Business or Creator) account.</li>
        <li>On the consent screen, grant <b>Access and publish content</b>.</li>
        <li>Back here, create a post: upload an image, write a caption and pick when it goes out.</li>
        <li>The post appears in your publishing schedule. FlowPilot publishes it at that time,
          or right away if you click <b>Publish now</b>.</li>
      </ol>
      <a class="btn" href="/api/oauth/start?client=${DEMO_CLIENT}">Connect Instagram</a>
      <p class="small">You can revoke access at any time in Instagram → Settings → Website permissions →
      Apps and websites. See our <a href="/privacidade">privacy policy</a>.</p>
      <script>${COMPOSER_JS}</script>`));
  }

  let client = {};
  try { client = (await resolveClient(DEMO_CLIENT)) || {}; } catch { /* segue sem a tabela */ }
  const queue = client.queue || [];
  const justPublished = q.published && queue.find((i) => i.id === q.published);

  const notes = [
    q.scheduled ? `<div class="ok">Added to your publishing schedule. FlowPilot will publish it at the time
      you chose. Use <b>Publish now</b> if you do not want to wait.</div>` : "",
    justPublished ? `<div class="ok">Published to @${esc(acc.username)}. Open your Instagram profile to see the
      ${justPublished.type === "story" ? "story" : "post"}.
      ${justPublished.mediaId ? `Media ID: <code>${esc(justPublished.mediaId)}</code>` : ""}</div>` : "",
    q.removed ? `<div class="ok">Removed from the schedule.</div>` : "",
    q.error ? `<div class="err">${esc(String(q.error).slice(0, 200))}</div>` : "",
  ].join("");

  return res.end(page(`
    <h1>Connected: @${esc(acc.username)}</h1>
    <p>Create a post below. FlowPilot keeps it in your publishing schedule and publishes it to your
    Instagram account at the time you choose, without you having to open the app again.</p>
    ${notes}

    <h2>1. Create a post</h2>
    <form id="compose" class="card">
      <span class="lbl">Format</span>
      <div class="seg">
        <label><input type="radio" name="type" value="image" checked> Feed post</label>
        <label><input type="radio" name="type" value="story"> Story</label>
      </div>
      <label class="lbl" for="file">Image</label>
      <input type="file" id="file" accept="image/jpeg,image/png,image/webp">
      <div class="pv" id="pv" hidden><img id="pvimg" alt="Preview"><span id="pvinfo"></span></div>
      <div id="capwrap">
        <label class="lbl" for="cap">Caption</label>
        <textarea id="cap" maxlength="2200" placeholder="Write the caption for this post"></textarea>
        <div class="count" id="count">0 / 2200</div>
      </div>
      <label class="lbl" for="when">Publish at (your local time)</label>
      <input type="datetime-local" id="when" required>
      <div><button class="btn" id="go" type="submit">Add to schedule</button></div>
      <div id="msg"></div>
    </form>

    <h2>2. Your publishing schedule</h2>
    <table>
      <tr><th>When</th><th>Post</th><th>Status</th></tr>
      ${queueRows(queue) || `<tr><td colspan="3">Nothing scheduled yet. Create your first post above.</td></tr>`}
    </table>
    <p class="small">A scheduler runs every 15 minutes, finds the posts whose time has come, and publishes
    them through the Instagram Graph API using <code>instagram_business_content_publish</code>. That is the
    only reason the app requests this permission: without it, nothing in this schedule can be published
    and the product has no function. <a href="/demo">Refresh</a> to see the latest status.</p>

    <form method="POST" action="/api/demo-reset" style="margin-top:22px">
      <button class="btn2" type="submit">Disconnect this account</button>
    </form>
    <p class="small">Disconnecting deletes your schedule and the images you uploaded here. You can also
    revoke access in Instagram → Settings → Website permissions → Apps and websites.</p>
    <script>${COMPOSER_JS}</script>`));
};
