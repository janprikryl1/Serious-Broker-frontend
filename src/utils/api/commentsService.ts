import { api } from "./axiosInstance.ts";

export const getArticleComments = async (articleId: number) => {
    return await api.get("article/comments/get_article_comments.php", {
        params: {
            articleId: articleId
        }
    });
}

export const addArticleComment = async (articleId: number, comment: string) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await api.post("article/comments/add_article_comment.php", {
            articleId: articleId,
            text: comment,
        });
}