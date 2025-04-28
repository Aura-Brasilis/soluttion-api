import { PixQrCodeRepository } from '@/repositories/pix/pix-qrcode-repository'
import { QrCodeRepository } from '@/repositories/qrcode-repository'
import { pix_qrcodes as PixQrCodes, Prisma } from '@prisma/client'
interface GeneratePixUseCaseRequest {
  amount: string
  id: string
}

interface GeneratePixUseCaseResponse {
  data: PixQrCodes
}

export class GeneratePixUseCase {
  constructor(
    private pixQrCodeRepository: PixQrCodeRepository,
    private qrCodeRepository: QrCodeRepository,
  ) {}

  async execute({
    amount,
    id,
  }: GeneratePixUseCaseRequest): Promise<GeneratePixUseCaseResponse> {
    const pixFounded = await this.qrCodeRepository.findById(id)

    const renewPixMinutes = 30

    const nowDate = new Date()
    const renewDate = new Date(nowDate.getTime() + renewPixMinutes * 60 * 1000)

    if (!pixFounded || (pixFounded && nowDate > pixFounded.renew_at)) {
      const data = await this.pixQrCodeRepository.create(amount, id)

      const payload: Prisma.pix_qrcodesCreateInput = {
        key: data.key as string,
        created_at: nowDate,
        renew_at: renewDate,
        key_type: data.key_type as string,
        name: data.name as string,
        city: data.city as string,
        amount: data.amount as string,
        code: data.code as string,
        formated_amount: data.formated_amount as string,
        qrcode_base64: data.qrcode_base64 as string,
        faturas_energia: {
          connect: {
            fatura_numero: data.reference as string,
          },
        },
      }

      const pix = pixFounded
        ? await this.qrCodeRepository.update(id, payload)
        : await this.qrCodeRepository.create(payload)

      return { data: pix }
    }

    return { data: pixFounded }
  }
}
