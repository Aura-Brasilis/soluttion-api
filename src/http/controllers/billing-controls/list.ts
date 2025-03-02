import { makeListBillingControlUseCase } from '@/use-cases/factories/make-list-billing-control-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function list(req: FastifyRequest, res: FastifyReply) {
  const listUserUseCase = makeListBillingControlUseCase()

  const { billingControls } = await listUserUseCase.execute()

  return res.status(200).send({ billingControls })
}
