import { BillingControlRepository } from '../repositories/billing-control-repository'
import { BillingControlFoundError } from './errors/billing-control-not-found'

interface CreateBillingControlUseCaseRequest {
  userId: number
}

interface CreateBillingControlUseCaseResponse {
  success: boolean
}

export class CreateBillingControlUseCase {
  constructor(private billingControlRepository: BillingControlRepository) {}

  async execute({
    userId,
  }: CreateBillingControlUseCaseRequest): Promise<CreateBillingControlUseCaseResponse> {
    const billingControls =
      await this.billingControlRepository.findAllByUserId(userId)

    if (!billingControls.length) {
      throw new BillingControlFoundError()
    }

    const success = await this.billingControlRepository.deleteByUserId(userId)

    return { success }
  }
}
