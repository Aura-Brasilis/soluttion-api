import { makeListBillingItems2UseCase } from '@/use-cases/factories/make-list-billing-items-2-use-case'
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
          mes_referencia: z.string().optional(),
          ativa_cpfl_tarifas: z.coerce.number().optional(),
          ativa_cpfl_valor: z.coerce.number().optional(),
          extras_cpfl: z.coerce.number().optional(),
          injetada_tarifas: z.coerce.number().optional(),
          injetada_valor: z.coerce.number().optional(),
          kwh_ativa: z.coerce.number().optional(),
          kwh_injetada: z.coerce.number().optional(),
          created_at: z.string().optional(),
        }),
      )
      .optional(),
  })

  const { limit, orderBy, orderColumn, page, search } = getQuerySchema.parse(
    req.query,
  )

  const listBillingItemsUseCase = makeListBillingItems2UseCase()

  const { billingItems2 } = await listBillingItemsUseCase.execute({
    pagination: { limit, orderBy, orderColumn, page, search },
  })

  const serializedBillingItems = JSON.parse(
    JSON.stringify(billingItems2, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    ),
  )

  return res.status(200).send({ billingItems2: serializedBillingItems })
}
