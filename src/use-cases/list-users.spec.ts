import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { ListUserUseCase } from './list-users'

let usersRepository: InMemoryUsersRepository
let sut: ListUserUseCase

describe('List users use case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ListUserUseCase(usersRepository)
  })

  it('should be able to get all users', async () => {
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
    })

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
    })

    const { users } = await sut.execute()

    expect(users).toHaveLength(2)
  })
})
