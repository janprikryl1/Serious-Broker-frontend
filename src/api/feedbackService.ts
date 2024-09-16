import axios from "axios";
import {backendUrl} from "../env.ts";
import {FeedbackType} from "../utils/types/feedback/FeedbackType.ts";
import {ResponseType} from "../utils/types/ResponseType.ts";

export const addFeedback = async (formData: FeedbackType) => {
    return await axios.post<ResponseType>(backendUrl + "/feedback/add_feedback.php", formData);
}