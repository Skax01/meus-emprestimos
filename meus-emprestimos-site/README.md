# Meus Empréstimos

Controle pessoal de empréstimos: parcelas, juros, renovação, quitação, calendário e painel de recebimentos.
É um site estático (um único `index.html`), sem servidor e sem build.

Os dados ficam **no aparelho de cada pessoa** (navegador) e, se você conectar, também em backup no **Google Drive**, na pasta `save Meus Emprestimos`. Nada de dados reais está neste repositório.

## Estrutura

```
index.html              o sistema inteiro (HTML, CSS e JavaScript)
manifest.webmanifest    permite "Adicionar à tela inicial" no celular
icons/                  ícones do app
.nojekyll               evita processamento do Jekyll no GitHub Pages
.gitignore              impede subir backups .json por engano
```



## 1) Ativar o backup no Google Drive

O Google só aceita login em endereços `https`. Faça depois que o site estiver no ar.

1. Acesse https://console.cloud.google.com e crie um projeto.
2. **APIs e serviços → Biblioteca**: ative a **Google Drive API**.
3. **Tela de consentimento OAuth**: tipo **Externo**; preencha nome do app e e-mail; em **Escopos**, adicione `.../auth/drive.file`.
   - Em modo **Teste**, adicione como *usuários de teste* os e-mails que vão usar.
   - Para o login não expirar a cada 7 dias, publique o app em **produção**. (O escopo `drive.file` não costuma exigir verificação. Confira na tela do Google.)
4. **Credenciais → Criar credenciais → ID do cliente OAuth → Aplicativo da Web**.
   - Em **Origens JavaScript autorizadas**, adicione o endereço **sem barra no final e sem caminho**:
     - Netlify: `https://NOME.netlify.app`
     - GitHub Pages: `https://USUARIO.github.io`
   - Pode adicionar os dois no mesmo ID do cliente.
5. Copie o **ID do cliente** (termina com `.apps.googleusercontent.com`) e use **uma** das opções:
   - cole no próprio app, em **Clientes → Backup → Google Drive → ID do cliente** (precisa repetir em cada aparelho); ou
   - escreva uma vez no `index.html`, na linha `var GCID="";`, e publique de novo (vale para todos os aparelhos).
6. Toque em **Conectar ao Google Drive**. O sistema cria a pasta `save Meus Emprestimos` e grava o backup a cada alteração.

O ID do cliente **não é segredo**, pode ficar no código.

