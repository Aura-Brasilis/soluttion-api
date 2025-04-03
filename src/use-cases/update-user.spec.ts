import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { UpdateUserUseCase } from './update-user'
import { UserNotFoundError } from './errors/user-not-found'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserUseCase

describe('Update users use case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserUseCase(usersRepository)
  })

  it('should be able to update a user', async () => {
    const userId = 1
    const userName = 'Test user'
    const cepUpdate = '456'

    const data = {
      id: userId,
      cep: '123',
      cpf_cnpj: '123',
      email: 'email@email.com',
      id_usuario: '123',
      investimento: null,
      nome: userName,
      razao_social: 'Test',
      responsavel: 'test',
      telefone: '111111111',
      tipo: 'test',
      conta_cpfl: 1,
    }

    usersRepository.items.push(data)

    const { user } = await sut.execute({
      data: {
        ...data,
        cep: cepUpdate,
      },
    })

    expect(user.id).toBe(1)
    expect(user.cep).toBe(cepUpdate)
    expect(user.nome).toBe(userName)
  })

  it('should not be able to update not found user', async () => {
    const userId = 1
    const userName = 'Test user'
    const notRegisteredUserId = 2

    const dataToCreate = {
      id: userId,
      cep: '123',
      cpf_cnpj: '123',
      email: 'email@email.com',
      id_usuario: '123',
      investimento: null,
      nome: userName,
      razao_social: 'Test',
      responsavel: 'test',
      telefone: '111111111',
      tipo: 'test',
      conta_cpfl: 1,
    }

    const dataToUpdate = {
      id: notRegisteredUserId,
      cep: '123',
      cpf_cnpj: '123',
      email: 'email@email.com',
      id_usuario: '123',
      investimento: null,
      nome: userName,
      razao_social: 'Test',
      responsavel: 'test',
      telefone: '111111111',
      tipo: 'test',
      conta_cpfl: 1,
    }

    usersRepository.items.push(dataToCreate)

    await expect(() =>
      sut.execute({
        data: dataToUpdate,
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
