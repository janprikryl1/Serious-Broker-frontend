import { api } from "./axiosInstance.ts";
import {TranslateEditLoadType} from "../types/article/translate/TranslateEditLoadType.ts";
import {ArticleNewTranslateEditType, ArticleTranslateEditType} from "../types/article/translate/ArticleTranslateEditType.ts";
import {ArticleDetailProps} from "../types/article/ArticleDetailProps.ts";
import {TranslateReturnType} from "../types/admin/TranslateReturnType.ts";

export const getArticleTranslateByIdAdmin = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await api.get<TranslateEditLoadType>("article/edit_translate.php?id=" + id);
}

export const createTranslation = async (article: ArticleNewTranslateEditType) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.post("article/edit_translate.php", article);
}

export const updateTranslation = async (article: ArticleTranslateEditType) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.put("article/edit_translate.php", article);
}

export const deleteTranslation = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.delete("article/edit_translate.php?id=" + id);
}

export const translate = async (text: string, target_lang: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.post<TranslateReturnType>("article/translate.php", {
        text: text,
        target_lang: target_lang
    });
}

export const getTranslatedArticle = async (id: string, language: string) => {
    return await api.get<ArticleDetailProps>("article/translated_article.php?id=" + id + "&language=" + language);
}