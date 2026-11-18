# Auditoria Visual — Seção 03: Linha Virtual

**Data:** 2026-11-05<br>
**Branch:** `feat/homepage-content-v2-draft`<br>
**Auditor:** Atlas (worker task_16689ff99b10)<br>
**Imagem auditada:** `assets/images/home/virtual-number-photo.webp` (1774 x 887 px, WebP VP8, 102 KB, sRGB)

---

## 1. Contexto e ambientes inspecionados

| Ambiente | Detalhe |
|---|---|
| Código-fonte | `assets/js/site.js` (linha 43), `assets/css/home-promo.css` (linhas 128-160, 220-230), `assets/css/site.css` |
| Preview local | `http://127.0.0.1:8765/` — servidor ativo, respondendo 200 OK |
| Desktop | Captura headless Chrome 1440 x 8000 px (página inteira) + recorte isolado da seção |
| Mobile | Captura headless Chrome 390 x 8000 px (página inteira) + recorte isolado da seção |
| Imagem isolada | Inspecionada diretamente em resolução nativa (1774 x 887) |
| Imagem no layout | Verificada com teste isolado em viewport de 1440 px e 390 px (loading eager) |
| Brilho da imagem | Média de luminosidade: 89,85 / 255 (≈ 35 %) — imagem predominantemente escura |

**Nota metodológica:** as capturas headless com `loading="lazy"` não carregaram a imagem na posição da Seção 03 no contexto da página completa (seção abaixo do fold). A renderização com imagem foi verificada em página de teste isolada com loading eager. A composição final em navegador real com scroll foi registrada como item não verificável.

---

## 2. Problemas observados

### P1. A imagem apresenta artefatos evidentes de geração por IA
**Gravidade: ALTA**

**Evidência visual concreta:**
- A interface de chamada exibida no smartphone e no laptop é sintética: ícone genérico de silhueta de pessoa, botões de mute/speaker/hangup simplificados que não correspondem a nenhum sistema operacional real (iOS, Android, macOS, Windows).
- A UI é visualmente idêntica nos dois dispositivos (celular e laptop) — coincidência irrealista que não ocorre em cenários reais.
- A composição da mesa (caneta, caderno, caneca, plantas) segue o enquadramento formulaico característico de imagens de stock geradas por IA.
- O headset no fundo tem proporções e posicionamento que parecem sobrepostos ao cenário.

**Leitura subjetiva:** qualquer visitante digitalmente letrado reconhecerá a imagem como gerada por IA, o que contradiz o posicionamento de marca profissional e autoral que a seção busca. A impressão resultante é de site genérico/template, não de empresa estabelecida.

---

### P2. Desequilíbrio vertical severo entre colunas no desktop
**Gravidade: ALTA**

**Evidência visual concreta (verificada no recorte desktop 1440 px):**
- Grid 50/50 (6fr / 6fr). Coluna esquerda: H2 (~112 px) + gap (28 px) + imagem (~273 px) = ≈ 413 px.
- Coluna direita: parágrafo + lista com checkmarks + separador + bloco "Condições comerciais" + botão CTA = conteúdo que se estende além da coluna esquerda.
- O CSS `align-content: start` em `.content-v2-virtual-visual` empurra título + imagem para o topo; a parte inferior da coluna esquerda fica como espaço branco morto, visível ao lado do bloco de nota e CTA da coluna direita.

**Inferência:** O visitante vê uma coluna esquerda que "termina" no meio da seção, enquanto a direita continua com conteúdo. A seção perde equilíbrio compositivo e parece inacabada.

---

### P3. Imagem escura demais para fundo branco — sem tratamento de borda
**Gravidade: MÉDIA**

**Evidência:**
- Média de luminosidade da imagem: 35 % (89,85 / 255). Mesa de madeira escura, roupa azul-marinho, telas com fundo teal escuro.
- A seção tem fundo `#fff`. A transição entre a borda escura da foto e o branco é abrupta e sem suavização.
- Não há `border-radius`, `box-shadow`, gradiente de borda ou qualquer tratamento visual que integre a imagem ao entorno branco.

