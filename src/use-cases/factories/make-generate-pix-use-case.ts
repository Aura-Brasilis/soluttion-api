import { PrismaQrCodeRepository } from '@/repositories/prisma/prisma-qrcode-repository'
import { GeneratePixUseCase } from '../generate-pix'
import { PixQrCodeRepository } from '@/repositories/pix/pix-qrcode-repository'

export function makeGeneratePixUseCase() {
  const pixRepository = new PixQrCodeRepository()
  const qrCodeRepository = new PrismaQrCodeRepository()

  const useCase = new GeneratePixUseCase(pixRepository, qrCodeRepository)

  return useCase
}
