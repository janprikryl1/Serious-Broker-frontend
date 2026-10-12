import { api } from "./axiosInstance.ts";
import {HighlightType} from "../types/highlights/HighlightType.ts";

export const getHighlights = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.get(`highlights/all_highlights.php`);
}

export const getRandomHighlight = async () => {
    return await api.get(`highlights/random_highlight.php`);
}

export const getHighlightById = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await api.get(`highlights/highlight.php?id=${id}`);
}

export const createHighlight = async (data: HighlightType) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await api.post(`highlights/highlight.php`, data);
}

export const updateExistingHighlight = async (id: string, data: HighlightType) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await api.put(`highlights/highlight.php?id=${id}`, data);
}

export const deleteHighlight = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await api.delete(`highlights/highlight.php?id=${id}`);
}