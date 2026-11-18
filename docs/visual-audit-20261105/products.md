# Auditoria visual independente — páginas de produto/solução

| Campo | Registro |
| --- | --- |
| Projeto | Site Institucional Telefonia Fácil (`2bx-systems/telefoniafacil`) |
| Estado | **Verificado em render local**; não é aceite de produto nem aprovação de staging |
| Responsável pela auditoria | Worker Claude — Task `task_2830a6038fc6`, Dispatch `ctx_16f13ed6d9e1` |
| Data | 2026-11-05, cerca de 18:55 -03:00 |
| Base auditada | Branch `feat/homepage-content-v2-draft`, HEAD `5c8cc8b`, **com alterações locais não commitadas**. SHA-256 (16 primeiros dígitos): `site.js` `55cf55f20c67a11c`, `site.css` `98957704b0511f46`. Assets servidos com `site.css?v=20261105-04` e `site.js?v=20261105-13` |
| Preview | `http://127.0.0.1:8765`: 12/12 rotas responderam HTTP 200, sem erro de console, sem requisição falha e sem overflow horizontal da página (`scrollWidth` igual à viewport) nas duas larguras |
| Próxima ação | Coordenador decide o P0 (seção 7) e o gate de CTAs (F-05). Nenhuma correção foi aplicada |

**Método.** Chromium headless próprio (Playwright, sem tocar no browser do coordenador), em 1440×900 e 390×844 (touch, mobile). Para cada rota: captura da primeira dobra, página inteira após rolagem completa e dump de DOM/CSS (seções, imagens, CTAs, grids, contraste, alvos de toque). Estados inspecionados: mega menu, menu mobile, FAQ aberto, teclado, carrossel do Chip e CTA fixo mobile. Evidência bruta fora do repositório, por restrição da tarefa, e temporária: `/tmp/claude-1000/-media-adriano-Projetos-Telefonia-Facil-Site-Institucional/091712da-4fbb-47b7-a1ff-2558848d9889/scratchpad/`.

**Legenda.** D = desktop 1440×900; M = mobile 390×844. Gravidade: **Crítico** = componente visivelmente quebrado; **Alto** = prejudica decisão, acesso ou credibilidade; **Médio** = enfraquece qualidade ou clareza; **Baixo** = acabamento. `F-nn` remete à tabela da seção 4.

---

## 1. Síntese

**Veredicto: não aprovável como está.** A base técnica é sólida (nada estoura a página, foco visível quase sempre, fonte carregada, responsivo funcional), mas há defeitos primários que nenhuma revisão de design deixaria passar, e as páginas de produto ainda são um único template com variações de superfície.

Cinco problemas definem o estado atual:

1. **Componente de preço quebrado em 5 de 12 rotas (F-01).** Em `/m2m/`, `/pabx/`, `/sip-trunk/`, `/telefonia-movel/` e `/ura/`, o card de plano único tem texto colidindo com lista e botão, em colunas de 39 a 72px. Está no ponto de maior intenção da página.
2. **Quatro cards em branco em `/pabx/` (F-02).** A seção "Onde PABX em Nuvem gera mais valor" mostra 380px de branco com degradê. Parece imagem que falhou ao carregar, mas nunca houve imagem no DOM.
3. **No mobile, as páginas de produto ficam quase indistinguíveis (F-04).** A imagem do hero some nas 9 rotas que a têm no desktop. O resultado é o mesmo fundo azul-marinho, H1 de duas linhas e dois botões, até no Chip, que é o produto para pessoa física.
4. **A ação principal contradiz o estado do site (F-05).** Header, hero, cards e CTA fixo empurram contratação e configuração, enquanto a faixa final da mesma página informa que a experiência de compras está em preparação.
5. **Direção visual genérica (F-06, F-10).** O DOM confirma que "famílias" de página mudam quase só a seção de recursos. O resto é igual em 8 rotas: faixa de 5 benefícios, cabeçalho de planos, FAQ e CTA. O anel verde repetido nas imagens e o retrato corporativo de aparência sintética reforçam a impressão de banco de imagens.

**O que funciona e deve ser preservado:** o Chip no desktop, que é a única página com voz própria; a escada de cards de `/empresas/`; o layout com trilho lateral de `/planos/`, que prova que o card de plano único funciona quando tem largura; o catálogo com fotos reais de `/equipamentos/`; e a paleta navy/verde, que é reconhecível.

**Problema comum × local.** 13 achados são sistêmicos e devem ser resolvidos uma única vez no template ou no CSS (F-01, F-04, F-05, F-06, F-07, F-10, F-12, F-14, F-15, F-16, F-17, F-18, F-19). Os demais são locais de família ou de rota.

---

## 2. Elementos comuns

Estes elementos são iguais nas rotas indicadas. As tabelas da seção 3 só comentam o que muda.

| Elemento | Observação | Achado |
| --- | --- | --- |
| Topbar | D: frase + telefone + e-mail. M: oculta. Alvos com 18px de altura | Baixo, F-18 |
| Header | `position: relative`, some ao rolar. Cinco itens mais dois botões; "Página de Compras" aparece duas vezes e "Soluções"/"Ver soluções" duplicam a mesma entrada | F-18 |
| Logo | Começa em x≈136, enquanto o conteúdo começa em x=130, por respiro interno do PNG | F-18 |
| Mega menu (D) | Duas colunas com 8 produtos e descrição. Sem falha observada. Não lista `/empresas/`, `/planos/` ou `/integracoes/` | F-08 |
| Menu mobile (M) | Tela cheia, `inert` no fundo, `aria-expanded` correto, itens ≥37px. **Hambúrguer sem foco visível** | F-16 |
| Faixa de benefícios | 5 itens idênticos nas 8 rotas de produto (D); "Segurança e conformidade" quebra em duas linhas e desalinha a faixa. M: oculta | F-06 |
| Faixa CTA final | Mesmo texto em 11 rotas; o Chip não a exibe | F-05, F-14 |
| CTA fixo mobile | Rotas de produto, após sair do hero: "Contratar esta solução →". Reserva de 76px evita cobrir o rodapé | F-05 |
| Rodapé | Idêntico em todas as rotas | F-19 |

