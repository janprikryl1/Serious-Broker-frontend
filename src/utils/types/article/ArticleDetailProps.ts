import {ArticleProps} from "./ArticleProps.ts";
import {ContentType} from "./ContentType.ts";
import {SubjectType} from "./SubjectType.ts";

export type ArticleDetailProps = ArticleProps & {
    content: ContentType[];
    subjects: SubjectType[];
    publicationType: number;
    publicationFrom: string;
    publicationTo: string;
    publicationFromDays: number;
    premiumOnly: boolean;
    articleTypeOption: string;
    templateId: string;
    titleImage: string;
}