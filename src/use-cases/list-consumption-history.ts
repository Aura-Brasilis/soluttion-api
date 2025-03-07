import { historico_consumo as HistoricoConsumo } from '@prisma/client'
import { ConsumptionHistoryRepository } from '../repositories/consumption-history-repository'
import { Pagination } from '@/@types/pagination'

interface ListConsumptionHistoryUseCaseRequest {
  pagination: Pagination
}

interface ListConsumptionHistoryUseCaseResponse {
  consumptionHistories: {
    data: HistoricoConsumo[]
    pagination: Record<string, string | number | boolean> | null
  }
}

export class ListConsumptionHistoryUseCase {
  constructor(
    private consumptionHistoryRepository: ConsumptionHistoryRepository,
  ) {}

  async execute({
    pagination,
  }: ListConsumptionHistoryUseCaseRequest): Promise<ListConsumptionHistoryUseCaseResponse> {
    const consumptionHistories =
      await this.consumptionHistoryRepository.findAll(pagination)

    return { consumptionHistories }
  }
}
