export type ArticleContent = {
    title: string;
    tasks: {
        id: number;
        image: string;
        task: string;
        animateTo: {
            from: { x: number; y: number };
            to: { x: number; y: number };
        };
    }[];
};