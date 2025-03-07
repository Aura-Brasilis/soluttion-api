import { faturas_energia as FaturasEnergia } from '@prisma/client'
import { EnergyBillsRepository } from '../repositories/energy-bills-repository'
import { Pagination } from '@/@types/pagination'

interface ListEnergyBillsUseCaseRequest {
  pagination: Pagination
}

interface ListEnergyBillsUseCaseResponse {
  energyBills: {
    data: FaturasEnergia[]
    pagination: Record<string, string | number | boolean> | null
  }
}

export class ListEnergyBillsUseCase {
  constructor(private energyBillsRepository: EnergyBillsRepository) {}

  async execute({
    pagination,
  }: ListEnergyBillsUseCaseRequest): Promise<ListEnergyBillsUseCaseResponse> {
    const energyBills = await this.energyBillsRepository.findAll(pagination)

    return { energyBills }
  }
}
