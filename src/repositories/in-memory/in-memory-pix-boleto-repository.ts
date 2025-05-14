import { pix_boletos as PixBoletos, Prisma } from '@prisma/client'
import { randomInt } from 'node:crypto'
import { PixBoletoRepository } from '../pix-boleto-repository'

export class InMemoryPixBoletoRepository implements PixBoletoRepository {
  public items: PixBoletos[] = []

  async create(data: Prisma.pix_boletosCreateInput) {
    const item: PixBoletos = {
      id: randomInt(99999),
      boleto: data.boleto || null,
      pix: data.pix || null,
      fatura_numero: data.faturas_energia.connect?.fatura_numero || '',
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(item)

    return item
  }

  async update(id: string, data: Prisma.pix_boletosCreateInput) {
    const itemIndex = this.items.findIndex((c) => c.fatura_numero === id)

    const item: PixBoletos = {
      id: randomInt(99999),
      boleto: data.boleto || null,
      pix: data.pix || null,
      fatura_numero: data.faturas_energia.connect?.fatura_numero || '',
      created_at: new Date(),
      updated_at: new Date(),
    }

    if (itemIndex >= 0) {
      this.items[itemIndex] = { ...item }
    }

    return this.items[itemIndex]
  }

  async findById(id: string) {
    const item = this.items.find((i) => i.fatura_numero === id)

    if (!item) return null

    return item
  }
}
