/**
 * Demo page for the Meta App Review reviewer.
 *   https://www.flowpilot.app.br/demo   (rewrite -> /api/demo)
 *
 * No credentials required: the reviewer connects THEIR OWN Instagram professional
 * account and publishes a test post with one click. This is the same flow a real
 * customer goes through, so it exercises instagram_business_basic (identify the
 * connected account) and instagram_business_content_publish (publish on behalf).
 */
const { kvGet, resolveClient, saveClient } = require("../lib");

const DEMO_CLIENT = "reviewer";
const DOW = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/**
 * Garante que a conta do revisor tenha uma agenda de verdade para olhar.
 * A agenda é o produto: o cliente define uma vez, e o cron (a cada 15 min,
 * ver vercel.json) publica no horário. Sem isso o revisor via só um botão de
 * teste, e foi exatamente essa a leitura que derrubou a primeira submissão.
 */
async function ensureSchedule(host) {
  const client = (await resolveClient(DEMO_CLIENT)) || {};
  if ((client.schedule || []).length) return client;
  return saveClient(DEMO_CLIENT, {
    mediaBaseUrl: `https://${host}`,
    timezoneOffsetHours: 0,
    windowHours: 6,
    schedule: [
      { id: "demo-mon", dow: 1, time: "08:00", type: "story", media: ["story-teste.jpg"], caption: "" },
      { id: "demo-wed", dow: 3, time: "12:00", type: "story", media: ["story-teste.jpg"], caption: "" },
      { id: "demo-fri", dow: 5, time: "19:00", type: "story", media: ["story-teste.jpg"], caption: "" },
    ],
  });
}

const scheduleRows = (client) => (client.schedule || [])
  .map((i) => `<tr><td>${DOW[i.dow] || i.dow}</td><td>${i.time} UTC</td>
    <td>${i.type}</td><td><code>${String(i.media?.[0] || "").replace(/[<>]/g, "")}</code></td></tr>`)
  .join("");

