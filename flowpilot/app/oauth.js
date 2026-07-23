// Helpers do OAuth "Instagram API com login do Instagram" + armazenamento de token.
// Endpoints oficiais:
//   authorize:  https://www.instagram.com/oauth/authorize
//   short token: POST https://api.instagram.com/oauth/access_token
//   long token:  GET  https://graph.instagram.com/access_token (ig_exchange_token)

const SCOPES = "instagram_business_basic,instagram_business_content_publish";

function redirectUri(req) {
  // Preferível: fixar o domínio canônico via env (evita "redirect_uri mismatch" em
  // previews/www/apex). Se não houver, deriva do host da requisição.
  if (process.env.OAUTH_REDIRECT_URI) return process.env.OAUTH_REDIRECT_URI;
  const raw = req.headers["x-forwarded-host"] || req.headers.host || "";
  const host = raw.split(",")[0].trim(); // atrás de proxy pode vir "a, b"
  return `https://${host}/api/oauth/callback`;
}

function authUrl(req, state) {
  const p = new URLSearchParams({
    client_id: process.env.INSTAGRAM_APP_ID || "",
    redirect_uri: redirectUri(req),
    response_type: "code",
    scope: SCOPES,
    state: state || "",
  });
  return `https://www.instagram.com/oauth/authorize?${p.toString()}`;
}

// code -> token curto ( { access_token, user_id, permissions } )
async function exchangeCode(req, code) {
  const body = new URLSearchParams({
    client_id: process.env.INSTAGRAM_APP_ID || "",
    client_secret: process.env.INSTAGRAM_APP_SECRET || "",
    grant_type: "authorization_code",
    redirect_uri: redirectUri(req),
    code,
  });
  const r = await fetch("https://api.instagram.com/oauth/access_token", { method: "POST", body });
  const j = await r.json();
  if (j.error_type || j.error || !j.access_token) {
    throw new Error(`troca de código falhou: ${JSON.stringify(j)}`);
  }
  return j;
}

// token curto -> token longo (~60 dias) ( { access_token, expires_in } )
async function exchangeLong(shortToken) {
  const u = new URL("https://graph.instagram.com/access_token");
  u.searchParams.set("grant_type", "ig_exchange_token");
  u.searchParams.set("client_secret", process.env.INSTAGRAM_APP_SECRET || "");
  u.searchParams.set("access_token", shortToken);
  const r = await fetch(u);
  const j = await r.json();
  if (j.error || !j.access_token) throw new Error(`troca p/ token longo falhou: ${JSON.stringify(j)}`);
  return j;
}

async function getMe(token) {
  const u = new URL("https://graph.instagram.com/v21.0/me");
  u.searchParams.set("fields", "user_id,username,account_type");
  u.searchParams.set("access_token", token);
  const r = await fetch(u);
  return r.json();
}

module.exports = { SCOPES, redirectUri, authUrl, exchangeCode, exchangeLong, getMe };
