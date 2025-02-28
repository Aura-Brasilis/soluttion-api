import { ControleFaturamento, Prisma } from '@prisma/client'

export interface BillingControlRepository {
  create(
    data:
      | {
          id_usuario?: number
        }
      | Prisma.ControleFaturamentoCreateInput,
  ): Promise<ControleFaturamento>
  findById(billingControlId: number): Promise<ControleFaturamento | null>
  findAllByUserId(userId: number): Promise<ControleFaturamento[]>
  findAll(): Promise<ControleFaturamento[]>
  update(
    data:
      | {
          id_usuario?: number
        }
      | Partial<Prisma.ControleFaturamentoCreateInput>,
  ): Promise<ControleFaturamento>
  delete(billingControlId: number): Promise<boolean>
  deleteByUserId(userId: number): Promise<boolean>
}
