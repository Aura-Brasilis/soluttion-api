import { Usuarios, Prisma } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UsuariosCreateInput): Promise<Usuarios>
  findById(userId: number): Promise<Usuarios | null>
  findAll(): Promise<Usuarios[]>
  update(data: Prisma.UsuariosCreateInput): Promise<Usuarios>
  delete(userId: number): Promise<boolean>
}
