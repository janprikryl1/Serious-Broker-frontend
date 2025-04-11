import axios from "axios";
import {backendUrl} from "../../env.ts";
import {ArticlePost, ArticlePostListResponse} from "../types/ArticlePostListResponse.ts";

export const getArticlePosts = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.get<ArticlePostListResponse>(backendUrl + "article/article_post/posts.php", {
        params: {
            $article_id: id
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getArticlePostDetail = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.get<ArticlePost>(backendUrl + "article/article_post/post.php", {
        params: {
            id: id
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const createPost = async (post: ArticlePost) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.post(backendUrl + "article/article_post/post.php", post, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}