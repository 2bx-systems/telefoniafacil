# Auditoria visual independente: Home (`/`)

| Campo | Valor |
|---|---|
| Projeto | Site Institucional Telefonia Fácil (`2bx-systems/telefoniafacil`) |
| Alvo | `index.html` renderizado em `http://127.0.0.1:8765/` |
| Versão auditada | Branch `feat/homepage-content-v2-draft`, HEAD `5c8cc8b` **mais alterações locais não commitadas** (32 arquivos modificados e 3 pastas não rastreadas). Cache-bust: `site.css?v=20261105-04`, `home-promo.css?v=20261105-17`, `site.js?v=20261105-13` |
| Data e origem | 2026-11-05, Orca Task `task_275d48fdea1e`, Dispatch `ctx_cd3bc017aeb0` |
| Estado | **Relatado e verificado em Chromium headless. Não é aceite de produto.** Nenhum arquivo além deste foi alterado |
| Próxima ação | Coordenador/Atlas decide os gates da seção 7 e abre o refinamento conforme o plano da seção 6 |

**Método.** O preview estava acessível; `index.html`, `site.css`, `home-promo.css` e `site.js` servidos foram comparados por hash e são idênticos ao worktree. Inspeção com Chromium headless próprio (Playwright, perfil isolado), sem tocar no browser do coordenador: capturas em 1440×900 (DPR 1 e 2) e 390×844 (DPR 2, modo mobile e touch), medição por `getBoundingClientRect`/`getComputedStyle`, tentativa de estados (hover, foco, dropdown, menu mobile) e amostragem de 12 larguras adicionais (320 a 2560 px).

**Convenção.** Coordenadas em px CSS. Gravidade: **Crítica** (visivelmente errado ou impede mostrar a página), **Alta** (compromete hierarquia, marca ou conversão), **Média** (acabamento perceptível), **Baixa** (polimento). **[Gate]** indica correção que depende de owner de copy, comercial ou asset; este relatório aponta o problema e não reescreve texto, preço ou oferta.

---

## 1. Síntese executiva

A home está tecnicamente limpa e visualmente correta, mas é anônima. O sistema de espaçamento funciona, o contraste passa, não há overflow e o foco é visível. Falta a página ter um ponto de vista: da dobra para baixo ela é uma planilha elegante. Eu não a mostraria como premium no estado atual.

O que mais pesa, em ordem:

1. **Linguagem interna exposta ao público.** "proposta de conteúdo", "aguardam validação comercial e técnica", "Condições comerciais em validação" e três "Proposta sujeita à confirmação" aparecem como texto de interface. Isso impede tratar a página como pronta. **[Gate]**
2. **O maior elemento da página é um preço que a própria página diz não estar confirmado.** O inteiro do preço tem 72 px no desktop, acima do H1 (64 px), e 66,3 px no mobile, 1,8× o H1 (36,66 px).
3. **O final da página desaba.** O fechamento é texto em uma coluna de 500 px sobre branco, com cerca de 680 px vazios à direita, sem separação da seção anterior nem do rodapé. O momento de maior intenção é o de menor energia visual.
4. **A prova social parece improvisada.** Logos raster de 110×80 px, moles em tela retina, com massa óptica desigual e 4 px entre linhas: SBCD praticamente encosta na Marinha do Brasil.
5. **O header desperdiça sua hierarquia.** Quatro das sete entradas disputam dois temas, e o elemento mais forte da primeira dobra aponta para `/compras/`, que é uma página de transição, enquanto o CTA do hero aponta para contato.
6. **A fórmula se repete até virar template.** São 6 rótulos "NN — Tema" com fio, 7 títulos em dois tempos com a última parte verde e 21 pares "título + uma linha" em quatro layouts. Depois do hero, não há nenhuma imagem de produto, diagrama ou fotografia em cerca de 6.000 px no desktop. É o que dá a aparência genérica de interface gerada por IA, mais do que qualquer defeito isolado.
7. **Há um bug objetivo no mobile.** O fio acima de "Consultar a equipe" tem 163 px em vez de 364 px, nas três ofertas. A correção é de uma linha.

O ativo mais forte é o hero, com composição e contraste sólidos, embora dependa de uma foto que reforça o clichê do setor e contradiz a mensagem de nuvem.

---

## 2. Estado por viewport

| Item | Desktop 1440×900 | Mobile 390×844 |
|---|---|---|
| Altura total | 6.813 px | 9.060 px (cerca de 10,7 telas) |
| Overflow horizontal | Nenhum | Nenhum; também nenhum em 320, 360, 600, 768, 1024, 1100, 1181, 1200, 1280, 1366, 1920 e 2560 |
| Primeira dobra | Header, hero e faixa de temas visíveis; kicker da prova social cortado na borda | Hero e foto visíveis, primeira linha da faixa de temas no limite |
| Erros de console, `pageerror` e requisições ≥400 | Nenhum | Nenhum |
| Fonte | Inter variável carregada, CLS 0 medido | Inter variável carregada |
| Contraste de texto | Passa AA em todos os pares medidos | Mesmos pares |
| Foco | Visível nos alvos testados | Não testado com teclado |
| Header fixo | Não (`position: relative`) | Não; somem menu e contato ao rolar |
| Situação | Sem quebra de layout; com achados de hierarquia e marca | Sem quebra de layout, exceto F08-3; com inversão de hierarquia e gutter estreito |

Larguras intermediárias foram só amostradas; ver seção 8.

---

## 3. Inventário das seções

