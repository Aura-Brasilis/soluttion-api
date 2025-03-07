import { ControleFaturamento } from '@prisma/client'
import { BillingControlRepository } from '../repositories/billing-control-repository'

interface CreateBillingControlUseCaseRequest {
  idUsina: number
  idInquilino: number
  contribCusteioIpCip: number
  credAdcBandTarifaria: number
  creditoDebito: number
  economia: number | null
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
  mesContratoSoluttion: string
}

interface CreateBillingControlUseCaseResponse {
  billingControl: ControleFaturamento
}

export class CreateBillingControlUseCase {
  constructor(private billingControlRepository: BillingControlRepository) {}

  async execute({
    contribCusteioIpCip,
    credAdcBandTarifaria,
    creditoDebito,
    economia,
    idUsina,
    idInquilino,
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
  }: CreateBillingControlUseCaseRequest): Promise<CreateBillingControlUseCaseResponse> {
    const billingControl = await this.billingControlRepository.create({
      id_usina: idUsina,
      id_inquilino: idInquilino,
      contrib_custeio_ip_cip: contribCusteioIpCip,
      cred_adc_band_tarifaria: credAdcBandTarifaria,
      credito_debito: creditoDebito,
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
      economia,
      mes,
      observacao,
    })

    return { billingControl }
  }
}
