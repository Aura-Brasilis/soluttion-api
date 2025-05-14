import { makeGetPixBoletoUseCase } from '@/use-cases/factories/make-get-pix-bolet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function get(req: FastifyRequest, res: FastifyReply) {
  const getParamsSchema = z.object({
    fatura: z.string(),
  })

  const { fatura } = getParamsSchema.parse(req.params)

  const getPixBoletoUseCase = makeGetPixBoletoUseCase()

  const { pixBoleto } = await getPixBoletoUseCase.execute({
    fatura,
  })

  return res.status(200).send({ pixBoleto })
}
