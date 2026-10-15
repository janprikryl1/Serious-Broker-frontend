import type { AIArticle } from "@/utils/types/AIArticle.ts"

export type AIArticlesResponse = {
  data: AIArticle[]
  totalCount: number
  currentPage: number
  totalPages: number
  stats: {
    positive: number
    neutral: number
    negative: number
    total: number
  }
}