---

## 3. Inventário e avaliação por rota

Cada linha é uma seção, na ordem da página. Quando não há defeito, a célula traz "Sem falha observada" e a evidência.

### 3.1 `/0800/` — família `presence` — D 3238px / M 5470px

| # | Seção | Avaliação específica |
| --- | --- | --- |
| 0 | Hero split + benefícios | D: boa leitura de H1 72px e foto em moldura de 590×379, mas o terço esquerdo da foto é um bloco escuro e o anel verde atravessa o torso da atendente (F-10). Dois CTAs com o mesmo destino (F-05). M: sem foto e sem benefícios (F-04). |
| 1 | "Um canal nacional para seus clientes" | D: lista com filetes limpa, porém a coluna esquerda fica vazia abaixo do texto por cerca de 230px (F-22). M: sem falha observada; ícone + título + texto alinhados em coluna de 390px. |
| 2 | "Monte seu canal de atendimento" | D: 5 cards em grade de 3 deixam um vazio à direita (F-11); "Mais escolhido" em 3 de 5 anula a ênfase (F-07); os CTAs dos cards não se alinham na base (F-12). Os dados são tabulares e pedem comparação (seção 6). M: 5 cards empilhados, leitura correta, mas comparar exige memorizar tarifas. |
| 3 | FAQ | D: sem falha visual; 4 itens em cards, abre com ×. `aria-expanded` fica invertido (F-15). M: botão ocupa a largura e a altura mínima é respeitada. |
| — | Faixa CTA | D/M: selo "ATENDIMENTO CONSULTIVO" com contraste de 2,16–3,13:1 (F-14). M: arco decorativo passa sobre o selo e o texto (F-29). |
| — | Rodapé | Comum; a rota aparece como "0800 Empresarial". Sem falha local. |

### 3.2 `/chip/` — sem família (`consumer-page`) — D 3698px / M 6511px

| # | Seção | Avaliação específica |
| --- | --- | --- |
| H | Header próprio | D: âncoras do produto e CTA em pílula, coerente com a página, mas o único botão em pílula do lote. "Para empresas" leva à home, não a `/empresas/` (F-08). A ordem do menu (Planos, Benefícios) inverte a ordem da página (F-27). |
| 0 | Carrossel com 3 slides | D: a melhor abertura do lote, foto grande e com personagem. Autoplay de 5,8s pausa em hover e foco (`site.js:384`). No slide 1, o parágrafo perde apoio sobre o céu (contraste não medido sobre foto). M: **perde a foto** (`consumer-slide-media` em `display:none`), virando fundo em degradê como as páginas B2B (F-04). A legenda abaixo do botão desalinha entre título e subtítulo, visível no slide 3 (F-27). No toque não há pausa nem setas (F-21). |
| 1 | "Seu plano vem com mais." | D: quatro colunas com divisórias, boa densidade. M: hierarquia clara em lista, mas o fundo navy emenda com o hero, sem separação (F-27). |
| 2 | "Conheça as opções de planos." | D: 5 cards em grade de 4 deixam o 30 GB órfão com três vagas vazias (F-11). "Valores e condições sob consulta" a 28px, repetido 5 vezes, pesa mais que a franquia, que é o dado que diferencia (F-11). O botão quebra em duas linhas. M: cinco blocos quase iguais; o texto repetido ocupa duas linhas em cada card. |
| 3 | "Do plano ao chip em poucos passos." | D: **sem falha observada**; três passos numerados, único uso legítimo de sequência no lote. M: empilhado sem perda. |
| 4 | "Tem alguma dúvida?" | D: boa variação, com lista aberta sem cards e bloco navy. Respostas com 4,12:1 a 14px (F-14). M: itens com 30px de altura no botão, abaixo do alvo de 44px (F-14); área de leitura correta. |
| — | Rodapé | Fala com empresas ("Conexões que impulsionam o seu negócio") numa página de pessoa física (F-19). |

### 3.3 `/empresas/` — família `ladder` — D 2479px / M 3718px

| # | Seção | Avaliação específica |
| --- | --- | --- |
| 0 | Hero tipográfico | D: H1 68px forte, mas a metade direita é vazia e nenhum visual sustenta o tema "empresa". M: sem falha observada; a ordem título/texto/CTA funciona e o primeiro card sobrepõe bem a base do hero. |
| 1 | Três cards em escada | D: **a melhor ideia de composição das páginas de solução**; os degraus expressam crescimento. Os três botões "Conhecer solução" são iguais e cada card lista vários produtos, mas leva a um só. O espaço interno sobra no card 3. M: a escada se perde, o que é aceitável; viram cards simples. |
| 2 | "Comece pela necessidade, não pelo jargão." | D: repete o mesmo raciocínio da seção anterior (F-26). Linhas com muito ar e mais três "Conhecer solução". M: sem falha observada; a lista lê melhor que no desktop. |
| — | CTA verde final | D/M: quebra bem o padrão navy e o contraste é 9,10:1 (navy sobre verde). M: arco sobre o texto (F-29). |
| — | Rodapé | Comum. Sem falha local. |

### 3.4 `/equipamentos/` — família `field` — D 5007px / M 11597px

