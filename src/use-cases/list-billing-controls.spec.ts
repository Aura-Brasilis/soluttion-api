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
      cred_adc_band_tarifaria: null,
      credito_debito: null,
      economia: null,
      id_usina: null,
      id_inquilino: null,
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
    })

    billingControlRepository.items.push({
      id: 2,
      contrib_custeio_ip_cip: null,
      cred_adc_band_tarifaria: null,
      credito_debito: null,
      economia: null,
      id_usina: null,
      id_inquilino: null,
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
    })

    const { billingControls } = await sut.execute({
      pagination: { limit: 10, orderBy: '', page: 1, orderColumn: 'id' },
    })

    expect(billingControls.data).toHaveLength(2)
  })

  it('should be able to get paginated billing controls', async () => {
    for (let i = 0; i <= 22; i++) {
      billingControlRepository.items.push({
        id: i,
        contrib_custeio_ip_cip: null,
        cred_adc_band_tarifaria: null,
        credito_debito: null,
        economia: null,
        id_usina: null,
        id_inquilino: null,
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
      })
    }

    const { billingControls } = await sut.execute({
      pagination: { limit: 10, orderBy: '', page: 3, orderColumn: 'id' },
    })

    expect(billingControls.data).toHaveLength(3)
    expect(billingControls.data[2].id).toBe(22)
  })

  it('should be able to get searched billing controls', async () => {
    for (let i = 0; i <= 22; i++) {
      billingControlRepository.items.push({
        id: i,
        contrib_custeio_ip_cip: null,
        cred_adc_band_tarifaria: null,
        credito_debito: null,
        economia: null,
        id_usina: null,
        id_inquilino: null,
        kwh_ativo: null,
        kwh_injetado: null,
        kwh_minimo: null,
        leitura_1: 'test',
        leitura_2: 'test',
        mes: `Test user ${i}`,
        mes_contrato_soluttion: 'test',
        mes_ref: 'test',
        minimo_investidor: null,
        observacao: 'test',
        saldo_banco_anterior: null,
        saldo_banco_atual: null,
        tarifa_te_fv: null,
        tarifa_tusd_fv: null,
      })
    }

    const { billingControls } = await sut.execute({
      pagination: {
        limit: 10,
        orderBy: '',
        orderColumn: 'id',
        page: 1,
        search: {
          mes: 'Test user 2',
          id: 2,
        },
      },
    })

    expect(billingControls.data).toHaveLength(1)
    expect(billingControls.data[0].id).toBe(2)
  })
})
