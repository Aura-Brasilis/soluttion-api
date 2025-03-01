import { ListBillingControlUseCase } from '../list-billing-controls'
import { PrismaBillingControlRepository } from '@/repositories/prisma/prisma-billing-control-repository'

export function makeListBillingControlUseCase() {
  const billingControlsRepository = new PrismaBillingControlRepository()

  const useCase = new ListBillingControlUseCase(billingControlsRepository)

  return useCase
}
