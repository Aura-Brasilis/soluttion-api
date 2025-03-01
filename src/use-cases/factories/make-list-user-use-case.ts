import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ListUserUseCase } from '../list-users'

export function makeListUserUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new ListUserUseCase(usersRepository)

  return useCase
}
