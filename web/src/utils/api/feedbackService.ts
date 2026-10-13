import { api } from "./axiosInstance.ts";
import {FeedbackType} from "../types/feedback/FeedbackType.ts";
import {FeedbackStoredType} from "../types/feedback/FeedbackStoredType.ts"
import {ResponseType} from "../types/ResponseType.ts";

export const addFeedback = async (formData: FeedbackType) => {
    return await api.post<ResponseType>("/feedback/add_feedback.php", formData);
}

export const getAllFeedbacks = async (page: number, pageSize: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await api.get<{data: FeedbackStoredType[]; totalPages: number}>("/feedback/feedbacks.php", {
        
        params: {
            page,
            pageSize,
        },
    });
};
