import { ControleFaturamento } from '@prisma/client'
import { BillingControlRepository } from '../repositories/billing-control-repository'

interface CreateBillingControlUseCaseRequest {
  idUsina: number
  idInquilino: number
  contribCusteioIpCip: number
  cpflInquilino: number | null
  credAdcBandTarifaria: number
  creditoDebito: number
  economia: number | null
  incentivoInquilinoInvestidor: number | null
  inquilinoPagar: number | null
  investidorReceber: number | null
  kwhAtivo: number | null
  kwhInjetado: number
  kwhMinimo: number
  leitura1: string | null
  leitura2: string | null
  mes: string
  mesRef: string | null
  minimoInvestidor: number
  observacao: string | null
  saldoBancoAnterior: number
  saldoBancoAtual: number | null
  tarifaTeFv: number
  tarifaTusdFv: number
  taxaAdmSoluttion: number | null
  totalCreditado: number | null
  totalTarifasFv: number
  mesContratoSoluttion: string
}

interface CreateBillingControlUseCaseResponse {
  billingControl: ControleFaturamento
}

export class CreateBillingControlUseCase {
  constructor(private billingControlRepository: BillingControlRepository) {}

  async execute({
    contribCusteioIpCip,
    cpflInquilino,
    credAdcBandTarifaria,
    creditoDebito,
    economia,
    idUsina,
    idInquilino,
    incentivoInquilinoInvestidor,
    inquilinoPagar,
    investidorReceber,
    kwhAtivo,
    kwhInjetado,
    kwhMinimo,
    leitura1,
    leitura2,
    mes,
    mesContratoSoluttion,
    mesRef,
    minimoInvestidor,
    observacao,
    saldoBancoAnterior,
    saldoBancoAtual,
    tarifaTeFv,
    tarifaTusdFv,
    taxaAdmSoluttion,
    totalCreditado,
    totalTarifasFv,
  }: CreateBillingControlUseCaseRequest): Promise<CreateBillingControlUseCaseResponse> {
    const billingControl = await this.billingControlRepository.create({
      id_usina: idUsina,
      id_inquilino: idInquilino,
      contrib_custeio_ip_cip: contribCusteioIpCip,
      cpfl_inquilino: cpflInquilino,
      cred_adc_band_tarifaria: credAdcBandTarifaria,
      credito_debito: creditoDebito,
      incentivo_inquilino_investidor: incentivoInquilinoInvestidor,
      inquilino_pagar: inquilinoPagar,
      investidor_receber: investidorReceber,
      kwh_ativo: kwhAtivo,
      kwh_injetado: kwhInjetado,
      kwh_minimo: kwhMinimo,
      leitura_1: leitura1,
      leitura_2: leitura2,
      mes_contrato_soluttion: mesContratoSoluttion,
      mes_ref: mesRef,
      minimo_investidor: minimoInvestidor,
      saldo_banco_anterior: saldoBancoAnterior,
      saldo_banco_atual: saldoBancoAtual,
      tarifa_te_fv: tarifaTeFv,
      tarifa_tusd_fv: tarifaTusdFv,
      taxa_adm_soluttion: taxaAdmSoluttion,
      total_creditado: totalCreditado,
      total_tarifas_fv: totalTarifasFv,
      economia,
      mes,
      observacao,
    })

    return { billingControl }
  }
}
