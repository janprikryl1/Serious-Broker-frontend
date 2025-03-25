import axios from "axios";
import {backendUrl} from "../../env.ts";
import {NewsletterType} from "../types/NewslwtterType.ts";
import {ResponseType} from "../types/ResponseType.ts";

export const addNewsletter = async (formData: {email: string}) => {
    return await axios.post<ResponseType>(backendUrl + "newsletter/add_newsletter.php", formData);
}

export const getAllNewsletters = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await axios.get<NewsletterType[]>(backendUrl + "newsletter/newsletters.php", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}