export interface PixQrCodeCreateInput {
  id?: int
  amount: string
  city: string
  code: string
  formated_amount: string | null
  key: string
  key_type: string
  name: string
  qrcode_base64: string
  renew_at: Date
  reference: string
}
