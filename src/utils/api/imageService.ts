import axios from 'axios';
import {backendUrl} from "../../env.ts";
import {ImageListItemDto} from "../types/article/ImageListItemDto.ts";

export const uploadImage = async (bodyFormData: FormData) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.post<string>(backendUrl + "article/upload_image.php", {
        image: bodyFormData.get("image") as File,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }
    });
};

export const getImages = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await axios.get<ImageListItemDto[]>(backendUrl + "article/images.php", {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};
