# Auditoria visual independente: páginas institucionais e de conversão

| Campo | Valor |
|---|---|
| Projeto | Site Institucional Telefonia Fácil (`2bx-systems/telefoniafacil`) |
| Rotas | `/carrinho/`, `/cases/`, `/checkout/`, `/compras/`, `/contato/`, `/conteudos/`, `/contratar/`, `/parceiros/`, `/politica-de-privacidade/`, `/seguranca/`, `/sobre/`, `/solucoes/`, `/suporte/`, `/termos-de-uso/`, `/trabalhe-conosco/` |
| Versão auditada | Branch `feat/homepage-content-v2-draft`, HEAD `5c8cc8b`, **mais alterações locais não commitadas** |
| Data e origem | 2026-11-05, Orca Task `task_b2ed3cfeac92`, Dispatch `ctx_dca7bb1b3a15` |
| Estado | **Relatado e verificado em Chromium headless. Não é aceite de produto nem aprovação de nenhuma rota.** |
| Alterações | Somente este arquivo foi criado. Nenhum teste, build, commit, push, merge, staging ou deploy foi executado. |
| Próxima ação | Coordenador/Atlas decide os gates listados ao fim da seção 7 e autoriza, ou não, o plano |

**Método.** O preview `http://127.0.0.1:8765` estava acessível e é servido por `python3 -m http.server` a partir deste checkout. Os 15 HTML e os arquivos `site.css`, `site.js` e `home-promo.css` servidos têm MD5 idêntico ao do working tree. As capturas usaram instância própria de `chrome-headless-shell` via CDP, com perfil próprio, sem tocar no browser do coordenador. Cada rota foi capturada em 1440×900 (DPR 1) e 390×844 (DPR 2, emulação mobile), acima da dobra e em página inteira, depois de rolar a página para disparar as animações `.reveal`. Revisei todas as capturas e extraí DOM/CSS computados.

**Convenção.** Coordenadas em px CSS, medidas em 1440×900 salvo indicação. `D` = desktop, `M` = mobile. Gravidade: **Crítica** (visivelmente errado ou impede mostrar a página), **Alta** (quebra objetivo da página ou requisito básico), **Média** (degrada qualidade percebida ou uso), **Baixa** (refino). Nos veredictos por seção: **Bom**, **Aceitável**, **Fraco**, **Reprovado**. "Bom" descreve aquela seção naquele critério, não aprova a rota.

**Limite de copy.** Achados marcados **[gate]** dependem de decisão de copy, jurídico, comercial ou owner. Registro o problema e a consequência visual, sem propor texto, preço, alegação ou reabertura de fluxo comercial. `/carrinho/`, `/checkout/`, `/contratar/` e `/compras/` foram avaliadas apenas como as telas que o Site apresenta hoje. Não presumo que `/compras/` seja a aplicação de Compras.

---

## 1. Síntese

O conjunto tem base técnica limpa e um sistema de composição real, mas falha no que essas páginas precisam fazer. Sem erro de console, sem HTTP ≥ 400, sem overflow horizontal detectado e com foco por teclado bem resolvido na maior parte do percurso. A variação por "família" de página é genuína e evita o template único. O problema não é falta de acabamento geral. É que **várias páginas têm forma de página pronta e conteúdo de rascunho**, e o único caminho de conversão ativo está mal resolvido.

O que mais pesa, em ordem:

1. **`/sobre/` tem um erro objetivo de layout.** O H1 invade a foto em 25 a 47 px em todas as larguras medidas de 1280 a 1920, e o "ar" de "aproximar" some em azul-escuro sobre foto escura. A causa é uma linha de CSS. O ajuste foi testado em memória e resolve 9 de 9 larguras (I-01).
2. **As páginas legais publicam instrução interna como conteúdo.** "O conteúdo jurídico final deve ser validado pela empresa antes da publicação." aparece como corpo de `/politica-de-privacidade/` e `/termos-de-uso/`, enquanto o site coleta dados pessoais em `/contato/` (I-02).
3. **O único caminho de conversão ativo não envia nada.** O botão de `/contato/` gerou 0 requisições de rede no teste. Ele só revela um link de 12 px que abre o cliente de e-mail, e o botão verde continua sendo o elemento mais forte depois disso (I-03).
4. **A compra desativada ainda é a ação dominante.** O CTA verde mais forte do header, em todas as rotas, leva a uma tela "em preparação". Em `/cases/`, o corpo tem 9 links para `/compras/` contra 1 para `/contato/` (I-04).
5. **Em telas até 1120 px, o menu não leva a contato nem a suporte** (I-05). Com a compra desativada, é a falha de navegação mais cara.
6. **Três páginas não têm saída nem entrada.** `/parceiros/` e `/trabalhe-conosco/` não dizem como proceder, e o único CTA de ambas é comercial. Elas e `/seguranca/` não recebem link interno: existem no sitemap, sem nenhum `href` em `site.js` (I-10 a I-12).
7. **Os nomes de produto em `/solucoes/` têm 12 px, verde a 3,09:1.** A descrição é maior que o título e o botão pesa mais que os dois (I-08).
8. **As páginas de prova não provam nada.** `/cases/` repete a mesma frase em 8 cartões e não apresenta caso algum. `/conteudos/` promete leitura e leva a páginas de produto (I-13, I-14).

**Pontos sólidos, verificados:** ausência de overflow em 2 viewports e 9 larguras intermediárias; skip link funcional e visível; anel de foco que muda de cor conforme o fundo; labels ligados aos campos; `/contato/` com formulário na abertura; telas de transição calmas e sem sugerir compra ativa; `noindex,follow` nas 4 rotas de compra.

**Estado por rota** (leitura do auditor, não aceite):

| Estado | Rotas |
|---|---|
| Bloqueada até decisão ou correção P0 | `/sobre/`, `/politica-de-privacidade/`, `/termos-de-uso/`, `/contato/` |
| Requer correção relevante | `/solucoes/`, `/cases/`, `/conteudos/`, `/parceiros/`, `/trabalhe-conosco/`, `/suporte/`, `/seguranca/` |
| Sustentável como transição, sujeita ao gate de copy | `/carrinho/`, `/checkout/`, `/compras/`, `/contratar/` |

---

## 2. Planejado, relatado e verificado

| Item | Classificação | Evidência |
|---|---|---|
| Render em desktop e mobile das 15 rotas | **Verificado** nesta auditoria | Capturas CDP; DOM e CSS computados |
| Ausência de exceção JS, erro de console e HTTP ≥ 400 | **Verificado** na carga das 30 combinações rota/viewport | Listeners `Runtime`, `Log` e `Network`: 0 ocorrências |
| Overflow horizontal | **Verificado** em 1440, 390 e em 1280, 1100, 1024, 981, 900, 768, 600, 360 e 320 | `scrollWidth = clientWidth` e nenhum elemento além da viewport, excluídas `.hero-media` e menu fechado |
| Percurso de foco | **Verificado parcialmente** em 6 rotas | `contato`, `seguranca`, `solucoes`, `cases`, `suporte`, `carrinho`, até 32 ou 46 Tabs |
| Envio do formulário | **Verificado** com dados fictícios na instância própria | 0 requisições após submit; nenhum e-mail enviado; cliente de e-mail não aberto |
| Correção de I-01 com `left:auto` | **Verificado em memória**, sem alterar arquivo | CSS injetado em 9 larguras |
| "Smoke sem overflow em 390 px" e risco de CTAs para a página em preparação | **Relatado** em `PROJECT_STATE.md`, reconfirmado aqui | Medições desta auditoria |
| Origem das fotos, relação com clientes, direitos de logos, alegações de segurança | **Não verificado** | Fora do alcance do preview |
| Plano P0/P1/P2 | **Planejado**, sem autorização de execução | Seção 7 |

