import axios from "axios";
import {FeedbackType} from "../types/feedback/FeedbackType.ts";
import {backendUrl} from "../../env.ts";
import {FeedbackStoredType} from "../types/feedback/FeedbackStoredType.ts"
import {ResponseType} from "../types/ResponseType.ts";

export const addFeedback = async (formData: FeedbackType) => {
    return await axios.post<ResponseType>(backendUrl + "/feedback/add_feedback.php", formData);
}

export const getAllFeedbacks = async (page: number, pageSize: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await axios.get<{data: FeedbackStoredType[]; totalPages: number}>(backendUrl + "/feedback/feedbacks.php", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page,
            pageSize,
        },
    });
};
