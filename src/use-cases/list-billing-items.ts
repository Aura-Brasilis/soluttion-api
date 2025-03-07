import { itens_cobranca as ItensCobranca } from '@prisma/client'
import { BillingItemsRepository } from '../repositories/billing-items-repository'
import { Pagination } from '@/@types/pagination'

interface ListBillingItemsUseCaseRequest {
  pagination: Pagination
}

interface ListBillingItemsUseCaseResponse {
  billingItems: {
    data: ItensCobranca[]
    pagination: Record<string, string | number | boolean> | null
  }
}

export class ListBillingItemsUseCase {
  constructor(private billingItemsRepository: BillingItemsRepository) {}

  async execute({
    pagination,
  }: ListBillingItemsUseCaseRequest): Promise<ListBillingItemsUseCaseResponse> {
    const billingItems = await this.billingItemsRepository.findAll(pagination)

    return { billingItems }
  }
}
