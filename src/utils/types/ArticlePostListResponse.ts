export type ArticlePostListResponse = {
    article_name: string;
    data: ArticlePostListResponseResponse[];
    languages: string[];
}

export type ArticlePostListResponseResponse = {
    id: number;
    article_id: string;
    type: string;
    title: string;
    created: string;
}


export type ArticlePostListResponseData = {
    article_posts: ArticlePost[];
    article_name: string;
}

export type ArticlePost = {
    id?: string;
    article_id: string;
    type: string;
    language: string;
    title: string;
    description: string;
    content: string;
    created?: string;
    changed?: string;
}