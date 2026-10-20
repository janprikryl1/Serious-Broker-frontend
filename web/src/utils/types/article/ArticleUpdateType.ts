import {ArticleCreateProps} from "./ArticleCreateProps.ts";

export type ArticleUpdateType = ArticleCreateProps & {
    id: number;
}