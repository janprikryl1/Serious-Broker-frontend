import {HighlightType} from "../utils/types/highlights/HighlightType.ts";
import axios from "axios";
import {backendUrl} from "../env.ts";

export const getHighlights = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.get(`${backendUrl}highlights/all_highlights.php`, {
        headers: {
            Authorization2: `Bearer ${token}`        
        }
    });
}

export const getRandomHighlight = async () => {
    return await axios.get(`${backendUrl}highlights/random_highlight.php`);
}

export const getHighlightById = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await axios.get(`${backendUrl}highlights/highlight.php?id=${id}`, {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
}

export const createHighlight = async (data: HighlightType) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await axios.post(`${backendUrl}highlights/highlight.php`, data, {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
}

export const updateExistingHighlight = async (id: string, data: HighlightType) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await axios.put(`${backendUrl}highlights/highlight.php?id=${id}`, data, {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
}

export const deleteHighlight = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await axios.delete(`${backendUrl}highlights/highlight.php?id=${id}`, {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
}