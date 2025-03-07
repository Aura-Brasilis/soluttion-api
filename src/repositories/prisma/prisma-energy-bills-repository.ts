import { prisma } from '@/lib/prisma'
import { EnergyBillsRepository } from '../energy-bills-repository'
import { Pagination } from '@/@types/pagination'

export class PrismaEnergyBillsRepository implements EnergyBillsRepository {
  async findById(energyBillsId: bigint) {
    const energyBills = await prisma.faturas_energia.findUnique({
      include: {
        historico_consumo: true,
        itens_cobranca: true,
      },
      where: {
        id: energyBillsId,
      },
    })

    if (!energyBills) {
      return null
    }

    return energyBills
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

    const total = await prisma.faturas_energia.count({ where: filters })

    const skip = (page - 1) * limit

    const orderConfig = orderColumn ? { [orderColumn]: orderBy } : undefined

    const energyBills = await prisma.faturas_energia.findMany({
      where: filters,
      include: {
        historico_consumo: true,
        itens_cobranca: true,
      },
      skip,
      take: limit,
      orderBy: orderConfig,
    })

    return {
      data: energyBills,
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
