import {ArticleSubjects} from "./ArticleSubjects.tsx";
import {ArticleImageColumn} from "./ArticleImageColumn.tsx";
import {ArticleTaskTextColumn} from "./ArticleTaskTextColumn.tsx";
import {IncreaseDecreaseCategory} from "./IncreaseDecreaseCategory.tsx";
import {Dispatch, FC, SetStateAction} from "react";
import {useTranslation} from "react-i18next";
import {ContentType} from "../../../utils/types/article/ContentType.ts";
import {SubjectType} from "../../../utils/types/article/SubjectType.ts";

type Props = {
    content: ContentType[];
    category: number;
    setCategory: Dispatch<SetStateAction<number>>;
    task: number;
    setTask: Dispatch<SetStateAction<number>>;
    subjects: SubjectType[];
};

export const ArticleVariant0:FC<Props> = ({content, category, setCategory, task, setTask, subjects}) => {
    const {t} = useTranslation();
    
    return (
        <>
            <ArticleSubjects subjects={subjects} />
            {content && content.length ? (
                <>
                    <h2>{content[category].title}</h2>
                    <div className="container">
                        <div className="row">
                            <ArticleImageColumn task={task} category={category} content={content} />
                            <ArticleTaskTextColumn task={task} category={category} content={content} setTask={setTask} />
                        </div>
                    </div>
                    <br /><br />
                    <IncreaseDecreaseCategory category={category} setCategory={setCategory} setTask={setTask} content={content} />
                    <br /><br />
                </>
            ) : (
                <p>{t("We are working on guide")}</p>
            )}   
        </>
    )
}