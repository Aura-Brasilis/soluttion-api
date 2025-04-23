import { makeListTenantsPlantsUseCase } from '@/use-cases/factories/make-list-tenants-plants-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function list(req: FastifyRequest, res: FastifyReply) {
  const getQuerySchema = z.object({
    inquilinoId: z.coerce.number().optional(),
    usinaId: z.coerce.number().optional(),
  })

  const { inquilinoId, usinaId } = getQuerySchema.parse(req.query)

  const listTenantsPlantsUseCase = makeListTenantsPlantsUseCase()

  const { tenantsPlants } = await listTenantsPlantsUseCase.execute({
    search: { inquilino_id: inquilinoId, usina_id: usinaId },
  })

  return res.status(200).send({ tenantsPlants })
}
