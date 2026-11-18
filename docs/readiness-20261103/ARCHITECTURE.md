# Fronteiras e arquitetura — estado atual e proposta

## Estado atual verificado

### Site institucional

- Aplicação estática renderizada por `assets/js/site.js`, com HTML por rota, CSS e assets locais. O `Dockerfile` copia o conteúdo do projeto para `/usr/share/nginx/html`, servido por nginx; assets recebem cache longo e HTML revalidação.
- A constante `PURCHASE_FLOWS_ENABLED=false` (`assets/js/site.js:4`) mantém inativos os handlers de carrinho, checkout e Chip. Entre eles estão o `mailto:` de pedido do Chip (`:193`), a simulação de pagamento (`:195`) e o `mailto:` de contratação (`:253`), que seguem no fonte. A renderização atual não oferece checkout, pagamento, formulário de pedido ou coleta de dados de compra. A flag é a única barreira (errata A5).
- Produto/planos/Chip encaminham para a rota local `/compras/`, carregando `produto`, `oferta` e parâmetros de campanha permitidos. Essa query é navegação/atribuição; não autentica cliente nem autoriza compra.
- `/compras/` é página informativa com `noindex`, dizendo que a experiência está em preparação e encaminhando ao contato. Não há sistema transacional nela.
- O formulário geral em `/contato/` permanece: seu submit monta uma URL `mailto:` com dados digitados no navegador. Não foi submetido nesta auditoria; há decisão de privacidade/consentimento pendente.

### Sistemas vizinhos — somente fronteiras

- Área do Cliente tem workspace separado e seu próprio fluxo autenticado de pedido de linhas conforme artefatos de descoberta. O estado local do Portal aponta `/bff/line-orders`; seu contrato de backend/idempotência e owner não foram validados ao vivo por esta auditoria.
- Página de Compras tem workspace de pasta separado, sem HEAD/branch Git observado; isso prova separação de diretório/workspace, não aplicação, API ou deploy.
- Os identificadores de produto/UTM que saem do site não formam contrato completo com Compras. Não há endpoint confirmado, handoff autenticado, API, hostname de Compras ou controle de estado no site.

```mermaid
flowchart LR
  V[Visitante] --> S[Site institucional estático]
  S -->|produto, oferta e campanha| T[/compras/ informativa]
  T -->|contato| C[Contato geral / mailto no cliente]
  S -. contrato futuro não definido .-> P[Compras separada]
  A[Área do Cliente] -. pedidos de linhas atuais permanecem no Portal .-> API[/bff/line-orders]
  P -. API, identidade, pagamento e provisionamento em aberto .-> API
```

## Dados e segurança

- Não existe sessão/autorização no site estático. Produtos, ofertas e UTMs em query string são valores de entrada não confiáveis; a futura Compras deve validar catálogo/preço no servidor.
- O formulário de contato pode passar nome, empresa, e-mail, telefone e mensagem ao cliente de e-mail do visitante. Não existe submissão a backend comprovada; finalidade, retenção e consentimento precisam de decisão do owner de privacidade.
- Nenhuma credencial foi lida. `.dockerignore` exclui `.env*`, mas o build usa `COPY .` e não exclui `docs/`, `shots/`, `QA.md`, `Dockerfile` ou `nginx.conf` (verificado na errata, A4). A imagem histórica continha `QA.md` e `Dockerfile`; os novos documentos de auditoria também entrariam no webroot de um build enquanto a configuração não for autorizadamente corrigida. Isso bloqueia qualquer rebuild/staging.
- Não compartilhar cookie do Portal nem colocar token/PII em URL é requisito de segurança futuro, ainda sem contrato aprovado.

## Opções futuras — não aprovadas

1. **Site segue estático; Compras independente com BFF próprio e contratos explícitos.** Mantém fronteiras e segredos no servidor; requer definir APIs, autenticação, handoff, catálogo e ownership. É recomendação para avaliação, não decisão.
2. **Integrar o site diretamente ao backend de compras.** Só seria aceitável com API pública autorizada e sem segredo no browser; hoje não há contrato ou endpoint verificado.
3. **Manter temporariamente o pedido autenticado no Portal e separar apenas a jornada pública.** Reduz risco de cutover imediato, mas mantém duas jornadas e exige owner do pedido; estratégia transitória, não rejeição da separação final.

Não há evidência de extração funcional, API de Compras, handoff seguro, nova autorização de usuário, payment workflow ou deploy do sistema Compras.
