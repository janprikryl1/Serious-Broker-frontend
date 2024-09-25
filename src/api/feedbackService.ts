import axios from "axios";
import {backendUrl} from "../env.ts";
import {FeedbackType} from "../utils/types/feedback/FeedbackType.ts";
import {ResponseType} from "../utils/types/ResponseType.ts";
import {FeedbackStoredType} from "../utils/types/feedback/FeedbackStoredType.ts";

export const addFeedback = async (formData: FeedbackType) => {
    return await axios.post<ResponseType>(backendUrl + "/feedback/add_feedback.php", formData);
}

export const getAllFeedbacks = async (page: number, pageSize: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await axios.get<{data: FeedbackStoredType[]; totalPages: number}>(backendUrl + "/feedback/feedbacks.php", {
        headers: {
            Authorization2: `Bearer ${token}`,
        },
        params: {
            page,
            pageSize,
        },
    });
};
