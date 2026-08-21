/**
 * Termos de Serviço do FlowPilot (campo "Terms of Service URL" do App Review da Meta).
 *   /termos  (rewrite em vercel.json)  ->  /api/termos
 * HTML embutido para não depender de leitura de arquivo em runtime.
 * Mesmo estilo e rodapé da política de privacidade — manter os dois em sincronia.
 */
const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Termos de Serviço — FlowPilot</title>
<style>
  body{font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6;color:#1a1a1a;
    max-width:820px;margin:0 auto;padding:40px 22px}
  h1{font-size:1.9rem;margin-bottom:4px} h2{margin-top:2rem;font-size:1.25rem}
  .muted{color:#666;font-size:.95rem} a{color:#1a6fd4}
  ul{padding-left:1.2rem}
</style>
</head>
<body>
  <h1>Termos de Serviço — FlowPilot</h1>
  <p class="muted">FlowPilot, um serviço da Soveral Soul · flowpilot.app.br · Última atualização: 12 de agosto de 2026</p>

  <p>Estes Termos regem o uso do <strong>FlowPilot</strong> ("serviço", "nós"), plataforma de
  agendamento e publicação de conteúdo operada por <strong>SOVERALSOUL PRODUCOES LTDA</strong>
  (Chapecó/SC, Brasil). Ao conectar sua conta do Instagram ou utilizar qualquer parte do
  serviço, você ("usuário") declara que leu e concorda com estes Termos.</p>

  <h2>1. O que o serviço faz</h2>
  <p>O FlowPilot permite que você conecte uma conta profissional do Instagram, monte uma
  agenda de publicações e tenha esse conteúdo publicado automaticamente no horário definido,
  por meio das APIs oficiais da Meta. O serviço age <strong>sempre em seu nome e sob sua
  autorização</strong>, nunca por iniciativa própria.</p>

  <h2>2. Requisitos de uso</h2>
  <ul>
    <li>Ser maior de 18 anos, ou possuir autorização do responsável legal.</li>
    <li>Possuir uma <strong>conta profissional do Instagram</strong> (Empresa ou Criador de
      conteúdo), exigência da própria Meta para publicação via API.</li>
    <li>Ser titular da conta conectada, ou ter autorização expressa de quem é.</li>
    <li>Manter suas credenciais de acesso em sigilo.</li>
  </ul>

  <h2>3. Autorização e vínculo com a Meta</h2>
  <p>A conexão da sua conta é feita pelo fluxo oficial de login da Meta. Você pode
  <strong>revogar essa autorização a qualquer momento</strong>, em Configurações do Instagram
  &gt; Apps e sites, o que interrompe imediatamente qualquer publicação futura.</p>
  <p>O uso do serviço também está sujeito aos termos e políticas da Meta, incluindo as
  <a href="https://help.instagram.com/477434105621119">Diretrizes da Comunidade do
  Instagram</a>. O FlowPilot não é afiliado, patrocinado nem endossado pela Meta Platforms.</p>

  <h2>4. Suas responsabilidades sobre o conteúdo</h2>
  <p>O conteúdo publicado é <strong>seu</strong> e permanece seu. Você é o único responsável
  por ele, e declara que:</p>
  <ul>
    <li>Detém os direitos sobre imagens, vídeos, áudios e textos enviados, ou possui licença
      para usá-los.</li>
    <li>Obteve autorização das pessoas identificáveis retratadas, quando aplicável.</li>
    <li>O conteúdo não é ilegal, enganoso, discriminatório, nem viola direitos de terceiros.</li>
    <li>Não utilizará o serviço para spam, automação abusiva, engajamento artificial ou
      qualquer prática vedada pela Meta.</li>
  </ul>
  <p>Você nos concede uma licença limitada, restrita ao que for tecnicamente necessário para
  armazenar, processar e publicar esse conteúdo na sua conta. Nada além disso.</p>

  <h2>5. Uso indevido</h2>
  <p>Podemos suspender ou encerrar o acesso, com aviso quando possível, se identificarmos
  violação destes Termos, das regras da Meta ou da legislação aplicável, ou uso que
  comprometa a segurança e a estabilidade do serviço.</p>

  <h2>6. Disponibilidade e limitações</h2>
  <p>O serviço depende de APIs de terceiros, sobretudo da Meta. Alterações, instabilidades,
  limites de uso ou indisponibilidades dessas APIs podem afetar ou impedir publicações, e
  estão fora do nosso controle. Fazemos esforços razoáveis para manter o serviço disponível,
  mas <strong>não garantimos operação ininterrupta ou livre de falhas</strong>.</p>
  <p>Recomendamos que você acompanhe os resultados das publicações agendadas.</p>

  <h2>7. Planos, valores e cancelamento</h2>
  <p>Quando houver cobrança, os valores, a periodicidade e as condições são informados no
  momento da contratação. Você pode <strong>cancelar a qualquer momento</strong>, sem
  multa, e o serviço permanece ativo até o fim do período já pago. Não há reembolso
  proporcional de período em curso, salvo quando exigido por lei.</p>

  <h2>8. Encerramento e dados</h2>
  <p>Ao encerrar o uso, os tokens e dados de configuração são removidos, conforme descrito
  na nossa <a href="/privacidade">Política de Privacidade</a>. Você também pode solicitar a
  exclusão dos seus dados a qualquer momento pelo e-mail de contato abaixo.</p>

  <h2>9. Limitação de responsabilidade</h2>
  <p>Na máxima extensão permitida pela lei, não respondemos por lucros cessantes, perda de
  oportunidade, danos indiretos ou por consequências de publicações cujo conteúdo tenha sido
  definido por você. Nossa responsabilidade total fica limitada ao valor pago pelo usuário
  nos 12 meses anteriores ao evento. Nada aqui afasta direitos assegurados ao consumidor
  pelo Código de Defesa do Consumidor.</p>

  <h2>10. Alterações destes Termos</h2>
  <p>Podemos atualizar estes Termos. Mudanças relevantes serão comunicadas com antecedência
  razoável, e a data de última atualização no topo desta página é sempre revisada. O uso
  continuado após a vigência representa concordância.</p>

  <h2>11. Lei aplicável e foro</h2>
  <p>Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de
  <strong>Chapecó/SC</strong>, salvo se a lei garantir ao consumidor o foro do seu domicílio.</p>

  <h2>12. Contato</h2>
  <p>FlowPilot — um serviço da Soveral Soul · Chapecó/SC<br>
  Site: <a href="https://flowpilot.app.br">flowpilot.app.br</a><br>
  E-mail: <a href="mailto:comercial@soveralsoul.com.br">comercial@soveralsoul.com.br</a><br>
  WhatsApp: (49) 9 9911-8781</p>

  <p class="muted">Razão social: SOVERALSOUL PRODUCOES LTDA · CNPJ: 64.687.983/0001-69 ·
  Consulte também a <a href="/privacidade">Política de Privacidade</a>.</p>
</body>
</html>`;

module.exports = async (req, res) => {
  res.setHeader("content-type", "text/html; charset=utf-8");
  res.setHeader("cache-control", "public, max-age=3600");
  res.status(200).end(HTML);
};
