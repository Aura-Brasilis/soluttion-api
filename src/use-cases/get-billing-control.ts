import { ControleFaturamento } from '@prisma/client'
import { BillingControlRepository } from '../repositories/billing-control-repository'
import { BillingControlFoundError } from './errors/billing-control-not-found'

interface GetBillingControlUseCaseRequest {
  billingControlId: number
}

interface GetBillingControlUseCaseResponse {
  billingControl: ControleFaturamento
}

export class GetBillingControlUseCase {
  constructor(private billingControlRepository: BillingControlRepository) {}

  async execute({
    billingControlId,
  }: GetBillingControlUseCaseRequest): Promise<GetBillingControlUseCaseResponse> {
    const billingControl =
      await this.billingControlRepository.findById(billingControlId)

    if (!billingControl) {
      throw new BillingControlFoundError()
    }

    return { billingControl }
  }
}