| # | Seção (conteúdo/label) | Seletor | Y / altura desktop | Y / altura mobile | Fundo |
|---|---|---|---|---|---|
| 0 | Barra superior: "Comunicação que aproxima negócios", telefone, e-mail | `.topbar` | 0 / 26 | Oculta | Navy |
| 1 | Header/navegação | `.header` | 26 / 77 | 0 / 71 | Branco |
| 2 | Hero: "Mais chamadas. Mais produtividade. Mais negócios." e faixa de 5 temas | `.hero`, `.content-v2-tags` | 103 / 701 | 71 / 899 | Navy |
| 3 | Prova social: "Grandes organizações escolhem nossa voz." | `.trust` | 804 / 228 | 970 / 301 | Branco |
| 4 | 01 Atendimento Inteligente: "Atenda mais. Com a equipe que você já tem.", com painel "Agentes de IA" | `.solucoes-v2` | 1032 / 1176 | 1271 / 1673 | Branco |
| 5 | 02 Produtividade e Colaboração: "Sua equipe mais conectada…" | `.content-v2-muted` | 2208 / 749 | 2944 / 1039 | Tint |
| 6 | 03 Linha Virtual: "Números Virtuais. Contrate. Ative. Use." | `.content-v2-section` | 2956 / 680 | 3984 / 882 | Branco |
| 7 | 04 Voz sem Fronteiras: "Sua empresa conectada…" | `.content-v2-dark` | 3636 / 675 | 4866 / 953 | Navy |
| 8 | 05 Planos e Ofertas: "Tecnologia para sua empresa…" | `.content-v2-muted` | 4311 / 1034 | 5820 / 1244 | Tint |
| 9 | 06 Por que Telefonia Fácil?: "Tecnologia que simplifica…" | `.content-v2-section` | 5345 / 583 | 7063 / 835 | Branco |
| 10 | Fechamento "Fale com nosso time": "Sua empresa merece…" | `.specialist` | 5928 / 590 | 7898 / 431 | Branco |
| 11 | Rodapé | `.footer` | 6518 / 295 | 8329 / 731 | Branco |

---

## 4. Achados por seção

Os seletores de CSS referem `assets/css/home-promo.css`, salvo indicação de `site.css`.

### 4.0 Barra superior

**Registro:** alinhada ao grid (130 a 1310), contraste 11,29:1, links `tel:` e `mailto:` com foco visível. Nenhum defeito visual no desktop.

| ID | Evidência/local | Gravidade | Por que prejudica | Correção |
|---|---|---|---|---|
| F00-1 | Oculta em ≤980 px (`site.css:37`). No mobile, o menu não traz telefone nem e-mail. O primeiro `tel:` aparece em y≈8.847 de 9.060, no rodapé, e é outro número (0800) | Alta | Uma empresa de telefonia esconde o próprio telefone de quem está com o telefone na mão | Levar os contatos já existentes para o menu mobile, abaixo do CTA, com alvo ≥44 px. Ver F01-5 |
| F00-2 | "Comunicação que aproxima negócios" no topo; "Conexões que impulsionam o seu negócio." no rodapé | Baixa | Dois slogans na mesma página enfraquecem a assinatura | **[Gate]** Owner define um único |

### 4.1 Header e navegação

**Registro:** logo nítido em DPR 2, altura estável, dropdown abre por clique e fecha com Esc (`aria-expanded=false` lido de volta), menu mobile cabe em 844 px sem rolagem (770 px). Skip link presente e funcional.

| ID | Evidência/local | Gravidade | Por que prejudica | Correção |
|---|---|---|---|---|
| F01-1 | "Página de Compras" (801 a 925) e "Acessar Página de Compras" (1067 a 1310) apontam ambos para `./compras/`, separados só por "Ver soluções". "Soluções" e "Ver soluções" repetem o tema | Alta | Dois pares redundantes em 880 px. O visitante não distingue as opções e a marca parece indecisa | Manter uma única entrada para `/compras/` e tirar do header a redundância "Ver soluções". **[Gate]** para rótulo e prioridade |
| F01-2 | O botão de maior peso da dobra leva a `/compras/`, uma transição informativa; o CTA principal do hero leva a `/contato/`. Ambos verdes e visíveis na mesma dobra | Alta | Dois primários com objetivos diferentes: a página não diz qual é a próxima ação | Um único primário verde por dobra. Header com o mesmo objetivo do hero ou com botão secundário. **[Gate]** comercial |
| F01-3 | Gaps da navegação: 27, 27, 27, 30 e depois 10, 10 px. "Página de Compras" fica a 10 px de "Ver soluções" | Média | A última entrada de navegação cola no botão e o ritmo quebra | Separar grupos: 27 px dentro da nav e ≥32 px entre nav e ações. A correção de F01-1 resolve a maior parte |
| F01-4 | Botão do header: gradiente, sombra verde, `translateY(-2px)` no hover, 13 px/800, 44 px. Botões do conteúdo: chapados, sem sombra, sem elevação, 14 px/700, 48 px (`:56`) | Alta | São dois sistemas de botão. O do header carrega o "glow verde" que o conteúdo removeu de propósito, e parece de outro site | Mesmo componente: chapado, 14/700, sem elevação. Alturas 44 e 48 podem coexistir como tamanhos. Efeito global; validar nas internas |
| F01-5 | `.header{position:relative}` (`site.css:44`). Medido após rolagem em desktop e mobile: sai da tela (top −2174 e −3000) | Alta no mobile, Média no desktop | Em 9.060 px no mobile, o usuário perde menu e contato. `.product-sticky-cta` existe para produto, não para a home | Header compacto fixo com 60 a 64 px, ou barra inferior após o hero (`Falar` + `Ligar`), sem cobrir o conteúdo no fim da página |
| F01-6 | Tinta do logo em x≈136 no header e ≈135 no rodapé contra grid de 130; ≈18 contra 13 no mobile. O PNG tem respiro transparente | Média | O logo não alinha com o texto abaixo dele. Um diretor de arte vê isso na primeira dobra | Cortar o respiro do arquivo ou compensar (`margin-left:-6px`, proporcional no mobile). Preferir SVG: hoje é PNG 500×100 |
| F01-7 | Pesos do header: 760, 800 e 900 (dropdown); conteúdo: 600 e 700. Painel com raio 18 px; botões 10 px; hamburger circular de ≈42 px | Baixa | Pequenas divergências somam aparência de montagem | Nav em 600 a 650, títulos do painel em 600, raio do painel em 12 px, botão de menu com raio 10 px e ≥44 px |
| F01-8 | Menu mobile: "Soluções" sempre aberto com 8 itens, empurrando 4 entradas e o CTA para o fim | Baixa | Funciona, mas a lista de 8 domina e o CTA aparece só em y≈750 de 844 | Avaliar acordeão fechado ou destacar contato no topo do menu |

