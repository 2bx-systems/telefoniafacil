# Revalidação independente — Errata 02 do pacote de prontidão do Site

**Data:** 2026-11-03 (America/Sao_Paulo)
**Projeto:** `tf-site-institutional` — Site Institucional Telefonia Fácil; `company_id` formal não confirmado
**Branch/HEAD:** `feat/deactivate-site-purchase-flows` / `c824a21bfc18bd848b977e32f831833eab02cd40`
**Revisor:** worker de revalidação (Claude Haiku 5.5), task `task_b068eb465271`, dispatch `ctx_766ae5874e66`, run `run_25c102a8f7dd`, terminal `term_3cf853f5-b4df-4936-937d-42198041028e` (recibo Orca somente leitura, `dispatch-show` e `terminal show`)
**Coordenação:** terminal `term_43d69c17-42e1-4af9-8373-574ea3427889`
**Não são autores deste revisor:** autor técnico `task_0ceea1ab96dc`/`ctx_c0545240f625`; revisor anterior `task_90901de4fed4`/`ctx_2666273fd7d4`; autor da errata `task_76b47b1773d2`/`ctx_521f159ce513`.

**Escopo deste documento:** única escrita autorizada. Não altera consolidado, errata, originais, código, copy, teste, asserção ou configuração. Não executou testes, `node`, build, container, navegador, serviços externos, escrita em Jira/GitHub, produção nem leitura de segredos. Não trabalhou nos projetos irmãos.

---

## 1. Veredito de auditoria

**ACEITÁVEL DOCUMENTALMENTE, com ressalvas não bloqueantes.**

- O bloqueio de staging está corretamente sustentado: a tag `telefoniafacil-site-staging:tf-1` não tem digest, não corresponde ao worktree (cache `20260910-51` servido) e o ID `f2703…` não foi reconfirmado. Nenhum documento afirma aceite de produto, staging, Jira ou escrita remota desta auditoria.
- Todos os itens A1–A8 e D1–D7 têm disposição coerente com a fonte. As contagens (32 / 27 / 28 / 24) e a flag A5 foram reconferidas por leitura.
- Restam **seis inconsistências acionáveis** (§4). Nenhuma muda o veredito de staging bloqueado. Três delas afetam como a documentação descreve o estado do GitHub, do Jira e do teste da flag. Devem ser corrigidas antes de o pacote ser usado como base de aceite pelo Hermes.

---

## 2. Matriz de reconciliação

### 2.1 Achados A1–A8 e D6–D7

