import { itens_cobranca as ItensCobranca } from '@prisma/client'
import { BillingItemsRepository } from '../billing-items-repository'
import { Pagination } from '@/@types/pagination'

export class InMemoryBillingItemsRepository implements BillingItemsRepository {
  public items: ItensCobranca[] = []

  async findById(billingItemsId: bigint) {
    const billingItem = this.items.find((i) => i.id === billingItemsId)

    if (!billingItem) return null

    return billingItem
  }

  async findAll(pagination: Pagination) {
    const { page = 1, limit = 10, search } = pagination

    let filteredBillingItems = this.items

    if (search) {
      filteredBillingItems = filteredBillingItems.filter((user) => {
        return Object.entries(search).every(([key, value]) => {
          if (!value) return true
          const userValue = user[key as keyof ItensCobranca]
          if (typeof userValue === 'string') {
            return userValue.toLowerCase().includes(String(value).toLowerCase())
          }
          return userValue === value
        })
      })
    }

    const total = filteredBillingItems.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = filteredBillingItems.slice(startIndex, endIndex)

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
