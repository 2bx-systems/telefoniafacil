# Decisões, propostas e gates humanos

## Confirmado por instrução ou observado

| ID | Registro | Classe | Evidência/limite |
|---|---|---|---|
| D-01 | Site, Área do Cliente e Página de Compras são projetos separados que se integram; não mover Compras para o site | Direção do usuário | Workspaces Orca separados; isso não prova extração funcional |
| D-02 | Esta branch tem como objetivo desligar compra legada e manter a rota `/compras/` informativa | Direção + código observado | `PURCHASE_FLOWS_ENABLED=false`; conteúdo da transição |
| D-03 | O site não tem autorização nem contrato de pedido implementado | Observado | HTML/JS estático; query de CTA não é autorização |
| D-04 | Esta tarefa é auditoria e preparação; não executar staging ou operações remotas | Direção explícita | Nenhum staging, SSH ou deploy executado |
| D-05 | Vínculo desta auditoria é Jira TF-2 + GitHub Issue #1; TF-1 é só staging | Confirmação de Hermes e metadata Orca; read-back de Hermes (2026-11-03, horário não informado): TF-2 ID 11293 Em andamento, assignee null; Issue #1 OPEN, assignee null | Alterações locais sem commit; imagem tag sem digest e conteúdo stale; owners humanos continuam pendentes |

## Decisão posterior — navegação do site (2026-11-05)

| ID | Registro | Classe | Evidência/limite |
|---|---|---|---|
| D-06 | Remover da navegação os links de “Conteúdos” e o link textual “Página de Compras”; manter somente o botão principal “Acessar Página de Compras” e seu destino informativo atual. As rotas permanecem acessíveis por URL direta para não quebrar links antigos. | Direção explícita do usuário nesta conversa | Autorização somente para links de navegação do site nesta branch. Não autoriza habilitar compras, alterar o destino do CTA, copy comercial, pagamentos ou deploy. |
| D-07 | Remover o dropdown “Soluções” e seus links de páginas de produto. Manter o botão “Ver soluções” apontando para `/solucoes/`; no menu mobile, manter uma única entrada para `/solucoes/`. As páginas individuais continuam acessíveis por URL e pelos links próprios que restarem. | Direção explícita do usuário nesta conversa | Autorização somente para simplificar a navegação nesta branch. Não apaga rotas, não altera produtos nem compra desativada, e não autoriza deploy. |
| D-08 | Remover da home somente a seção “05 — Planos e Ofertas” e o bloco final “Fale com nosso time” mostrado nas capturas. Manter a página `/planos/` e a página `/contato/` inalteradas. | Direção explícita do usuário após ver as capturas | Autorização limitada a esses dois trechos da home; não altera preços/copy em outras páginas, destinos de CTA ou publicação. |

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
