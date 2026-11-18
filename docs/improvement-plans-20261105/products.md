# Plano de Melhoria — Produtos e Soluções (Baseado em Evidências Visuais)

| Metadado | Detalhe |
|---|---|
| **Projeto** | Site Institucional Telefonia Fácil (`2bx-systems/telefoniafacil`) |
| **Documento** | Plano de Implementação Técnica — Produtos e Soluções |
| **Referência de Auditoria** | [`docs/visual-audit-20261105/products.md`](../visual-audit-20261105/products.md) (Task `task_2830a6038fc6`, Dispatch `ctx_16f13ed6d9e1`) |
| **Auditorias Cruzadas** | Home ([`docs/visual-audit-20261105/home.md`](../visual-audit-20261105/home.md)) e Institucionais ([`docs/visual-audit-20261105/institutional.md`](../visual-audit-20261105/institutional.md)) |
| **Base do Repositório** | Branch `feat/homepage-content-v2-draft`, HEAD `5c8cc8b` (com modificações locais não commitadas) |
| **Estado** | **Planejado / Proposta técnica de melhoria**. Não é aceite de produto, aprovação de copy, validação comercial nem autorização para alterar staging/produção |
| **Escopo de Arquivos** | Planejamento sobre `assets/css/site.css`, `assets/js/site.js` e páginas de produto/solução |
| **Governança** | Conforme `AGENTS.md` e `docs/COMMUNICATION_STANDARD.md`. Sem edição de código, sem alteração de copy/preços/claims/destinos de CTAs, sem inventar assets e sem presumir que `/compras/` seja a aplicação de Compras |

---

## 1. Síntese Executiva e Diretrizes de Engenharia

O relatório de auditoria visual independente identificou **29 achados** nas 12 rotas de produtos e soluções (`/0800/`, `/chip/`, `/empresas/`, `/equipamentos/`, `/integracoes/`, `/m2m/`, `/numero-fixo/`, `/pabx/`, `/planos/`, `/sip-trunk/`, `/telefonia-movel/`, `/ura/`). A base técnica do projeto é funcional (inexistência de overflow horizontal, carregamento limpo de fontes Inter, zero erros de console), porém a camada de apresentação sofre de defeitos críticos de renderização, regressões em viewports responsivas, colapso de contraste e forte monotonia estética decorrente de um template único compartilhado por 8 das 12 rotas.

### 1.1 Diretrizes e Limites Rígidos deste Plano

1. **Separação estrita entre Defeito Técnico de Layout e Decisão de Produto/Owner:**
   - **Defeitos Técnicos (CSS/JS puro):** Problemas de geometria, quebras de grid, colisões de texto, colapso de colunas, desalinhamento de botões, foco em teclado e inversão de flags ARIA. Têm solução matemática e técnica imediata sem alterar copy ou regras de negócio.
   - **Decisões de Produto / Gates de Negócio:** Rótulos comerciais, selos promocionais ("Mais escolhido"), consistência de preços/franquias, destino e vocabulário de CTAs, reintegração ou despublicação de rotas órfãs, e substituição de imagens de banco/sintéticas por fotos reais autorizadas.
2. **Preservação dos Fluxos de Compra Desativados:**
   - A desativação de compras (flag `PURCHASE_FLOWS_ENABLED = false`, suíte `qa/purchase-flow-deactivation.test.mjs` 19/19) é intocável. Nenhuma melhoria visual reabrirá formulários de pedido, cálculo de carrinho ou pagamentos legados. `/compras/` permanece estritamente como página de transição informativa.
3. **Harmonização do Shell Global (`site.css` e `site.js`):**
   - Como o cabeçalho (`header()`), rodapé (`footer()`), faixa CTA (`.cta`), tipografia base e componentes de cartão (`.plan`, `.use-card`) são compartilhados por todo o site, este plano coordena as alterações para evitar regressões na Home (`/`) e nas 15 rotas Institucionais.
4. **Respeito aos Ativos Existentes:**
   - Nenhuma imagem nova pode ser criada arbitrariamente. Onde faltam fotos (como nos 4 cards vazios do PABX), a solução imediata é puramente tipográfica e estrutural via CSS, dependendo de gate formal para inserção de novos ativos aprovados.

---

## 2. Inventário Completo e Detalhado dos 29 Achados (F-01 a F-29)

Abaixo, cada um dos 29 achados auditados é desdobrado com cruzamento de evidências visuais brutas, arquivos-fonte, diagnóstico geométrico, proposta técnica de correção, critérios de aceite em Desktop/Mobile, classificação de governança, prioridade e análise de risco.

```
                    ┌──────────────────────────────────────────────┐
                    │       CLASSIFICAÇÃO DE ACHADOS               │
                    └──────────────────────┬───────────────────────┘
                                           │
         ┌─────────────────────────────────┴─────────────────────────────────┐
         ▼                                                                   ▼
┌─────────────────────────────────┐                         ┌─────────────────────────────────┐
│ DEFEITOS TÉCNICOS (CSS/JS)      │                         │ DECISÕES DE PRODUTO / GATES     │
│ F-01 (Colunas card plano único) │                         │ F-05 (Coerência de CTAs/Compras)│
│ F-02 (Cards vazios PABX - CSS)  │                         │ F-07 (Selo 'Mais escolhido')    │
│ F-03 (2 colunas mobile Fixo)    │                         │ F-08 (Rotas órfãs navegação)    │
│ F-11 (Linhas órfãs em grades)   │                         │ F-09 (Destino de Integrações)   │
│ F-12 (Desalinho botões base)    │                         │ F-10 (Direção de imagens hero)  │
│ F-14 (Contraste cores WCAG AA)  │                         │ F-18 (Vocabulário CTAs Header)  │
│ F-15 (FAQ aria-expanded invert) │                         │ F-19 (Copy/links do Rodapé)     │
│ F-16 (Hambúrguer focus-visible) │                         │ F-26 (Redundância em Empresas)  │
│ F-17 (Escala tipográfica/track) │                         └─────────────────────────────────┘
│ F-20 (Breadcrumb link e margem) │
│ F-21 (Área toque carrossel/alt) │
│ F-22 (Presença: sticky vazio)   │
│ F-23 (Rede: linha falsa tempo)  │
│ F-24 (Plataforma: bento verde)  │
│ F-25 (Campo: hero menta mobile) │
│ F-27 (Chip: ordem menu/legenda) │
│ F-28 (Espaçamento seções/vão M) │
│ F-29 (Arco CTA cruza texto M)   │
└─────────────────────────────────┘
```

---

### F-01 — Card de plano único quebrado em 5 rotas acima de 980px
- **Rotas e Seções Afetadas:** `/m2m/` (seção 2), `/pabx/` (seção 3), `/sip-trunk/` (seção 2), `/telefonia-movel/` (seção 2), `/ura/` (seção 2).
- **Evidência Visual:** Screenshots `/tmp/.../scratchpad/ix/m2m-single-1440.png`, `sip-trunk-single-1440.png`, `ura-single-1024.png`; capturas de página inteira `m2m.d.full.jpg`, `pabx.d.full.jpg`, `sip-trunk.d.full.jpg`, `telefonia-movel.d.full.jpg`, `ura.d.full.jpg`.
- **Medição DOM (`ix.json`):** Em 1440px no `/m2m/`, `.plan` tem largura de 540px dividida forçadamente em 4 colunas de `61.4px`, `39.1px`, `55.8px`, `229.6px`. A coluna 2 (`.plan-price`) recebe 39px de largura para um conteúdo com `scrollWidth` de 157px. No `/sip-trunk/`, "Preço por canal: R$ 79,90" quebra em cinco linhas e encosta no botão.
- **Arquivo e Seletor:**
  - `assets/css/site.css:943`: `.plans:has(> :last-child:nth-child(1)), .has-single-plan .plans { grid-template-columns: minmax(0, 540px); justify-content: center; }`
  - `assets/css/site.css:525-531`: `.has-single-plan .plan { grid-column: 1/-1; display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, .7fr) minmax(0, 1fr) auto; column-gap: 32px; align-items: center; transform: none; }`
- **Diagnóstico Técnico:** Conflito direto entre duas regras de layout horizontal. A regra da linha 943 restringe a grade a uma largura máxima estreita de 540px. Dentro dessa caixa de 540px, a regra da linha 525 impõe 4 colunas em grid com gaps de 32px, sobrando apenas frações minúsculas para o preço e para a lista de benefícios. O texto transborda as caixas computadas, colidindo visualmente com o botão. Em contraste, na rota `/planos/`, o plano único funciona porque a linha 640 (`body[data-family="pricing"] .plan-group.has-single-plan>.plan { grid-column: 2/-1; }`) permite que ele ocupe toda a largura restante do container (~950px).
- **Correção Concreta:**
  1. Alterar `site.css:943` para remover o limite de 540px no plano único horizontal: `.has-single-plan .plans { grid-template-columns: minmax(0, 100%); max-width: 980px; margin-inline: auto; }` ou permitir que ocupe a largura útil do container (`1180px`), permitindo que as 4 colunas respirem confortavelmente com `minmax(180px, 1.2fr) minmax(160px, .9fr) minmax(240px, 1.4fr) auto`.
  2. Alternativamente, caso se deseje manter o card compacto de 540px centralizado, desativar a distribuição em 4 colunas horizontais nas páginas de produto e manter o card em bloco vertical idêntico aos cards de planos convencionais (com `display: flex; flex-direction: column;`).
