import { GeneratePixUseCase } from '../generate-pix'
import { PixQrCodeRepository } from '@/repositories/pix/pix-qrcode-repository'

export function makeGeneratePixUseCase() {
  const pixRepository = new PixQrCodeRepository()

  const useCase = new GeneratePixUseCase(pixRepository)

  return useCase
}
