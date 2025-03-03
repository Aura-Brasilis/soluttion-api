export class BillingControlNotFoundError extends Error {
  constructor() {
    super('Billing control not found')
  }
}
