# Plano de Melhoria Visual — Home (`/`)

| Campo | Registro |
|---|---|
| Projeto | Site Institucional Telefonia Fácil (`2bx-systems/telefoniafacil`) |
| Documento de origem | `docs/visual-audit-20261105/home.md` |
| Documentos correlatos | `docs/visual-audit-20261105/products.md`, `docs/visual-audit-20261105/institutional.md`, `docs/COMMUNICATION_STANDARD.md` |
| Branch de trabalho | `feat/homepage-content-v2-draft` |
| Status do plano | **Proposta técnica planejada. Não é aceite de produto nem autorização de staging/deploy.** |
| Restrições de governança | Não editar código; não alterar copy comercial, preços, alegações, disponibilidade, destinos de CTA, clientes/logos ou termos jurídicos (mantidos como gates); não executar testes, build, commit ou deploy; não assumir aprovação. |

---

## 1. Contexto e Síntese Executiva

A auditoria visual independente realizada em 2026-11-05 (`docs/visual-audit-20261105/home.md`) identificou que a página inicial (`index.html`), servida na branch `feat/homepage-content-v2-draft`, possui uma base estrutural limpa e sem overflow (zero erros de console, CLS 0, contraste AA nos pares principais), porém sofre de três deficiências centrais:

1. **Exposição de conteúdo de rascunho e inversão de hierarquia:** Textos de bastidores operacionais são exibidos como interface comercial, enquanto o preço de uma oferta não confirmada atinge 72 px no desktop e 66,3 px no mobile — superando o H1 da página e dominando visualmente todo o fluxo.
2. **Defeito objetivo de renderização no mobile:** Um erro específico de CSS faz com que o fio divisório acima de "Consultar a equipe" nas ofertas meça apenas 162,6 px de largura em vez de acompanhar os 364 px da coluna útil do dispositivo, gerando a impressão visual de um componente quebrado.
3. **Esvaziamento visual e sensação de template sintético (fórmula repetitiva):** Da dobra para baixo, a página replica a mesma fórmula estrutural (linha numerada com fio, título em dois tempos com final verde e pares de título + descrição curta) por mais de 6.000 px sem nenhuma imagem de produto, diagrama funcional, interface de software ou prova concreta. A prova social é composta por logos raster de baixa resolução (110×80 px) com colisão espacial (4 px no desktop, 2 px no mobile), e o fechamento da página desmorona em uma coluna estreita de 500 px ao lado de cerca de 680 px de vazio em branco.

### 1.1 Direção Visual: Preservar Identidade e Superar a Estética de Template
A identidade visual da Telefonia Fácil baseia-se em solidez corporativa, clareza técnica e comunicação descomplicada. O reposicionamento do design não deve recorrer a ornamentos superficiais, sombras aleatórias, ilustrações abstratas ou "cards flutuantes" genéricos de SaaS.

A diferenciação deve ser alcançada através de:
- **Disciplina geométrica:** Adoção de um grid estrutural rigoroso de 12 colunas compartilhado por todas as seções, eliminando descompassos de poucos pixels e colunas assimétricas involuntárias.
- **Hierarquia tipográfica expressiva:** Calibração exata da escala tipográfica para que a proposta de valor principal (H1) mantenha o comando visual da página, subordinando preços e títulos secundários.
- **Vocabulário gráfico proprietário derivado da marca:** Expansão do nó/símbolo verde da Telefonia Fácil para ancorar conectores de fluxo, marcadores de lista e diagramação de rede, substituindo ícones genéricos de checkmark e clichês de telecomunicações legadas (como telefones analógicos de mesa com fio).
- **Fechamento firme e ancoragem cromática:** Transformação da transição final (Seção 06 → Fechamento → Rodapé) em uma base de ancoragem com presença de marca, usando blocos de contraste escuro (navy) para concluir a jornada do visitante com clareza de contato.

---

## 2. Mapa de Evidências Visuais e Rastreabilidade

Todas as intervenções deste plano apoiam-se no inventário de evidências visuais registradas na auditoria de 2026-11-05:

| Diretório / Arquivo de Evidência | Tipo de Evidência | Resolução / Detalhe | Achados Principais Rastreáveis |
|---|---|---|---|
| `scratchpad/shots/d-fold.png` | Captura Desktop | 1440×900 | F01-1, F01-2, F01-3, F01-4, F02-1, F02-3 |
| `scratchpad/shots/d-full.png` | Captura Desktop Integral | 1440×6813 | T1, T3, T4, T5, F10-1, F10-2, F11-1 |
| `scratchpad/shots/d-s00.png` | Seção Desktop 00 | 1440×1000 (y: 0–1000) | Topbar, Header, Hero, Faixa de Temas |
| `scratchpad/shots/d-s01.png` | Seção Desktop 01 | 1440×1000 (y: 804–1804) | F03-1 a F03-5 (Logos clientes), F04-4, F04-6 |
| `scratchpad/shots/d-s02.png` | Seção Desktop 02 | 1440×1000 (y: 1804–2804) | F04-1, F04-3, F04-5, F05-1, F05-2, F05-3 |
| `scratchpad/shots/d-s03.png` | Seção Desktop 03 | 1440×1000 (y: 2804–3804) | F05-4, F06-2, F06-3, F06-4, F06-5 |
| `scratchpad/shots/d-s04.png` | Seção Desktop 04 | 1440×1000 (y: 3804–4804) | F07-1, F07-2, F07-3, F07-4, F08-1, F08-5 |
| `scratchpad/shots/d-s05.png` | Seção Desktop 05 | 1440×1000 (y: 4804–5804) | F08-2, F08-4, F08-6, F08-7, F09-1, F09-2 |
| `scratchpad/shots/d-s06.png` | Seção Desktop 06 | 1440×813 (y: 5804–6813) | F10-1, F10-2, F10-5, F11-1, F11-2, F11-4 |
| `scratchpad/shots/m-fold.png` | Captura Mobile | 780×1688 (DPR 2) | F00-1, F01-5, F02-5, F02-6, F02-7 |
| `scratchpad/shots/m-full.png` | Captura Mobile Integral | 780×18120 (DPR 2) | T8, F04-6, F06-1, F08-3, F11-3 |
| `scratchpad/shots/m-s08.png` | Seção Mobile 08 | 780×1700 (DPR 2) | **F08-3 (Fio cortado de 162.6 px)**, F08-2 |
| `scratchpad/st/d2-price.png` | Detalhe Retina Desktop | 2360×358 | F08-2, F08-6, F08-7 (Desalinhamento e tracking de preço) |
| `scratchpad/st/d2-logos.png` | Detalhe Retina Desktop | 1276×328 | F03-1, F03-2, F03-3 (Baixa resolução e colisão de logos) |
| `scratchpad/st/m2-logos.png` | Detalhe Retina Mobile | 728×254 | F03-1, F03-3 (Colisão crítica no mobile com gap de 2 px) |
| `scratchpad/st/m-menu-full.png` | Menu Mobile Aberto | 780×1688 | F00-1, F01-8 (Soluções aberto, ausência de telefone/contato) |
| `scratchpad/st/focus-offer.png` | Foco no Link de Oferta | 326×90 | F08-3, T6 (Anel de foco e clique) |

