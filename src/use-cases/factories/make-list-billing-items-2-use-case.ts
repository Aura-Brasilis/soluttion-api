import { ListBillingItems2UseCase } from '../list-billing-items-2'
import { PrismaBillingItems2Repository } from '@/repositories/prisma/prisma-billing-items-2-repository'

export function makeListBillingItems2UseCase() {
  const billingItemsRepository = new PrismaBillingItems2Repository()

  const useCase = new ListBillingItems2UseCase(billingItemsRepository)

  return useCase
}
