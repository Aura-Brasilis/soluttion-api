import { BillingControlNotFoundError } from '@/use-cases/errors/billing-control-not-found'
import { makeGetBillingControlUseCase } from '@/use-cases/factories/make-get-billing-control-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function get(req: FastifyRequest, res: FastifyReply) {
  const getParamsSchema = z.object({
    billingControlId: z.coerce.number(),
  })

  const { billingControlId } = getParamsSchema.parse(req.params)

  try {
    const getBillingControlUseCase = makeGetBillingControlUseCase()

    const { billingControl } = await getBillingControlUseCase.execute({
      billingControlId,
    })

    return res.status(200).send({ billingControl })
  } catch (err) {
    if (err instanceof BillingControlNotFoundError) {
      return res.status(404).send({ msg: err.message })
    }
  }
}