| # | Seção | Avaliação específica |
| --- | --- | --- |
| 0 | Hero menta | D: única rota em que a imagem mostra o produto, mas o bloco escuro encosta no menta com corte seco e sangra à direita, fora da grade (F-25). Parágrafo com 4,30:1 (F-14). M: hero vira navy e perde a identidade menta (F-25), sem foto. |
| 1 | "A infraestrutura certa para sua comunicação" | D: quatro cards brancos sobre menta, limpos, cumprem a função. Subtítulo a 4,30:1 (F-14). M: quatro cards altos com muito vazio. |
| 2 | "Monte seu conjunto de equipamentos" | D: fotos reais são o ativo mais verdadeiro do lote, mas 12 cards idênticos somam 2946px, sem agrupar 9 telefones, 2 headsets e 1 adaptador (F-13). Escala das fotos irregular: H2U quase some, X210 lota a caixa. A tag "Disponível para locação" repete 11 vezes como barra de largura total. M: 12 cards e cerca de 8000px sem índice nem filtro (F-13). |
| 3 | FAQ | D: padrão. A intro cita portabilidade numa página de aparelhos (seção 9). M: padrão. |
| — | Faixa CTA | Comum, F-14. |
| — | Rodapé | "Equipamentos" não está listado (F-19). |

### 3.5 `/integracoes/` — família `hubline` — D 1179px / M 2214px

| # | Seção | Avaliação específica |
| --- | --- | --- |
| 0 | Hero branco centralizado | D: limpo, mas é o hero mais fraco; selo genérico "TELEFONIA FÁCIL" e nenhum visual. A rota parece página-placeholder. M: sem falha observada de layout; H1 36px, o menor do lote. |
| 1 | CRM / APIs / Operações | D: três nós ligados por linha, tratamento elegante, mas a linha sugere fluxo sem conteúdo que o explique (F-23). M: linha removida; sobram três blocos centralizados e soltos. |
| — | CTA suave | D/M: legível; subtexto com 4,43:1 a 13px (F-14). Único CTA da página, sem ligação com PABX, URA ou API (F-09). |
| — | Rodapé | Comum. |

**Geral da rota:** 1179px é pouco para um tema técnico, e a página não recebe nenhum link do site (F-08, F-09).

### 3.6 `/m2m/` — família `network` — D 2751px / M 3994px

| # | Seção | Avaliação específica |
| --- | --- | --- |
| 0 | Hero em topo + faixa de imagem | D: boa variação estrutural, com H1 à esquerda e ação à direita. A faixa de 1440×340 corta mal: mancha escura na borda direita e tablet decepado na base (F-10). O selo fica colado ao H1. M: sem imagem, igual às outras (F-04). |
| 1 | "Conectividade para máquinas e operações" | D: linha do tempo com 4 nós para itens que não são etapas; bolinha + ícone duplicam marcação (F-23). M: linha some; ícones soltos e bem legíveis. |
| 2 | "Configure sua operação conectada" | **D: card quebrado (F-01).** Colunas de 61/39/56/230px; "Sob consulta" cruza "Escopo definido" e encosta no botão. M: **sem falha observada**, layout em bloco correto. |
| 3 | FAQ | D: padrão. M: padrão. |
| — | Faixa CTA | Comum, F-14. |
| — | Rodapé | M2M não listado (F-19). |

### 3.7 `/numero-fixo/` — família `presence` — D 3254px / M 4979px

| # | Seção | Avaliação específica |
| --- | --- | --- |
| 0 | Hero split | D: H1 forte; a foto com bolhas de cidades é a mais "colagem" do lote (F-10), embora a ideia de presença local seja pertinente. M: sem foto (F-04). |
| 1 | "Presença local para vender mais" | Mesma composição de `/0800/`; D: coluna vazia (F-22). M: sem falha observada. |
| 2 | "Onde Número Fixo gera mais valor" | D: 4 cards só de texto, baixo peso e aspecto de preenchimento. Títulos de 16px, os menores do lote. M: cartões limpos, com folga vertical excessiva. |
| 3 | "Comece com o DDD ideal para sua empresa" | D: 2 cards centrados, boa proporção, CTAs desalinhados (F-12). **M: duas colunas de 173px (F-03):** preço estoura a caixa (142px em 127px), botão quebra em duas linhas e a seta encolhe para cerca de 6px. |
| 4 | FAQ | D: padrão. M: padrão. Sem falha local. |
| — | Faixa CTA | Comum, F-14. |
| — | Rodapé | Comum. |

### 3.8 `/pabx/` — família `platform` — D 3659px / M 6221px

| # | Seção | Avaliação específica |
| --- | --- | --- |
| 0 | Hero sangrado | D: maior impacto do lote (H1 84px), mas "para empresas" passa sobre a figura de fundo, e a legibilidade depende do escurecimento. M: sem foto (F-04). |
| 1 | "Uma central completa para sua operação" | D: bento forte, mas o bloco verde gigante é o elemento mais chamativo da página e não é ação (F-24). Três superfícies escuras seguidas fundem hero, faixa e seção. M: legível; cards escuros muito altos com vazio entre ícone e título. |
| 2 | "Onde PABX em Nuvem gera mais valor" | **D e M: quatro cards vazios (F-02).** Branco de 380px com degradê, sem imagem no DOM. |
| 3 | "Escolha a estrutura da sua central" | **D: card quebrado (F-01).** M: sem falha observada. |
| 4 | FAQ | D: padrão. M: padrão. |
| — | Faixa CTA | Comum, F-14. |
| — | Rodapé | Comum. |

### 3.9 `/planos/` — família `pricing` — D 6685px / M 15225px

