import { Pagination } from '@/@types/pagination'
import { itens_cobranca2 as ItensCobranca2 } from '@prisma/client'

export interface BillingItems2Repository {
  findAll(pagination: Pagination): Promise<{
    data: ItensCobranca2[]
    pagination: Record<string, string | number | boolean> | null
  }>
}
