import { makeListConsumptionHistoryUseCase } from '@/use-cases/factories/make-list-consumption-history-use-case'
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
          fatura_numero: z.string().optional(),
          mes: z.string().optional(),
          consumo_kwh: z.coerce.number().optional(),
          dias: z.coerce.number().optional(),
          created_at: z.string().optional(),
        }),
      )
      .optional(),
  })

  const { limit, orderBy, orderColumn, page, search } = getQuerySchema.parse(
    req.query,
  )

  const listConsumptionHistoryUseCase = makeListConsumptionHistoryUseCase()

  const { consumptionHistories } = await listConsumptionHistoryUseCase.execute({
    pagination: { limit, orderBy, orderColumn, page, search },
  })

  const serializedConsumptionHistories = JSON.parse(
    JSON.stringify(consumptionHistories, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    ),
  )

  return res
    .status(200)
    .send({ consumptionHistories: serializedConsumptionHistories })
}
