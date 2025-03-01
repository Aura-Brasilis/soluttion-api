import { ControleFaturamento } from '@prisma/client'
import { BillingControlRepository } from '../repositories/billing-control-repository'
import { BillingControlFoundError } from './errors/billing-control-not-found'

interface UpdateBillingControlUseCaseRequest {
  data: ControleFaturamento
}

interface UpdateBillingControlUseCaseResponse {
  billingControl: ControleFaturamento
}

export class UpdateBillingControlUseCase {
  constructor(private billingControlRepository: BillingControlRepository) {}

  async execute({
    data,
  }: UpdateBillingControlUseCaseRequest): Promise<UpdateBillingControlUseCaseResponse> {
    const billingControl = await this.billingControlRepository.findById(data.id)

    if (!billingControl) {
      throw new BillingControlFoundError()
    }

    const updatedBillingControl =
      await this.billingControlRepository.update(data)

    return { billingControl: updatedBillingControl }
  }
}
