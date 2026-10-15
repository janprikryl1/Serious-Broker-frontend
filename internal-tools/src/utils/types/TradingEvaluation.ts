export type TradingStrategy = 'sma' | 'ema';

export type SignalStats = {
  total: number
  buy: number
  sell: number
  hold: number
  buy_pct: number
  sell_pct: number
  hold_pct: number
}

export type SignalDailyEntry = {
  date: string
  BUY: number
  SELL: number
  HOLD: number
}

export type FearDistributionEntry = {
  bin: number
  BUY: number
  SELL: number
  HOLD: number
}

export type SymbolTradeStats = {
  symbol: string
  buy_count: number
  sell_count: number
  buy_volume: number
  sell_volume: number
}

export type CumulativeEntry = {
  date: string
  cumBuy: number
  cumSell: number
}

export type TradeStats = {
  total: number
  buy_count: number
  sell_count: number
  failed_count: number
  buy_volume_usd: number
  sell_volume_usd: number
  total_volume_usd: number
  by_symbol: SymbolTradeStats[]
  cumulative: CumulativeEntry[]
}

export type StrategyResult = {
  trading_type: string
  period: { from: string; to: string; symbols: string[] }
  signal_stats: SignalStats
  signal_daily: SignalDailyEntry[]
  fear_distribution: FearDistributionEntry[]
  trade_stats: TradeStats
}

export type TradingEvaluationResponse = {
  data: {
    sma?: StrategyResult
    ema?: StrategyResult
  }
}
