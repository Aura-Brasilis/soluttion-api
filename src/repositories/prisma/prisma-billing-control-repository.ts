import { Prisma, ControleFaturamento } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { BillingControlRepository } from '../billing-control-repository'

export class PrismaBillingControlRepository
  implements BillingControlRepository
{
  async create(data: Prisma.ControleFaturamentoCreateInput) {
    const billingControl = await prisma.controleFaturamento.create({
      data,
    })

    return billingControl
  }

  async findById(billingControlId: number) {
    const billingControl = await prisma.controleFaturamento.findUnique({
      where: {
        id: billingControlId,
      },
    })

    return billingControl
  }

  async findAll() {
    const billingControls = await prisma.controleFaturamento.findMany()

    return billingControls
  }

  async update(data: ControleFaturamento) {
    const billingControl = await prisma.controleFaturamento.update({
      where: {
        id: data.id,
      },
      data,
    })

    return billingControl
  }

  async delete(billingControlId: number) {
    const billingControl = await prisma.controleFaturamento.findUnique({
      where: { id: billingControlId },
    })

    if (!billingControl) return false

    await prisma.controleFaturamento.delete({ where: { id: billingControlId } })

    return true
  }
}
