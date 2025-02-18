import { FC, useEffect, useState } from "react";
import { TitleHeader } from "../components/modules/about/TitleHeader.tsx";
import { ArticleDetails } from "../components/modules/article/ArticleDetails.tsx";
import { SidebarSearch } from "../components/modules/article/SidebarSearch.tsx";
import { RecentPost } from "../components/modules/article/RecentPost.tsx";
import Swal from "sweetalert2";
import { ArticleDetailProps } from "../utils/types/article/ArticleDetailProps.ts";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TranslationsOverview } from "../utils/types/article/TranslationsOverview.ts";
import {routes} from "../utils/constants";
import {ArticleSkeleton} from "../components/modules/article/ArticleSkeleton.tsx";
import { Highlight } from "../components/modules/highlights/Highlight.tsx";
import {getArticleDetails} from "../utils/api/articleService.ts";
import {getTranslatedArticle} from "../utils/api/translateService.ts";

export const Article: FC = () => {
    const { id, language } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [article, setArticle] = useState<ArticleDetailProps>();
    const [translations, setTranslations] = useState<TranslationsOverview[]>([]);
    const [selectedLanguage, setLanguage] = useState<string>(language ?? "cs");
    const [initialLoad, setInitialLoad] = useState(true);
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    const fetchArticle = async () => {
        try {
            const response = await getArticleDetails(id!);
            const articleLanguage = response.data.article.language;
            setTranslations([{ id: null, language: articleLanguage }, ...response.data.translations]);
            if (selectedLanguage === articleLanguage) {
                setLanguage(articleLanguage);
                setArticle(response.data.article);
            }
            setInitialLoad(false);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: t("Loading failed"),
                text: t("Please try again later"),
            });
            console.error("Error fetching article details:", error);
        }
    };

    useEffect(() => {
        if (!id) return;
        fetchArticle();
    }, [id]);
    
    useEffect(() => {
        if (!id || !selectedLanguage || initialLoad) return;
        const isOriginalLanguage = translations.length > 0 && selectedLanguage === translations[0].language;
        if (isOriginalLanguage) {
            navigate(`${routes.articleURL}${id}`, { replace: true }); // Update the URL
            fetchArticle();
            return;
        }

        const loadTranslation = async () => {
            try {
                const response = await getTranslatedArticle(id, selectedLanguage);
                if (!response) return;
                setArticle(response.data);
                navigate(`${routes.articleURL}${id}/${selectedLanguage}`, { replace: true });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: t("Loading failed"),
                    text: t("Please try again later"),
                });
                console.error("Error fetching translation:", error);
            }
        };
        loadTranslation();
    }, [id, selectedLanguage, initialLoad]);

    return (
        <>
            <TitleHeader title={article?.title ?? "Article"} />
            <div className="blog-details mt-4 padding-bottom section-bg-color article-font-size">
                <div className="container">
                    <div className="blog-details__wrapper">
                        <div className="row g-5">
                            <div className="col-lg-8">
                                {article ? (
                                    <ArticleDetails
                                        article={article}
                                        translations={translations}
                                        setLanguage={setLanguage}
                                        language={selectedLanguage}
                                    />
                                ) : <ArticleSkeleton />}
                            </div>
                            <div className="col-lg-4 col-md-8 col-12">
                                <div className="sidebar">
                                    <div className="row g-4">
                                        <div className="col-12">
                                            <SidebarSearch/>
                                        </div>
                                        <div className="col-12">
                                            <RecentPost/>
                                        </div>
                                        <div className="col-12">
                                            <Highlight />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
