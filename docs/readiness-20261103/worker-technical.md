# Auditoria técnica — Site Institucional Telefonia Fácil (tf-site-institutional)

Data: 2026-11-03 (-03:00). Autor: worker Haiku (task_0ceea1ab96dc / dispatch ctx_c0545240f625, coordenador term_43d69c17-42e1-4af9-8373-574ea3427889).
Escopo: auditoria técnica, de contratos e validação como site de marketing/contato. Sem alteração de código, copy, testes, configs, histórico ou documentos de consolidação.
Status declarado: **auditoria concluída com produto bloqueado**. Não declaro o site aprovado, pronto para produção ou a Página de Compras implementada.

Workspace verificado: `/home/adriano/orca-ext4/projects/telefoniafacil-site-disable-purchase` (exato).
Branch `feat/deactivate-site-purchase-flows`, HEAD `c824a21bfc18bd848b977e32f831833eab02cd40` (conferido).
company_id formal: não confirmado. Contexto: Telefonia Fácil. Repo GitHub `adriano2bx/telefoniafacil` (id `c50d714d-904e-42fb-aba2-18a5fdd3b897`). Jira TF-1 (staging do site; nenhuma execução de staging nesta auditoria).

---

## 1. Resumo executivo

- **Verificado:** a flag `PURCHASE_FLOWS_ENABLED=false` está no código; não há checkout, pagamento, nem `mailto:` de pedido na renderização; a suíte focal passa 19/19 hoje (exit 0); todas as 28 entradas HTML carregam `site.js?v=20261103-53`; o sitemap não lista `/contratar/`; não há overflow horizontal em 390 px nem 1440 px nas rotas testadas.
- **Bloqueante para staging:** o artefato Docker histórico `telefoniafacil-site-staging:tf-1` **não corresponde ao estado atual**. A tag foi reapontada; o ID registrado existe sem tag; ambas as imagens servem `site.js?v=20260910-51` e contêm `site.js` diferente do worktree. Não há digest de registry.
- **Parcial no produto:** os CTAs têm destinos internos reais e informativos, mas os rótulos continuam transacionais ("Começar contratação", "Contratar agora", "Configurar este plano", "Acessar Página de Compras") e levam a uma página que diz que a compra ainda não está disponível.
- **Pendente de decisão humana:** a proposta de copy em `COPY_DECISIONS.md` não foi aplicada (correto pelo escopo) e aguarda aprovação de direção.
- **Não executado:** staging, build, run/create de container, SSH/VPS, DNS, firewall, TLS, Jira write, GitHub write, consulta live de Jira/Orca nesta execução.

---

## 2. Matriz de verdict por dimensão

