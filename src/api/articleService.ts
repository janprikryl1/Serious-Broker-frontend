import axios from "axios";
import {backendUrl} from "../env.ts";
import {
    ArticleCreateProps,
    ArticleDetailProps,
    ArticleProps,
    ArticleUpdateProps
} from "../utils/types/article/ArticleProps";


export const getArticleDetails = async (id: string) => {
    //const token = localStorage.getItem("token");
    //if(!token) return;

    const res = axios.get<ArticleDetailProps[]>(backendUrl+"article/article_by_id.php",{
        params:{
            id: id,
        },
      /*  headers:{
            Authorization: `Bearer ${token}`,
        },*/
    });

    return await res;
}

export const getAllArticles = async () => {
    //const token = localStorage.getItem("token");

    const res = axios.get<ArticleProps[]>(backendUrl+"/article/articles.php",{
        /*headers:{
            Authorization: `Bearer ${token}`,
        },*/
    });

    return await res;
}

export const createArticle = async (article: ArticleCreateProps) => {
    console.log(article);
    /*const token = localStorage.getItem("token");
    if(!token) return;

    const res = axios.post<ArticleProps>(createArticleAPI, article, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });

    return await res;*/
}

//TODO: update article
export const updateArticle = async (article: ArticleProps) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = axios.put<ArticleUpdateProps>("/api/update_article", article, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return await res;
}
