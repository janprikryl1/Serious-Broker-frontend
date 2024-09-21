import axios from "axios";
import {ArticleDetailProps} from "../utils/types/article/ArticleDetailProps.ts";
import {TranslationsOverview} from "../utils/types/article/TranslationsOverview.ts";
import {backendUrl} from "../env.ts";

export const getTranslations = async (articleId: string) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    const res = axios.get<{article: ArticleDetailProps; translations: TranslationsOverview[]}>(backendUrl+"article/admin_translations.php",{
        params:{
            articleId: articleId,
        },
        headers:{
            Authorization2: `Bearer ${token}`,
        },
    });

    return await res;
}