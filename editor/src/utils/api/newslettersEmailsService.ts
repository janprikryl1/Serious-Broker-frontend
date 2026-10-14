import { api } from "./axiosInstance.ts"

export const getNewslettersEmailsService = async () => {
  return await api.get<string[]>("article/article_post/get_emails.php")
}
