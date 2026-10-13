import { api } from "./axiosInstance.ts";
import {GlossaryType} from "../types/article/GlossaryType.ts";

export const getGlossary = async () => {
    const res = api.get<GlossaryType[]>("glossary/get_all_glossaries.php");
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
        return await api.post(`glossary/glossary_edit.php`, formData);
    } catch (error) {
        console.error("Error updating glossary:", error);
        throw error;
    }
};



export const deleteGlossary = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const response = api.delete(`glossary/glossary_edit.php`, {
        params: {
            id: id,
        }
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

    return await api.post(`glossary/glossary_add.php`, formData);
};

export const getGlossaryByName = async (title: string) => {
    return await api.get<GlossaryType>("glossary/get_glossary_by_name.php", {
        params: {
            title: title,
        }
    });
}