### 4.2 Hero e faixa de temas

**Registro:** melhor composição da página. Contraste de `#28e892` sobre navy 9,49:1; hierarquia clara eyebrow → H1 (64/1.04) → apoio (17/27,2) → CTAs. Ritmo 16/20/32 coerente. Olhar do retratado voltado para o texto, o que ajuda a leitura. Em 1920 px a composição se mantém. No mobile, tudo cabe em 844 px.

| ID | Evidência/local | Gravidade | Por que prejudica | Correção |
|---|---|---|---|---|
| F02-1 | Foto: executivo de terno sorrindo ao **telefone com fio**, skyline ao entardecer, arcos verdes luminosos sobrepostos. Visual sintético; procedência não verificada | Alta | É a imagem-padrão do setor e poderia ser de qualquer operadora. O telefone com fio contradiz "PABX em Nuvem", "softphone" e "Agentes de IA". Os arcos neon são o clichê "rede conectada" | **[Gate asset]** Substituir por material próprio: equipe real, atendimento em operação ou tela real do produto. Sem foto real, composição gráfica a partir do nó da marca |
| F02-2 | `filter:saturate(.58)` e `scale(1.1)` (`:72`). Em DPR 2 a imagem ocupa ≈2.666 px de dispositivo com arquivo de 1672 px, cerca de 1,6× de ampliação | Média | A foto fica lavada e levemente mole em telas retina; o saturate compensa a imagem em vez de corrigi-la | Exportar o asset final com a cor pretendida, sem filtro, e gerar variante ≥2.600 px |
| F02-3 | Faixa de 5 temas com divisores e ícones, parecendo abas. Não são links: CSS declara "informação, não navegação" | Alta | Tem aparência de navegação e não responde. É o primeiro bloco clicável por instinto | Transformar em âncoras para as seções existentes (01, 03, 04), com hover/foco, sem mudar texto. Alternativa: remover divisores, para não sugerir abas |
| F02-4 | Ícones: símbolo PABX lido como chip ou robô; `#` e balão com detalhe de 2 a 3 px que em 22 px vira ruído; segundo verde `#21d78b` em SVG | Média | O conjunto é autoral, mas sem metáfora clara, e o detalhe vira sujeira em tamanho real | Simplificar para um traço só em 22 px, sem detalhes abaixo de 2 px, e usar `currentColor` |
| F02-5 | Mobile: borda superior dura da foto em y≈551 contra o navy, enquanto no desktop a integração é por gradiente | Média | A foto vira retângulo colado, perde a sofisticação do desktop | Gradiente vertical de 48 a 64 px do navy para transparente no topo da foto |
| F02-6 | Mobile: `<source>` com GIF 1×1, `img` com `opacity:0` e foto como background CSS (`:231`). O preload só cobre ≥601 px, e `fetchpriority` atua sobre o GIF | Média | A foto do hero no mobile perde prioridade de carregamento e o `alt` descreve um GIF invisível | Variante própria recortada via `<source media>` com `srcset` real, removendo o hack do background |
| F02-7 | "Call Center e Comunicação Unificada" quebra em 2 linhas no desktop e 3 no mobile; demais itens têm 1 | Baixa | Quebra o ritmo da faixa, principalmente no grid de 2 colunas do mobile | No mobile, ocupar linha inteira para esse item (`grid-column:1/-1`) e deixar o par seguinte em 2 colunas |
| F02-8 | Eyebrow "Telefonia Fácil para empresas" logo abaixo do logo | Baixa | Repete a marca ≈120 px abaixo do logo | **[Gate]** Avaliar com copy |

### 4.3 Prova social

**Registro:** a estrutura título à esquerda e logos à direita é correta, e a coluna de logos começa no eixo 672, o mesmo de 01.

| ID | Evidência/local | Gravidade | Por que prejudica | Correção |
|---|---|---|---|---|
| F03-1 | Oito PNG de 110×80 confirmados. Desktop: 1:1 em CSS, mole em DPR 2. Mobile: 85 CSS em DPR 2, 170 px de dispositivo, ≈1,55× de ampliação. Legendas de Hortolândia e Femina ficam ilegíveis | Crítica | Logo borrado é a falha mais barata de ver e a mais cara em credibilidade: justamente o bloco que deve provar seriedade | **[Gate asset]** Obter vetor ou arquivo ≥440 px de largura por logo; exportar SVG ou 2× a 3× |
| F03-2 | Massa óptica desigual: SBCD e Marinha ocupam 80 px de altura; Sumprev e Consaúde, ≈25 px; Femina é fina e clara | Alta | A grade parece colagem. A Marinha pesa 3× a Sumprev e cria hierarquia involuntária | Normalizar por área óptica: wordmarks com 28 a 36 px de altura; brasões com 56 a 64 px; centralizar pelo centro óptico |
| F03-3 | `gap:4px 16px` (`:88`): em desktop, "SBCD" e o brasão da Marinha ficam a ≈10 px; em mobile, `gap:2px 8px` | Alta | Logos encostados violam área de respiro e transmitem improviso | Linha ≥32 px no desktop e ≥20 px no mobile; coluna ≥32 px |
| F03-4 | `grayscale(1)` com `opacity:.86`. Femina fica quase apagada | Média | A prova social fica desbotada e os logos claros somem | Opacidade 1 e cinza por asset ajustado; tom único próximo de `#4c6171` |
| F03-5 | Células centralizadas: a tinta termina em ≈1285 e o grid termina em 1310; começa em ≈710 e o eixo é 672 | Média | O bloco não encosta em nenhum dos dois eixos e fica flutuando | Alinhar a primeira coluna à esquerda da célula e a última à direita (`justify-self:start/end`) |
| F03-6 | H2 de 36 px, fora da escala das demais (46 px), e kicker de 14 px dizendo o mesmo. Sem segundo tempo verde, contrariando a regra 2 do cabeçalho do CSS | Baixa | Um terceiro padrão de título, em uma seção de só 228 px | Decidir: é título (46) ou legenda (kicker sem H2). **[Gate]** para remoção de texto |
| F03-7 | "Grandes organizações" sobre um conjunto que inclui câmaras municipais | Média | Se a percepção do visitante for de porte menor que o afirmado, a alegação enfraquece a prova. Uso de brasões oficiais e da Marinha não verificado | **[Gate]** Comercial/jurídico confirmam autorização de uso e adequação da frase |

