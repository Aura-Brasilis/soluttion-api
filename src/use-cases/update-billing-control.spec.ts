import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryBillingControlRepository } from '../repositories/in-memory/in-memory-billing-control-repository'
import { UpdateBillingControlUseCase } from './update-billing-control'
import { BillingControlFoundError } from './errors/billing-control-not-found'

let billingControlRepository: InMemoryBillingControlRepository
let sut: UpdateBillingControlUseCase

describe('Update billing controls use case', () => {
  beforeEach(async () => {
    billingControlRepository = new InMemoryBillingControlRepository()
    sut = new UpdateBillingControlUseCase(billingControlRepository)
  })

  it('should be able to update a billing control', async () => {
    const billingControlId = 1
    const mes = 'Test mes'
    const observacaoUpdate = 'Test observacao'

    const data = {
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
      mes,
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
    }

    billingControlRepository.items.push(data)

    const { billingControl } = await sut.execute({
      data: {
        ...data,
        observacao: observacaoUpdate,
      },
    })

    expect(billingControl.id).toBe(1)
    expect(billingControl.observacao).toBe(observacaoUpdate)
    expect(billingControl.mes).toBe(mes)
  })

  it('should not be able to update not found billing control', async () => {
    const billingControlId = 1
    const notRegisteredBillingControlId = 2
    const mes = 'Test mes'

    const dataToCreate = {
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
      mes,
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
    }

    const dataToUpdate = {
      id: notRegisteredBillingControlId,
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
      mes,
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
    }

    billingControlRepository.items.push(dataToCreate)

    await expect(() =>
      sut.execute({
        data: dataToUpdate,
      }),
    ).rejects.toBeInstanceOf(BillingControlFoundError)
  })
})
