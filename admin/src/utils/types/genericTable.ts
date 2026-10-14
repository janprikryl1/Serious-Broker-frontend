export type TableSelect = {
  id: number
  query: string
  user_id: number
  created: string
  updated: string
}

export type GenericTableSchema = {
  Field: string
  Type: string
  Null: "NO" | "YES"
  Key: "PRI" | ""
  Default: null | string | number
  Extra: string
}

export type FilterOperator =
  | "="
  | "!="
  | ">"
  | "<"
  | ">="
  | "<="
  | "<>"
  | "LIKE"
  | "NOT LIKE"
  | "IS NULL"
  | "IS NOT NULL"
  | "IS TRUE"
  | "IS FALSE"
  | "IN"
  | "NOT IN"

export type FilterCondition = {
  field: string
  operator: FilterOperator
  value?: string | number | boolean | null
}

export type GenericTableQuery = {
  columns?: string[]
  conditions?: FilterCondition[]
  orderBy?: { field: string; direction: "ASC" | "DESC" }
  limit?: number
  offset?: number
  globalConditionOperator?: "AND" | "OR"
}
