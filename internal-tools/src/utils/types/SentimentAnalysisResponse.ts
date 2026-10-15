export type SentimentAnalysisResponse = {
  translated_test: {
    sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL"
    score: number
    reason: string
    model: string
    tokens_used: number
  }
}
