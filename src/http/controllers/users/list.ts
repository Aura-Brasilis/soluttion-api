import { makeListUserUseCase } from '@/use-cases/factories/make-list-user-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function list(req: FastifyRequest, res: FastifyReply) {
  const getQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(100),
    orderBy: z.string().default('asc'),
    orderColumn: z.string().default('id'),
    search: z
      .string()
      .transform((val) => {
        try {
          return JSON.parse(val)
        } catch (e) {
          throw new Error('Invalid JSON format')
        }
      })
      .pipe(
        z.object({
          id: z.number().optional(),
          id_usuario: z.string().optional(),
          nome: z.string().optional(),
          email: z.string().optional(),
          telefone: z.string().optional(),
          cpf_cnpj: z.string().optional(),
          razao_social: z.string().optional(),
          investimento: z.coerce.number().optional(),
          responsavel: z.string().optional(),
          cep: z.string().optional(),
          tipo: z.string().optional(),
        }),
      )
      .optional(),
  })

  const { limit, orderBy, orderColumn, page, search } = getQuerySchema.parse(
    req.query,
  )

  const listUserUseCase = makeListUserUseCase()

  const { users } = await listUserUseCase.execute({
    pagination: { limit, orderBy, orderColumn, page, search },
  })

  return res.status(200).send({ users })
}
