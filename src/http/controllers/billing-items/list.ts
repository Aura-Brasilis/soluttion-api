import { makeListBillingItemsUseCase } from '@/use-cases/factories/make-list-billing-items-use-case'
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
          codigo: z.string().optional(),
          descricao: z.string().optional(),
          quantidade_kwh: z.coerce.number().optional(),
          tarifa_com_impostos: z.coerce.number().optional(),
          valor: z.coerce.number().optional(),
          bandeira: z.string().optional(),
          mes_referencia: z.string().optional(),
          created_at: z.string().optional(),
        }),
      )
      .optional(),
  })

  const { limit, orderBy, orderColumn, page, search } = getQuerySchema.parse(
    req.query,
  )

  const listBillingItemsUseCase = makeListBillingItemsUseCase()

  const { billingItems } = await listBillingItemsUseCase.execute({
    pagination: { limit, orderBy, orderColumn, page, search },
  })

  const serializedBillingItems = JSON.parse(
    JSON.stringify(billingItems, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    ),
  )

  return res.status(200).send({ billingItems: serializedBillingItems })
}
