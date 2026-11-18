# QA executado

Validação realizada antes de gerar o pacote final.

- 24 rotas verificadas.
- Renderização das páginas Home, Soluções, Número Fixo, PABX e Contratação em navegador headless.
- Home validada em desktop e mobile.
- Sem erros JavaScript nas rotas testadas.
- Menu mobile testado.
- Carrossel e botões de navegação implementados.
- FAQ interativo implementado.
- Formulário de contratação testado com validação e geração de e-mail comercial.
- Dados fictícios de empresas, depoimentos, percentuais e preços removidos.
- Telefone, 0800, e-mail e lista de clientes foram alinhados ao conteúdo público encontrado no site da Telefonia Fácil durante a revisão.

As capturas em `qa/` são renders do próprio código entregue e não mockups de design.

## Cutover de compra — estado desta branch (2026-11-03)

As observações de contratação/formulário acima descrevem o QA anterior à desativação e não representam o comportamento desta branch. Nesta branch:

- `node --check assets/js/site.js` e `node --test qa/purchase-flow-deactivation.test.mjs` passaram; 19/19 testes. `PURCHASE_FLOWS_ENABLED=false` desabilita checkout Chip e todos os pontos de entrada legados de carrinho, checkout e configuração.
- CTAs ativos de produto/planos e Chip encaminham para `/compras/` com identificadores de produto/oferta. Só chaves de campanha aprovadas são encaminhadas; valores precisam ser slug IDs de até 256 caracteres, e texto livre, e-mail e sequências numéricas semelhantes a telefone são descartados.
- `/compras/`, `/contratar/`, `/carrinho/` e `/checkout/` renderizam a página informativa sem formulário de checkout; Chip terminou sem formulário, checkout, payment gate ou controles legados, com zero erros JS observados.
- O formulário de contato geral permanece disponível.
- Browser local: rotas, handoffs e layout responsivo validados; o handoff preservou `utm_source=google_ads` e `utm_campaign=network-campaign-2026`, descartando valores livres e chave não aprovada `discount`.
- Docker build e smoke test locais passaram; seis rotas HTTP responderam 200 e arquivos de controle ficaram fora do document root. Container temporário removido; imagem `telefoniafacil-site-staging:tf-1` `sha256:f2703c5ebe98e79e8bb7249f3181b9c4dae0b885b679e42e4f5e2c125d1725b3`.
- A terceira revisão independente encontrou handlers legados não isolados; agora todos os inicializadores/listeners de compra legados estão atrás da flag. `/compras/` continua sendo apenas transição, sem sistema transacional — limitação conhecida, fora da validação do site institucional. Reconciliação 2026-11-03: Task SITE de revisão encerrada no Orca; worker relata smoke em 28 páginas. Como a revisão também alterou código e testes, isso não equivale a aceite independente de todo o diff final. Hermes reexecutou 19/19 testes, sintaxe e diff check; copy, aceite final e staging permanecem pendentes. Detalhes no PROJECT_STATE.md.
