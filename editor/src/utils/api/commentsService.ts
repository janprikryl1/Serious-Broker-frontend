import { api } from "./axiosInstance.ts"
import type { CommentType } from "@/utils/types/article.ts"

export const getArticleComments = async (articleId: number) => {
  return await api.get<CommentType[]>("article/comments/get_article_comments.php", {
    params: {
      articleId,
    },
  })
}

export const addArticleComment = async (articleId: number, comment: string) => {
  return await api.post("article/comments/add_article_comment.php", {
    articleId,
    text: comment,
  })
}
