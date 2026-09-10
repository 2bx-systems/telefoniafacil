# Telefonia Fácil — Site Premium

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

## Dados

Telefones, e-mail e nomes de clientes utilizados no layout foram obtidos do site público da Telefonia Fácil. Não há depoimentos, percentuais comerciais ou preços fictícios. Formulários preparam um e-mail local para envio, pois nenhuma API de CRM foi fornecida.
