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
