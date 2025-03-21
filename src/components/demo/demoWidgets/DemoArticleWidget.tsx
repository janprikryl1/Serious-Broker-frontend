import {FC, useEffect, useState} from "react";
import {ArticleDetails} from "../../article/ArticleDetails.tsx";
import {ArticleSkeleton} from "../../article/ArticleSkeleton.tsx";
import {useTranslation} from "react-i18next";
import {ArticleDetailProps} from "../../../utils/types/article/ArticleDetailProps.ts";
import {TranslationsOverview} from "../../../utils/types/article/TranslationsOverview.ts";
import {getArticleDetails} from "../../../utils/api/articleService.ts";
import {CustomSwal} from "../../../utils/functions/customSwal.ts";

type Props = {
    articleId: string;
}

export const DemoArticleWidget:FC<Props> = ({articleId}) => {
    const { t } = useTranslation();
    const [article, setArticle] = useState<ArticleDetailProps>();
    const [translations, setTranslations] = useState<TranslationsOverview[]>([]);
    const [selectedLanguage, setLanguage] = useState<string>('cs');

    useEffect(() => {
        const loadArticle = async () => {
            try {
                const response = await getArticleDetails(articleId);
                const articleLanguage = response.data.article.language;
                setTranslations([{ id: null, language: articleLanguage }, ...response.data.translations]);
                if (selectedLanguage === articleLanguage) {
                    setLanguage(articleLanguage);
                    setArticle(response.data.article);
                }
            } catch (error) {
                CustomSwal.fire({
                    icon: "error",
                    title: t("Loading failed"),
                    text: t("Please try again later"),
                });
                console.error("Error fetching article details:", error);
            }
        };
        loadArticle();
    }, [articleId]);
    
    return (
        <div className="shadow">
            {article ? (
                <ArticleDetails
                    article={article}
                    translations={translations}
                    setLanguage={setLanguage}
                    language={selectedLanguage}
                />
            ) : <ArticleSkeleton />}
        </div>
    )
}