---

## 3. Matriz de Sobreposição de Arquivos e Ordem Recomendada de Edição

Como evidenciado em `docs/visual-audit-20261105/products.md` e `docs/visual-audit-20261105/institutional.md`, diversas estruturas da Home compartilham código e estilização com as outras 27 rotas do site. Modificações inadvertidas podem gerar quebras regressivas nas páginas institucionais e de produto.

### 3.1 Mapeamento de Sobreposição

| Arquivo do Repositório | Escopo no Projeto | Áreas / Rotas Impactadas | Riscos Identificados em Auditoria |
|---|---|---|---|
| `assets/css/home-promo.css` | **Local (Home)** | Apenas `index.html` (`body[data-page="home"]`) | **Baixo.** Arquivo isolado carregado exclusivamente pela Home. Modificações em seletores específicos `.content-v2-*` não vazam para outras rotas. |
| `assets/css/site.css` | **Global** | Todas as 28 rotas | **Alto.** Controla `--container`, `--tf-*`, `.header`, `.navlinks`, `.topbar`, `.footer`, botões de navegação e menu mobile. Ajustar `--container` no mobile impacta o hero e os grids de todas as páginas. |
| `assets/js/site.js` | **Global (Componentes e Rotas)** | Todas as 28 rotas (renderização SPA) | **Médio-Alto.** Contém as funções globais `header()`, `footer()`, `trust()`, `purchaseHref()` e a função local `home()`. Alterar `header()` ou `footer()` impacta simultaneamente todas as rotas institucionais e produtos. |
| `index.html` | **Local (Entry Point Home)** | Apenas `/` | **Baixo.** Contém metadados, links de estilos locais e preloads de imagem/fonte da Home. |

### 3.2 Ordem Recomendada de Execução para Evitar Conflitos de Edição

Para mitigar conflitos entre frentes de trabalho paralelas (Home × Produtos × Institucionais), as implementações futuras devem respeitar estritamente a seguinte sequência em fases:

```
+-----------------------------------------------------------------------------------+
| FASE 1: Correções Locais Puras e Isoladas na Home                                 |
| Arquivo: assets/css/home-promo.css                                                |
| Ações: Correção do fio mobile (F08-3), reescalonamento de preço/H2 (F08-2, F06-1),|
|        reestruturação da tabela de tarifas e fechamento specialist.               |
| Risco global: NULO (escopo restrito a body[data-page="home"]).                    |
+-----------------------------------------------------------------------------------+
                                          │
                                          ▼
+-----------------------------------------------------------------------------------+
| FASE 2: Resolução de Gates Humanos e Alinhamento de Contrato Global              |
| Arquivos: Decisões registradas documentalmente (copy, produtos, jurídico, assets) |
| Ações: Definição de logos vetorizados, fotos aprovadas, texto de ofertas e CTAs.  |
| Bloqueio: Nenhuma linha de código das fases 3 e 4 deve ser alterada antes disso.  |
+-----------------------------------------------------------------------------------+
                                          │
                                          ▼
+-----------------------------------------------------------------------------------+
| FASE 3: Ajustes Específicos do Template Home no JS                                |
| Arquivo: assets/js/site.js (apenas dentro da constante home())                    |
| Ações: Reordenação DOM das ofertas (nome antes do preço), inserção de links nos   |
|        produtos da seção 04, fusão dos CTAs da seção 01, remoção de redundâncias. |
| Risco nas outras rotas: MÍNIMO (alterações restritas à função home()).            |
+-----------------------------------------------------------------------------------+
                                          │
                                          ▼
+-----------------------------------------------------------------------------------+
| FASE 4: Componentes Compartilhados Globais (Coordenação Multi-Áreas)              |
| Arquivos: assets/css/site.css, assets/js/site.js (header, footer, trust)         |
| Ações: Header fixo/simplificado, gutter mobile de 20 px, rodapé unificado,        |
|        normalização de botões, contatos no menu mobile.                           |
| Risco nas outras rotas: ALTO. Exige regressão visual nas 28 rotas após aplicação. |
+-----------------------------------------------------------------------------------+
```

---

## 4. Plano de Ação Detalhado: P0, P1 e P2

### Legenda de Classificação:
- **Correção Local Segura [Local Seguro]:** Ajuste puramente técnico de CSS ou marcação DOM que não modifica texto comercial, regras de negócio, dados institucionais ou decisões jurídicas. Pode ser executado em ambiente de desenvolvimento sem dependência externa.
- **Gate Humano [Gate]:** Ação estritamente condicionada à decisão ou fornecimento formal de artefatos por donos de produto, diretores de arte, departamento jurídico ou gerência comercial.

---

### 4.1 Prioridade P0: Bloqueadores e Correções Imediatas
*Itens indispensáveis antes de qualquer apresentação institucional, revisão externa ou homologação.*

