import { ListEnergyBillsUseCase } from '../list-energy-bills'
import { PrismaEnergyBillsRepository } from '@/repositories/prisma/prisma-energy-bills-repository'

export function makeListEnergyBillsUseCase() {
  const energyBillsRepository = new PrismaEnergyBillsRepository()

  const useCase = new ListEnergyBillsUseCase(energyBillsRepository)

  return useCase
}
