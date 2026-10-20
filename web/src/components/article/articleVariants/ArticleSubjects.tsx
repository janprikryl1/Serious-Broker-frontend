import {FC} from "react";
import {SubjectType} from "../../../utils/types/article/SubjectType.ts";

type Props = {
  subjects: SubjectType[];
};

export const ArticleSubjects: FC<Props> = ({subjects}) => {
  return (
    <div>
      {subjects?.map((subject) => (
        <div key={subject.id}>
          {
            subject.title ?
            <h5 className="tw-mt-10 tw-mb-0">{subject.title}</h5> :
            null
          }
          <p className="tw-mb-6">{subject.text}</p>
        </div>
      ))}
      <br/>
    </div>
  )
}