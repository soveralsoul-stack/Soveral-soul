// Mapa de clientes (multi-tenant). Para adicionar um cliente novo:
//   1) crie clients/<id>.json (dados + agenda + brand kit, SEM token)
//   2) importe e registre aqui
//   3) crie a env var do token na Vercel (o nome está em tokenEnv do JSON)
const soveralsoul = require("./soveralsoul.json");
const teste = require("./teste.json"); // validação de publicação (token vem do OAuth/Upstash)

module.exports = {
  soveralsoul,
  teste,
  // labela: require("./labela.json"),   // <- entra aqui quando for a hora
};
