import { pix_boletos as PixBoletos, Prisma } from '@prisma/client'
export interface PixBoletoRepository {
  create(data: Prisma.pix_boletosCreateInput): Promise<PixBoletos>

  update(id: string, data: Prisma.pix_boletosCreateInput): Promise<PixBoletos>

  findById(id: string): Promise<PixBoletos | null>
}
