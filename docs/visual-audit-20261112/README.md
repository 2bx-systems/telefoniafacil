# Auditoria visual de todas as páginas — 2026-11-12

**Projeto:** Site Institucional Telefonia Fácil<br>
**Branch observada:** `feat/homepage-content-v2-draft`<br>
**Estado:** auditoria visual local concluída; nenhuma correção de produto aplicada.<br>
**Próxima ação:** priorizar e corrigir os achados visuais confirmados em uma etapa separada.

> As capturas e os achados abaixo registram o estado **antes** do refinamento feito após a auditoria. O resultado posterior de `/solucoes/` está em [`after/`](after/).

## Escopo e método

Foram percorridas as 28 rotas HTML encontradas no repositório, em Chromium headless servido localmente, nas larguras de 1440 px e 390 px. O script esperou fontes, carregamento e decodificação de imagens, removeu animações/revelações para capturar as páginas inteiras e registrou dimensões, títulos, seções, cards, URLs e estados das imagens em [`inventory.json`](inventory.json). Há 56 screenshots em tamanho completo, com compressão JPEG para facilitar a consulta.

A inspeção é uma fotografia do estado local e não equivale à validação em produção, a aceite de conteúdo nem a teste funcional. Diferenças de cards foram tratadas como suspeitas e conferidas visualmente; layouts editoriais com cartões destacados/abrangendo colunas não foram automaticamente classificados como defeito.

## Resultado geral

- **28/28 rotas** capturadas em desktop e mobile (56 screenshots).
- **0 imagens quebradas** e **0 imagens ainda pendentes** no DOM nas duas larguras; cada viewport encontrou 136 elementos `<img>`.
- **0 casos de overflow horizontal** a 390 px.
- **0 imagens sem texto alternativo** nas imagens examinadas.
- Portanto, não encontrei evidência de arquivo de imagem referenciado que esteja falhando. Há blocos sem fotografia em algumas páginas; isso é uma decisão/aparência editorial, não uma falha técnica de carregamento. O caso mais perceptível é o painel destacado de PABX em Conteúdos, que usa fundo escuro e ícone em vez de foto. Confirmar com o responsável se esse painel é intencional antes de tratar como imagem ausente.

## Achados priorizados

### P1 — uniformizar altura e alinhamento dos planos de Chip no mobile

Em `/chip/`, os quatro cartões do grupo de planos medem de 350 a 424 px (diferença de 74 px) na captura mobile. Os benefícios variam por pacote e empurram títulos, listas e CTAs para alturas distintas; o conjunto fica visualmente irregular e o CTA não ocupa uma linha comum. Também há slides do carrossel com diferença de 46 px, que pode alterar a altura percebida ao navegar. Recomendo alinhar a estrutura interna (área de nome/preço, lista flexível e CTA ancorado no rodapé) e decidir se o carrossel deve reservar altura estável. Validar sem remover diferenças reais entre os pacotes.

Captura: [Chip — mobile](screenshots/mobile/chip-mobile.jpg) · [desktop](screenshots/desktop/chip-desktop.jpg).

### P1 — revisar a linguagem visual do grid de Soluções

Em `/solucoes/`, cards da mesma família combinam composição horizontal e vertical, cards com foto em coluna e cards com foto no topo, além de áreas de texto de tamanhos distintos. As diferenças parecem parte do mosaico editorial e não são uma imagem quebrada, mas o ritmo do grid oscila: os dois últimos cards têm 272 px de altura, enquanto os anteriores chegam a 340 px; alguns cards compartilham altura por spans e outros não. Vale definir explicitamente dois formatos (destaque e padrão), padronizar proporção de foto, altura de texto e posição do botão por formato, e revisar o encaixe das linhas. Evitar uniformizar o cartão destaque se isso destruir a hierarquia pretendida.

Captura: [Soluções — desktop](screenshots/desktop/solucoes-desktop.jpg) · [mobile](screenshots/mobile/solucoes-mobile.jpg).

### P2 — revisar equilíbrio dos cartões de equipamentos e catálogo de planos

Em `/equipamentos/` e na seção de equipamentos de `/planos/`, os 11 cartões usam o mesmo estilo, mas a altura varia entre 629–650 px no desktop e 617–638 px no mobile. A diferença é pequena (21–27 px) e corresponde a conteúdo com quantidades/linhas diferentes; não parece quebra estrutural. Ainda assim, alinhar a área de especificações e prender o CTA na base deixaria o catálogo mais deliberado. Uma regra comum ajudaria a impedir que futuras descrições ampliem a variação.

