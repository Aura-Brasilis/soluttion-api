import { UpdateBillingControlUseCase } from '../update-billing-control'
import { PrismaBillingControlRepository } from '@/repositories/prisma/prisma-billing-control-repository'

export function makeUpdateBillingControlUseCase() {
  const billingControlsRepository = new PrismaBillingControlRepository()

  const useCase = new UpdateBillingControlUseCase(billingControlsRepository)

  return useCase
}
