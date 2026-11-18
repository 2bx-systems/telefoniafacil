# Revisão independente — pacote de auditoria do Site Institucional Telefonia Fácil

**Data:** 2026-11-03 (America/Sao_Paulo)
**Revisor:** worker de revisão (Haiku 5.5), task `task_90901de4fed4`, dispatch `ctx_2666273fd7d4`
**Coordenação:** terminal `term_43d69c17-42e1-4af9-8373-574ea3427889`
**Projeto:** `tf-site-institutional`, branch `feat/deactivate-site-purchase-flows`, HEAD `c824a21bfc18bd848b977e32f831833eab02cd40`
**Vínculo oficial:** Jira TF-2 (`https://2bx.atlassian.net/browse/TF-2`) e GitHub Issue #1 (lida como `open`). TF-1 é somente staging do site.

---

## 1. Independência da revisão

- Não preparei o pacote nem a auditoria técnica. O autor técnico é o worker `task_0ceea1ab96dc` / `ctx_c0545240f625`, e não tive acesso ao seu terminal nem à sua conversa.
- Limite declarado: o revisor é da mesma família de modelo (Haiku 5.5). A independência é de processo e de contexto, não de modelo. Reproduzi fatos por leitura direta do repositório; não reexecutei testes, build ou container, conforme a restrição da tarefa.
- Esta revisão não é aprovação de produto, de staging ou de produção. Não representa aceite do responsável nem decisão de negócio.

## 2. Resultado da revisão

**Resultado: consistente nos fatos centrais, com divergências a corrigir antes de usar o pacote como base de aceite.** O veredito de bloqueio de staging é sustentado pelas evidências. Os pontos a corrigir são de rastreabilidade (vínculo Jira, estado do ID Docker, contagem de arquivos) e de um risco de código morto que não aparece nos documentos. Nenhum achado muda a conclusão de que staging permanece bloqueado.

## 3. Achados priorizados

### A1 — P1 — `worker-technical.md` usa TF-1 como referência Jira, contrariando o vínculo oficial TF-2
- **Fato:** o cabeçalho (`worker-technical.md:9`) diz "Jira TF-1 (staging do site...)". A linha 19 da matriz (`worker-technical.md:45`) marca Jira como bloqueado com base em "`PROJECT_STATE.md`: TF-1 'Em andamento', sem assignee". A §8 (`worker-technical.md:166`) repete "TF-1 sem assignee". Nenhuma linha cita TF-2.
- **Contraste:** `BRIEF.md:18`, `READINESS.md:10`, `DECISIONS.md:11`, `BACKLOG.md:3` e `RUNBOOK.md:10` tratam TF-2 como vínculo desta auditoria e TF-1 como staging.
- **Risco:** o estado de TF-1 pode ser lido como estado da auditoria, o que o vínculo oficial proíbe.
- **Ajuste:** reescrever as referências do `worker-technical.md` para TF-2 (issue da auditoria) e TF-1 (somente staging). Registrar o estado de TF-2 como "não lido; read-back pendente com Hermes".

### A2 — P1 — Divergência de tenant Jira não está registrada
- **Fato:** a linha 19 diz "Sem ferramenta Atlassian nesta execução". `evidence-coordinator/independent-checks.md` (seção Jira) diz que o único recurso Atlassian acessível respondeu no tenant `2bxsistemas.atlassian.net`, onde TF-1 retornou 404. O vínculo oficial aponta para `2bx.atlassian.net`.
- **Risco:** dois tenants com nomes parecidos. Uma leitura no tenant errado pode gerar falsa conclusão de "issue inexistente" ou de "issue sincronizada".
- **Ajuste:** registrar explicitamente que o tenant correto de TF-2 é `2bx.atlassian.net` e que a leitura de `2bxsistemas` não vale para o vínculo. O read-back fica com Hermes, conforme já previsto.

### A3 — P1 — Estado do ID Docker `f2703…` é apresentado de forma inconsistente
- **Fato:** `worker-technical.md` (matriz, item 14, e F1) afirma que o ID `sha256:f2703c5e…` "existe sem tag" (snapshot de 13:30). `independent-checks.md` registra que o mesmo ID "não foi encontrado na verificação posterior do coordenador". `READINESS.md` (matriz e blocker P1) registra a ausência na verificação posterior. O `docker-historical-readonly.txt` documenta a existência apenas no momento da leitura do worker.
- **Ajuste:** no `worker-technical.md`, marcar o ID como "observado às 13:30; não reconfirmado na verificação posterior". Não tratar como fato atual.
- **Efeito na conclusão:** nenhum. Qualquer das leituras bloqueia staging, porque a tag não tem digest de registry e o conteúdo é diferente do worktree.

