import { ControleFaturamento } from '@prisma/client'
import { BillingControlRepository } from '../repositories/billing-control-repository'

interface ListBillingControlByUserUseCaseRequest {
  userId: number
}

interface ListBillingControlByUserUseCaseResponse {
  billingControls: ControleFaturamento[]
}

export class ListBillingControlByUserUseCase {
  constructor(private billingControlRepository: BillingControlRepository) {}

  async execute({
    userId,
  }: ListBillingControlByUserUseCaseRequest): Promise<ListBillingControlByUserUseCaseResponse> {
    const billingControls =
      await this.billingControlRepository.findAllByUserId(userId)

    return { billingControls }
  }
}
