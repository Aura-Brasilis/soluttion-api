import { FastifyInstance } from 'fastify'
import { list } from './list'

export async function tenantsPlantsRoutes(app: FastifyInstance) {
  app.get('/tenants-plants/list', list)
}
