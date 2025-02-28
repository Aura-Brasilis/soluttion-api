import { ControleFaturamento } from '@prisma/client'
import { BillingControlRepository } from '../repositories/billing-control-repository'
import { BillingControlFoundError } from './errors/billing-control-not-found'

interface CreateBillingControlUseCaseRequest {
  data: ControleFaturamento
}

interface CreateBillingControlUseCaseResponse {
  billingControl: ControleFaturamento
}

export class CreateBillingControlUseCase {
  constructor(private billingControlRepository: BillingControlRepository) {}

  async execute({
    data,
  }: CreateBillingControlUseCaseRequest): Promise<CreateBillingControlUseCaseResponse> {
    const billingControl = await this.billingControlRepository.findById(data.id)

    if (!billingControl) {
      throw new BillingControlFoundError()
    }

    const updatedBillingControl =
      await this.billingControlRepository.update(data)

    return { billingControl: updatedBillingControl }
  }
}
