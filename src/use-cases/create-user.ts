import { Usuarios } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'

interface CreateUserUseCaseRequest {
  cep: string
  email: string
  cpfCnpj: string
  idUsuario: string
  investimento: number
  nome: string
  razaoSocial: string
  responsavel: string
  telefone: string
  tipo: string
  contaCpfl: number
}

interface CreateUserUseCaseResponse {
  user: Usuarios
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
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
    contaCpfl,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = await this.usersRepository.create({
      cep,
      cpf_cnpj: cpfCnpj,
      email,
      id_usuario: idUsuario,
      investimento,
      nome,
      razao_social: razaoSocial,
      responsavel,
      telefone,
      tipo,
      contas_cpfl: {
        connect: { id: contaCpfl },
      },
    })

    return { user }
  }
}
