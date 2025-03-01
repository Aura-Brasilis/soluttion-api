import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryBillingControlRepository } from '../repositories/in-memory/in-memory-billing-control-repository'
import { GetBillingControlUseCase } from './get-billing-control'
import { BillingControlFoundError } from './errors/billing-control-not-found'

let billingControlRepository: InMemoryBillingControlRepository
let sut: GetBillingControlUseCase

describe('Get billing controls use case', () => {
  beforeEach(async () => {
    billingControlRepository = new InMemoryBillingControlRepository()
    sut = new GetBillingControlUseCase(billingControlRepository)
  })

  it('should be able to get a billing control', async () => {
    const billingControlId = 1

    billingControlRepository.items.push({
      id: billingControlId,
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

    const { billingControl } = await sut.execute({ billingControlId: 1 })

    expect(billingControl.id).toBe(1)
  })

  it('should throw when get invalid billing control', async () => {
    const billingControlId = 1
    const notRegisteredBillingControlId = 2

    billingControlRepository.items.push({
      id: billingControlId,
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

    await expect(() =>
      sut.execute({
        billingControlId: notRegisteredBillingControlId,
      }),
    ).rejects.toBeInstanceOf(BillingControlFoundError)
  })
})
