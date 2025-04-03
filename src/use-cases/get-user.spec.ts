import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { GetUserUseCase } from './get-user'
import { UserNotFoundError } from './errors/user-not-found'

let usersRepository: InMemoryUsersRepository
let sut: GetUserUseCase

describe('Get users use case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserUseCase(usersRepository)
  })

  it('should be able to get a user by id', async () => {
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

    const { user } = await sut.execute({ userId })

    expect(user.id).toBe(1)
  })

  it('should throw when get invalid user', async () => {
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
