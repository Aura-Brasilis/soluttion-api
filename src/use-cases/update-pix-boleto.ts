import { pix_boletos as PixBoletos } from '@prisma/client'
import { PixBoletoRepository } from '@/repositories/pix-boleto-repository'
import { PixBoletoNotFoundError } from './errors/pix-boleto-not-found'

interface UpdatePixBoletoUseCaseRequest {
  pix?: string | null
  boleto?: string | null
  fatura: string
}

interface UpdatePixBoletoUseCaseResponse {
  pixBoleto: PixBoletos
}

export class UpdatePixBoletoUseCase {
  constructor(private PixBoletoRepository: PixBoletoRepository) {}

  async execute({
    pix,
    boleto,
    fatura,
  }: UpdatePixBoletoUseCaseRequest): Promise<UpdatePixBoletoUseCaseResponse> {
    const pixBoletoFounded = await this.PixBoletoRepository.findById(fatura)

    if (!pixBoletoFounded) {
      throw new PixBoletoNotFoundError()
    }

    const dataToUpdate = {
      pix,
      updated_at: new Date(),
      boleto,
      faturas_energia: {
        connect: {
          fatura_numero: fatura,
        },
      },
    }

    const updatedPixBoleto = await this.PixBoletoRepository.update(
      fatura,
      dataToUpdate,
    )

    return { pixBoleto: updatedPixBoleto }
  }
}