- **Critério de Aceite:**
  - **Desktop (1024px a 1920px):** Em `/m2m/`, `/pabx/`, `/sip-trunk/`, `/telefonia-movel/` e `/ura/`, o valor de preço ("Sob consulta" ou valor numérico) não deve transbordar sua caixa; nenhum texto da lista de recursos deve colidir com o botão; `scrollWidth <= clientWidth` em todos os nós internos de `.plan`.
  - **Mobile (390px) e Tablet (820px):** Manter renderização vertical em bloco limpa já existente (`display: block` ativado por `site.css:866`), sem quebras laterais.
- **Classificação:** Defeito técnico de CSS puro.
- **Prioridade:** **P0**.
- **Dependências / Risco:** Nenhuma dependência externa. Risco baixo; confere alívio imediato no ponto de maior intenção de conversão das 5 rotas.

---

### F-02 — Quatro cards em branco na seção 2 de `/pabx/`
- **Rotas e Seções Afetadas:** `/pabx/` (seção 2 — "Onde PABX em Nuvem gera mais valor").
- **Evidência Visual:** `pabx.d.full.jpg` (desktop), `pabx.m.full.jpg` (mobile).
- **Medição DOM:** 4 cards `.use-card` renderizados com altura mínima fixa de 380px, apresentando um grande espaço branco vazio encimado por degradê escuro na base.
- **Arquivo e Seletor:**
  - `assets/js/site.js:50`: `use:[['Saúde','Clínicas, hospitais e operadoras.',''],['Educação','Escolas e instituições.',''],['Serviços','Empresas de serviços e BPOs.',''],['Indústria','Operações e equipes em campo.','']]`
  - `assets/js/site.js:58`: `${d.use.map(u=>`<article class="use-card reveal">${u[2]?`<img src="${A(u[2])}" alt="${u[0]}">`:''}<div><h3>${u[0]}</h3><p>${u[1]}</p></div></article>`).join('')}`
  - `assets/css/site.css:558-560`:
    ```css
    body[data-family="platform"] .use-card{position:relative;min-height:380px;overflow:hidden;border:0}
    body[data-family="platform"] .use-card>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top}
    body[data-family="platform"] .use-card>div{position:absolute;inset:auto 0 0;padding:96px 20px 20px;background:linear-gradient(0deg,#03283d 38%,rgba(3,40,61,0));color:#fff}
    ```
- **Diagnóstico Técnico:** O template JavaScript define uma string vazia `''` para a imagem de cada cenário de uso no PABX. Por consequência, a tag `<img>` não é inserida no DOM. No entanto, o CSS específico da família `platform` presume a presença de uma imagem absoluta ocupando o card inteiro, fixa `min-height: 380px` e ancora o bloco de texto na base (`inset: auto 0 0`) com degradê para transparência. Como não há foto sob o degradê, os primeiros 260px superiores do card revelam o fundo branco liso da seção, parecendo visualmente uma imagem corrompida ou quebrada. Os arquivos históricos `assets/images/pabx-*.webp` possuem apenas 134×94px (miniatura) e não servem para cobrir 380px.
- **Correção Concreta:**
  1. *Correção de Layout (Imediata, sem novos assets):* Adicionar regra defensiva no CSS: `body[data-family="platform"] .use-card:not(:has(img)) { min-height: auto; padding: 28px 24px; background: #fff; border: 1px solid var(--tf-line); border-radius: 18px; box-shadow: 0 4px 20px rgba(2,35,54,.04); }` e `body[data-family="platform"] .use-card:not(:has(img))>div { position: static; padding: 0; background: none; color: var(--tf-ink); }`. Ajustar as cores de título para `var(--tf-navy)` e texto para `var(--tf-muted)`.
  2. *Correção Definitiva (Gate de Asset):* Caso o owner aprove imagens fotográficas reais de segmentos corporativos com resolução adequada (mínimo 600×400px), incluir os caminhos autorizados em `site.js:50`. Não reutilizar os webp de 134×94px.
- **Critério de Aceite:**
  - **Desktop e Mobile:** A seção 2 de `/pabx/` não exibe áreas em branco vazias com aparência de imagem não carregada. Os 4 cartões apresentam diagramação limpa, altura proporcional ao texto e tipografia legível com contraste AA.
- **Classificação:** Defeito técnico de CSS (solução imediata) + Decisão de Imagem/Asset (solução com foto).
- **Prioridade:** **P0**.
- **Dependências / Risco:** Nenhuma dependência para o ajuste de CSS tipográfico. Evita constrangimento visual imediato no principal produto B2B da empresa.

---

### F-03 — Grid de duas colunas colapsado no mobile de `/numero-fixo/`
- **Rotas e Seções Afetadas:** `/numero-fixo/` (seção 3 — "Comece com o DDD ideal para sua empresa", viewport mobile).
- **Evidência Visual:** `m-numero-plans.png`, `numero-fixo.m.full.jpg`.
- **Medição DOM (`last.json`):** Em 390px, `.plans` computa `grid-template-columns: 173px 173px`. Dentro de cada coluna de 173px (com padding interno de 2×16px, restando 141px úteis), o bloco `.plan-price` tem 142px de largura e a caixa do preço tem 127px. O botão quebra em duas linhas e a seta encolhe para ~6px.
- **Arquivo e Seletor:**
  - `assets/css/site.css:942`: `.plans:has(> :last-child:nth-child(2)){grid-template-columns:repeat(2,minmax(0,440px));justify-content:center}`
- **Diagnóstico Técnico:** A regra que equilibra grades de 2 itens foi adicionada no final do arquivo `site.css` fora de qualquer media query (`@media`). Como está posicionada após as regras de media query mobile (`@media(max-width:600px)` na linha 38), ela sobrescreve o comportamento mobile padrão (`grid-template-columns: 1fr`). Em telas de 390px, força 2 colunas de 173px onde caberia apenas uma.
- **Correção Concreta:**
  - Envolver a regra da linha 942 em media query para telas maiores:
    ```css
    @media (min-width: 601px) {
      .plans:has(> :last-child:nth-child(2)) {
        grid-template-columns: repeat(2, minmax(0, 440px));
        justify-content: center;
      }
    }
    ```
- **Critério de Aceite:**
  - **Mobile (390px e larguras < 601px):** Em `/numero-fixo/`, os cards de planos empilham-se em uma coluna única de largura total (364px no container), com preços sem overflow e botões em uma única linha com tamanho de fonte de 14px.
  - **Desktop (> 600px):** Mantém duas colunas proporcionais de até 440px centralizadas na tela.
- **Classificação:** Defeito técnico de CSS puro.
- **Prioridade:** **P0**.
- **Dependências / Risco:** Baixíssimo risco. Correção cirúrgica de uma linha que elimina deformação grave no mobile.

---

### F-04 — Supressão cega de mídia no hero mobile em 9 rotas
- **Rotas e Seções Afetadas:** `/0800/`, `/chip/`, `/equipamentos/`, `/m2m/`, `/numero-fixo/`, `/pabx/`, `/sip-trunk/`, `/telefonia-movel/`, `/ura/`.
- **Evidência Visual:** Capturas mobile `*.m.fold.jpg` e `*.m.full.jpg` de todas as rotas de produto.
- **Medição DOM:** `.hero-media` tem `display: none` computado em `< 600px`. No Chip, `.consumer-slide-media` fica oculto via `display: none`.
- **Arquivo e Seletor:**
  - `assets/css/site.css:214`: `@media(max-width:600px){.hero .hero-media,.product-hero .hero-media,.solutions-page .hero-media{display:none} ... .product-hero{background:linear-gradient(145deg,#03283d,#07516b)}}`
  - `assets/css/site.css:445`: Regras de `.consumer-hero-media`.
- **Diagnóstico Técnico:** Para contornar problemas de alinhamento no mobile antigo, foi adotada a solução destrutiva de ocultar sumariamente todas as imagens de hero (`display: none`). Como resultado, todas as páginas de produto no celular abrem com a mesma aparência: fundo azul-marinho liso, H1 e dois botões. O Chip (produto voltado para pessoa física) perde seu visual descontraído e vira idêntico a um serviço corporativo de infraestrutura; a URA perde o diagrama visual que explicava sua função.
- **Correção Concreta:**
  1. Revogar o `display: none` cego de `.product-hero .hero-media` e recompor a estrutura do hero mobile em coluna vertical: texto primeiro, seguido por uma moldura fotográfica proporcional (ex.: proporção 16:10, altura máxima de 260px) com `border-radius: 16px`, `overflow: hidden` e `object-fit: cover`.
  2. No `/chip/`, reintroduzir a foto dos slides abaixo do texto no mobile com enquadramento focado na pessoa/dispositivo.
  3. Para não degradar a performance no mobile, manter o uso de `srcset` com recortes otimizados em largura reduzida e `loading="eager"` com `fetchpriority="high"` apenas na primeira dobra.
