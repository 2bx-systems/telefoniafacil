# Auditoria visual integral — 2026-11-05

## Estado

Três auditorias visuais independentes foram concluídas em Chromium headless sobre o preview local `http://127.0.0.1:8765`, na branch `feat/homepage-content-v2-draft`, com alterações locais não commitadas. A cobertura soma **28 rotas**, em desktop e mobile, com inventário e avaliação seção por seção em cada relatório.

Os auditores registraram evidências e propostas. Isso **não é aceite de produto**, aprovação de copy, validação legal, autorização para alterar código, nem aprovação de staging ou produção. Os relatórios originais foram preservados sem alterações; nenhum teste, build, commit, push, merge ou deploy foi feito nesta auditoria.

**Atualização posterior:** depois da auditoria, o usuário autorizou uma rodada separada de refinamento local na mesma branch (Run Orca `run_d84b7dbac24b`). Workers Antigravity aplicaram parte das recomendações e as decisões D-06/D-07. Os relatórios abaixo descrevem a versão anterior às correções e ainda **não foram reexecutados para reavaliar o resultado corrigido**. Estado e evidência da implementação: `PROJECT_STATE.md`.

## Relatórios

| Relatório | Cobertura | Resultado resumido |
|---|---|---|
| [Home](home.md) | `/` — cabeçalho, hero, todas as seções e rodapé | Hierarquia e personalidade insuficientes; texto interno de rascunho nas seções 03 e 05; preço ganha mais destaque que o título; falha de fio no mobile; fechamento e prova social frágeis. |
| [Produtos e soluções](products.md) | `/0800/`, `/chip/`, `/empresas/`, `/equipamentos/`, `/integracoes/`, `/m2m/`, `/numero-fixo/`, `/pabx/`, `/planos/`, `/sip-trunk/`, `/telefonia-movel/`, `/ura/` | 29 achados reportados, incluindo card de preço quebrado em cinco rotas, quatro cards vazios em `/pabx/`, páginas com pouca diferenciação e CTAs que precisam de decisão. |
| [Institucionais e conversão](institutional.md) | `/carrinho/`, `/cases/`, `/checkout/`, `/compras/`, `/contato/`, `/conteudos/`, `/contratar/`, `/parceiros/`, `/politica-de-privacidade/`, `/seguranca/`, `/sobre/`, `/solucoes/`, `/suporte/`, `/termos-de-uso/`, `/trabalhe-conosco/` | 34 achados reportados, incluindo colisão entre H1 e foto em `/sobre/`, texto jurídico interno publicado e envio de contato sem requisição, seguido de link `mailto:` pequeno. |

## Prioridades recorrentes nos relatórios

1. Resolver os bloqueios de apresentação que já aparecem no render: preço quebrado em cinco páginas de produto, cards vazios em `/pabx/`, colisão do H1 em `/sobre/` e fio curto no mobile da home.
2. Encaminhar aos owners os textos internos em áreas públicas, páginas legais, preços, status comerciais, CTAs para `/compras/`, conteúdo de cases e função do formulário. Os relatórios não alteram nem aprovam esses itens.
3. Depois das decisões de owners e de correções autorizadas, fazer nova revisão visual integrada: header, rodapé, gutters, CTAs, imagens e tipografia são padrões compartilhados e precisam ser vistos juntos nas 28 rotas.

Os itens acima resumem achados relatados pelos auditores, não constituem autorização de execução. Para evidência, gravidade, exceções, recomendações P0/P1/P2 e limitações, consultar cada relatório completo.

## Revisão posterior da seção 03 — Linha Virtual

Uma revisão pontual após a inclusão de fotografia foi feita pelo Run Orca `run_71effe41210e` (Task `task_16689ff99b10`). O relatório, as capturas e a conferência do coordenador estão em [section-03-photo-review](section-03-photo-review/COORDINATOR-REVIEW.md). A revisão confirmou a aparência sintética dos displays e a imprecisão do alt text; os achados de desequilíbrio e escala da imagem foram limitados por capturas em que a imagem não carregou com `loading="lazy"`.
