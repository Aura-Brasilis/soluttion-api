import { ConsumptionHistoryNotFoundError } from '@/use-cases/errors/consumption-history-not-found'
import { makeGetConsumptionHistoryUseCase } from '@/use-cases/factories/make-get-consumption-history-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function get(req: FastifyRequest, res: FastifyReply) {
  const getParamsSchema = z.object({
    consumptionHistoryId: z.coerce.bigint(),
  })

  const { consumptionHistoryId } = getParamsSchema.parse(req.params)

  try {
    const getConsumptionHistoryUseCase = makeGetConsumptionHistoryUseCase()

    const { consumptionHistory } = await getConsumptionHistoryUseCase.execute({
      consumptionHistoryId,
    })

    const serializedConsumptionHistories = JSON.parse(
      JSON.stringify(consumptionHistory, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    )

    return res.status(200).send({ energyBills: serializedConsumptionHistories })
  } catch (err) {
    if (err instanceof ConsumptionHistoryNotFoundError) {
      return res.status(404).send({ msg: err.message })
    }
  }
}
