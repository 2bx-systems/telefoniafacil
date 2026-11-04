# Evidências do coordenador — 2026-11-03, 16:00 -03:00

Escopo: leitura e validação local do projeto Site Institucional Telefonia Fácil. Nenhuma escrita em GitHub, Jira, staging ou produção; nenhum formulário foi submetido; nenhum `.env`, token ou dado pessoal foi lido.

## Orca

- CLI: `/home/adriano/.local/bin/orca-ide`, versão `1.4.247`.
- `status --json`: runtime `a78ca87f-d790-482f-8d27-8ef0e646aee5`, runtime e graph `ready`.
- `dispatch-show --task task_9ddd4ddc08fe --from term_43d69c17-42e1-4af9-8373-574ea3427889`: Dispatch `ctx_742943a681ac`, Run pai `run_3175e3707e2f`, site workspace `c50d714d-904e-42fb-aba2-18a5fdd3b897::/home/adriano/orca-ext4/projects/telefoniafacil-site-disable-purchase`, depth 1.
- Child Run deste projeto: `run_adfd9344d49e`. Auditoria técnica: Task `task_0ceea1ab96dc`, Dispatch `ctx_c0545240f625`, terminal `term_7954634d-4e7d-44ae-adad-d6c88a799cc0`; `worker_done` recebido como succeeded.
- O dispatch técnico usou o runtime local acima e workspace exato do site. A revisão independente ainda será anexada em `worker-review.md`.

## Worktrees — metadados Orca, sem leitura de código irmão nesta conferência

| Projeto | Repo/worktree | Path | HEAD/branch observado | Resultado |
|---|---|---|---|---|
| Site | `c50d714d-904e-42fb-aba2-18a5fdd3b897` | `/home/adriano/orca-ext4/projects/telefoniafacil-site-disable-purchase` | `c824a21bfc18bd848b977e32f831833eab02cd40`, `feat/deactivate-site-purchase-flows` | Worktree Git do site; dirty/untracked pré-existente |
| Área do Cliente | `971bbe2d-e4f9-42be-b0c1-3900a864a34d` | `/media/adriano/Projetos/Telefonia Facil/Area do cliente` | HEAD zero, branch `main` | Worktree distinto; nenhum commit verificado |
| Página de Compras | `ecfb145d-b0d0-415c-b4f7-d4f36c29ab35` | `/media/adriano/Projetos/Telefonia Facil/Pagina de Compras` | HEAD e branch vazios | Workspace distinto de pasta; não existe Git confirmado |

Os metadados demonstram separação de workspaces, não extração funcional nem contrato de integração.

## GitHub — leitura ao vivo

- Repo `adriano2bx/telefoniafacil`: privado; branch default `main`.
- Busca da branch exata `feat/deactivate-site-purchase-flows`: zero resultados.
- Busca por issues abertas: zero resultados. Busca por pull requests abertas: zero resultados.
- O estado local permanece sem commit; nenhuma escrita foi feita. A busca de branch não prova que nenhum outro commit/branch exista.

## Jira — observação inicial e correção de vínculo

- O único recurso Atlassian acessível retornou o tenant `https://2bxsistemas.atlassian.net`.
- `getJiraIssue(TF-1)` nesse tenant respondeu `404 Issue not found`.
- Essa observação vale somente para TF-1 nesse tenant, não prova inexistência de outras issues ou tenants.
- Nenhuma escrita Jira ocorreu.

## Correção oficial de vínculo — recebida às 16:00 -03

- Hermes confirmou no status Orca `msg_05e2e923d6cf`: issue exclusiva desta auditoria `TF-2` (`https://2bx.atlassian.net/browse/TF-2`), GitHub Issue `#1` (`https://github.com/adriano2bx/telefoniafacil/issues/1`); `TF-1` pertence somente ao staging do site.
- `orca worktree show --worktree current` mostra `linkedIssue: 1` e comentário do workspace com TF-2/GitHub #1, no runtime confirmado.
- Leitura GitHub `fetch_issue` confirmou Issue #1 com título “TF-2: auditar separação e prontidão do Site Institucional”, estado `open`, URL acima. Nenhuma escrita foi feita pelo coordenador.
- O Jira TF-2 não foi lido de volta nesta execução; Hermes é responsável pelo read-back remoto. Não marcar Jira sincronizado sem recibo/read-back dele.
- O tenant oficial indicado no link TF-2 é `2bx.atlassian.net`; o recurso que respondeu inicialmente foi `2bxsistemas.atlassian.net`, portanto aquele 404 de TF-1 não serve como leitura do vínculo TF-2. Atribuição e tenant oficial foram confirmados por Hermes; status remoto de TF-2 segue pendente.

## Validações locais repetidas pelo coordenador

