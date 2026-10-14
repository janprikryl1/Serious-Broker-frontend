import { api } from "@/utils/api/axiosInstance.ts"
import type { FeedbackStoredType } from "@/utils/types/feedback.ts"

export const getAllFeedbacks = async (
  page: number,
  pageSize: number
): Promise<{ data: FeedbackStoredType[]; totalPages: number }> => {
  const res = await api.get<{
    data: FeedbackStoredType[]
    totalPages: number
  }>("/feedback/feedbacks.php", {
    params: {
      page,
      pageSize,
    },
  })
  return res.data
}
