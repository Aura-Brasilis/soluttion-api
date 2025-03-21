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
- GET /users/list (busca todos os usuários registrados)
```
query params:
{
    page?: number,
    limit?: number,
    orderBy?: string,
    orderColumn?: string,
    search?: {
        id?: number,
        id_usuario?: string,
        cpf_cnpj?: string,
        email?: string,
        nome?: string,
        investimento?: number,
        responsavel?: string,
        tipo?: string,
        razao_social?: string,
        telefone?: string,
        cep?: string,
    }
}
```
- GET /users/get/:userId (busca um usuário)
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
- GET /billing-controls/list (busca todos os controles de faturamentos registrados)
```
query params:
{
    page?: number,
    limit?: number,
    orderBy?: string,
    orderColumn?: string,
    search?: {
        id?: number,
        id_usina?: number,
        id_inquilino?: number,
        contrib_custeio_ip_cip?: number,
        cpfl_inquilino?: number | null,
        cred_adc_band_tarifaria?: number,
        credito_debito?: number,
        economia?: number | null,
        incentivo_inquilino_investidor?: number | null,
        inquilino_pagar?: number | null,
        investidor_receber?: number | null,
        kwh_ativo?: number | null,
        kwh_injetado?: number,
        kwh_minimo?: number,
        leitura_1?: string | null,
        leitura_2?: string | null,
        mes?: string,
        mes_ref?: string | null,
        minimo_investidor?: number,
        observacao?: string | null,
        saldo_banco_anterior?: number,
        saldo_banco_atual?: number | null,
        tarifa_te_fv?: number,
        tarifa_tusd_fv?: number,
        taxa_adm_soluttion?: number | null,
        total_creditado?: number | null,
        total_tarifas_fv?: number,
        mes_contrato_soluttion?: string   
    }
}
```
- GET /billing-controls/get/:billingControlId (busca um controle de faturamento)
- DELETE /billing-controls/remove/:billingControlId (deleta um controle de faturamento)

## Energy bills (Faturas energia)
- GET /energy-bills/list (busca todas as faturas de energia registradas)
```
  query params:
  {
    page?: number,
    limit?: number,
    orderBy?: string,
    orderColumn?: string,
    search?: {
        id?: bigint,
        id_usuario?: int,
        id_usina?: int,
        empresa_nome?: string,
        empresa_endereco?: string,
        empresa_cnpj?: string,
        fatura_numero?: string,
        fatura_serie?: string,
        data_emissao?: string,
        data_vencimento?: string,
        valor_total?: number,
        proxima_leitura?: string,
        cliente_nome?: string,
        cliente_endereco?: string,
        cliente_cpf?: string,
        cliente_classificacao?: string,
        instalacao_numero_contrato?: string,
        instalacao_numero_instalacao?: string,
        instalacao_numero_medidor?: string,
        consumo_mes_referencia?: string,
        consumo_total_kwh?: number,
        impostos_base_icms?: number,
        impostos_pis?: number,
        impostos_cofins?: number,
        leitura_energia_ativa_atual?: number,
        leitura_energia_ativa_anterior?: number,
        leitura_energia_ativa_consumo_kwh?: number,
        leitura_energia_injetada_atual?: number,
        leitura_energia_injetada_anterior?: number,
        leitura_energia_injetada_consumo_kwh?: number,
        contato_telefone?: string,
        contato_site?: string,
        porcentagem_contratual?: number,
        informacoes_fatura?: string,
        pn?: string,
        pn_mes?: string,
        tipo?: string,
        created_at?: string
    }
}
```
- GET /energy-bills/get/:energyBillId (busca uma fatura de energia)

## Consumption history (Histórico de consumo)
- GET /consumption-history/list (busca todos os históricos de consumo registrados)
```
  query params:
  {
    page?: number,
    limit?: number,
    orderBy?: string,
    orderColumn?: string,
    search?: {
      id?: bigint,
      fatura_numero?: string,
      mes?: string,
      consumo_kwh?: number,
      dias?: number,
      created_at?: string
    }
}
```
- GET /consumption-history/get/:consumptionHistoryId (busca um histórico de consumo)

## Billing items (Itens cobrança)
- GET /billing-items/list (busca todos os itens de cobrança registrados)
```
  query params:
  {
    page?: number,
    limit?: number,
    orderBy?: string,
    orderColumn?: string,
    search?: {
      id?: bigint,
      fatura_numero?: string,
      codigo?: string,
      descricao?: string,
      quantidade_kwh?: number,
      tarifa_com_impostos?: number,
      valor?: number,
      bandeira?: string,
      mes_referencia?: string,
      created_at?: string
    }
}
```
- GET /billing-items/get/:billingItemId (busca um item de cobrança)

# API no Postman

Para acessar as requisições da API diretamente no Postman, clique no link abaixo:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/join-team?invite_code=bde8fee7f88e7f12aaa0924d3cebbbbedba9921a75748bdda6ec645012d7b26d&target_code=f80b4e90d6f41ffc1766e51e7d4eccf1)