**Leitura subjetiva:** a imagem funciona como um "buraco" visual na seção — um bloco denso e pesado que interrompe o fluxo leve e editorial das outras seções.

---

### P4. Proporção da imagem é achatada para o contexto de coluna
**Gravidade: MÉDIA**

**Evidência:**
- Aspect ratio 2:1 (1774 x 887). Na coluna esquerda (~546 px úteis no desktop), a imagem renderiza a ≈ 546 x 273 px.
- A altura resultante (273 px) é menor que a altura do H2 + gap acima dela, criando uma imagem que parece thumbnail/banner em vez de visual âncora.
- A orientação paisagem extrema não preenche o peso visual necessário para equilibrar o bloco de texto da coluna direita.

**Inferência:** uma imagem mais próxima de 3:2 ou 4:3 ocuparia mais altura na coluna e resolveria parcialmente o problema de desequilíbrio vertical (P2).

---

### P5. Texto alternativo gramaticalmente impreciso
**Gravidade: BAIXA**

**Evidência:**
- Atual: `alt="Profissional usando um telefone no celular e no computador, em um escritório."`
- "Usando um telefone no celular" é redundante/confuso em português — o telefone É o celular.
- Sugestão mais precisa: `"Profissional em escritório utilizando celular e laptop para chamadas de voz."`

---

### P6. No mobile (390 px), a imagem fica muito pequena
**Gravidade: BAIXA**

**Evidência (captura mobile 390 px):**
- Coluna única. A imagem ocupa a largura total do container (~364 px) com altura de ≈ 182 px.
- Entre o H2 grande (28-32 px, 2 linhas) e o bloco de texto abaixo, a imagem de 182 px é um retângulo escuro compacto que contribui pouco visualmente.
- No mobile, o conteúdo já é longo (label + H2 + image + parágrafo + 3 bullets + separador + nota + CTA); a imagem não compensa seu custo em scroll adicional.

---

### P7. Início do texto da coluna direita desalinhado do peso visual do H2
**Gravidade: OBSERVAÇÃO**

**Evidência:** o parágrafo descritivo (15 px regular) começa na mesma linha que o H2 (52 px bold) da coluna esquerda. O contraste de peso cria uma assimetria visual: o olho vai primeiro ao título pesado à esquerda e depois precisa "encontrar" o texto leve à direita. Não há ponte visual entre os dois elementos no topo da seção.

---

## 3. Pontos adequados

| # | Aspecto | Observação |
|---|---|---|
| A1 | Hierarquia tipográfica | O H2 a clamp(38px, 3.55vw, 52px) situa-se corretamente abaixo do display do hero (64 px) e acima do h3 (18 px). Tratamento bicolor (ink + green) segue o padrão das outras seções. |
| A2 | Label da seção | "03 — Linha Virtual" usa o mesmo border-top, tipo e espaçamento das seções 01, 02, 04 e 06. Consistência mantida. |
| A3 | Empilhamento mobile | A ≤980 px o grid colapsa para coluna única. A ordem (label → H2 → imagem → texto → lista → nota → CTA) é lógica e navegável. |
| A4 | Entrega técnica da imagem | WebP, 102 KB, atributos width/height explícitos (previne CLS), `loading="lazy"` + `decoding="async"`, MIME type correto, servida em 200 OK. |
| A5 | Bloco de nota ("Condições comerciais em validação") | Honesto, sem falsa urgência. Separador visual com `border-top` dá peso adequado. CTA direcionado ("Fale sobre números virtuais") é específico. |
| A6 | Conceito da imagem alinha com a mensagem | Multi-dispositivo (celular + laptop + telefone IP ao fundo) ilustra diretamente a proposta de "uso pelo celular, computador ou integração ao PABX". |
| A7 | Ritmo entre seções | A alternância de fundos (01 branco → 02 tinted → 03 branco → 04 dark navy) cria ritmo visual adequado. Cada seção tem composição própria, evitando repetição. |
| A8 | Checklist com ícones SVG | Os checkmarks verdes `::before` funcionam corretamente, são decorativos (acessibilidade OK pois o texto do `<li>` carrega a informação) e visualmente limpos. |

