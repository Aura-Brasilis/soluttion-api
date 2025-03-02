import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'
import { get } from './get'
import { list } from './list'
import { remove } from './remove'

export async function billingControlsRoutes(app: FastifyInstance) {
  app.get('/billing-controls/get/:billingControlId', get)
  app.get('/billing-controls/list', list)

  app.post('/billing-controls/create', create)

  app.put('/billing-controls/update', update)

  app.delete('/billing-controls/remove/:billingControlId', remove)
}
