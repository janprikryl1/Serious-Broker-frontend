import { api } from "@/utils/api/axiosInstance.ts"
import type {
  CategorizedQuestions,
  EvaluationCategory,
  QuestionEvaluationType,
  UserLiteType,
} from "@/utils/types/forms.ts"

export const getAllQuestions = async (): Promise<CategorizedQuestions> => {
  const res = await api.get<CategorizedQuestions>(
    "form_questions/get_questions.php"
  )
  return res.data
}

export const saveQuestion = async (formData: FormData) => {
  const res = await api.post("form_questions/save_question.php", formData)
  return res.data
}

export const deleteQuestion = async (id: number) => {
  const res = await api.post("form_questions/delete_question.php", { id })
  return res.data
}

export const resetUserResponses = async (userId: string | number) => {
  const res = await api.post("form_questions/reset_user_answers.php", {
    user_id: userId,
  })
  return res.data
}

export const resetOldResponses = async () => {
  const res = await api.post("form_questions/reset_one_year_answers.php", {})
  return res.data
}

export const saveOrder = async (
  newOrder: { id: number; order: number; category: string }[]
) => {
  const res = await api.post("form_questions/save_order.php", newOrder)
  return res.data
}

export const getUserLites = async (): Promise<UserLiteType[]> => {
  const res = await api.get<UserLiteType[]>("form_questions/get_users.php")
  return res.data
}

export const getUserQuestions = async (
  userId: string | number
): Promise<QuestionEvaluationType> => {
  const res = await api.get<QuestionEvaluationType>(
    "form_questions/get_user_responses.php",
    {
      params: { user_id: userId },
    }
  )
  return res.data
}

export const getFormSettings = async (): Promise<EvaluationCategory[]> => {
  const res = await api.get<EvaluationCategory[]>(
    "form_questions/get_evaluation_categories.php"
  )
  return res.data
}

export const saveFormSettings = async (settings: EvaluationCategory[]) => {
  const res = await api.post(
    "form_questions/save_evaluation_category.php",
    settings
  )
  return res.data
}

export const deleteFormSetting = async (id: number) => {
  const res = await api.post("form_questions/delete_evaluation_category.php", {
    id,
  })
  return res.data
}
