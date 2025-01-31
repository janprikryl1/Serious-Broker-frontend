import {ContentType} from "../ContentType.ts";
import {SubjectType} from "../SubjectType.ts";

export type TranslateEditLoadType = {
    id: number;
    object_id: number;
    title: string;
    description: string;
    language: string;
    content: ContentType[];
    subjects: SubjectType[];
    templateId: string;
}