# Backlog local de prontidão — sem sincronização Jira

Este é um plano local de readiness, não um backlog sincronizado. O vínculo oficial desta auditoria é Jira `TF-2` e GitHub Issue `#1`; `TF-1` é somente staging do site. Read-back de Hermes (2026-11-03, horário não informado): Jira TF-2 ID 11293 Em andamento, assignee null; GitHub #1 OPEN, assignee null. Nenhum owner foi inferido.

| Ordem | Item | Dependências | Critério de aceite | Responsável |
|---|---|---|---|---|
| P0 | Aprovar ou ajustar copy dos CTAs, transição, rodapé e rótulo Chip | Decisão da direção; `COPY_DECISIONS.md` | Rótulos não prometem compra disponível; Chip/empresa usam texto aprovado; regressão e captura visual revisadas | Direção de negócio: desconhecida até nomeação |
| P0 | Definir owner de negócio, owner técnico e responsável pelo staging do site | Nomeação humana | Owners registrados com escopo e contato; não atribuir por inferência de `TF-1` | Direção |
| P1 | Escolher caminho de deploy para staging: EasyPanel ou VPS privada | Owner técnico, autorização e inventário do alvo | Um caminho documentado, pré-requisitos e rollback testável; nenhuma alteração em serviços existentes | Owner técnico: desconhecido |
| P1 | Corrigir política de empacotamento para excluir documentação/QA/configuração do webroot | Aprovação de mudança de configuração; revisão independente | Imagem de teste retorna 404 para `docs/`, `shots/`, `QA.md`, `Dockerfile`, `nginx.conf`, estado local e demais arquivos internos; `.env*` segue fora | Owner técnico: desconhecido |
| P1 | Remover ou revisar código de pagamento legado antes de qualquer reativação da flag. Blocos guardados por `PURCHASE_FLOWS_ENABLED` em `assets/js/site.js:193` (`mailto:` Chip), `:195` (simulação de pagamento) e `:253` (`mailto:` de contratação) | Decisão explícita de produto/engenharia; revisão de segurança | A asserção existente em `qa/purchase-flow-deactivation.test.mjs:58` já falha se a constante virar `true`; ela não valida o registro de aprovação. Nenhum bloco pode ser reativado sem aprovação formal registrada e revisão dos blocos; atualizar a asserção exige a mesma autorização e revisão. Os testes atuais não executam a jornada com a flag `true`. Ver Erratas 02/A5 e 03/A5 | Owner técnico: desconhecido |
| P1 | Reproduzir artefato Docker a partir de fonte declarada | P1 de empacotamento; snapshot/commit autorizado; caminho de deploy | Tag imutável única, ID e digest registrados, arquivos carregam cache `20261103-53`, smoke local em loopback | Owner de build/deploy: desconhecido |
| P1 | Definir rollback de staging | Caminho/owner do deploy | Procedimento remove apenas o container novo identificado, preserva serviços prévios e tem validação pós-rollback | Owner técnico: desconhecido |
| P2 | Corrigir sobreposição do hero Chip em desktop | Copy/UX de CTA aprovada | Captura 1440px e 390px sem sobreposição ou corte; teste visual independente | Owner de frontend/UX: desconhecido |
| P2 | Decidir `noindex` estático para `/contratar/`, `/carrinho/`, `/checkout/` | Decisão de SEO | Meta robots condiz com estratégia; smoke dos HTML estáticos | Owner SEO: desconhecido |
| P2 | Revisar privacidade do formulário de contato (`mailto:`) | Owner jurídico/privacidade e finalidade | Dados mínimos, finalidade/retention/consentimento definidos e documentação compatível | Owner jurídico/privacidade: desconhecido |
| P2 | Firmar contrato de entrada do futuro sistema Compras | Owners Portal/Compras/negócio; domínio/API decididos | Schema versionado de `produto`, `oferta`, campanha e fluxo autenticado; nenhuma credencial/PII em query | Owners de integração: desconhecidos |
| P3 | Confirmar comercialmente o nome do plano Chip | Owner comercial | Rótulo aprovado para todos os cards e copy | Owner comercial: desconhecido |

Nenhum item autoriza implementação, alteração de código, criação de issue, commit ou staging. Esta auditoria encerra após a revisão independente; implementação exige ordem própria.