---

#### Item PLN-H-01: Correção do Fio Divisório Cortado na Tabela de Ofertas (Mobile)
- **Achado Cruzado:** `F08-3`.
- **Classificação:** Correção Local Segura.
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/m-s08.png` (viewport mobile 390×844, DPR 2).
  - Medição em `scratchpad/shots/meas.txt` (linhas 208–210): `.content-v2-offer-link` renderiza com largura de 162,6 px a partir de x=13 em um container útil de 364 px.
- **Arquivo e Seletor Provável:**
  - `assets/css/home-promo.css:279` no bloco `@media(max-width:600px)` (seletor `.content-v2-offer-link`).
- **Diagnóstico Técnico:**
  - A regra em `home-promo.css:264` (`@media(max-width:1100px)`) define `.content-v2-offer-link { justify-self: start; justify-content: flex-start; }`. Quando a viewport cai para `<=600px`, a linha 279 redefine `grid-column: 1; grid-row: 4; justify-content: space-between; border-top: 1px solid var(--v2-rule);`, mas **não anula** o `justify-self: start`. O elemento encolhe ao tamanho do texto (162,6 px) em vez de preencher a largura da coluna (364 px), fazendo com que a borda superior (`border-top`) fique truncada e o `justify-content: space-between` não consiga afastar a seta para o canto direito.
- **Resultado Visual Concreto:**
  - O link de ação e seu filete superior passam a se estender por 100% da largura do card (364 px em 390 px de tela), criando uma linha contínua perfeita de margem a margem interna. O texto "Consultar a equipe" alinha-se à esquerda e a seta indicadora `${I.arrow}` ancora-se exatamente na extremidade direita.
- **Critérios de Aceite:**
  - **Desktop (1440×900):** Sem alteração visual; o link permanece na coluna 3 da grade de tarifas (`align-items: center`).
  - **Mobile (390×844 e 320×568):** A largura computada de `.content-v2-offer-link` deve ser rigorosamente igual à largura do elemento pai `article` (100% da coluna útil). O `border-top` deve atravessar toda a extensão da caixa sem interrupção. A seta `${I.arrow}` deve estar colada à margem direita com área de toque mínima vertical de 48 px.
- **Dependências e Riscos:** Dependência zero. Risco nulo de regressão externa (arquivo isolado).

---

#### Item PLN-H-02: Reescalonamento Hierárquico do Preço e Títulos Secundários
- **Achados Cruzados:** `F08-2`, `F06-1`, `F06-2`, `T2`.
- **Classificação:** Correção Local Segura.
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/m-s08.png`, `scratchpad/st/d2-price.png` (Desktop 1440×900 e Mobile 390×844).
  - Medição: Inteiro do preço (`.content-v2-integer`) mede 72 px no desktop e 66,3 px no mobile (`meas.txt:63` e `205`). O H1 mede 64 px no desktop e 36,66 px no mobile. O H2 da Seção 03 mede 44,46 px no mobile (`meas.txt:172`), sendo 1,21× maior que o H1 e quebrando em 5 linhas.
- **Arquivo e Seletor Provável:**
  - `assets/css/home-promo.css:28-30` (variáveis `--v2-display`, `--v2-h2`), `home-promo.css:247`, `home-promo.css:265`, `home-promo.css:273` (`.content-v2-integer`), `home-promo.css:216` (`.content-v2-statement h2`).
- **Diagnóstico Técnico:**
  - A escala tipográfica atual permite que números de oferta e subtítulos de seções específicas ultrapassem o valor do H1 (`clamp(44px,4.5vw,64px)`), destruindo a hierarquia narrativa e transformando uma página institucional de telecom em um folheto promocional agressivo.
- **Resultado Visual Concreto:**
  - O H1 volta a ser o elemento tipográfico de maior impacto da página em todos os viewports. O inteiro do preço é contido em patamar secundário (`clamp(34px, 3.2vw, 44px)` no desktop e máximo de 34 px no mobile), mantendo legibilidade sem desequilibrar a tabela.
  - O H2 da Seção 03 ("Números Virtuais. Contrate. Ative. Use.") no mobile é reduzido de 44,46 px para 30–32 px (abaixo dos 36,66 px do H1), reduzindo a quebra de 5 para no máximo 3 linhas.
- **Critérios de Aceite:**
  - **Desktop (1440×900):** O H1 permanece em 64 px. O inteiro do preço não deve exceder 44 px (altura de linha controlada). O H2 da Seção 03 fica fixado em 56 px.
  - **Mobile (390×844):** O H1 mede 36,66 px. O inteiro do preço mede entre 30 e 34 px. O H2 da Seção 03 não deve ultrapassar 32 px. Nenhum texto ou valor numérico abaixo do hero pode ser maior que o H1.
- **Dependências e Riscos:** Baixo risco. Requer ajuste coordenado no alinhamento vertical dos satélites monetários (`R$` e `,00/mês`).

---

#### Item PLN-H-03: Remodelação Estrutural do Fechamento e Base da Página
- **Achados Cruzados:** `F10-1`, `F10-2`, `F10-5`, `F11-1`, `T5`.
- **Classificação:** Correção Local Segura (Layout/CSS) combinada com Gate Humano (Contatos/Copy).
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/d-s06.png`, `scratchpad/shots/d-full.png`, `scratchpad/shots/m-s09.png`, `scratchpad/shots/m-s10.png`.
  - Medição: Texto do fechamento ocupa apenas 500 px à esquerda (`meas.txt:34`, `x: 130` a `630`), deixando um vácuo desértico de 680×590 px à direita. Seção 06 branca + Fechamento branco + Rodapé branco criam uma massa contínua desprovida de finalização.
- **Arquivo e Seletor Provável:**
  - `assets/css/home-promo.css:158–165` (`.content-v2 .specialist`, `.specialist-copy`, `.specialist-copy > *`), `assets/js/site.js:47` (estrutura HTML de `section.specialist`).
- **Diagnóstico Técnico:**
  - O fechamento foi concebido para não repetir a foto do hero, mas a remoção da imagem resultou em um espaço vazio estéril. Além disso, a regra `.specialist-copy > * { max-width: 500px }` aprisiona o `.section-label`, fazendo seu filete medir apenas 500 px enquanto todos os outros medem 1180 px no desktop.
- **Resultado Visual Concreto:**
  - A seção de fechamento (`.specialist`) é transformada em uma faixa horizontal com fundo escuro navy profundo (`#03283d` ou `--v2-navy`), gerando uma quebra de contraste revigorante após o fundo claro da Seção 06.
  - A composição adota distribuição equilibrada em duas zonas (grid assimétrico 7/5):
    - Lado esquerdo: Título firme com destaque verde na assinatura e CTA primário.
    - Lado direito: Painel informativo direto com os canais institucionais já públicos (telefone fixo, 0800 e e-mail corporativo) destacados com ícones da marca em alvos de toque generosos.
  - O `.section-label` tem o limite de 500 px removido, alinhando seu filete à largura padrão de 1180 px.
