# Compras Telefonia Fácil — descoberta integrada e ressalvas

**Status:** material de discovery, não aprovado e não é autorização de implementação.  
**Fonte primária revisada:** `/home/adriano/portfolio/telefonia-facil/compras/PRD.md` (atualizado em 2026-11-03).  
**Fonte de descoberta preservada:** `discovery-original-2026-11-03.md` no diretório central de planejamento.  
**Contexto deste site:** `PROJECT_STATE.md`, `QA.md`, código/fatos registrados em `worker-technical.md`.

## Síntese

A direção confirmou três sistemas separados que se integram: site institucional, Área do Cliente e Página de Compras. O site atual mantém `/compras/` apenas como transição informativa; as compras legadas no site estão desativadas. O fluxo autenticado de linhas continua no Portal, e nenhum código foi extraído. A Página de Compras tem workspace próprio, mas não há evidência de aplicação, API, owner, domínio ou contrato de handoff implementados.

O PRD central propõe um sistema separado que sirva novos clientes públicos e clientes existentes autenticados. A proposta é arquitetura/produto em discovery: ainda faltam decisões sobre escopo inicial, ownership, repo/domínio, API do pedido, backend de pagamento, handoff e provisionamento.

## Fatos e ressalvas

- O site emite `produto`, `oferta` e parâmetros de atribuição permitidos para `/compras/`; isso não é autorização nem contrato completo.
- O Portal documenta `POST /bff/line-orders` com sessão do titular e token server-side; a descoberta reporta falta de idempotência e conflito documental Portal × Commerce. O backend autoritativo não foi confirmado ao vivo nesta auditoria.
- O Portal deve manter seu fluxo existente até um cutover aceito e rollback testado; não presumir migração de rotas ou páginas.
- O catálogo — linhas/DIDs, Chip e B2B — e a fase inicial estão abertos. A proposta em `COPY_DECISIONS.md` recomenda avaliar linhas primeiro e manter B2B como lead/cotação e Chip fora da transação inicial, mas a direção ainda não aprovou isso.
- O relatório original da descoberta confundiu IDs de coordenador e filhos Orca diferentes com divergência. A revisão central corrigiu: hierarquia de IDs diferentes é esperada. Não abrir Run duplicado por esse motivo.
- A recomendação de BFF próprio e intenção de uso único não é decisão. `Origin` é proteção do browser, não autenticação server-to-server; eventual handoff exige autenticação de serviço, escopo/audiência, vínculo ao titular, consumo atômico, TTL, anti-replay e política de logs, todos pendentes de contrato e revisão de segurança.
- Estados `submitted`, `pending_payment`, `paid`, `provisioning`, `provisioned`, `expired`, `cancelled`, `rejected` e `provisioning_failed` são proposta. Não se confirmou quem é fonte de verdade de pedido, cobrança, conciliação ou ativação.
- Preço no servidor, idempotência, webhook autenticado/deduplicado e isolamento por titular são requisitos propostos, não capacidades demonstradas.
- O domínio/path não define propriedade nem compartilhamento de cookie. Não compartilhar cookie ou token por conveniência.

## Alternativas resumidas

1. Compras com frontend/BFF próprios e handoff autenticado de uso único emitido pelo Portal. Recomendada no PRD para avaliação; exige novo contrato e APIs ainda inexistentes.
2. Mesmo domínio/path e cookie compartilhado. Simplifica navegação, aumenta acoplamento e não é decisão de arquitetura aprovada.
3. Manter temporariamente o pedido autenticado no Portal e extrair só jornada pública. Pode reduzir risco de cutover, mas mantém dois caminhos; estratégia transitória válida até aceite, sem contrariar a fronteira final.
4. Frontend público chamando Commerce com HMAC direto. Inseguro/inaceitável porque o segredo não pode chegar ao navegador.

## Critérios propostos, não aceite

- Confirmar owners, escopo comercial, repo/domínio, APIs e responsáveis por pedido, pagamento e provisionamento.
- Versionar contrato de handoff e APIs com sucesso/erro, identidade, TTL, replay e idempotência.
- Provar que Bearer, HMAC e cookies do Portal não chegam ao browser; leitura por outro titular não revela pedidos.
- Testar preço autoritativo no servidor, repetição após timeout, duplicação/ordem de webhooks, estados inválidos e transições.
- Aprovar operação do provedor de pagamento, privacidade/retention e mecanismo de rollback.
- Manter a compra atual do Portal até cutover e rollback aceitos.

## Decisões humanas abertas

Owner de negócio/técnico; fases e páginas do catálogo; repositório/conta; domínio; backend de pedido; API por jornada; método de handoff; pagamento/reembolso/webhook; provisionamento; política de dados e retenção. Nenhuma decisão foi criada neste documento. `TF-1` é o staging do site e não deve virar issue de Compras/Portal por inferência.