---

## 3. Inventário

Altura total em px. `/compras` = links do corpo para `/compras/`; `/contato` = links do corpo e da faixa CTA para `/contato/`, excluídos header e rodapé. O header adiciona 2 links para `/compras/` em todas as rotas.

| Rota | Tipo | Família | H1 D/M | Altura D | Altura M | Seções em `main` | CTA final | `/compras` | `/contato` |
|---|---|---|---|---:|---:|---:|---|---:|---:|
| `/carrinho/` | Transição | `status` | 52/34 | 958 | 1306 | 1 | Nenhuma | 0 | 1 |
| `/checkout/` | Transição | `status` | 52/34 | 958 | 1306 | 1 | Nenhuma | 0 | 1 |
| `/compras/` | Transição | `status` | 52/34 | 958 | 1306 | 1 | Nenhuma | 0 | 1 |
| `/contratar/` | Transição | `status` | 52/34 | 958 | 1306 | 1 | Nenhuma | 0 | 1 |
| `/solucoes/` | Hub de conversão | `hub` | 60/40 | 3180 | 6444 | 4 | Escura | 0 | 7 |
| `/contato/` | Contato | `stage` | 56/36 | 1229 | 2365 | 1 | Clara | 0 | 1 |
| `/suporte/` | Contato de suporte | `desk` | 54/38 | 1253 | 1903 | 2 | Clara | 0 | 1 |
| `/cases/` | Prova | `wall` | 76/42 | 2234 | 4874 | 3 | Clara | 9 | 1 |
| `/conteudos/` | Conteúdo | `editorial` | 56/36 | 2442 | 3960 | 3 | Clara | 2 | 1 |
| `/sobre/` | Institucional | `manifesto` | 56/36 | 3273 | 5691 | 5 | Verde | 2 | 2 |
| `/seguranca/` | Institucional | `vault` | 56/36 | 1246 | 2193 | 2 | Escura | 0 | 1 |
| `/parceiros/` | Institucional | `split` | 56/36 | 1071 | 1904 | 2 | Verde | 0 | 1 |
| `/trabalhe-conosco/` | Institucional | `roster` | 54/38 | 1323 | 1820 | 2 | Verde | 0 | 1 |
| `/politica-de-privacidade/` | Legal | `legal` | 42/32 | 934 | 1508 | 2 | Clara | 0 | 1 |
| `/termos-de-uso/` | Legal | `legal` | 42/32 | 934 | 1508 | 2 | Clara | 0 | 1 |

As quatro rotas de transição têm capturas de página inteira **idênticas byte a byte** (mesmo MD5) em desktop e em mobile.

---

## 4. Avaliação seção por seção

### 4.0 Seções compartilhadas

Para não repetir, as rotas abaixo citam estes blocos. Cada tabela de rota lista-os na ordem real e registra só a variação.

| Bloco | Veredicto | Avaliação |
|---|---|---|
| **S1. Topbar** (y0–26, só acima de 1120 px) | Aceitável | Faixa discreta e bem contida. Mostra o telefone fixo e o e-mail, mas não o 0800. É a única presença de contato no topo e some abaixo de 1120 px. |
| **S2. Header** (y26–103; M: y0–71) | Fraco | Sete entradas com duas duplicidades: "Soluções" e "Ver soluções", "Página de Compras" e "Acessar Página de Compras". "Página de Compras" (x802–926) cola em "Ver soluções" a 10 px, enquanto os itens do nav têm cerca de 27 px entre si, e parece parte do botão. Sem estado de página atual (`aria-current` em 0 itens). `position:relative`, então some em páginas de até 6444 px. Ver I-04, I-22. |
| **S2m. Menu mobile** | Fraco | Boa estrutura: grupo com filete verde, alvos de 37–54 px, bloqueio de rolagem e Esc. Falha no conteúdo: sem contato nem suporte, e termina em "Acessar Página de Compras". Ver I-05. |
| **S3. Dropdown Soluções** | Aceitável | Painel limpo em 2×4, com nome e descrição, e abertura também por teclado. Descrições em 12 px. Sem link para `/solucoes/` dentro do painel. |
| **S4. Faixa CTA** (154 px D, 302 M) | Fraco | Título e texto idênticos em 11 rotas, com 3 variantes de cor escolhidas por clima, não por intenção. Leva o aviso de compras em preparação até para páginas legais e de suporte. Ver I-09. |
| **S5. Rodapé** (295 px D, 731 M) | Fraco | Grade organizada, mas com vocabulário diferente do header, sem Segurança, Parceiros e Trabalhe conosco, sem o telefone (19), tudo em 12 px. O logo desalinha 5 px do texto. Ver I-22, I-23. |

### 4.1 `/carrinho/`

Apresenta a tela de transição genérica, sem nada de carrinho.

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | O CTA primário do header leva a tela de conteúdo igual à atual. |
| 3 | Transição (`.page-hero`) | 103–663 / 71–575 | Aceitável | Bloco centrado, sem decoração, com 2 ações claras e 44 px de altura. Hierarquia correta e honesta, a melhor disciplina visual do conjunto. Texto `#617586` sobre `#f3f7fa` a 4,43:1, abaixo de 4,5:1. Linguagem do parágrafo em I-04 [gate]. |
| 4 | Rodapé S5 | 663–958 / 575–1306 | Fraco | Sem faixa CTA, o que é correto aqui. No mobile, o rodapé (731 px) é maior que a mensagem (504 px). |

### 4.2 `/checkout/`

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | Como em 4.1. |
| 3 | Transição | 103–663 / 71–575 | Aceitável | Render idêntico a `/carrinho/`. Quem chega por link antigo vê uma mensagem geral, sem referência ao que tentava fazer. Decisão de texto por rota é [gate]. Nenhum formulário de pagamento presente, conforme esperado. |
| 4 | Rodapé S5 | 663–958 / 575–1306 | Fraco | Como em 4.1. |

### 4.3 `/compras/`

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | Pior caso: "Página de Compras" e "Acessar Página de Compras" apontam para a própria página, sem indicação de que o visitante já está nela. |
| 3 | Transição | 103–663 / 71–575 | Aceitável | Tela coerente como aviso. O rótulo "Compras Telefonia Fácil" e o título ficam abaixo de um botão que manda "Acessar" o que a página diz não existir ainda. |
| 4 | Rodapé S5 | 663–958 / 575–1306 | Fraco | Como em 4.1. |

### 4.4 `/contratar/`

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | Como em 4.1. |
| 3 | Transição | 103–663 / 71–575 | Aceitável | Render idêntico. Formulário de contratação ausente, conforme a desativação. Meta description genérica de site, diferente de `/compras/`. |
| 4 | Rodapé S5 | 663–958 / 575–1306 | Fraco | Como em 4.1. |

### 4.5 `/cases/`

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | "Cases" no header não marca a página atual. O rodapé chama a mesma rota de "Clientes". |
| 3 | Abertura centrada | 103–589 / 71–582 | Aceitável | H1 de 76 px é o maior do conjunto, forte e legível. O peso é desproporcional ao que vem depois: uma promessa grande sem caso a seguir. O CTA primário leva à tela de transição (I-04). |
| 4 | Parede de clientes | 589–1219 / 582–2775 | Fraco | Grade 4×2 bem construída com fios compartilhados. O conteúdo destrói a ideia: 8 vezes "Cliente apresentado no site da Telefonia Fácil." em 12 px e 8 vezes "Quero uma solução assim" em verde a 3,09:1. Logos cinza a 78% de opacidade, Femina quase some, Joanópolis ilegível. No mobile, coluna única de 2193 px. Ver I-13, I-15. |
| 5 | Detalhe escuro | 1219–1786 / 2776–3842 | Aceitável | Bloco com bom contraste (7–10:1) que dá ritmo. É o único trecho com informação, mas redistribui os nomes dos mesmos clientes. O texto fala do próprio site em terceira pessoa ([gate], I-13). |
| 6 | Faixa CTA clara S4 | 1785–1939 / 3842–4143 | Fraco | Texto `#617586` sobre `#f3f7fa` a 4,43:1. O botão duplica o peso visual do CTA da abertura. |
| 7 | Rodapé S5 | 1939–2234 / 4143–4874 | Fraco | Sem variação. |