```text
node --check assets/js/site.js                    exit 0
node --test qa/purchase-flow-deactivation.test.mjs exit 0; 19 pass, 0 fail, 0 skip, 0 todo
git diff --check                                  exit 0
```

O teste é uma suíte focal: 18 dos 19 casos inspecionam fonte/HTML por texto ou regex e um executa `cleanCampaignValue`; não é E2E. A execução não alterou código, testes nem dados.

## Renderização local

- Evidências do worker técnico: `evidence-technical/desktop-chip.png`, `desktop-compras.png`, `desktop-home-top.png`, `desktop-planos.png`, equivalentes mobile, e `render-probe-and-dom.txt`.
- O coordenador abriu `desktop-chip.png` e `desktop-compras.png`: confirmou visualmente que setas do carrossel encostam/sobrepõem a CTA do hero Chip em desktop e que a página de Compras está em preparação enquanto o header ainda diz “Acessar Página de Compras”. Nenhum formulário foi submetido.
- O worker relata Chrome headless local, zero erro de JS/overflow em 390/1440 px nos caminhos testados. Isso não é aprovação visual humana nem teste em dispositivo real.

## Docker histórico — leitura ao vivo posterior

- `docker context show`: `default`.
- `docker image inspect telefoniafacil-site-staging:tf-1`: ID `sha256:6f6b640dd8f7d797e61bb7a2285f71da495587bce100516e3effcd6a7cda148f`, criado `2026-11-03T13:42:27.857292666-03:00`, sem `RepoDigests`.
- `docker image inspect sha256:f2703c5ebe98e79e8bb7249f3181b9c4dae0b885b679e42e5f5e2c125d1725b3`: no image found na verificação posterior. O worker técnico registrou que a encontrou sem tag durante sua leitura anterior; o estado mudou ou os snapshots diferem, e a divergência foi preservada.
- O worker extraiu a imagem tagueada sem executar container e encontrou cache `site.js?v=20260910-51`, conteúdo diferente do worktree atual e arquivos `QA.md`/`Dockerfile` no document root. Nenhuma imagem foi construída ou container executado pelo coordenador.

## Limites

- Não foram consultados Jira/GitHub em modo de escrita, APIs de negócio, provedor de pagamento, VPS ou serviços de produção.
- Nenhum commit, push, PR, deploy, staging, SSH, DNS, firewall ou TLS foi executado.
- O estado inicial do site já tinha mudanças e arquivos untracked. O conteúdo original foi preservado; os docs desta auditoria são as únicas adições deliberadas nesta rodada.

## Revisão independente e reconciliação — 2026-11-03

- Revisor Haiku independente: Run `run_adfd9344d49e`, Task `task_90901de4fed4`, Dispatch `ctx_2666273fd7d4`, terminal `term_4201f3c8-3ea5-47a3-85de-a25c789f391f`; resultado succeeded. Relatório: `worker-review.md`. Revisou documentos/evidências e leu diretamente o repositório; não reexecutou testes, build ou container. A independência é de processo/contexto, embora o mesmo modelo Haiku tenha sido usado.
- Preservei `worker-technical.md` sem reescrevê-lo. Seu vínculo Jira TF-1 e afirmação de que o ID Docker `f2703…` ainda existe são snapshots/relato técnico não reconciliados; para referência atual, usar TF-2 confirmado por Hermes, e tratar o ID `f2703…` como observado pelo worker às 13:30 e não encontrado na inspeção posterior do coordenador. Não concluir situação atual de TF-2 sem read-back de Hermes no tenant `2bx.atlassian.net`.
- Contagem local conferida após a revisão: `git diff --name-only` lista 32 arquivos tracked, dos quais 27 HTML; `compras/index.html` é o 28º HTML e está untracked. Os demais 5 arquivos tracked do diff são `assets/js/site.js`, `sitemap.xml`, `QA.md`, `.dockerignore` e `README.md`.
- Revisor confirmou o build context vulnerável: além de `docs/`, `QA.md` e `Dockerfile`, `.dockerignore` também não exclui `shots/` e `nginx.conf`; `shots/` existe na raiz. BACKLOG/RUNBOOK/READINESS agora registram isso como trabalho futuro, sem editar configuração.
- Revisor identificou código legado de simulação de pagamento e `mailto:` de pedido Chip condicionado somente por `PURCHASE_FLOWS_ENABLED=false`. O runtime atual permanece desativado, mas essa flag é barreira única; os documentos READINESS/RUNBOOK/BACKLOG registram o risco e um gate antes de qualquer reativação. Nenhum código ou teste foi alterado.
- Verificações repetidas do coordenador permanecem: `node --check assets/js/site.js` exit 0; teste focal `node --test qa/purchase-flow-deactivation.test.mjs` 19/19 exit 0; `git diff --check` exit 0. A revisão documental não altera esses resultados nem os amplia para E2E/staging.
