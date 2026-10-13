import { api } from "./axiosInstance.ts";
import {ImageListItemDto} from "../types/article/ImageListItemDto.ts";

export const uploadImage = async (bodyFormData: FormData) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.post<string>("article/upload_image.php", {
        image: bodyFormData.get("image") as File,
    });
};

export const getImages = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await api.get<ImageListItemDto[]>("article/images.php");
};