### 4.6 `/contato/`

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | O CTA primário afasta da única página que converte. |
| 3 | Abertura com formulário | 103–781 / 71–1332 | Fraco | Melhor composição do conjunto: fundo escuro, cartão branco, campos em 2 colunas, foco bem resolvido (verde no fundo escuro, navy no cartão). Falha no que importa: campos com `font-size:12px`, telefone sem `type=tel`, nenhum `autocomplete`, sem aviso de privacidade (I-16) e estado final fraco (I-03). No mobile, o cartão começa em y684 e o botão em y1181, depois de todos os canais. "Atendimento consultivo" aparece aqui e novamente na faixa abaixo (I-20). |
| 4 | Canais diretos (dentro da abertura) | 424–697 / y≈375–648 | Aceitável | Hierarquia clara, 26 px no H2. Telefones sem sublinhado e na cor do texto, com alvo de 20 px no mobile (I-27, I-34). "Enviar e-mail" compete com o botão do formulário. |
| 5 | Faixa CTA clara S4 | 781–934 / 1332–1634 | Reprovado | "Fale com um especialista" leva à própria página, logo abaixo de um H1 com o mesmo texto. Vira ruído exatamente no ponto de conversão (I-09). |
| 6 | Rodapé S5 | 934–1229 / 1634–2365 | Fraco | Sem variação. |

### 4.7 `/conteudos/`

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | Sem estado atual. |
| 3 | Abertura editorial | 103–373 / 71–439 | Aceitável | Assimetria boa, com título à esquerda, apoio à direita e fio navy de 2 px. Tem cara de publicação. O CTA verde leva à transição, não a um conteúdo (I-04, I-14). |
| 4 | Índice com destaque | 373–1192 / 439–1642 | Fraco | Cartão escuro de 589×705 px com ícone no topo, texto no meio e cerca de 200 px vazios acima e abaixo, sem imagem nem resumo que justifique o tamanho. H3 de 46 px antes de qualquer H2. Cada item tem 3 textos de ação empilhados, e o rótulo pequeno não é link. "Ler conteúdo" leva a páginas de produto (I-14). |
| 5 | Detalhe "Conteúdo prático" | 1192–1994 / 1642–2927 | Fraco | Lista 2×2 bem alinhada, repetindo os mesmos 4 temas da seção anterior com outra aparência. "Conhecer solução" em 12 px a 2,87:1, o pior contraste medido em texto de ação, com verde diferente do "Ler conteúdo" (`#0a7a4c`). O botão "Montar minha contratação" leva à transição. |
| 6 | Faixa CTA clara S4 | 1994–2147 / 2927–3229 | Fraco | Mesmo fundo `#f3f7fa` da seção anterior: as duas se fundem, separadas só por um fio. |
| 7 | Rodapé S5 | 2147–2442 / 3229–3960 | Fraco | Sem variação. |

### 4.8 `/parceiros/`

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | A rota não tem nenhum link de entrada (I-12). |
| 3 | Painel escuro | 103–623 / 71–330 | Fraco | Divisão 50/50 forte para pouco conteúdo. Rótulo padrão "Telefonia Fácil", uma palavra de título, uma frase e nenhuma ação. A composição promete um programa que a página não descreve. |
| 4 | Lista de frentes | 103–623 / 330–873 | Fraco | Ícones de 32 px bem alinhados e bom ritmo. Só 3 itens com 1 frase cada, sem link. Ícone de headset para "Relacionamento" repete semântica de atendimento. |
| 5 | Faixa CTA verde S4 | 623–776 / 873–1173 | Reprovado | É o bloco mais gritante da página, verde cheio em 1440 px, e fala com comprador, não com parceiro (I-11). |
| 6 | Rodapé S5 | 776–1071 / 1173–1904 | Fraco | Não cita Parceiros. |

### 4.9 `/politica-de-privacidade/`

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | O CTA primário de compras em página legal adiciona pressão comercial desnecessária. |
| 3 | Título | 103–315 / 71–296 | Reprovado | Forma adequada: coluna contida de x340, H1 de 42 px, tom sóbrio. O subtítulo publica a situação interna da página (I-02, [gate]). |
| 4 | Corpo (nota com filete) | 315–485 / 296–475 | Reprovado | Único conteúdo: uma frase-instrução. Não há texto a avaliar quanto a leitura, numeração, índice ou data de vigência. |
| 5 | Faixa CTA clara S4 | 485–639 / 475–777 | Reprovado | Maior que o corpo no mobile (302 contra 179 px). Em página legal, é o elemento comercial errado (I-09). |
| 6 | Rodapé S5 | 639–934 / 777–1508 | Fraco | Sem variação. |

### 4.10 `/termos-de-uso/`

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | Como em 4.9. |
| 3 | Título | 103–315 / 71–296 | Reprovado | Mesmo subtítulo da política, palavra por palavra (I-02, [gate]). |
| 4 | Corpo (nota com filete) | 315–485 / 296–475 | Reprovado | Mesma frase-instrução. |
| 5 | Faixa CTA clara S4 | 485–639 / 475–777 | Reprovado | Como em 4.9. |
| 6 | Rodapé S5 | 639–934 / 777–1508 | Fraco | Sem variação. |

### 4.11 `/seguranca/`

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | A rota não tem nenhum link de entrada (I-12). |
| 3 | Abertura escura com escudo | 103–433 / 71–444 | Aceitável | Clima adequado ao tema, H1 forte, contraste de 10:1. O escudo decorativo a 22% é o ícone mais genérico possível para o assunto. No mobile, ele fica atrás do H1 e do início do parágrafo (x257–374, y206–323). Rótulo padrão "Telefonia Fácil". |
| 4 | Três pilares | 433–798 / 444–1160 | Fraco | Colunas com fio esquerdo bem desenhadas, continuando o mesmo fundo. Três frases genéricas sem controle nomeado, certificação ou processo. Não invento o que falta: a verificação é [gate]. |
| 5 | Faixa CTA escura S4 | 798–951 / 1160–1462 | Fraco | Três blocos escuros seguidos separados por um fio. O CTA perde a função de fechamento e só o botão se destaca. |
| 6 | Rodapé S5 | 951–1246 / 1462–2193 | Fraco | Não cita Segurança. |

### 4.12 `/sobre/`

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | Sem estado atual. |
| 3 | Abertura com foto | 103–619 / 71–485 | Reprovado | H1 invade a foto (x763–808) e perde legibilidade. A foto deveria sangrar à direita e para em x1353, deixando 87 px brancos sem função (I-01). A foto some até 980 px, e o mobile fica sem imagem na abertura. |
| 4 | Três valores | 619–974 / 485–1318 | Fraco | Fio navy e boa tipografia, 26 px de título. Cada coluna traz legenda de 12 px e "Conhecer solução". Na terceira, a legenda diz para falar com a equipe enquanto o link diz outra coisa e vai para `/contato/` (I-25). |
| 5 | "Nosso jeito de trabalhar" (escuro) | 974–1540 / 1318–2344 | Aceitável | Bom contraste (8,5–9,8:1) e bom ritmo. A estrutura de 3 colunas repete a seção anterior com tema quase igual. |
| 6 | "Mais que telefonia" (história) | 1540–2249 / 2344–3790 | Aceitável | Foto e texto em 2 colunas, a seção mais equilibrada da rota. Abaixo, 4 pilares com texto em x134, 4 px fora do fio em x130, 12 px com entrelinha 18,6. Alt nomeia a pessoa como especialista da empresa (I-30). |
| 7 | Clientes | 2249–2826 / 3790–4659 | Fraco | Conteúdo em x160, 30 px fora do eixo x130 das demais seções (I-24). Logos coloridos de 72×52 px em células de 271 px, o tratamento menor do site para a prova mais forte (I-15). |
| 8 | Faixa CTA verde S4 | 2826–2978 / 4659–4960 | Aceitável | Aqui o verde cheio funciona como fechamento de uma página longa. |
| 9 | Rodapé S5 | 2978–3273 / 4960–5691 | Fraco | Sem variação. |