| # | Seção | Avaliação específica |
| --- | --- | --- |
| 0 | Hero tipográfico | D: sóbrio, cumpre a função; sem falha observada. M: H1 de 52px é **maior que os 46,8px dos produtos** e ocupa quatro linhas (F-17). |
| 1 | Catálogo por categoria | D: trilho lateral com rótulos é a composição mais madura do lote, e aqui o card único **funciona**, o que serve de referência para F-01. Problemas: 8 grupos sem H2 (`H1 → H3`, F-13), quatro cards idênticos de "Projeto sob medida" e 0800 com vazio (F-11). M: 15225px sem índice nem âncora, o maior problema de orientação do lote (F-13). |
| — | Faixa CTA | Comum, F-14. |
| — | Rodapé | Comum. |

### 3.10 `/sip-trunk/` — família `network` — D 2846px / M 4117px

| # | Seção | Avaliação específica |
| --- | --- | --- |
| 0 | Hero em topo + faixa de imagem | D: os 45% esquerdos da faixa são escuridão sem informação, a cabeça é cortada pelo topo e o anel passa no peito da figura (F-10). M: sem imagem (F-04). |
| 1 | "Voz IP para operações que precisam crescer" | D: linha do tempo, igual ao M2M (F-23); aqui existiria uma relação real entre PABX e rede para desenhar (seção 6). M: sem falha observada. |
| 2 | "Escolha a capacidade da sua operação" | **D: card quebrado, o pior caso (F-01).** Preço (157px de conteúdo) cobre a lista; "Preço por canal: R$ 79,90" quebra em cinco linhas. M: sem falha de layout. "Mais escolhido" num plano único é vazio (F-07). |
| 3 | FAQ | D/M: padrão. O título menciona E1, ausente no hero (seção 9). |
| — | Faixa CTA | Comum, F-14. |
| — | Rodapé | Rotulado "E1 e SIP Trunk", diferente da rota (F-19). |

### 3.11 `/telefonia-movel/` — família `field` — D 2770px / M 4294px

| # | Seção | Avaliação específica |
| --- | --- | --- |
| 0 | Hero menta | D: foto com bloco navy duro de cerca de 190px à esquerda (F-25). **Três CTAs**, com dois verdes iguais, e "Planos para uso pessoal" compete com a ação principal (F-05, `site.js:201`). Parágrafo a 4,30:1 (F-14). M: vira navy, sem foto, três botões empilhados (F-04, F-25). |
| 1 | "Sua equipe conectada onde estiver" | D: composição idêntica à de `/equipamentos/`. Título repete o texto do primeiro card. M: cards altos com vazio. |
| 2 | "Monte o pacote de linhas da sua equipe" | **D: card quebrado (F-01).** M: sem falha observada. |
| 3 | FAQ | D/M: padrão. |
| — | Faixa CTA | Comum, F-14. |
| — | Rodapé | Telefonia Móvel não listada (F-19). |

### 3.12 `/ura/` — família `platform` — D 2966px / M 4298px

| # | Seção | Avaliação específica |
| --- | --- | --- |
| 0 | Hero sangrado | D: a imagem mais conectada ao produto, pois mostra um fluxo de atendimento, e H1 forte; a interface holográfica é o clichê mais "gerado" do lote (F-10). M: sem foto (F-04), perdendo o único visual que explicava a URA. |
| 1 | "Atendimento organizado desde a primeira chamada" | D: mesmo bento do PABX com outros textos (F-24); o bloco verde tem mais de 200px de vazio. M: legível; mesmas alturas excessivas. |
| 2 | "Configure sua jornada de atendimento" | **D: card quebrado (F-01).** Mantém o defeito em 1024, 1280 e 1920px. M: sem falha observada. |
| 3 | FAQ | D/M: padrão. |
| — | Faixa CTA | Comum, F-14. |
| — | Rodapé | URA não listada (F-19). |

---

## 4. Tabela de achados

Ordenada por gravidade. "Verificado" significa observado no render ou medido no DOM.