### 4.4 Seção 01: Atendimento Inteligente

**Registro:** a tabela título/descrição é a melhor solução tipográfica da página: leitura rápida, colunas 672 e 952 estáveis, 6 linhas de 89 px. A medida do parágrafo está boa (≈55 caracteres). Contraste 6,45:1.

| ID | Evidência/local | Gravidade | Por que prejudica | Correção |
|---|---|---|---|---|
| F04-1 | Três camadas de encerramento em 368 px: painel com CTA outline (y 1864), lista de recursos, CTA verde (y 2064). Os dois CTAs levam a `/contato/` | Alta | Duas ações iguais a 152 px uma da outra. O verde fica ao lado do texto de menor valor | Fundir: lista de recursos antes do painel e um único CTA primário dentro do painel. Remover o duplicado |
| F04-2 | "Conheça os Agentes de IA" aponta para `./contato/`. Não existe página de Agentes de IA na raiz do repositório | Alta | O rótulo promete informação e entrega formulário: quebra de expectativa | **[Gate]** Ajustar destino ou rótulo |
| F04-3 | Painel navy com raio 12: única caixa preenchida do conteúdo, apesar da regra 3 do CSS ("não existe caixa… em volta de conteúdo não clicável"). "Agentes de IA" aparece 3 vezes em 288 px | Média | O painel é necessário como respiro, mas contradiz o próprio sistema e parece bloco promocional colado | Tornar a decisão explícita: faixa sangrada navy, sem raio, ou registrar exceção. Rótulo verde dispensável se o título bastar. **[Gate]** para cortes de texto |
| F04-4 | Fio navy entre as linhas 3 e 4 (`:101`), os demais `#c6d6df` (1,49:1). Nenhum rótulo explica os dois grupos | Média | Parece erro, não agrupamento. A intenção de separar benefícios de produtos não é legível | Dois subtítulos de 14 px para os grupos, ou fio único. **[Gate]** se precisar de texto novo |
| F04-5 | "Recursos em destaque" é uma frase corrida de 14 itens técnicos (TLS/SRTP, IP Defense, wallboard…) em 14 px, cinza | Média | Lista técnica em forma de parágrafo não pode ser escaneada | Lista em colunas ou chips não interativos com 3 a 4 grupos. Sem mudar termos |
| F04-6 | Mobile: seção com 1.673 px; parágrafo de 9 linhas, com o primeiro benefício ≈450 px abaixo do rótulo | Média | É a seção mais longa e o conteúdo escaneável chega tarde | Colocar os 3 primeiros benefícios antes do parágrafo, sem alterar texto |

### 4.5 Seção 02: Produtividade e Colaboração

**Registro:** fios leves, boa legibilidade, sem falsas caixas. Tipografia correta para o conteúdo. Mobile limpo, com 6 linhas regulares.

| ID | Evidência/local | Gravidade | Por que prejudica | Correção |
|---|---|---|---|---|
| F05-1 | Texto das colunas em x=130, 547,3 e 940,7 (`:123`): intervalos 417 e 393 px, pois a 1ª coluna não tem padding | Média | Colunas iguais com passo desigual: o olho percebe a primeira mais larga | Usar `column-gap:48px` e fio em pseudo-elemento: colunas de ≈361 px, texto em 130, 539 e 948 |
| F05-2 | Parágrafo de abertura em x=945,5 contra a 3ª coluna de texto em 940,7: erro de 4,8 px. Mesmo eixo sem relação em 04 | Média | Um quase alinhamento é pior que um desalinhamento franco | Reescrever `.content-v2-heading` em 3 colunas com o mesmo gap da matriz: H2 em 2, parágrafo na 3ª, mesma coordenada |
| F05-3 | **Única seção de oferta sem ação**; "Recursos:" termina a seção à esquerda, vazio à direita (x 890 a 1310) | Média | O leitor interessado não tem saída e a seção termina sem conclusão | Replicar o rodapé `.content-v2-foot` (nota à esquerda, ação à direita) usando CTA existente. **[Gate]** para rótulo |
| F05-4 | Seis "título + uma linha" sem qualquer imagem ou ícone | Média | É a típica grade de features, parecida com a de 01, 04 e 06 | Ver T1 e T3: inserir evidência real (tela do softphone, diretório) ou usar composição distinta |

### 4.6 Seção 03: Linha Virtual

**Registro:** é a seção com mais personalidade da página: o título grande com ritmo em quatro tempos tem presença. Coluna direita bem hierarquizada. CTA primário bem posicionado no fim da leitura.