### 4.13 `/solucoes/`

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | "Soluções" no nav e "Ver soluções" ao lado levam ao mesmo lugar (o primeiro abre o painel). |
| 3 | Abertura com foto | 103–659 / 71–531 | Aceitável | A única abertura fotográfica em tela cheia e a mais impactante. Duas ações com hierarquia correta. Foto com aparência sintética e arco verde sobreposto (I-30). Faixa de 12 px de fundo azul sob a foto, y647–659 (I-18). Tracking de -3,3 px no H1. No mobile abaixo de 600 px a foto some. |
| 4 | Catálogo em mosaico | 659–2005 / 531–3808 | Fraco | O erro central da rota: nome do produto em 12 px dentro de H3 de 24 px, verde a 3,09:1, e 8 botões verdes idênticos. As imagens são artes de hero recortadas, com terço navy vazio (I-08, I-17). A ordem do mosaico (largo-estreito-estreito, estreito-estreito-largo, largo-largo) não comunica hierarquia. No mobile, 3277 px. |
| 5 | "Qual é o seu principal desafio hoje?" | 2005–2488 / 3808–5073 | Fraco | Boa ideia de roteamento por necessidade, executada sem roteamento: 5 itens para `/contato/`, com a mesma frase e 12 px (I-28). H2 de 54 px quase igual ao H1 de 60 px. No mobile, 170 px por item para 2 linhas de texto. |
| 6 | Faixa de confiança | 2488–2733 / 5073–5412 | Aceitável | Compacta e eficaz em 8 logos em linha. Cinza a 72% de opacidade. O título afirma com mais força do que a linguagem cautelosa de `/cases/` (I-13, [gate]). |
| 7 | Faixa CTA escura S4 | 2733–2885 / 5412–5713 | Fraco | "Atendimento consultivo" em `#0a7a4c` sobre azul-escuro a 2,44–3,07:1: bug de cascata, rótulo quase invisível (I-19). |
| 8 | Rodapé S5 | 2885–3180 / 5713–6444 | Fraco | Sem variação. |

### 4.14 `/suporte/`

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | A rota só é alcançável pelo rodapé (I-05). |
| 3 | Abertura menta | 103–374 / 71–387 | Aceitável | Fundo próprio, tom de serviço correto. Texto `#617586` sobre `#e9f6f1` a 4,30:1, o menor valor de texto corrido medido. Rótulo padrão "Telefonia Fácil" e H1 pouco informativo. |
| 4 | Canais | 374–805 / 387–870 | Aceitável | Decisão certa: número grande, 28 px, é a página que entrega a informação sem desvio. Mas o link fica no meio de uma frase, sem sublinhado e na cor do texto (`text-decoration:none`), e no mobile o alvo tem 23 px (I-27). Não informa horário, tipo de chamado ou caminho por tipo de cliente. Esses dados são [gate]. |
| 5 | Faixa CTA clara S4 | 805–958 / 870–1172 | Reprovado | Quem procura suporte recebe convite comercial maior que o último canal (I-09). |
| 6 | Rodapé S5 | 958–1253 / 1172–1903 | Fraco | "Central de ajuda" dá nome diferente à rota. |

### 4.15 `/trabalhe-conosco/`

| # | Seção | y D / y M | Veredicto | Avaliação |
|---|---|---|---|---:|
| 1 | Topbar S1 | 0–26 / oculta | Aceitável | Sem variação. |
| 2 | Header S2 | 26–103 / 0–71 | Fraco | A rota não tem nenhum link de entrada (I-12). |
| 3 | Título | 103–350 / 71–326 | Aceitável | Claro, mas com rótulo padrão e H1 de 54 px, menor que os títulos de área logo abaixo. |
| 4 | Áreas em tipografia gigante | 350–876 / 326–788 | Fraco | Composição com personalidade, a mais autoral do conjunto. Só que `H3` de 88 px com tracking -4,4 px é 1,6× o H1 e cria hierarquia invertida. Parecem links e não são. A descrição fica minúscula na outra ponta (I-10). |
| 5 | Faixa CTA verde S4 | 876–1028 / 788–1089 | Reprovado | Candidato recebe convite para comprar telefonia, e não há nenhuma ação de candidatura na rota (I-10). |
| 6 | Rodapé S5 | 1028–1323 / 1089–1820 | Fraco | Não cita Trabalhe conosco. |

---

## 5. Achados

"Evidência" indica o local exato. Status: **V** = verificado no render ou no DOM; **C** = verificado no código; **I** = inferência. **[gate]** = depende de decisão que não é de design.

