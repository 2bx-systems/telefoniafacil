# Decisões, propostas e gates humanos

## Confirmado por instrução ou observado

| ID | Registro | Classe | Evidência/limite |
|---|---|---|---|
| D-01 | Site, Área do Cliente e Página de Compras são projetos separados que se integram; não mover Compras para o site | Direção do usuário | Workspaces Orca separados; isso não prova extração funcional |
| D-02 | Esta branch tem como objetivo desligar compra legada e manter a rota `/compras/` informativa | Direção + código observado | `PURCHASE_FLOWS_ENABLED=false`; conteúdo da transição |
| D-03 | O site não tem autorização nem contrato de pedido implementado | Observado | HTML/JS estático; query de CTA não é autorização |
| D-04 | Esta tarefa é auditoria e preparação; não executar staging ou operações remotas | Direção explícita | Nenhum staging, SSH ou deploy executado |
| D-05 | Vínculo desta auditoria é Jira TF-2 + GitHub Issue #1; TF-1 é só staging | Confirmação de Hermes e metadata Orca; read-back de Hermes (2026-11-03, horário não informado): TF-2 ID 11293 Em andamento, assignee null; Issue #1 OPEN, assignee null | Alterações locais sem commit; imagem tag sem digest e conteúdo stale; owners humanos continuam pendentes |

## Propostas pendentes — não são decisões

- Copy recomendada em `/home/adriano/portfolio/telefonia-facil/COPY_DECISIONS.md`: CTA “Informações de contratação”, transição consultiva, ação “Falar com a equipe”, rodapé inclusivo e rótulo “Plano móvel”. Não aplicada.
- Manter o site estático e delegar transação a uma aplicação Compras independente com contrato validado. É recomendação de arquitetura, não aprovação de API, domínio, backend ou owner.
- Fase inicial do produto Compras e tratamento de B2B/Chip continuam pendentes; ver `PRD-REVIEWED.md`.
- Escolha de staging entre EasyPanel e VPS privada via túnel é pendente; nenhum caminho executado ou aprovado nesta auditoria.

## Gates humanos

1. Direção aprova/ajusta copy e rótulos comerciais.
2. Direção nomeia owners de negócio e técnico; privacy owner segue desconhecido.
3. Owner de deploy escolhe destino e fornece autorização específica para futura operação remota.
4. Owner técnico aprova endurecimento de `.dockerignore`, rebuild e plano de rollback.
5. Owners de Site/Portal/Compras validam contrato, identidade, API, dados e handoff antes de qualquer integração.

Nenhum gate foi satisfeito pela criação deste pacote documental.
