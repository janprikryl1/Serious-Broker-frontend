import type { TradingStrategy } from "@/utils/types/TradingEvaluation.ts"

export type TradingResultsSubmitType = {
  strategy: TradingStrategy
  from: string
  to: string
}