- **Critérios de Aceite:**
  - **Desktop (1440×900):** Eliminação completa do vácuo visual à direita. Fundo escuro navy com contraste mínimo de 9:1 para textos brancos. Filete superior do label alinhado ao grid (1180 px).
  - **Mobile (390×844):** Empilhamento vertical natural (título → contatos diretos com clique telefônico imediato → botão CTA de largura total). Altura vertical compacta (máximo 420 px).
- **Dependências e Riscos:** Depende da confirmação formal dos telefones de atendimento (Gate PLN-G-03). Sem risco para outras páginas se mantido em `home-promo.css` e na chamada de `specialist`.

---

#### Item PLN-H-04: Resolução de Textos de Rascunho Operacional Expostos ao Público
- **Achados Cruzados:** `F06-4`, `F08-1`, `F08-8`, `T10`.
- **Classificação:** **GATE HUMANO OBRIGATÓRIO (Produto / Comercial / Jurídico).**
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/d-s03.png`, `scratchpad/shots/d-s04.png`, `scratchpad/shots/d-s05.png`.
  - Ocorrências identificadas:
    1. Seção 03 (`assets/js/site.js:43`): `"Condições comerciais em validação"` renderizado como subtítulo destacado de 18 px (`.content-v2-note b`).
    2. Seção 05 (`assets/js/site.js:45`): `"Conheça as opções descritas na proposta de conteúdo. Preços, itens incluídos e disponibilidade aguardam validação comercial e técnica."` como corpo introdutório da tabela.
    3. Seção 05 (`assets/js/site.js:45`): `"Proposta sujeita à confirmação"` repetido 3 vezes abaixo de cada cifra.
- **Risco de Negócio:**
  - Exposição de vocabulário de governança interna ("proposta de conteúdo", "em validação") transmite informalidade, gera insegurança jurídica e desqualifica a percepção da marca perante clientes corporativos.
- **Condição de Liberação do Gate:**
  - O responsável de negócio/produto deve emitir definição formal:
    - *Opção A (Recomendada para fase de transição):* Ocultar provisoriamente a tabela de tarifas e o bloco de condições até aprovação do modelo de precificação, substituindo por apresentação das modalidades de contratação consultiva.
    - *Opção B:* Fornecer copy comercial definitiva aprovada, substituindo notas internas por avisos mercadológicos padrão de telecomunicação (ex: "Planos corporativos sob consulta técnica de viabilidade").
- **Ação Técnica Bloqueada:** Proibido inventar texto substituto no código até decisão do Gate.

---

#### Item PLN-H-05: Substituição, Vetorização e Normalização dos Logos de Clientes
- **Achados Cruzados:** `F03-1`, `F03-2`, `F03-3`, `F03-4`, `F03-5`, `F03-7`.
- **Classificação:** **GATE HUMANO (Assets e Jurídico)** combinado com Correção Local Segura (CSS).
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/d-s01.png`, `scratchpad/st/d2-logos.png`, `scratchpad/st/m2-logos.png`.
  - Medição: 8 arquivos PNG de 110×80 px (`meas.txt:98–105`). No mobile, são ampliados em 1,55× em DPR 2, borrando textos de "Hortolândia" e "Femina". Espaçamento vertical entre linhas de apenas 4 px no desktop e 2 px no mobile: a sigla "SBCD" fica a 10 px de distância física do brasão da Marinha do Brasil. A opacidade de 0.86 com escala de cinza apaga marcas de traço fino.
- **Condição de Liberação do Gate:**
  - Departamento comercial e jurídico devem confirmar autorização expressa para veiculação das marcas institucionais (especialmente órgãos públicos como Marinha do Brasil e Câmaras Municipais).
  - Fornecimento dos arquivos originais em vetor (SVG) ou bitmaps de alta densidade (mínimo 440 px de largura).
- **Especificação Visual e Técnica (Pós-Gate):**
  - **Arquivo:** `assets/css/home-promo.css:88–90` (`.client-logo-grid`).
  - **Grid e Espaçamento:** Elevar `gap` entre linhas para no mínimo 32 px no desktop e 20 px no mobile; `gap` entre colunas de 32 px.
  - **Normalização Óptica:** Delimitar áreas de contenção proporcionais:
    - Wordmarks horizontais (ex: Consaúde, Sumprev): altura máxima de 32 px.
    - Brasões e símbolos verticais (ex: Marinha do Brasil, SBCD): altura máxima de 56 px.
    - Alinhamento vertical centralizado (`align-items: center; justify-items: center`).
  - **Tratamento Monocromático Homogêneo:** Substituir o filtro genérico por coloração uniforme em cinza corporativo azulado (`#4c6171` ou `--v2-text`), garantindo nitidez sem lavagem óptica.
- **Critérios de Aceite:**
  - **Desktop e Mobile:** Zero borrão em telas retina (DPR 2 e 3). Distância visual mínima entre qualquer elemento gráfico de logos distintos de pelo menos 24 px. Nenhuma legenda ou detalhe de logotipo ilegível.

