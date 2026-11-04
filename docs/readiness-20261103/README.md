# Pacote de auditoria e prontidão — Site Institucional Telefonia Fácil

Índice do pacote de 2026-11-03. Este pacote é documental. Não representa aceite de produto, aprovação de produção, Página de Compras implementada, sincronização integral dos trackers nem staging autorizado. Escritas pontuais de Hermes foram lidas de volta e constam na matriz READINESS; staging segue **bloqueado**.

**Vínculo:** Jira [TF-2](https://2bx.atlassian.net/browse/TF-2) (ID 11293) e GitHub [Issue #1](https://github.com/adriano2bx/telefoniafacil/issues/1). `TF-1` é somente staging.

## Ordem de leitura

| # | Documento | Papel |
|---|---|---|
| 1 | [READINESS.md](READINESS.md) | Veredito, matriz de evidências e blockers. Documento principal |
| 2 | [ERRATA-20261103-02.md](ERRATA-20261103-02.md) | Reconciliação dos achados A1–A8 e D6–D7 da revisão independente, com recibos |
| 3 | [ERRATA-20261103-03.md](ERRATA-20261103-03.md) | Correções de precisão após a revalidação independente; prevalece sobre detalhes divergentes da Errata 02 |
| 4 | [worker-review-errata-20261103-02.md](worker-review-errata-20261103-02.md) | Revalidação independente final e suas ressalvas, preservada sem edição |
| 5 | [BRIEF.md](BRIEF.md) | Objetivo, escopo, exclusões e critérios de aceite |
| 6 | [DECISIONS.md](DECISIONS.md) | Decisões confirmadas, propostas pendentes e gates humanos |
| 7 | [BACKLOG.md](BACKLOG.md) | Plano local de prontidão, sem sincronização integral com Jira |
| 8 | [RUNBOOK.md](RUNBOOK.md) | Roteiro de validação e staging (não executado) |
| 9 | [ARCHITECTURE.md](ARCHITECTURE.md) | Fronteiras atuais do site e opções futuras, não aprovadas |

## Originais preservados (sem edição)

- [worker-technical.md](worker-technical.md): auditoria técnica. Contém TF-1 como referência de Jira e a contagem de 31 arquivos; ambos estão corrigidos na errata.
- [worker-review.md](worker-review.md): revisão independente com os achados A1–A8 e D1–D7.
- [worker-review-errata-20261103-02.md](worker-review-errata-20261103-02.md): revalidação independente do pacote após Errata 02; suas seis correções de precisão foram incorporadas pela Errata 03.
- [evidence-technical/](evidence-technical/): testes focais, DOM e capturas de render, além da leitura somente leitura da imagem Docker.
- [evidence-coordinator/independent-checks.md](evidence-coordinator/independent-checks.md): checagens do coordenador.

## Documentos de apoio

- [PRD-REVIEWED.md](PRD-REVIEWED.md): revisão do PRD de Compras (discovery, não especificação aprovada).

## Pendências abertas

Owners de negócio, técnico, staging e privacidade ainda não nomeados. Cópia dos CTAs e caminho de deploy pendentes. Estado atual de `f2703…` inconclusivo. Reexecução da suíte depende de mudança autorizada. Detalhes em [ERRATA-20261103-02.md](ERRATA-20261103-02.md), §6.
