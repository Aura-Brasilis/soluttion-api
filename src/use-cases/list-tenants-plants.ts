import { inquilinos_usinas as InqulinosUsinas } from '@prisma/client'
import { TenantsPlantsRepository } from '../repositories/tenants-plants-repository'
import { TenantsPlantsSearch } from '@/@types/tenants-plants'

interface ListTenantsPlantsUseCaseRequest {
  search: TenantsPlantsSearch
}

interface ListTenantsPlantsUseCaseResponse {
  tenantsPlants: InqulinosUsinas[]
}

export class ListTenantsPlantsUseCase {
  constructor(private TenantsPlantsRepository: TenantsPlantsRepository) {}

  async execute({
    search,
  }: ListTenantsPlantsUseCaseRequest): Promise<ListTenantsPlantsUseCaseResponse> {
    const tenantsPlants = await this.TenantsPlantsRepository.findAll(search)

    return { tenantsPlants }
  }
}
