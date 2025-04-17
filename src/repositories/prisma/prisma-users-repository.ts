import { Prisma, Usuarios } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'
import { Pagination } from '@/@types/pagination'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UsuariosCreateInput) {
    const user = await prisma.usuarios.create({
      data,
    })

    return user
  }

  async findById(userId: number) {
    const user = await prisma.usuarios.findUnique({
      where: {
        id: userId,
      },
      include: {
        inquilinos: {
          include: {
            inquilino: true,
            usina: true,
          },
        },
        usinas: {
          include: {
            inquilino: true,
            usina: true,
          },
        },
      },
    })

    return user
  }

  async findAll(pagination: Pagination) {
    const { page, limit, search, orderBy, orderColumn } = pagination

    const filters: Record<string, unknown> = {}
    if (search) {
      Object.entries(search).forEach(([key, value]) => {
        if (value) {
          if (typeof value === 'string') {
            filters[key] = { contains: value, mode: 'insensitive' }
          } else {
            filters[key] = value
          }
        }
      })
    }

    const total = await prisma.usuarios.count({ where: filters })

    const skip = (page - 1) * limit

    const orderConfig = orderColumn ? { [orderColumn]: orderBy } : undefined

    const users = await prisma.usuarios.findMany({
      where: filters,
      include: {
        inquilinos: {
          include: {
            inquilino: true,
            usina: true,
          },
        },
        usinas: {
          include: {
            inquilino: true,
            usina: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: orderConfig,
    })

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        hasNextPage: skip + limit < total,
        hasPrevPage: skip > 0,
      },
    }
  }

  async update(data: Usuarios) {
    const dataToUpdate = {
      cep: data.cep,
      cpf_cnpj: data.cpf_cnpj,
      email: data.email,
      id_usuario: data.id_usuario,
      investimento: data.investimento,
      nome: data.nome,
      razao_social: data.razao_social,
      responsavel: data.responsavel,
      telefone: data.telefone,
      tipo: data.tipo,
    }

    const user = await prisma.usuarios.update({
      where: {
        id: data.id,
      },
      data: dataToUpdate,
    })

    return user
  }

  async delete(userId: number) {
    const user = await prisma.usuarios.findUnique({
      where: { id: userId },
    })

    if (!user) return false

    await prisma.usuarios.delete({ where: { id: userId } })

    return true
  }
}
