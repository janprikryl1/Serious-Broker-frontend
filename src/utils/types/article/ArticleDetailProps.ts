import {ArticleProps} from "./ArticleProps.ts";

export type ArticleDetailProps = ArticleProps & {
    content: string;
    subjects: string;
    publicationType: number;
    publicationFrom: string;
    publicationTo: string;
    publicationFromDays: number;
    premiumOnly: string;
    articleTypeOption: string;
    templateId: string;
    titleImage: string;
}