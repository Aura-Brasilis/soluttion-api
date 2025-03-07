import { faturas_energia as FaturasEnergia } from '@prisma/client'
import { EnergyBillsRepository } from '../repositories/energy-bills-repository'
import { EnergyBillsNotFoundError } from './errors/energy-bills-not-found'

interface GetEnergyBillsUseCaseRequest {
  energyBillsId: bigint
}

interface GetEnergyBillsUseCaseResponse {
  energyBills: FaturasEnergia
}

export class GetEnergyBillsUseCase {
  constructor(private energyBillsRepository: EnergyBillsRepository) {}

  async execute({
    energyBillsId,
  }: GetEnergyBillsUseCaseRequest): Promise<GetEnergyBillsUseCaseResponse> {
    const energyBills = await this.energyBillsRepository.findById(energyBillsId)

    if (!energyBills) {
      throw new EnergyBillsNotFoundError()
    }

    return { energyBills }
  }
}
