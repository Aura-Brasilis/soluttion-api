import { ControleFaturamento } from '@prisma/client'
import { BillingControlRepository } from '../billing-control-repository'
import { randomInt } from 'node:crypto'

export class InMemoryBillingControlRepository
  implements BillingControlRepository
{
  public items: ControleFaturamento[] = []

  async create(data: ControleFaturamento) {
    const billingControl: ControleFaturamento = {
      id: randomInt(999999),
      id_usuario: data.id_usuario,
      contrib_custeio_ip_cip: data.contrib_custeio_ip_cip,
      cpfl_inquilino: data.cpfl_inquilino,
      cred_adc_band_tarifaria: data.cred_adc_band_tarifaria,
      credito_debito: data.credito_debito,
      economia: data.economia,
      incentivo_inquilino_investidor: data.incentivo_inquilino_investidor,
      inquilino_pagar: data.inquilino_pagar,
      investidor_receber: data.investidor_receber,
      kwh_ativo: data.kwh_ativo,
      kwh_injectado: data.kwh_injectado,
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
      tarifa_tusd: data.tarifa_tusd,
      taxa_adm_soluttion: data.taxa_adm_soluttion,
      total_creditado: data.total_creditado,
      total_tarifas_fv: data.total_tarifas_fv,
      mes_contrato_soluttion: data.mes_contrato_soluttion,
    }

    this.items.push(billingControl)

    return billingControl
  }

  async findById(id: number) {
    const billingControl = this.items.find((i) => i.id === id)

    if (!billingControl) return null

    return billingControl
  }

  async findAllByUserId(userId: number) {
    const billingControl = this.items.filter((i) => i.id_usuario === userId)

    return billingControl
  }

  async findAll() {
    return this.items
  }

  async update(data: ControleFaturamento) {
    const billingControlIndex = this.items.findIndex((c) => c.id === data.id)

    if (billingControlIndex >= 0) {
      this.items[billingControlIndex] = { ...data }
    }

    return this.items[billingControlIndex]
  }

  async deleteByUserId(userId: number) {
    const founded = this.items.find((i) => i.id_usuario === userId)

    if (!founded) return false

    this.items = this.items.filter((i) => i.id_usuario !== userId)

    return true
  }

  async delete(id: number) {
    const indexFinded = this.items.findIndex((i) => i.id === id)

    if (indexFinded === -1) {
      return false
    }

    this.items.splice(indexFinded, 1)

    return true
  }
}
