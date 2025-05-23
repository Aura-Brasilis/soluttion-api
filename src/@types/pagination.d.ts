import { BillingControlSearch } from './billing-control-search'
import { BillingItems2Search } from './billing-items-2-search'
import { BillingItemsSearch } from './billing-items-search'
import { EnergyBillsSearch } from './energy-bills-search'
import { UserSearch } from './user-search'

export interface Pagination {
  page: number
  limit: number
  orderBy: string
  orderColumn: string
  search?:
    | UserSearch
    | BillingControlSearch
    | BillingItemsSearch
    | EnergyBillsSearch
    | BillingItems2Search
}
