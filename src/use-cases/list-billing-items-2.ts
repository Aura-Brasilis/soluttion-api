import { itens_cobranca2 as ItensCobranca2 } from '@prisma/client'
import { BillingItems2Repository } from '../repositories/billing-items-2-repository'
import { Pagination } from '@/@types/pagination'

interface ListBillingItems2UseCaseRequest {
  pagination: Pagination
}

interface ListBillingItems2UseCaseResponse {
  billingItems2: {
    data: ItensCobranca2[]
    pagination: Record<string, string | number | boolean> | null
  }
}

export class ListBillingItems2UseCase {
  constructor(private billingItems2Repository: BillingItems2Repository) {}

  async execute({
    pagination,
  }: ListBillingItems2UseCaseRequest): Promise<ListBillingItems2UseCaseResponse> {
    const billingItems2 = await this.billingItems2Repository.findAll(pagination)

    return { billingItems2 }
  }
}
