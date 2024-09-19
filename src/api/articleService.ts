import axios from "axios";
import {backendUrl} from "../env.ts";
import {ArticleProps} from "../utils/types/article/ArticleProps";
import {RecentArticleProps} from "../utils/types/article/RecentArticleProps.ts";
import {ArticleDetailProps} from "../utils/types/article/ArticleDetailProps.ts";
import {ArticleCreateProps} from "../utils/types/article/ArticleCreateProps.ts";
import {ArticleUpdateProps} from "../utils/types/article/ArticleUpdateProps.ts";


export const getArticleDetails = async (id: string) => {
    //const token = localStorage.getItem("token");
    //if(!token) return;

    const res = axios.get<ArticleDetailProps>(backendUrl+"article/article_by_id.php",{
        params:{
            id: id,
        },
      /*  headers:{
            Authorization: `Bearer ${token}`,
        },*/
    });

    return await res;
}

export const getAllArticles = async (page: number) => {
    const token = localStorage.getItem("token");

    const res = axios.get<{totalPages: number; data: ArticleProps[]}>(backendUrl+"/article/articles.php",{
        params:{
            page: page,
        },
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });

    return await res;
}

export const getRecentArticles = async () => {
    const res = axios.get<RecentArticleProps[]>(backendUrl+"/article/recent_articles.php");
    return await res;
}

export const getSearchArticles = async (text: string) => {
    const res = axios.get<ArticleProps[]>(backendUrl+"/article/search_articles.php",{
        params:{
            text: text,
        },
    });

    return await res;
}

export const createArticle = async (article: ArticleCreateProps) => {
    const token = localStorage.getItem("token");
    if(!token) return;

    const res = axios.post<ArticleProps>(backendUrl+"/article/edit_article.php", article, {
        headers:{
            Authorization2: `Bearer ${token}`,
        },
    });

    return await res;
}

export const getArticleByIdAdmin = async (id: string) => {
    const token = localStorage.getItem("token");
    if(!token) return;

    const res = axios.get<ArticleDetailProps>(backendUrl+"/article/edit_article.php",{
        params:{
            id: id,
        },
        headers:{
            Authorization2: `Bearer ${token}`,
        },
    });

    return await res;
}

//TODO: update article
export const updateArticle = async (article: ArticleProps) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = axios.put<ArticleUpdateProps>("/api/update_article", article, {
        headers: {
            Authorization2: `Bearer ${token}`,
        },
    });

    return await res;
}
