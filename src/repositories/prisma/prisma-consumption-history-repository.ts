import { prisma } from '@/lib/prisma'
import { ConsumptionHistoryRepository } from '../consumption-history-repository'
import { Pagination } from '@/@types/pagination'

export class PrismaConsumptionHistoryRepository
  implements ConsumptionHistoryRepository
{
  async findById(consumptionHistoryId: bigint) {
    const consumptionHistory = await prisma.historico_consumo.findUnique({
      include: {
        faturas_energia: true,
      },
      where: {
        id: consumptionHistoryId,
      },
    })

    if (!consumptionHistory) {
      return null
    }

    return consumptionHistory
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

    const total = await prisma.historico_consumo.count({ where: filters })

    const skip = (page - 1) * limit

    const orderConfig = orderColumn ? { [orderColumn]: orderBy } : undefined

    const consumptionHistories = await prisma.historico_consumo.findMany({
      where: filters,
      include: {
        faturas_energia: true,
      },
      skip,
      take: limit,
      orderBy: orderConfig,
    })

    return {
      data: consumptionHistories,
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
