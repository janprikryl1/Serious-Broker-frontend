import { api } from "./axiosInstance.ts";
import {ArticleDetailProps} from "../types/article/ArticleDetailProps.ts";
import {TranslationsOverview} from "../types/article/translate/TranslationsOverview.ts";

export const getTranslations = async (articleId: string) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await api.get<{article: ArticleDetailProps; translations: TranslationsOverview[]}>("article/admin_translations.php",{
        params:{
            articleId: articleId,
        }
    });
}