| ID | Evidência/local | Gravidade | Por que prejudica | Correção |
|---|---|---|---|---|
| F06-1 | Mobile: H2 de 44,46 px (`:216`) contra H1 de 36,66 px (`:203`): 1,21× maior. Ocupa 231 px e 5 linhas | Alta | Inverte a hierarquia: uma seção interna grita mais que a proposta principal | Máximo 34 px no mobile (abaixo do H1). `span` em linha para "Contrate. Ative. Use." reduz para 3 linhas, sem alterar texto |
| F06-2 | Desktop: H2 de 64 px igual ao H1. Três linhas inteiras em `#0a7a4a` a 64/700 | Média | Empata com o H1 e cria a maior mancha desse verde, que não está no logo | H2 de 56 px; ver T5 sobre o verde |
| F06-3 | Coluna esquerda termina em y≈3410 e a direita em 3540: vazio ≈130×547 px | Baixa | Pequeno desequilíbrio. O título suporta, mas o vazio é sem intenção | `position:sticky` no título ou alinhar o CTA ao pé do título |
| F06-4 | "Condições comerciais em validação" como subtítulo de 18/600, com mesmo peso de um benefício | Crítica | Status interno com hierarquia de conteúdo: comunica que a oferta não existe, enquanto o título diz "Contrate. Ative. Use." | **[Gate]** Owner comercial decide o que é exibido antes de qualquer publicação |
| F06-5 | Ícone de check verde em lista de 3 itens | Baixa | Elemento clássico de landing page; é o único ícone de conteúdo abaixo do hero, além das setas | Usar fio ou marcador derivado do nó da marca, se o sistema T3 for adotado |
| F06-6 | Label "03 — Linha Virtual", H2 "Números Virtuais", corpo "Números fixos", oferta "Linha Virtual" | Média | Quatro nomes para um produto; ver T9 | **[Gate]** Taxonomia única |

### 4.7 Seção 04: Voz sem Fronteiras

**Registro:** o navy é a única mudança forte de ritmo após o hero, e isso funciona. Contraste 10,74:1. Rótulo e fios adaptados. Mobile limpo. CTA verde sobre navy é o CTA mais bem resolvido da rolagem.

| ID | Evidência/local | Gravidade | Por que prejudica | Correção |
|---|---|---|---|---|
| F07-1 | "Números fixos corporativos" quebra em 2 linhas: descrição em y=4057,9 contra 4034,5 nas demais, desnível de 23,4 px | Média | A primeira coluna derruba o alinhamento da fileira | `grid-template-rows: subgrid` em cada `article`, com título e descrição em linhas compartilhadas |
| F07-2 | Largura de texto 215/195/195/195/216 (`:148`): primeira e última colunas sem padding externo | Baixa | Mesmo problema de F05-1 | Gap uniforme com fio em pseudo-elemento |
| F07-3 | Eixos: parágrafo em 945,5, divisores em 366, 602, 838 e 1074 | Média | Título e grade abaixo não compartilham nenhuma coordenada | Ver T4 |
| F07-4 | Cinco produtos sem hierarquia nem link. O rodapé e o menu já ligam páginas de produto (`/numero-fixo/`, `/0800/`, `/sip-trunk/`, `/telefonia-movel/`) | Alta | É a vitrine do portfólio e não leva a lugar nenhum; só um CTA genérico. Perde navegação de quem já sabe o que quer | Transformar em links para páginas existentes (0800, SIP Trunk, Número Fixo, Móvel), sem alterar texto. Conferir destino de WhatsApp Call |
| F07-5 | "Sem limites para conversar." ao lado de "Disponibilidade, cobertura… precisam ser confirmadas" | Média | Título absoluto e ressalva na mesma seção criam ruído de confiança | **[Gate]** Owner de copy reconcilia |

### 4.8 Seção 05: Planos e Ofertas

**Registro:** sem selo de "mais popular" nem cards, o que é uma decisão boa. Uso de `tabular-nums`. Foco próprio visível (2 px, offset 4). Em 768 px, em revisão de baixa resolução, o layout 45/55 se manteve legível.

| ID | Evidência/local | Gravidade | Por que prejudica | Correção |
|---|---|---|---|---|
| F08-1 | "Conheça as opções descritas na proposta de conteúdo. Preços, itens incluídos e disponibilidade aguardam validação comercial e técnica." | Crítica | É texto de bastidor na interface. "proposta de conteúdo" não significa nada para o cliente | **[Gate]** Não publicar assim. Owner comercial define texto e se a seção vai ao ar |
| F08-2 | Inteiro do preço com 72 px (`:247`), acima do H1; no mobile, 66,3 px contra H1 de 36,66 | Crítica | O ponto focal da página inteira é um valor não confirmado, ao lado de "Proposta sujeita à confirmação" em 13 px | `clamp(34px,3.2vw,46px)`: o preço segue forte na tabela e nunca passa do H1 nem, no desktop, do H2 |
| F08-3 | **Mobile:** fio acima de "Consultar a equipe" com 162,6 px de largura em x=13 nas 3 ofertas. `justify-self:start` em `:264` não é desfeito no bloco ≤600 (`:279`). O `justify-content:space-between` nunca atua | Crítica | Bug visível repetido três vezes, parece fio quebrado | Adicionar `justify-self:stretch` no bloco ≤600. A seta vai para a borda direita, como a regra pretendia |
| F08-4 | Desktop: preço antes do nome; mobile e DOM: nome antes do preço | Alta | Lê-se "R$ 39" antes de saber o quê, e a ordem muda entre dispositivos e leitores de tela | Inverter colunas: nome e descrição à esquerda; preço no eixo 672; link à direita |
| F08-5 | Coluna de preço com 531 px e conteúdo com ≈190 a 232 px: ≈300 px vazios em cada linha. Fio a 661 (`:240`), a 11 px do eixo 672 | Alta | Espaço morto no centro da tabela e novo quase alinhamento. Linhas de 178 px deixam a seção com 1.034 px | Com F08-4, o vazio desaparece. Fio em `left:45.93%` (eixo 672) ou remoção do fio. Linhas com ≈132 px |
| F08-6 | "R$" em y=4767,3 e ",00/mês" em 4768,3, 1 px de diferença (`:246`/`:248`). Ambos ≈9 px abaixo do topo dos dígitos (estimado na captura de 2×) e fora da linha de base | Média | Fica nem sobrescrito nem alinhado à base. Vírgula solta: lê-se "39 ,00" | Alinhar satélites à linha de base com `align-items:baseline`, ou ao topo óptico. Colar `,00` ao inteiro com gap 1 a 2 px |
| F08-7 | `letter-spacing:-.055em` em 72 px: "39" e "390" com dígitos quase tocando | Baixa | Tracking de display em números reduz legibilidade de preço | −.02em a −.03em; com F08-2 o valor pode ser ainda menor |
| F08-8 | "Consultar a equipe" repetido 3 vezes sem `aria-label`, mesmo destino; "Proposta sujeita à confirmação" 3 vezes | Média | Repetição sem informação. Para leitor de tela, três links idênticos fora de contexto | `aria-label` com o nome da oferta; ressalva única na tabela. **[Gate]** para a redução de texto |
| F08-9 | H2 → parágrafo 48 px; parágrafo → tabela 18 px; demais seções usam 56 px para H2 → conteúdo | Baixa | Espaçamento único nesta seção, sem motivo perceptível | Parágrafo a 20 px do H2 e tabela a 40 px do parágrafo |

