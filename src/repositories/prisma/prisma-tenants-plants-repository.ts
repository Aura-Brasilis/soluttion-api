import { prisma } from '@/lib/prisma'
import { TenantsPlantsRepository } from '../tenants-plants-repository'
import { TenantsPlantsSearch } from '@/@types/tenants-plants'

export class PrismaTenantsPlantsRepository implements TenantsPlantsRepository {
  async findAll(search: TenantsPlantsSearch) {
    const filters: Record<string, unknown> = {}
    if (search) {
      Object.entries(search).forEach(([key, value]) => {
        if (value) {
          if (typeof value === 'string') {
            filters[key] = { contains: value, mode: 'insensitive' }
          } else {
            filters[key] = value
          }
        }
      })
    }

    const tenantsPlants = await prisma.inquilinos_usinas.findMany({
      where: filters,
      include: {
        inquilino: true,
        usina: true,
      },
    })

    return tenantsPlants
  }
}
