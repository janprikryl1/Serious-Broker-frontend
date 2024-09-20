import {FC} from "react";
import {SubjectType} from "../../../../utils/types/article/SubjectType.ts";
import {ArticleSubjects} from "./ArticleSubjects.tsx";
type Props = {
    subjects: SubjectType[];
};

export const ArticleVariant3:FC<Props> = ({subjects}) => {
    return (
        <ArticleSubjects subjects={subjects} />
    )
}