import {ArticleProps} from "./ArticleProps.ts";

export type ArticleDetailProps = ArticleProps & {
    allowComments: boolean;
    content: string;
}