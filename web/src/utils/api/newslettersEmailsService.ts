import { api } from "./axiosInstance.ts";

export const getNewslettersEmailsService = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await api.get("article/article_post/get_emails.php");
}