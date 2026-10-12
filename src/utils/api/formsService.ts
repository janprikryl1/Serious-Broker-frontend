import {CategorizedQuestions} from "../types/admin/Question.ts";
import { api } from "./axiosInstance.ts";
import {UserLiteType} from "../types/user/UserLiteType.ts";
import {QuestionEvaluationType} from "../types/admin/QuestionResponseUserType.ts";

export const getAllQuestions = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return api.get<CategorizedQuestions>(`form_questions/get_questions.php`);
}

export const saveQuestion = async (formData: FormData) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return api.post(`form_questions/save_question.php`, formData);
};

export const deleteQuestion = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return api.post(`form_questions/delete_question.php`, {
        id: id
    });
}

export const resetUserResponses = async (userId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return api.post(`form_questions/reset_user_answers.php`, {
        user_id: userId
    });
}

export const resetOldResponses = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return api.post(`form_questions/reset_one_year_answers.php`, {});
}

export const saveOrder = async (newOrder: { id: number; order: number; category: string }[]) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return api.post(`form_questions/save_order.php`, newOrder);
};

export const getUserLites = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return api.get<UserLiteType[]>(`form_questions/get_users.php`);
}

export const getUserQuestions = async (userId: string) => {
    return api.get<QuestionEvaluationType>(`form_questions/get_user_responses.php`, {
        params: {
            user_id: userId
        }
    });
}

export const saveUserResponses = async (responses: any) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return api.post(`form_questions/submit_user_response.php`, responses);
}

export const getFormSettings = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return api.get(`form_questions/get_evaluation_categories.php`);
}

export const saveFormSettings = async (settings: any) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return api.post(`form_questions/save_evaluation_category.php`, settings);
}

export const deleteFormSetting = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return api.post(`form_questions/delete_evaluation_category.php`, { id });
};