| Item | Verificação nesta revalidação | Evidência exata | Veredito |
|---|---|---|---|
| **A1** — TF-1 como referência Jira | Confirmado. `worker-technical.md` ainda diz TF-1 nas linhas 9, 45 e 166; BRIEF, READINESS, DECISIONS, BACKLOG e RUNBOOK dizem TF-2 como vínculo. Original preservado. | `grep -n TF-1 worker-technical.md` → linhas 9, 45 (matriz item 19), 166. `TRACKING.md`: TF-2 ID 11293 é o vínculo; TF-1 é só staging. | **Reconciliado** |
| **A2** — Tenant Jira não registrado | Os fatos da errata conferem: 404 de TF-1 em `2bxsistemas.atlassian.net` está em `evidence-coordinator/independent-checks.md`; TF-2 em `2bx.atlassian.net` é read-back de Hermes. **Ressalva:** a errata e a READINESS chamam `2bxsistemas` de "tenant errado". Isso é inferência pelo nome do host. `PROJECT_STATE.md` (seção "Ordem atual", 15:41:19) registra TF-1 ID 11292 encontrado por busca ao vivo em `2bx.atlassian.net`. A conclusão correta é "host diferente, natureza não verificada". | `independent-checks.md`, seção Jira; `PROJECT_STATE.md`, seção "Ordem atual" | **Reconciliado, com redação a corrigir** (§4, item 4) |
| **A3** — ID Docker `f2703…` | Confirmado. Observado às 13:30:30 −03:00 pelo worker (`docker-historical-readonly.txt` §1, `RepoTags=[]`, `RepoDigests=[]`). Ausente na inspeção posterior do coordenador. Tag `tf-1` → `6f6b640…`, imagem criada às 13:42:27 −03:00. **Ressalva de redação:** a READINESS e a errata dizem "tag criada às 13:42:27". O arquivo diz que a imagem foi criada nesse horário e que a tag foi **reapontada**; o momento do reapontamento não está registrado. | `docker-historical-readonly.txt` §1–2; `independent-checks.md`, seção Docker | **Reconciliado**, com redação a ajustar (§4, item 5) |
| **A4** — `.dockerignore` e `shots/` / `nginx.conf` | Confirmado. `.dockerignore` tem 8 linhas: `.git`, `.gitignore`, `.DS_Store`, `.env*`, `PROJECT_STATE.md`, `qa/`, `AUDITORIA-PLANOS-OFICIAIS.md`, `README.md`. Não exclui `QA.md`, `Dockerfile`, `docs/`, `shots/`, `nginx.conf`. `Dockerfile:2–3` = `COPY nginx.conf …` e `COPY . /usr/share/nginx/html`. `shots/` existe com um único subdiretório `after/`, vazio. `nginx.conf` existe. | `cat .dockerignore`; `cat Dockerfile`; `ls -la shots/after` | **Verificado** |
| **A5** — flag e código legado de pagamento | Confirmado. `assets/js/site.js:4` = `const PURCHASE_FLOWS_ENABLED=false;`. Linhas guardadas pela flag: 172, 181–184, 193, 195, 196, 253, 280–310 (com guardas internas em 283, 293), 375. Não guardados: `mailto:` em `:25`, `:26`, `:87` (topbar, rodapé, contato) e `:393` (submit de `/contato/`). **Ressalva (§4, item 1):** a errata e o BACKLOG dizem que falta "teste que falhe se a flag virar `true`". Já existe, em `qa/purchase-flow-deactivation.test.mjs:58` (`assert.match(source, /const PURCHASE_FLOWS_ENABLED\s*=\s*false/)`), uma asserção que falha se a constante virar `true`. O que falta é o vínculo com aprovação formal, e não a existência de teste. | `site.js:4`; grep de `PURCHASE_FLOWS_ENABLED` e `mailto:`; `qa/…test.mjs:56–70` | **Confirmado, com correção de redação** |
| **A6** — contagem de arquivos modificados | Confirmado. `git diff --name-only \| wc -l` = **32**; `git diff --name-only -- '*.html' \| wc -l` = **27**; `git ls-files '*.html'` = 27; `git ls-files --others --exclude-standard` lista apenas `compras/index.html` entre os HTML. Comparação normalizada (`site.js?v=…` → `X`) de cada HTML rastreado contra `HEAD`: **nenhuma diferença**, ou seja, 27/27 idênticos. `git diff --check` exit 0. Tracked não-HTML: `assets/js/site.js`, `sitemap.xml`, `QA.md`, `.dockerignore`, `README.md`. | comandos citados; saída vazia na comparação de 27 arquivos | **Verificado** |
| **A7** — 27 tracked e 28 HTML | Confirmado. 28 arquivos com `site.js?v=20261103-53` (27 tracked + `compras/index.html`). `noindex` apenas em `compras/index.html:8`. `sitemap.xml`: `grep -c '<loc>'` = 24; nenhum `contratar`, `compras`, `carrinho` ou `checkout` no sitemap. | `grep -l`; `grep -n noindex`; `grep -c '<loc>' sitemap.xml` | **Verificado** |
| **A8** — escopo da evidência de testes | Confirmado: a errata separa as fontes (§4 da errata). Nesta revalidação não foram reexecutados `node --check`, `node --test` nem render. A evidência 19/19 continua sendo do worker técnico e do coordenador, em 2026-11-03. | `ERRATA-20261103-02.md` §4; `evidence-technical/node-test-focused-19.txt` | **Reconciliado** |
| **D6** — "Codex/Luna" × `term_43d69c17` | Confirmado por recibo somente leitura: `terminal show --terminal term_43d69c17-…`: `agentIdentity: codex`, preview "GPT-6-Luna medium", `orphaned: false`. `evidence/2026-11-03/orca-tasks.json` contém `"agent":"codex/gpt-6-luna"` para o dispatch anterior do mesmo coordenador. Não há dois coordenadores. | `terminal show`; `orca-tasks.json` | **Resolvido por recibo** |
| **D7** — `--from term_4201f3c8` no brief | Recibos conferem a identidade: `term_4201f3c8-…` é `agentIdentity: claude`, `orphaned: true`; `ctx_2666273fd7d4` (task `task_90901de4fed4`) tem `assignee_handle` = `term_4201f3c8`, `creator_handle` = `term_43d69c17` via `ctx_742943a681ac`, `status: completed`, `completed_at` 2026-11-03T19:05:56.556Z. **Limite:** o texto do brief que contém o `--from` não está no pacote; a leitura "remetente = próprio worker" depende do texto citado em `worker-review.md` §4 e não é verificável aqui. | `dispatch-show --task task_90901de4fed4 --json`; `terminal show` | **Resolvido por recibo**, com o limite declarado |

