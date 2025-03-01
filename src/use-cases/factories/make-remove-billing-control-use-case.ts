import { RemoveBillingControlUseCase } from '../remove-billing-control'
import { PrismaBillingControlRepository } from '@/repositories/prisma/prisma-billing-control-repository'

export function makeRemoveBillingControlUseCase() {
  const billingControlsRepository = new PrismaBillingControlRepository()

  const useCase = new RemoveBillingControlUseCase(billingControlsRepository)

  return useCase
}
