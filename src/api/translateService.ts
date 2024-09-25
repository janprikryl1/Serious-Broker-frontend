import axios from "axios";
import {backendUrl} from "../env.ts";
import {TranslateReturnType} from "../utils/types/TranslateReturnType.ts";

export const getArticleTranslateByIdAdmin = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await axios.get(backendUrl + "" + id, {
        headers: {
            "Content-Type": "application/json",
            Authorization2: `Bearer ${token}`
        }
    });
    return res.data;
}

export const translate = async (text: string, target_lang: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.post<TranslateReturnType>(backendUrl + "article/translate.php", {
        text: text,
        target_lang: target_lang
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization2: `Bearer ${token}`
        }
    });
}