Capturas: [Equipamentos — desktop](screenshots/desktop/equipamentos-desktop.jpg) · [mobile](screenshots/mobile/equipamentos-mobile.jpg) · [Planos — desktop](screenshots/desktop/planos-desktop.jpg) · [mobile](screenshots/mobile/planos-mobile.jpg).

### P3 — conferir o bloco editorial de Conteúdos como decisão, não como asset quebrado

O destaque de PABX em `/conteudos/` tem cerca de 705 px, enquanto os três itens laterais têm 235 px. Visualmente, funciona como destaque editorial proposital e foi mantido fora da lista de defeitos. O painel principal é escuro e iconográfico, sem foto; caso se espere uma imagem editorial nessa área, é um espaço de direção de arte a preencher, não uma imagem quebrada detectada pelo navegador.

Captura: [Conteúdos — desktop](screenshots/desktop/conteudos-desktop.jpg) · [mobile](screenshots/mobile/conteudos-mobile.jpg).

## Variações observadas que parecem intencionais

- `/empresas/`: três cartões de tamanhos distintos partem de alturas diferentes, mas alinham a base; aparentam progressão visual por perfil de empresa.
- `/conteudos/`: cartão principal destacado contrasta com itens compactos laterais por hierarquia editorial.
- Grade de valores/produtos da home e grupos de benefícios têm variações pequenas de altura por quantidade de texto; nenhuma indica overflow ou falha de renderização.
- Outros cartões de contato, suporte, segurança e benefícios têm diferenças de 20–26 px por quebra de linha/texto. As capturas não indicam falha de layout; revisar apenas se o critério visual desejado for bordas e CTAs perfeitamente nivelados.

## Capturas por rota

| Rota | Desktop | Mobile |
|---|---|---|
| `/0800/` | [Desktop](screenshots/desktop/0800-desktop.jpg) | [Mobile](screenshots/mobile/0800-mobile.jpg) |
| `/carrinho/` | [Desktop](screenshots/desktop/carrinho-desktop.jpg) | [Mobile](screenshots/mobile/carrinho-mobile.jpg) |
| `/cases/` | [Desktop](screenshots/desktop/cases-desktop.jpg) | [Mobile](screenshots/mobile/cases-mobile.jpg) |
| `/checkout/` | [Desktop](screenshots/desktop/checkout-desktop.jpg) | [Mobile](screenshots/mobile/checkout-mobile.jpg) |
| `/chip/` | [Desktop](screenshots/desktop/chip-desktop.jpg) | [Mobile](screenshots/mobile/chip-mobile.jpg) |
| `/compras/` | [Desktop](screenshots/desktop/compras-desktop.jpg) | [Mobile](screenshots/mobile/compras-mobile.jpg) |
| `/contato/` | [Desktop](screenshots/desktop/contato-desktop.jpg) | [Mobile](screenshots/mobile/contato-mobile.jpg) |
| `/conteudos/` | [Desktop](screenshots/desktop/conteudos-desktop.jpg) | [Mobile](screenshots/mobile/conteudos-mobile.jpg) |
| `/contratar/` | [Desktop](screenshots/desktop/contratar-desktop.jpg) | [Mobile](screenshots/mobile/contratar-mobile.jpg) |
| `/empresas/` | [Desktop](screenshots/desktop/empresas-desktop.jpg) | [Mobile](screenshots/mobile/empresas-mobile.jpg) |
| `/equipamentos/` | [Desktop](screenshots/desktop/equipamentos-desktop.jpg) | [Mobile](screenshots/mobile/equipamentos-mobile.jpg) |
| `/` | [Desktop](screenshots/desktop/home-desktop.jpg) | [Mobile](screenshots/mobile/home-mobile.jpg) |
| `/integracoes/` | [Desktop](screenshots/desktop/integracoes-desktop.jpg) | [Mobile](screenshots/mobile/integracoes-mobile.jpg) |
| `/m2m/` | [Desktop](screenshots/desktop/m2m-desktop.jpg) | [Mobile](screenshots/mobile/m2m-mobile.jpg) |
| `/numero-fixo/` | [Desktop](screenshots/desktop/numero-fixo-desktop.jpg) | [Mobile](screenshots/mobile/numero-fixo-mobile.jpg) |
| `/pabx/` | [Desktop](screenshots/desktop/pabx-desktop.jpg) | [Mobile](screenshots/mobile/pabx-mobile.jpg) |
| `/parceiros/` | [Desktop](screenshots/desktop/parceiros-desktop.jpg) | [Mobile](screenshots/mobile/parceiros-mobile.jpg) |
| `/planos/` | [Desktop](screenshots/desktop/planos-desktop.jpg) | [Mobile](screenshots/mobile/planos-mobile.jpg) |
| `/politica-de-privacidade/` | [Desktop](screenshots/desktop/politica-de-privacidade-desktop.jpg) | [Mobile](screenshots/mobile/politica-de-privacidade-mobile.jpg) |
| `/seguranca/` | [Desktop](screenshots/desktop/seguranca-desktop.jpg) | [Mobile](screenshots/mobile/seguranca-mobile.jpg) |
| `/sip-trunk/` | [Desktop](screenshots/desktop/sip-trunk-desktop.jpg) | [Mobile](screenshots/mobile/sip-trunk-mobile.jpg) |
| `/sobre/` | [Desktop](screenshots/desktop/sobre-desktop.jpg) | [Mobile](screenshots/mobile/sobre-mobile.jpg) |
| `/solucoes/` | [Desktop](screenshots/desktop/solucoes-desktop.jpg) | [Mobile](screenshots/mobile/solucoes-mobile.jpg) |
| `/suporte/` | [Desktop](screenshots/desktop/suporte-desktop.jpg) | [Mobile](screenshots/mobile/suporte-mobile.jpg) |
| `/telefonia-movel/` | [Desktop](screenshots/desktop/telefonia-movel-desktop.jpg) | [Mobile](screenshots/mobile/telefonia-movel-mobile.jpg) |
| `/termos-de-uso/` | [Desktop](screenshots/desktop/termos-de-uso-desktop.jpg) | [Mobile](screenshots/mobile/termos-de-uso-mobile.jpg) |
| `/trabalhe-conosco/` | [Desktop](screenshots/desktop/trabalhe-conosco-desktop.jpg) | [Mobile](screenshots/mobile/trabalhe-conosco-mobile.jpg) |
| `/ura/` | [Desktop](screenshots/desktop/ura-desktop.jpg) | [Mobile](screenshots/mobile/ura-mobile.jpg) |

