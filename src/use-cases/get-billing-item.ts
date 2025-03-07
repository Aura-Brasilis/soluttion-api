import { itens_cobranca as ItensCobranca } from '@prisma/client'
import { BillingItemsRepository } from '../repositories/billing-items-repository'
import { BillingItemNotFoundError } from './errors/billing-item-not-found'

interface GetBillingItemUseCaseRequest {
  billingItemId: bigint
}

interface GetBillingItemUseCaseResponse {
  billingItem: ItensCobranca
}

export class GetBillingItemUseCase {
  constructor(private billingItemsRepository: BillingItemsRepository) {}

  async execute({
    billingItemId,
  }: GetBillingItemUseCaseRequest): Promise<GetBillingItemUseCaseResponse> {
    const billingItem =
      await this.billingItemsRepository.findById(billingItemId)

    if (!billingItem) {
      throw new BillingItemNotFoundError()
    }

    return { billingItem }
  }
}
