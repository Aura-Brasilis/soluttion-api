import { PrismaConsumptionHistoryRepository } from '@/repositories/prisma/prisma-consumption-history-repository'
import { GetConsumptionHistoryUseCase } from '../get-consumption-history'

export function makeGetConsumptionHistoryUseCase() {
  const consumptionHistoryRepository = new PrismaConsumptionHistoryRepository()

  const useCase = new GetConsumptionHistoryUseCase(consumptionHistoryRepository)

  return useCase
}
