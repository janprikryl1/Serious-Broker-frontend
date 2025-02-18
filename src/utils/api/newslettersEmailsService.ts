import axios from "axios";
import {backendUrl} from "../../env.ts";

export const getNewslettersEmailsService = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await axios.get(backendUrl + "article/article_post/get_emails.php", {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
}