import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function pixRoutes(app: FastifyInstance) {
  app.post('/pix/create', create)
}
