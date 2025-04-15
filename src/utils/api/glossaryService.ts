import axios from "axios";
import {backendUrl} from "../../env.ts";
import {GlossaryType} from "../types/article/GlossaryType.ts";

export const getGlossary = async () => {
    const res = axios.get<GlossaryType[]>(backendUrl+"glossary/get_all_glossaries.php");
    return await res;
};

export const editGlossary = async (glossary: GlossaryType, file: File | null) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("User is not authenticated");
    }

    const formData = new FormData();
    formData.append("id", glossary.id.toString());
    formData.append("title", glossary.title);
    formData.append("title_cs", glossary.title_cs);
    formData.append("answer", glossary.answer);
    formData.append("answer_cs", glossary.answer_cs);

    if (file) {
        formData.append("photo", file);
    }

    try {
        return await axios.post(`${backendUrl}glossary/glossary_edit.php`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error updating glossary:", error);
        throw error;
    }
};



export const deleteGlossary = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const response = axios.delete(`${backendUrl}glossary/glossary_edit.php`, {
        params: {
            id: id,
        },
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return await response;
};

export const addGlossary = async (glossary: Partial<GlossaryType & { imageFile?: File | null }>) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("title", glossary.title || "");
    formData.append("title_cs", glossary.title_cs || "");
    formData.append("answer", glossary.answer || "");
    formData.append("answer_cs", glossary.answer_cs || "");
    if (glossary.imageFile) {
        formData.append("image", glossary.imageFile);
    }

    return await axios.post(`${backendUrl}glossary/glossary_add.php`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getGlossaryByName = async (title: string) => {
    return await axios.get<GlossaryType>(backendUrl + "glossary/get_glossary_by_name.php", {
        params: {
            title: title,
        }
    });
}