| ID | Evidência e local | Gravidade | Impacto | Recomendação |
| --- | --- | --- | --- | --- |
| **F-01** | Card de plano único em `/m2m/`, `/pabx/`, `/sip-trunk/`, `/telefonia-movel/`, `/ura/`, acima de 980px. `site.css:944` limita a 540px; `site.css:525-531` força 4 colunas (m2m: 61/39/56/230px; preço com 157px de conteúdo em caixa de 39px). A checagem de caixas não acusa colisão porque é o **texto** que transborda. Confirmado em 1024/1280/1920 no `/ura/`; 820px e 390px usam layout em bloco, sem falha | **Crítico** | Preço e escopo ilegíveis no ponto de decisão; aparência de site sem revisão | Tirar o limite de 540px da regra em `site.css:944` e usar a largura do container, como `/planos/` já prova, ou manter 540px e cancelar o layout horizontal. Uma alteração resolve as 5 rotas. Conferir 981–1200px |
| **F-02** | `/pabx/`, seção 2: 4 cards com 380px brancos. `site.js:50` traz o terceiro campo de `use` vazio, sem `<img>`; `site.css:558-560` assume imagem. Os arquivos `assets/images/pabx-*.webp` têm só 134×94px | **Crítico** | Parece falha de carregamento; destrói credibilidade em D e M | **Não** religar os webp de 134×94. Curto prazo: `min-height` automático sem imagem e fundo sólido no card. Definitivo: imagens aprovadas por segmento, ou tipografia sem foto |
| **F-03** | `/numero-fixo/` M: `.plans` em 173+173px, porque `site.css:943` vem depois das regras mobile e reabre 2 colunas. Preço 142px em caixa de 127px; botão em 2 linhas; seta ≈6px | Alto | Preço apertado e botão deformado na principal seção de conversão | Limitar a regra de 943 a `min-width:601px`. O mesmo seletor exige checar qualquer `.plans` com 2 filhos |
| **F-04** | M: `.hero-media{display:none}` (`site.css:214`), `.hero-benefits` oculto e `src` substituído por GIF de 1×1, nas 8 rotas de produto; `consumer-slide-media` oculto no Chip | Alto | Primeira dobra idêntica em 9 rotas; Chip perde o caráter de pessoa física; URA perde o único visual explicativo | Reintroduzir imagem com recorte de arte próprio para 390px (ex.: 16:10 abaixo do texto), priorizando Chip, URA e Equipamentos. Manter o ganho de peso com `srcset` |
| **F-05** | Header "Acessar Página de Compras" + hero "Contratar esta solução" + "Configurar adicionais" (mesmo `href`) + cards "Configurar este plano/locação" + CTA fixo mobile, todos para `../compras/...`. A faixa final diz que a experiência de compras está em preparação. `/telefonia-movel/` tem 3 CTAs; `/empresas/` tem "Começar contratação" e "Montar minha contratação" | Alto | Promessa contradita na mesma tela; escolhas falsas; conflita com o objetivo de CTAs informativos | **Depende do gate de copy.** Sem reescrever texto aqui, a orientação visual é: um único botão primário por dobra; não ter dois botões com o mesmo destino; "uso pessoal" como link secundário; decidir se o CTA fixo mobile permanece durante a transição |
| **F-06** | 8 rotas com `productPage`: mesma faixa de 5 benefícios, mesmo rótulo "Planos e soluções", mesmo aviso comercial, mesma intro de FAQ, mesmo CTA. Famílias (`site.js:403`) alteram sobretudo a seção de recursos | Alto | Páginas intercambiáveis; o usuário não sente que mudou de produto | Dar a cada produto um módulo próprio e rever ordem e presença das seções (seção 6). Benefícios por rota ou removidos onde não acrescentam |
| **F-07** | "Mais escolhido" em 3 de 5 planos de 0800 e no único plano de SIP Trunk. Evidência da afirmação não localizada | Alto | Destaque sem significado; possível alegação sem base | Máximo de um destaque por grupo e nenhum em plano único. Owner confirma se há dado que sustente o selo; se não houver, remover o destaque |
| **F-08** | Varredura de 25 páginas em 1440 e 390px: **zero links** para `/planos/`, `/empresas/` e `/integracoes/` (controle positivo: 24 páginas apontam para `/pabx/`). `site.js` remove links de `empresas/` fora do Chip, e o "Para empresas" do Chip aponta para `../` (`site.js:206`). `/chip/` recebe link de só 1 página | Alto | Três rotas auditadas estão inalcançáveis pela navegação; o Chip quase não é descoberto | Decidir por rota: reintegrar ou despublicar. Se ficarem: `/planos/` no header e rodapé, `/empresas/` no destino de "Para empresas", `/integracoes/` a partir de PABX e URA. Avaliar entrada para o Chip |
| **F-14** | Contraste. Selo da faixa CTA `rgb(10,122,76)` sobre navy: **2,16–3,13:1** a 12px, em 9 rotas. Menta: 4,30:1 a 16–17px em `/equipamentos/` e `/telefonia-movel/`. Chip: 4,12–4,15:1 a 12–14px. Integrações: 4,43:1 a 13px. Chip M: FAQ com alvo de 30px | Alto (selo) / Médio (demais) | Falha AA em todas as páginas de produto com CTA escuro | Usar o verde claro da marca no selo sobre fundo escuro, como o rótulo da seção escura do PABX. Escurecer em um passo o cinza sobre menta e o do Chip. Alvo de 44px no FAQ do Chip |
| **F-15** | FAQ: após abrir, o painel fica visível com `aria-expanded="false"` (medido em `/0800/`). Listener de `site.js:283` roda antes do `toggle` de `site.js:470` | Alto | Leitor de tela recebe o estado invertido nos FAQs das 8 rotas de produto | Unificar os dois listeners ou registrar o estado depois do `toggle` |
| **F-16** | Hambúrguer: ao tabular, `outline: none`, sem sombra e sem mudança de fundo. Causa em `site.css:917`, com `outline:0!important` | Alto | Usuário de teclado perde a posição na entrada principal de navegação | Retirar `outline:0` de `:focus-visible`; manter a limpeza só para `:focus` |
| **F-13** | `/planos/` M 15225px, `/equipamentos/` M 11597px e D 5007px; header não fixo; nenhum índice. `/planos/` não tem H2 nos 8 grupos | Alto | Orientação perdida; comparar exige rolagem longa | Índice de âncoras nos grupos (fixo no mobile). Agrupar equipamentos por tipo. Rótulos de `/planos/` como H2 |
| **F-10** | Imagens de hero: anel verde embutido em todas as 8 e no Chip; fórmula de retrato corporativo com aparência sintética; SIP com 45% vazio e cabeça cortada; M2M com mancha e tablet cortado; Número Fixo em colagem; bloco escuro em 0800, Móvel e Equipamentos | Médio | Sensação de banco de imagens; pouca prova real da operação | Retirar o anel como recurso de série. Priorizar foto real ou objeto do produto. Recortar por faixa, não por centro. Proveniência e licença são do owner (seção 8) |
| **F-11** | Linhas órfãs: 0800 (5 em 3) e Chip (5 em 4). Chip: "Valores e condições sob consulta" a 28px > franquia | Médio | Ritmo quebrado; hierarquia invertida | 0800: tabela comparativa. Chip: grade de 5 ou 3+2 centrado; franquia como maior elemento e a condição em nível menor, sem alterar o texto |
| **F-12** | CTAs desalinhados na base em cards de altura desigual (0800, Número Fixo, Chip 20 GB destacado). Equipamentos está correto | Médio | Grades parecem acidentais | `.plan` em coluna flexível com botão em `margin-top:auto` |
| **F-17** | H1: 84/72/68/58/56/52px sem lógica; M: `/planos/` 52px > produto 46,8px. H2 54px com -2,43px (-4,5%) e H1 com -5,5%, com letras encostando em peso alto. Salto de H2 54px para apoio de 14px. Botões a 13px | Médio | Tudo grita; títulos competem; texto de apoio some | Definir escala curta. Tracking até cerca de -2,5% em tamanhos grandes. Apoio de 16px. Botão de 14–15px. H2 de seção menor que 54px em páginas longas |
| **F-18** | Header não fixo; "Página de Compras" duplicada; só 10px entre link e botão; "Soluções" × "Ver soluções"; logo 6px fora do alinhamento; topbar com alvos de 18px | Médio | Header pesado e com ruído; desalinho visível em toda rota | Reduzir a um CTA (depende de F-05). Header fixo compacto. Cortar respiro do PNG ou compensar com margem |
| **F-19** | Rodapé lista 4 de 8 produtos; "E1 e SIP Trunk" ≠ "SIP Trunk"; "Clientes" leva a `cases/`, chamada de "Cases" no header; igual no Chip | Médio | Navegação secundária incompleta e rótulos divergentes | Espelhar os 8 produtos do mega menu; unificar rótulos (gate de copy); avaliar rodapé próprio para o Chip |
| **F-24** | `platform`: bloco verde de ramais/menus usa a cor do CTA, com vazio interno. Hero, benefícios e seção formam três blocos escuros | Médio | Verde deixa de significar ação; página perde respiro | Reservar verde sólido para ação. Destaque em navy claro ou menta. Separar hero e recursos com fundo claro |
| **F-25** | `field`: corte seco imagem × menta; imagem sangra fora da grade; M vira navy (`site.css:603` só acima do breakpoint) mantendo seção menta | Médio | Identidade da família some no mobile | Moldura com raio completo dentro da grade ou imagem recortada. Levar o menta ao hero mobile, ajustando contraste |
| **F-09** | `/integracoes/`: 2 seções, 1179px, sem visual e sem CTA próprio | Médio | Tema estratégico tratado como rascunho | Tornar diagrama de hub e ligar a PABX/URA, ou fundir em outra página (decisão de F-08) |
| **F-26** | `/empresas/`: seções 1 e 2 repetem a mesma triagem, com 6 "Conhecer solução" | Médio | Redundância dilui a boa ideia da escada | Fundir na escada, e usar a lista só se trouxer ângulo diferente |
| **F-23** | `network`/`hubline`: linha do tempo em conteúdo não sequencial; nó + ícone duplicados | Médio | Metáfora falsa de processo | Usar linha só para sequência ou relação real; substituir por diagrama (seção 6) |
| **F-27** | Chip: menu em ordem inversa à da página; navy do hero M emenda com navy de benefícios; legenda do hero M com título e subtítulo desalinhados | Baixo | Pequena desorientação | Alinhar ordem do menu; alternar fundo ou separar no mobile; alinhar a legenda à esquerda |
| **F-22** | `presence`: `section-head` em `sticky` sem efeito perceptível, com coluna esquerda vazia | Baixo | Vazio sem função | Ancorar elemento visual ou reequilibrar proporção |
| **F-21** | Alt de hero genérico ("0800", "URA"); carrossel sem pausa explícita no toque; pontos de 25×4px no desktop, compensados por setas | Baixo | Acessibilidade incompleta | Alt descritivo; botão de pausa; área de toque maior |
| **F-20** | Breadcrumb é texto, não link, e diverge do H1 ("URA" × "URA Personalizada"); colado ao H1 em `network` | Baixo | Falsa navegação | Tornar "Soluções" link; ajustar espaço |
| **F-28** | Seções com 74px fixos; M: espaço de cerca de 50px entre H2 e subtítulo, herdado do layout em duas colunas | Baixo | Ritmo monótono | Variar por peso da seção; reduzir o espaço no mobile |
| **F-29** | Arco decorativo da faixa CTA cruza selo e texto em M | Baixo | Ruído sobre texto | Deslocar o arco para fora da área de texto |

