import axios from "axios";
import {backendUrl} from "../env.ts";

export const getArticleComments = async (articleId: number) => {
    const res = axios.get(backendUrl + "article/comments/get_article_comments.php", {
        params: {
            articleId: articleId
        }
    });
    return await res;
}

export const addArticleComment = async (articleId: number, comment: string) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    const res = axios.post(backendUrl + "article/comments/add_article_comment.php", {
            articleId: articleId,
            text: comment,
        }, {
            headers:{
                Authorization2: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
    });
    return await res;
}