### 4.9 Seção 06: Por que Telefonia Fácil?

**Registro:** grade 2×2 limpa, fios navy coerentes com o rótulo, boa medida de texto, sem caixas. Nenhum defeito de layout verificado. Mobile regular.

| ID | Evidência/local | Gravidade | Por que prejudica | Correção |
|---|---|---|---|---|
| F09-1 | Valores abstratos ("Qualidade e confiança", "Tecnologia e inovação") sem nenhuma prova junto. Página não traz número, caso, certificação ou cliente nesta seção | Alta | É a seção de argumentos e não mostra evidência; poderia ser de qualquer empresa | **[Gate]** Trazer prova já existente em `/cases/` ou `/seguranca/`, com dado aprovado. Não inventar métricas |
| F09-2 | H2 em 4 linhas por causa da coluna de 455,7 px, quebrando "Tecnologia que / simplifica." | Média | Título com ritmo de dois tempos perde o desenho por limite de largura | H2 em largura total, como 02, com parágrafo e valores abaixo |
| F09-3 | Seção com fundo branco, seguida de fechamento branco | Média | Ver F10-2 | Ver F10-1 |

### 4.10 Fechamento "Fale com nosso time"

**Registro:** a mensagem é simples, o CTA é visível e o corpo (`#3f5464`) é mais escuro que o padrão da página. A intenção declarada de não repetir a foto é correta.

| ID | Evidência/local | Gravidade | Por que prejudica | Correção |
|---|---|---|---|---|
| F10-1 | Texto em 500 px à esquerda (`:160`); de x≈630 a 1310, cerca de 680×590 px vazios. Ponto mais fraco da página | Crítica | A ação principal perde força no momento de maior intenção. O vazio não parece escolha, parece imagem que faltou | Faixa navy sangrada, 7/5: título e CTA à esquerda; telefone e e-mail já existentes à direita. Altura ≈380 a 420 px |
| F10-2 | Sem mudança de fundo: ≈220 px em branco entre o fim de 06 (y≈5828) e o fio do fechamento (y≈6048); 120 px entre CTA e rodapé | Alta | 06, fechamento e rodapé formam uma única massa branca: a página termina sem clímax | Resolvido com a faixa de F10-1 |
| F10-5 | Rótulo com fio de 500 px, enquanto os 6 anteriores têm 1180 px | Média | Efeito colateral de `.specialist-copy>*{max-width:500px}` | Excluir `.section-label` dessa regra ou remover o fio |
| F10-3 | "Fale com nosso time" no rótulo e no botão, a 300 px | Baixa | Redundância no bloco mais curto da página | **[Gate]** Avaliar com copy |
| F10-4 | H2 sem segundo tempo verde, contrariando a regra 2 do CSS | Baixa | A seção de maior importância é a única sem o recurso de ênfase | Decidir exceção ou corrigir o sistema (T1) |

### 4.11 Rodapé

**Registro:** quatro colunas bem alinhadas ao grid; texto 4,78:1 (AA); no mobile, alvo de 44 px por link. Política e Termos presentes. Foco visível.

| ID | Evidência/local | Gravidade | Por que prejudica | Correção |
|---|---|---|---|---|
| F11-1 | Fundo branco com fio `#edf2f5` (≈1,1:1) como único limite | Alta | Sem base visual; a página não termina, apenas para | Fundo navy; ou fundo `--v2-tint` se o fechamento for navy. Decidir junto com F10-1 |
| F11-2 | Todo o texto em 12 px, inclusive no mobile, com 44 px de altura de alvo | Média | Texto pequeno dentro de área grande, baixa legibilidade em um bloco de utilidade | 13 a 14 px no desktop e 14 px no mobile |
| F11-3 | Mobile: 3 grupos em 2 colunas, "SUPORTE" isolado com a coluna direita vazia (≈174 px) | Média | Parece erro de grid; contato fica por último, a ≈8.750 px | Suporte em largura total acima da grade, com telefone e e-mail em 16 px |
| F11-4 | Rótulos em uppercase com tracking `.96px`, enquanto o restante da página removeu uppercase de propósito | Baixa | Resquício do sistema anterior | Mesmo estilo de rótulo: 14/600 sem caixa alta |
| F11-5 | "Cases" no header e "Clientes" no rodapé (`./cases/`); "E1 e SIP Trunk" contra "SIP Trunk"; rodapé lista 4 das 8 soluções do menu, mais "Ver todas" | Média | Nomes diferentes para o mesmo destino reduzem confiança | **[Gate]** Taxonomia única (T9) |
| F11-6 | Dois telefones: `(19) 3199-4699` e `0800 999 3199`. Sem endereço ou CNPJ visíveis | Média | Para operadora, identificação institucional é sinal de confiança. Necessidade legal não verificada | **[Gate]** Owner confirma números e dados institucionais; incluir só o que for confirmado |

