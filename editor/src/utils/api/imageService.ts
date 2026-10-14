import { api } from "./axiosInstance.ts"
import type { ImageListItemDto } from "@/utils/types/article.ts"

export const uploadImage = async (bodyFormData: FormData) => {
  return await api.post<string>("article/upload_image.php", {
    image: bodyFormData.get("image") as File,
  })
}

export const getImages = async () => {
  return await api.get<ImageListItemDto[]>("article/images.php")
}