---

#### Item PLN-H-06: Desduplicação e Unificação do Objetivo de Conversão no Header
- **Achados Cruzados:** `F01-1`, `F01-2`, `F01-3`, `F-18` (produtos), `I-04` / `I-22` (institucional).
- **Classificação:** **GATE HUMANO (Produto / Comercial)** + Ajuste Global em `site.js` / `site.css`.
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/d-fold.png`, `scratchpad/st/d2-header.png`.
  - Medição: Em 880 px de largura útil, o header apresenta duas entradas para Compras ("Página de Compras" em x=801 e "Acessar Página de Compras" em x=1067) e duas entradas para Soluções ("Soluções" no dropdown e "Ver soluções" no botão). O botão de maior destaque visual leva para a rota `/compras/` (página de transição desativada), enquanto o hero leva para `/contato/`.
- **Condição de Liberação do Gate:**
  - Definição pelo coordenador/Atlas do papel de `/compras/` na barra superior durante o período em que os fluxos transacionais permanecem inativos (conforme regra de ouro: desativar compras legadas mantendo CTAs informativos).
- **Especificação Visual e Técnica:**
  - Manter uma única entrada discreta para `/compras/` (se exigido por produto) ou consolidar a ação principal do header para convergir com o CTA do hero (`/contato/` ou atendimento consultivo).
  - Eliminar o botão redundante "Ver soluções" da barra de ações.
  - Separar os grupos com espaçamento consistente: 28 px entre links de navegação e mínimo de 32 px antes do bloco de botões de ação.
- **Critérios de Aceite:**
  - A primeira dobra exibe um único objetivo de conversão verde primário.
  - Fim das duplicidades de texto e rota no menu superior.
- **Risco e Dependência:** Impacto direto em todas as 28 rotas (função `header()` em `assets/js/site.js`). Requer validação conjunta com as auditorias de Produtos e Institucionais (Fase 4 da ordem de edição).

---

### 4.2 Prioridade P1: Composição, Personalidade de Marca e Responsividade
*Itens estruturais para elevar a qualidade visual, eliminar a rigidez de template e aprimorar a experiência em dispositivos intermediários.*

---

#### Item PLN-H-07: Instituição do Grid Canônico de 12 Colunas e Eliminação de Quase-Alinhamentos
- **Achados Cruzados:** `T4`, `F05-1`, `F05-2`, `F07-1`, `F07-2`, `F07-3`.
- **Classificação:** Correção Local Segura.
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/d-s02.png`, `scratchpad/shots/d-s04.png`.
  - Medição:
    - Seção 02: Colunas em x=130, 547,3 e 940,7 geram passos desiguais de 417 px e 393 px (`meas.txt:44–46`). O parágrafo superior inicia em x=945,5, desalinhando 4,8 px da coluna 3 (x=940,7).
    - Seção 04: Colunas com larguras de 215, 195, 195, 195 e 216 px. A quebra de linha em "Números fixos corporativos" causa desnível de 23,4 px nas descrições vizinhas.
- **Arquivo e Seletor Provável:**
  - `assets/css/home-promo.css:120–124` (`.content-v2-heading`, `.content-v2-matrix`), `home-promo.css:146–150` (`.content-v2-products`).
- **Resultado Visual Concreto:**
  - Todas as seções passam a compartilhar as mesmas linhas mestras de um grid de 12 colunas com `gap: 24px` (largura máxima 1180 px):
    - Seção 02: Título ocupa 8 colunas; parágrafo de apoio ocupa as 4 colunas restantes iniciando rigorosamente no mesmo eixo vertical x da terceira coluna de conteúdo abaixo. A matriz de recursos adota 3 colunas simétricas de exatamente 4 colunas do grid cada, com fios verticais desenhados via pseudo-elementos centrados no vão do gap.
    - Seção 04: Aplicação de `grid-template-rows: subgrid` em cada card de produto, travando os títulos `h3` na primeira linha da grade e nivelando perfeitamente todas as descrições `p` na mesma linha de base horizontal, independentemente do número de linhas do título.
- **Critérios de Aceite:**
  - **Desktop (1440×900):** Tolerância zero de quase-alinhamento (diferenças de 2 a 8 px entre blocos verticais extintas). Descrições da Seção 04 perfeitamente niveladas na mesma coordenada y.
  - **Mobile (390×844):** Empilhamento fluído em 1 coluna sem resíduos de gaps assimétricos.
- **Dependências e Riscos:** Baixo risco. Puramente dimensional em folha local.

---

#### Item PLN-H-08: Reorganização Lógica da Tabela de Tarifas (Leitura Natural)
- **Achados Cruzados:** `F08-4`, `F08-5`, `F08-6`, `F08-7`.
- **Classificação:** Correção Local Segura (CSS + HTML local em `home()`).
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/d-s05.png`, `scratchpad/st/d2-price.png`.
  - Medição: No desktop, o DOM renderiza o preço na primeira coluna à esquerda (`grid-column: 1`, x=130 a 661), enquanto o título do plano fica na segunda coluna (x=672). O visitante lê o valor ("R$ 39") antes de saber o que está sendo cotado. No mobile, a ordem inverte. Há cerca de 300 px de vazio entre o preço e o texto.
- **Arquivo e Seletor Provável:**
  - `assets/js/site.js:45` (template da seção 05), `assets/css/home-promo.css:241–251` (`.content-v2-prices article`).
- **Resultado Visual Concreto:**
  - Padronização da leitura ocidental em 3 colunas elegantes:
    - Coluna 1 (Identificação): Nome do plano (`h3`) e resumo de entregas (`p`) à esquerda (ocupando 45% da largura).
    - Coluna 2 (Valor): Cifra em tipografia calibrada, com alinhamento rigoroso à linha de base (`align-items: baseline`) entre o símbolo "R$", os dígitos numéricos e a fração ",00/mês", eliminando a sensação de vírgula flutuante.
    - Coluna 3 (Ação): Link com seta para atendimento consultivo alinhado à direita.
- **Critérios de Aceite:**
  - Ordem de leitura idêntica em Desktop, Mobile e leitores de tela: Nome do Produto → Descrição → Preço → Ação.
  - Vazio central eliminado; satélites monetários perfeitamente assentados na linha de base tipográfica.
- **Dependências e Riscos:** Depende da definição do Gate PLN-H-04 sobre a exibição das tarifas.

---

#### Item PLN-H-09: Direção de Imagem e Linguagem Gráfica Proprietária
- **Achados Cruzados:** `F02-1`, `F02-2`, `T3`, `T12`.
- **Classificação:** **GATE HUMANO (Marca / Criação)** combinado com Implementação de Assets.
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/d-s00.png`, `scratchpad/shots/d-s02.png`, `scratchpad/st/d2-hero-img.png`.
  - Diagnóstico: A foto do hero retrata um executivo segurando um aparelho telefônico analógico com fio espiralado e arcos luminosos verdes de banco de imagens, contradizendo os produtos "PABX em Nuvem", "Softphone" e "Agentes de IA". Após o hero, não existe nenhum suporte visual em mais de 6.000 px de rolagem. SVGs existentes na pasta `assets/images/home/` apresentam textos truncados sobre ícones (`atendimento-inteligente.svg`).
