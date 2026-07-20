/**
 * Carrega o arquivo .env desta pasta para process.env (se ainda não estiver
 * definido). Assim os scripts funcionam com `node script.js` em qualquer
 * Node 18+, sem depender da flag --env-file (que só existe no Node 20.6+).
 */
const fs = require("fs");
const path = require("path");
try {
  const txt = fs.readFileSync(path.join(__dirname, ".env"), "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_.-]*)\s*=\s*(.*)\s*$/);
    if (!m) continue; // ignora comentários (#...) e linhas vazias
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = v;
  }
} catch (e) {
  /* sem .env ainda — tudo bem, usa variáveis já exportadas */
}
