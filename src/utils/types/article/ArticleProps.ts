export type ArticleProps = {
    id: number;
    user_firstname: string;
    user_surname: string;
    language: string;
    title: string;
    description: string;
    created: string;
    changed: string;
}

export type ArticleDetailProps = ArticleProps & {
    allowComments: boolean;
    content: string;
}

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

export type ArticleCreateProps = {
    language: string,
    title: string,
    description: string,
    allowComments: boolean,
    premiumOnly: boolean,
    tmplateId: number,
    publicationType: number,
    publicationFrom: string,
    content: string,
    subjects: string,
    publicatonTo: string,
    publicationFromDays: number | null;
}

export type ArticleUpdateProps = ArticleCreateProps & {
    id: number;
}
