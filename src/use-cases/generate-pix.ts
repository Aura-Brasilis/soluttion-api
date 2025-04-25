import { PixQrCodeRepository } from '@/repositories/pix/pix-qrcode-repository'
interface GeneratePixUseCaseRequest {
  amount: string
  id: string
}

interface GeneratePixUseCaseResponse {
  data: Record<string, string | boolean | number>
}

export class GeneratePixUseCase {
  constructor(private pixQrCodeRepository: PixQrCodeRepository) {}

  async execute({
    amount,
    id,
  }: GeneratePixUseCaseRequest): Promise<GeneratePixUseCaseResponse> {
    const data = await this.pixQrCodeRepository.create(amount, id)

    return { data }
  }
}
