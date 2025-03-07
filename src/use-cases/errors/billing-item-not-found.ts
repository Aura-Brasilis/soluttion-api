export class BillingItemNotFoundError extends Error {
  constructor() {
    super('Billing item not found')
  }
}
