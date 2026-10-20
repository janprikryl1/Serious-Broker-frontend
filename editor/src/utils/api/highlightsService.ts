import { api } from "./axiosInstance.ts"
import type { HighlightType } from "@/utils/types/highlight.ts"

export const getHighlights = async () => {
  return await api.get<HighlightType[]>("highlights/all_highlights.php")
}

export const getHighlightById = async (id: string | number) => {
  return await api.get<HighlightType>(`highlights/highlight.php?id=${id}`)
}

export const createHighlight = async (data: HighlightType) => {
  return await api.post("highlights/highlight.php", data)
}

export const updateExistingHighlight = async (
  id: string | number,
  data: HighlightType
) => {
  return await api.put(`highlights/highlight.php?id=${id}`, data)
}

export const deleteHighlight = async (id: number) => {
  return await api.delete(`highlights/highlight.php?id=${id}`)
}
