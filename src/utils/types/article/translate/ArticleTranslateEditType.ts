import {ArticleCreateProps} from "../ArticleCreateProps.ts";

export type ArticleNewTranslateEditType = {
    articleId: number;
    language: string;
    title: string;
    description: string;
    content: ArticleCreateProps["content"];
    subjects: ArticleCreateProps["subjects"];
}

export type ArticleTranslateEditType = ArticleNewTranslateEditType & {
    translateId: number;
}
    