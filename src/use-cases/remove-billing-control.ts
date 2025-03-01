import { BillingControlRepository } from '../repositories/billing-control-repository'
import { BillingControlFoundError } from './errors/billing-control-not-found'

interface RemoveBillingControlUseCaseRequest {
  billingControlId: number
}

interface RemoveBillingControlUseCaseResponse {
  success: boolean
}

export class RemoveBillingControlUseCase {
  constructor(private billingControlRepository: BillingControlRepository) {}

  async execute({
    billingControlId,
  }: RemoveBillingControlUseCaseRequest): Promise<RemoveBillingControlUseCaseResponse> {
    const billingControl =
      await this.billingControlRepository.findById(billingControlId)

    if (!billingControl) {
      throw new BillingControlFoundError()
    }

    const success = await this.billingControlRepository.delete(billingControlId)

    return { success }
  }
}
