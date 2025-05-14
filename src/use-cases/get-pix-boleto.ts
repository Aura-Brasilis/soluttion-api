import { pix_boletos as PixBoletos } from '@prisma/client'
import { PixBoletoRepository } from '@/repositories/pix-boleto-repository'

interface GetPixBoletoUseCaseRequest {
  fatura: string
}

interface GetPixBoletoUseCaseResponse {
  pixBoleto: PixBoletos
}

export class GetPixBoletoUseCase {
  constructor(private pixBoletoRepository: PixBoletoRepository) {}

  async execute({
    fatura,
  }: GetPixBoletoUseCaseRequest): Promise<GetPixBoletoUseCaseResponse> {
    let pixBoleto = await this.pixBoletoRepository.findById(fatura)

    if (!pixBoleto) {
      pixBoleto = await this.pixBoletoRepository.create({
        faturas_energia: {
          connect: {
            fatura_numero: fatura,
          },
        },
      })
    }

    return { pixBoleto }
  }
}
