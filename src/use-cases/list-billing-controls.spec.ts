import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryBillingControlRepository } from '../repositories/in-memory/in-memory-billing-control-repository'
import { ListBillingControlUseCase } from './list-billing-controls'

let billingControlRepository: InMemoryBillingControlRepository
let sut: ListBillingControlUseCase

describe('List billing controls use case', () => {
  beforeEach(async () => {
    billingControlRepository = new InMemoryBillingControlRepository()
    sut = new ListBillingControlUseCase(billingControlRepository)
  })

  it('should be able to list billing controls', async () => {
    billingControlRepository.items.push({
      id: 1,
      contrib_custeio_ip_cip: null,
      cpfl_inquilino: null,
      cred_adc_band_tarifaria: null,
      credito_debito: null,
      economia: null,
      id_usina: null,
      id_inquilino: null,
      incentivo_inquilino_investidor: null,
      inquilino_pagar: null,
      investidor_receber: null,
      kwh_ativo: null,
      kwh_injetado: null,
      kwh_minimo: null,
      leitura_1: 'test',
      leitura_2: 'test',
      mes: 'test',
      mes_contrato_soluttion: 'test',
      mes_ref: 'test',
      minimo_investidor: null,
      observacao: 'test',
      saldo_banco_anterior: null,
      saldo_banco_atual: null,
      tarifa_te_fv: null,
      tarifa_tusd_fv: null,
      taxa_adm_soluttion: null,
      total_creditado: null,
      total_tarifas_fv: null,
    })

    billingControlRepository.items.push({
      id: 2,
      contrib_custeio_ip_cip: null,
      cpfl_inquilino: null,
      cred_adc_band_tarifaria: null,
      credito_debito: null,
      economia: null,
      id_usina: null,
      id_inquilino: null,
      incentivo_inquilino_investidor: null,
      inquilino_pagar: null,
      investidor_receber: null,
      kwh_ativo: null,
      kwh_injetado: null,
      kwh_minimo: null,
      leitura_1: 'test',
      leitura_2: 'test',
      mes: 'test',
      mes_contrato_soluttion: 'test',
      mes_ref: 'test',
      minimo_investidor: null,
      observacao: 'test',
      saldo_banco_anterior: null,
      saldo_banco_atual: null,
      tarifa_te_fv: null,
      tarifa_tusd_fv: null,
      taxa_adm_soluttion: null,
      total_creditado: null,
      total_tarifas_fv: null,
    })

    const { billingControls } = await sut.execute()

    expect(billingControls).toHaveLength(2)
  })
})
