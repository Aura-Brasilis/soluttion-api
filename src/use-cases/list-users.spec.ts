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
      conta_cpfl: 1,
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
      conta_cpfl: 1,
    })

    const { users } = await sut.execute({
      pagination: { limit: 10, orderBy: '', page: 1, orderColumn: 'id' },
    })

    expect(users.data).toHaveLength(2)
  })

  it('should be able to get paginated users', async () => {
    for (let i = 0; i <= 22; i++) {
      usersRepository.items.push({
        id: i,
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
    }

    const { users } = await sut.execute({
      pagination: { limit: 10, orderBy: '', page: 3, orderColumn: 'id' },
    })

    expect(users.data).toHaveLength(3)
    expect(users.data[2].id).toBe(22)
  })

  it('should be able to get searched users', async () => {
    for (let i = 0; i <= 22; i++) {
      usersRepository.items.push({
        id: i,
        cep: '123',
        cpf_cnpj: '123',
        email: 'email@email.com',
        id_usuario: `${i}`,
        investimento: null,
        nome: `Test user ${i}`,
        razao_social: `Razao ${i}`,
        responsavel: `Resp ${i}`,
        telefone: '111111111',
        tipo: `tipo ${i}`,
        conta_cpfl: 1,
      })
    }

    const { users } = await sut.execute({
      pagination: {
        limit: 10,
        orderBy: '',
        orderColumn: 'id',
        page: 1,
        search: {
          nome: 'Test user 2',
          id: 2,
        },
      },
    })

    expect(users.data).toHaveLength(1)
    expect(users.data[0].id).toBe(2)
  })
})
