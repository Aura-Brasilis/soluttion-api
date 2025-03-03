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

# Rotas
## Users (Usuários)
- POST /users/create (cria um usuário)
```
payload:
{
  idUsuario: string,
  cpfCnpj: string,
  email: string,
  nome: string,
  investimento: number,
  responsavel: string,
  tipo: string,
  razaoSocial: string,
  telefone: string,
  cep: string,
}
```
- PUT /users/update (faz atualização de um usuário, todos os campos são opicionais com exceção do "id")
```
payload:
{
  id: number,
  idUsuario?: string,
  cpfCnpj?: string,
  email?: string,
  nome?: string,
  investimento?: number,
  responsavel?: string,
  tipo?: string,
  razaoSocial?: string,
  telefone?: string,
  cep?: string,
}
```
- GET /users/get/:userId (busca um usuário)
- GET /users/list (busca todos os usuários registrados)
- DELETE /users/remove/:userId (deleta um usuário)

## Billing controls (Controle faturamento)
- POST /billing-controls/create (cria um controle de faturamento)
```
payload:
{
    idUsina: number,
    idInquilino: number,
    contribCusteioIpCip: number,
    cpflInquilino?: number | null,
    credAdcBandTarifaria: number,
    creditoDebito: number,
    economia?: number | null,
    incentivoInquilinoInvestidor?: number | null,
    inquilinoPagar?: number | null,
    investidorReceber?: number | null,
    kwhAtivo?: number | null,
    kwhInjetado: number,
    kwhMinimo: number,
    leitura1?: string | null,
    leitura2?: string | null,
    mes: string,
    mesRef?: string | null,
    minimoInvestidor: number,
    observacao?: string | null,
    saldoBancoAnterior: number,
    saldoBancoAtual?: number | null,
    tarifaTeFv: number,
    tarifaTusdFv: number,
    taxaAdmSoluttion?: number | null,
    totalCreditado?: number | null,
    totalTarifasFv: number,
    mesContratoSoluttion: string
}
```
- PUT /billing-controls/update (faz atualização de um controle de faturamento, todos os campos são opicionais com exceção do "id")
```
payload:
{
    id: number,
    idUsina?: number,
    idInquilino?: number,
    contribCusteioIpCip?: number,
    cpflInquilino?: number | null,
    credAdcBandTarifaria?: number,
    creditoDebito?: number,
    economia?: number | null,
    incentivoInquilinoInvestidor?: number | null,
    inquilinoPagar?: number | null,
    investidorReceber?: number | null,
    kwhAtivo?: number | null,
    kwhInjetado?: number,
    kwhMinimo?: number,
    leitura1?: string | null,
    leitura2?: string | null,
    mes?: string,
    mesRef?: string | null,
    minimoInvestidor?: number,
    observacao?: string | null,
    saldoBancoAnterior?: number,
    saldoBancoAtual?: number | null,
    tarifaTeFv?: number,
    tarifaTusdFv?: number,
    taxaAdmSoluttion?: number | null,
    totalCreditado?: number | null,
    totalTarifasFv?: number,
    mesContratoSoluttion?: string
}
```
- GET /billing-controls/get/:billingControlId (busca um controle de faturamento)
- GET /billing-controls/list (busca todos os controles de faturamentos registrados)
- DELETE /billing-controls/remove/:billingControlId (deleta um controle de faturamento)
