import {FC} from "react";
import {SubjectType} from "../../../../utils/types/article/SubjectType.ts";

type Props = {
    subjects: SubjectType[];
};

export const ArticleSubjects:FC<Props> = ({subjects}) => {
    return (
        <div>
            {subjects?.map((subject) => (
                <div key={subject.id}>
                    <h3>{subject.title}</h3>
                    <p>{subject.text}</p>
                </div>
            ))}
            <br />
        </div>
    )
}