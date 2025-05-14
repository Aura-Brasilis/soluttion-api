import { makeUpdatePixBoletoUseCase } from '@/use-cases/factories/make-update-pix-boleto-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function update(req: FastifyRequest, res: FastifyReply) {
  const updateBodySchema = z.object({
    fatura: z.string(),
    boleto: z.string().nullable().optional(),
    pix: z.string().nullable().optional(),
  })

  const { fatura, boleto, pix } = updateBodySchema.parse(req.body)

  const updatePixBoletoUseCase = makeUpdatePixBoletoUseCase()

  const { pixBoleto } = await updatePixBoletoUseCase.execute({
    fatura,
    boleto,
    pix,
  })

  return res.status(200).send({ pixBoleto })
}
