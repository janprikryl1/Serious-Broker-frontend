export type AlgoConfigType = 'sma' | 'ema'

export type AlgoConfig = {
  trading: {
    hours_back: number
    interval_seconds: number
    dry_run: boolean
    quantity_precision: number
  }
  indicators: {
    sma_period?: number
    ema_period?: number
  }
  strategy: {
    fear_buy_threshold: number
    fear_sell_threshold: number
  }
  risk_management: {
    buy_strong_fear_threshold: number
    buy_normal_fear_threshold: number
    sell_normal_fear_threshold: number
    sell_strong_fear_threshold: number
    buy_strong: number
    buy_normal: number
    sell_strong: number
    sell_normal: number
  }
  limits: {
    min_quote_balance: number
    min_base_balance: number
    min_balance?: number
  }
  logging: {
    log_dir: string
    combined_log_file: string
    session_log_template: string
    backup_count: number
    level: string
  }
  database: {
    db_file: string
  }
}

export type AlgoConfigResponse = {
  data: AlgoConfig
}
