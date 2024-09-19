export type ContentType = {
    id: number;
    title: string;
    tasks: ContentSection[];
}

type ContentSection = {
    id: number;
    task: string;
    image: string;
    animateTo: ContentAnimation;
}

type ContentAnimation = {
    from: {
        x: number;
        y: number;
    };
    to: {
        x: number;
        y: number;
    };
}