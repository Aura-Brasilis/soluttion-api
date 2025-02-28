import { BillingControlRepository } from '../repositories/billing-control-repository'
import { BillingControlFoundError } from './errors/billing-control-not-found'

interface CreateBillingControlUseCaseRequest {
  billingControlId: number
}

interface CreateBillingControlUseCaseResponse {
  success: boolean
}

export class CreateBillingControlUseCase {
  constructor(private billingControlRepository: BillingControlRepository) {}

  async execute({
    billingControlId,
  }: CreateBillingControlUseCaseRequest): Promise<CreateBillingControlUseCaseResponse> {
    const billingControl =
      await this.billingControlRepository.findById(billingControlId)

    if (!billingControl) {
      throw new BillingControlFoundError()
    }

    const success = await this.billingControlRepository.delete(billingControlId)

    return { success }
  }
}