### 2.2 Mapa D1–D5 do revisor anterior

| Revisor | Tema | Mapeado para | Situação |
|---|---|---|---|
| D1 | Jira de referência TF-1 em `worker-technical.md` | A1 | Mapeado; verificado |
| D2 | Tenant Jira | A2 | Mapeado; verificado, com redação a corrigir |
| D3 | Existência do ID `f2703` | A3 | Mapeado; verificado |
| D4 | 31 vs 32 arquivos | A6 | Mapeado; verificado |
| D5 | `shots/` ausente da lista de exclusão | A4 | Mapeado; verificado |

Nenhum D1–D5 ficou sem tratamento.

### 2.3 Pontos específicos pedidos

| Ponto | Verificação | Veredito |
|---|---|---|
| **Busca GitHub vazia de 15:41 × criação da #1 às 16:00:24 × estado atual** | `evidence/2026-11-03/github-open.json` tem `updated_at` **15:41:19**, e o arquivo foi gravado às 15:41:29 (mtime). `sync-20261103/github-create.json` tem mtime **16:00:24.49**; o próprio arquivo **não** contém horário, apenas a URL `…/issues/1`. READINESS (linha Git/GitHub) e errata §5 separam bem a busca histórica do estado atual (Issue #1 OPEN). **Lacunas:** (a) a READINESS cita 15:41:29, que é o mtime, e não o `updated_at` interno 15:41:19; (b) o `independent-checks.md` (seção "GitHub — leitura ao vivo") registra "busca por issues abertas: zero resultados" **sem horário**. A READINESS só classifica a busca de 15:41 e a de branch. Essa busca não datada não está classificada, e `PROJECT_STATE.md` (checkpoint 16:00) repete "nenhuma Issue aberta", o que contradiz a Issue #1 OPEN se não for lida como anterior à criação. | Parcial (ver §4, itens 2 e 3) |
| **Jira TF-2 11293 "Em andamento", sem assignee, read-back de Hermes com horário não informado** | `TRACKING.md`, `sync-20261103/final-readback.json` e `coordinator-mailbox-readback.json` existem. A `final-readback.json` contém o vínculo TF-2 e o comentário do GitHub, mas **não** traz horário do read-back de TF-2 que eu tenha localizado. Os mtimes (16:03:30 e 16:04:47) são de arquivo, não de leitura. A READINESS, o BRIEF e a errata dizem "horário não informado" e **não** afirmam reconsulta própria. Correto. Não há reconsulta minha ao Jira. | Correto como está |
| **Issue #1 OPEN sem assignee, read-back de Hermes** | `final-readback.json` contém `github.output` com a URL; `PROJECT_STATE.md` (marco 16:14:34) registra GET exato do comentário 6613153032. Documentos dizem "read-back de Hermes", sem reconsulta. | Correto como está |
| **Separação TF-1 (só staging) × TF-2 (auditoria)** | READINESS, BRIEF, DECISIONS, BACKLOG, RUNBOOK e `TRACKING.md` concordam: TF-2 = auditoria; TF-1 = staging do site, "Em andamento com waiting-approval". Nenhum documento usa TF-1 como status desta auditoria, exceto o `worker-technical.md` preservado (A1). | Confirmado |
| **Tenants corretos e errados** | Correto: `2bx.atlassian.net` para TF-2. Errado para o vínculo: `2bxsistemas.atlassian.net`. A natureza do segundo tenant é inferida (ver A2). | Confirmado, com ressalva |
| **Cronologia Docker** | Observado 13:30:30 (`f2703`, sem tag, sem digest) → tag `tf-1` aponta para `6f6b640…`, imagem criada 13:42:27 → inspeção posterior do coordenador não encontra `f2703`. Estado atual de `f2703` é **inconclusivo**, não reinspecionado. Os documentos dizem isso. | Confirmado (ver redação em A3) |
| **`shots/` e `nginx.conf` na política de empacotamento** | `shots/` (somente `after/`, vazio) e `nginx.conf` estão fora de `.dockerignore`, e o `Dockerfile` faz `COPY .`. Estão na lista de exclusão a testar em BACKLOG (P1) e RUNBOOK (gate 3 e passo 8). | Confirmado |
| **Risco da flag A5** | Confirmado (§2.1). Documentos dizem corretamente que a flag é a única barreira. Ver correção de redação sobre o teste existente. | Confirmado, com ressalva |
| **Contagens A6/A7** | Confirmados (§2.1). | Confirmado |
| **Escopo de evidência A8** | Confirmado. READINESS e errata separam o que é de 2026-11-03 e de qual fonte. | Confirmado |
| **Resolução D6/D7 por recibos** | Confirmada (§2.1). | Confirmado |

