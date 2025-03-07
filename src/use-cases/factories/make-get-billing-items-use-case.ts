import { GetBillingItemUseCase } from '../get-billing-item'
import { PrismaBillingItemsRepository } from '@/repositories/prisma/prisma-billing-items-repository'

export function makeGetBillingItemUseCase() {
  const billingItemsRepository = new PrismaBillingItemsRepository()

  const useCase = new GetBillingItemUseCase(billingItemsRepository)

  return useCase
}
