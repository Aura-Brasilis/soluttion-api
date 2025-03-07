import { historico_consumo as HistoricoConsumo } from '@prisma/client'
import { ConsumptionHistoryRepository } from '../repositories/consumption-history-repository'
import { ConsumptionHistoryNotFoundError } from './errors/consumption-history-not-found'

interface GetConsumptionHistoryUseCaseRequest {
  consumptionHistoryId: bigint
}

interface GetConsumptionHistoryUseCaseResponse {
  consumptionHistory: HistoricoConsumo
}

export class GetConsumptionHistoryUseCase {
  constructor(
    private consumptionHistoryRepository: ConsumptionHistoryRepository,
  ) {}

  async execute({
    consumptionHistoryId,
  }: GetConsumptionHistoryUseCaseRequest): Promise<GetConsumptionHistoryUseCaseResponse> {
    const consumptionHistory =
      await this.consumptionHistoryRepository.findById(consumptionHistoryId)

    if (!consumptionHistory) {
      throw new ConsumptionHistoryNotFoundError()
    }

    return { consumptionHistory }
  }
}
