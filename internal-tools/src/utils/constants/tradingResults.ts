import type { AlgoConfig } from "@/utils/types/AlgoConfig.ts"

export const TradingResultColors = {
  buy: "#4CAF50",
  sell: "#F44336",
  hold: "#9E9E9E",
  gold: "#c9a961",
  bg: "#2a2620",
  border: "#3a3530",
  text: "#d4c9a8",
  muted: "#6b6560",
}

export const TOOLTIP_STYLE = {
  contentStyle: {
    backgroundColor: "#1a1916",
    border: `1px solid ${TradingResultColors.border}`,
    borderRadius: 8,
  },
  labelStyle: { color: TradingResultColors.gold, fontWeight: "bold" },
  itemStyle: { color: TradingResultColors.text },
}

export const SMA_DEFAULT: AlgoConfig = {
  trading: {
    hours_back: 100,
    interval_seconds: 900,
    dry_run: false,
    quantity_precision: 6,
  },
  indicators: { sma_period: 14 },
  strategy: { fear_buy_threshold: 40, fear_sell_threshold: 45 },
  risk_management: {
    buy_strong_fear_threshold: 15,
    buy_normal_fear_threshold: 40,
    sell_normal_fear_threshold: 45,
    sell_strong_fear_threshold: 85,
    buy_strong: 0.4,
    buy_normal: 0.26,
    sell_strong: 1.0,
    sell_normal: 0.8,
  },
  limits: {
    min_quote_balance: 6.0,
    min_base_balance: 0.0001,
    min_balance: 0.0001,
  },
  logging: {
    log_dir: "logs",
    combined_log_file: "trading.log",
    session_log_template: "run-{timestamp}.log",
    backup_count: 14,
    level: "INFO",
  },
  database: { db_file: "trades.db" },
}

export const EMA_DEFAULT: AlgoConfig = {
  trading: {
    hours_back: 200,
    interval_seconds: 900,
    dry_run: false,
    quantity_precision: 6,
  },
  indicators: { ema_period: 21 },
  strategy: { fear_buy_threshold: 46, fear_sell_threshold: 45 },
  risk_management: {
    buy_strong_fear_threshold: 15,
    buy_normal_fear_threshold: 46,
    sell_normal_fear_threshold: 45,
    sell_strong_fear_threshold: 80,
    buy_strong: 0.3,
    buy_normal: 0.15,
    sell_strong: 1.0,
    sell_normal: 0.5,
  },
  limits: { min_quote_balance: 0.25, min_base_balance: 0.0001 },
  logging: {
    log_dir: "logs",
    combined_log_file: "ema_fng.log",
    session_log_template: "run-{timestamp}.log",
    backup_count: 14,
    level: "INFO",
  },
  database: { db_file: "ema_fng_trades.db" },
}