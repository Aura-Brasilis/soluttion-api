import { BillingItemNotFoundError } from '@/use-cases/errors/billing-item-not-found'
import { makeGetBillingItemUseCase } from '@/use-cases/factories/make-get-billing-items-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function get(req: FastifyRequest, res: FastifyReply) {
  const getParamsSchema = z.object({
    billingItemId: z.coerce.bigint(),
  })

  const { billingItemId } = getParamsSchema.parse(req.params)

  try {
    const getBillingItemUseCase = makeGetBillingItemUseCase()

    const { billingItem } = await getBillingItemUseCase.execute({
      billingItemId,
    })

    const serializedBillngItem = JSON.parse(
      JSON.stringify(billingItem, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    )

    return res.status(200).send({ energyBills: serializedBillngItem })
  } catch (err) {
    if (err instanceof BillingItemNotFoundError) {
      return res.status(404).send({ msg: err.message })
    }
  }
}
