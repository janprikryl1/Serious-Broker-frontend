import {SubjectType} from "./SubjectType.ts";
import {ContentType} from "./ContentType.ts";

export type ArticleCreateProps = {
    language: string,
    title: string,
    description: string,
    premiumOnly: boolean,
    tmplateId: number,
    publicationType: number,
    publicationFrom: string,
    content: ContentType[],
    subjects: SubjectType[],
    publicatonTo: string,
    publicationFromDays: number | null;
}