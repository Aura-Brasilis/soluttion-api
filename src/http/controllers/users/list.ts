import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { makeListUserUseCase } from '@/use-cases/factories/make-list-user-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function list(req: FastifyRequest, res: FastifyReply) {
  try {
    const listUserUseCase = makeListUserUseCase()

    const { users } = await listUserUseCase.execute()

    return res.status(200).send({ users })
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(404).send({ msg: err.message })
    }
  }
}
