import { GetBillingControlUseCase } from '../get-billing-control'
import { PrismaBillingControlRepository } from '@/repositories/prisma/prisma-billing-control-repository'

export function makeGetBillingControlUseCase() {
  const billingControlsRepository = new PrismaBillingControlRepository()

  const useCase = new GetBillingControlUseCase(billingControlsRepository)

  return useCase
}
