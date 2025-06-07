export type Question = {
    id: number,
    question_text: string,
    type: QuestionType,
    required: boolean,
    order: number,
    options?: string[],
}

export enum QuestionType {
    select = "select",
    text = 'text',
    number = 'number',
    boolean = 'boolean',
    date = 'date',
}