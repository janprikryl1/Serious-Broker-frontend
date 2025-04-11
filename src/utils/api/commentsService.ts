import axios from "axios";
import {backendUrl} from "../../env.ts";

export const getArticleComments = async (articleId: number) => {
    return await axios.get(backendUrl + "article/comments/get_article_comments.php", {
        params: {
            articleId: articleId
        }
    });
}

export const addArticleComment = async (articleId: number, comment: string) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await axios.post(backendUrl + "article/comments/add_article_comment.php", {
            articleId: articleId,
            text: comment,
        }, {
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
    });
}