import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create users use case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create a new user', async () => {
    const { user } = await sut.execute({
      cep: '123',
      cpfCnpj: '123',
      email: 'email@email.com',
      idUsuario: '123',
      investimento: 0,
      nome: 'Test User',
      razaoSocial: 'Test',
      responsavel: 'test',
      telefone: '111111111',
      tipo: 'test',
      contaCpfl: 1,
    })

    expect(user.id).toEqual(expect.any(Number))
  })
})
