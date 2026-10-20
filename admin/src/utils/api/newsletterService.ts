import { api } from "@/utils/api/axiosInstance.ts"
import type { NewsletterType } from "@/utils/types/newsletter.ts"

export const getAllNewsletters = async (): Promise<NewsletterType[]> => {
  const res = await api.get<NewsletterType[]>("newsletter/newsletters.php")
  return res.data
}