---

## 5. Problemas transversais

| ID | Tema | Evidência | Gravidade | Correção |
|---|---|---|---|---|
| T1 | **Fórmula repetida, aparência de IA** | 6 rótulos "NN — Tema" com fio; 7 títulos com última parte verde; 21 pares "título + uma linha" em 01 (6), 02 (6), 04 (5) e 06 (4), mais 5 temas. O comentário do CSS diz que "cada seção tem uma composição própria": o layout muda, mas o átomo é o mesmo. A numeração 01 a 06 não indica sequência nem navega | Alta | Manter a linha numerada só se ela navegar, ou retirar. Reservar o verde em título para 2 momentos (hero e 03). Dar a cada seção uma peça própria: 01 fluxo, 02 interface, 03 número, 04 mapa/portfólio, 05 tabela |
| T2 | **Tipografia sem voz** | Só Inter, com 12 tamanhos no desktop e 13 no mobile, incluindo 29,64 e 44,46 px, e 8 pesos (400, 500, 600, 650, 700, 760, 800, 900). Tracking −.03 a −.035em em todos os títulos. O CSS declara "quatro títulos e dois corpos" | Alta | Reduzir para 6 degraus: 64, 46, 32, 18, 16, 14 (mobile 36, 30, 24, 18, 16, 14) e 4 pesos (400, 500, 600, 700). **[Gate marca]** Testar uma display licenciada para H1/H2/preço, próxima da forma do logotipo, com Inter no corpo |
| T3 | **Sem material visual** | Uma foto no hero. Depois, zero imagem até o rodapé, salvo logos. `collaboration-network.svg`, `atendimento-inteligente.svg`, `virtual-number-routing.svg` e `voz-corporativa.svg` estão em `assets/images/home/` sem referência no código. Renderizado, `atendimento-inteligente.svg` tem ícones sobre o texto ("Agilidade", "Equipe"), portanto não está pronto | Alta | Inserir 2 a 3 peças em 01, 02 ou 03, com assets reais ou diagramas refeitos. Não usar os SVGs atuais sem revisão. Não apresentar tela fictícia como produto |
| T4 | **Sem grid compartilhado** | Eixos em 661, 672, 763, 767, 945,5, 523/917 e 366/602/838/1074. Quase alinhamentos: 661×672, 763×767, 941×945,5 | Alta | Grid único de 12 colunas (gap 24): todas as seções usam as mesmas colunas. Regra: dois elementos em eixos diferentes devem distar ≥1 coluna |
| T5 | **Cor sem disciplina** | Quatro navies quase iguais (`#052b43`, `#03283d`, `#03283c`, `#021f32`). Verdes: `#28e892` (marca), `#0a7a4a` e `#0a7a4c` (duplicados), `#21d78b` (ícones). O verde escuro é necessário (mint sobre branco dá 1,61:1), mas é uma segunda cor de marca não presente no logo. 13 cores de texto no desktop | Média | Dois navies (base e profundidade) e dois verdes (mint e ink, um token só). Em títulos sobre claro, usar navy e reservar o verde escuro para links e ícones |
| T6 | **Botões e estados** | Duas famílias (F01-4); raios 10, 12, 18 e 50%; hover: elevação + glow no header, troca de cor no conteúdo, `translateX(2px)` no rodapé, seta 4 px nos links. Foco 3 px/3 px em geral, 2 px/4 px no link de oferta | Média | Tabela de componentes: primário, secundário, terciário (link), com 3 tamanhos, um hover e um foco |
| T7 | **CTAs** | 10 instâncias e 8 rótulos para `/contato/` ("Falar com o nosso time", "Fale com a Telefonia Fácil", "Fale sobre números virtuais", "Fale com um especialista", "Consultar a equipe", "Fale com nosso time", "Fale conosco", "Conheça os Agentes de IA") | Média | **[Gate]** Dois rótulos no máximo por intenção. Contextuais só se o formulário receber esse contexto |
| T8 | **Gutter do mobile** | `--container:calc(100% - 26px)` (`site.css:38`): 13 px em 390 px. Em 768, são 16 px | Alta | `calc(100% - 40px)` em ≤600 px. Efeito global: revisar as internas e o hero com 350 px |
| T9 | **Nomenclatura** | Linha Virtual, Números Virtuais, Números fixos, Número Fixo; Cases e Clientes; SIP Trunk e E1 e SIP Trunk; WhatsApp Call em 3 blocos | Média | **[Gate]** Dicionário de produtos antes do refinamento |
| T10 | **Texto de rascunho** | F06-4, F08-1, status em 3 ofertas. A branch é `draft`, o que explica, mas não pode chegar a uma revisão de marca nem à publicação | Crítica | **[Gate]** Ver seção 7 |
| T11 | **Dependência de JS** | Com JS desativado, a página fica inteira em branco (HTML de 1.168 caracteres, sem `<noscript>`) | Média | Não é defeito visual em si, mas sem JS não há conteúdo. Avaliar pré-renderização da home. Decisão arquitetural própria |
| T12 | **Marca sem desenvolvimento** | O nó verde do logo é o único elemento proprietário e só reaparece, indiretamente, nos arcos da foto | Alta | Criar um sistema gráfico a partir do nó: conexões entre elementos, marcadores, diagramas. É o caminho mais barato para sair do genérico |

