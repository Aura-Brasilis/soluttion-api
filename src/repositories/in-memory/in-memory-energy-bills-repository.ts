import { faturas_energia as FaturasEnergia } from '@prisma/client'
import { EnergyBillsRepository } from '../energy-bills-repository'
import { Pagination } from '@/@types/pagination'

export class InMemoryEnergyBillsRepository implements EnergyBillsRepository {
  public items: FaturasEnergia[] = []

  async findById(energyBillsId: bigint) {
    const energyBills = this.items.find((i) => i.id === energyBillsId)

    if (!energyBills) return null

    return energyBills
  }

  async findAll(pagination: Pagination) {
    const { page = 1, limit = 10, search } = pagination

    let filteredEnergyBills = this.items

    if (search) {
      filteredEnergyBills = filteredEnergyBills.filter((user) => {
        return Object.entries(search).every(([key, value]) => {
          if (!value) return true
          const userValue = user[key as keyof FaturasEnergia]
          if (typeof userValue === 'string') {
            return userValue.toLowerCase().includes(String(value).toLowerCase())
          }
          return userValue === value
        })
      })
    }

    const total = filteredEnergyBills.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = filteredEnergyBills.slice(startIndex, endIndex)

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
