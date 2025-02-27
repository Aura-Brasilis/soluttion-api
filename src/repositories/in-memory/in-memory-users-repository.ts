import { Usuarios } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomInt } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: Usuarios[] = []

  async create(data: Usuarios) {
    const user: Usuarios = {
      id: randomInt(999999),
      id_usuario: data.id_usuario || null,
      cpf_cnpj: data.cpf_cnpj,
      email: data.email,
      nome: data.nome,
      investimento: data.investimento,
      responsavel: data.responsavel,
      tipo: data.tipo,
      razao_social: data.razao_social || '',
      telefone: data.telefone || '',
      cep: data.cep || '',
    }

    this.items.push(user)

    return user
  }

  async findById(userId: number) {
    const user = this.items.find((i) => i.id === userId)

    if (!user) return null

    return user
  }

  async findAll() {
    return this.items
  }

  async update(data: Usuarios) {
    const userIndex = this.items.findIndex((c) => c.id === data.id)

    if (userIndex >= 0) {
      this.items[userIndex] = { ...data }
    }

    return this.items[userIndex]
  }

  async delete(userId: number) {
    const indexFinded = this.items.findIndex((i) => i.id === userId)

    if (indexFinded === -1) {
      return false
    }

    this.items.splice(indexFinded, 1)

    return true
  }
}
