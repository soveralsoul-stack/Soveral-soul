/**
 * Verifica se o IG_ACCESS_TOKEN do .env é válido e bate com o IG_USER_ID.
 * Rode no seu servidor (nada é enviado pra ninguém além da API oficial):
 *   node --env-file=.env check-token.js
 *
 * Dica: se você tem 2 tokens e não sabe qual usar, teste um de cada vez —
 * coloque um no .env, rode isto; depois troque pelo outro e rode de novo.
 * O que responder "OK" e com o username certo é o que vai no .env.
 */
const { IG_USER_ID, IG_ACCESS_TOKEN, GRAPH_BASE } = process.env;
const BASE = (GRAPH_BASE || "https://graph.instagram.com") + "/v21.0";

(async () => {
  if (!IG_ACCESS_TOKEN) {
    console.error("❌ IG_ACCESS_TOKEN vazio no .env.");
    process.exit(1);
  }
  const url = new URL(`${BASE}/me`);
  url.searchParams.set("fields", "user_id,username,account_type");
  url.searchParams.set("access_token", IG_ACCESS_TOKEN);

  try {
    const res = await fetch(url);
    const json = await res.json();
    if (json.error) {
      console.error(`❌ Token inválido/expirado: ${json.error.message}`);
      console.error("   → provavelmente é o token errado (curta duração) ou expirou. Tente o outro.");
      process.exit(1);
    }
    console.log("✅ Token OK");
    console.log(`   conta:   @${json.username} (${json.account_type})`);
    console.log(`   user_id: ${json.user_id}`);
    if (IG_USER_ID && String(json.user_id) !== String(IG_USER_ID)) {
      console.warn(`⚠️  Atenção: user_id do token (${json.user_id}) != IG_USER_ID do .env (${IG_USER_ID}).`);
      console.warn("   Ajuste o IG_USER_ID para o valor acima.");
    } else if (IG_USER_ID) {
      console.log("   IG_USER_ID confere. 👍");
    }
    console.log("\nSe apareceu ✅ e o @ da conta certa, esse é o token pro .env.");
  } catch (e) {
    console.error(`❌ Erro de rede: ${e.message}`);
    process.exit(1);
  }
})();
