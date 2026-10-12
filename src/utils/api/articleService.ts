import { api } from "./axiosInstance.ts";
import {ArticleDetailProps} from "../types/article/ArticleDetailProps.ts";
import {ArticleProps} from "../types/article/ArticleProps.ts";
import {RecentArticleProps} from "../types/article/RecentArticleProps.ts";
import {ArticleCreateProps} from "../types/article/ArticleCreateProps.ts";
import {ArticleUpdateType} from "../types/article/ArticleUpdateType.ts";
import {TranslationsOverview} from "../types/article/translate/TranslationsOverview.ts";

export const getArticleDetails = async (id: string) => {
    return await api.get<{article: ArticleDetailProps; translations: TranslationsOverview[]}>("article/article_by_id.php",{
        params:{
            id: id,
        }
    });
}

export const getAllArticles = async (page: number) => {

    return await api.get<{totalPages: number; data: ArticleProps[]}>("/article/articles.php",{
        params:{
            page: page,
        }
    });
}

export const getRecentArticles = async () => {
    return await api.get<RecentArticleProps[]>("/article/recent_articles.php");
}

export const getSearchArticles = async (text: string) => {
    return await api.get<ArticleProps[]>("/article/search_articles.php",{
        params:{
            text: text,
        }
    });
}

export const createArticle = async (article: ArticleCreateProps) => {
    const token = localStorage.getItem("token");
    if(!token) return;

    return await api.post<{message:string;article_id:number}>("/article/edit_article.php", article);
}

export const getAllArticlesAdmin = async (page: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await api.get<{totalPages: number; data: ArticleProps[]}>("/article/admin_get_all_articles.php",{
        params:{
            page: page,
        }
    });
}

export const getArticleByIdAdmin = async (id: string) => {
    const token = localStorage.getItem("token");
    if(!token) return;

    return await api.get<ArticleDetailProps>("/article/edit_article.php",{
        params:{
            id: id,
        }
    });
}

export const updateArticle = async (article: ArticleUpdateType) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await api.put<{message:string}>("/article/edit_article.php", article);
}

export const deleteArticle = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await api.delete<{message:string}>("/article/edit_article.php",{
        params:{
            id: id,
        }
    });
}