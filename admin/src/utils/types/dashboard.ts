export type TableLogType = {
  id: number
  created: string
  action: string
  tableName: string
}

export type DashboardDataType = {
  article_count: number
  user_count: number
  last_log: TableLogType
}
