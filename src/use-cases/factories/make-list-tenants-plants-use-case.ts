import { ListTenantsPlantsUseCase } from '../list-tenants-plants'
import { PrismaTenantsPlantsRepository } from '@/repositories/prisma/prisma-tenants-plants-repository'

export function makeListTenantsPlantsUseCase() {
  const tenantsPlantsRepository = new PrismaTenantsPlantsRepository()

  const useCase = new ListTenantsPlantsUseCase(tenantsPlantsRepository)

  return useCase
}