| ID | Evidência e local | Status | Gravidade | Impacto | Recomendação concreta |
|---|---|---|---|---|---|
| **I-01** | `/sobre/`: H1 termina em x808 e a foto começa em x763 (45 px de sobreposição). Sobreposição do H1: 30 px em 1920, 42 em 1536, 47 em 1366, 25 em 1280. Parágrafo a 9 px da foto em 1440 e 5–8 px sobre ela em 1100 e 1024. Foto termina em x1353. Causa: `site.css:691` define `left:53%` e `site.css:951` define `right:0` com `width`, sem resetar `left`, então `right` é ignorado. | V, C | **Crítica** | Palavra do H1 ilegível na primeira dobra de uma página institucional. Erro básico e imediatamente visível. | Adicionar `left:auto` à regra de `site.css:951`. **Testado em memória:** em 1920, 1536, 1440, 1366, 1280, 1121, 1100, 1024 e 981 a foto vai até a borda direita, com folga mínima de 38 px para o texto. Validar visualmente depois de aplicado. |
| **I-02** | `/politica-de-privacidade/` e `/termos-de-uso/`, y103–485: "Página institucional preparada para receber o texto jurídico oficial..." e "O conteúdo jurídico final deve ser validado pela empresa antes da publicação." `site.js:100-101`. | V | **Crítica** [gate] | Instrução interna publicada. Duas páginas legais sem conteúdo, com rodapé apontando para elas e formulário coletando nome, empresa, e-mail e telefone. | Não exibir estas rotas como finais sem o texto oficial. Dono jurídico fornece o texto. Em seguida, aplicar layout legal: coluna de cerca de 70 caracteres, data de vigência, sumário por âncoras e numeração. Não redigir conteúdo jurídico por design. |
| **I-03** | `/contato/`: submit gerou **0 requisições**. Só aparece `.notice` de 12 px, abaixo do botão, com o link `mailto:` real em y≈448 (D). `site.js:478`. O botão verde permanece como elemento dominante. `#contactNotice` sem `aria-live` nem `role`. `README.md` declara o formulário como demonstrativo. | V, C | **Crítica** [gate] | Único caminho de conversão ativo depende de um segundo clique em link pequeno e de um cliente de e-mail configurado. Quem para no botão acredita ter enviado. Leitor de tela pode não anunciar a mudança. | Decisão de produto: manter `mailto:` ou conectar recebimento real, por gate próprio. Se mantiver `mailto:`, após o submit trocar o botão pelo passo seguinte em tamanho de botão primário, em vez de empilhar um aviso, e adicionar `role="status"` ao aviso. Não sugiro texto. |
| **I-04** | Header de todas as rotas: "Acessar Página de Compras" (243×44, verde, x1067) e "Página de Compras" levam a `/compras/`. Corpo: `/cases/` 9 links, `/conteudos/` 2, `/sobre/` 2. Rótulos variados: 6 formas diferentes de chamar a mesma tela. Em `/compras/` são autolinks. A faixa CTA repete que a compra está em preparação. | V | **Alta** [gate] | O elemento de maior peso no site leva a uma promessa adiada. Em `/cases/`, 90% dos links do corpo são beco sem saída. Rótulo do header contradiz a tela de destino. | Decidir no gate de copy o papel do link enquanto a compra estiver desativada. Decisão visual proposta: durante a transição, a cor primária do header pertence ao caminho que funciona, e o link de compras desce para peso de texto. No corpo, no máximo 1 CTA primário por seção. |
| **I-05** | Menu em ≤ 1120 px (`site.css:912-915`) e topbar oculta: 14 links, nenhum para `/contato/` ou `/suporte/`. `/suporte/` só tem entrada no rodapé. | V | **Alta** | Em celular e tablet, contato e suporte exigem rolar até o CTA ou o rodapé. Com a compra desativada, é a principal ação do site. | Incluir Contato e Suporte no menu, acima do CTA final, e adicionar o telefone como link direto. O espaço existe se o bloco de 8 produtos virar acordeão: hoje o menu ocupa 770 de 770 px disponíveis. Usar rótulos já existentes no site. |
| **I-06** | `.hamb` com foco: `outline:0!important`, sem `box-shadow`, `:focus-visible` ativo. `site.css:916-917` e `:440`. | V, C | **Alta** | Foco invisível no único controle de navegação até 1120 px, inclusive em janelas estreitas de desktop com teclado. | Remover `outline:0!important` das duas linhas e `box-shadow:none!important` do estado de foco. O anel global de `site.css:117` passa a valer. |
| **I-07** | `#0ca862` como texto: 3,09:1 no branco, 2,87:1 em `#f3f7fa`. Afeta "Quero uma solução assim" (8×), "Conhecer solução" em `/conteudos/` (4×) e nomes de produto em `/solucoes/` (8×), todos em 12 px. `#617586` sobre `#f3f7fa`: 4,43:1. Sobre `#e9f6f1`: 4,30:1. | V | **Alta** | Abaixo do mínimo WCAG AA de 4,5:1 em textos de ação e em texto corrido. Ação principal das células menos legível que o texto de apoio. | Trocar `#0ca862` em `site.css` (presente nas linhas 20, 121, 131, 133 e 314, conferindo quais usos são texto) por `--tf-green-ink` (`#0a7a4c`): 5,38:1 no branco, 5,00:1 em `#f3f7fa`, 4,85:1 em `#e9f6f1`. Escurecer `--tf-muted` para `#5a6e7f` dá 4,91:1 e 4,76:1 (calculado, revisar impacto no restante do site). |
| **I-08** | `/solucoes/`: `.solution-card h3` tem 24 px, mas o `a` interno tem 12 px (`site.css:20`). Render: "Número Fixo" com 12 px, 69×15 px, verde. Descrição: 14 px D, 12 px M. Botão: 229×38 px. | V, C | **Alta** | Hierarquia invertida na vitrine principal do site. O produto é o menor texto do cartão. A regra de 24 px dos cartões largos não tem efeito no nome. | `.solution-content h3 a{font-size:inherit;color:inherit}`: nome em navy e 17 px (24 px nos largos). Descrição em 14 px também no mobile. Reduzir `.solution-cta` a link de texto ou botão outline, pois o cartão inteiro já pode ser o alvo. |
| **I-09** | Bloco `.cta` em `site.js:29`: mesmo título e texto em 11 rotas, incluindo legais, suporte, trabalhe conosco e parceiros. Em `/contato/`, o botão aponta para a própria rota, abaixo de um H1 de mesmo texto. Variante de cor por família: verde em parceiros e trabalhe conosco, clara em contato e suporte. | V | **Alta** | Intenção errada onde o visitante não está comprando. A página com menos relação comercial recebe o bloco mais forte, e a página de conversão recebe um autolink. | Tornar o bloco opcional por tipo de página: remover de `/contato/`, das legais e de `/suporte/`. Em parceiros e trabalhe conosco, depende da ação definida em I-10 e I-11. Definir a variante pela importância do fechamento, não pela família. Se houver texto novo, passa pelo gate. |
| **I-10** | `/trabalhe-conosco/`: `H3` 88 px e `H1` 54 px; zero links no corpo; nenhuma instrução de candidatura; `site.js:92`. | V | **Alta** [gate] | Visitante chega ao fim sem saber como se candidatar. Títulos gigantes sugerem navegação inexistente. | Limitar títulos de área a 40–44 px, abaixo do H1, ou tornar cada linha um link real se existirem vagas. O owner define o canal de candidatura antes de qualquer ajuste. Sem canal definido, reavaliar a publicação da rota. |
| **I-11** | `/parceiros/`: 0 links no corpo, 3 itens de uma linha cada, `site.js:91`. Metade da viewport para um título de uma palavra. | V | **Alta** [gate] | Quem quer ser parceiro não tem passo seguinte. A composição monumental aumenta a percepção de vazio. | Owner define proposta e canal. Até lá, reduzir a abertura de 520 para cerca de 320 px e usar layout simples em 1 coluna, proporcional ao conteúdo real. |
| **I-12** | Zero ocorrências de links para `parceiros`, `trabalhe-conosco` e `seguranca` em `site.js`; as três existem em `sitemap.xml:19-22`. | C, V | **Alta** | Páginas órfãs: um visitante só chega por URL direta ou busca. Investimento de composição (três famílias próprias) sem audiência. | Decidir por rota antes de corrigir: publicar e linkar no rodapé, em "Institucional", ou retirar do sitemap até haver conteúdo. Não linkar `/parceiros/` e `/trabalhe-conosco/` antes de resolver I-10 e I-11. |
| **I-13** | `/cases/`: "Cliente apresentado no site da Telefonia Fácil." 8×; frases como "O site público da Telefonia Fácil apresenta..." aqui e em `/sobre/`; `/solucoes/` afirma "Grandes organizações escolhem nossa voz." | V | **Alta** [gate] | A rota chamada Cases não tem caso: nenhum desafio, solução ou resultado. O tom de ressalva parece nota de proveniência interna e enfraquece a prova. As duas páginas falam da mesma evidência com certeza diferente. | Comercial confirma o que pode ser afirmado por cliente. Enquanto isso, remover a frase repetida e o link por célula, sem texto novo, e transformar a parede em bloco de logos: um CTA ao final, cerca de 2×4 no desktop e 2 colunas no mobile. |
| **I-14** | `/conteudos/`: 8 links "Ler conteúdo" e "Conhecer solução" apontam só para `/pabx/`, `/numero-fixo/`, `/sip-trunk/` e `/telefonia-movel/`. Nenhum artigo existe. Mesmos 4 temas nas 2 seções. | V | **Média** [gate] | "Ler conteúdo" quebra expectativa ao abrir página de venda. Duas seções para o mesmo destino. | Decidir se a rota existe sem artigos. Se ficar como índice, unir as duas seções, dar a cada item um link único com rótulo coerente com o destino e remover o rótulo pequeno. Reduzir o destaque ou dar-lhe conteúdo real. |
| **I-15** | `assets/images/clients/*.png`: raster 110×80 px. Ampliação efetiva de até 1,9× em DPR 2 (`/cases/`), 1,4× (`/solucoes/`) e 1,3× (`/sobre/`). Três tratamentos: cinza a 78% (105×76), cinza a 72% (130×74), colorido (72×52). Nome "SUMPREV" e "Sumprev". Ordem diferente entre rotas. | V | **Média** | Prova social mole em telas retina e inconsistente. Femina e Joanópolis ficam quase ilegíveis em cinza. | Obter vetores ou PNG de no mínimo 440 px de largura. Padronizar um tratamento e uma ordem. Reforçar opacidade para logos claros, ou manter cor natural com altura óptica ajustada por logo. Conferir autorização de uso (seção 8). |
| **I-16** | `#contactForm`: inputs com `font-size:12px` em todas as larguras, `telefone` sem `type=tel`, sem `autocomplete`, sem `inputmode`, sem legenda para "*", sem aviso de privacidade. | V, C | **Média** | Digitação mais lenta e sem preenchimento automático no celular. Fonte abaixo de 16 px costuma acionar zoom ao focar em iOS (**I**, não testado). Coleta sem explicar uso de dados. | `font-size:16px` nos campos, `type=tel`, `autocomplete` (`name`, `organization`, `email`, `tel`). Legenda de campo obrigatório. Espaço reservado para aviso de privacidade, com texto vindo de I-02. |
| **I-17** | `/solucoes/`: imagens de 16:9 desenhadas como hero, recortadas com `object-position:72% 35%`. Telefonia Móvel e 0800 mostram cerca de um terço de navy vazio. Cartões largos 304×338 usam arquivo de 480×270, com ampliação de cerca de 1,25×. Vazio de cerca de 130 px entre descrição e botão. | V | **Média** | Miniaturas parecem cortes acidentais, e o mosaico não diferencia importância. | Enquadrar por imagem, com `object-position` individual. Fornecer versão 1:1 nos cartões largos ou limitar a altura. Decidir: grade uniforme 4×2, ou destaque com motivo real. |
| **I-18** | `/solucoes/`: `.hero` 556 px, `.hero-media` 544 px. Faixa de gradiente visível em y647–659. Conflito entre `min-height:556px` (`.hero`) e o `min-height` do `hub`. | V, C | **Média** | Linha azul sob a foto parece erro de render, no primeiro impacto da rota. | `body[data-family="hub"] .hero{min-height:0}`, ou esticar `.hero-inner` até a altura do `.hero`. |
| **I-19** | `/solucoes/`, y≈2777: rótulo da faixa CTA `#0a7a4c` sobre `#022135`–`#05344a`: 3,07 a 2,44:1. `hub` não está em nenhuma lista de `site.css:508-516`. | V, C | **Média** | Rótulo quase invisível. Na mesma variante, `/seguranca/` usa verde claro e dá 8–10:1. | Adicionar `body[data-family="hub"] .cta .section-label{color:var(--tf-green)}` (8–10:1). |
| **I-20** | Rótulo padrão "Telefonia Fácil" em 6 rotas (parceiros, política, segurança, suporte, termos, trabalhe conosco), vindo de `site.js:79`. "Atendimento consultivo" 2× em `/contato/`. Cor cinza nas legais e verde nas demais. | V | **Média** | Rótulo sem informação vira decoração automática e denuncia o template. | Tornar o rótulo opcional em `generic()` e omitir quando não acrescenta nada. Remoção não exige texto novo. |
| **I-21** | H1 de 42, 52, 54, 56, 60 e 76 px. H2 de 26, 30, 42 e 54 px. H3 de 12 a 88 px. Tracking de -1,26 a -4,4 px. H3 antes de H2 em `/cases/` e `/conteudos/`. | V | **Média** | A escala varia por página sem lógica de tipo. Títulos de seção competem com o H1. Estrutura de cabeçalhos pula nível. | Definir escala por tipo: legal 42, serviço 48–54, institucional e conteúdo 56, hub e prova até 64. H2 no máximo 42. Tracking de até -0,035em. Corrigir a ordem: usar H2 nos itens da primeira seção. |
| **I-22** | Header: 0 `aria-current`; `position:relative`; "Página de Compras" a 10 px de "Ver soluções"; logo PNG com 13 px de margem transparente (`-trim`: `+13+19`), texto começa em x136 contra eixo x130, no header e no rodapé. | V | **Média** | Sem orientação nem acesso à navegação em páginas longas. Desalinhamento discreto, mas perceptível em toda página. | Adicionar `aria-current="page"` com sublinhado de 2 px. Header compacto `sticky` nas páginas com mais de 3 viewports. Recortar o PNG ou aplicar margem negativa de 5 px. Unificar "Soluções" e "Ver soluções". |
| **I-23** | Rodapé e header usam nomes diferentes: Clientes/Cases, Fale conosco/Contato, Central de ajuda/Suporte, E1 e SIP Trunk/SIP Trunk. Só 12 px. Só 4 dos 8 produtos. Sem telefone (19). Sem dados societários. | V | **Média** [gate] | Vocabulário instável reduz confiança. Rodapé institucional não traz identificação da empresa. | Escolher um nome por rota e usá-lo no header, no menu, no rodapé e no `<title>`. Subir links para 13–14 px. Dados societários e endereço vêm do owner. |
| **I-24** | `/sobre/`: `.about-clients` com `padding-left:160px` (eixo de 1120) contra x130 das demais. `site.css:505` corrigiu `.institutional-detail,.about-story` e esqueceu esta classe. Pilares em x134. | V, C | **Média** | Quebra de eixo visível em página que já tem colisão no topo. | Incluir `.about-clients` na regra de `site.css:505`. Zerar o padding de 4 px dos pilares. |
| **I-25** | `/sobre/`: 3 valores, 3 passos e 4 pilares sobre temas parecidos. Legenda "Fale com nossa equipe" com link "Conhecer solução" para `/contato/`. 6 ações em 3 estilos. | V | **Média** | Excesso de blocos que dizem quase o mesmo. A história da empresa fica diluída. Texto do link diverge do destino. | Unir os 3 valores aos 3 passos em uma seção. Remover legendas pequenas e links dos valores. Dar destaque à história e aos clientes. Quantos pilares manter é decisão editorial. |
| **I-26** | `/seguranca/`: fundo contínuo em `main` + CTA escura = cerca de 850 px sem mudança de superfície. Escudo a 22% atrás do texto no mobile. Afirmações sem controle identificado. | V | **Média** [gate] | Página de confiança sem elementos que gerem confiança. Fechamento sem contraste de seção. | Usar faixa CTA clara. Ocultar o escudo abaixo de 600 px. Segurança/compliance fornece fatos verificáveis antes de expandir. |
| **I-27** | `/suporte/` e `/contato/`: links de telefone e e-mail com `text-decoration:none` e cor igual à do texto vizinho. | V | **Média** | Link sem affordance. O canal parece texto simples, justamente na página cuja função é o contato. | Sublinhado ou cor `--tf-green-ink`, mais ícone de ação. Em `/suporte/`, ligar a linha inteira. Destacar o número como bloco próprio se o texto puder ser separado em seus elementos. |
| **I-28** | `/solucoes/`, y2251–2421: 5 links para `/contato/`, todos com 12 px e o mesmo complemento. Seta "→" textual aqui e SVG no resto. | V | **Média** | Simula escolha, mas não roteia. Parece repetição mecânica. | Ligar cada desafio à solução correspondente, com mapeamento aprovado pelo comercial, ou reduzir a um CTA único com a lista como apoio. Títulos em 16 px no mínimo. Padronizar a seta em SVG. |
| **I-29** | Mesmo ícone: headset em 0800 e URA; celular em Telefonia Móvel, M2M e "Conectar equipes"; servidor para "Reduzir custos"; pessoas para "Acesso". | V | **Baixa** | Ícones decoram em vez de diferenciar. Dois produtos parecem iguais, e custo ganha metáfora errada. | Atribuir um ícone por conceito, do mesmo conjunto e traço (`stroke-width:1.8`). |
| **I-30** | Fotos de `/sobre/` e `/solucoes/` com aparência sintética, como tablet com rede brilhante e arco verde sobre a cena. Alt de `/sobre/` nomeia a pessoa como especialista da empresa. **Origem não verificada.** | V (aparência), I (origem) | **Média** [gate] | Visual de banco de imagens genérico, avesso à autenticidade esperada em Sobre. Alt pode afirmar vínculo que não existe, se a pessoa não for colaboradora real. | Confirmar a origem. Em `/sobre/`, priorizar foto real da equipe ou escritório, quando houver. Se a imagem for ilustrativa, usar alt descritivo sem atribuir vínculo. |
| **I-31** | Altura mobile: `/solucoes/` 6444, `/sobre/` 5691, `/cases/` 4874. `/solucoes/`: 62% dos caracteres abaixo de 13 px no mobile. | V | **Média** | Rolagem longa para pouco conteúdo. Com o header não fixo, o usuário perde navegação. | Cartões compactos de produto no mobile, com miniatura de 96 px e texto ao lado, logos em 2 colunas e desafios em lista densa. Meta: `/solucoes/` abaixo de 4000 px. |
| **I-32** | 4 URLs com render idêntico; `canonical` autorreferente em cada uma; meta description ausente em `/carrinho/`, `/checkout/`, `/parceiros/`, `/seguranca/`, `/trabalhe-conosco/` e genérica nas demais. Com JS desligado, testado em `/contato/`: `body.innerText` = 0, tela em branco. | V | **Baixa** | Página vazia se o JS falhar. Metadados não diferenciam a rota no compartilhamento e na busca. | Conteúdo estático mínimo por rota em `<noscript>`, ou pré-render. Meta description por rota, via gate de copy. Canonical das rotas de compra: decisão técnica à parte. |
| **I-33** | Até 980 px a foto de `/sobre/` some; até 600 px a de `/solucoes/` some. A rota perde a imagem que a identifica. | V | **Baixa** | Abertura mobile só com texto, parecida entre rotas. | Avaliar imagem compacta de 16:9 abaixo do texto, no máximo 200 px, com peso controlado. |
| **I-34** | Alvos no mobile com menos de 24 px de altura: telefones de `/contato/` (20) e `/suporte/` (23), "Ler conteúdo" (22), "Conhecer solução" em `/sobre/` (20), nomes de produto em `/solucoes/` (15). Hamburger 42×42. | V | **Média** | Toque impreciso em ações frequentes no celular. Não calculei a exceção de espaçamento do WCAG 2.5.8. | Altura mínima de 44 px por padding, sem alterar o tamanho visual. Hamburger 44×44 (a regra de `site.css:916` reduziu de 44 para 42). |