| # | Dimensão | Verdict | Evidência | Fonte / data | Limite |
|---|---|---|---|---|---|
| 1 | Diretório, branch e HEAD do worktree | **verificado** | `git rev-parse`: branch e HEAD batem com a ordem | worktree, 2026-11-03 | Não vale para o estado remoto |
| 2 | Diff tracked (31 arquivos: 27 HTML, `assets/js/site.js`, `sitemap.xml`, `QA.md`, `.dockerignore`) | **verificado** | `git diff --check` exit 0. Os 27 HTML diferem do HEAD apenas no `site.js?v=`, confirmado com normalização por arquivo | worktree | Não é commit, não há PR |
| 3 | Untracked (`PROJECT_STATE.md`, `compras/index.html`, `qa/purchase-flow-deactivation.test.mjs`) | **verificado** (presença) | `git status` | worktree | Não há commit; continuidade depende do arquivo local |
| 4 | Flag `PURCHASE_FLOWS_ENABLED=false` | **verificado** | `assets/js/site.js:4`; testes 9 e 10 passam | worktree | Verificado por leitura e teste de texto, não por execução de handler |
| 5 | Ausência de checkout, formulário e pagamento renderizados | **verificado** | DOM de 9 rotas: 0 forms e 0 inputs, exceto `/contato/` (1 form, 5 inputs); sonda: `payTerms=false` em 22 combinações | `docs/readiness-20261103/evidence-technical/render-probe-and-dom.txt` | Headless Linux, sem submissão |
| 6 | Ausência de `mailto:` de pedido | **verificado** | Só `mailto:contato@telefoniafacil.com.br` no topbar e rodapé; o submit de `/contato/` monta `mailto:` no cliente (ver F7) | `site.js:25`, `:26`, `:393` | Leitura estática do submit, não acionado |
| 7 | CTAs informativos e destino real | **parcial** | Destinos reais e internos (`/compras/` transição, `/contato/`). Rótulos transacionais em 6 pontos (ver F2) | DOM renderizado de `/`, `/planos/`, `/numero-fixo/`, `/compras/` | Destino é página de transição, não compra |
| 8 | Copy de transição, rodapé e Chip **sem** aplicar proposta pendente | **verificado** (não aplicada) | 0 ocorrências das strings propostas ("Informações de contratação", "Falar com a equipe", "Encontre a solução ideal", "Plano móvel", "Quer contratar uma solução") | `COPY_DECISIONS.md` (2026-11-03T15:41:19-03:00) | Copy atual ainda é a anterior à proposta (F10) |
| 9 | Testes focais 19/19 | **verificado** | `node --test qa/purchase-flow-deactivation.test.mjs` → `# tests 19 / pass 19 / fail 0`, exit 0 | `evidence-technical/node-test-focused-19.txt`, hoje | 18 de 19 leem texto do fonte ou arquivos (regex/includes); só 1 executa código (`cleanCampaignValue`) (F9) |
| 10 | Sintaxe de `site.js` | **verificado** | `node --check assets/js/site.js` exit 0 | hoje | — |
| 11 | Versões de cache | **verificado** | 28/28 HTML com `site.js?v=20261103-53`; `site.css?v=20260910-51` inalterado; `home-promo.css` inalterado | worktree | Cache de CDN/navegador não verificado |
| 12 | `sitemap.xml` | **verificado** | 24 URLs; sem `/contratar/`, `/compras/`, `/carrinho/`, `/checkout/` | `sitemap.xml` | Não validado por ferramenta de SEO |
| 13 | Frontend renderizado desktop/mobile | **parcial** | Sem overflow horizontal em 390/1440 px; sem erro JS no console; sem âncora quebrada; defeito visual no hero do Chip em desktop (F3) | capturas em `evidence-technical/*.png` | Sem aprovação visual humana; sem dispositivo real |
| 14 | Imagem Docker histórica `tf-1` | **ausente** (não confirmada) | Tag aponta para `6f6b640dd8f7…`; ID registrado `f2703c5e…` existe sem tag; ambas servem `site.js?v=20260910-51`; nenhuma coincide com o worktree | `evidence-technical/docker-historical-readonly.txt` | Sem digest de registry; sem execução de container |
| 15 | Roteiro de staging privado (proposta) | **parcial** | Há pré-requisitos e intenção (container novo, porta loopback, túnel SSH) no checkpoint; **rollback não tem procedimento**; sem comandos | checkpoint e `PROJECT_STATE.md` | Não executado (ver §7) |
| 16 | Fronteira de diretórios | **verificado** | Worktree exato; `compras/` é pasta sem Git, untracked, deliberado; pasta de Compras existe em `/media/adriano/Projetos/Telefonia Facil/Pagina de Compras` (apenas listada) | `PROJECT_STATE.md`, `ls` | Não inspecionei o conteúdo do workspace de Compras |
| 17 | Fronteira Orca | **N/A** nesta execução | Worker: não consultei o runtime ao vivo; uso do CLI só para o `worker_done` | `PROJECT_STATE.md` (IDs registrados) | Não reconciliado ao vivo |
| 18 | Fronteira GitHub | **parcial** | Última consulta registrada hoje 15:41: 0 issues abertas, 0 PRs abertos. Nenhum commit/PR para as alterações locais | `evidence/2026-11-03/github-open.json` | Não consultei ao vivo nesta execução |
| 19 | Fronteira Jira | **bloqueado** | Sem ferramenta Atlassian nesta execução; escrita proibida | `PROJECT_STATE.md`: TF-1 "Em andamento", sem assignee | Não verificado ao vivo |
| 20 | Backlog do site | **ausente** | Não há `BACKLOG.md` do site; o pacote de prontidão do site (READINESS, BRIEF, ARCHITECTURE, BACKLOG, DECISIONS, RUNBOOK) não está presente | `docs/readiness-20261103/` (apenas este worker) | Pacote é do coordenador |
| 21 | Runtime/deploy | **parcial** (com conflito) | Dois caminhos documentados: `README.md` (EasyPanel, Dockerfile + nginx) e checkpoint (VPS privada via túnel SSH). Nenhum foi executado | `README.md`, checkpoint | Dono do caminho de deploy desconhecido |
| 22 | Dados e autorização | **parcial** | Nenhum `.env` no worktree; nenhum padrão `api_key|secret|password|token|BEGIN PRIVATE` em arquivos rastreados (somente nomes checados, sem valores). Formulário de contato sem checkbox de consentimento (F7) | `git grep` (nomes) | Não auditei a conta/credencial do host; não li `.env` nem dados pessoais |
| 23 | Contratos de handoff | **parcial** | O site emite `produto`, `oferta` e UTMs/`gclid` em `/compras/`. Nem `compras-contract.md` nem o PRD definem esses parâmetros | `compras-contract.md`, `compras/PRD.md` | Contrato Compras ainda não fechado (F8) |

