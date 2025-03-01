import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryBillingControlRepository } from '../repositories/in-memory/in-memory-billing-control-repository'
import { CreateBillingControlUseCase } from './create-billing-control'

let billingControlRepository: InMemoryBillingControlRepository
let sut: CreateBillingControlUseCase

describe('Create billing controls use case', () => {
  beforeEach(async () => {
    billingControlRepository = new InMemoryBillingControlRepository()
    sut = new CreateBillingControlUseCase(billingControlRepository)
  })

  it('should be able to create a new billing control', async () => {
    const { billingControl } = await sut.execute({
      contribCusteioIpCip: 1,
      cpflInquilino: 1,
      credAdcBandTarifaria: 1,
      creditoDebito: 1,
      economia: 1,
      idUsina: 1,
      idInquilino: 1,
      incentivoInquilinoInvestidor: 1,
      inquilinoPagar: 1,
      investidorReceber: 1,
      kwhAtivo: 1,
      kwhInjetado: 1,
      kwhMinimo: 1,
      leitura1: 'test',
      leitura2: 'test',
      mes: 'test',
      mesContratoSoluttion: 'test',
      mesRef: 'test',
      minimoInvestidor: 0,
      observacao: 'test',
      saldoBancoAnterior: 0,
      saldoBancoAtual: 0,
      tarifaTeFv: 0,
      tarifaTusdFv: 0,
      taxaAdmSoluttion: 0,
      totalCreditado: 0,
      totalTarifasFv: 0,
    })

    expect(billingControl.id).toEqual(expect.any(Number))
  })
})
