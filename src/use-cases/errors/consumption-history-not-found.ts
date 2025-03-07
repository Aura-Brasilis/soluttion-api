export class ConsumptionHistoryNotFoundError extends Error {
  constructor() {
    super('Consumption history not found')
  }
}