---

## 4. Plano priorizado de correções

| Prioridade | Ação | Impacto | Risco |
|---|---|---|---|
| **1 (Crítica)** | **Substituir a imagem por fotografia real ou, no mínimo, por uma imagem com UI de dispositivo realista e sem artefatos evidentes de IA.** Idealmente uma foto editorial produzida ou licenciada, com rostos parcialmente visíveis para conexão humana. | Elimina P1; transforma a seção de "genérica" em "autoral". | Custo de produção/licenciamento; se usar foto real, certificar licença comercial. |
| **2 (Alta)** | **Mudar o aspect ratio da imagem para ≈ 3:2 ou 4:3 (retrato ou quadrada)** para aumentar a altura na coluna e reduzir o desequilíbrio vertical. Alternativamente, mudar a composição do grid para colocar a imagem em posição diferente (ex.: span de largura total acima das duas colunas, ou imagem na coluna direita). | Resolve P2 e P4; melhora ritmo. | Exige re-cropping ou nova imagem; testar em todos os breakpoints. |
| **3 (Alta)** | **Adicionar tratamento de borda à imagem:** `border-radius: 8px` ou `12px` (consistente com outros elementos da página que usam `border-radius: 12px-18px`), e um sutil `box-shadow` ou borda de 1px para suavizar a transição escuro→branco. | Resolve P3. | Baixo risco; mudança puramente CSS. |
| **4 (Média)** | **Corrigir o alt text** para `"Profissional em escritório utilizando celular e laptop para chamadas de voz."` | Resolve P5. | Nenhum; mudança de string no JS. |
| **5 (Baixa)** | **Avaliar remoção da imagem no mobile** (≤600 px) via `display: none` na `<figure>`, se a imagem final continuar com aspect ratio wide. O conteúdo textual já é longo e a imagem de 182 px adiciona scroll sem ganho proporcional. | Ameniza P6. | Perde ilustração visual no mobile; considerar se a mensagem textual é suficiente sozinha. |
| **6 (Baixa)** | **Testar variação de layout** onde o título fica acima e a imagem ocupa a largura total do container (1 coluna no topo, 2 colunas abaixo para texto + nota). Isso mudaria o ritmo da seção em relação às demais. | Potencialmente resolve P2, P4 e P7 de uma vez. | Exige refatoração de HTML e CSS; testar impacto na coerência com as seções adjacentes. |

---

## 5. Aspectos não verificados

| # | Aspecto | Motivo |
|---|---|---|
| N1 | Composição final em navegador real com imagem carregada por scroll | `loading="lazy"` não disparou na captura headless; verificado apenas com teste isolado (loading eager). A composição H2+imagem+texto com a imagem efetivamente renderizada no layout completo precisa de confirmação em navegador real. |
| N2 | Estados de interação | Hover no CTA, focus-visible, navegação por teclado — não testados na captura estática. |
| N3 | CLS real no carregamento | Width/height devem prevenir shift, mas não foi medido o layout shift real durante a transição de placeholder → imagem carregada. |
| N4 | Cross-browser | Apenas Chrome headless. Safari, Firefox e Edge podem renderizar o WebP ou o grid layout com diferenças. |
| N5 | Fidelidade cromática em displays wide-gamut | Imagem em sRGB; não testada em displays P3 ou com filtros noturnos. |
| N6 | Comportamento em viewports intermediários (600-980 px) | As capturas foram feitas em 1440 px e 390 px. O breakpoint de 980 px (onde o grid colapsa) e o range 600-980 px não foram capturados. |
