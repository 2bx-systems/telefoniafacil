# Rastreamento verificado — Site Institucional

## Marco Hermes — 2026-11-03T16:14:34-03:00
- Estado da auditoria: CORRECTION_DISPATCHED, não aceita. Última Task `task_45af41bf1576`, Dispatch `ctx_d12b70984abe`, Run `run_3175e3707e2f`; follow-up do coordenador settled `ctx_742943a681ac`, não coordenador paralelo. worker-show ready/input_accepted; task-list dispatched.
- Correção documental: READINESS contradiz GitHub #1 OPEN; exigir errata/disposição A1-A8/D6-D7 e revisão independente final. Haiku executor/revisor sequenciais; sem implementação.
- Jira TF-2/11293 Em andamento/sem assignee; comentário 10350 confirmado por read-back. GitHub #1 OPEN; comentário [6613153032](https://github.com/adriano2bx/telefoniafacil/issues/1#issuecomment-6613153032) confirmado por GET exato. TF-1 staging não alterada.
- Cron próprio descoberto por nome exato `TF-2 — loop coordenador Site`, ID `c5b2232ae297`, ativo. State/evidência em `/home/adriano/portfolio/telefonia-facil/coordinator-loops/site/`; snapshot anterior preservado. Próxima ação: conferir artefatos/aceite sem duplicar Dispatch ativo.


## Loop persistente autorizado
- Cron `c5b2232ae297`, a cada 10 minutos, habilitado e lido de volta; scheduler gateway running no setup. Config e critérios: `/home/adriano/portfolio/telefonia-facil/coordinator-loops/site/config.json` e `../POLICY.md`.
- Ciclo: Codex -> Haiku execução/revisão -> correção/revalidação -> conciliação Hermes. Sem encerrar por worker_done com rejeições pendentes. Só pausar após objetivo da auditoria comprovado e aceite; dependências humanas mantêm espera explícita e agendamento.
- Não expande escopo para implementação ou produção. Primeira execução manual solicitada após configuração; sucesso do agendamento não comprova conclusão da iteração. Comentário Jira do loop foi lido de volta.

Atualizado: 2026-11-03T16:03:30-03:00. Autor: Hermes. Contexto autorizado: Telefonia Fácil; company_id formal ainda não cadastrado. project_id `tf-site-institutional`.

## Fonte atual, prevalece sobre checkpoints históricos
- Jira: [TF-2](https://2bx.atlassian.net/browse/TF-2), ID 11293, estado **Em andamento**, lido de volta. Task de auditoria/planejamento, não aceite final do produto. Labels exclusivas por produto.
- Espaço Jira empresarial compartilhado: TF (ID 10223), conta autenticada Adriano Oliveira verificada. Três produtos independentes não foram fundidos por compartilhar o espaço Jira. TF-1 permanece SOMENTE staging do site, Em andamento com waiting-approval e needs-product-owner, comentário de checkpoint 10343 verificado. Auditoria Site: TF-2; Portal: TF-3; Compras: TF-4.
- GitHub: https://github.com/adriano2bx/telefoniafacil/issues/1
- Orca project: `github:adriano2bx/telefoniafacil`; workspace `c50d714d-904e-42fb-aba2-18a5fdd3b897::/home/adriano/orca-ext4/projects/telefoniafacil-site-disable-purchase`.
- Run `run_3175e3707e2f`; Task `task_9ddd4ddc08fe`; Dispatch `ctx_742943a681ac`; child Run `run_adfd9344d49e`.
- Task Orca recebeu os vínculos no result, mantendo o status atual (dispatched no read-back), não concluída artificialmente. Workspace comment atualizado e lido de volta; status de projeto in-progress (não completed).
- Mensagem ao coordenador `msg_05e2e923d6cf`; confirmação de enfileiramento no child Run. Enfileiramento não prova leitura ou trabalho concluído. Sem segundo dispatch para forçar uma atualização.

## Responsabilidades e limites
Hermes é gestor/supervisor e responde pela reconciliação. Codex coordena a execução técnica; workers Haiku fazem auditoria/revisão. Owner humano de negócio/técnico ainda não nomeado; assignee Jira/GitHub permanece vazio deliberadamente, com needs-product-owner. Não atribuir ao lead ou a um humano fictício para eliminar o alerta.

## Sincronização daqui em diante
Antes de cada despacho de implementação, confirmar issue, repo/conta, owner e critérios. Em marcos de auditoria/revisão/bloqueio/conclusão, coordenador atualiza PROJECT_STATE e comunica Hermes com IDs/evidência/próximo passo. Hermes escreve Jira/GitHub e lê de volta antes de afirmar reconciliação ou fechar a etapa. Coordenador não recebeu autorização para remotos. Uma revisão de worker não encerra a issue automaticamente.

## Próximo marco
Concluir e conciliar auditoria/revisão independente, obter aceite Hermes e manter gates de implementação/extração/publicação. Registros antigos dizendo 'issue não encontrada/N/A Jira' descrevem apenas o estado anterior a esta correção e não o vínculo atual. Pacote em docs/readiness-20261103/ deve ser conciliado pelo coordenador sem reescrever evidências originais.

## Evidências da correção
`/home/adriano/portfolio/telefonia-facil/sync-20261103/orca-reconciliation.json`, `coordinator-mailbox-readback.json`; read-backs Jira das chaves TF-1..TF-4 e comentários 10343/10344; read-back GitHub issue #1. Nenhum commit, push, PR, merge, deploy ou ação de produção realizado nesta reconciliação.
