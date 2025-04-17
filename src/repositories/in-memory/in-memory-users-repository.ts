import { Usuarios } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomInt } from 'node:crypto'
import { Pagination } from '@/@types/pagination'

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

  async findAll(pagination: Pagination) {
    const { page = 1, limit = 10, search } = pagination

    let filteredUsers = this.items

    if (search) {
      filteredUsers = filteredUsers.filter((user) => {
        return Object.entries(search).every(([key, value]) => {
          if (!value) return true
          const userValue = user[key as keyof Usuarios]
          if (typeof userValue === 'string') {
            return userValue.toLowerCase().includes(String(value).toLowerCase())
          }
          return userValue === value
        })
      })
    }

    const total = filteredUsers.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = filteredUsers.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        hasNextPage: endIndex < total,
        hasPrevPage: startIndex > 0,
      },
    }
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
