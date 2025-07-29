export type QuestionOption = {
    text: string;
    points?: number;
    explanation?: string;
};

export type Question = {
    id: number;
    question_text: string;
    description: string | null;
    image_url: string | null;
    type: QuestionType;
    required: boolean;
    order: number;
    options: QuestionOption[] | null;
};

export enum QuestionType {
    select = "select",
    text = "text",
    number = "number",
    boolean = "boolean",
    date = "date",
    radio = "radio",
    checkbox = "checkbox",
}

export type CategorizedQuestions = {
    "Jaký jsem investor": Question[];
    "Jak znám krypto": Question[];
    "Co mám nakupovat": Question[];
};
