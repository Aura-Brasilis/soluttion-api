import { PrismaPixBoletoRepository } from '@/repositories/prisma/prisma-pix-boleto-repository'
import { UpdatePixBoletoUseCase } from '../update-pix-boleto'

export function makeUpdatePixBoletoUseCase() {
  const prismaRepository = new PrismaPixBoletoRepository()

  const useCase = new UpdatePixBoletoUseCase(prismaRepository)

  return useCase
}
