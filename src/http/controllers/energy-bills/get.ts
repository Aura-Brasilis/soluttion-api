import { EnergyBillsNotFoundError } from '@/use-cases/errors/energy-bills-not-found'
import { makeGetEnergyBillsUseCase } from '@/use-cases/factories/make-get-energy-bills-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function get(req: FastifyRequest, res: FastifyReply) {
  const getParamsSchema = z.object({
    energyBillsId: z.coerce.bigint(),
  })

  const { energyBillsId } = getParamsSchema.parse(req.params)

  try {
    const getEnergyBillsUseCase = makeGetEnergyBillsUseCase()

    const { energyBills } = await getEnergyBillsUseCase.execute({
      energyBillsId,
    })

    const serializedEnergyBills = JSON.parse(
      JSON.stringify(energyBills, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    )

    return res.status(200).send({ energyBills: serializedEnergyBills })
  } catch (err) {
    if (err instanceof EnergyBillsNotFoundError) {
      return res.status(404).send({ msg: err.message })
    }
  }
}
