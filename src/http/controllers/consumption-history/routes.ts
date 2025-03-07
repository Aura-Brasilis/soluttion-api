import { FastifyInstance } from 'fastify'
import { get } from './get'
import { list } from './list'

export async function consumptionHistoriesRoutes(app: FastifyInstance) {
  app.get('/consumption-history/get/:consumptionHistoryId', get)
  app.get('/consumption-history/list', list)
}
