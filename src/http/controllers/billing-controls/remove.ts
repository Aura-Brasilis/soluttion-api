import { BillingControlNotFoundError } from '@/use-cases/errors/billing-control-not-found'
import { makeRemoveBillingControlUseCase } from '@/use-cases/factories/make-remove-billing-control-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function remove(req: FastifyRequest, res: FastifyReply) {
  const removeParamsSchema = z.object({
    billingControlId: z.coerce.number(),
  })

  const { billingControlId } = removeParamsSchema.parse(req.params)

  try {
    const removeBillingControlUseCase = makeRemoveBillingControlUseCase()

    const { success } = await removeBillingControlUseCase.execute({
      billingControlId,
    })

    return res.status(200).send({ success })
  } catch (err) {
    if (err instanceof BillingControlNotFoundError) {
      return res.status(404).send({ msg: err.message })
    }
  }
}
