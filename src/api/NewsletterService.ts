import axios from "axios";
import {backendUrl} from "../env.ts";
import {ResponseType} from "../utils/types/ResponseType.ts";

export const addNewsletter = async (formData: {email: string}) => {
    return await axios.post<ResponseType>(backendUrl + "/newsletter/add_newsletter.php", formData);
}