import { UsersRepository } from '../repositories/users-repository'
import { UserNotFoundError } from './errors/user-not-found'

interface RemoveUserUseCaseRequest {
  userId: number
}

interface RemoveUserUseCaseResponse {
  success: boolean
}

export class RemoveUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: RemoveUserUseCaseRequest): Promise<RemoveUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const success = await this.usersRepository.delete(userId)

    return { success }
  }
}
