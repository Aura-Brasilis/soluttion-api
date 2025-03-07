export interface BillingControlSearch {
  id?: number
  idUsina?: number | null
  idInquilino?: number | null
  contribCusteioIpCip?: number | null
  credAdcBandTarifaria?: number | null
  creditoDebito?: number | null
  economia?: number | null
  kwhAtivo?: number | null
  kwhInjetado?: number | null
  kwhMinimo?: number | null
  leitura1?: string | null
  leitura2?: string | null
  mes?: string | null
  mesRef?: string | null
  minimoInvestidor?: number | null
  observacao?: string | null
  saldoBancoAnterior?: number | null
  saldoBancoAtual?: number | null
  tarifaTeFv?: number | null
  tarifaTusdFv?: number | null
  mesContratoSoluttion?: string | null
}
