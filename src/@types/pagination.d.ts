import { UserSearch } from './user-search'

export interface Pagination {
  page: number
  limit: number
  orderBy: string
  orderColumn: string
  search?: UserSearch
}