## Próxima etapa sugerida

1. Ajustar os cartões de planos de Chip e medir novamente a regularidade do carrossel no mobile.
2. **Concluído nesta rodada:** padronizar os oito cards de Soluções em uma composição vertical, com mídia, badge, área textual e CTA alinhados.
3. Reavaliar os cartões do catálogo após esses ajustes e alinhar CTAs na base se isso não ocultar diferenças relevantes de conteúdo.
4. Confirmar com direção de arte se Conteúdos deve ter uma fotografia no destaque de PABX; nenhuma imagem ausente por erro de carregamento foi confirmada nesta auditoria.
5. As capturas posteriores de Soluções foram refeitas. Os outros achados seguem pendentes de priorização. Nenhuma publicação foi realizada ou autorizada.

## Correção aplicada após a auditoria — seção Soluções

Os oito cards agora usam a mesma estrutura vertical em desktop, tablet e mobile. A grade apresenta quatro colunas em desktop, duas em tablet e uma em telas estreitas; imagem, badge e botão mantêm medidas/alinhamentos comuns, e o texto reserva espaço previsível para títulos e descrições. Isso remove a alternância entre cards verticais e horizontais que aparecia no recorte da auditoria.

**Verificação visual local:** em 1440 px os oito cartões mediram 356 px, com imagens de 164 px; em 390 px mediram 388 px, com imagens de 190 px. Em ambos, o CTA ficou 19 px acima da base e as imagens carregaram. Capturas depois da alteração: [desktop](after/solutions-desktop.jpg) · [mobile](after/solutions-mobile.jpg). Sem testes, build, commit, PR ou deploy nesta etapa.

## Remoção de seções de clientes — Sobre e Soluções

A pedido do usuário, removi a seção de logotipos de clientes da página Soluções e o bloco equivalente injetado na página Sobre. Também retirei os estilos CSS que ficaram sem uso para os logos da página Sobre. Os dados/artefatos compartilhados continuam disponíveis para outras páginas que os utilizam.

**Verificado no preview local** em desktop e mobile: as duas rotas não contêm bloco de clientes, galeria de logos nem imagens de logos dentro do conteúdo principal; overflow horizontal não foi observado. Capturas: [Sobre desktop](after/sobre-desktop-no-clients.jpg) · [Sobre mobile](after/sobre-mobile-no-clients.jpg) · [Soluções desktop](after/solucoes-desktop-no-clients.jpg) · [Soluções mobile](after/solucoes-mobile-no-clients.jpg). Nenhuma outra página foi alterada por esta solicitação.
