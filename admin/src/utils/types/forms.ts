export const QuestionType = {
  select: "select",
  text: "text",
  number: "number",
  boolean: "boolean",
  date: "date",
  radio: "radio",
  checkbox: "checkbox",
} as const

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType]

export type QuestionOption = {
  text: string
  points?: number
  explanation?: string
}

export type Question = {
  id: number
  question_text: string
  description: string | null
  image_url: string | null
  type: QuestionType
  required: boolean
  order: number
  options: QuestionOption[] | null
}

export type CategorizedQuestions = {
  "Jaký jsem investor": Question[]
  "Jak znám krypto": Question[]
  "Co mám nakupovat": Question[]
}

export type EvaluationCategory = {
  id?: number
  name: string
  description: string
  min_score: number
  max_score: number
}

export type UserLiteType = {
  id: number
  firstname: string
  surname: string
  email: string
}

export type QuestionAnswerDetail = {
  question: string
  answer: string
  points: number
  explanation: string | null
}

export type QuestionEvaluationType = {
  user_id: number
  response_id: number
  scores_by_category: Record<string, number>
  total_score: number
  evaluation: {
    name: string
    description: string
  }
  detailed_answers: Record<string, QuestionAnswerDetail[]>
}
