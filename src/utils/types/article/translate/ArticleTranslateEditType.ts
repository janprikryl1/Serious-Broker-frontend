import {ArticleCreateProps} from "../ArticleCreateProps.ts";

export type ArticleTranslateEditType = ArticleCreateProps & {
    articleId: number;
    translateId: number;
}
    