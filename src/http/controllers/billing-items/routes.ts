import { FastifyInstance } from 'fastify'
import { get } from './get'
import { list } from './list'

export async function billingItemsRoutes(app: FastifyInstance) {
  app.get('/billing-items/get/:billingItemId', get)
  app.get('/billing-items/list', list)
}
