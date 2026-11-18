# Telefonia Fácil — Site Premium

## Auditoria e prontidão — 2026-11-03

O estado desta branch, as evidências locais, os bloqueios para staging e as decisões pendentes estão indexados em [docs/readiness-20261103/READINESS.md](docs/readiness-20261103/READINESS.md). O pacote é de auditoria; não representa aprovação de produção nem implementação da Página de Compras.

Índice do pacote de auditoria e revisão: [docs/readiness-20261103/README.md](docs/readiness-20261103/README.md). Reconciliação dos achados: [ERRATA-20261103-02.md](docs/readiness-20261103/ERRATA-20261103-02.md); correções de precisão após revalidação independente: [ERRATA-20261103-03.md](docs/readiness-20261103/ERRATA-20261103-03.md). Revisão independente final preservada em [worker-review-errata-20261103-02.md](docs/readiness-20261103/worker-review-errata-20261103-02.md).

## Auditoria visual e melhorias — 2026-11-05

As auditorias visuais das 28 rotas, os quatro planos e o estado das correções locais estão indexados em [docs/visual-audit-20261105/README.md](docs/visual-audit-20261105/README.md) e [docs/improvement-plans-20261105/](docs/improvement-plans-20261105/). As correções ainda estão locais e sem commit. Os relatórios não aprovam copy, condições comerciais, materiais de clientes ou publicação; consulte [docs/readiness-20261103/DECISIONS.md](docs/readiness-20261103/DECISIONS.md) para as decisões de navegação registradas.

Revisão visual pontual posterior da fotografia na seção “Linha Virtual” e suas limitações de captura: [relatório e conferência](docs/visual-audit-20261105/section-03-photo-review/COORDINATOR-REVIEW.md).

Site estático responsivo com home, soluções, páginas de produto, contratação, contato, suporte e páginas institucionais.

## Rodar localmente

Na pasta do projeto:

```bash
python3 -m http.server 8080
```

Abra http://localhost:8080

## Publicar no EasyPanel

Este projeto já inclui `Dockerfile` e `nginx.conf` para publicação como um
serviço Docker no EasyPanel.

No EasyPanel, crie um serviço do tipo **App**, conecte o repositório Git ou
envie o projeto, selecione o **Dockerfile** e configure a porta interna `80`.
Depois, em **Domains**, associe o domínio e ative HTTPS/Let's Encrypt.

O container é somente leitura para o conteúdo do site e não precisa de banco
de dados ou variáveis de ambiente. Os formulários atuais são demonstrativos e
preparam um e-mail local; para receber pedidos automaticamente será necessário
conectar uma API de CRM ou e-mail transacional.

### Preflight local para EasyPanel — 2026-11-18

- Build context: raiz do repositório; Dockerfile: `Dockerfile`; porta interna: `80`; sem comandos de build/start adicionais nem variáveis de ambiente.
- A imagem usa Nginx `1.30.6-alpine3.24`. O `.dockerignore` exclui GitHub metadata, documentação, screenshots, QA e arquivos de governança do container.
- `nginx.conf` aplica cache longo aos assets, revalidação de HTML e preserva os cabeçalhos de segurança também nas locations que configuram cache. CSS/JS usam query strings para cache-bust.
- Preflight local concluído: `docker build` e `nginx -t` aprovados; `/`, `/sobre/`, `/solucoes/` e o CSS retornaram HTTP 200; README e relatórios não foram incluídos na imagem (HTTP 404). Imagem local: `telefoniafacil-site:deploy-candidate`.
- Isso prepara o artefato, mas não o envia ao GitHub/registry nem configura serviço, domínio ou TLS no EasyPanel. Esses passos continuam manuais. Formulários continuam demonstrativos/`mailto`; fluxos de compra no site permanecem desativados.

## Dados

Telefones, e-mail e nomes de clientes utilizados no layout foram obtidos do site público da Telefonia Fácil. Não há depoimentos, percentuais comerciais ou preços fictícios. Formulários preparam um e-mail local para envio, pois nenhuma API de CRM foi fornecida.

## Auditoria visual completa — 2026-11-12

A captura de todas as 28 rotas em desktop e mobile e a análise de imagens/cards estão em [docs/visual-audit-20261112/README.md](docs/visual-audit-20261112/README.md). Foram salvas 56 capturas iniciais; a auditoria não encontrou imagens quebradas nem overflow horizontal a 390 px. Depois, os oito cards de `/solucoes/` foram padronizados e as seções de clientes removidas de `/sobre/` e `/solucoes/`, com novas capturas no mesmo relatório.
