import { inquilinos_usinas as InqulinosUsinas } from '@prisma/client'
import { TenantsPlantsRepository } from '../tenants-plants-repository'
import { TenantsPlantsSearch } from '@/@types/tenants-plants'

export class InMemoryTenantsPlantsRepository
  implements TenantsPlantsRepository
{
  public items: InqulinosUsinas[] = []

  async findAll(search: TenantsPlantsSearch) {
    let filteredTenantsPlants = this.items

    if (search) {
      filteredTenantsPlants = filteredTenantsPlants.filter((user) => {
        return Object.entries(search).every(([key, value]) => {
          if (!value) return true
          const userValue = user[key as keyof InqulinosUsinas]
          return userValue === value
        })
      })
    }

    return filteredTenantsPlants
  }
}