- **Condição de Liberação do Gate:**
  - Decisão sobre a substituição da foto do hero: optar por fotografia de equipe real/operação moderna de atendimento ou composição gráfica proprietária estruturada a partir do símbolo da Telefonia Fácil.
  - Revisão ou redesenho dos diagramas técnicos de `assets/images/home/` para inserção nas Seções 01 (fluxo de atendimento inteligente) e 02 (ecossistema de colaboração/softphone).
- **Especificação Técnica Pós-Gate:**
  - Remoção de filtros artificiais no CSS (`filter: saturate(.58); transform: scale(1.1)`). O asset deve ser renderizado e exportado em sua tonalidade final.
  - Criação de variantes de alta resolução compatíveis com DPR 2 (mínimo 2600 px de largura nativa) e suporte semântico via tag `<picture>` com `<source media="(min-width: 601px)">` real, eliminando a técnica paliativa de GIF 1×1 invisível no mobile.
- **Critérios de Aceite:**
  - Imagem do hero com nitidez cristalina em telas retina; fim do clichê visual de telefone com fio; inserção de 2 suportes visuais de produto nas seções inferiores sem causar quebra de layout ou poluição visual.

---

#### Item PLN-H-10: Gutter Lateral Responsivo do Mobile e Atalho de Contato Fixo
- **Achados Cruzados:** `T8`, `F00-1`, `F01-5`, `F-04` (produtos), `I-05` (institucional).
- **Classificação:** Correção Global (com teste focal na Home).
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/m-fold.png`, `scratchpad/shots/m-full.png`, `scratchpad/st/m-scrolled.png`.
  - Medição: Em larguras `<=600px`, `site.css:38` aplica `--container: calc(100% - 26px)`, resultando em margens laterais de apenas 13 px. Em 9.060 px de altura de página no mobile, o header `position: relative` desaparece imediatamente na primeira rolagem, privando o usuário de acesso ao menu ou canais de contato.
- **Arquivo e Seletor Provável:**
  - `assets/css/site.css:38` (`--container`), `assets/css/site.css:44` (`.header`), `assets/js/site.js:28` (menu mobile).
- **Resultado Visual Concreto:**
  - Ampliação do gutter móvel para 20 px de respiro lateral (`--container: calc(100% - 40px)` em `<=600px`), proporcionando respiro elegante compatível com os padrões de design móvel moderno.
  - Inclusão dos canais de contato direto (`(19) 3199-4699` e botão de WhatsApp/Falar) acessíveis no menu mobile aberto ou via barra utilitária inferior compacta, evitando que o usuário precise rolar mais de 8.000 px para encontrar um telefone.
- **Critérios de Aceite:**
  - **Mobile (390×844 e 320×568):** Margens de conteúdo cravadas em 20 px em ambas as bordas laterais (16 px apenas em 320 px). Telefone e contato acessíveis a qualquer momento da navegação móvel.
- **Dependências e Riscos:** **Alto impacto em outras rotas.** Alteração em `site.css` exige validação regressiva nos formulários de `/contato/` e nos heróis de produtos. Deve ser executado na Fase 4.

---

#### Item PLN-H-11: Unificação do Sistema de Botões e Estados Interativos
- **Achados Cruzados:** `F01-4`, `T6`, `F01-3`.
- **Classificação:** Correção Global (com aplicação de exceção ou padronização).
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/d-fold.png`, `scratchpad/st/focus-*.png`.
  - Diagnóstico: O header utiliza botões com gradiente, sombra verde translúcida (`box-shadow: 0 12px 28px rgba(40,232,146,0.2)`), tipografia 13 px/800 e animação de elevação (`translateY(-2px)`). O corpo da Home (`home-promo.css:54–57`) removeu intencionalmente sombras e elevações, usando botões chapados, 14 px/700 e 48 px de altura. Essa convivência faz o header parecer pertencer a outro website.
- **Arquivo e Seletor Provável:**
  - `assets/css/site.css` vs `assets/css/home-promo.css:54–57` (`.btn`, `.btn-primary`, `.btn:hover`).
- **Resultado Visual Concreto:**
  - Unificação de um sistema de botões consistente em todo o site:
    - Primário: Fundo verde contínuo (`--tf-green` / `#28e892`), texto escuro de alto contraste (`#043347`), sem elevações tridimensionais artificiais, raio de borda unificado em 10 px.
    - Secundário / Outline: Borda sutil de 1 px, sem preenchimento, hover com sutil clareamento de fundo.
    - Anéis de foco acessíveis padronizados em 2 px com offset de 3 px, adaptando a cor conforme o contraste do fundo (verde sobre escuro, navy sobre claro).
- **Critérios de Aceite:**
  - O botão do header e os botões da página compartilham exatamente o mesmo tratamento estético e mecânica de hover/foco.