---

## 3. Achados priorizados

### F1 — P1 — Imagem Docker histórica não é o artefato atual (bloqueia staging)
- **Fato:** o checkpoint registra `telefoniafacil-site-staging:tf-1` = `sha256:f2703c5ebe98e79e8bb7249f3181b9c4dae0b885b679e42e4f5e2c125d1725b3` (13:30:30). Hoje, a tag aponta para `sha256:6f6b640dd8f7…` (13:42:27). O ID registrado existe sem tag.
- **Conteúdo:** nas duas imagens, o `index.html` referencia `site.js?v=20260910-51`. O `site.js` embutido tem 123181 B (f2703) e 123442 B (6f6b); o worktree tem 123132 B. Nenhum hash coincide. `compras/index.html` e `sitemap.xml` também diferem. Ambas contêm `QA.md` e `Dockerfile` na raiz web.
- **Não há** `RepoDigests`: o "digest registrado" é só o ID local.
- **Cenário de falha:** staging a partir da tag atual publicaria uma versão anterior, com cache -51 e sem a validação focal.
- **Ação:** não usar nenhuma das duas imagens. Reconstruir a partir de commit ou hash de árvore declarado, com tag única (não reapontar `tf-1`), registrar ID e digest e refazer os smokes. Dono do build: desconhecido.

### F2 — P1 — CTAs transacionais com destino informativo
- **Fato (DOM renderizado):** "Começar contratação" (2× no hero e no bloco de solução da home), "Contratar agora" (cards da home), "Contratar esta solução" e "Configurar adicionais" (`/numero-fixo/`), "Configurar este plano" (10 ocorrências somadas em `/planos/` e `/numero-fixo/`), "Configurar locação" (12× em `/planos/`), "Configurar minha solução" (4× em `/planos/`), e "Acessar Página de Compras" no cabeçalho de `/compras/`. Todos apontam para `/compras/` (`?produto=…&oferta=…`).
- **Conflito:** `/compras/` diz "A nova experiência de compras está em preparação" e "A contratação online ainda não está disponível".
- **Ação:** decisão de copy (ver §6, decisão 1). Até a decisão, não tratar CTA transacional como "informativo". A proposta do `COPY_DECISIONS.md` ("Informações de contratação") está pendente.

### F3 — P2 — Sobreposição no hero do Chip em desktop
- **Fato:** em `desktop-chip.png` (1440×900), as setas do carrossel do hero ficam sobre a borda superior do botão "Ver opções de planos". No card de 20 GB, o texto "Ver informações de …" do botão quebra e é cortado. Não reproduzido em 390 px (`mobile-chip.png`).
- **Ação:** correção visual em tarefa separada, com teste de regressão e captura antes/depois. Não corrigido por esta auditoria.

### F4 — P2 — Roteiro de staging incompleto e caminhos de deploy conflitantes
- **Fato:** `README.md` descreve publicação no EasyPanel (Dockerfile + nginx, porta 80, domínio com TLS). O checkpoint descreve staging privado em container novo numa VPS, em porta loopback, via túnel SSH. Não há procedimento de rollback nem comandos.
- **Ação:** o dono do caminho de deploy precisa escolher um. Ver §7.

### F5 — P2 — `.dockerignore` não protege conteúdo que vira público no rebuild
- **Fato:** o `.dockerignore` atual exclui `qa/`, `README.md`, `.env*`, `PROJECT_STATE.md`, mas **não** exclui `QA.md`, `Dockerfile`, `docs/` (criado por esta auditoria) nem `shots/`. Um `COPY . /usr/share/nginx/html` os publica. `QA.md` e `Dockerfile` já estão na imagem histórica.
- **Ação:** endurecer o `.dockerignore` antes de qualquer rebuild, com teste de que essas rotas retornam 404 na imagem. Mudança de código/config: depende de autorização.

