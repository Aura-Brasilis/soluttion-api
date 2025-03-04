import { Pagination } from '@/@types/pagination'
import { Usuarios, Prisma } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UsuariosCreateInput): Promise<Usuarios>
  findById(userId: number): Promise<Usuarios | null>
  findAll(pagination: Pagination): Promise<{
    data: Usuarios[]
    pagination: Record<string, string | number | boolean> | null
  }>
  update(data: Prisma.UsuariosCreateInput): Promise<Usuarios>
  delete(userId: number): Promise<boolean>
}
