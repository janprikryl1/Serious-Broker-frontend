import {Question} from "../types/admin/Question.ts";
import axios from "axios";
import {backendUrl} from "../../env.ts";
import {UserLiteType} from "../types/user/UserLiteType.ts";
import {QuestionResponseUserType} from "../types/admin/QuestionResponseUserType.ts";

export const getAllQuestions = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return axios.get<Question[]>(`${backendUrl}/form_questions/get_questions.php`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const saveQuestion = async (question: Question) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return axios.post(`${backendUrl}/form_questions/save_question.php`, question, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const deleteQuestion = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return axios.post(`${backendUrl}/form_questions/delete_question.php`, {
        id: id
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const saveOrder = async (newOrder:  { id: number; order: number; }[]) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return axios.post(`${backendUrl}/form_questions/save_order.php`, newOrder, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const getUserLites = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return axios.get<UserLiteType[]>(`${backendUrl}/form_questions/get_users.php`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const getUserQuestions = async (userId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return axios.get<QuestionResponseUserType[]>(`${backendUrl}/form_questions/get_user_responses.php`, {
        params: {
            user_id: userId
        },
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const isFormFilled = async () => {
    
}
