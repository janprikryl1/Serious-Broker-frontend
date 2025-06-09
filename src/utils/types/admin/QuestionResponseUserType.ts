import {QuestionType} from "./Question.ts";

export type QuestionResponseUserType = {
    question_id: number;
    question_text: string;
    type: QuestionType;
    value?: string;
}