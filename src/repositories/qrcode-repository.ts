export interface QrCodeRepository {
  create(
    amount: string,
    id: string,
  ): Promise<Record<string, string | boolean | number>>
}
