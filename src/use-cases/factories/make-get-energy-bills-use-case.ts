import { GetEnergyBillsUseCase } from '../get-energy-bills'
import { PrismaEnergyBillsRepository } from '@/repositories/prisma/prisma-energy-bills-repository'

export function makeGetEnergyBillsUseCase() {
  const energyBillsRepository = new PrismaEnergyBillsRepository()

  const useCase = new GetEnergyBillsUseCase(energyBillsRepository)

  return useCase
}
