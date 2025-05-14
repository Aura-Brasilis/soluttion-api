import { FastifyInstance } from 'fastify'
import { update } from './update'
import { get } from './get'

export async function pixBoletoRoutes(app: FastifyInstance) {
  app.get('/pix-boleto/:fatura', get)
  app.put('/pix-boleto/update', update)
}
