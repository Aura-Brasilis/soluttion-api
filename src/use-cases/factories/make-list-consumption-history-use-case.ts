import { PrismaConsumptionHistoryRepository } from '@/repositories/prisma/prisma-consumption-history-repository'
import { ListConsumptionHistoryUseCase } from '../list-consumption-history'

export function makeListConsumptionHistoryUseCase() {
  const consumptionHistoryRepository = new PrismaConsumptionHistoryRepository()

  const useCase = new ListConsumptionHistoryUseCase(
    consumptionHistoryRepository,
  )

  return useCase
}
