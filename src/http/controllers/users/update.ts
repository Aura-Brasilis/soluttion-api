import { makeUpdateUserUseCase } from '@/use-cases/factories/make-update-user-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function update(req: FastifyRequest, res: FastifyReply) {
  const updateBodySchema = z.object({
    id: z.coerce.number(),
    idUsuario: z.string().optional(),
    cpfCnpj: z.string().optional(),
    email: z.string().email().optional(),
    nome: z.string().optional(),
    investimento: z.coerce.number().optional(),
    responsavel: z.string().optional(),
    tipo: z.string().optional(),
    razaoSocial: z.string().optional(),
    telefone: z.string().optional(),
    cep: z.string().optional(),
  })

  const {
    id,
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
  } = updateBodySchema.parse(req.body)

  const updateUserUseCase = makeUpdateUserUseCase()

  const { user } = await updateUserUseCase.execute({
    data: {
      id,
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
    },
  })

  return res.status(200).send({ user })
}
