import { api } from "./axiosInstance.ts"
import type {
  ArticleDetailProps,
  ArticleNewTranslateEditType,
  ArticleTranslateEditType,
  TranslateEditLoadType,
  TranslateReturnType,
  TranslationsOverview,
} from "@/utils/types/article.ts"

export const getTranslations = async (articleId: string | number) => {
  return await api.get<{
    article: ArticleDetailProps
    translations: TranslationsOverview[]
  }>("article/admin_translations.php", {
    params: {
      articleId,
    },
  })
}

export const getArticleTranslateByIdAdmin = async (id: string | number) => {
  return await api.get<TranslateEditLoadType>(
    `article/edit_translate.php?id=${id}`
  )
}

export const createTranslation = async (
  article: ArticleNewTranslateEditType
) => {
  return await api.post<{ message?: string }>(
    "article/edit_translate.php",
    article
  )
}

export const updateTranslation = async (article: ArticleTranslateEditType) => {
  return await api.put<{ message?: string }>(
    "article/edit_translate.php",
    article
  )
}

export const deleteTranslation = async (id: number) => {
  return await api.delete<{ message?: string }>(
    `article/edit_translate.php?id=${id}`
  )
}

export const translateText = async (text: string, target_lang: string) => {
  return await api.post<TranslateReturnType>("article/translate.php", {
    text,
    target_lang,
  })
}
