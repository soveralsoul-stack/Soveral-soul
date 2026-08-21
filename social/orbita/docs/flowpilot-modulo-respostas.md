# FlowPilot — Módulo de Respostas Automáticas (conceito)

## 1. A tese

O FlowPilot hoje cobre a ponta de cima do funil: gera conteúdo com identidade de marca e publica agendado. O ManyChat cobre a ponta de baixo: captura quem interage e conduz até a conversão. A tese deste módulo é que o FlowPilot pode cobrir as duas pontas com uma vantagem que o ManyChat não tem, porque a SoveralSoul já opera o cérebro da conversa no WhatsApp.

A arquitetura que já existe (agente que atende 24h, qualifica o lead e conduz à venda, com roteamento de modelos Sol, Terra e Lua) é agnóstica de canal por natureza. Uma mensagem que chega do Instagram não é diferente de uma que chega do WhatsApp: é texto de um contato, com um contexto. O que muda é só o transporte. Logo, o módulo não é "construir um ManyChat", é **plugar adaptadores de canal no motor que já roda**.

## 2. Estrutura de configuração (o vocabulário ManyChat, simplificado)

O usuário do FlowPilot configura automações com quatro blocos, na mesma lógica que já conhece do mercado:

**Gatilhos** (o que dispara)
- Comentário com palavra-chave em post ou reel (ex.: ÓRBITA)
- Mensagem direta com palavra-chave
- Resposta a story
- Menção em story
- Clique em anúncio (fase posterior)

**Condições** (quem e quando)
- Primeira interação ou contato recorrente
- Seguidor ou não seguidor
- Horário comercial ou fora dele
- Tag já aplicada (ex.: já recebeu o diagnóstico)

**Ações** (o que acontece)
- Resposta pública curta no comentário (private reply permite 1 resposta privada por comentário)
- Mensagem direta com texto, botão ou link
- Aplicar tag no contato
- Encaminhar para o WhatsApp (a ação estratégica: leva o lead para o canal onde o agente completo da SoveralSoul já opera)
- Escalar para humano

**Fluxos** (a sequência)
- Encadeamento visual das ações, com ramificação por resposta do contato

## 3. Os quatro diferenciais sobre o ManyChat

**a) Conteúdo e automação nascem juntos.** No ManyChat, o cliente cria o post em um lugar e a automação em outro, e metade esquece de configurar. No FlowPilot, quando a IA gera um post com CTA "comenta ÓRBITA", ela cria a automação da palavra-chave no mesmo ato. O CTA nunca nasce órfão. Nenhum concorrente faz isso hoje.

**b) Intenção em vez de palavra-chave rígida.** ManyChat dispara se a palavra bate. O FlowPilot usa o modelo Lua para entender intenção: "quero saber mais", "me manda o material" e "orbita" caem no mesmo fluxo. Palavra-chave vira atalho, não requisito.

**c) Roteamento Sol, Terra e Lua no atendimento.** A conversa começa na Lua (resposta em segundos, custo mínimo), sobe para Terra quando precisa qualificar com critério, e só aciona Sol quando vale (proposta, negociação). É o mesmo framework que a SoveralSoul publica como conteúdo, virando produto. Marketing e produto contam a mesma história.

**d) O funil termina no WhatsApp.** O objetivo do fluxo de Instagram não é prender a conversa no direct, é levar o lead para o WhatsApp, onde o agente completo (com CRM, agenda e histórico) já trabalha. O Instagram vira porta de entrada do sistema que já existe, o que também reduz a dependência das janelas de mensagem da Meta.

## 4. Realidade técnica (Meta, 2026)

- API oficial: Instagram Messaging via Meta, exige conta profissional e app aprovado com as permissões de mensagens e comentários
- Private reply: 1 resposta privada por comentário, dentro de 7 dias
- Janela de 24h: depois que o contato responde no direct, o bot tem 24h para mensagens livres; fora disso, só templates aprovados ou nova interação do usuário
- Proibido: DM em massa para quem não interagiu, follow/unfollow automatizado, scraping
- Obrigatório na prática: caminho de escape para humano e opt-out claro
- O envio automatizado deve sempre nascer de uma interação do usuário (comentário, DM, story), nunca de lista fria

## 5. MVP em fases

**Fase 1 (o caso ÓRBITA, já validável no seu perfil):** gatilho de comentário com palavra-chave, resposta pública curta, private reply com link do diagnóstico, tag no contato. Uma tela de configuração: palavra, post, mensagem, link.

**Fase 2:** intenção via Lua no lugar de keyword exata, fluxo com 2 ou 3 passos de qualificação no direct, handoff para WhatsApp com contexto da conversa.

**Fase 3:** builder visual de fluxos, tags e segmentos, métricas por automação (comentários capturados, DMs abertas, cliques, leads no WhatsApp).

**Fase 4:** caixa de entrada unificada Instagram + WhatsApp, com o mesmo agente e o mesmo histórico do contato.

## 6. Métrica de sucesso do módulo

Do post ao WhatsApp: percentual de quem comentou a palavra-chave que chegou ao WhatsApp com qualificação feita. É a métrica que une as duas metades do FlowPilot e que nenhum relatório de ManyChat entrega, porque o ManyChat não sabe o que o post prometeu.
