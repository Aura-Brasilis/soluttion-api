import { prisma } from '@/lib/prisma'
import { BillingItemsRepository } from '../billing-items-repository'
import { Pagination } from '@/@types/pagination'

export class PrismaBillingItemsRepository implements BillingItemsRepository {
  async findById(billingItemId: bigint) {
    const billingItem = await prisma.itens_cobranca.findUnique({
      include: {
        faturas_energia: true,
      },
      where: {
        id: billingItemId,
      },
    })

    if (!billingItem) {
      return null
    }

    return billingItem
  }

  async findAll(pagination: Pagination) {
    const { page, limit, search, orderBy, orderColumn } = pagination

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

    const total = await prisma.itens_cobranca.count({ where: filters })

    const skip = (page - 1) * limit

    const orderConfig = orderColumn ? { [orderColumn]: orderBy } : undefined

    const billingItems = await prisma.itens_cobranca.findMany({
      where: filters,
      include: {
        faturas_energia: true,
      },
      skip,
      take: limit,
      orderBy: orderConfig,
    })

    return {
      data: billingItems,
      pagination: {
        page,
        limit,
        total,
        hasNextPage: skip + limit < total,
        hasPrevPage: skip > 0,
      },
    }
  }
}
