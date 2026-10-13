import { api } from "./axiosInstance.ts";
import {ArticlePost, ArticlePostListResponse} from "../types/article/ArticlePostListResponse.ts";

export const getArticlePosts = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.get<ArticlePostListResponse>("article/article_post/posts.php", {
        params: {
            $article_id: id
        }
    });
}

export const getArticlePostDetail = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.get<ArticlePost>("article/article_post/post.php", {
        params: {
            id: id
        }
    });
}

export const createPost = async (post: ArticlePost) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.post("article/article_post/post.php", post);
}