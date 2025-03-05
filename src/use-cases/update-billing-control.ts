import { ControleFaturamento } from '@prisma/client'
import { BillingControlRepository } from '../repositories/billing-control-repository'
import { BillingControlNotFoundError } from './errors/billing-control-not-found'

interface UpdateBillingControlUseCaseRequest {
  data: {
    id: number
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
}

interface UpdateBillingControlUseCaseResponse {
  billingControl: ControleFaturamento
}

export class UpdateBillingControlUseCase {
  constructor(private billingControlRepository: BillingControlRepository) {}

  async execute({
    data,
  }: UpdateBillingControlUseCaseRequest): Promise<UpdateBillingControlUseCaseResponse> {
    const billingControl = await this.billingControlRepository.findById(data.id)

    if (!billingControl) {
      throw new BillingControlNotFoundError()
    }

    const dataToUpdate = {
      id: data.id,
      id_inquilino: data.idInquilino,
      id_usina: data.idUsina,
      contrib_custeio_ip_cip: data.contribCusteioIpCip,
      cred_adc_band_tarifaria: data.credAdcBandTarifaria,
      credito_debito: data.creditoDebito,
      economia: data.economia,
      kwh_ativo: data.kwhAtivo,
      kwh_injetado: data.kwhInjetado,
      kwh_minimo: data.kwhMinimo,
      leitura_1: data.leitura1,
      leitura_2: data.leitura2,
      mes: data.mes,
      mes_contrato_soluttion: data.mesContratoSoluttion,
      mes_ref: data.mesRef,
      minimo_investidor: data.minimoInvestidor,
      observacao: data.observacao,
      saldo_banco_anterior: data.saldoBancoAnterior,
      saldo_banco_atual: data.saldoBancoAtual,
      tarifa_te_fv: data.tarifaTeFv,
      tarifa_tusd_fv: data.tarifaTusdFv,
    }

    const updatedBillingControl =
      await this.billingControlRepository.update(dataToUpdate)

    return { billingControl: updatedBillingControl }
  }
}
