import axios from "axios";
import {backendUrl} from "../env.ts";
import {ResponseType} from "../utils/types/ResponseType.ts";
import {NewsletterType} from "../utils/types/NewslwtterType.ts";

export const addNewsletter = async (formData: {email: string}) => {
    return await axios.post<ResponseType>(backendUrl + "newsletter/add_newsletter.php", formData);
}

export const getAllNewsletters = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await axios.get<NewsletterType[]>(backendUrl + "newsletter/newsletters.php", {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
}