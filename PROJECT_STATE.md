# Checkpoint Atlas — migração de governança (2026-11-03)
- Checkout canônico de trabalho no HD externo: `/media/adriano/Projetos/Telefonia Facil/Site Institucional`; remoto privado `https://github.com/2bx-systems/telefoniafacil.git` na organização `2bx-systems`. Snapshot copiado do checkout anterior `/home/adriano/orca-ext4/projects/telefoniafacil-site-disable-purchase` com backup em `/media/adriano/Backup/atlas-project-migration/2026-11-03/site/`.
- A cópia externa preserva o branch `feat/deactivate-site-purchase-flows`, HEAD-base `c824a21`, modificações locais e documentos ainda não commitados do ciclo anterior. Templates GitHub, `AGENTS.md` e padrão de comunicação Atlas foram adicionados; nenhum deploy foi feito.
- Orca antigo: repo `c50d714d-904e-42fb-aba2-18a5fdd3b897` permanece no checkout interno por causa da execução em estado `ready/input_accepted` e liveness não verificável. Dispatch `ctx_d12b70984abe` foi notificado para não criar trabalho adicional. Não apagar nem mover esse contexto até read-back settled.
- GitHub Issue #1 permanece OPEN. Auditoria documental não equivale a aceite do produto; staging e owners/copy/artefato/rollback continuam bloqueadores.
- Próxima ação: comparar o snapshot externo com o checkout interno após o coordenador fechar, revisar diff, criar branch/PR de baseline Atlas e registrar o novo caminho no Orca sem excluir o legado.

# PROJECT_STATE — Site Institucional Telefonia Fácil

## Supervisão Hermes — 2026-11-03T16:14:34-03:00
- Auditoria **não aceita ainda**, objective_verified=false. Cron `TF-2 — loop coordenador Site` / `c5b2232ae297` descoberto por list, permanece ativo.
- Read-back Jira TF-2/11293 no tenant correto: Em andamento, sem assignee; comentário Hermes 10350 confirmado. GitHub #1 OPEN; comentário 6613153032 confirmado por GET exato. TF-1 staging intocado.
- Coordenador original `ctx_742943a681ac` settled/succeeded; filhos técnico/revisor concluídos. READINESS linha 19 contradiz #1 aberta; falta revalidação final do consolidado e disposição D6/D7. Uma ordem corretiva pelo send documentado produziu follow-up `task_45af41bf1576` / `ctx_d12b70984abe`, Run `run_3175e3707e2f`, mesmo terminal/workspace. Read-back: ready/input_accepted, Task dispatched; não comprova resultado nem novos filhos.
- Escopo do follow-up somente documentação; Haiku executor e outro revisor sequenciais, preservar relatórios originais. Sem código/copy/config/testes/commit/push/build/deploy.
- Ledger/evidência: `/home/adriano/portfolio/telefonia-facil/coordinator-loops/site/evidence/20261103T1614/iteration.md`; latest IDs e dedupe em `/home/adriano/portfolio/telefonia-facil/coordinator-loops/site/state.json`.
- Próxima ação: próxima iteração consulta os IDs atuais, verifica correções/revisão final e concilia aceite. Não duplicar follow-up ativo. Runtime/graph ready 1.4.247, ID `a78ca87f-d790-482f-8d27-8ef0e646aee5`; filesystem ext4; transportes não reavaliados. Gates de produto/staging continuam abertos, sem nova decisão humana necessária para corrigir a documentação.


