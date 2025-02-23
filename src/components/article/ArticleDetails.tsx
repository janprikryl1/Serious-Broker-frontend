import {Dispatch, FC, SetStateAction, useState} from 'react';
import { Comments } from "./Comments";
import { CommentForm } from "./CommentForm";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid';
import {ArticleVariant0} from "./articleVariants/ArticleVariant0.tsx";
import {ArticleVariant1} from "./articleVariants/ArticleVariant1.tsx";
import {ArticleVariant2} from "./articleVariants/ArticleVariant2.tsx";
import {ArticleVariant3} from "./articleVariants/ArticleVariant3.tsx";
import {ArticleVariant4} from "./articleVariants/ArticleVariant4.tsx";
import {ArticleLanguagesSelect} from "./ArticleLanguagesSelect.tsx";
import {ArticleBanner} from "./ArticleBanner.tsx";
import {ArticleDetailProps} from "../../utils/types/article/ArticleDetailProps.ts";
import {TranslationsOverview} from "../../utils/types/article/TranslationsOverview.ts";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {CommentType} from "../../utils/types/CommentType.ts";
import {toCzechDateFormat} from "../../utils/functions/dateFunctions.ts";

type Props = {
    article: ArticleDetailProps;
    translations: TranslationsOverview[];
    language: string;
    setLanguage: Dispatch<SetStateAction<string>>;
};

export const ArticleDetails: FC<Props> = ({ article, translations, language, setLanguage }) => {
    const { t } = useTranslation();
    const { user } = useUserContext();
    const [category, setCategory] = useState(0);
    const [task, setTask] = useState(0);
    const [comments, setComments] = useState<CommentType[]>();

    return (
        <div className="blog-details__item">
            {article.content && (
                <div className="blog-details__item-inner">
                    <div key={uuidv4()}>
                        <ArticleBanner banner={article.banner} title={article.title} />
                        <ArticleLanguagesSelect translations={translations} language={language}
                                                setLanguage={setLanguage}/>
                        <p>{article.description}</p>
                        <i>{toCzechDateFormat(article.changed)}</i>
                        <br/><br/>
                        {article.templateId === "0" ?
                            <ArticleVariant0 setTask={setTask} content={article.content} task={task} subjects={article.subjects}
                                             category={category} setCategory={setCategory}/> :
                            article.templateId === "1" ?
                                <ArticleVariant1 setTask={setTask} content={article.content} task={task} subjects={article.subjects}
                                                 category={category} setCategory={setCategory}/> :
                                article.templateId === "2" ?
                                    <ArticleVariant2 setTask={setTask} content={article.content} task={task} subjects={article.subjects}
                                                     category={category} setCategory={setCategory}
                                                     image={article.titleImage}/> :
                                    article.templateId === "3" ?
                                        <ArticleVariant3 subjects={article.subjects}/> :
                                        article.templateId === "4" ?
                                            <ArticleVariant4 image={article.titleImage}/> :
                                            null}
                    </div>
                    {article?.allowComments ? (
                        <>
                            <Comments articleId={article.id} setComments={setComments} comments={comments}/>
                            {user && <CommentForm articleId={article.id} setComments={setComments}/>}
                        </>
                    ) : (
                        <p>{t("Komentáře nejsou povoleny")}</p>
                    )}
                </div>
            )}
        </div>
    );
};
