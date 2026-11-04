# Brief — auditoria e prontidão do site

**Projeto:** Site Institucional Telefonia Fácil (`tf-site-institutional`)  
**Empresa:** Telefonia Fácil; `company_id` formal não confirmado  
**Workspace:** `c50d714d-904e-42fb-aba2-18a5fdd3b897::/home/adriano/orca-ext4/projects/telefoniafacil-site-disable-purchase`  
**Branch/HEAD local:** `feat/deactivate-site-purchase-flows` / `c824a21bfc18bd848b977e32f831833eab02cd40`  
**Data:** 2026-11-03, fuso `America/Sao_Paulo`.

## Objetivo

Produzir evidência confiável sobre o site como canal de marketing/contato e sua prontidão para uma futura validação de staging privado. Confirmar o estado dos fluxos legados de compra, analisar CTAs e copy pendente sem aplicar a proposta, revisar o diff e a suíte focal, inspecionar páginas renderizadas localmente e avaliar a validade do artefato Docker histórico e do roteiro de staging.

## Stakeholders e autoridade

- Direção/solicitante: Adriano.
- Coordenação desta auditoria: Codex/Luna, restrita ao projeto Site. Identidade comprovada por recibo Orca: terminal `term_43d69c17-42e1-4af9-8373-574ea3427889`, agente `codex`, modelo `gpt-6-luna` (ver `ERRATA-20261103-02.md`, §3).
- Dono de negócio, dono técnico e responsável de staging: desconhecidos; não inferidos do ticket.
- Vínculo oficial desta auditoria recebido de Hermes: Jira `TF-2` (`https://2bx.atlassian.net/browse/TF-2`) e GitHub Issue `#1` (`https://github.com/adriano2bx/telefoniafacil/issues/1`). `TF-1` é somente staging do site. Read-back de Hermes (2026-11-03, horário não informado): Jira TF-2 ID 11293 no tenant `2bx.atlassian.net`, **Em andamento**, assignee null; GitHub Issue #1 **OPEN**, assignee null.

## Escopo incluído

- Diff, status e arquivos não commitados já presentes no worktree; preservação integral.
- UI renderizada localmente em desktop/mobile sem submeter formulários.
- CTA, rodapé, página informativa `/compras/`, Chip, flag de desativação, cache e sitemap.
- Testes focais 19/19, sintaxe e `git diff --check`.
- Separação dos projetos por diretório, workspace Orca, Git/GitHub, Jira/backlog, runtime/deploy, dados/autorização e contratos.
- Imagem Docker local histórica e roteiro de staging privado, ambos somente leitura/planejamento.
- Documentação local de prontidão e revisão independente.

## Exclusões

- Implementação ou alteração de código, copy pública, testes/assertions, configuração, dependências, dados ou arquivos históricos.
- Construção/execução de container, deploy, staging remoto, SSH/VPS, DNS, firewall, TLS, cobrança, chamadas de negócio ou integrações live.
- Criação/alteração remota de Issues, PRs, Jira, projetos, repositórios, commits ou branches.
- Extração de Compras ou alterações no Portal; esses sistemas são tratados somente como fronteiras e fontes documentais.
- Leitura de `.env`, segredos, tokens ou submissão de dados pessoais.
- Iniciar implementação após esta auditoria.

## Critérios de aceite da auditoria

1. Cada dimensão solicitada tem verdict explícito (`verificado`, `parcial`, `ausente`, `bloqueado` ou `N/A`), fonte, data e limite.
2. A flag e a ausência de checkout legado são apoiadas por código/testes e inspeção local; o formulário geral permanece separado.
3. A suíte focal e checks são reportados com saída real e limitação de cobertura.
4. CTAs/copy são avaliados sem aplicar a proposta pendente.
5. A imagem histórica é comparada ao estado-fonte e classificada sem construir ou executar container.
6. O roteiro de staging enumera pré-requisitos, gates e rollback sem executar comandos remotos.
7. A separação entre os três projetos não é confundida com extração funcional; a revisão é feita por outro worker.
8. Nenhuma mudança nos arquivos sujos/untracked preexistentes além dos documentos autorizados desta auditoria.

## Estado de aceite

**Auditoria local documentada, com staging bloqueado.** Não significa produto aprovado, production-ready, Compra implementada, sincronização integral dos trackers ou deploy validado. Há leituras de volta de ações pontuais de Hermes, listadas em READINESS; elas não provam sync integral.
