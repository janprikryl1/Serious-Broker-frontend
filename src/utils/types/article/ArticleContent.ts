export type ArticleContent = {
    title: string;
    description: string;
    subjects: {
        title: string;
        text: string;
    }[];
    content: {
        title: string;
        taskData: {
            image: string;
            text: string;
            animate?: {
                from: { x: number; y: number };
                to: { x: number; y: number };
            };
        }[];
    }[];
};