import type { Article } from "@/utils/types/Article.ts"

export type PaginatedResponse = {
  data: Article[];
  totalCount: number;
}