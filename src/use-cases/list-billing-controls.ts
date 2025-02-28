import { ControleFaturamento } from '@prisma/client'
import { BillingControlRepository } from '../repositories/billing-control-repository'

interface ListBillingControlUseCaseResponse {
  billingControls: ControleFaturamento[]
}

export class ListBillingControlUseCase {
  constructor(private billingControlRepository: BillingControlRepository) {}

  async execute(): Promise<ListBillingControlUseCaseResponse> {
    const billingControls = await this.billingControlRepository.findAll()

    return { billingControls }
  }
}
