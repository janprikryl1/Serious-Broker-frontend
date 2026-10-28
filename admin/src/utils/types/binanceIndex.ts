export type BinanceIndexType = {
  id: number
  label: string
  name: string
  status: string
  created: string
  changed: string
  /** V databázi sloupec `description`, API ho vystavuje jako `about`. */
  about: string
}

export type BinanceIndexListParams = {
  page?: number
  limit?: number
  search?: string
}

/**
 * Tabulka `binance_index` má desítky tisíc řádků, takže se stránkuje na
 * serveru — stejný tvar odpovědi jako u `table_log/get_all_logs.php`.
 */
export type BinanceIndexListResponse = {
  data: BinanceIndexType[]
  total: number
  totalPages: number
  page: number
  limit: number
}
