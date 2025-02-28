import { Usuarios } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'
import { UserNotFoundError } from './errors/user-not-found'

interface UpdateUserUseCaseRequest {
  data: Usuarios
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

    const updatedUser = await this.usersRepository.update(data)

    return { user: updatedUser }
  }
}