- **Critério de Aceite:**
  - **Mobile (390px):** As páginas de produto exibem elemento visual característico na primeira dobra ou logo abaixo do CTA principal; as rotas tornam-se visualmente diferenciáveis entre si; sem estouro de layout horizontal (`scrollWidth === 390`).
- **Classificação:** Arquitetura de Layout Responsivo + Art Direction.
- **Prioridade:** **P1**.
- **Dependências / Risco:** Requer teste de LCP (Largest Contentful Paint) para assegurar que as imagens compactadas não impactem o carregamento em redes móveis.

---

### F-05 — Incoerência de CTAs de contratação com o status do site
- **Rotas e Seções Afetadas:** Todas as 12 rotas de produtos/soluções, especialmente `/telefonia-movel/`, `/empresas/`, `/pabx/`, `/chip/`.
- **Evidência Visual:** `0800.d.fold.jpg`, `telefonia-movel.d.fold.jpg`, `m-sticky-0800.jpg`, `m-sticky-equipamentos.jpg`.
- **Diagnóstico Técnico:** Dispersão e contradição nos alvos e textos de conversão. Em uma mesma tela, o usuário encontra botões com verbos fortes de compra imediata ("Contratar esta solução", "Acessar Página de Compras", "Configurar adicionais", "Configurar este plano") apontando para `../compras/...`, enquanto a faixa inferior da própria página avisa expressamente que "A nova experiência de compras está em preparação". Em `/telefonia-movel/`, o hero acumula três botões primários concorrentes; em `/empresas/`, surgem "Começar contratação" e "Montar minha contratação".
- **Correção Concreta (Diretriz Visual):**
  1. Limitar a um único botão primário com destaque verde por dobra visual.
  2. Eliminar pares de botões que possuam rótulos distintos mas apontem exatamente para o mesmo link (`href`).
  3. No hero de `/telefonia-movel/`, transformar "Planos para uso pessoal" em um link de contexto secundário ou pílula sutil, sem competir em peso com o CTA principal da solução corporativa.
  4. Manter o direcionamento para atendimento consultivo (`contato/` ou WhatsApp oficial, conforme gate de negócio) enquanto a Página de Compras permanecer em preparação.
- **Critério de Aceite:**
  - **Desktop e Mobile:** Cada dobra visual possui hierarquia clara com exatamente um botão verde de destaque primário; ações secundárias utilizam formato outline ou link de texto; sem contradição na promessa de compra da interface.
- **Classificação:** **Decisão de Produto / Gate de Copy e Comercial**.
- **Prioridade:** **P0 (Definição de Gate) / P1 (Aplicação visual)**.
- **Dependências / Risco:** Depende da aprovação formal de copy e do direcionamento comercial dos fluxos transitórios pela liderança do projeto.

---

### F-06 — Monotonia por repetição de template em 8 rotas de produto
- **Rotas e Seções Afetadas:** `/0800/`, `/equipamentos/`, `/m2m/`, `/numero-fixo/`, `/pabx/`, `/sip-trunk/`, `/telefonia-movel/`, `/ura/`.
- **Evidência Visual:** Páginas inteiras em desktop e mobile (`*.d.full.jpg`).
- **Diagnóstico Técnico:** As 8 rotas utilizam a mesma função geradora `productPage(d)` em `assets/js/site.js:58`. Todas exibem exatamente: (1) Hero split, (2) Faixa idêntica de 5 benefícios corporativos gerada por `benefits()`, (3) Seção de recursos, (4) Cenários de uso, (5) Planos e soluções, (6) FAQ padrão e (7) Faixa CTA final. O visitante que navega por múltiplos produtos tem a sensação de estar vendo a mesma página com apenas pequenos ajustes de texto.
- **Correção Concreta:**
  1. Modularizar a estrutura de página por família real de produto:
     - Rotas com planos tarifários públicos (`/0800/`, `/numero-fixo/`): trazer a oferta comparativa para cima, logo após a introdução.
     - Rotas de infraestrutura crítica (`/sip-trunk/`, `/pabx/`): abrir com arquitetura técnica e continuidade operacional.
     - Rotas de catálogo físico (`/equipamentos/`): estruturar em catálogo com filtros por tipo de hardware.
  2. Suprimir a faixa repetitiva de 5 benefícios onde ela for redundante ou substituí-la por atributos técnicos específicos do produto.
- **Critério de Aceite:**
  - **Desktop e Mobile:** O percurso do usuário entre `/pabx/`, `/0800/`, `/sip-trunk/` e `/equipamentos/` apresenta estruturas de página adaptadas ao modelo de decisão de cada produto, mantendo a coerência do sistema de design.
- **Classificação:** Arquitetura da Informação e Design de Produto.
- **Prioridade:** **P1**.
- **Dependências / Risco:** Exige coordenação com o coordenador para aprovar variações de estrutura sem violar os limites de copy.

---

### F-07 — Uso indiscriminado do selo "Mais escolhido"
- **Rotas e Seções Afetadas:** `/0800/` (cards de planos), `/sip-trunk/` (card de plano único).
- **Evidência Visual:** `0800.d.full.jpg`, `sip-trunk.d.full.jpg`.
- **Arquivo e Seletor:**
  - `assets/js/site.js:127`: `featured: true` aplicado a 3 dos 5 planos de 0800 (Franquia R$ 50, R$ 100 e R$ 300).
  - `assets/js/site.js:128`: `featured: true` aplicado ao "Plano SIP Trunk", que é o único plano existente no catálogo da rota.
- **Diagnóstico Técnico:** A indicação "Mais escolhido" perde qualquer credibilidade estatística quando é atribuída a mais da metade dos itens da mesma grade (em 0800) ou quando qualifica uma opção única e exclusiva (em SIP Trunk).
- **Correção Concreta:**
  1. No catálogo de `/0800/`, manter no máximo 1 plano com o destaque `featured: true` (ou remover de todos se não houver métrica comercial validada).
  2. No catálogo de `/sip-trunk/`, remover a propriedade `featured: true` do plano único, eliminando o selo "Mais escolhido".
- **Critério de Aceite:**
  - **Desktop e Mobile:** Em nenhuma grade há mais de um card com selo de destaque; planos únicos nunca exibem selo "Mais escolhido".
- **Classificação:** **Decisão Comercial / Gate de Produto**.
- **Prioridade:** **P1**.
- **Dependências / Risco:** Confirmação com a área comercial sobre qual plano de 0800 deve legitimamente reter o destaque.

---

### F-08 — Rotas órfãs inalcançáveis pela navegação principal
- **Rotas Afetadas:** `/planos/`, `/empresas/`, `/integracoes/` (zero links internos no DOM); `/chip/` (alcançável por apenas 1 link).
- **Evidência Visual:** Varredura completa do DOM em 25 rotas (`last.json`: `inbound: { empresas: [], integracoes: [], planos: [] }`).
- **Arquivo e Seletor:**
  - `assets/js/site.js:28` (mega menu não inclui as rotas).
  - `assets/js/site.js:109-111`: `if(page!=='chip'){ document.querySelectorAll('.navlinks a[href$="empresas/"], .mobile-menu a[href$="empresas/"]').forEach(link=>link.remove()); }`
  - `assets/js/site.js:204`: No Chip, o botão "Para empresas" aponta para `../` (home) em vez de `empresas/`.
- **Diagnóstico Técnico:** Três páginas ativas do repositório estão completamente órfãs, não recebendo tráfego orgânico de navegação interna. O script `site.js` remove ativamente os links de `/empresas/` no cabeçalho B2B e o Chip não aponta para ela.
- **Correção Concreta:**
  1. *Gate de Decisão:* O produto define se `/planos/`, `/empresas/` e `/integracoes/` permanecem no ar como páginas institucionais de suporte ou se devem ser descontinuadas.
  2. *Reintegração Visual:* Caso mantidas:
     - Incluir link de `/planos/` e `/empresas/` no cabeçalho e rodapé.
     - Corrigir o destino de "Para empresas" no Chip para apontar para `../empresas/`.
     - Vincular `/integracoes/` a partir de seções de tecnologia em `/pabx/` e `/ura/`.
     - Adicionar ponto de descoberta para `/chip/` no menu ou na página de Telefonia Móvel.
- **Critério de Aceite:**
  - Todas as rotas publicadas possuem ao menos 2 links internos canônicos na navegação institucional.
- **Classificação:** **Decisão de Produto / Arquitetura de Informação**.
- **Prioridade:** **P0 (Definição de Rotas) / P1 (Ajuste de Navegação)**.
- **Dependências / Risco:** Gate de owners.

---

### F-09 — `/integracoes/` sem visual, sem profundidade e sem CTA próprio
- **Rotas Afetadas:** `/integracoes/`.
- **Evidência Visual:** `integracoes.d.full.jpg`, `integracoes.m.full.jpg`.
- **Diagnóstico Técnico:** A página possui apenas 1179px de altura em desktop, é a menor do site, não possui imagem, não explica os fluxos de integração técnica e encerra em um CTA genérico.
- **Correção Concreta:**
  - Conforme a decisão do achado F-08: caso seja mantida, redesenhá-la com um diagrama central de integração (conectando PABX/URA aos sistemas de CRM, Helpdesk e APIs) e formulário de contato para suporte a integrações. Caso contrário, fundir seu conteúdo como recurso nas páginas de PABX e URA.
