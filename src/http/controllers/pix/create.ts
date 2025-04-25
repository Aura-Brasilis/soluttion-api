import { makeGeneratePixUseCase } from '@/use-cases/factories/make-generate-pix-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createBodySchema = z.object({
    amount: z.string(),
    id: z.string(),
  })

  const { amount, id } = createBodySchema.parse(req.body)

  const generatePixUseCase = makeGeneratePixUseCase()

  const { data } = await generatePixUseCase.execute({
    amount,
    id,
  })

  return res.status(200).send({ data })
}
