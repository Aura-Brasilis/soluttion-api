import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RemoveUserUseCase } from '../remove-user'

export function makeRemoveUserUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new RemoveUserUseCase(usersRepository)

  return useCase
}
