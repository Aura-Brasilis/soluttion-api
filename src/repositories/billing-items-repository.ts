import { Pagination } from '@/@types/pagination'
import { itens_cobranca as ItensCobranca } from '@prisma/client'

export interface BillingItemsRepository {
  findById(billingItemsId: bigint): Promise<ItensCobranca | null>
  findAll(pagination: Pagination): Promise<{
    data: ItensCobranca[]
    pagination: Record<string, string | number | boolean> | null
  }>
}