- **Critério de Aceite:**
  - Página integrada e informativa ou despublicada de forma limpa sem links quebrados.
- **Classificação:** Decisão de Conteúdo / Produto.
- **Prioridade:** **P2**.
- **Dependências / Risco:** Depende da decisão de F-08.

---

### F-10 — Direção visual de fotos com anel verde embutido e cortes secos
- **Rotas Afetadas:** `/0800/`, `/chip/`, `/equipamentos/`, `/m2m/`, `/numero-fixo/`, `/pabx/`, `/sip-trunk/`, `/telefonia-movel/`, `/ura/`.
- **Evidência Visual:** Capturas `*.d.fold.jpg` e arquivos em `assets/images/product-*.png`.
- **Diagnóstico Técnico:** Todas as imagens de abertura de produto trazem o mesmo anel verde fluorescente embutido na renderização raster, dando aparência artificial de imagem gerada por IA de baixa personalização. Na faixa de SIP Trunk, a cabeça do atendente é decepada pela borda superior e há 45% de escuridão vazia à esquerda; no M2M, o tablet de bordo é cortado pela base; no Número Fixo, o efeito de bolhas de cidades soa improvisado.
- **Correção Concreta:**
  1. Ajustar as regras de CSS de posicionamento e enquadramento (`object-position`, `background-position`) para evitar cortes anatômicos de pessoas e objetos nas faixas de hero.
  2. Substituir a linguagem do anel verde por grafismos geométricos reais derivados do vetor do logotipo da marca (linhas de conexão, nós de rede).
  3. Planejar para o ciclo fotográfico definitivo a adoção de imagens reais de equipamentos e ambientes autênticos de operação.
- **Critério de Aceite:**
  - As imagens de hero exibem personagens e dispositivos sem cortes secos acidentais; a marca se expressa por tipografia e paleta, sem o artifício do anel repetitivo.
- **Classificação:** Direção de Imagem / Design Asset Gate.
- **Prioridade:** **P1**.
- **Dependências / Risco:** Gate de novos assets visuais aprovados pela marca.

---

### F-11 — Linhas órfãs em grades de planos e hierarquia invertida
- **Rotas Afetadas:** `/0800/` (seção 2 — 5 cards em grade de 3), `/chip/` (seção 2 — 5 cards em grade de 4).
- **Evidência Visual:** `0800.d.full.jpg`, `chip.d.full.jpg`.
- **Arquivo e Seletor:**
  - `assets/css/site.css:28` (`.plans`), `site.css:435` (`.consumer-plan-grid`), `assets/js/site.js:204`.
- **Diagnóstico Técnico:** Em `/0800/`, 5 cards numa grade de 3 deixam a segunda linha com 2 cards e 1 espaço vazio assimétrico à direita. No `/chip/`, 5 cards numa grade de 4 deixam o plano de 30 GB isolado com 3 espaços vazios. Além disso, nos cards do Chip, a frase "Valores e condições sob consulta" é estilizada a 28px, competindo e pesando mais visualmente do que a franquia de dados (5 GB, 8 GB, etc.), que é o dado diferenciador da compra.
- **Correção Concreta:**
  1. Em `/0800/`: transformar a apresentação dos 5 planos tarifários em uma tabela comparativa elegante (seção 6 da auditoria) ou estruturar o grid flexível para centralizar os 2 cards inferiores (`display: flex; justify-content: center; flex-wrap: wrap;`).
  2. No `/chip/`: utilizar grade responsiva balanceada de 5 colunas no desktop largo (`grid-template-columns: repeat(5, minmax(0, 1fr))`) ou layout 3 + 2 harmonioso. Reduzir a tipografia da nota de consulta para 14px em cinza neutro e destacar a franquia como elemento hierárquico principal.
- **Critério de Aceite:**
  - Grades sem cartões órfãos soltos nas pontas; franquias claramente identificadas como elemento principal do card.
- **Classificação:** Defeito técnico de CSS/Layout + Hierarquia Tipográfica.
- **Prioridade:** **P1**.
- **Dependências / Risco:** Baixo risco.

---

### F-12 — CTAs desalinhados na base de cards com alturas desiguais
- **Rotas Afetadas:** `/0800/`, `/numero-fixo/`, `/chip/` (cards de planos).
- **Evidência Visual:** `0800.d.full.jpg`, `numero-fixo.d.full.jpg`, `chip.d.full.jpg`.
- **Arquivo e Seletor:**
  - `assets/css/site.css:28`: `.plan`, `.plan .btn`.
- **Diagnóstico Técnico:** Nos cartões de planos, o botão CTA é posicionado logo após a lista `<ul>`. Como a quantidade de linhas de texto dos benefícios ou descrições varia entre os planos, cada botão fica ancorado em uma altura vertical diferente, resultando em uma linha visual denteada e amadora. Em contrapartida, em `/equipamentos/`, o alinhamento é perfeito porque a linha 938 aplica `.equipment-plan .btn { margin-top: auto; }`.
- **Correção Concreta:**
  - Padronizar `.plan` e `.consumer-plan` como contêineres flexíveis verticais:
    ```css
    .plan, .consumer-plan {
      display: flex;
      flex-direction: column;
    }
    .plan .btn, .consumer-plan .btn, .consumer-plan .chip-select {
      margin-top: auto;
    }
    ```
- **Critério de Aceite:**
  - Em todas as grades de planos (desktop e tablet), todos os botões CTA da mesma linha de cards ficam perfeitamente alinhados na mesma coordenada Y inferior.
- **Classificação:** Defeito técnico de CSS puro.
- **Prioridade:** **P1**.
- **Dependências / Risco:** Zero risco. Melhora visual imediata de acabamento.

---

