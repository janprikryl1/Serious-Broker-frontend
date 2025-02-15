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

export const getHighlightById = async (id: number) => {
    return await axios.get(`${backendUrl}highlights/get_highlight_by_id.php?id=${id}`);
}

export const createHighlight = async (data: HighlightType) => {
    
}

export const updateHighlight = async (id: number, data: HighlightType) => {
    
}

export const deleteHighlight = async (id: number) => {
    
}