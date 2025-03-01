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
  findAllByUserId(userId: number): Promise<ControleFaturamento[]>
  findAll(): Promise<ControleFaturamento[]>
  update(
    data:
      | {
          id_usina?: number
          id_inquilino?: number
        }
      | Partial<Prisma.ControleFaturamentoCreateInput>,
  ): Promise<ControleFaturamento>
  delete(billingControlId: number): Promise<boolean>
  deleteByUserId(userId: number): Promise<boolean>
}
