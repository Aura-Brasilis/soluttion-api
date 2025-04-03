import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { RemoveUserUseCase } from './remove-user'
import { UserNotFoundError } from './errors/user-not-found'

let usersRepository: InMemoryUsersRepository
let sut: RemoveUserUseCase

describe('Remove users use case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RemoveUserUseCase(usersRepository)
  })

  it('should be able to remove a user by id', async () => {
    const userId = 1

    usersRepository.items.push({
      id: userId,
      cep: '123',
      cpf_cnpj: '123',
      email: 'email@email.com',
      id_usuario: '123',
      investimento: null,
      nome: 'Test User',
      razao_social: 'Test',
      responsavel: 'test',
      telefone: '111111111',
      tipo: 'test',
      conta_cpfl: 1,
    })

    const { success } = await sut.execute({ userId })

    expect(success).toBeTruthy()
  })

  it('should throw when remove invalid user', async () => {
    const userId = 1
    const notRegisteredUserId = 2

    usersRepository.items.push({
      id: userId,
      cep: '123',
      cpf_cnpj: '123',
      email: 'email@email.com',
      id_usuario: '123',
      investimento: null,
      nome: 'Test User',
      razao_social: 'Test',
      responsavel: 'test',
      telefone: '111111111',
      tipo: 'test',
      conta_cpfl: 1,
    })

    await expect(() =>
      sut.execute({
        userId: notRegisteredUserId,
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
