export interface EnergyBillsSearch {
  id?: bigint
  id_usuario?: number
  id_usina?: number
  empresa_nome?: string
  empresa_endereco?: string
  empresa_cnpj?: string
  fatura_numero?: string
  fatura_serie?: string
  data_emissao?: string
  data_vencimento?: string
  valor_total?: number
  proxima_leitura?: string
  cliente_nome?: string
  cliente_endereco?: string
  cliente_cpf?: string
  cliente_classificacao?: string
  instalacao_numero_contrato?: string
  instalacao_numero_instalacao?: string
  instalacao_numero_medidor?: string
  consumo_mes_referencia?: string
  consumo_total_kwh?: number
  impostos_base_icms?: number
  impostos_pis?: number
  impostos_cofins?: number
  leitura_energia_ativa_atual?: number
  leitura_energia_ativa_anterior?: number
  leitura_energia_ativa_consumo_kwh?: number
  leitura_energia_injetada_atual?: number
  leitura_energia_injetada_anterior?: number
  leitura_energia_injetada_consumo_kwh?: number
  contato_telefone?: string
  contato_site?: string
  porcentagem_contratual?: number
  informacoes_fatura?: string
  pn?: string
  pn_mes?: string
  tipo?: string
  operacao_mes?: string
  created_at?: string
}
