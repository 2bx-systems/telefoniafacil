# Auditoria de planos e preços oficiais

Consulta realizada em 10/09/2026 usando as páginas públicas e o catálogo ativo consumido pelo site antigo `telefoniafacil.com.br`.

## Planos ativos

### Número Fixo

| Plano | Mensalidade | Características publicadas |
|---|---:|---|
| Básico 1 | R$ 39,99 | Até 5 ramais; ligações ilimitadas; suporte por e-mail; gravação de chamadas |
| Plus Ilimitado | R$ 59,90 | 1 número virtual; 1 chamada simultânea; ilimitado fixo e móvel; integração WhatsApp |

### Número 0800

| Plano | Mensalidade | Franquia | Fixo Brasil | Móvel Brasil |
|---|---:|---:|---:|---:|
| Linha 0800 + Franquia R$ 50 | R$ 99,90 | R$ 50,00 | R$ 0,16/min | R$ 0,30/min |
| Linha 0800 + Franquia R$ 100 | R$ 149,90 | R$ 100,00 | R$ 0,15/min | R$ 0,26/min |
| Linha 0800 + Franquia R$ 200 | R$ 249,90 | R$ 200,00 | R$ 0,14/min | R$ 0,24/min |
| Linha 0800 + Franquia R$ 300 | R$ 349,90 | R$ 300,00 | R$ 0,12/min | R$ 0,22/min |
| Linha 0800 + Franquia R$ 400 | R$ 400,00 | O cadastro informa R$ 300,00 | R$ 0,12/min | R$ 0,22/min |

O último plano contém uma divergência no próprio catálogo antigo: o nome menciona franquia de R$ 400, mas a característica cadastrada informa franquia de R$ 300 e linha grátis. O novo site preserva a informação publicada sem tentar corrigi-la por suposição.

### SIP Trunk

| Plano | Base mensal | Capacidade | Canal adicional |
|---|---:|---:|---:|
| Plano SIPTrunk | R$ 59,90 | mínimo de 2 e máximo de 30 canais | R$ 79,90 por canal acima dos 2 iniciais |

O cálculo correto é `R$ 59,90 + (canais - 2) × R$ 79,90`.

### Telefonia Empresarial — categoria geral

| Plano | Mensalidade | Situação |
|---|---:|---|
| Empresarial | R$ 399,90 | Ativo, categoria geral; não pertence ao catálogo PABX |

### Youse Colaborativo

| Plano | Mensalidade | Situação |
|---|---:|---|
| Starter | R$ 89,90 | Ativo |
| Enterprise | R$ 399,90 | Ativo e personalizado |

### Soluções sem preço ativo publicado

- PABX em Nuvem: a página consulta a categoria `PABX - Omnichannel`, mas não há plano ativo nessa categoria.
- Telefonia Móvel B2B: não há categoria de plano corporativo ativa. Os preços de 5 GB a 30 GB pertencem ao portal B2C Telefonia Fácil Chip.
- M2M / IoT: sem plano ativo publicado no catálogo B2B.
- URA Personalizada: sem plano ativo publicado no catálogo B2B.

Essas soluções devem aparecer como “sob consulta”.

## Equipamentos para locação

| Equipamento | 12 meses | 24 meses | 36 meses | 48 meses |
|---|---:|---:|---:|---:|
| Fanvil V61G | R$ 52,16 | R$ 28,93 | R$ 21,67 | R$ 18,16 |
| Fanvil V66 Pro | R$ 234,26 | R$ 129,95 | R$ 97,33 | R$ 81,56 |
| Fanvil V50P | R$ 36,19 | R$ 20,08 | R$ 15,04 | R$ 12,60 |
| Fanvil X6U V2 | R$ 152,76 | R$ 84,73 | R$ 63,47 | R$ 53,19 |
| Fanvil X210 V2 | R$ 250,66 | R$ 139,05 | R$ 104,15 | R$ 87,28 |
| Fanvil X303P | R$ 44,45 | R$ 24,66 | R$ 18,47 | R$ 15,48 |
| Fanvil H2U | R$ 27,30 | R$ 15,14 | R$ 11,34 | R$ 9,51 |
| Fanvil W610W | R$ 85,54 | R$ 47,45 | R$ 35,54 | R$ 29,78 |
| Fanvil V62 Pro | R$ 97,31 | R$ 53,98 | R$ 40,43 | R$ 33,88 |
| Headset Fanvil HT301-U | R$ 27,30 | R$ 15,14 | R$ 11,34 | R$ 9,51 |
| Headset Intelbras WHS 80 BT | R$ 131,61 | R$ 73,01 | R$ 54,68 | R$ 45,82 |
| Intelbras ATA 400 | R$ 100,68 | R$ 55,85 | R$ 41,83 | R$ 35,05 |

## Correções aplicadas no novo site

- Removido o plano geral Empresarial de R$ 399,90 da página de PABX.
- Telefonia Móvel corporativa passou a “sob consulta”; os planos B2C continuam apenas em `/chip/`.
- Corrigido o cálculo de canais do SIP Trunk.
- Catálogo de locação ampliado de 6 para 12 produtos.
- Preço de locação agora varia conforme 12, 24, 36 ou 48 meses e quantidade.
- Upsells indicam que o valor mostrado corresponde ao contrato de 12 meses.

## Fontes públicas

- https://www.telefoniafacil.com.br/sitemap.xml
- https://www.telefoniafacil.com.br/pabx
- https://www.telefoniafacil.com.br/numero-fixo
- https://www.telefoniafacil.com.br/numero-0800
- https://www.telefoniafacil.com.br/e1-sip-trunk
- https://www.telefoniafacil.com.br/locacao
- Catálogo público `projetotf_planos` e `projetotf_produtos` consumido pelo frontend do portal antigo.