### 2.4 Limites, owners e gates

| Item | Verificação | Situação |
|---|---|---|
| Owners de negócio, técnico, staging, deploy, privacidade | DECISIONS, BACKLOG e errata §6 marcam "desconhecido" ou "não nomeado". Nenhum documento atribui owner por inferência (TF-1 não é atribuído). | Correto |
| Gates humanos abertos | DECISIONS lista 5 gates; "Nenhum gate foi satisfeito pela criação deste pacote documental". | Correto |
| Copy/CTA | Proposta em `COPY_DECISIONS.md` (externo) não aplicada; `DECISIONS.md` marca como "não são decisões". | Correto |
| Ausência de aceite de produto, staging ou Jira write | Busca nos documentos consolidados por "aceit", "aprovad", "sincroniz", "production-ready": todas as ocorrências negam aceite ou falam de arquitetura não aprovada. BRIEF "Estado de aceite" diz explicitamente que não é produto aprovado nem Jira sincronizado. | Correto |
| Escritas remotas registradas no pacote | Issue #1 é mencionada como criada às 16:00:24. **Não** mencionados no pacote: comentário Jira `10350` e comentário GitHub `6613153032`, ambos de Hermes, registrados em `PROJECT_STATE.md` e `TRACKING.md`. São escritas remotas ligadas a esta auditoria, ainda que não sejam de produto. | Lacuna de rastreabilidade (§4, item 6) |

---

## 3. Evidência exata desta revalidação