**Pontos fortes verificados, a preservar:** espaçamento por tokens (`--v2-space`, `--v2-after-label`), recusa de cards e selos, tabela de 01, faixa navy de 04, contraste AA, foco visível, skip link, CLS 0 e ausência de overflow de 320 a 2560 px.

---

## 6. Plano de refinamento priorizado

### P0: corrigir antes de qualquer revisão externa

| Ordem | Ação | Achados | Tipo |
|---|---|---|---|
| 1 | Decidir tratamento do texto de rascunho | F06-4, F08-1, T10 | **[Gate]** |
| 2 | Corrigir fio do link de oferta no mobile (1 linha) | F08-3 | CSS |
| 3 | Reescalar preço e H2 de 03 abaixo do H1, em todos os viewports | F08-2, F06-1 | CSS |
| 4 | Refazer o fechamento em faixa navy e resolver a base da página | F10-1, F10-2, F10-5, F11-1 | CSS + layout |
| 5 | Substituir os 8 logos e normalizar massa e espaçamento | F03-1, F03-2, F03-3 | **[Gate asset]** + CSS |
| 6 | Definir um único primário e uma única entrada de `/compras/` no header | F01-1, F01-2 | **[Gate]** + HTML/JS |

### P1: composição e personalidade

| Ordem | Ação | Achados |
|---|---|---|
| 7 | Grid de 12 colunas e colunas equidistantes em 02, 04 e título das seções | T4, F05-1, F05-2, F07-1, F07-2, F07-3 |
| 8 | Reorganizar a tabela de ofertas: nome, preço, link | F08-4, F08-5, F08-6 |
| 9 | Direção de marca: foto do hero, sistema do nó, peças visuais em 2 a 3 seções | F02-1, T3, T12, F09-1 |
| 10 | Gutter mobile de 20 px e contato no mobile, com validação nas internas | T8, F00-1, F01-5 |
| 11 | Unificar botões e estados | F01-4, T6, F01-3 |
| 12 | Tornar navegáveis a faixa de temas e os produtos de 04 | F02-3, F07-4 |
| 13 | Fundir os encerramentos de 01 e dar saída a 02 | F04-1, F04-2, F05-3 |
| 14 | Escala tipográfica e, se aprovada, display própria | T2, T1 |

### P2: acabamento

| Ordem | Ação | Achados |
|---|---|---|
| 15 | Alinhamento do logo, SVG e pesos do header | F01-6, F01-7 |
| 16 | Tokens de cor | T5, F02-4 |
| 17 | Foto do hero: sem filtro, integração mobile, `srcset` real, variante ≥2.600 px | F02-2, F02-5, F02-6 |
| 18 | Rodapé: tamanho, ordem mobile, rótulos | F11-2, F11-3, F11-4 |
| 19 | Rótulos, repetição de CTAs e taxonomia, após decisão | T7, T9, F11-5, F11-6 |
| 20 | Polimento de preço, lista de recursos e tags | F08-7, F08-8, F08-9, F04-3, F04-4, F04-5, F02-7 |
| 21 | Avaliar pré-renderização | T11 |

Mudanças em `site.css`, `--container`, header ou rodapé são globais. Depois delas, repetir a auditoria nas páginas internas: esta auditoria não as cobre.

---

## 7. Decisões pendentes (gates)

| Decisão | Responsável sugerido | Bloqueia |
|---|---|---|
| Texto e presença de preços, status e condições (05 e 03) | Owner comercial/copy | P0-1, publicação |
| Prioridade e rótulo de `/compras/` e destino do CTA principal | Owner de produto | P0-6 |
| Destino de "Conheça os Agentes de IA" | Owner de copy/produto | F04-2 |
| Arquivos em alta resolução e autorização de uso dos logos, incluindo brasões oficiais | Comercial/jurídico | P0-5 |
| Foto do hero: procedência, licença, substituição | Marca | P1-9 |
| Telas reais de produto e provas aprovadas | Produto/comercial | P1-9, F09-1 |
| Dicionário de produtos, slogan único e telefones oficiais | Marca/comercial | P2-19 |
| Fonte display e licença | Marca | P1-14 |

---

## 8. O que não foi verificado

- **Dispositivos e navegadores reais:** só Chromium headless em Linux. Safari, iOS, Android e Firefox não testados. Hinting e renderização de fonte podem diferir.
- **Tecnologia assistiva:** sem leitor de tela. Zoom de 200% e reflow não testados. `prefers-reduced-motion` não exercitado; só vi as regras no CSS.
- **Teclado:** testei Tab em sessão limpa até o CTA do hero (12 paradas; painel de Soluções fechado é pulado). Abertura com Enter não foi testada. Numa sessão anterior, após interação com mouse, o painel apareceu aberto durante o Tab; não reproduzi em sessão limpa, portanto não é achado confirmado. Foco no mobile não testado.
- **Hover:** medido em 3 botões do hero/header. Demais descritos pelo CSS.
- **Desempenho:** FCP/LCP de 208 ms e CLS 0 foram medidos em `localhost` e não representam rede real.
- **Larguras intermediárias:** 320 a 2560 px checados para overflow. Inspecionados visualmente apenas 768, 1200 e 1920, e a página inteira de 768 só em baixa resolução. 1024 e demais não foram revistos seção por seção.
- **Fora de escopo:** páginas internas, `/contato/`, `/compras/`, envio de formulário, testes, build, staging e produção. Nenhum foi executado.
- **Fatos de negócio:** autorização de logos, procedência da foto, exigências legais do rodapé e validade de preços e claims não foram verificadas.
- **Evidências:** capturas e medições estão fora do repositório, em diretório temporário da sessão, porque a entrega é somente este arquivo. São efêmeras: para reproduzir, usar a versão indicada no cabeçalho. Medidas marcadas com "≈" foram lidas das capturas; as demais vieram do DOM.
