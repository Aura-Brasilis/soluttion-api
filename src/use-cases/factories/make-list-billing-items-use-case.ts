import { ListBillingItemsUseCase } from '../list-billing-items'
import { PrismaBillingItemsRepository } from '@/repositories/prisma/prisma-billing-items-repository'

export function makeListBillingItemsUseCase() {
  const billingItemsRepository = new PrismaBillingItemsRepository()

  const useCase = new ListBillingItemsUseCase(billingItemsRepository)

  return useCase
}
