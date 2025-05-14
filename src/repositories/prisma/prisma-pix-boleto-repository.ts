import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PixBoletoRepository } from '../pix-boleto-repository'

export class PrismaPixBoletoRepository implements PixBoletoRepository {
  async create(data: Prisma.pix_boletosCreateInput) {
    const pixBoleto = await prisma.pix_boletos.create({
      data,
    })

    return pixBoleto
  }

  async update(id: string, data: Prisma.pix_boletosCreateInput) {
    const pixBoleto = await prisma.pix_boletos.update({
      where: {
        fatura_numero: id,
      },
      data,
    })

    return pixBoleto
  }

  async findById(id: string) {
    const pixBoleto = await prisma.pix_boletos.findFirst({
      where: {
        fatura_numero: id,
      },
    })

    return pixBoleto
  }
}
