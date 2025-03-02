import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { makeRemoveUserUseCase } from '@/use-cases/factories/make-remove-user-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function remove(req: FastifyRequest, res: FastifyReply) {
  const removeParamsSchema = z.object({
    userId: z.coerce.number(),
  })

  const { userId } = removeParamsSchema.parse(req.params)

  try {
    const removeUserUseCase = makeRemoveUserUseCase()

    const { success } = await removeUserUseCase.execute({ userId })

    return res.status(200).send({ success })
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(404).send({ msg: err.message })
    }
  }
}