---

## 6. Comparação entre páginas

### 6.1 Por tipo de página

Os tipos não devem se parecer. O que falha é a correspondência entre forma e função, não a falta de uniformidade.

| Tipo | Rotas | Deve priorizar | Onde acerta | Onde falha |
|---|---|---|---|---|
| Conteúdo e prova | `/conteudos/`, `/cases/`, `/sobre/` | Leitura, evidência, credibilidade | Assimetria editorial; parede de logos; história em 2 colunas | Forma de publicação sem publicação; prova sem caso; 10 blocos em `/sobre/` |
| Hub de conversão | `/solucoes/` | Comparar e escolher | Abertura forte, ordem das ações | Nome do produto invisível, 8 botões iguais, roteamento fictício |
| Contato | `/contato/`, `/suporte/` | Ação direta e sem atrito | Formulário na dobra (D); canais grandes em `/suporte/` | Envio sem efeito real, campos de 12 px, links sem affordance, CTA comercial |
| Contratação (transição) | `/carrinho/`, `/checkout/`, `/compras/`, `/contratar/` | Explicar o estado e oferecer saída | Sobriedade, 2 saídas, sem faixa CTA, `noindex` | Header contradiz a tela; linguagem técnica no parágrafo [gate] |
| Legal | `/politica-de-privacidade/`, `/termos-de-uso/` | Leitura longa e neutra | Coluna contida e H1 menor, com tom correto | Sem conteúdo, nota interna exposta, CTA comercial |
| Institucional secundária | `/parceiros/`, `/seguranca/`, `/trabalhe-conosco/` | Informar e dar o próximo passo | Composições distintas e memoráveis | Órfãs, sem próximo passo, CTA de outro público |

