import axios from 'axios'
import { GeneratorQrCodeRepository } from '../generator-qrcode-repository'
import { env } from '@/env'

export class PixQrCodeRepository implements GeneratorQrCodeRepository {
  async create(amount: string, id: string) {
    try {
      const response = await axios.post(env.QRCODE_PIX_API_URL, {
        amount,
        reference: id,
        key: env.PIX_KEY,
        key_type: env.PIX_KEY_TYPE,
        name: env.PIX_NAME,
        city: env.PIX_CITY,
      })

      return response.data
    } catch (err) {
      console.error(err)
      return null
    }
  }
}