- **Dependências e Riscos:** Requer alinhamento transversal com os formulários de produtos e institucionais.

---

#### Item PLN-H-12: Navegabilidade da Faixa de Temas e Catálogo de Produtos
- **Achados Cruzados:** `F02-3`, `F07-4`, `F02-4`.
- **Classificação:** Correção Local Segura (HTML em `site.js:home()` + CSS em `home-promo.css`).
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/d-s00.png`, `scratchpad/shots/d-s04.png`.
  - Diagnóstico:
    - A faixa horizontal de 5 temas (`.content-v2-tags`) abaixo do hero assemelha-se a um menu de abas, mas é puramente estática. O visitante clica instintivamente esperando ancoragem e nada ocorre.
    - A Seção 04 exibe 5 produtos vitrines ("Números fixos corporativos", "0800 empresarial", "SIP Trunk", "Dados e Voz Móvel", "WhatsApp Call"), mas nenhum deles contém link, embora o site possua rotas dedicadas prontas (`/numero-fixo/`, `/0800/`, `/sip-trunk/`, etc.).
- **Resultado Visual Concreto:**
  - Na faixa de temas, transformar os itens em âncoras funcionais de salto suave (`#solucoes-v2`, `#colaboracao`, `#numeros-virtuais`, etc.) com feedback sutil de foco e hover.
  - Na Seção 04, converter os títulos dos produtos em hiperlinks semânticos para suas respectivas páginas internas já existentes no repositório, com transição de cor discreta no hover.
- **Critérios de Aceite:**
  - Todos os itens da faixa de temas e os produtos da Seção 04 respondem ao foco por teclado (Tab) e ao clique/toque, direcionando corretamente para os destinos internos sem recarregar a aplicação de forma abrupta.
- **Dependências e Riscos:** Baixo risco. Aproveita rotas já mapeadas no roteador do site.

---

#### Item PLN-H-13: Racionalização de CTAs e Saída de Conversão na Seção 01 e 02
- **Achados Cruzados:** `F04-1`, `F04-2`, `F05-3`.
- **Classificação:** Correção Local Segura (Estrutura) + Gate Humano (Rótulo de IA).
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/d-s02.png`, `scratchpad/shots/d-s03.png`.
  - Diagnóstico: Na Seção 01, ocorrem dois CTAs para `/contato/` separados por apenas 152 px verticais (um botão outline dentro do painel e outro primário verde logo abaixo). Além disso, o botão promete "Conheça os Agentes de IA", mas direciona para o formulário geral de contato. Em contrapartida, a Seção 02 é a única seção de soluções que termina sem nenhuma ação de saída à direita.
- **Resultado Visual Concreto:**
  - Seção 01: Fusão dos fechamentos. A lista de recursos técnicos é posicionada antes do painel de IA, e o painel encerra a seção com um único botão primário de ação clara.
  - Seção 02: Inclusão do rodapé padrão de seção (`.content-v2-foot`) à direita, alinhando uma chamada de saída ("Converse sobre colaboração") com link consultivo para `/contato/`.
- **Critérios de Aceite:**
  - Fim da duplicidade de botões vizinhos na Seção 01. Seção 02 dotada de fechamento estrutural e CTA claro de saída.
- **Dependências e Riscos:** Depende do Gate PLN-G-02 quanto ao rótulo exato para Agentes de IA.

---

### 4.3 Prioridade P2: Refinamento Estético, Tipográfico e Acabamento
*Polimento fino de alinhamento óptico, cores, tokens e microespaçamento.*

---

#### Item PLN-H-14: Compensação Óptica do Logotipo e Integração do Menu Mobile
- **Achados Cruzados:** `F01-6`, `F01-7`, `F01-8`, `F-18` (produtos).
- **Classificação:** Correção Global (com verificação na Home).
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/d-fold.png`, `scratchpad/st/d2-header.png`, `scratchpad/st/m-menu.png`.
  - Medição: O arquivo PNG do logotipo (`logo-telefonia-facil.png`) possui respiro transparente interno; sua mancha gráfica inicia em x≈136 no desktop e x≈18 no mobile, enquanto o grid de conteúdo inicia em x=130 e x=13, gerando desalinhamento perceptível. No menu mobile, o item "Soluções" permanece sempre expandido com 8 itens, empurrando as demais páginas para fora da tela.
- **Arquivo e Seletor Provável:**
  - `assets/css/site.css:48–52` (`.header .brand`), `assets/js/site.js:28` (`.mobile-menu`).
- **Resultado Visual Concreto:**
  - Substituição do arquivo por versão SVG sem margens transparentes ou aplicação de compensação negativa (`margin-left: -6px` no desktop, proporcional no mobile), alinhando a tinta do logo perfeitamente com a margem esquerda do texto do hero.
  - Menu mobile com acordeão interativo fechado por padrão para "Soluções", permitindo visualização imediata dos canais de contato e demais páginas sem rolagem.
- **Critérios de Aceite:**
  - Alinhamento micrométrico da extremidade esquerda do logotipo com o eixo de 130 px do grid desktop. Menu mobile compacto e navegável.
- **Dependências e Riscos:** Executar na Fase 4 (impacto transversal nas 28 rotas).

---

#### Item PLN-H-15: Racionalização de Cores e Tokens de Paleta
- **Achados Cruzados:** `T5`, `F02-4`.
- **Classificação:** Correção Local Segura (em `home-promo.css`).
- **Evidências Visuais e Viewports:**
  - Inspeção computada em `scratchpad/shots/meas-d.json`.
  - Diagnóstico: A página utiliza 4 tons de azul marinho quase indistinguíveis (`#052b43`, `#03283d`, `#03283c`, `#021f32`), 3 variações de verde (`#28e892`, `#0a7a4a`, `#21d78b`) e 13 valores pontuais de cor de texto.
