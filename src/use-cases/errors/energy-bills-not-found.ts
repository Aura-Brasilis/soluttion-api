export class EnergyBillsNotFoundError extends Error {
  constructor() {
    super('Energy bills not found')
  }
}
