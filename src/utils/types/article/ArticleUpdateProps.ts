import {ArticleCreateProps} from "./ArticleCreateProps.ts";

export type ArticleUpdateProps = ArticleCreateProps & {
    id: number;
}
