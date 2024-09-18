import axios from "axios";
import {GlossaryType} from "../utils/types/GlossaryType.ts";
import {backendUrl} from "../env.ts";

export const getGlossary = async () => {
    const res = axios.get<GlossaryType[]>(backendUrl+"glossary/get_all_glossaries.php");
    return await res;
};

export const editGlossary = async (glossary: GlossaryType) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const response = axios.put(backendUrl + "glossary/glossary_edit.php", {
            id: glossary.id,
            title: glossary.title, 
            title_cs: glossary.title_cs,
            answer: glossary.answer,
            answer_cs: glossary.answer_cs,
        },
        {
            headers: {
                Authorization2: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    return await response;
};

export const deleteGlossary = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const response = axios.delete(`${backendUrl}glossary/glossary_edit.php`, {
        params: {
            id: id,
        },
        headers: {
            Authorization2: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return await response;
};


export const addGlossary = async (glossary: GlossaryType) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const res = axios.post<{data: GlossaryType, status: string; message: string}>(backendUrl+"glossary/glossary_add.php", {
            title: glossary.title,
            title_cs: glossary.title_cs,
            answer: glossary.answer,
            answer_cs: glossary.answer_cs,
        },
        {
            headers: {
                Authorization2: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    return await res;
};