| Verificação | Comando ou fonte | Resultado |
|---|---|---|
| Arquivos modificados | `git diff --name-only \| wc -l` | 32 |
| HTML modificados e rastreados | `git diff --name-only -- '*.html' \| wc -l`; `git ls-files '*.html' \| wc -l` | 27; 27 |
| HTML não rastreados | `git ls-files --others --exclude-standard` | `compras/index.html` entre os HTML |
| Conteúdo dos 27 HTML além do token de cache | Comparação com `git show HEAD:<f>`, após `s/site\.js\?v=[0-9-]+/site.js?v=X/` | Nenhuma diferença |
| Diff check | `git diff --check` | exit 0 |
| Token de cache | `grep -l 'site.js?v=20261103-53'` nos HTML rastreados e `compras/index.html` | 28 |
| Sitemap | `grep -c '<loc>' sitemap.xml` | 24 |
| `noindex` | `grep -n noindex` nos HTML | somente `compras/index.html:8` |
| Flag | `grep -n PURCHASE_FLOWS_ENABLED assets/js/site.js` | `:4` (definição) e guardas nas linhas listadas em A5 |
| `mailto:` | `grep -n -o 'mailto:…' assets/js/site.js` | `:25`, `:26`, `:87`, `:193`, `:253`, `:393` |
| `.dockerignore` | `cat .dockerignore` | 8 linhas, sem `QA.md`, `Dockerfile`, `docs/`, `shots/`, `nginx.conf` |
| Dockerfile | `cat Dockerfile` | `COPY nginx.conf …`; `COPY . /usr/share/nginx/html` |
| `shots/` | `ls -la shots/after` | diretório vazio |
| Asserção da flag | `qa/purchase-flow-deactivation.test.mjs:58` | `assert.match(source, /const PURCHASE_FLOWS_ENABLED\s*=\s*false/)` |
| Timestamp da busca GitHub | `evidence/2026-11-03/github-open.json` | `updated_at` 15:41:19 −03:00; mtime 15:41:29 |
| Timestamp da criação da #1 | `sync-20261103/github-create.json` | mtime 16:00:24.49 −03:00; sem horário interno |
| Recibo de dispatch | `orchestration dispatch-show --task task_90901de4fed4 --json` | `ctx_2666273fd7d4`, `completed`, `assignee term_4201f3c8`, `creator term_43d69c17`, `completed_at 19:05:56.556Z` |
| Recibo de dispatch | `orchestration dispatch-show --task task_0ceea1ab96dc --json` | `ctx_c0545240f625`, `completed`, `assignee term_7954634d`, `completed_at 18:56:52.999Z` |
| Recibo de dispatch | `orchestration dispatch-show --task task_76b47b1773d2 --json` | `ctx_521f159ce513`, **`completed`** (no momento da errata estava `dispatched`), `completed_at 19:21:15.965Z` = 16:21:15 −03:00 |
| Recibo de dispatch | `orchestration dispatch-show --task task_45af41bf1576 --json` | `ctx_d12b70984abe`, `dispatched`, assignee `term_43d69c17`, creator `term_867ffc82` (Hermes) |
| Recibo de dispatch (eu) | `orchestration dispatch-show --task task_b068eb465271 --json` | `ctx_766ae5874e66`, `dispatched`, run `run_25c102a8f7dd`, assignee `term_3cf853f5`, creator `term_43d69c17` via `ctx_d12b70984abe` |
| Identidade do coordenador | `terminal show --terminal term_43d69c17-…` | `agentIdentity: codex`, "GPT-6-Luna medium", `orphaned: false` |
| Identidade do revisor anterior | `terminal show --terminal term_4201f3c8-…` | `agentIdentity: claude`, `orphaned: true` |
| Terminais em `orphaned: true` | `terminal show` de `term_4201f3c8`, `term_f53581a2`, `term_7954634d`, `term_3cf853f5` | os quatro com `orphaned: true` |

Os comandos de Orca usados são somente de leitura (`dispatch-show`, `terminal show`). Não foi usado `orchestration check`, para não consumir o inbox do coordenador.

---

## 4. Inconsistências acionáveis remanescentes

Nenhuma é bloqueante para o veredito de staging. As seis devem entrar em uma próxima rodada documental antes de o Hermes usar o pacote como base de aceite.

