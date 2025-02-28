export class BillingControlFoundError extends Error {
  constructor() {
    super('Billing control not found')
  }
}
