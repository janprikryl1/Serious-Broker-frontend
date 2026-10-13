export type QuestionAnswerDetail = {
    question: string;
    answer: string;
    points: number;
    explanation: string | null;
};

export type QuestionEvaluationType = {
    user_id: number;
    response_id: number;
    scores_by_category: Record<string, number>;
    total_score: number;
    evaluation: {
        name: string;
        description: string;
    };
    detailed_answers: Record<string, QuestionAnswerDetail[]>;
};
