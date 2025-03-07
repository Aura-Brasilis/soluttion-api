import { historico_consumo as HistoricoConsumo } from '@prisma/client'
import { ConsumptionHistoryRepository } from '../consumption-history-repository'
import { Pagination } from '@/@types/pagination'

export class InMemoryConsumptionHistoryRepository
  implements ConsumptionHistoryRepository
{
  public items: HistoricoConsumo[] = []

  async findById(consumptionHistoryId: bigint) {
    const consumptionHistory = this.items.find(
      (i) => i.id === consumptionHistoryId,
    )

    if (!consumptionHistory) return null

    return consumptionHistory
  }

  async findAll(pagination: Pagination) {
    const { page = 1, limit = 10, search } = pagination

    let filteredConsumptionHistory = this.items

    if (search) {
      filteredConsumptionHistory = filteredConsumptionHistory.filter((user) => {
        return Object.entries(search).every(([key, value]) => {
          if (!value) return true // Ignora campos não preenchidos
          const userValue = user[key as keyof HistoricoConsumo]
          if (typeof userValue === 'string') {
            return userValue.toLowerCase().includes(String(value).toLowerCase())
          }
          return userValue === value
        })
      })
    }

    const total = filteredConsumptionHistory.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = filteredConsumptionHistory.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        hasNextPage: endIndex < total,
        hasPrevPage: startIndex > 0,
      },
    }
  }
}
