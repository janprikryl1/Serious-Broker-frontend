import type { SeasonalityPoint } from "@/utils/types/SeasonalityPoint.ts"

export type SeasonalityResponse = {
  year: number
  coins: Record<string, SeasonalityPoint[]>
}
