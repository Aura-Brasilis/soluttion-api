import { BillingControlSearch } from './billing-control-search'
import { BillingItemsSearch } from './billing-items-search'
import { UserSearch } from './user-search'

export interface Pagination {
  page: number
  limit: number
  orderBy: string
  orderColumn: string
  search?: UserSearch | BillingControlSearch | BillingItemsSearch
}
