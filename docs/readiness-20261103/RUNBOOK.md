# Runbook de validação e staging — não executado

**Estado:** roteiro de preparação. Staging e deploy não foram executados. O caminho está bloqueado por imagem não rastreável, empacotamento interno e owner/rollback não definidos.

## Retomar auditoria local

1. Confirmar que o CWD continua `/home/adriano/orca-ext4/projects/telefoniafacil-site-disable-purchase`, branch `feat/deactivate-site-purchase-flows` e HEAD conforme `PROJECT_STATE.md`.
2. Conferir `git status --short`; preservar as modificações/untracked pré-existentes. Não usar reset, checkout, add ou commit.
3. Verificar runtime Orca com `/home/adriano/.local/bin/orca-ide status --json` e confirmar Run/Task/Dispatch em `evidence-coordinator/independent-checks.md`.
4. Usar o vínculo oficial desta auditoria: Jira `TF-2` e GitHub Issue `#1`; `TF-1` é exclusivamente staging. Não mudar status nem escrever remotamente nesta auditoria.
5. Ler este `READINESS.md`, a revisão independente e o checkpoint mais recente de `PROJECT_STATE.md`.

## Regressão local segura

Executados nesta auditoria (não representam staging):

```sh
node --check assets/js/site.js
node --test qa/purchase-flow-deactivation.test.mjs
git diff --check
```

Resultado observado em 2026-11-03: sintaxe exit 0; 19/19 testes; `git diff --check` exit 0. Reexecutar depois de qualquer futura mudança autorizada de código/copy.

## Inspeção de imagem histórica — somente leitura

```sh
docker context show
docker image inspect telefoniafacil-site-staging:tf-1 --format '{{.Id}}|{{.Created}}|{{json .RepoTags}}|{{json .RepoDigests}}'
```

Resultado observado: contexto `default`, tag em `sha256:6f6b640dd8f7d797e61bb7a2285f71da495587bce100516e3effcd6a7cda148f`, sem RepoDigest. Não usar essa imagem para staging.

Histórico: o ID `sha256:f2703c5e…` foi observado pelo worker às 13:30:30 −03:00, sem tag. Não foi reconfirmado e não aparece na inspeção posterior do coordenador. Não tratar como imagem atual nem como base de staging (ver errata A3). Esta errata não executou `docker`.

## Gates antes de qualquer build/staging

1. Obter aprovação explícita de copy/escopo e nomear owner de negócio/técnico/deploy.
2. Read-back de Hermes já recebido (2026-11-03, horário não informado): Jira `TF-2` ID 11293 no tenant `2bx.atlassian.net`, Em andamento, assignee null. A auditoria não fez Jira writes. `TF-1` é só staging. Antes de uma decisão de staging, reler o Jira, porque o horário do read-back não foi registrado.
3. Excluir `docs/`, `shots/`, `QA.md`, `Dockerfile`, `nginx.conf` e outros arquivos internos do build context/webroot com mudança autorizada de `.dockerignore`; testar que não são servidos. O `Dockerfile` usa `COPY . /usr/share/nginx/html`.
4. Fixar uma fonte identificável (commit ou hash de tree aprovado). O worktree tem alterações não commitadas; não criar commit neste ciclo.
5. Reconstruir com tag nova e exclusiva; registrar source ref, ID, digest e SBOM/proveniência conforme política do owner. Não reapontar `tf-1`.
6. Definir EasyPanel versus VPS privada, alvo, owner, domínio e rollback; obter autorização específica para operação remota.
7. Validar localmente em loopback com fixtures sem credenciais. Antes de escolher porta, verificar listener e containers; nunca parar/remover um container alheio nem vincular uma porta ocupada. Não presumir que 18101 esteja livre.
8. Testar rotas de transição, contato sem submit, cache `20261103-53`, páginas internas (`docs/`, `shots/`, `QA.md`, `Dockerfile`, `nginx.conf`) não acessíveis e rollback do container novo. A flag `PURCHASE_FLOWS_ENABLED=false` (`assets/js/site.js:4`) é a única barreira atual para os blocos legados de pagamento simulado (`:195`), `mailto:` do pedido Chip (`:193`) e `mailto:` de contratação (`:253`). A asserção existente em `qa/purchase-flow-deactivation.test.mjs:58` já falha se a constante virar `true`, mas não valida o registro da aprovação. Antes de qualquer reativação, exigir aprovação formal registrada, revisão/remoção autorizada desses blocos e revisão autorizada da asserção como parte da mudança; os testes atuais não executam a jornada com a flag `true` (ver Errata 03/A5).
9. Revisão independente e aceite do responsável antes de pedir staging.

## Exemplo apenas futuro — não executar neste ciclo

Depois de aprovar a política de empacotamento e fixar `<SOURCE_ID>`, uma imagem local poderia ser construída com tag dedicada. O valor precisa ser substituído por identificador real e a mudança não pode ser aplicada ao estado atual:

```sh
docker build --pull=false --network=none -t telefoniafacil-site-staging:SOURCE_ID .
```

Antes de um smoke local, verificar porta escolhida (exemplo 18765) e garantir que não exista listener/container nela:

```sh
ss -ltnp '( sport = :18765 )'
docker run --rm --name telefoniafacil-site-smoke --publish 127.0.0.1:18765:80 telefoniafacil-site-staging:SOURCE_ID
```

Esses comandos são plano, não autorização. Não existem host/porta remotos confirmados para registrar comando SSH ou de staging. O rollback remoto exige alvo autorizado e procedimento validado; a proposta é parar somente o container novo identificado, verificar serviços anteriores e remover imagem apenas após confirmar que nenhum runtime depende dela.

## Sem execução remota

Não executar SSH/VPS, deploy, staging, DNS, firewall, TLS, Jira/GitHub write, pagamento ou integração live sem ordem específica e owner confirmado. Nenhum comando remoto seguro está definido neste pacote.