### F6 — P2 — Rotas legadas sem `noindex` na HTML estática
- **Fato:** `noindex` só existe em `compras/index.html`. `/contratar/`, `/carrinho/` e `/checkout/` têm HTML estático sem `noindex`; o conteúdo vem do JS. Estão fora do sitemap, mas um crawler que executa JS as indexaria.
- **Ação:** decidir se recebem `noindex` estático. Não alterado.

### F7 — P2 — Formulário de contato com dados pessoais em `mailto:` e sem consentimento
- **Fato:** `/contato/` tem 5 campos obrigatórios (nome, empresa, e-mail, telefone, mensagem). O submit (`site.js:393`) monta `mailto:` com esses dados no cliente, sem envio a servidor. Não há checkbox de consentimento; há link para Política de Privacidade.
- **Não testado:** não submeti o formulário, conforme a restrição.
- **Ação:** decisão de privacidade/jurídica. Dono desconhecido.

### F8 — P3 — Contrato de handoff não definido
- **Fato:** `produto`, `oferta` e as UTMs/`gclid`/`fbclid` são emitidos pelo site (`purchaseHref`). `compras-contract.md` e `compras/PRD.md` não definem esses parâmetros (grep sem resultados).
- **Ação:** registrar o contrato de entrada da futura Página de Compras antes de qualquer integração.

### F9 — P3 — Limite da suíte focal
- **Fato:** dos 19 testes, 18 leem texto do fonte (`site.js`) ou arquivos (HTML, sitemap) e checam por regex ou `includes`; não renderizam nem executam os handlers. Só o teste de sanitização de campanha (`cleanCampaignValue`) executa código.
- **Ação:** não afirmar cobertura funcional a partir de 19/19. E2E headless seria um passo adicional.

### F10 — P3 — Copy pendente ainda visível
- **Fato:** rodapé ainda diz "Encontre a solução adequada à sua empresa." (proposta: "Encontre a solução ideal para você ou sua empresa"). O Chip exibe "Plano controle" via CSS (`site.css`), com a proposta "Plano móvel" pendente de confirmação comercial.
- **Ação:** aguarda decisão de copy; não aplicada.

---

## 4. Evidência renderizada

- DOM de 9 rotas, 1440×900: `evidence-technical/render-probe-and-dom.txt` (seções A, C).
- Sonda de layout 390/1440 px em 11 rotas: `render-probe-and-dom.txt` (seção B). Resultado: overflow 0 em todas, âncoras quebradas 0, sem termos de pagamento.
- Capturas (Chrome headless, 2 larguras):
  - `evidence-technical/desktop-home-top.png`, `mobile-home-top.png`
  - `evidence-technical/desktop-compras.png`, `mobile-compras.png`
  - `evidence-technical/desktop-chip.png`, `mobile-chip.png`
  - `evidence-technical/desktop-planos.png`, `mobile-planos.png`
- Limite: capturas feitas no Chrome headless Linux, sem aprovação visual humana e sem teste em dispositivo real.

---

## 5. Comandos: executados versus não executados

**Executados (leitura ou validação local):**
- `git status`, `git diff`, `git diff --check` (exit 0), `git diff --name-only`, `git show HEAD:<arquivo>`, `git grep` (só nomes), `git rev-parse`.
- `node --check assets/js/site.js` (exit 0); `node --test qa/purchase-flow-deactivation.test.mjs` (19/19, exit 0).
- Leitura de `site-contract.md`, `COPY_DECISIONS.md`, `PROJECT_STATE.md`, checkpoint, `compras-contract.md`, `compras/PRD.md`, `evidence/2026-11-03/*.json`, `README.md`, `Dockerfile`, `nginx.conf`, `_headers`, `.dockerignore`, `.gitignore`.
- Docker, somente leitura: `docker image ls --digests`, `docker image inspect`, `docker history --no-trunc`, `docker save` para o scratchpad (sem container), extração das camadas com `tar`/python para o scratchpad.
- Servidor estático em `127.0.0.1:8765` (worktree) e cópia em `127.0.0.1:8766` (scratchpad), ambos encerrados após a coleta. Cópia verificada por `diff -rq`.
- Chrome 156 headless: `--dump-dom` das rotas e `--screenshot` das capturas; sonda de layout com iframes same-origin.

