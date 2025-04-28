import { PixQrCodeCreateInput } from '@/@types/pix-qr-code-create-input'
import { pix_qrcodes as PixQrCodes, Prisma } from '@prisma/client'
export interface QrCodeRepository {
  create(
    data: PixQrCodeCreateInput | Prisma.pix_qrcodesCreateInput,
  ): Promise<PixQrCodes>

  update(
    id: string,
    data: PixQrCodeCreateInput | Prisma.pix_qrcodesCreateInput,
  ): Promise<PixQrCodes>

  findById(id: string): Promise<PixQrCodes | null>
}
