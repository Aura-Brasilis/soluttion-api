export interface BillingItemsSearch {
  id?: bigint
  fatura_numero?: string
  codigo?: string
  descricao?: string
  quantidade_kwh?: number
  tarifa_com_impostos?: number
  valor?: number
  bandeira?: string
  mes_referencia?: string
  created_at?: string
}