A diferença mais reveladora é que as **telas de transição, com menos recursos, são as mais coerentes**. Elas dizem uma coisa, oferecem duas saídas e param. As páginas com composição mais ambiciosa, como `/parceiros/` e `/trabalhe-conosco/`, têm o menor conteúdo. Forma sem conteúdo é o que produz a sensação de site gerado por template, mesmo com variação real.

### 6.2 Por critério

| Critério | Comparação |
|---|---|
| **Hierarquia** | Boa em `/contato/` e transição. Invertida em `/solucoes/` (produto menor que a descrição) e `/trabalhe-conosco/` (H3 > H1). Fraca em `/conteudos/` (H3 de 46 px antes do primeiro H2). |
| **Composição** | Diversidade real: 11 famílias nas rotas auditadas. Melhor: `/contato/` e `/conteudos/` (abertura). Pior: destaque vazio de `/conteudos/`, 50/50 de `/parceiros/`. Erro objetivo: `/sobre/`. |
| **Repetição** | Faixa CTA 11×; "Quero uma solução assim" 8×; "Cliente apresentado..." 8×; "Conhecer solução" 8× em `/solucoes/`; complemento dos desafios 5×; 3 cartões com ícone em várias rotas. |
| **Identidade** | Navy e verde consistentes, Inter e logo presentes. Assinatura visual fraca fora disso: fotos genéricas e ícones de linha comuns. Trabalhe conosco é a página mais autoral. |
| **Header e rodapé** | Idênticos em todas as rotas, o que é consistente. Consistentemente mal resolvidos: excesso de ações, sem estado atual, rodapé com outros nomes. |
| **CTAs** | 6 rótulos para `/compras/`. 3 estilos de link textual e 2 verdes diferentes. Peso visual por local, não por importância. Variante da faixa ligada à família. |
| **Navegação** | 3 órfãs. `/suporte/` só pelo rodapé. Menu mobile sem contato. Sem breadcrumb nas rotas auditadas. Transição oferece 2 saídas corretas. |
| **Formulários** | Só `/contato/`. Estrutura correta (labels vinculados, validação nativa bloqueia envio vazio), execução fraca (I-03, I-16). Rotas de compra sem formulário, conforme esperado. |
| **Tipografia** | Inter carregada em todas as rotas. Excesso de corpos: 5 a 10 tamanhos por rota. 12 px como padrão de ação. 27–62% dos caracteres abaixo de 13 px, com parte relevante vinda do rodapé. Tracking agressivo acima de 50 px. |
| **Imagens** | Só `/solucoes/` e `/sobre/` têm fotos. Demais rotas sem imagem, com fotografia concentrada em 2 de 15. Enquadramento improvisado nas miniaturas. Logos em baixa resolução. |
| **Ícones** | Conjunto coerente em traço. Semântica fraca (I-29). Tamanhos consistentes por família. Escudo gigante em `/seguranca/` é o clichê mais evidente. |
| **Foco e contraste** | Bom: skip link, anel verde no escuro e navy no claro, inclusive no cartão do formulário. Reprovado: hamburger sem foco, `#0ca862`, rótulo CTA de `/solucoes/`. Texto sobre gradiente passou em todas as amostras exceto esse rótulo. |
| **Responsividade** | Sem overflow de 320 a 1440. Grades colapsam bem. Problemas de densidade, não de quebra: páginas longas, gaps de 170 px, coluna única nos logos, fotos removidas. |

