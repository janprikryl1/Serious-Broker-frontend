import axios from "axios";
import {backendUrl} from "../env.ts";
import {TranslateReturnType} from "../utils/types/TranslateReturnType.ts";
import {ArticleNewTranslateEditType, ArticleTranslateEditType} from "../utils/types/article/translate/ArticleTranslateEditType.ts";
import {TranslateEditLoadType} from "../utils/types/article/translate/TranslateEditLoadType.ts";
import {ArticleDetailProps} from "../utils/types/article/ArticleDetailProps.ts";

export const getArticleTranslateByIdAdmin = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await axios.get<TranslateEditLoadType>(backendUrl + "article/edit_translate.php?id=" + id, {
        headers:{
            Authorization2: `Bearer ${token}`,
        },
    });
    return res;
}

export const createTranslation = async (article: ArticleNewTranslateEditType) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.post(backendUrl + "article/edit_translate.php", article, {
        headers:{
            Authorization2: `Bearer ${token}`,
        },
    });
}

export const updateTranslation = async (article: ArticleTranslateEditType) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.put(backendUrl + "article/edit_translate.php", article, {
        headers:{
            Authorization2: `Bearer ${token}`,
        },
    });
}

export const deleteTranslation = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.delete(backendUrl + "article/edit_translate.php?id=" + id, {
        headers:{
            Authorization2: `Bearer ${token}`,
        },
    });
}

export const translate = async (text: string, target_lang: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.post<TranslateReturnType>(backendUrl + "article/translate.php", {
        text: text,
        target_lang: target_lang
    }, {
        headers:{
            Authorization2: `Bearer ${token}`,
        },
    });
}

export const getTranslatedArticle = async (id: string, language: string) => {
    return await axios.get<ArticleDetailProps>(backendUrl + "article/translated_article.php?id=" + id + "&language=" + language);
}