- **Resultado Visual Concreto:**
  - Consolidação estrita em variáveis CSS:
    - Base escura: `--v2-navy: #03283d` (fundo principal escuro) e `--v2-navy-deep: #021f32` (faixas de contraste como tags).
    - Verde institucional da marca: `--tf-green: #28e892` (exclusivo para acentos sobre fundo escuro e botão primário).
    - Verde de leitura sobre fundo claro: `--v2-accent: #0a7a4a` (contraste >4.5:1 para links e ícones sobre branco/tint).
    - Texto: `--v2-text: #4c6171` (corpo) e `--tf-ink: #0a2740` (títulos escuros).
- **Critérios de Aceite:**
  - Eliminação de valores hexadecimais soltos no CSS. Contraste mínimo AA garantido em todos os estados.
- **Dependências e Riscos:** Risco nulo se restrito às variáveis locais de `home-promo.css`.

---

#### Item PLN-H-16: Refinamento Tipográfico do Rodapé e Microtipografia
- **Achados Cruzados:** `F11-2`, `F11-3`, `F11-4`, `F11-5`, `F11-6`, `F08-9`, `F04-5`.
- **Classificação:** Correção Local / Global (CSS) + Gate Humano (Dados de CNPJ/Endereço).
- **Evidências Visuais e Viewports:**
  - `scratchpad/shots/d-s06.png`, `scratchpad/shots/m-s10.png`.
  - Diagnóstico: Textos utilitários do rodapé com 12 px apresentam legibilidade reduzida. Rótulos das colunas utilizam caixa alta forçada com espaçamento divergente do restante da página. A lista de recursos técnicos da Seção 01 apresenta 14 termos contínuos em parágrafo indistinguível.
- **Resultado Visual Concreto:**
  - Elevação do texto do rodapé para 13–14 px no desktop e 14 px no mobile (alvos de toque confortáveis).
  - Normalização dos títulos de coluna do rodapé para padrão sentence-case regular de 14 px / peso 600.
  - Transformação da lista de recursos técnicos da Seção 01 em pequenos blocos escaneáveis (chips neutros sem contorno pesado ou grade de 3 colunas compactas).
- **Critérios de Aceite:**
  - Leitura fluída do rodapé e escaneabilidade técnica imediata na Seção 01.
- **Dependências e Riscos:** Depende do Gate PLN-G-03 para inclusão de dados formais de CNPJ e endereço corporativo.

---

## 5. Matriz Consolidada de Gates Humanos (Aprovações Requeridas)

Nenhuma das ações abaixo pode ser realizada sob pretexto de "ajuste de layout". Todas permanecem bloqueadas até instrução documentada e autorização específica dos respectivos responsáveis:

| ID do Gate | Tema / Área | Descrição do Bloqueio | Responsável Formal | Impacto Técnico / Ação Bloqueada |
|---|---|---|---|---|
| **PLN-G-01** | **Comercial / Negócio** | Definição da tabela de tarifas e ofertas (Seção 05) e das condições comerciais da Seção 03. | Owner Comercial / Gestão | Bloqueia a publicação ou alteração dos textos de ofertas da Seção 05 (`F08-1`) e Seção 03 (`F06-4`). Se as condições não estiverem validadas, as seções devem ser suprimidas ou convertidas em consulta consultiva sem menção a rascunho. |
| **PLN-G-02** | **Produto / Estratégia** | Destino de conversão do header e resolução do fluxo de Compras (`/compras/`). Destino do botão "Agentes de IA". | Dono do Produto / Coordenação Atlas | Bloqueia a unificação dos botões do header (`F01-1`, `F01-2`) e o destino do link de Agentes de IA (`F04-2`). Impede direcionamento de tráfego para telas desativadas sem alinhamento prévio. |
| **PLN-G-03** | **Jurídico / Institucional** | Confirmação formal da autorização de exibição dos logotipos de clientes (especialmente órgãos governamentais e Marinha do Brasil) e fornecimento de dados de CNPJ/sede para o rodapé. | Jurídico / Diretoria | Bloqueia a manutenção dos logos no ar (`F03-7`) e a inserção de dados regulatórios no rodapé (`F11-6`). Sem aprovação, os logos questionados devem ser retirados. |
| **PLN-G-04** | **Marca / Identidade** | Aprovação de novos materiais visuais proprietários (substituição do executivo com telefone de fio no hero e diagramas funcionais). | Direção de Arte / Marca | Bloqueia a substituição da foto do hero (`F02-1`) e a incorporação de novos SVGs ilustrativos (`T3`, `T12`). Não utilizar gráficos provisórios sem validação estética. |
| **PLN-G-05** | **Copywriting / Marca** | Unificação da taxonomia de produtos ("Linha Virtual" vs "Números Virtuais" vs "Número Fixo") e definição do slogan canônico institucional. | Equipe de Copy / Conteúdo | Bloqueia a alteração de títulos de produtos no menu, corpo e rodapé (`F00-2`, `F06-6`, `T9`). Exige entrega de um glossário comercial unificado. |

---

## 6. Declaração de Conformidade e Limitações

Em total cumprimento às regras do repositório (`AGENTS.md`), aos padrões de governança do projeto (`PROJECT_STATE.md`) e ao mandato de execução:

1. **Estado do Código:** Nenhuma linha de código (`.html`, `.css`, `.js`) foi modificada, adicionada ou removida no repositório para a produção deste plano.
2. **Estado dos Ambientes:** Não foram realizados builds de contêineres Docker, alterações em infraestrutura de VPS/Apache, testes automatizados de suíte, commits locais, pushes remotos, pull requests, merges na branch `main` ou qualquer comando de deploy para staging ou produção.
3. **Integridade de Negócio:** Nenhuma sugestão textual de preço, alegação comercial de garantia, disponibilidade de rede, promessa de contratação ou termo jurídico foi presumida ou implementada como fato consumado.
4. **Veredicto:** Este documento é uma especificação técnica propositiva de engenharia visual. A sua elaboração **não significa que as correções foram aplicadas, validadas ou aprovadas para publicação**. A transição para execução de código dependerá de nova ordem do coordenador após deliberação dos gates humanos.
