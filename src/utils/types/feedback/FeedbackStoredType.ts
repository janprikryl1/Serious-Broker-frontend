import {FeedbackType} from "./FeedbackType.ts";

export type FeedbackStoredType = FeedbackType & {
    id: number;
    created: string;
}