**Sem falha observada, verificado:** overflow horizontal nas 12 rotas e 2 larguras; erros de console e requisições; carregamento da Inter; skip link para `#conteudo`; foco visível nos 16 primeiros destinos de Tab de `/0800/` em desktop (anel navy em fundo claro e verde em fundo escuro); menu mobile com `inert`; CTA fixo sem cobrir o rodapé; 1 H1 acessível no Chip (slides inativos em `visibility:hidden`).

---

## 5. Comparação entre páginas

### Matriz

| Rota | Família | Tipo de hero (D) | H1 D/M | Seções | Altura D/M | Módulo exclusivo? |
| --- | --- | --- | --- | --- | --- | --- |
| `/0800/` | presence | Split, foto em moldura | 72/46,8 | 4 | 3238/5470 | Não |
| `/numero-fixo/` | presence | Split, foto em moldura | 72/46,8 | 5 | 3254/4979 | Não |
| `/pabx/` | platform | Foto sangrada | 84/46,8 | 5 | 3659/6221 | Sim, mas quebrado (F-02) |
| `/ura/` | platform | Foto sangrada | 84/46,8 | 4 | 2966/4298 | Não; mesmo bento do PABX |
| `/sip-trunk/` | network | Topo + faixa | 72/46,8 | 4 | 2846/4117 | Não |
| `/m2m/` | network | Topo + faixa | 72/46,8 | 4 | 2751/3994 | Não |
| `/telefonia-movel/` | field | Menta + foto à direita | 72/46,8 | 4 | 2770/4294 | Não |
| `/equipamentos/` | field | Menta + foto à direita | 72/46,8 | 4 | 5007/11597 | Sim, catálogo |
| `/planos/` | pricing | Só texto | 52/52 | 2 | 6685/15225 | Sim, trilho lateral |
| `/empresas/` | ladder | Só texto + cards | 68/42 | 3 | 2479/3718 | Sim, escada |
| `/integracoes/` | hubline | Só texto, branco | 56/36 | 2 | 1179/2214 | Parcial |
| `/chip/` | — | Carrossel fotográfico | 58/45 | 5 | 3698/6511 | Sim, tudo |

