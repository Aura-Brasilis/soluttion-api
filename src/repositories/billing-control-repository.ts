import { Pagination } from '@/@types/pagination'
import { ControleFaturamento, Prisma } from '@prisma/client'

export interface BillingControlRepository {
  create(
    data:
      | {
          id_usina?: number
          id_inquilino?: number
        }
      | Prisma.ControleFaturamentoCreateInput,
  ): Promise<ControleFaturamento>
  findById(billingControlId: number): Promise<ControleFaturamento | null>
  findAll(pagination: Pagination): Promise<{
    data: ControleFaturamento[]
    pagination: Record<string, string | number | boolean> | null
  }>
  update(
    data:
      | {
          id_usina?: number
          id_inquilino?: number
        }
      | Partial<Prisma.ControleFaturamentoCreateInput>,
  ): Promise<ControleFaturamento>
  delete(billingControlId: number): Promise<boolean>
}
