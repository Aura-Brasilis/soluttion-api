import { Usuarios } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'

interface ListUserUseCaseResponse {
  users: Usuarios[]
}

export class ListUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<ListUserUseCaseResponse> {
    const users = await this.usersRepository.findAll()

    return { users }
  }
}
