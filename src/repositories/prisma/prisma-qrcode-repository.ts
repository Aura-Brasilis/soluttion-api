import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { QrCodeRepository } from '../qrcode-repository'

export class PrismaQrCodeRepository implements QrCodeRepository {
  async create(data: Prisma.pix_qrcodesCreateInput) {
    const pix = await prisma.pix_qrcodes.create({
      data,
    })

    return pix
  }

  async update(id: string, data: Prisma.pix_qrcodesCreateInput) {
    const pix = await prisma.pix_qrcodes.update({
      where: {
        reference: id,
      },
      data,
    })

    return pix
  }

  async findById(id: string) {
    const pix = await prisma.pix_qrcodes.findFirst({
      where: {
        reference: id,
      },
    })

    return pix
  }
}
