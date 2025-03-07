import { FastifyInstance } from 'fastify'
import { get } from './get'
import { list } from './list'

export async function energyBillsRoutes(app: FastifyInstance) {
  app.get('/energy-bills/get/:energyBillsId', get)
  app.get('/energy-bills/list', list)
}
