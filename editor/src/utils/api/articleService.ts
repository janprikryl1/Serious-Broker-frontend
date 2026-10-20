import { api } from "./axiosInstance.ts"
import type {
  ArticleCreateProps,
  ArticleDetailProps,
  ArticleProps,
  ArticleUpdateType,
  TranslationsOverview,
} from "@/utils/types/article.ts"

export const getAllArticlesAdmin = async (page: number) => {
  return await api.get<{ totalPages: number; data: ArticleProps[] }>(
    "/article/admin_get_all_articles.php",
    {
      params: { page },
    }
  )
}

export const getArticleByIdAdmin = async (id: string | number) => {
  return await api.get<ArticleDetailProps>("/article/edit_article.php", {
    params: { id },
  })
}

export const getArticleDetails = async (id: string | number) => {
  return await api.get<{
    article: ArticleDetailProps
    translations: TranslationsOverview[]
  }>("article/article_by_id.php", {
    params: { id },
  })
}

export const createArticle = async (article: ArticleCreateProps) => {
  return await api.post<{ message: string; article_id: number }>(
    "/article/edit_article.php",
    article
  )
}

export const updateArticle = async (article: ArticleUpdateType) => {
  return await api.put<{ message: string }>("/article/edit_article.php", article)
}

export const deleteArticle = async (id: number) => {
  return await api.delete<{ message: string }>("/article/edit_article.php", {
    params: { id },
  })
}
