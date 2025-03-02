import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function get(req: FastifyRequest, res: FastifyReply) {
  const getParamsSchema = z.object({
    userId: z.coerce.number(),
  })

  const { userId } = getParamsSchema.parse(req.params)

  try {
    const getUserUseCase = makeGetUserUseCase()

    const { user } = await getUserUseCase.execute({ userId })

    return res.status(200).send({ user })
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(404).send({ msg: err.message })
    }
  }
}
