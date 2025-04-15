import axios from "axios";
import {backendUrl} from "../../env.ts";
import {ArticleDetailProps} from "../types/article/ArticleDetailProps.ts";
import {ArticleProps} from "../types/article/ArticleProps.ts";
import {RecentArticleProps} from "../types/article/RecentArticleProps.ts";
import {ArticleCreateProps} from "../types/article/ArticleCreateProps.ts";
import {ArticleUpdateType} from "../types/article/ArticleUpdateType.ts";
import {TranslationsOverview} from "../types/article/translate/TranslationsOverview.ts";

export const getArticleDetails = async (id: string) => {
    const token = localStorage.getItem("token");
    return await axios.get<{article: ArticleDetailProps; translations: TranslationsOverview[]}>(backendUrl+"article/article_by_id.php",{
        params:{
            id: id,
        },
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
}

export const getAllArticles = async (page: number) => {
    const token = localStorage.getItem("token");

    return await axios.get<{totalPages: number; data: ArticleProps[]}>(backendUrl+"/article/articles.php",{
        params:{
            page: page,
        },
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
}

export const getRecentArticles = async () => {
    const token = localStorage.getItem("token");
    return await axios.get<RecentArticleProps[]>(backendUrl+"/article/recent_articles.php", {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
}

export const getSearchArticles = async (text: string) => {
    const token = localStorage.getItem("token");
    return await axios.get<ArticleProps[]>(backendUrl+"/article/search_articles.php",{
        params:{
            text: text,
        },
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
}

export const createArticle = async (article: ArticleCreateProps) => {
    const token = localStorage.getItem("token");
    if(!token) return;

    return await axios.post<{message:string;article_id:number}>(backendUrl+"/article/edit_article.php", article, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
}

export const getAllArticlesAdmin = async (page: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await axios.get<{totalPages: number; data: ArticleProps[]}>(backendUrl+"/article/admin_get_all_articles.php",{
        params:{
            page: page,
        },
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
}

export const getArticleByIdAdmin = async (id: string) => {
    const token = localStorage.getItem("token");
    if(!token) return;

    return await axios.get<ArticleDetailProps>(backendUrl+"/article/edit_article.php",{
        params:{
            id: id,
        },
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
}

export const updateArticle = async (article: ArticleUpdateType) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await axios.put<{message:string}>(backendUrl+"/article/edit_article.php", article, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export const deleteArticle = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await axios.delete<{message:string}>(backendUrl+"/article/edit_article.php",{
        params:{
            id: id,
        },
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
}