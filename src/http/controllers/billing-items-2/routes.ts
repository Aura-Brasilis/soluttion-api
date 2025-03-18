import { FastifyInstance } from 'fastify'
import { list } from './list'

export async function billingItems2Routes(app: FastifyInstance) {
  app.get('/billing-items-2/list', list)
}