| # | Local | Problema | Correção sugerida | Owner |
|---|---|---|---|---|
| 1 | `BACKLOG.md` (P1 código legado); `ERRATA-20261103-02.md` §1 A5 e §6; `READINESS.md` blocker 9 | Afirmam que o teste de guarda da flag "não está implementado". Já existe `qa/purchase-flow-deactivation.test.mjs:58`, que falha se a constante virar `true`. Falta apenas a ligação com aprovação formal. | Trocar por: "a asserção atual já falha se `PURCHASE_FLOWS_ENABLED` virar `true`; falta vincular a mudança a aprovação registrada (ex.: exigir marcador de aprovação)". Não editar o teste nesta rodada. | Coordenador (documentação); owner técnico para decidir o gate |
| 2 | `READINESS.md` linha Git/GitHub e errata §5 | Citam "15:41:29" como horário da busca. O `updated_at` interno do JSON é 15:41:19; 15:41:29 é o mtime do arquivo. | Citar "15:41:19 (`updated_at`; arquivo gravado 15:41:29)". | Coordenador (documentação) |
| 3 | `independent-checks.md` (seção GitHub, 16:00) e `PROJECT_STATE.md` (checkpoint 16:00) | "Busca por issues abertas: zero" e "nenhuma Issue aberta" sem horário, e sem classificação na READINESS. Podem ser lidos como estado atual e contradizem Issue #1 OPEN. | Na READINESS, classificar essa busca como "não datada, anterior à criação da #1 às 16:00:24 ou não verificada", e marcar a frase do checkpoint 16:00 como histórica. | Coordenador (documentação) |
| 4 | `ERRATA-20261103-02.md` §1 A2; `READINESS.md` (Jira e blocker 4); `RUNBOOK.md` passo 2 | Dizem "tenant errado" para `2bxsistemas.atlassian.net`. É inferência pelo host. O `PROJECT_STATE.md` (seção "Ordem atual") registra TF-1 ID 11292 encontrado por busca ao vivo em `2bx.atlassian.net` sem menção a `2bxsistemas`. | Trocar por "host diferente do vínculo (`2bx.atlassian.net`); natureza do host não verificada; o 404 não se aplica a TF-2". | Coordenador (documentação) |
| 5 | `READINESS.md` (Docker) e `ERRATA-20261103-02.md` §1 A3 | "Tag `tf-1` criada às 13:42:27". O arquivo diz que a **imagem** foi criada nesse horário e que a **tag foi reapontada**, sem horário registrado. | Trocar por "imagem `6f6b640…` criada às 13:42:27 −03:00; tag reapontada, momento não registrado". | Coordenador (documentação) |
| 6 | `READINESS.md` (Git/GitHub, Jira) | Escritas remotas ligadas a esta auditoria não estão listadas: comentário Jira `10350` e comentário GitHub `6613153032` (de Hermes), além da criação da Issue #1 às 16:00:24 (mtime, sem horário interno). A frase "nenhuma escrita" é restrita a esta auditoria, e a lacuna pode induzir leitura errada. | Adicionar uma linha "Escritas remotas do sincronismo (não de produto)" com esses IDs e a fonte `TRACKING.md`/`PROJECT_STATE.md`. Indicar que o horário de criação da #1 vem do mtime. | Coordenador (documentação) |

**Estado do recibo de errata a registrar:** `ctx_521f159ce513` (errata) está `completed` desde 16:21:15 −03:00, mas a errata e o `PROJECT_STATE.md` registram `dispatched`. O status foi lido no momento da escrita e agora é histórico; não exige alteração de conteúdo, apenas anotação.

**Terminais órfãos não listados:** `ERRATA-20261103-02.md` §6 registra apenas `term_4201f3c8` como `orphaned: true`. Também estão nesse estado `term_f53581a2` (worker da errata, capacidade revogada 19:21:15Z), `term_7954634d` (worker técnico, capacidade revogada 18:56:52Z) e `term_3cf853f5` (este worker). Não houve liberação nem parada. Liberar é decisão do coordenador ou do Hermes.

---

## 5. O que esta revalidação não afirma

- Não reexecutou testes, `node --check`, `git diff --check` com saída nova, build, container, Docker, navegador ou render. A evidência 19/19 é a de 2026-11-03 dos workers e do coordenador.
- Não reconsultou Jira nem GitHub. Os estados de TF-2 (Em andamento, sem assignee) e da Issue #1 (OPEN, sem assignee) são read-backs de Hermes, com horário não informado.
- Não verificou o estado atual de `f2703…`.
- Não leu `.env`, segredos ou tokens.
- Não avaliou visualmente a interface nem tem aprovação humana de copy, layout ou produto.
- Não declara o site aprovado, pronto para produção, a Página de Compras implementada, o Jira sincronizado, o staging autorizado ou o TF-1 concluído.

---

## 6. Próxima ação

1. **Coordenador (`term_43d69c17`):** aplicar as seis correções da §4 em uma rodada documental curta. Não tocar em código, copy, testes ou configuração.
2. **Hermes:** informar o horário do read-back Jira de TF-2 (ou manter "não informado") e decidir se o pacote entra como base de aceite depois das correções.
3. **Direção:** nomear owners de negócio, técnico, staging e privacidade, e decidir copy e caminho de deploy (EasyPanel × VPS privada). Gates continuam abertos em `DECISIONS.md`.
4. **Owner técnico (desconhecido):** antes de qualquer build, corrigir `.dockerignore` (incluir `docs/`, `shots/`, `QA.md`, `Dockerfile`, `nginx.conf`) com autorização específica, e fixar uma fonte identificável.
5. **Liberação de terminais órfãos:** decisão do coordenador ou do Hermes; não foi feita aqui.

Staging permanece **bloqueado**.