### A4 — P1 — Empacotamento: bloqueio confirmado, com um item a mais
- **Fato verificado:** `Dockerfile` contém `COPY . /usr/share/nginx/html`. `.dockerignore` exclui `.git`, `.gitignore`, `.DS_Store`, `.env*`, `PROJECT_STATE.md`, `qa/`, `AUDITORIA-PLANOS-OFICIAIS.md` e `README.md`. Não exclui `QA.md`, `Dockerfile`, `docs/`, `shots/` nem `nginx.conf`.
- **Item a mais:** existe `shots/` na raiz do repositório. O `worker-technical.md` menciona `shots/` em F5, mas o `READINESS.md` não. Deve constar da lista de exclusões a testar.
- **Ajuste:** incluir `shots/` no critério de aceite do `BACKLOG.md` (item P1 de empacotamento) e no teste de 404 do `RUNBOOK.md`.

### A5 — P2 — Risco de código morto de pagamento não documentado
- **Fato:** a flag `PURCHASE_FLOWS_ENABLED=false` (`assets/js/site.js:4`) desativa os blocos de carrinho e checkout (linhas 172–184, 253). Porém o código do Chip com simulação de pagamento (Cartão, Pix, Boleto, "Confirmar pedido", "Ambiente de demonstração") continua no fonte, na linha 195, guardado pela mesma flag. A linha 193 também contém um `mailto:` de pedido do Chip, guardado pela flag.
- **Por que importa:** os documentos dizem "sem checkout, pagamento ou `mailto:` de pedido" e estão corretos em runtime. Mas a afirmação só vale enquanto a flag for `false`. Se alguém reativar a flag sem a Página de Compras aprovada, a simulação de pagamento e o envio de pedido por e-mail voltam a funcionar.
- **Ajuste:** acrescentar ao `READINESS.md` (seção de dados e autorização) e ao `RUNBOOK.md`: "a flag é a única barreira; o código de simulação de pagamento e o `mailto:` de pedido permanecem no fonte e exigem remoção ou revisão antes de qualquer reativação". Considerar um teste que falhe se a flag virar `true` sem aprovação.
- **Verificação:** a linha 195 e a linha 193 foram lidas diretamente. O `worker-technical.md` não menciona este bloco.

### A6 — P2 — Contagem de arquivos modificados divergente
- **Fato:** `worker-technical.md` §2 diz "31 arquivos: 27 HTML, `assets/js/site.js`, `sitemap.xml`, `QA.md`, `.dockerignore`". `git diff --name-only` retorna 32 arquivos. O 32º é `README.md`, que o item não lista.
- **Verificado:** os 27 HTML tracked diferem do HEAD apenas na linha `site.js?v=` (confirmado com `git diff -U0`, sem outras linhas alteradas).
- **Ajuste:** corrigir a contagem para 32 e incluir `README.md`.

### A7 — P2 — Número de HTML: 27 tracked e 28 no total
- **Fato:** 27 arquivos HTML são rastreados; o 28º é `compras/index.html`, untracked. Os 28 têm `site.js?v=20261103-53`, o que bate com o `READINESS.md`.
- **Ajuste:** explicitar na matriz que a contagem de 28 inclui um arquivo untracked (`compras/index.html`).

### A8 — P3 — Itens de validação não repetidos por mim
- Verifiquei por leitura direta: flag em `site.js:4`; `mailto:` em `site.js:25`, `26`, `87`, `193`, `253`, `393`; `noindex` só em `compras/index.html`; sitemap com 24 URLs e nenhuma ocorrência de `contratar`, `compras`, `carrinho` ou `checkout`; 28 `site.js?v=20261103-53`.
- Não verifiquei: os textos em `/home/adriano/portfolio/...` (`compras-contract.md`, `COPY_DECISIONS.md`, `PRD.md`, checkpoint, `PROJECT_STATE.md` externo). Não fui a esses arquivos porque estão fora do escopo desta revisão. As afirmações que dependem deles ficam como "não revisadas por mim".
- Não reexecutei `node --test`, `node --check`, `git diff --check`, Docker ou Chrome. Os resultados citados vêm das evidências do worker e do coordenador.

