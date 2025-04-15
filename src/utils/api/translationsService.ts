import axios from "axios";
import {backendUrl} from "../../env.ts";
import {ArticleDetailProps} from "../types/article/ArticleDetailProps.ts";
import {TranslationsOverview} from "../types/article/translate/TranslationsOverview.ts";

export const getTranslations = async (articleId: string) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await axios.get<{article: ArticleDetailProps; translations: TranslationsOverview[]}>(backendUrl+"article/admin_translations.php",{
        params:{
            articleId: articleId,
        },
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
}