### Por critério

- **Hierarquia.** Cada página tem H1 claro, mas H2 de 54px em todas as seções achata a leitura (F-17). O preço raramente é o foco, mesmo quando deveria ser.
- **Composição.** No desktop há 4 tipos reais de hero nas rotas de produto, uma boa evolução. Abaixo da dobra, a mudança é pequena e no mobile desaparece.
- **Repetição de template.** Reduz personalidade em dois níveis: os pares `pabx/ura`, `sip/m2m`, `0800/numero-fixo` e `movel/equipamentos` são gêmeos internos, e as 8 rotas compartilham a mesma sequência. A repetição de header, rodapé e FAQ é saudável; a de benefícios, aviso comercial e card de "Projeto sob medida" não é, porque ocupa o espaço onde cada produto deveria se explicar.
- **Conteúdo visual.** Só Chip, Equipamentos e, parcialmente, URA mostram algo ligado ao produto. `/integracoes/` e `/empresas/` não têm visual. Número Fixo, PABX, 0800 e Móvel usam pessoas no escritório com o mesmo tratamento.
- **Ritmo.** Alternância previsível branco/cinza com 74px por seção. PABX e URA têm blocos escuros longos demais, e `/planos/` e `/equipamentos/` não têm pausa.
- **Identidade.** Paleta consistente e reconhecível. A assinatura visual, porém, é o anel verde, que parece efeito de geração, e não um recurso de marca. O logo com nós conectados é uma fonte melhor para linguagem própria.
- **Header/rodapé.** Consistentes, e o Chip varia de forma justificada. Pesados e incompletos (F-18, F-19).
- **CTAs.** Maior incoerência do lote (F-05). O vocabulário muda sem lógica de destino: Contratar, Configurar, Acessar, Começar, Montar, Conhecer.
- **Navegação.** Boa entrada por Soluções; três rotas órfãs (F-08); nenhuma orientação interna nas páginas longas (F-13); poucos links cruzados entre produtos relacionados, como PABX, URA e SIP.
- **Tipografia.** Inter bem carregada, identidade neutra. Tracking e pesos exagerados dão aspecto de template atual (F-17).
- **Imagens.** Tecnicamente boas (`srcset`, `fetchpriority`, sem falha de carregamento), artisticamente repetitivas (F-10).
- **Ícones.** Traço único e coerente, sem falha observada. O uso é genérico: mapa, engrenagem e servidor se repetem para conceitos diferentes em várias rotas.
- **Foco/contraste.** Foco bom, com a exceção grave do hambúrguer (F-16). Contraste bom em geral, exceto o selo da faixa CTA (F-14).
- **Responsividade.** Nada estoura, mas a adaptação é por remoção, e não por recomposição (F-04), e há dois casos reais: F-03 e H1 de `/planos/`.

---

## 6. Variações propostas

Todas usam a paleta, a Inter, os ativos e os dados **já publicados**, sem novos componentes de sistema e sem novas alegações. O objetivo é que cada produto ganhe um elemento que só faz sentido para ele. Nenhuma exige reescrever copy.

| Rota | Variação |
| --- | --- |
| `/0800/` | Trocar os 5 cards por **tabela comparativa**, com os dados que já existem (linha, franquia, fixo, móvel). No mobile, primeira coluna fixa ou seletor de plano. Resolve F-07, F-11 e F-12 de uma vez e diferencia a rota do Número Fixo |
| `/numero-fixo/` | Levar a seção de planos para perto do topo, pois há preço claro. Trocar os 4 cards de cenário por lista com filetes, para não repetir o padrão de card |
| `/pabx/` | Manter o bento e corrigir a cor (F-24). Segmentos sem foto, em faixa tipográfica, até haver imagem aprovada |
| `/ura/` | Substituir o bento gêmeo por um **diagrama de fluxo** a partir dos 4 recursos existentes (menu, fila, horário, PABX), retomando a ideia da imagem do hero e funcionando no mobile, onde a foto some |
| `/sip-trunk/` | Substituir a linha do tempo por um diagrama simples PABX → SIP Trunk → rede, relação já declarada no hero. Recortar a faixa para eliminar a área morta |
| `/m2m/` | Usar a linha como rota/topologia de dispositivos, ou 4 itens em grade simples. A faixa de imagem deve mostrar o veículo sem elementos cortados |
| `/telefonia-movel/` | Hero com pessoa real e moldura completa; "uso pessoal" como link que leva ao Chip, dando lógica à relação entre as duas ofertas |
| `/equipamentos/` | Abrir com grupos por tipo (9 telefones, 2 headsets, 1 adaptador) e usar recortes dos próprios produtos no hero. Padronizar a escala das fotos. Tag só no item destacado |
| `/planos/` | Manter o trilho e adicionar índice. Fundir os 4 "Projeto sob medida" em um bloco com quatro rótulos |
| `/empresas/` | Preservar a escada como composição central; remover a redundância da seção 2 |
| `/integracoes/` | Aproveitar os nós num hub central ligado a CRM, APIs e Operações, com ligação para PABX e URA |
| `/chip/` | Preservar a voz própria; reintroduzir fotografia no mobile e resolver a linha órfã |

