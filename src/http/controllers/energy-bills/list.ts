import { makeListEnergyBillsUseCase } from '@/use-cases/factories/make-list-energy-bills-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function list(req: FastifyRequest, res: FastifyReply) {
  const getQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(100),
    orderBy: z.string().default('asc'),
    orderColumn: z.string().default('id'),
    search: z
      .string()
      .transform((val) => {
        try {
          return JSON.parse(val)
        } catch (e) {
          throw new Error('Invalid JSON format')
        }
      })
      .pipe(
        z.object({
          id: z.coerce.bigint().optional(),
          empresa_nome: z.string().optional(),
          empresa_endereco: z.string().optional(),
          empresa_cnpj: z.string().optional(),
          fatura_numero: z.string().optional(),
          fatura_serie: z.string().optional(),
          data_emissao: z.string().optional(),
          data_vencimento: z.string().optional(),
          valor_total: z.coerce.number().optional(),
          proxima_leitura: z.string().optional(),
          cliente_nome: z.string().optional(),
          cliente_endereco: z.string().optional(),
          cliente_cpf: z.string().optional(),
          cliente_classificacao: z.string().optional(),
          instalacao_numero_contrato: z.string().optional(),
          instalacao_numero_instalacao: z.string().optional(),
          instalacao_numero_medidor: z.string().optional(),
          consumo_mes_referencia: z.string().optional(),
          consumo_total_kwh: z.coerce.number().optional(),
          impostos_base_icms: z.coerce.number().optional(),
          impostos_pis: z.coerce.number().optional(),
          impostos_cofins: z.coerce.number().optional(),
          leitura_energia_ativa_atual: z.coerce.number().optional(),
          leitura_energia_ativa_anterior: z.coerce.number().optional(),
          leitura_energia_ativa_consumo_kwh: z.coerce.number().optional(),
          leitura_energia_injetada_atual: z.coerce.number().optional(),
          leitura_energia_injetada_anterior: z.coerce.number().optional(),
          leitura_energia_injetada_consumo_kwh: z.coerce.number().optional(),
          contato_telefone: z.string().optional(),
          contato_site: z.string().optional(),
          created_at: z.string().optional(),
        }),
      )
      .optional(),
  })

  const { limit, orderBy, orderColumn, page, search } = getQuerySchema.parse(
    req.query,
  )

  const listEnergyBillsUseCase = makeListEnergyBillsUseCase()

  const { energyBills } = await listEnergyBillsUseCase.execute({
    pagination: { limit, orderBy, orderColumn, page, search },
  })

  const serializedEnergyBills = JSON.parse(
    JSON.stringify(energyBills, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    ),
  )

  return res.status(200).send({ energyBills: serializedEnergyBills })
}
