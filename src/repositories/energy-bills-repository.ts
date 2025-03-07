import { Pagination } from '@/@types/pagination'
import { faturas_energia as FaturasEnergia } from '@prisma/client'

export interface EnergyBillsRepository {
  findById(energyBillsId: bigint): Promise<FaturasEnergia | null>
  findAll(pagination: Pagination): Promise<{
    data: FaturasEnergia[]
    pagination: Record<string, string | number | boolean> | null
  }>
}
