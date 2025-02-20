import {FC} from "react";
import {ArticleSubjects} from "./ArticleSubjects.tsx";
import {SubjectType} from "../../../utils/types/article/SubjectType.ts";

type Props = {
    subjects: SubjectType[];
};

export const ArticleVariant3:FC<Props> = ({subjects}) => {
    return (
        <ArticleSubjects subjects={subjects} />
    )
}