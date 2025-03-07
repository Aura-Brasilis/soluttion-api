import { BillingControlSearch } from './billing-control-search'
import { EnergyBillsSearch } from './energy-bills-search'
import { UserSearch } from './user-search'

export interface Pagination {
  page: number
  limit: number
  orderBy: string
  orderColumn: string
  search?: UserSearch | BillingControlSearch | EnergyBillsSearch
}
