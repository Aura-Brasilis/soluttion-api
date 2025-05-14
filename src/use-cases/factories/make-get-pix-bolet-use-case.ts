import { PrismaPixBoletoRepository } from '@/repositories/prisma/prisma-pix-boleto-repository'
import { GetPixBoletoUseCase } from '../get-pix-boleto'

export function makeGetPixBoletoUseCase() {
  const prismaRepository = new PrismaPixBoletoRepository()

  const useCase = new GetPixBoletoUseCase(prismaRepository)

  return useCase
}
