import { api } from "@/utils/api/axiosInstance.ts"
import type { GlossaryType } from "@/utils/types/glossary.ts"

export const getGlossary = async (): Promise<GlossaryType[]> => {
  const res = await api.get<GlossaryType[]>("glossary/get_all_glossaries.php")
  return res.data
}

export const addGlossary = async (
  glossary: Partial<GlossaryType> & { imageFile?: File | null }
) => {
  const formData = new FormData()
  formData.append("title", glossary.title || "")
  formData.append("title_cs", glossary.title_cs || "")
  formData.append("answer", glossary.answer || "")
  formData.append("answer_cs", glossary.answer_cs || "")
  if (glossary.imageFile) {
    formData.append("image", glossary.imageFile)
  }

  const res = await api.post("glossary/glossary_add.php", formData)
  return res.data
}

export const editGlossary = async (
  glossary: GlossaryType,
  file: File | null
) => {
  const formData = new FormData()
  formData.append("id", glossary.id.toString())
  formData.append("title", glossary.title)
  formData.append("title_cs", glossary.title_cs)
  formData.append("answer", glossary.answer)
  formData.append("answer_cs", glossary.answer_cs)
  if (file) {
    formData.append("photo", file)
  }

  const res = await api.post("glossary/glossary_edit.php", formData)
  return res.data
}

export const deleteGlossary = async (id: number) => {
  const res = await api.delete("glossary/glossary_edit.php", {
    params: { id },
  })
  return res.data
}