**Variação de ordem.** As 8 rotas não precisam da mesma sequência. Produto com preço público começa pela oferta; produto consultivo começa pelo entendimento e termina com a conversa.

**Assinatura de marca.** Em vez do anel, derivar linhas e nós do próprio logo, usando esse traço com função (conexões reais em diagramas), e não como adorno em foto.

---

## 7. Plano de ação

### P0 — antes de qualquer staging ou aceite visual

| Item | Achados | Resultado esperado |
| --- | --- | --- |
| 1. Corrigir card de plano único | F-01 | 5 rotas legíveis, 981–1920px |
| 2. Resolver cards vazios do PABX | F-02 | Nenhum bloco em branco em D ou M |
| 3. Corrigir 2 colunas no mobile | F-03 | Número Fixo em 1 coluna a 390px |
| 4. Correções de acessibilidade pontuais | F-14 (selo), F-15, F-16 | AA no selo; estado de FAQ correto; foco no hambúrguer |
| 5. **Decisão dos owners** sobre CTAs | F-05 | Gate de copy define rótulos e hierarquia durante a transição |
| 6. **Decisão dos owners** sobre rotas órfãs | F-08 | Cada rota reintegrada ou despublicada |

### P1 — qualidade e diferenciação

| Item | Achados |
| --- | --- |
| Recompor hero mobile com imagem de arte própria | F-04, F-25 |
| Criar módulo próprio por produto, começando por 0800, URA e SIP | F-06, F-11, F-23, F-24 |
| Rever selos e destaques | F-07 |
| Alinhar cards e corrigir órfãos | F-11, F-12 |
| Dar orientação às páginas longas | F-13 |
| Definir escala tipográfica e tracking | F-17 |
| Rever direção de imagem, sem anel de série | F-10 |
| Simplificar header, com o resultado de F-05 | F-18 |
| Completar rodapé | F-19 |

### P2 — acabamento

Fortalecer `/integracoes/` conforme a decisão de F-08 (F-09); reduzir redundância em `/empresas/` (F-26); ajustes do Chip (F-27); coluna vazia (F-22); alt, pausa do carrossel e alvos (F-21); breadcrumb (F-20); ritmo (F-28); arco (F-29); contrastes de 4,1–4,4:1 (F-14).

---

## 8. Não verificado

- **Navegadores e dispositivos reais:** só Chromium headless. Sem Safari/iOS, Firefox ou Android real.
- **Larguras intermediárias:** só o card de plano único foi testado fora de 1440 e 390 (1920, 1280, 1024, 820 no `/ura/`). Tablets e notebooks estreitos não foram auditados.
- **Leitores de tela:** avaliei atributos e estados, sem teste com NVDA, VoiceOver ou TalkBack.
- **FAQ:** abertura testada no primeiro item de `/0800/`; a causa é comum, mas os demais não foram abertos um a um. O texto das respostas não foi auditado.
- **Carrossel:** com `prefers-reduced-motion`, avaliei o CSS, mas não testei se o timer de JavaScript para.
- **Contraste sobre foto ou degradê:** a medição automática ignora esses fundos; o selo da faixa CTA foi calculado nas duas pontas do degradê, e o texto sobre fotos só foi avaliado a olho.
- **Hover:** só o mega menu foi inspecionado. Hover de cards e botões não foi auditado.
- **Zoom de 200%, impressão, modo de alto contraste e JavaScript desativado.**
- **Desempenho:** sem métricas de LCP/CLS. Observei apenas `srcset`, `fetchpriority` e `lazy`.
- **Proveniência e licença de imagens:** "aparência sintética" é julgamento visual, não fato apurado.
- **`/compras/`:** fora do lote. Conferi apenas o `href` dos CTAs, sem avaliar o destino.
- **Varredura de links (F-08):** cobre 25 páginas no DOM renderizado; `/contratar/`, `/carrinho/` e `/checkout/` não entraram.
- **Veracidade comercial:** preços, selos e alegações não foram validados.
- **Staging e produção:** não acessados. Testes automatizados, build, commit e deploy não foram executados, conforme a restrição da tarefa.

---

## 9. Pontos para confirmação dos owners

Inconsistências de conteúdo vistas durante a auditoria. Registro para conferência, **sem proposta de alteração de copy ou preço**.

| Local | O que foi observado |
| --- | --- |
| `/0800/` e `/planos/`, "Linha 0800 + Franquia R$400" | O título cita R$ 400, a lista cita "Franquia R$ 300,00" e "Linha 0800 grátis", a R$ 400,00/mês |
| `/sip-trunk/` e `/planos/`, "Plano SIP Trunk" | R$ 59,90/mês em destaque e "Preço por canal: R$ 79,90" na lista |
| `/0800/`, `/sip-trunk/`, `/numero-fixo/`, `/equipamentos/`, `/chip/` | Base dos selos "Mais escolhido" e "Mais popular" |
| `/sip-trunk/` | FAQ e rodapé falam em E1; hero e rota não |
| Intro de FAQ das 8 rotas | Texto único cita portabilidade inclusive em `/equipamentos/` e `/m2m/` |
| `/planos/` × `/empresas/` | Títulos de hero muito próximos em sentido |
| `/chip/` × nota do plano | "Ver informações de compras" em todos os cards e nota dizendo que a contratação online está indisponível |