**Não executados (fora de escopo ou proibido):**
- `docker build`, `docker run`, `docker create`, `docker push/pull`, qualquer container.
- Staging remoto, SSH, VPS, DNS, firewall, TLS, túnel.
- Submissão de formulário, clique em CTA com efeito, escrita em Jira, GitHub, Orca.
- Consulta ao vivo do Jira, GitHub (`gh`) e Orca nesta execução (usei as evidências de hoje 15:41 registradas no `PROJECT_STATE.md`).
- Leitura de `.env`, tokens, dados pessoais.
- Playwright/Lighthouse/axe (não instalados e não necessários para este veredito).

---

## 6. Decisões humanas mínimas

1. **Copy:** aprovar ou ajustar a proposta de `COPY_DECISIONS.md`, principalmente os rótulos dos CTAs (F2). Dono: direção (Adriano).
2. **Recorte de Compras:** aprovar a fase inicial proposta, ou outra. Dono: direção, com ponto focal de negócio e técnico ainda não nomeados.
3. **Caminho de deploy de staging:** EasyPanel ou VPS privada via túnel (F4). Requer autorização específica antes de qualquer ação remota.
4. **Privacidade do formulário de contato** (F7): dono jurídico/privacidade desconhecido.

---

## 7. Roteiro de staging privado — apenas proposto, não executado

**Pré-requisitos ausentes hoje:** (a) decisão de copy; (b) commit ou hash de árvore declarado; (c) `.dockerignore` endurecido (F5); (d) imagem reconstruída e ligada à fonte (F1); (e) autorização específica; (f) dono técnico e de negócio.

Passos propostos:
1. Congelar o estado: commit local ou hash de árvore do worktree, registrado em `PROJECT_STATE.md`.
2. Build reproduzível com tag única (ex.: `telefoniafacil-site-staging:<hash-curto>`), sem reapontar `tf-1`; registrar ID e digest.
3. Smoke local do container em `127.0.0.1` apenas: as 28 entradas HTML com `v=20261103-53`, `PURCHASE_FLOWS_ENABLED=false`, rotas `/compras/`, `/contratar/`, `/carrinho/`, `/checkout/`, `/chip/` e `/contato/` com 200, `QA.md`/`Dockerfile`/`docs/` com 404.
4. Preflight read-only da VPS (revalidar o do checkpoint): porta loopback livre, espaço, memória, Apache/Asterisk/harness intactos.
5. Deploy: container novo com nome dedicado, porta loopback livre, sem alterar Apache, Asterisk, o container existente, firewall, DNS ou TLS.
6. Acesso por túnel SSH, somente com autorização.
7. **Rollback (a definir):** parar e remover apenas o container novo; remover a imagem só após confirmar que nada depende dela; verificar que os serviços existentes seguem saudáveis. Definição de comandos exatos pendente.
8. Gate: nenhuma transição de TF-1 sem aprovação explícita.

---

## 8. Blockers e owners

| Item | Owner | Status |
|---|---|---|
| company_id formal | desconhecido | não confirmado |
| Dono de negócio do site | desconhecido | não confirmado (PROJECT_STATE) |
| Responsável técnico do staging / TF-1 | desconhecido | TF-1 sem assignee |
| Decisão de copy e CTAs | direção (Adriano) | pendente |
| Recorte de Compras | direção + pontos focais | pendente |
| Caminho de deploy | desconhecido | conflito EasyPanel × VPS |
| Rebuild da imagem | desconhecido | bloqueado por F1, F5 |
| Privacidade do formulário | desconhecido | pendente |

---

## 9. Próximos passos recomendados

1. Decisão de copy e CTAs (decisão 1) → aplicar em tarefa separada, com regressão e revisão.
2. Endurecer `.dockerignore` e corrigir o hero do Chip em desktop (F3, F5) → tarefas pequenas, cada uma com teste.
3. Reconstruir a imagem a partir de fonte declarada, com tag e digest novos (F1).
4. Definir o caminho de deploy e o procedimento de rollback (F4).
5. Revisão independente deste pacote por outro worker, antes de qualquer aceite.
6. Só depois, pedir autorização específica para staging privado.

**Não declarado:** site aprovado, pronto para produção, Página de Compras implementada ou TF-1 concluído.
