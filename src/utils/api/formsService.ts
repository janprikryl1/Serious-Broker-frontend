import {Question} from "../types/admin/Question.ts";
import axios from "axios";
import {backendUrl} from "../../env.ts";

export const getAllQuestions = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return axios.get<Question[]>(`${backendUrl}/form_questions/get_questions.php`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const addNewQuestion = async (question: Question) => {
    
}

export const saveQuestion = async (question: Question) => {
    
}

export const saveOrder = async (newOrder: Record<number, number>) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return axios.post(`${backendUrl}/form_questions/save_order.php`, newOrder, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const getUserQuestions = async (userId: number) => {
    
}

export const isFormFilled = async () => {
    
}

export const saveForm = async (formData: FormData) => {
    
}