import { prisma } from '@/lib/prisma'
import { BillingItems2Repository } from '../billing-items-2-repository'
import { Pagination } from '@/@types/pagination'

export class PrismaBillingItems2Repository implements BillingItems2Repository {
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

    const billingItems = await prisma.itens_cobranca2.findMany({
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
