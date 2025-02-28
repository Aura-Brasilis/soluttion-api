# Passo a passo para execução do projeto
- Já dentro do projeto, execute npm install pra instalar as dependências
- Configure as váriaveis de ambiente criando um arquivo ".env" na raíz do projeto e coloca as váriaveis de acordo com o arquivo ".env.example"
- Execute npx prisma generate, para atualizar as tipagens do Prisma (se for necessário)
- Execute npm run test, garanta que todos os testes passem
- Para iniciar o projeto em ambiente de desenvolvimento, execute npm run dev

# Comandos úteis
- npm run build -> Cria uma build da aplicação na raiz do projeto
- npm run lint -> Passa o eslint na pasta src inteira de acordo com a configuração do arquivo .eslintrc.json
- npm run start -> Inicia a API pela pasta "build" que o comando "npm run build" gera
- npm run dev -> Inicia a API em ambiente de desenvolvimento
- npm run test -> Executa os testes dos use cases do projeto
