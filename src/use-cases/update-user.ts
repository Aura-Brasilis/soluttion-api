import { Usuarios } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'
import { UserNotFoundError } from './errors/user-not-found'

interface UpdateUserUseCaseRequest {
  data: {
    id: number
    cep?: string
    email?: string
    cpfCnpj?: string
    idUsuario?: string
    investimento?: number | null
    nome?: string
    razaoSocial?: string
    responsavel?: string
    telefone?: string
    tipo?: string
  }
}

interface UpdateUserUseCaseResponse {
  user: Usuarios
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    data,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(data.id)

    if (!user) {
      throw new UserNotFoundError()
    }

    const dataToUpdate = {
      id: data.id,
      cep: data.cep,
      cpf_cnpj: data.cpfCnpj,
      email: data.email,
      id_usuario: data.idUsuario,
      investimento: data.investimento,
      nome: data.nome,
      razao_social: data.razaoSocial,
      responsavel: data.responsavel,
      telefone: data.telefone,
      tipo: data.tipo,
    }

    const updatedUser = await this.usersRepository.update(dataToUpdate)

    return { user: updatedUser }
  }
}