### F-13 — Perda de orientação em páginas ultra longas e salto de títulos
- **Rotas Afetadas:** `/planos/` (D 6685px / M 15225px), `/equipamentos/` (D 5007px / M 11597px).
- **Evidência Visual:** `planos.m.full.jpg`, `equipamentos.m.full.jpg`.
- **Arquivo e Seletor:**
  - `assets/js/site.js:149-150`, `site.js:178-180`: `groups.map(([label,key])=>`<div class="plan-group"><div class="section-label">${label}</div>...`).
- **Diagnóstico Técnico:** Em mobile, rolar 15.000px sem índice ou ancoragem desorienta o usuário. No `/planos/`, não existem títulos `<h2>` nos 8 grupos de planos (ocorre um salto de acessibilidade `<h1>` -> `<h3>`). No `/equipamentos/`, 12 cartões sucessivos sem divisão misturam 9 telefones, 2 headsets e 1 adaptador ATA em um feed infinito.
- **Correção Concreta:**
  1. Em `/planos/`, transformar o rótulo do grupo em `<h2>` semântico: `<h2 class="section-label">${label}</h2>` e disponibilizar barra horizontal de âncoras para navegação rápida entre categorias.
  2. Em `/equipamentos/`, segmentar o catálogo em 3 abas ou blocos com cabeçalhos próprios: *Telefones IP*, *Headsets Profissionais* e *Adaptadores e Gateways*.
- **Critério de Aceite:**
  - Hierarquia de cabeçalhos sem saltos de nível no leitor de tela; usuário consegue saltar diretamente para a categoria de equipamento ou plano desejada no mobile.
- **Classificação:** Arquitetura de Informação + Acessibilidade.
- **Prioridade:** **P1**.
- **Dependências / Risco:** Baixo risco.

---

### F-14 — Falhas de contraste WCAG AA em selos, fundos e botões
- **Rotas Afetadas:** Selo da faixa CTA em 9 rotas; `/equipamentos/` e `/telefonia-movel/` (hero menta); `/chip/` (respostas do FAQ e alvos mobile); `/integracoes/`.
- **Evidência Visual:** `ix.json` (cálculo de contraste).
- **Medição:**
  - Selo "ATENDIMENTO CONSULTIVO" na faixa CTA: cor `rgb(10,122,76)` sobre fundo azul-marinho resulta em contraste de **2,16:1 a 3,13:1** (reprova WCAG AA, que exige 4,5:1).
  - Parágrafos de texto sobre o fundo menta (`--tf-mint`): **4,30:1** (abaixo de 4,5:1).
  - Respostas do FAQ do Chip: **4,12:1**.
  - Alvos de clique do FAQ do Chip mobile: botões com altura de 30px (abaixo da meta de 44px).
- **Arquivo e Seletor:**
  - `assets/css/site.css:18`: `.section-label { color: var(--tf-green-ink); }`
  - `assets/css/site.css:26`: `.cta`
  - `assets/css/site.css:598`: `.product-hero .hero-copy p`
  - `assets/js/site.js:204`: `.consumer-faq-grid details summary`
- **Correção Concreta:**
  1. Na faixa CTA escura, definir explicitamente: `.cta .section-label { color: var(--tf-green); }` (contraste > 7:1).
  2. No hero menta, escurecer o cinza de apoio: `body[data-family="field"] .product-hero .hero-copy p { color: #021f32; }` (contraste > 9:1).
  3. No FAQ do Chip, escurecer a cor de texto das respostas para `#1b303e` e garantir `min-height: 44px; display: flex; align-items: center;` no botão/summary de acionamento.
- **Critério de Aceite:**
  - 100% dos textos e selos de todas as rotas passam nos critérios de conformidade WCAG 2.1 AA (mínimo de 4,5:1 para texto normal e 3:1 para texto grande). Alvos de toque touch `>= 44×44px`.
- **Classificação:** Defeito técnico de Acessibilidade / CSS puro.
- **Prioridade:** **P0 (Selo CTA) / P1 (Demais)**.
- **Dependências / Risco:** Zero risco.

---

### F-15 — Inversão de estado `aria-expanded` no FAQ das 8 rotas B2B
- **Rotas Afetadas:** `/0800/`, `/equipamentos/`, `/m2m/`, `/numero-fixo/`, `/pabx/`, `/sip-trunk/`, `/telefonia-movel/`, `/ura/`.
- **Evidência Visual:** `d-faq.png`, medições DOM em `/0800/`.
- **Arquivo e Seletor:**
  - `assets/js/site.js:283`: `button.addEventListener('click',()=>button.setAttribute('aria-expanded',String(button.parentElement.classList.contains('open'))));`
  - `assets/js/site.js:470`: `document.querySelectorAll('.faq-q').forEach(b=>b.addEventListener('click',()=>b.parentElement.classList.toggle('open')));`
- **Diagnóstico Técnico:** Existem dois event listeners de clique registrados no mesmo botão `.faq-q`. O listener da linha 283 foi atachado primeiro. Quando o usuário clica, ele roda e verifica se a classe `.open` já está presente; como ela ainda não foi alternada, atribui `aria-expanded="false"`. Em seguida, o segundo listener (linha 470) é executado e faz o `toggle('open')`, abrindo a resposta na tela. O resultado é que a pergunta aberta fica com `aria-expanded="false"` e a fechada fica com `"true"`, enganando leitores de tela.
- **Correção Concreta:**
  - Unificar a lógica em uma única rotina coerente no `site.js`:
    ```javascript
    document.querySelectorAll('.faq-q').forEach(button => {
      button.addEventListener('click', () => {
        const item = button.parentElement;
        const isOpen = item.classList.toggle('open');
        button.setAttribute('aria-expanded', String(isOpen));
      });
    });
    ```
- **Critério de Aceite:**
  - Ao expandir uma dúvida, `aria-expanded` computa exatamente `"true"`; ao recolher, computa `"false"`.
- **Classificação:** Defeito técnico de JavaScript puro.
- **Prioridade:** **P0**.
- **Dependências / Risco:** Baixo risco.

---

### F-16 — Hambúrguer mobile sem indicador de foco por teclado
- **Rotas Afetadas:** Todas as rotas no breakpoint mobile/tablet (< 1120px).
- **Evidência Visual:** `last.json` (`mobKeys`: "hamb | outline none 0px | shadow none").
- **Arquivo e Seletor:**
  - `assets/css/site.css:917`: `.hamb:hover,.hamb:focus,.hamb:focus-visible{border:0!important;box-shadow:none!important;outline:0!important}`
- **Diagnóstico Técnico:** A diretiva `outline: 0 !important` em `:focus-visible` elimina por completo o anel de foco nativo do navegador para usuários que navegam por teclado em telas mobile/tablet, violando o critério WCAG 2.4.7 (Focus Visible).
- **Correção Concreta:**
  - Alterar a linha 917 para preservar o foco visível em navegação assistida:
    ```css
    .hamb:focus-visible {
      outline: 3px solid var(--tf-green) !important;
      outline-offset: 3px !important;
    }
    ```
- **Critério de Aceite:**
  - Ao tabular até o botão hambúrguer, surge um anel de foco nítido e de alto contraste.
- **Classificação:** Defeito técnico de Acessibilidade / CSS puro.
- **Prioridade:** **P0**.
- **Dependências / Risco:** Zero risco.

---

### F-17 — Despadronização na escala tipográfica e tracking agressivo
- **Rotas Afetadas:** Todas as 12 rotas, em especial `/pabx/`, `/planos/`, `/0800/`.
- **Evidência Visual:** `last.json` (`type`).
- **Medição:**
  - H1 varia aleatoriamente entre rotas: 84px (`pabx`, `ura`), 72px (`0800`, `numero-fixo`), 68px (`empresas`), 58px (`chip`), 56px (`integracoes`), 52px (`planos`). No mobile, o H1 de `/planos/` tem 52px (4 linhas), maior do que as páginas de produto (46.8px).
  - H2 tem 54px com tracking de `-0.045em` (-2,43px) e H1 atinge `-0.055em`, fazendo as letras colidirem em fontes de peso alto.
  - Salto abrupto de H2 54px para parágrafo de 14px sem nível intermediário. Botões a 13px.
- **Correção Concreta:**
  1. Padronizar escala modular no `site.css`:
     - H1 Desktop: `clamp(44px, 4.8vw, 64px)`; H1 Mobile: `clamp(32px, 7vw, 40px)`.
     - H2 Desktop: `clamp(32px, 3.2vw, 42px)`; H2 Mobile: `26px`.
     - Suavizar tracking: máximo de `-0.025em` para títulos display, evitando colisão de caracteres.
  2. Ajustar texto de apoio para 16px e botões para 14-15px com `font-weight: 700`.
- **Critério de Aceite:**
  - Hierarquia tipográfica harmoniosa e legível em todos os tamanhos de tela; glifos sem sobreposição.
- **Classificação:** Sistema de Design / CSS Tipográfico.
- **Prioridade:** **P1**.
- **Dependências / Risco:** Coordenação com as melhorias tipográficas propostas na Home e nas páginas Institucionais.

---

### F-18 — Ruído e instabilidade no cabeçalho global
- **Rotas Afetadas:** Todas as rotas (shell global).
- **Evidência Visual:** `0800.d.fold.jpg`, `d-dropdown.jpg`.
- **Arquivo e Seletor:**
  - `assets/js/site.js:28`: `header()`.
- **Diagnóstico Técnico:**
  - Cabeçalho em `position: relative` desaparece na rolagem.
  - No bloco `.actions`, convivem lado a lado o link de texto `.purchase-link` ("Página de Compras") e o botão verde `.btn-primary` ("Acessar Página de Compras"), gerando redundância e ruído visual.
  - No menu, o item "Soluções" abre o dropdown enquanto o botão outline traz "Ver soluções".
  - O logotipo PNG possui uma margem transparente interna de ~6px, desalinhando o desenho visível do início do grid de conteúdo.
  - Links da topbar medem apenas 18px de altura útil.
- **Correção Concreta:**
  1. Em coordenação com o Shell Global, unificar a ação de compra transitória em um único elemento ou substituí-la por CTA consultivo ("Fale com a equipe").
  2. Retirar o botão duplicado "Ver soluções" das ações de desktop, mantendo o acesso limpo via menu dropdown.
  3. Compensar os 6px de respiro interno do logo no CSS (`margin-left: -6px;`) para alinhamento pixel-perfect com o container.
- **Critério de Aceite:**
  - Cabeçalho limpo, com exatamente um botão primário de destaque e alinhamento visual rigoroso com a grade do conteúdo.
- **Classificação:** Shell Global / Header (cruza com Home e Institucionais).
- **Prioridade:** **P1**.
- **Dependências / Risco:** Alinhamento com a implementação global do header em todo o site.

---

### F-19 — Rodapé incompleto e inconsistência de rótulos
- **Rotas Afetadas:** Todas as 12 rotas (shell global).
- **Arquivo e Seletor:**
  - `assets/js/site.js:29`: `footer()`.
- **Diagnóstico Técnico:** A coluna "Soluções" do rodapé omite 4 dos 8 produtos (Telefonia Móvel, M2M / IoT, Equipamentos e URA não são listados); o rótulo "E1 e SIP Trunk" diverge do nome oficial da página ("SIP Trunk"); "Clientes" aponta para `cases/`, divergindo do nome "Cases" do menu. O rodapé do Chip exibe copy institucional voltada para empresas.
- **Correção Concreta:**
  1. Atualizar a coluna de Soluções para cobrir as categorias completas do portfólio.
  2. Unificar os rótulos de navegação institucional ("Cases" em vez de "Clientes").
  3. No `/chip/`, permitir variação de copy no rodapé adequada ao público B2C.
- **Critério de Aceite:**
  - Rodapé com links para todas as soluções e sem rótulos divergentes da barra superior.
- **Classificação:** Shell Global / Rodapé (Gate de Copy).
- **Prioridade:** **P1**.
- **Dependências / Risco:** Validação de copy dos links com os owners.

---

### F-20 — Breadcrumbs estáticos e desalinhamento em `network`
- **Rotas Afetadas:** `/0800/`, `/pabx/`, `/sip-trunk/`, `/m2m/`, `/ura/`, etc.
- **Arquivo e Seletor:**
  - `assets/js/site.js:58`: `<div class="breadcrumb">Soluções › ${d.title}</div>`
  - `assets/css/site.css:585-595`: `body[data-family="network"] .product-hero .hero-copy`
- **Diagnóstico Técnico:** O breadcrumb é apenas texto e não link navegável para `/solucoes/`. Na família `network` (`/sip-trunk/`, `/m2m/`), a regra de grid coloca o breadcrumb colado diretamente sobre o H1 sem respiro. Na rota `/ura/`, o breadcrumb cita "Soluções › URA" enquanto o H1 traz "URA Personalizada".
- **Correção Concreta:**
  - Converter "Soluções" em link: `<nav class="breadcrumb" aria-label="Navegação estrutural"><a href="../solucoes/">Soluções</a> › <span>${d.title}</span></nav>`.
  - Adicionar `margin-bottom: 12px;` na regra de breadcrumb da família `network`.
- **Critério de Aceite:**
  - Breadcrumb navegável com espaçamento correto sobre o H1 em todas as famílias de página.
- **Classificação:** Defeito técnico de UX / CSS e Markup.
- **Prioridade:** **P2**.
- **Dependências / Risco:** Zero risco.

---

### F-21 — Acessibilidade de carrossel e textos alternativos de imagem
- **Rotas Afetadas:** `/chip/` (carrossel), heros de todas as 8 rotas B2B.
- **Arquivo e Seletor:**
  - `assets/js/site.js:58`: `alt="${d.title}"` gerando alts secos como "0800" ou "URA".
  - `assets/js/site.js:380-385`: carrossel sem controle de pausa explícito.
- **Diagnóstico Técnico:** Atributos `alt` genéricos não descrevem o conteúdo da imagem para deficientes visuais. O carrossel automático do Chip pausa em `mouseenter`, mas em telas touch mobile não há botão explícito para parar o movimento.
- **Correção Concreta:**
  1. Fornecer descrições contextuais nos atributos `alt` em `productData`.
  2. Implementar botão acessível de Pausar/Reproduzir no carrossel do Chip.
- **Critério de Aceite:**
  - Conformidade com diretrizes WCAG para mídias interativas e imagens descritivas.
- **Classificação:** Acessibilidade / JavaScript e Conteúdo.
- **Prioridade:** **P2**.
- **Dependências / Risco:** Baixo risco.

---

### F-22 — Família `presence`: sticky inútil e coluna esquerda vazia
- **Rotas Afetadas:** `/0800/` (seção 1), `/numero-fixo/` (seção 1).
- **Evidência Visual:** `0800.d.full.jpg`, `numero-fixo.d.full.jpg`.
- **Arquivo e Seletor:**
  - `assets/css/site.css:534-536`: `body[data-family="presence"] main>section:has(.feature-row) .section-head{position:sticky;top:112px;}`
- **Diagnóstico Técnico:** O cabeçalho da coluna esquerda fica em `sticky`, mas como o bloco de texto tem apenas ~150px e a coluna direita tem 4 itens (~420px), cria-se um buraco de 230px de espaço vazio sob o texto antes de a seção acabar.
- **Correção Concreta:**
  - Remover a propriedade `position: sticky;` e reequilibrar o grid com proporção mais harmônica (`1fr 1fr`), adicionando um card de síntese ou badge institucional na coluna esquerda.
- **Critério de Aceite:**
  - Distribuição visual preenchida e equilibrada entre as duas colunas no desktop.
- **Classificação:** Defeito técnico de CSS / Composição.
- **Prioridade:** **P2**.
- **Dependências / Risco:** Baixo risco.

---

### F-23 — Família `network`: metáfora falsa de linha do tempo
- **Rotas Afetadas:** `/sip-trunk/` (seção 1), `/m2m/` (seção 1), `/integracoes/`.
- **Evidência Visual:** `sip-trunk.d.full.jpg`, `m2m.d.full.jpg`.
- **Arquivo e Seletor:**
  - `assets/css/site.css:565-572`: `body[data-family="network"] .feature-row:before` (linha 2px horizontal) e `.feature:before` (círculo 18px).
- **Diagnóstico Técnico:** A linha contínua com nós circulares transmite a ideia de etapas cronológicas sequenciais (Passo 1, Passo 2...), quando na verdade são apenas 4 recursos independentes do produto.
- **Correção Concreta:**
  - Remover o pseudoelemento de linha contínua e os círculos decorativos. Apresentar os recursos em cards modernos independentes ou em um diagrama de topologia real (ex.: PABX -> Rede SIP -> Telecom).
- **Critério de Aceite:**
  - Apresentação clara de recursos técnicos sem simular processo sequencial falso.
- **Classificação:** Design Visual / CSS.
- **Prioridade:** **P1**.
- **Dependências / Risco:** Baixo risco.

---

### F-24 — Família `platform`: bento verde invasivo e excesso de escuridão
- **Rotas Afetadas:** `/pabx/` (seção 1), `/ura/` (seção 1).
- **Evidência Visual:** `pabx.d.full.jpg`, `ura.d.full.jpg`.
- **Arquivo e Seletor:**
  - `assets/css/site.css:545-555`: `.feature:first-child{background:var(--tf-green);}`
- **Diagnóstico Técnico:** O primeiro card do bento grid tem fundo verde sólido enorme com muito vazio interno. Como o verde é a cor dos CTAs de conversão, confunde o usuário que tenta clicar nele. Além disso, a sucessão de Hero escuro + Faixa escura + Seção de recursos escura cria um túnel monocromático sem respiro.
- **Correção Concreta:**
  1. Alterar o fundo do primeiro card do bento para azul-marinho profundo com borda sutil e ícone verde, reservando a cor verde sólida para botões clicáveis.
  2. Alternar o fundo da seção para cinza suave claro (`#f7fafc`), criando separação nítida em relação ao hero.
- **Critério de Aceite:**
  - Verde restrito a ações interativas; ritmo alternado de claro e escuro entre seções.
- **Classificação:** Design Visual / Hierarquia de Cores.
- **Prioridade:** **P1**.
- **Dependências / Risco:** Baixo risco.

---

### F-25 — Família `field`: colapso da identidade menta no mobile
- **Rotas Afetadas:** `/telefonia-movel/`, `/equipamentos/`.
- **Evidência Visual:** `telefonia-movel.m.fold.jpg`, `equipamentos.m.fold.jpg`.
- **Arquivo e Seletor:**
  - `assets/css/site.css:214` (força hero navy no mobile) e `site.css:598` (aplica menta apenas acima de 981px).
- **Diagnóstico Técnico:** No desktop, a família `field` tem fundo menta característico. No mobile, a regra da linha 214 força o hero para azul-marinho, mas a seção seguinte continua em menta, gerando incoerência estética grave na transição responsiva.
- **Correção Concreta:**
  - Aplicar o fundo menta no hero de forma global no seletor `body[data-family="field"] .product-hero`, inclusive no mobile, ajustando as cores de títulos e botões para alto contraste escuro sobre menta.
- **Critério de Aceite:**
  - Identidade menta preservada consistentemente no desktop e no mobile.
- **Classificação:** Defeito técnico de CSS / Responsividade.
- **Prioridade:** **P1**.
- **Dependências / Risco:** Baixo risco.

---

### F-26 — `/empresas/`: triagem redundante nas seções 1 e 2
- **Rotas Afetadas:** `/empresas/`.
- **Evidência Visual:** `empresas.d.full.jpg`.
- **Diagnóstico Técnico:** A seção 1 (escada de maturidade) e a seção 2 ("Comece pela necessidade, não pelo jargão") repetem a mesma lógica de triagem com 6 botões idênticos "Conhecer solução".
- **Correção Concreta:**
  - Preservar a escada como elemento central forte da página e remodelar a seção 2 para focar em diferenciais de implantação ou comparativo direto de cenários corporativos, sem duplicar a triagem.
- **Critério de Aceite:**
  - Cada seção da página de empresas cumpre um papel editorial distinto.
- **Classificação:** Arquitetura de Conteúdo / Redação (Gate de Copy).
- **Prioridade:** **P2**.
- **Dependências / Risco:** Gate de copy e aprovação do coordenador.

---

### F-27 — Micro-ajustes na experiência do `/chip/`
- **Rotas Afetadas:** `/chip/`.
- **Evidência Visual:** `chip.m.fold.jpg`, `chip.d.fold.jpg`.
- **Diagnóstico Técnico:** Menu âncora lista "Planos" antes de "Benefícios", mas no DOM a seção de benefícios aparece antes da de planos. No mobile, o fundo escuro do hero emenda com o fundo escuro da seção seguinte sem linha de corte.
- **Correção Concreta:**
  1. No `site.js:204`, ordenar o menu: `Benefícios` e depois `Planos`.
  2. Adicionar uma borda sutil ou alternar o tom de fundo entre o hero mobile e a seção subsequente.
- **Critério de Aceite:**
  - Navegação âncora sincronizada com a ordem física da tela; separação visual de blocos no mobile.
- **Classificação:** Defeito técnico de UX / CSS.
- **Prioridade:** **P2**.
- **Dependências / Risco:** Baixo risco.

---

### F-28 — Ritmo espacial fixo de 74px e vão ocioso no mobile
- **Rotas Afetadas:** Todas as rotas.
- **Arquivo e Seletor:**
  - `assets/css/site.css:18`: `.section { padding: 74px 0; }` e `.section-head { gap: 34px; margin-bottom: 32px; }`.
- **Diagnóstico Técnico:** Espaçamento rígido de 74px em todas as seções torna a leitura monótona. No mobile, a separação vertical entre o H2 e o parágrafo de apoio do `.section-head` atinge ~50px devido a herança de alinhamentos do desktop.
- **Correção Concreta:**
  - No mobile (`@media(max-width:600px)`), reduzir o padding de seção para `48px 0` e o vão interno do cabeçalho de seção para `12px`.
- **Critério de Aceite:**
  - Ritmo compacto e títulos visualmente conectados aos seus respectivos textos de apoio no mobile.
- **Classificação:** Defeito técnico de CSS / Espaçamento.
- **Prioridade:** **P2**.
- **Dependências / Risco:** Zero risco.

---

### F-29 — Faixa CTA final: arco decorativo cruza sobre o texto no mobile
- **Rotas Afetadas:** Todas as rotas com faixa CTA padrão escura (`/0800/`, `/chip/`, `/pabx/`, `/ura/`, `/m2m/`, `/sip-trunk/`, etc.).
- **Evidência Visual:** `0800.m.sheet0.jpg`, `chip.m.sheet0.jpg`, `m2m.m.sheet0.jpg`.
- **Arquivo e Seletor:**
  - `assets/css/site.css:26`: `.cta:after{content:"";position:absolute;right:-110px;top:-95px;width:400px;height:260px;border:1px solid rgba(40,232,146,.35);border-radius:50%;transform:rotate(16deg)}`
- **Diagnóstico Técnico:** Em telas de 390px, o container de texto da faixa CTA fica mais estreito e alto. O círculo decorativo gerado pelo pseudoelemento `:after` atravessa exatamente o selo e as primeiras linhas de texto, gerando ruído e sujidade visual sobre a tipografia.
- **Correção Concreta:**
  - Na media query mobile (`@media(max-width:600px)`), ajustar a posição do arco para fora da zona de texto ou ocultá-lo:
    ```css
    @media (max-width: 600px) {
      .cta:after {
        right: -180px;
        top: auto;
        bottom: -120px;
        opacity: 0.15;
      }
    }
    ```
- **Critério de Aceite:**
  - Nenhum elemento decorativo atravessa ou colide com textos ou selos da faixa CTA em mobile.
- **Classificação:** Defeito técnico de CSS puro.
- **Prioridade:** **P2**.
- **Dependências / Risco:** Zero risco.

---

## 3. Matriz de Cobertura e Cruzamento: Rotas × Achados

A matriz abaixo consolida o mapeamento exato de quais achados afetam cada uma das 12 rotas do lote, diferenciando falhas sistêmicas compartilhadas de falhas locais de rota:

| Rota | Família | Achados Críticos / P0 | Achados P1 (Estrutura e Qualidade) | Achados P2 (Refino e Acabamento) |
|---|---|---|---|---|
| `/0800/` | `presence` | **F-14** (selo CTA), **F-15** (FAQ), **F-16** (menu mobile) | **F-04** (hero M), **F-05** (CTAs), **F-06** (template), **F-07** (selos), **F-10** (fotos), **F-11** (grade 5x3), **F-12** (botões), **F-17** (tipo), **F-18** (header), **F-19** (rodapé) | **F-20** (breadcrumb), **F-21** (alt), **F-22** (sticky vazio), **F-28** (ritmo), **F-29** (arco CTA) |
| `/chip/` | `consumer` | **F-16** (menu mobile) | **F-04** (slide M), **F-05** (CTAs), **F-10** (fotos), **F-11** (grade 5x4 e 28px), **F-12** (botões), **F-14** (FAQ alvo/cor), **F-17** (tipo), **F-18** (header), **F-19** (rodapé) | **F-21** (pausa toque), **F-27** (ordem menu/legenda), **F-28** (ritmo), **F-29** (arco CTA) |
| `/empresas/` | `ladder` | **F-16** (menu mobile) | **F-05** (CTAs triagem), **F-08** (rota órfã), **F-17** (tipo), **F-18** (header), **F-19** (rodapé) | **F-26** (redundância seções 1 e 2), **F-28** (ritmo) |
| `/equipamentos/` | `field` | **F-14** (selo CTA), **F-15** (FAQ), **F-16** (menu mobile) | **F-04** (hero M), **F-05** (CTAs), **F-06** (template), **F-10** (fotos), **F-13** (catálogo 12 cards), **F-14** (menta), **F-17** (tipo), **F-18** (header), **F-19** (rodapé), **F-25** (menta mobile) | **F-20** (breadcrumb), **F-21** (alt), **F-28** (ritmo), **F-29** (arco CTA) |
| `/integracoes/` | `hubline` | **F-16** (menu mobile) | **F-08** (rota órfã), **F-09** (página rascunho), **F-14** (contraste), **F-17** (tipo), **F-18** (header), **F-19** (rodapé), **F-23** (linha falsa) | **F-28** (ritmo) |
| `/m2m/` | `network` | **F-01** (card esmagado), **F-14** (selo CTA), **F-15** (FAQ), **F-16** (menu mobile) | **F-04** (hero M), **F-05** (CTAs), **F-06** (template), **F-10** (corte tablet), **F-17** (tipo), **F-18** (header), **F-19** (rodapé), **F-23** (linha falsa) | **F-20** (breadcrumb colado), **F-21** (alt), **F-28** (ritmo), **F-29** (arco CTA) |
| `/numero-fixo/` | `presence` | **F-03** (2 colunas mobile), **F-14** (selo CTA), **F-15** (FAQ), **F-16** (menu mobile) | **F-04** (hero M), **F-05** (CTAs), **F-06** (template), **F-10** (bolhas cidades), **F-12** (botões), **F-17** (tipo), **F-18** (header), **F-19** (rodapé) | **F-20** (breadcrumb), **F-21** (alt), **F-22** (sticky vazio), **F-28** (ritmo), **F-29** (arco CTA) |
| `/pabx/` | `platform` | **F-01** (card esmagado), **F-02** (4 cards vazios), **F-14** (selo CTA), **F-15** (FAQ), **F-16** (menu mobile) | **F-04** (hero M), **F-05** (CTAs), **F-06** (template), **F-10** (fotos), **F-17** (tipo), **F-18** (header), **F-19** (rodapé), **F-24** (bento verde invasivo) | **F-20** (breadcrumb), **F-21** (alt), **F-28** (ritmo), **F-29** (arco CTA) |
| `/planos/` | `pricing` | **F-14** (selo CTA), **F-16** (menu mobile) | **F-05** (CTAs), **F-08** (rota órfã), **F-13** (página 15k px sem H2/índice), **F-17** (H1 52px mobile), **F-18** (header), **F-19** (rodapé) | **F-28** (ritmo) |
| `/sip-trunk/` | `network` | **F-01** (card esmagado), **F-14** (selo CTA), **F-15** (FAQ), **F-16** (menu mobile) | **F-04** (hero M), **F-05** (CTAs), **F-06** (template), **F-07** (selo plano único), **F-10** (cabeça cortada), **F-17** (tipo), **F-18** (header), **F-19** (rodapé), **F-23** (linha falsa) | **F-20** (breadcrumb colado), **F-21** (alt), **F-28** (ritmo), **F-29** (arco CTA) |
| `/telefonia-movel/` | `field` | **F-01** (card esmagado), **F-14** (selo CTA), **F-15** (FAQ), **F-16** (menu mobile) | **F-04** (hero M), **F-05** (3 CTAs concorrentes), **F-06** (template), **F-10** (fotos), **F-14** (menta), **F-17** (tipo), **F-18** (header), **F-19** (rodapé), **F-25** (menta mobile) | **F-20** (breadcrumb), **F-21** (alt), **F-28** (ritmo), **F-29** (arco CTA) |
| `/ura/` | `platform` | **F-01** (card esmagado), **F-14** (selo CTA), **F-15** (FAQ), **F-16** (menu mobile) | **F-04** (hero M perde diagrama), **F-05** (CTAs), **F-06** (template), **F-10** (fotos), **F-17** (tipo), **F-18** (header), **F-19** (rodapé), **F-24** (bento verde invasivo) | **F-20** (breadcrumb vs H1), **F-21** (alt), **F-28** (ritmo), **F-29** (arco CTA) |

---

## 4. Gestão de Conflitos e Impactos Globais (`site.css` e `site.js`)

Como os arquivos `assets/css/site.css` e `assets/js/site.js` são globais e compartilhados por todo o domínio, qualquer alteração destinada a produtos tem potencial de repercutir na Home e nas páginas Institucionais. Abaixo está o plano de contenção de efeitos colaterais:

### 4.1 Seletores de Classes e Escopo de CSS

1. **Seletores de Planos (`.plans`, `.plan`, `.has-single-plan`):**
   - *Impacto Cruzado:* A classe `.plans` existe em rotas de produto e na página `/planos/`.
   - *Regra de Isolamento:* A correção de F-01 e F-03 deve ser aplicada estritamente no seletor genérico `.has-single-plan .plans` e dentro de media query `@media(min-width:601px)` para `.plans:has(> :last-child:nth-child(2))`. Nenhuma regra com `grid-column` forçado deve ser injetada fora do escopo de `.has-single-plan`.
2. **Faixa CTA e Rodapé (`.cta`, `.footer`):**
   - *Impacto Cruzado:* Presente em 27 das 28 rotas do site. A auditoria Institucional relatou problemas idênticos de contraste no selo (I-08).
   - *Regra de Isolamento:* A regra `.cta .section-label { color: var(--tf-green); }` (F-14) beneficia simultaneamente produtos e institucionais. O ajuste do pseudoelemento `.cta:after` (F-29) protege o texto em mobile sem alterar o visual desktop da Home.
3. **Menu Hambúrguer e Foco (`.hamb`, `:focus-visible`):**
   - *Impacto Cruzado:* O seletor `.hamb` em `site.css:917` é idêntico em todas as páginas. A restauração do `outline` para acessibilidade em F-16 resolve uma não-conformidade transversal em todo o site.
4. **Escala Tipográfica Global (H1, H2, Tracking):**
   - *Impacto Cruzado:* A Home possui regras próprias em `home-promo.css`, mas compartilha classes de `site.css`. A página `/sobre/` teve colisão de H1 reportada em I-01.
   - *Regra de Isolamento:* Qualquer ajuste de escala de H1 deve ser escopado por família (`body[data-family="presence"]`, `body[data-family="platform"]`) ou via clamp padronizado, testando explicitamente a página `/sobre/` para não reintroduzir a colisão com a foto resolvida em I-01.

### 4.2 Script Compartilhado (`site.js`)

1. **Event Listeners de FAQ (F-15):**
   - O FAQ ocorre em 8 páginas de produtos e em páginas de suporte. A unificação do listener em uma única função evita duplicação de listeners e garante consistência universal de acessibilidade.
2. **Desativação de Fluxos de Compra (Proteção Regressiva):**
   - Nenhuma linha de código sob `if (PURCHASE_FLOWS_ENABLED)` deve ser ativada ou modificada. A suíte focal `node --test qa/purchase-flow-deactivation.test.mjs` (19 testes) deve permanecer 100% verde após qualquer alteração em `site.js`.

---

## 5. Ordem Sequencial de Implementação Recomendada (Roadmap em Fases)

Para mitigar riscos e respeitar as dependências de negócio, a execução deve seguir rigorosamente cinco etapas sequenciais:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ FASE 0: GATES DE NEGÓCIO E ALINHAMENTO COM COORDENADOR                       │
│ • Definição de rotas órfãs (F-08, F-09) e hierarquia de CTAs (F-05)         │
│ • Aprovação do selo comercial 'Mais escolhido' (F-07)                       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│ FASE 1: CORREÇÕES P0 — LAYOUT E APRESENTAÇÃO CRÍTICA (CSS)                  │
│ • F-01: Remoção do esmagamento de colunas em cards de plano único           │
│ • F-02: Eliminação do vazio branco de 380px no PABX (modo tipográfico)      │
│ • F-03: Media query para evitar 2 colunas em 390px no Número Fixo           │
│ • F-16: Restauração do anel de foco (:focus-visible) no botão hambúrguer    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│ FASE 2: ACESSIBILIDADE NORMATIVA E INTERAÇÃO JS                             │
│ • F-14: Correção do contraste WCAG AA no selo da faixa CTA e fundos menta   │
│ • F-15: Unificação de listeners do FAQ (aria-expanded sincronizado)         │
│ • F-21: Alvos de toque >= 44px e atributos alt descritivos                  │
│ • F-29: Reposicionamento do arco decorativo CTA no mobile                   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│ FASE 3: ESTRUTURA DE GRIDS, ALINHAMENTOS E PÁGINAS LONGAS                    │
│ • F-11: Resolução de linhas órfãs em 0800 e Chip                            │
│ • F-12: Ancoragem inferior de botões CTA (margin-top: auto)                 │
│ • F-13: Inserção de H2 e índices nas páginas longas (Planos / Equipamentos) │
│ • F-20: Breadcrumb com link estrutural e respiro vertical                   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│ FASE 4: HARMONIZAÇÃO DO SHELL GLOBAL E NAVEGAÇÃO                            │
│ • F-17: Padronização de escala tipográfica e suavização de tracking         │
│ • F-18: Limpeza de botões concorrentes no cabeçalho e alinhamento do logo   │
│ • F-19: Extensão do rodapé para cobrir todos os produtos                    │
│ • F-08 / F-09: Interligação das rotas aprovadas pelos owners                │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│ FASE 5: DIFERENCIAÇÃO DE FAMÍLIAS, HERO MOBILE E DIREÇÃO VISUAL              │
│ • F-04: Recomposição de mídia nos heros mobile (Chip, URA, Equipamentos)    │
│ • F-23: Substituição da linha do tempo falsa por diagramas de topologia     │
│ • F-24: Desativação do bento verde invasivo e alternância de fundos         │
│ • F-25: Continuidade da identidade menta no mobile da família field         │
│ • F-06 / F-10: Módulos exclusivos por produto e novas imagens aprovadas     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Matriz de Gates de Decisão (Produto, Comercial, Copy e Ativos)

Os itens abaixo **não podem ser implementados por iniciativa autônoma de desenvolvimento** sem formalização prévia:

| Código | Tema do Gate | Decisão Pendente do Owner | Impacto Técnico no Código |
|---|---|---|---|
| **GATE-01** | CTAs de Compra Transformativa (F-05) | Definir se botões primários direcionam para `contato/`, WhatsApp comercial ou mantêm `compras/` com copy explicitamente informativa | Alteração dos links e textos gerados por `purchaseHref()` em `site.js` |
| **GATE-02** | Rotas Órfãs (F-08, F-09) | Decidir se `/planos/`, `/empresas/` e `/integracoes/` serão promovidas à navegação oficial ou descontinuadas do sitemap | Ajuste nos arrays de links de `header()` e `footer()` em `site.js` |
| **GATE-03** | Selo "Mais escolhido" (F-07) | Indicar qual plano de 0800 possui evidência de preferência de clientes e autorizar a retirada do selo em SIP Trunk | Modificação das propriedades `featured: true/false` em `plansCatalog` (`site.js`) |
| **GATE-04** | Imagens de Cenários PABX (F-02) | Decidir se serão contratadas fotos profissionais para os 4 segmentos ou se a seção permanece com design tipográfico | Inserção de URLs válidas em `productData.pabx.use` (`site.js`) |
| **GATE-05** | Direção de Arte de Heros (F-10) | Aprovar novas fotografias de produto sem o artifício do anel verde e com enquadramentos sem cortes corporais | Substituição dos arquivos PNG em `assets/images/` e compilação de `IMG_MASTERS` |
| **GATE-06** | Copy do Rodapé no Chip (F-19) | Aprovar texto de encerramento focado em pessoas físicas para a rota B2C | Condicional em `footer()` para páginas sob a classe `.consumer-page` |

---

## 7. Critérios de Homologação, Verificação e Não-Regressão

Toda implementação técnica decorrente deste plano deverá submeter-se à seguinte esteira de verificação antes de qualquer consideração de aceite:

1. **Integridade de Testes Automatizados (Focal Suite):**
   - Executar `node --check assets/js/site.js` (saída 0, sem erros sintáticos).
   - Executar `node --test qa/purchase-flow-deactivation.test.mjs` (resultado obrigatório: 19/19 testes aprovados, 0 skips, 0 falhas).
   - Executar `git diff --check` (sem espaços em branco espúrios ou conflitos).
2. **Inspeção em Chromium Headless Multi-Viewport:**
   - Testar as 12 rotas em larguras canônicas: **1440px** (desktop amplo), **1024px** (notebook/tablet horizontal), **820px** (tablet vertical) e **390px** (smartphone touch).
   - Verificar ausência estrita de overflow horizontal: `document.documentElement.scrollWidth === window.innerWidth` em 100% das páginas.
   - Avaliação de render dos cards de plano único: `scrollWidth <= clientWidth` em todos os elementos filhos de `.has-single-plan .plan`.
3. **Varredura de Acessibilidade (Lighthouse / Axe / Emulador):**
   - 0 violações de contraste WCAG 2.1 AA em textos, botões e selos de destaque.
   - Presença do anel de foco visível em todos os alvos navegáveis por teclado (incluindo o hambúrguer mobile).
   - Atributos `aria-expanded` e `aria-controls` perfeitamente sincronizados no FAQ e no menu mobile.
4. **Verificação de Performance e Payloads:**
   - Conferir se a reintrodução de imagens nos heros mobile utiliza `srcset` com dimensões adequadas, sem elevar o peso da página acima de limites aceitáveis para conexões 4G.