## 4. Divergências factuais (resumo)

| # | Tema | Documento A | Documento B / evidência | Situação |
|---|---|---|---|---|
| D1 | Jira de referência | `worker-technical.md`: TF-1 | `BRIEF`, `READINESS`, `DECISIONS`, `RUNBOOK`: TF-2 | Corrigir (A1) |
| D2 | Acesso Jira | `worker-technical.md` item 19: sem ferramenta Atlassian | `independent-checks.md`: tenant `2bxsistemas` acessível | Registrar tenant (A2) |
| D3 | Existência do ID `f2703` | `worker-technical.md`: existe sem tag | `independent-checks.md` e `READINESS`: não encontrado depois | Marcar como snapshot de 13:30 (A3) |
| D4 | Arquivos modificados | `worker-technical.md`: 31 | `git diff`: 32 | Corrigir (A6) |
| D5 | Exclusões do `.dockerignore` | `READINESS`: não cita `shots/` | `worker-technical` F5: cita `shots/` | Incluir no teste (A4) |
| D6 | Coordenação do brief | `BRIEF.md`: "Codex/Luna" | `independent-checks.md` e `worker-technical`: coordenador `term_43d69c17` | Esclarecer quem coordena |
| D7 | Terminal de envio do worker | Texto do brief (`--from term_4201f3c8…`) | Texto do brief (coordenador `term_43d69c17…`) | Confirmar com a coordenação (ver §6) |

## 5. Riscos

1. **Vínculo Jira ambíguo (A1, A2):** risco de atualizar ou ler a issue errada, ou de declarar TF-1 como status da auditoria. Probabilidade média, impacto alto para rastreabilidade.
2. **Artefato Docker sem digest (A3):** risco de staging a partir de imagem que não corresponde ao código. Bloqueado; reversível se não houver deploy.
3. **Empacotamento (A4):** `docs/`, `QA.md`, `Dockerfile`, `nginx.conf`, `shots/` iriam ao webroot de um rebuild. Exposição de conteúdo interno. Mitigação já prevista, sem execução.
4. **Reativação acidental do fluxo de pagamento (A5):** baixa probabilidade no curto prazo, impacto alto se ocorrer.
5. **Dados pessoais no formulário de contato:** o formulário monta `mailto:` no navegador com nome, empresa, e-mail, telefone e mensagem (`site.js:393`). Não há checkbox de consentimento. Owner de privacidade desconhecido. (O CPF aparece só no código morto do Chip, descrito em A5.)
6. **Visual (hero do Chip, desktop):** já documentado como P2. Não reproduzido em mobile.

## 6. Próximos ajustes recomendados (ordem)

1. Corrigir `worker-technical.md` para TF-2 como vínculo, TF-1 como staging, e registrar o tenant `2bx.atlassian.net` (A1, A2).
2. Marcar o estado do ID `f2703` como snapshot de 13:30, não reconfirmado (A3).
3. Corrigir a contagem para 32 arquivos e incluir `README.md` (A6).
4. Incluir `shots/` nas exclusões a testar no `BACKLOG.md` e no `RUNBOOK.md` (A4).
5. Registrar no `READINESS.md` o risco de código morto de pagamento sob a flag (A5).
6. Confirmar com a coordenação o terminal de envio do worker (D7) e quem coordena a auditoria (D6). Não bloqueia a revisão.
7. Pedir a Hermes o read-back de Jira TF-2 no tenant `2bx.atlassian.net` antes de marcar qualquer sincronização.

Nenhum desses ajustes exige código, copy, teste ou configuração. Todos são documentais, e cabem na mesma rodada de documentação.

## 7. O que esta revisão não afirma

- Não declara o site aprovado, pronto para produção ou a Página de Compras implementada.
- Não declara o produto aceito nem o staging autorizado.
- Não confirma o estado remoto de TF-1, TF-2, GitHub Issue #1 ou de qualquer branch remota.
- Não declara a suíte focal ou o build válidos nesta revisão. Os resultados são os das evidências citadas.
- Não revisou os documentos externos de `/home/adriano/portfolio/...`.

## 8. Escopo de escrita

Único arquivo criado nesta tarefa: `docs/readiness-20261103/worker-review.md`. Nenhum outro arquivo foi editado. Nenhum teste, build, container, comando remoto, escrita em GitHub ou Jira, ou acesso a serviço externo foi executado.
