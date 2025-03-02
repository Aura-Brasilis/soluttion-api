import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createBodySchema = z.object({
    idUsuario: z.string(),
    cpfCnpj: z.string(),
    email: z.string().email(),
    nome: z.string(),
    investimento: z.coerce.number(),
    responsavel: z.string(),
    tipo: z.string(),
    razaoSocial: z.string(),
    telefone: z.string(),
    cep: z.string(),
  })

  const {
    cep,
    cpfCnpj,
    email,
    idUsuario,
    investimento,
    nome,
    razaoSocial,
    responsavel,
    telefone,
    tipo,
  } = createBodySchema.parse(req.body)

  const createUserUseCase = makeCreateUserUseCase()

  const { user } = await createUserUseCase.execute({
    cep,
    cpfCnpj,
    email,
    idUsuario,
    investimento,
    nome,
    razaoSocial,
    responsavel,
    telefone,
    tipo,
  })

  return res.status(200).send({ user })
}
