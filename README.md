# Meus Empréstimos

Controle pessoal de empréstimos: parcelas, juros, renovação, quitação, calendário e painel de recebimentos.
É um site estático (um único `index.html`), sem servidor e sem build.

Os dados ficam **no aparelho de cada pessoa** (navegador) e, se você conectar, também em backup no **Google Drive**, na pasta `save Meus Emprestimos`. Nada de dados reais está neste repositório.

## Estrutura

```
index.html              o sistema inteiro (HTML, CSS e JavaScript)
manifest.webmanifest    permite "Adicionar à tela inicial" no celular
icons/                  ícones do app
netlify.toml            configuração do Netlify (opcional)
.nojekyll               evita processamento do Jekyll no GitHub Pages
.gitignore              impede subir backups .json por engano
```

## 1) Publicar no Netlify (mais simples)

1. Crie uma conta em https://app.netlify.com (gratuita).
2. Em **Add new site → Deploy manually**, arraste a **pasta descompactada** `meus-emprestimos-site`.
3. Em **Site configuration → Change site name**, escolha um nome. O endereço será `https://NOME.netlify.app`.
4. Para atualizar depois: **Deploys → Drag and drop** com a pasta nova.

## 2) Ativar o backup no Google Drive

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

## 3) Publicar no GitHub Pages (alternativa)

O GitHub Pages gratuito exige repositório **público**. Como aqui só há o código, sem dados, isso não expõe empréstimos.

1. Crie um repositório público, por exemplo `meus-emprestimos`.
2. Envie o conteúdo desta pasta (pelo site, com **Add file → Upload files**, ou por Git):
   ```
   git init
   git add .
   git commit -m "Primeira versão"
   git branch -M main
   git remote add origin https://github.com/USUARIO/meus-emprestimos.git
   git push -u origin main
   ```
3. Em **Settings → Pages**: *Source* = **Deploy from a branch**, branch **main**, pasta **/ (root)**.
4. O endereço será `https://USUARIO.github.io/meus-emprestimos/`.
   - Na origem autorizada do Google use só `https://USUARIO.github.io`.

## Cuidados

- **Nunca suba backups.** Arquivos `meus-emprestimos-*.json` têm os dados reais. O `.gitignore` bloqueia `*.json`.
- **Cada endereço tem seu próprio armazenamento.** Ao trocar de endereço (por exemplo, de Netlify para GitHub), os dados não vão junto. Use **Exportar backup** e **Importar backup**, ou **Restaurar do Drive**.
- **iPhone:** o Safari e o app da tela inicial não compartilham dados. Escolha um e use sempre o mesmo.
- Escolha **um** endereço principal para o uso diário e mantenha o outro apenas como reserva.
