import { CreateBillingControlUseCase } from '../create-billing-control'
import { PrismaBillingControlRepository } from '@/repositories/prisma/prisma-billing-control-repository'

export function makeCreateBillingControlUseCase() {
  const billingControlsRepository = new PrismaBillingControlRepository()

  const useCase = new CreateBillingControlUseCase(billingControlsRepository)

  return useCase
}
