import { Prisma, Usuarios } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'

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
    })

    return user
  }

  async findAll() {
    const users = await prisma.usuarios.findMany()

    return users
  }

  async update(data: Usuarios) {
    const user = await prisma.usuarios.update({
      where: {
        id: data.id,
      },
      data,
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
