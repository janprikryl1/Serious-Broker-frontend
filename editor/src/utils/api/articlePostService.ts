import { api } from "./axiosInstance.ts"
import type {
  ArticlePost,
  ArticlePostListResponse,
} from "@/utils/types/article.ts"

export const getArticlePosts = async (id: string | number) => {
  return await api.get<ArticlePostListResponse>(
    "article/article_post/posts.php",
    {
      params: {
        $article_id: id,
      },
    }
  )
}

export const getArticlePostDetail = async (id: string | number) => {
  return await api.get<ArticlePost>("article/article_post/post.php", {
    params: {
      id,
    },
  })
}

export const createPost = async (post: ArticlePost) => {
  return await api.post<{ message: string; translateId?: string }>(
    "article/article_post/post.php",
    post
  )
}
