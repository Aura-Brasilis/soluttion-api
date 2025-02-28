import { ControleFaturamento } from '@prisma/client'
import { BillingControlRepository } from '../repositories/billing-control-repository'

interface CreateBillingControlUseCaseRequest {
  idUsuario: number
  contribCusteioIpCip: number
  cpflInquilino: number
  credAdcBandTarifaria: number
  creditoDebito: number
  economia: number
  incentivoInquilinoInvestidor: number
  inquilinoPagar: number
  investidorReceber: number
  kwhAtivo: number
  kwhInjectado: number
  kwhMinimo: number
  leitura1: string
  leitura2: string
  mes: string
  mesRef: string
  minimoInvestidor: number
  observacao: string
  saldoBancoAnterior: number
  saldoBancoAtual: number
  tarifaTeFv: number
  tarifaTusd: number
  taxaAdmSoluttion: number
  totalCreditado: number
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
    idUsuario,
    incentivoInquilinoInvestidor,
    inquilinoPagar,
    investidorReceber,
    kwhAtivo,
    kwhInjectado,
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
    tarifaTusd,
    taxaAdmSoluttion,
    totalCreditado,
    totalTarifasFv,
  }: CreateBillingControlUseCaseRequest): Promise<CreateBillingControlUseCaseResponse> {
    const billingControl = await this.billingControlRepository.create({
      id_usuario: idUsuario,
      contrib_custeio_ip_cip: contribCusteioIpCip,
      cpfl_inquilino: cpflInquilino,
      cred_adc_band_tarifaria: credAdcBandTarifaria,
      credito_debito: creditoDebito,
      incentivo_inquilino_investidor: incentivoInquilinoInvestidor,
      inquilino_pagar: inquilinoPagar,
      investidor_receber: investidorReceber,
      kwh_ativo: kwhAtivo,
      kwh_injectado: kwhInjectado,
      kwh_minimo: kwhMinimo,
      leitura_1: leitura1,
      leitura_2: leitura2,
      mes_contrato_soluttion: mesContratoSoluttion,
      mes_ref: mesRef,
      minimo_investidor: minimoInvestidor,
      saldo_banco_anterior: saldoBancoAnterior,
      saldo_banco_atual: saldoBancoAtual,
      tarifa_te_fv: tarifaTeFv,
      tarifa_tusd: tarifaTusd,
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
