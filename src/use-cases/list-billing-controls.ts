import { ControleFaturamento } from '@prisma/client'
import { BillingControlRepository } from '../repositories/billing-control-repository'
import { Pagination } from '@/@types/pagination'

interface ListBillingControlUseCaseRequest {
  pagination: Pagination
}

interface ListBillingControlUseCaseResponse {
  billingControls: {
    data: ControleFaturamento[]
    pagination: Record<string, string | number | boolean> | null
  }
}

export class ListBillingControlUseCase {
  constructor(private billingControlRepository: BillingControlRepository) {}

  async execute({
    pagination,
  }: ListBillingControlUseCaseRequest): Promise<ListBillingControlUseCaseResponse> {
    const billingControls =
      await this.billingControlRepository.findAll(pagination)

    return { billingControls }
  }
}
