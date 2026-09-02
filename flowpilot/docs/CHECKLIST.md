# Checklist — App Review + Verificação de Negócio (Instagram content publishing)

Objetivo: sair de "publica só na minha conta" (modo Dev / testadores) para
**publicar na conta de clientes** (Acesso Avançado ao `instagram_business_content_publish`).

> Seu app usa o fluxo **Instagram API com login do Instagram** (`graph.instagram.com`).
> A permissão a aprovar é **`instagram_business_content_publish`** (Acesso Avançado).
> Isso exige **App Review** + **Verificação de Negócio**. Leva de dias a ~2 semanas.
> A interface da Meta muda de vez em quando; siga os prompts que aparecem no painel.

## Pré-requisitos (antes de submeter)
- [ ] App dentro de um **Portfólio de Negócios** (Meta Business Manager).
- [ ] Produto **Instagram** configurado no app (o mesmo que você já usa).
- [ ] **App em modo Live** (não Development), com ícone, nome, categoria e e-mail de contato.
- [ ] **Política de Privacidade** publicada numa URL pública (use a página que preparei:
      `flowpilot.app.br/privacidade`). Cole essa URL em App Settings > Basic.
- [ ] **URL de exclusão de dados** (ou instruções de exclusão) — a mesma política já cobre isso.
- [ ] **Verificação de Negócio** concluída (Business Settings > Security Center):
      documento da empresa (CNPJ/contrato social) + comprovante. Pode levar alguns dias.

## Submissão do App Review
1. Painel do app > **App Review > Permissions and Features**.
2. Localize **`instagram_business_content_publish`** > **Request Advanced Access**.
3. Preencha:
   - [ ] **Como o app usa a permissão** (texto claro): "O FlowPilot (by Soveral Soul) agenda
         e publica posts (feed, carrossel, stories, reels) na conta de Instagram do próprio
         usuário, que autoriza o acesso. O usuário fornece as artes/legendas; o app apenas
         publica em nome dele, nos horários definidos." (texto pronto em `roteiro-video.md`)
   - [ ] **Screencast** demonstrando o fluxo completo (ver `roteiro-video.md`).
   - [ ] **Passos para o revisor reproduzir** (credenciais/instruções de teste).
4. Envie e acompanhe o status.

## O que o revisor precisa VER no vídeo (senão reprova)
- [ ] Usuário fazendo **login/autorização** do Instagram no seu app.
- [ ] A tela pedindo a permissão **`instagram_business_content_publish`**.
- [ ] O app **criando e publicando** um post de verdade.
- [ ] O post **aparecendo** na conta do Instagram.
- [ ] Como o usuário **revoga** o acesso (ou onde vê isso).

## Motivos comuns de REPROVAÇÃO (evite)
- Vídeo não mostra a permissão sendo usada de ponta a ponta.
- Política de privacidade ausente, genérica ou sem falar de exclusão de dados.
- App ainda em Development, ou negócio não verificado.
- Descrição vaga de "como usa a permissão".
- Sem instruções/credenciais pro revisor testar.

## Enquanto o Review não sai (dá pra vender e entregar já)
- Adicione a conta IG de cada cliente como **testador do app** (Roles > Instagram Testers).
  Com o app em Dev/checkpoint, você publica na conta deles sem Review. Serve pros
  primeiros clientes (há limite de testadores).
- Ao aprovar o Review, remove essa limitação e escala pra qualquer cliente.

## Ordem sugerida
1. Publicar a **política de privacidade** (URL).
2. Iniciar a **Verificação de Negócio** (demora, começa cedo).
3. Gravar o **vídeo** (roteiro pronto).
4. Preencher e **submeter** o App Review.

## Histórico do App Review

### 1ª submissão — 26/07/2026 → rejeitada em 11/08
- Aprovadas: `instagram_business_basic`, `public_profile`.
- Rejeitada: `instagram_business_content_publish`, Política do Desenvolvedor 1.6
  ("caso de uso inválido ou desnecessário para a funcionalidade principal").
- Causa real: o campo de uso só tinha roteiro de teste, sem descrever o produto, e a
  demo mostrava um botão "publicar post de teste" sem nenhuma agenda visível.

### 2ª submissão — 02/09/2026
O que mudou antes de reenviar:
- `/demo` mostra a **tabela da agenda** da conta conectada e o botão vira
  "Run the scheduler now". Tela inicial reescrita em torno da agenda.
- `/api/demo-reset` + botão "Not your account? Disconnect and connect another",
  para o revisor nunca herdar a conta de quem testou antes.
- Cron ignora o cliente `reviewer` (publica só pelo botão).
- Caminho de revogação corrigido: Settings → Website permissions → Apps and websites.
- `/termos` no ar; Configurações do app → Básico com os quatro URLs, e-mail
  `comercial@soveralsoul.com.br` e domínio `flowpilot.app.br`.
- Screencast regravado (`out/flowpilot/app-review-v2.mp4`, 74s, legendas EN):
  demo → consentimento com as duas permissões → agenda → Media ID → story no
  perfil → revogação. Fonte das legendas: `src/AppReview.tsx`.
- Campo de uso com as três seções pedidas pela Meta (funcionalidade, integração,
  experiência), o "how to test" e as notas de reenvio, tudo num campo só.

Enviado em 02/09/2026 via "Solicitar novamente", só `content_publish`.

### Se recusar de novo
Ler o motivo no painel (o e-mail não traz). Se for 1.6 outra vez, o próximo passo
é abrir um ticket no Suporte para Desenvolvedores citando o Media ID publicado
na demo e pedindo revisão humana.
