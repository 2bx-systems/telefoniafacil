# Site Institucional — instruções de projeto

Este repositório privado `2bx-systems/telefoniafacil` é somente o Site Institucional. Não incluir Área do Cliente ou Página de Compras por conveniência. O gestor é Atlas no OpenCode; leia `PROJECT_STATE.md`, `README.md` e `docs/COMMUNICATION_STANDARD.md` antes de agir.

Código, documentos e worktrees ficam no HD externo. GitHub Issues descreve demandas; Orca registra execução; commits/PRs registram alterações. Separe planejado, relatado e verificado; preserve relatórios históricos e não invente aceite.

O objetivo atual é desativar fluxos legados de compra no site, mantendo CTAs informativos, sem assumir que `/compras/` seja a aplicação de Compras. Não alterar produção, staging, DNS, TLS, infraestrutura, copy comercial ou pagamentos sem gate próprio e autorização específica. A auditoria e os gates de owners/copy/artefato/rollback continuam abertos.

Antes de repetir qualquer despacho, reconciliar Run/Task/Dispatch e branch/PR. A execução existente pode ter liveness não verificável; não duplicar nem apagar. Atlas pode criar branches, commits, Issues e PRs de trabalho; merge na `main` e deploy exigem autorização específica no chat para ação/commit exatos.
