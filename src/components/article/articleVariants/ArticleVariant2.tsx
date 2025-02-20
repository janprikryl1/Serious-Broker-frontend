import {Dispatch, FC, SetStateAction} from "react";
import {useTranslation} from "react-i18next";
import {ArticleSubjects} from "./ArticleSubjects.tsx";
import {ArticleImageColumn} from "./ArticleImageColumn.tsx";
import {ArticleTaskTextColumn} from "./ArticleTaskTextColumn.tsx";
import {IncreaseDecreaseCategory} from "./IncreaseDecreaseCategory.tsx";
import {ContentType} from "../../../utils/types/article/ContentType.ts";
import {SubjectType} from "../../../utils/types/article/SubjectType.ts";
import {imageURL} from "../../../utils/constants";

type Props = {
    content: ContentType[];
    category: number;
    setCategory: Dispatch<SetStateAction<number>>;
    task: number;
    setTask: Dispatch<SetStateAction<number>>;
    subjects: SubjectType[];
    image: string;
};

export const ArticleVariant2:FC<Props> = ({content, category, setCategory, task, setTask, subjects, image}) => {
    const {t} = useTranslation();

    return (
        <>
            <ArticleSubjects subjects={subjects} />
            {image && <img src={`${imageURL}${image}`} alt="Title image" className="img-fluid"/>}
            {content && content.length ? (
                <>
                    <h2>{content[category].title}</h2>
                    <div className="container">
                        <div className="row">
                            <ArticleTaskTextColumn task={task} category={category} content={content} setTask={setTask} />
                            <ArticleImageColumn task={task} category={category} content={content} />
                        </div>
                    </div>
                    <br /><br />
                    <IncreaseDecreaseCategory category={category} setCategory={setCategory} setTask={setTask} content={content} />
                    <br /><br />
                </>
            ) : (
                <p>{t("Na návodu se pracuje")}</p>
            )}
        </>
    )
}