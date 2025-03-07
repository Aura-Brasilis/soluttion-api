import { Prisma, ControleFaturamento } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { BillingControlRepository } from '../billing-control-repository'
import { Pagination } from '@/@types/pagination'

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
      include: {
        Usuarios_ControleFaturamento_id_inquilinoToUsuarios: true,
        Usuarios_ControleFaturamento_id_usinaToUsuarios: true,
      },
      where: {
        id: billingControlId,
      },
    })

    if (!billingControl) {
      return null
    }

    const {
      Usuarios_ControleFaturamento_id_inquilinoToUsuarios: tenant,
      Usuarios_ControleFaturamento_id_usinaToUsuarios: plant,
      ...rest
    } = billingControl

    const formatedBillingControl = { ...rest, tenant, plant }

    return formatedBillingControl
  }

  async findAll(pagination: Pagination) {
    const { page, limit, search, orderBy, orderColumn } = pagination

    const filters: Record<string, unknown> = {}
    if (search) {
      Object.entries(search).forEach(([key, value]) => {
        if (value) {
          if (typeof value === 'string') {
            filters[key] = { contains: value, mode: 'insensitive' }
          } else {
            filters[key] = value
          }
        }
      })
    }

    const total = await prisma.controleFaturamento.count({ where: filters })

    const skip = (page - 1) * limit

    const orderConfig = orderColumn ? { [orderColumn]: orderBy } : undefined

    const billingControls = await prisma.controleFaturamento.findMany({
      where: filters,
      include: {
        Usuarios_ControleFaturamento_id_inquilinoToUsuarios: true,
        Usuarios_ControleFaturamento_id_usinaToUsuarios: true,
      },
      skip,
      take: limit,
      orderBy: orderConfig,
    })

    const formattedBillingControls = billingControls.map((item) => {
      const {
        Usuarios_ControleFaturamento_id_inquilinoToUsuarios: tenant,
        Usuarios_ControleFaturamento_id_usinaToUsuarios: plant,
        ...rest
      } = item

      return {
        ...rest,
        tenant,
        plant,
      }
    })

    return {
      data: formattedBillingControls,
      pagination: {
        page,
        limit,
        total,
        hasNextPage: skip + limit < total,
        hasPrevPage: skip > 0,
      },
    }
  }

  async update(data: ControleFaturamento) {
    const dataToUpdate = {
      id_inquilino: data.id_inquilino,
      id_usina: data.id_usina,
      contrib_custeio_ip_cip: data.contrib_custeio_ip_cip,
      cred_adc_band_tarifaria: data.cred_adc_band_tarifaria,
      credito_debito: data.credito_debito,
      economia: data.economia,
      kwh_ativo: data.kwh_ativo,
      kwh_injetado: data.kwh_injetado,
      kwh_minimo: data.kwh_minimo,
      leitura_1: data.leitura_1,
      leitura_2: data.leitura_2,
      mes: data.mes,
      mes_ref: data.mes_ref,
      minimo_investidor: data.minimo_investidor,
      observacao: data.observacao,
      saldo_banco_anterior: data.saldo_banco_anterior,
      saldo_banco_atual: data.saldo_banco_atual,
      tarifa_te_fv: data.tarifa_te_fv,
      tarifa_tusd_fv: data.tarifa_tusd_fv,
      mes_contrato_soluttion: data.mes_contrato_soluttion,
    }

    const billingControl = await prisma.controleFaturamento.update({
      where: {
        id: data.id,
      },
      data: dataToUpdate,
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
