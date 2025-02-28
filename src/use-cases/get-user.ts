import { Usuarios } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'
import { UserNotFoundError } from './errors/user-not-found'

interface GetUserUseCaseRequest {
  userId: number
}

interface GetUserUseCaseResponse {
  user: Usuarios
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    return { user }
  }
}