## Reconciliação oficial de rastreamento — 2026-11-03, Hermes
- Registro atual e recibos: [TRACKING.md](TRACKING.md). Prevalece sobre referências históricas de Jira/GitHub abaixo.
- Auditoria SITE: [TF-2](https://2bx.atlassian.net/browse/TF-2), Em andamento. Staging separado: [TF-1](https://2bx.atlassian.net/browse/TF-1), Em andamento com waiting-approval; não executado/aceito.
- GitHub [issue #1](https://github.com/adriano2bx/telefoniafacil/issues/1), OPEN, lida de volta; ligada ao workspace Orca. Sem novo commit/push/PR/deploy.
- Task `task_9ddd4ddc08fe` atualizada com Jira/GitHub no result e lida de volta sem antecipar conclusão. Workspace in-progress. Coordenador notificado por `msg_05e2e923d6cf`, conferida na mailbox do child Run `run_adfd9344d49e`.
- Responsável de gestão Hermes; coordenador Codex; owner humano/assignee ainda pendente e sinalizado, sem atribuição fictícia.

## Ordem atual — auditoria independente do projeto (2026-11-03)
- Direção determinou execução paralela, mas com Site, Compras e Portal como TRÊS projetos independentes. Este workspace é SOMENTE SITE.
- Gestão Hermes; contrato `/home/adriano/portfolio/telefonia-facil/readiness-20261103/site-contract.md`.
- Run `run_3175e3707e2f`, Task `task_9ddd4ddc08fe`, Dispatch `ctx_742943a681ac`, sender Hermes `term_867ffc82-04a4-4c4d-8a71-0624fd9d9eed`. Read-back confirmou Task dispatched, input_accepted e liveness live. Codex reutilizado no terminal idle verificado `term_43d69c17-42e1-4af9-8373-574ea3427889`. Auditoria ainda não concluída; filhos Haiku dependem dos recibos do coordenador.
- Escopo: documentação, auditoria e evidências locais, sem código/copy aplicada/commit/deploy. Coordenador Codex exclusivo do site e workers Haiku com concorrência limitada. O coordenador anterior está settled; reutilização só após tela idle confirmada.
- Compras agora tem workspace próprio `/media/adriano/Projetos/Telefonia Facil/Pagina de Compras`, projeto Orca `repo:ecfb145d-b0d0-415c-b4f7-d4f36c29ab35`. Não desenvolver Compras neste site.
- Entregas e critérios no contrato; status da auditoria ACTIVE, sem mudar gate WAITING de staging abaixo.

Atualizado: 2026-11-03T15:41:19-03:00. Autor: Hermes.
Status: WAITING — alterações locais validadas em testes focais; aguardando copy/aceite e autorização de staging. Não implantado.

## Identidade e mandato
- company_id corporativo: não confirmado. Contexto autorizado: Telefonia Fácil.
- project_id local: `tf-site-institutional`.
- Objetivo atual: desativar compras legadas no site, manter CTAs informativos e preparar validação isolada. Não construir Compras neste repositório.
- Owner técnico/aprovador de negócio: não confirmado. Hermes coordena continuidade; não substitui dono do produto.
- GitHub: `adriano2bx/telefoniafacil`, privado; identidade ativa `adriano2bx` confirmada nesta retomada.
- Trabalho: `/home/adriano/orca-ext4/projects/telefoniafacil-site-disable-purchase`.
- Branch: `feat/deactivate-site-purchase-flows`; HEAD `c824a21bfc18bd848b977e32f831833eab02cd40`; modificações locais, inclusive compras/ e teste focal não versionados. Sem novo commit/PR/deploy nesta retomada.
- Jira: `TF`, ID `10223`; `TF-1`, ID `11292`, https://2bx.atlassian.net/browse/TF-1. Busca ao vivo encontrou somente TF-1, Em andamento, sem assignee. Nenhuma escrita Jira nesta retomada. Status Jira trata staging ainda não executado; WAITING local registra gates pendentes, sem transição remota implícita.

## Último marco verificado e evidências
- Reexecutados nesta retomada: `node --check assets/js/site.js`, `node --test qa/purchase-flow-deactivation.test.mjs` e `git diff --check`: aprovados, 19/19 testes, nenhuma falha/skip/TODO na suíte focal.
- Testes cobrem flag `PURCHASE_FLOWS_ENABLED=false`, entradas legadas, handoff, campanha, cache `20261103-53`, copy de transição, rodapé e ausência de compra no Chip. São testes focais predominantemente de código/template; não substituem E2E ou aceite visual humano.
- `/compras/` é transição informativa. Não é loja, não recebe pedido ou pagamento. Compra de linhas do portal continua em `/bff/line-orders`; não foi extraída.
- GitHub consultado ao vivo: nenhuma Issue aberta e nenhum PR aberto acessível no repositório do site.
- Evidências de comandos: `/home/adriano/portfolio/telefonia-facil/evidence/2026-11-03/` (`site-validation.json`, `orca-tasks.json`, `github-open.json`).

## Orca reconciliado
- CLI canônico `/home/adriano/.local/bin/orca-ide`; runtime ready/graph ready `a78ca87f-d790-482f-8d27-8ef0e646aee5`, versão `1.4.247`.
- Repo local `c50d714d-904e-42fb-aba2-18a5fdd3b897`; workspace `c50d714d-904e-42fb-aba2-18a5fdd3b897::/home/adriano/orca-ext4/projects/telefoniafacil-site-disable-purchase`.
- Coordenador Codex: Run `run_ea8358fd4b53`, Task `task_a98c774f5053`, Dispatch `ctx_0370652adf20`, terminal `term_43d69c17-42e1-4af9-8373-574ea3427889`. Worker succeeded/settled; terminal retained e liveness unverifiable (status antigo). Resultado concluído não prova processo encerrado. Não parar, liberar ou reiniciar sem novo diagnóstico e mandato.
- Child Run `run_78d8a1080d03`: Tasks SITE `task_654d6ec70044` / `ctx_922840ce0132`; PORTAL `task_5e67a9c7b7f5` / `ctx_506b4422bdfb`; COMPRAS `task_1629b1a6d127` / `ctx_9f2046d5bb16`. Todos completed; workers succeeded/exited; recursos released. Nenhum novo despacho nesta retomada.
- SITE relata smoke Chrome headless file:// em 28 páginas, sem erro JS, âncora quebrada ou overflow em 390px; checou carrossel, hover, âncoras e ausência de superfícies legadas no Chip. Evidência de worker inspecionada, não reexecutada nesta retomada. Não equivale a staging HTTP atual nem aprovação estética humana.
- A revisão SITE também alterou código/testes. Conclusão Orca não é aprovação independente de todo o resultado final; aceite final do diff e visual permanece pendente.

## Compras e portal — fronteiras preservadas
- PRD de Compras retirado da dependência exclusiva de scratchpad: `/home/adriano/portfolio/telefonia-facil/compras/PRD.md`, com original íntegro em `discovery-original-2026-11-03.md`. Registro de descoberta, não especificação aprovada.
- Corrigida na capa do PRD a suposta divergência de IDs: coordenador e filho têm IDs distintos legitimamente. Propostas de arquitetura, máquina de estados e backend não são decisões.
- Compras BLOCKED por escopo/fases, owner, repo/conta, domínio, APIs, backend do pedido, pagamento, autorização e handoff seguro. Sem repo/issue/infra novos.
- Portal sem remote confirmado nesta retomada; baseline histórico documentado BFF 78, frontend 48, segurança 38 aprovados/1 falha/3 TODO. Suítes do portal não reexecutadas. Manter riscos de idempotência, backend Portal × Commerce e titularidade do pedido visíveis.

## Histórico de staging — não revalidado nesta retomada
- Checkpoint anterior registra SSH read-only à VPS `mvp-agente-voz-sip`, Apache 80/443, Asterisk e harness existentes. Nenhuma ação remota nesta retomada.
- Checkpoint anterior registra Docker build/smoke local de seis rotas e imagem `telefoniafacil-site-staging:tf-1`, ID `sha256:f2703c5ebe98e79e8bb7249f3181b9c4dae0b885b679e42e4f5e2c125d1725b3`. Não presumir que imagem histórica contenha o código final/cache -53; reconstruir e ligar o artefato à fonte antes de staging.
- Arquivo anterior preservado integralmente em `/home/adriano/portfolio/telefonia-facil/checkpoints/site-before-reconciliation-2026-11-03.md`.

## Decisões, riscos e próxima ação
1. Proposta de copy e fase inicial em `/home/adriano/portfolio/telefonia-facil/COPY_DECISIONS.md`: CTA informativo sem promessa de compra; rodapé adequado a pessoa/empresa; rótulo Chip dependente de confirmação comercial. Nenhuma copy alterada nesta retomada.
2. Direção deve aprovar copy/recorte de Compras e nomear pontos focais de negócio e técnico. Não atribuir automaticamente TF-1 ao lead.
3. Hermes coordena contratos com os pontos focais e prepara backlog delimitado; não pedir à direção desenho técnico de APIs.
4. Antes de aceitar site: revisar diff final e renderização atual, incluindo Chip/rodapé/CTAs; se houver alteração de copy, reexecutar regressão e revisão proporcionais.
5. Antes de staging: autorização específica, artefato reconstruído e identificado, preflight atualizado de VPS e porta loopback livre, túnel SSH e rollback. Sem tocar Apache, Asterisk, harness, firewall, DNS, TLS ou dados.
6. Não encerrar TF-1: critérios de staging não atendidos. Sem commit/push/PR/merge/deploy como finalização implícita.

Continuidade local atualizada; PRD persistido fora do cache. Documentação ainda não commitada e sem garantia de backup/restauração testada. Jira permanece sem owner, portanto responsabilidade do produto ainda não resolvida.

## Checkpoint — auditoria de prontidão do site (2026-11-03, 16:00 -03:00)

- **Status:** auditoria local em consolidação, staging bloqueado; nenhuma execução remota.
- **Identidade:** project_id `tf-site-institutional`; company_id formal não confirmado; workspace `c50d714d-904e-42fb-aba2-18a5fdd3b897::/home/adriano/orca-ext4/projects/telefoniafacil-site-disable-purchase`; branch `feat/deactivate-site-purchase-flows`; HEAD `c824a21bfc18bd848b977e32f831833eab02cd40`.
- **Orca:** runtime `a78ca87f-d790-482f-8d27-8ef0e646aee5`, CLI `1.4.247`. Parent Run `run_3175e3707e2f`, Task `task_9ddd4ddc08fe`, Dispatch `ctx_742943a681ac`, terminal coordenador `term_43d69c17-42e1-4af9-8373-574ea3427889`. Child Run exclusivo do site `run_adfd9344d49e`. Worker técnico Claude Haiku: Task `task_0ceea1ab96dc`, Dispatch `ctx_c0545240f625`, terminal `term_7954634d-4e7d-44ae-adad-d6c88a799cc0`, succeeded.
- **Verificações atuais:** `node --check assets/js/site.js` exit 0; `node --test qa/purchase-flow-deactivation.test.mjs` 19/19, exit 0; `git diff --check` exit 0. Smoke local headless do worker cobre desktop/mobile sem submit; coordenador inspecionou capturas do Chip e Compras. Nenhuma alteração em código, copy, teste ou config.
- **GitHub:** leitura live confirma repositório privado. Busca da branch exata, issues abertas e PRs abertos retornou zero; alterações locais seguem sem commit. Jira TF-1 não foi encontrado no único tenant Atlassian acessível (`2bxsistemas.atlassian.net`); o estado local aponta outro host, então o estado Jira fica inconclusivo.
- **Artefato:** `telefoniafacil-site-staging:tf-1` aponta para `sha256:6f6b640dd8f7d797e61bb7a2285f71da495587bce100516e3effcd6a7cda148f`, sem RepoDigest. O worker observou conteúdo stale/cache `-51`; numa inspeção posterior, o ID histórico `f2703c5e...` já não existia. Não construir/usar imagem antes de fixar source e resolver `.dockerignore` que ainda inclui `docs/`, `QA.md` e `Dockerfile` no potencial webroot.
- **Riscos:** CTAs de contratar/configurar levam à página em preparação; decisão de copy pendente. Captura desktop mostra sobreposição no hero Chip. README e checkpoint anterior descrevem caminhos de deploy diferentes; owner e rollback desconhecidos. Formulário de contato usa `mailto:` com dados no cliente; privacidade/consentimento pendentes.
- **Pacote local:** `docs/readiness-20261103/` contém relatório técnico e evidências; consolidação em andamento. GitHub/Jira, staging, SSH/VPS, DNS, firewall, TLS, build/container e formulários não foram escritos/acionados.
- **Próximo passo:** concluir documentos de readiness, obter revisão independente Haiku no mesmo child Run e atualizar este checkpoint com IDs reais. Produto segue bloqueado para staging; copy, owners, deploy/rollback e empacotamento exigem decisão/ordem própria.

## Correção de vínculo e revisão independente (2026-11-03, 16:04 -03:00)

- Hermes confirmou que esta auditoria é Jira `TF-2` (https://2bx.atlassian.net/browse/TF-2) e GitHub Issue `#1` (https://github.com/adriano2bx/telefoniafacil/issues/1); `TF-1` é exclusivamente staging. O comentário de workspace Orca registra o vínculo `linkedIssue: 1`.
- Leitura GitHub confirmou #1 `open`; Jira TF-2 ainda aguarda read-back de Hermes. A observação anterior `404` foi para TF-1 no tenant Atlassian então disponível e permanece somente como histórico, sem concluir inexistência atual.
- Run de auditoria exclusivo `run_adfd9344d49e`; revisão independente Claude Haiku Task `task_90901de4fed4`, Dispatch `ctx_2666273fd7d4`, terminal `term_4201f3c8-3ea5-47a3-85de-a25c789f391f`, em andamento no workspace atual. O relatório permitido é somente `docs/readiness-20261103/worker-review.md`.
- Consolidação local referencia agora TF-2 e GitHub #1; leitura GitHub confirmou #1 `open`, Jira read-back segue pendente com Hermes. Nenhum write externo foi executado.

## Revisão independente recebida — 2026-11-03, 16:04 -03:00

- Revisão Haiku independente no mesmo Run `run_adfd9344d49e`: Task `task_90901de4fed4`, Dispatch `ctx_2666273fd7d4`, terminal `term_4201f3c8-3ea5-47a3-85de-a25c789f391f`, succeeded. Relatório `docs/readiness-20261103/worker-review.md`.
- Reconciliei no pacote consolidado as contagens 32 tracked/27 HTML mais `compras/index.html` untracked, o tenant correto `2bx.atlassian.net`, a natureza histórica do ID Docker `f2703…`, a inclusão de `shots/` no risco de empacotamento e o risco de código de pagamento legado protegido apenas pela flag. Relatório técnico original foi preservado sem edição.
- Nenhum código, teste, copy ou configuração foi alterado. Nenhuma execução externa ocorreu. Jira TF-2 aguarda read-back de Hermes; staging segue bloqueado por artefato, empacotamento, copy/owners e caminho/rollback.
- Próxima ação permitida: Hermes confirmar Jira TF-2 no tenant correto; direção nomear owners e deliberar copy/escopo/caminho de deploy. Esta auditoria local conclui com esses gates abertos; não iniciar implementação.

## Errata 02 e revalidação documental — 2026-11-03, 16:20 -03:00

- **Run:** `run_25c102a8f7dd` (objetivo: errata da auditoria do Site e revalidação documental). **Task:** `task_76b47b1773d2`. **Dispatch:** `ctx_521f159ce513`, `dispatched` às 16:14:55 -03:00, criado pelo coordenador `term_43d69c17-42e1-4af9-8373-574ea3427889` sob `ctx_d12b70984abe`. **Worker:** `term_f53581a2-5ec9-43f2-a035-d6d28f87b1ca` (claude). Autor: worker de errata, sob coordenação Codex `term_43d69c17`.
- **Entregue:** `docs/readiness-20261103/ERRATA-20261103-02.md` com uma linha por achado A1–A8 e D6–D7 (disposição, evidência, local alterado, limitação e owner). Índice do pacote em `docs/readiness-20261103/README.md`. Consolidados atualizados: READINESS, BRIEF, DECISIONS, BACKLOG, RUNBOOK e ARCHITECTURE. Índice da raiz em `README.md`.
- **Jira/GitHub, conforme read-back de Hermes (2026-11-03, horário não informado):** TF-2 ID 11293, tenant `2bx.atlassian.net`, Em andamento, assignee null. Issue #1 OPEN, assignee null. TF-1 permanece somente staging. A busca de issues abertas de 15:41:29 -03:00 (`evidence/2026-11-03/github-open.json`) é anterior à criação da Issue #1 (recibo de 16:00:24 -03:00) e é tratada como histórica. A 404 anterior foi para TF-1 em `2bxsistemas.atlassian.net`, tenant errado para este vínculo.
- **D6 resolvido por recibo:** o coordenador é o terminal `term_43d69c17` (agente `codex`, modelo `gpt-6-luna`). Não há dois coordenadores. **D7 resolvido por recibo:** o worker de revisão é `term_4201f3c8` (dispatch `ctx_2666273fd7d4`, Run `run_adfd9344d49e`, concluído), e o remetente de coordenação é `term_43d69c17`.
- **Verificado de novo, somente leitura:** 32 arquivos modificados, 27 HTML rastreados (todos com diferença apenas no token `site.js?v=`), 1 HTML não rastreado (`compras/index.html`), 28 HTML com `site.js?v=20261103-53`. `.dockerignore` não exclui `docs/`, `shots/`, `QA.md`, `Dockerfile` nem `nginx.conf`. `git diff --check` exit 0.
- **Não executado:** testes, build, Docker, navegador, staging, SSH, escrita em Jira ou GitHub, leitura de segredos. Nenhum código, copy, teste ou configuração foi alterado. `worker-technical.md` e `worker-review.md` preservados sem edição.
- **Limites:** horário da leitura Jira de Hermes não registrado. Estado atual de `f2703…` inconclusivo (não reinspecionado). Os 19/19 e o render são evidência de 2026-11-03 do worker e do coordenador, não reproduzida aqui. Terminal `term_4201f3c8` com `orphaned: true`, a liberar pelo coordenador ou por Hermes.
- **Status:** staging segue **bloqueado**. Owners, copy, caminho de deploy e rollback continuam pendentes (gates humanos em `DECISIONS.md`). Próxima ação: Hermes decide aceite do pacote; coordenador revisa a errata antes de qualquer aceite; direção nomeia owners.

## Correções pós-revisão final — 2026-11-03, revalidação coordenadora

- **Escopo/coordenação:** tarefa supervisora `task_45af41bf1576`, Dispatch `ctx_d12b70984abe`, Run pai `run_3175e3707e2f`, criada por Hermes `term_867ffc82`; coordenador do Site `term_43d69c17` (Codex `gpt-6-luna`). Errata e revisão ocorreram no child Run exclusivo `run_25c102a8f7dd`.
- **Executor documental Haiku:** `task_76b47b1773d2`, Dispatch `ctx_521f159ce513`, terminal `term_f53581a2`; completado. **Revisor Haiku independente:** `task_b068eb465271`, Dispatch `ctx_766ae5874e66`, terminal `term_3cf853f5`; completado. O revisor considerou o pacote aceitável documentalmente, com seis ressalvas; seu relatório original `docs/readiness-20261103/worker-review-errata-20261103-02.md` foi preservado.
- **Correções coordenadas:** `docs/readiness-20261103/ERRATA-20261103-03.md` reconcilia as seis ressalvas: asserção de flag já existente versus aprovação formal; `updated_at` 15:41:19 versus mtime 15:41:29; snapshots GitHub/PSTATE sem hora própria e ordem não determinada com criação da Issue #1 no mesmo minuto; host Jira diferente sem inferir sua natureza; `Created` da imagem versus associação da tag; writes pontuais de Hermes (Jira comment 10350, GitHub comment 6613153032 e Issue #1), sem afirmar sincronização integral. READINESS, BACKLOG, RUNBOOK, BRIEF, índices da raiz/pacote atualizados; originais e relatórios preservados.
- **Qualificação de histórico:** o checkpoint anterior deste PROJECT_STATE descreveu a busca de 15:41 como anterior à criação da Issue #1 e chamou 16:00:24 de horário de criação. A busca documentada (15:41:19 `updated_at`, mtime 15:41:29) precede o mtime 16:00:24.49 do recibo, mas o recibo não contém timestamp interno da criação. Para os registros do minuto 16:00 sem hora própria, a ordem não é determinada. A frase anterior está qualificada pela Errata 03; os registros permanecem preservados como snapshots.
- **Revalidação local:** conferi por leitura as seis correções, asserção em `qa/purchase-flow-deactivation.test.mjs:58`, timestamps e estados a partir dos recibos/tracking existentes. `git diff --check` após a edição documental: exit 0. Testes, build, container, browser e Jira/GitHub não foram executados nesta etapa; nenhum código/copy/teste/config foi alterado.
- **Estado dos trackers, conforme Hermes:** TF-2 ID 11293 em `2bx.atlassian.net`, Em andamento, sem assignee; Issue #1 OPEN, sem assignee. Jira comment 10350 e GitHub comment 6613153032 têm read-back registrados em `TRACKING.md`/neste histórico. São comentários pontuais; não significam sincronização integral. TF-1 continua somente staging, sem execução/encerramento.
- **Follow-up acidental, sem trabalho:** `task_ae9b4b257adc` / Dispatch `ctx_20590a9d44c0` foi criado automaticamente quando uma mensagem de fechamento chegou após completar o executor; não tinha conteúdo. O worker confirmou que não alterou arquivos; o Dispatch foi parado por ID exato (`process_stopped`, liveness exited) e Task marcada failed/cancelled; sem retry. O terminal fica retido, sem liberação solicitada.
- **Nota de escopo:** um preflight global `orchestration run-list --json` exibiu títulos/IDs de Runs fora do portfólio Telefonia Fácil; não houve inspeção de conteúdo, arquivos ou sistemas desses projetos nem ação sobre eles. Não repetir consultas globais; restante do trabalho permaneceu no workspace SITE.
- **Gates e estado:** esta correção não aceita a auditoria nem fecha Tasks. Staging continua bloqueado e gates de owners, copy, empacotamento, caminho/rollback seguem abertos. Próximo passo: Hermes revisar os documentos corrigidos, decidir aceite da auditoria e atualizar trackers quando autorizado; sem implementar produto.
