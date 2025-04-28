import { pix_qrcodes as PixQrCodes } from '@prisma/client'

export interface GeneratorQrCodeRepository {
  create(amount: string, id: string): Promise<PixQrCodes>
}
