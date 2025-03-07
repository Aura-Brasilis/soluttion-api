import { Pagination } from '@/@types/pagination'
import { historico_consumo as HistoricoConsumo } from '@prisma/client'

export interface ConsumptionHistoryRepository {
  findById(consumptionHistoryId: bigint): Promise<HistoricoConsumo | null>
  findAll(pagination: Pagination): Promise<{
    data: HistoricoConsumo[]
    pagination: Record<string, string | number | boolean> | null
  }>
}
