import { TenantsPlantsSearch } from '@/@types/tenants-plants'
import { inquilinos_usinas as InqulinosUsinas } from '@prisma/client'

export interface TenantsPlantsRepository {
  findAll(search: TenantsPlantsSearch): Promise<InqulinosUsinas[]>
}
