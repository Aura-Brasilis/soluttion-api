import { Usuarios } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'
import { Pagination } from '@/@types/pagination'

interface ListUserUseCaseRequest {
  pagination: Pagination
}

interface ListUserUseCaseResponse {
  users: {
    data: Usuarios[]
    pagination: Record<string, string | number | boolean> | null
  }
}

export class ListUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    pagination,
  }: ListUserUseCaseRequest): Promise<ListUserUseCaseResponse> {
    const users = await this.usersRepository.findAll(pagination)

    return { users }
  }
}
