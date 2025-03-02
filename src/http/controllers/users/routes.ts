import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'
import { get } from './get'
import { list } from './list'
import { remove } from './remove'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users/get/:userId', get)
  app.get('/users/list', list)

  app.post('/users/create', create)

  app.put('/users/update', update)

  app.delete('/users/remove/:userId', remove)
}