### 6.3 Coerência da faixa CTA

| Variante | Rotas | Leitura |
|---|---|---|
| Verde cheia | `/sobre/`, `/parceiros/`, `/trabalhe-conosco/` | Forte onde o comercial importa menos. Só `/sobre/` se justifica. |
| Clara | `/cases/`, `/conteudos/`, `/contato/`, `/suporte/`, legais | Fraca em `/cases/`, onde o fechamento deveria ser forte. Funde com o fundo em `/conteudos/`. |
| Escura | `/solucoes/`, `/seguranca/` | Em ambas, sucede seção escura ou clara sem critério. Rótulo quebrado em `/solucoes/`. |
| Ausente | Transição | Correto. |

---

## 7. Plano

Plano proposto, **sem autorização de execução**. Alterações de código exigem ordem específica. Itens [gate] só avançam depois da decisão. Esforço: **P** até 1 h; **M** até meio dia; **G** mais que isso. Nenhum item altera preço, pagamento, produção ou infraestrutura.

### P0: antes de qualquer aceite visual

| Ordem | Achado | Ação | Quem | Esforço |
|---|---|---|---|---|
| 1 | I-01 | `left:auto` em `site.css:951` e reteste nas larguras da auditoria | Dev | P |
| 2 | I-02 | Obter texto jurídico ou retirar as rotas do estado final; depois aplicar layout legal | Jurídico, depois Dev | Dependente |
| 3 | I-03 | Decidir `mailto:` ou recebimento real; refazer o estado pós-submit e `role="status"` | Produto, depois Dev/Design | M, ou gate próprio |
| 4 | I-05 | Contato e Suporte no menu, com acordeão de produtos | Dev/Design | M |
| 5 | I-04 | Decidir o papel do link de compras no gate de copy; ajustar hierarquia do header e densidade no corpo | Copy/Comercial, depois Dev | M |

### P1: correções relevantes, baixo risco

| Ordem | Achado | Ação | Quem | Esforço |
|---|---|---|---|---|
| 6 | I-06 | Restaurar foco do hamburger | Dev | P |
| 7 | I-07, I-19 | Corrigir tokens de contraste e rótulo do `hub` | Dev | P |
| 8 | I-08 | Corrigir título dos cartões e reduzir o peso dos botões | Dev/Design | P |
| 9 | I-18, I-24 | Faixa do hero e eixo de `.about-clients` | Dev | P |
| 10 | I-09 | Tornar a faixa CTA opcional por tipo de página | Dev/Design | M |
| 11 | I-16, I-34 | Atributos, tamanho dos campos, alvos de toque | Dev | P |
| 12 | I-12 | Decidir publicar e linkar ou retirar as 3 rotas órfãs | Owner | Decisão |
| 13 | I-10, I-11 | Definir canal e ajustar composição proporcional ao conteúdo | Owner, depois Design | M |
| 14 | I-13, I-14 | Decidir o que `/cases/` e `/conteudos/` são; reduzir repetição | Comercial/Copy, depois Design | M |
| 15 | I-15 | Logos em alta resolução e um único tratamento | Marca, depois Dev | M |
| 16 | I-21 | Escala tipográfica por tipo de página e ordem de cabeçalhos | Design/Dev | M |

### P2: refino e consistência

| Ordem | Achado | Ação | Quem | Esforço |
|---|---|---|---|---|
| 17 | I-22, I-23 | Estado atual, header compacto, logo, vocabulário e rodapé | Design/Dev, Owner para dados | M |
| 18 | I-17, I-28, I-29 | Enquadramentos, roteamento dos desafios, ícones | Design | M |
| 19 | I-25, I-26, I-27 | Enxugar `/sobre/`, ajustar `/seguranca/`, affordance de canais | Design/Copy | M |
| 20 | I-20, I-31, I-33 | Rótulos opcionais, densidade mobile, imagem compacta | Design/Dev | M |
| 21 | I-30 | Validar origem das imagens e definir direção fotográfica | Marca | G |
| 22 | I-32 | Fallback sem JS e metadados por rota | Dev/Copy | M |

**Decisões que bloqueiam o plano (gates):** texto jurídico; forma de recebimento do contato; papel e rótulos do link de compras; o que pode ser afirmado sobre clientes; função de `/cases/` e `/conteudos/`; publicação de `/parceiros/`, `/trabalhe-conosco/` e `/seguranca/`; dados societários; origem das imagens e direitos de logos.

---

## 8. Não verificado e limitações

- **Dispositivos reais e outros browsers.** Só Chromium headless. Sem Safari, iOS, Android real ou Firefox. O zoom em iOS por campos abaixo de 16 px é inferência.
- **Tecnologia assistiva.** Nenhum leitor de tela. A falta de anúncio do aviso em I-03 é inferida da ausência de `aria-live` e `role`.
- **Abertura do `mailto:`.** Não cliquei no link final. O cliente de e-mail e o conteúdo real do rascunho não foram testados. O teste do submit usou dados fictícios, com 0 requisições, e nenhuma mensagem saiu.
- **Validação nativa.** A falha de campos vazios foi confirmada com `checkValidity()` (4 campos). O balão nativo não aparece em captura headless, e o idioma da mensagem depende do browser.
- **Foco.** Percurso em 6 de 15 rotas e até 32 ou 46 Tabs, sem cobrir todos os elementos de cada página. Armadilha de foco do menu e Esc foram lidos no código, não exercitados. O foco final depois do submit não é evidência, porque usei `requestSubmit()` por script.
- **Hover e animação.** Só o hover do dropdown foi exercitado. Demais estados de hover e `prefers-reduced-motion` foram lidos no CSS. Vídeo de transições não capturado.
- **Zoom de 200%, modo de alto contraste e tema escuro.** Não testados.
- **Contraste sobre foto.** Amostragem de pixels cobre gradientes, não texto sobre fotos. Na colisão de I-01, o juízo é visual. O contraste do escudo decorativo não foi medido.
- **Overflow.** `html` e `body` têm `overflow-x:hidden`, por isso medi também os retângulos dos elementos. `.hero-media` e menu fechado foram excluídos de propósito. Larguras intermediárias foram analisadas por métrica em todas as rotas e visualmente em amostra (`/sobre/`, `/parceiros/`, `/contato/`, `/solucoes/`, `/cases/`, `/trabalhe-conosco/`, `/suporte/`).
- **Comparação fora do escopo.** Home e páginas de produto não foram auditadas aqui. Citar header e rodapé "em todas as rotas" vale para as 15 rotas, embora o template seja compartilhado.
- **Ambiente.** O preview não reproduz `_headers`, `nginx.conf`, TLS, CDN ou cache de produção. Nada foi verificado em staging ou produção. Canonical medido é o do preview.
- **Conteúdo e fatos.** Não verifiquei relação com clientes, direitos de logos, origem das fotos, veracidade das alegações de segurança, adequação jurídica ou dados de contato.
- **Correção de I-01.** Comprovada por CSS injetado em memória e medição de geometria. Nenhum arquivo foi alterado. Precisa de reteste depois de aplicada.
- **Propostas calculadas.** Os valores de contraste de `--tf-muted` e `--tf-green-ink` foram calculados sem aplicação. As demais recomendações de CSS não foram testadas, salvo I-01.
- **Evidências.** A tarefa autorizou um único arquivo, então capturas e JSON ficaram apenas no scratchpad desta sessão, fora do repositório, e podem ser descartados. Todos os números aqui podem ser reproduzidos contra o mesmo preview enquanto o working tree não mudar.
- **Working tree.** A auditoria reflete alterações locais não commitadas. Qualquer mudança posterior nos arquivos pode invalidar coordenadas e medições.

**Esta auditoria não aprova nenhuma rota.** Aceite visual, copy, jurídico, owners e staging seguem abertos.
