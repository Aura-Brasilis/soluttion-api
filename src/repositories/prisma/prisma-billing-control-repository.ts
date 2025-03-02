import { Prisma, ControleFaturamento } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { BillingControlRepository } from '../billing-control-repository'

export class PrismaBillingControlRepository
  implements BillingControlRepository
{
  async create(data: Prisma.ControleFaturamentoCreateInput) {
    const billingControl = await prisma.controleFaturamento.create({
      data,
    })

    return billingControl
  }

  async findById(billingControlId: number) {
    const billingControl = await prisma.controleFaturamento.findUnique({
      where: {
        id: billingControlId,
      },
    })

    return billingControl
  }

  async findAll() {
    const billingControls = await prisma.controleFaturamento.findMany()

    return billingControls
  }

  async update(data: ControleFaturamento) {
    const dataToUpdate = {
      id_inquilino: data.id_inquilino,
      id_usina: data.id_usina,
      contrib_custeio_ip_cip: data.contrib_custeio_ip_cip,
      cpfl_inquilino: data.cpfl_inquilino,
      cred_adc_band_tarifaria: data.cred_adc_band_tarifaria,
      credito_debito: data.credito_debito,
      economia: data.economia,
      incentivo_inquilino_investidor: data.incentivo_inquilino_investidor,
      inquilino_pagar: data.inquilino_pagar,
      investidor_receber: data.investidor_receber,
      kwh_ativo: data.kwh_ativo,
      kwh_injetado: data.kwh_injetado,
      kwh_minimo: data.kwh_minimo,
      leitura_1: data.leitura_1,
      leitura_2: data.leitura_2,
      mes: data.mes,
      mes_ref: data.mes_ref,
      minimo_investidor: data.minimo_investidor,
      observacao: data.observacao,
      saldo_banco_anterior: data.saldo_banco_anterior,
      saldo_banco_atual: data.saldo_banco_atual,
      tarifa_te_fv: data.tarifa_te_fv,
      tarifa_tusd_fv: data.tarifa_tusd_fv,
      taxa_adm_soluttion: data.taxa_adm_soluttion,
      total_creditado: data.total_creditado,
      total_tarifas_fv: data.total_tarifas_fv,
      mes_contrato_soluttion: data.mes_contrato_soluttion,
    }

    const billingControl = await prisma.controleFaturamento.update({
      where: {
        id: data.id,
      },
      data: dataToUpdate,
    })

    return billingControl
  }

  async delete(billingControlId: number) {
    const billingControl = await prisma.controleFaturamento.findUnique({
      where: { id: billingControlId },
    })

    if (!billingControl) return false

    await prisma.controleFaturamento.delete({ where: { id: billingControlId } })

    return true
  }
}
