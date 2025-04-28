import { pix_qrcodes as PixQrCode } from '@prisma/client'
import { QrCodeRepository } from '../qrcode-repository'
import { randomInt } from 'node:crypto'
import { PixQrCodeCreateInput } from '@/@types/pix-qr-code-create-input'

export class InMemoryQrCodeRepository implements QrCodeRepository {
  public items: PixQrCode[] = []

  async create(data: PixQrCodeCreateInput) {
    const nowDate = new Date()
    const renewDate = new Date(nowDate.getTime() + 30 * 60 * 1000)

    const pix: PixQrCode = {
      amount: data.amount,
      city: data.city,
      code: data.code,
      created_at: nowDate,
      formated_amount: data.formated_amount,
      id: randomInt(999999),
      key: data.key,
      key_type: data.key_type,
      name: data.name,
      qrcode_base64: data.qrcode_base64,
      reference: data.reference,
      renew_at: renewDate,
    }

    this.items.push(pix)

    return pix
  }

  async update(id: string, data: PixQrCodeCreateInput) {
    const pixIndex = this.items.findIndex((c) => c.reference === id)

    const nowDate = new Date()
    const renewDate = new Date(nowDate.getTime() + 30 * 60 * 1000)

    const pix: PixQrCode = {
      amount: data.amount,
      city: data.city,
      code: data.code,
      created_at: nowDate,
      formated_amount: data.formated_amount,
      id: data.id,
      key: data.key,
      key_type: data.key_type,
      name: data.name,
      qrcode_base64: data.qrcode_base64,
      reference: data.reference,
      renew_at: renewDate,
    }

    if (pixIndex >= 0) {
      this.items[pixIndex] = { ...pix }
    }

    return this.items[pixIndex]
  }

  async findById(id: string) {
    const pix = this.items.find((i) => i.reference === id)

    if (!pix) return null

    return pix
  }
}
