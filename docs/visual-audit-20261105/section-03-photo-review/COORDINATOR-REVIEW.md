# Conferência da auditoria da seção 03

**Run Orca:** `run_71effe41210e`<br>
**Task:** `task_16689ff99b10`<br>
**Dispatch:** `ctx_66222ad1bd35`<br>
**Branch:** `feat/homepage-content-v2-draft`

O relatório do worker foi preservado sem edição em `auditoria-visual-secao03.md`, junto de capturas do worker e da conferência do preview local.

## Resultado da conferência

- **Confirmado:** os displays de chamada nos dois dispositivos repetem a mesma UI genérica e os botões de encerrar chamada em vermelho se destacam da paleta. São sinais concretos que sustentam a crítica de aparência gerada; a conclusão de que todo visitante reconhecerá IA continua sendo uma leitura subjetiva. `coordinator-desktop-image-loaded.png` e `coordinator-mobile-image-loaded.png` mostram a composição real carregada.
- **Confirmado:** o alt text atual tem a expressão confusa “telefone no celular”; a recomendação do auditor é mais precisa.
- **Parcialmente subjetivo:** a fotografia é escura contra o fundo branco e tem borda sem arredondamento. Isso foi observado, mas a classificação como “buraco visual” não é objetiva nem consenso de identidade.
- **Não confirmado na composição real:** a alegação de desequilíbrio vertical severo e a descrição da foto como pequena no mobile estão limitadas por falha de captura. As capturas de página inteira do worker (`worker-desktop-full-image-not-loaded.png`, `worker-mobile-full-image-not-loaded.png`) mostram a seção sem a imagem lazy-loaded. No preview Orca, após rolar até a seção, a imagem carrega: 546 × 273 px no desktop e 364 × 182 px no mobile, sem overflow horizontal. A captura mobile carregada mostra a fotografia antes da descrição/lista, em sequência contínua. Portanto, P2/P4/P6 precisam de nova avaliação a partir de captura carregada antes de orientar mudanças de grid ou remoção mobile.
- **Leitura de composição:** na captura desktop carregada, o fim da imagem e o CTA da coluna direita ficam em alturas próximas; a evidência não sustenta “desequilíbrio severo”. A orientação top-aligned do título e parágrafo pode ser intencional e requer decisão de direção de arte, não é erro funcional evidente.

## Próximo refinamento sugerido

1. Primeiro trocar a imagem por fotografia de origem/licença verificável, sem UI inventada nos displays; a imagem atual é sintética e o auditor detectou detalhes formulaicos.
2. Ajustar o alt text para descrever celular e laptop de forma direta.
3. Só depois reavaliar tratamento de borda, crop e proporção em desktop e mobile com lazy-load efetivamente acionado. Não mudar grid, esconder a imagem no mobile nem remover conteúdo com base nas capturas sem imagem.

Esta conferência não implementou correções, não executou testes ou build e não representa aprovação de marca, asset ou publicação.

## Correções aplicadas após autorização do usuário

- A imagem sintética foi substituída por fotografia de Kaboompics obtida via Pexels, com fonte/licença registradas em `assets/images/home/ASSETS.md`. O uso é ilustrativo e não associa a pessoa a cliente ou endosso.
- Alt text corrigido para descrever celular e laptop sem a redundância apontada.
- Aplicada borda sutil e raio de 8 px; o enquadramento desktop permanece 2:1. No mobile, a imagem passa a proporção 3:2 para maior presença. A estrutura das colunas e o texto comercial não mudaram.
- Permanecem não adotadas as propostas de refazer o grid desktop e ocultar a imagem no mobile, pois a auditoria não mediu isso com imagem carregada.
- A fotografia escolhida é Kaboompics via Pexels, com licença e origem registradas em `assets/images/home/ASSETS.md`; o recorte foi ajustado para manter a profissional e o laptop legíveis em um frame mobile 3:2.