const page = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>FlowPilot — App Review demo</title>
<link rel="icon" type="image/png" href="/favicon.png">
<style>
  :root{--a1:#4f8cff;--a2:#7c5cff}
  *{margin:0;box-sizing:border-box}
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
    background:radial-gradient(120% 60% at 50% 0%,#101528,#06080f);color:#e8eef8;
    min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;line-height:1.6}
  .box{max-width:560px;width:100%;background:rgba(255,255,255,.03);border:1px solid #1a2240;
    border-radius:16px;padding:40px 34px}
  .brand{display:flex;align-items:center;gap:11px;margin-bottom:22px}
  .brand svg{width:38px;height:38px}
  .wm{font-weight:700;font-size:1.3rem;letter-spacing:-.02em}
  .wm .g{background:linear-gradient(120deg,var(--a1),var(--a2));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
  h1{font-size:1.45rem;margin-bottom:12px}
  h2{font-size:1.02rem;margin:26px 0 10px;color:#cfe0f5}
  p{color:#9fb0c9}
  table{width:100%;border-collapse:collapse;font-size:.9rem;color:#c3d2e6}
  th{text-align:left;font-weight:700;color:#8fa4c0;font-size:.76rem;letter-spacing:.08em;
    text-transform:uppercase;padding:0 10px 8px 0;border-bottom:1px solid #1a2240}
  td{padding:9px 10px 9px 0;border-bottom:1px solid #131a33}
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
  .ok{background:rgba(45,180,120,.12);border:1px solid #1f6b4a;color:#7ee2b0;
    padding:12px 14px;border-radius:10px;margin:16px 0;font-size:.94rem}
  .err{background:rgba(224,85,107,.12);border:1px solid #7a2636;color:#f2a3b0;
    padding:12px 14px;border-radius:10px;margin:16px 0;font-size:.94rem}
  .small{margin-top:18px;font-size:.85rem;color:#61728e}
  a{color:var(--a1)}
  code{font-family:ui-monospace,Consolas,monospace;font-size:.86em;background:#0c1224;
    border:1px solid #232c4e;border-radius:6px;padding:1px 6px}
</style></head><body><div class="box">
  <div class="brand">
    <svg viewBox="0 0 100 100"><defs><linearGradient id="fp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f8cff"/><stop offset="1" stop-color="#7c5cff"/></linearGradient></defs><rect width="100" height="100" rx="24" fill="url(#fp)"/><rect x="12" y="12" width="76" height="76" rx="18" fill="none" stroke="#fff" stroke-width="4"/><g transform="translate(50 50) scale(2.05) translate(-12 -9)"><path fill="#fff" d="M21.7 2.3a1 1 0 0 0-1.05-.23L2.9 8.36c-.86.32-.8 1.57.09 1.8l6.2 1.6 1.6 6.2c.23.9 1.48.95 1.8.09l6.29-17.7a1 1 0 0 0-.18-1.05z"/></g></svg>
    <span class="wm">Flow<span class="g">Pilot</span></span>
  </div>
  ${body}
</div></body></html>`;

module.exports = async (req, res) => {
  res.setHeader("content-type", "text/html; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  const q = req.query || {};

  let connected = null;
  try {
    const stored = await kvGet(`igtoken:client:${DEMO_CLIENT}`);
    if (stored) connected = JSON.parse(stored);
  } catch { /* segue como não conectado */ }

  // ainda não conectou: mostra as instruções + botão de conectar
  if (!connected) {
    return res.end(page(`
      <h1>App Review demo — no credentials needed</h1>
      <p>FlowPilot is a scheduling service: the account owner fills in a publishing schedule
      once, and FlowPilot publishes to their Instagram Business account at each scheduled time.
      To see it, connect <b>your own</b> Instagram professional account:</p>
      <ol>
        <li>Click <b>Connect Instagram</b> below.</li>
        <li>Log in with your Instagram professional (Business or Creator) account.</li>
        <li>On the consent screen, grant <b>Access and publish content</b>.</li>
        <li>You come back here to the <b>publishing schedule</b> for your account, with a
          button that runs the scheduler immediately so you can see a post go live.</li>
      </ol>
      <a class="btn" href="/api/oauth/start?client=${DEMO_CLIENT}">Connect Instagram</a>
      <p class="small">You can revoke access at any time in Instagram → Settings → Accounts Center →
      Website permissions. See our <a href="/privacidade">privacy policy</a>.</p>`));
  }

  // conectado: botão de publicar
  const at = q.published ? `<div class="ok">Test post published. Open your Instagram profile to see the story.
    ${q.media ? `Media ID: <code>${String(q.media).replace(/[^0-9]/g, "")}</code>` : ""}</div>` : "";
  const err = q.error ? `<div class="err">${String(q.error).slice(0, 200).replace(/[<>]/g, "")}</div>` : "";

  const host = (req.headers["x-forwarded-host"] || req.headers.host || "").split(",")[0].trim();
  let client = {};
  try { client = await ensureSchedule(host); } catch { /* segue sem a tabela */ }

  return res.end(page(`
    <h1>Connected: @${(connected.username || "").replace(/[<>]/g, "")}</h1>
    <p>This is the core of the product: a <b>publishing schedule</b>. The account owner fills it in
    once, and FlowPilot publishes to their Instagram Business account at each scheduled time,
    without anyone opening the app.</p>

    <h2>Publishing schedule for this account</h2>
    <table>
      <tr><th>Day</th><th>Time</th><th>Format</th><th>Media</th></tr>
      ${scheduleRows(client) || `<tr><td colspan="4">schedule unavailable</td></tr>`}
    </table>
    <p class="small">A scheduler runs every 15 minutes, checks which items are due, and publishes
    them through the Instagram Graph API using <code>instagram_business_content_publish</code>.
    This is the only reason the app requests that permission: without it, nothing on this table
    can ever be published and the product has no function.</p>

    ${at}${err}
    <p>You do not have to wait for the next scheduled slot. The button below runs the scheduler
    immediately for the first item above, so you can see the result on your profile right now.</p>
    <form method="POST" action="/api/demo-publish">
      <button class="btn" type="submit">Run the scheduler now</button>
    </form>
    <p class="small">It publishes a branded test card as a story, which disappears after 24 hours.
    To disconnect, revoke access in Instagram → Settings → Accounts Center → Website permissions.</p>
    <form method="POST" action="/api/demo-reset" style="margin-top:14px">
      <button class="btn2" type="submit">Not your account? Disconnect and connect another</button>
    </form>`));
};

module.exports.DEMO_CLIENT = DEMO_CLIENT;
