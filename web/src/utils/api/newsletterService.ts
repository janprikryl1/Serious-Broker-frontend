import { api } from "./axiosInstance.ts";
import {ResponseType} from "../types/ResponseType.ts";
import {NewsletterType} from "../types/admin/NewslwtterType.ts";

export const addNewsletter = async (formData: {email: string}) => {
    return await api.post<ResponseType>("newsletter/add_newsletter.php", formData);
}

export const getAllNewsletters = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await api.get<NewsletterType[]>("newsletter/newsletters.php");
}