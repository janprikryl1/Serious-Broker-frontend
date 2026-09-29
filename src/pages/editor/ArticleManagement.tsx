import {FC, useCallback, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {ArticleProps} from "../../utils/types/article/ArticleProps.ts";
import {editorURLS} from "../../utils/constants";
import {getAllArticlesAdmin} from "../../utils/api/articleService.ts";
import {Button, ButtonColor} from "../../components/reusable/Button.tsx";
import {ArticlesSkeleton} from "../../components/articles/ArticlesSkeleton.tsx";
import {ArticleAdminCard} from "../../components/editor/articleManagement/ArticleAdminCard.tsx";
import {CustomSwal} from "../../utils/functions/customSwal.ts";
import "../../styles/sass/components/articles.scss";
import {useInfiniteScroll} from "../../utils/hooks/useInfiniteScroll.ts";

export const ArticleManagement: FC = () => {
    const { t } = useTranslation();
    const [articles, setArticles] = useState<ArticleProps[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const isFetchingRef = useRef<boolean>(false);
    const { currentPage, loaderRef } = useInfiniteScroll({totalPages, loading});

    const fetchArticles = useCallback(async (reset: boolean = false) => {
        if (isFetchingRef.current || (currentPage > totalPages && !reset)) return;
        isFetchingRef.current = true;
        setLoading(true);
        try {
            const response = await getAllArticlesAdmin(reset ? 1 : currentPage);
            if (!response) return;
            setArticles((prev) => (reset ? response.data.data : [...prev, ...response.data.data]));
            setTotalPages(response.data.totalPages);
        } catch (error) {
            CustomSwal.fire({
                icon: "error",
                title: t("Loading failed"),
                text: t("Please try again later"),
            });
            console.error("Error fetching articles:", error);
        }
        setLoading(false);
        isFetchingRef.current = false;
    }, [currentPage, t, totalPages]);

    useEffect(() => {
        fetchArticles(true);
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [currentPage]);

    return (
        <div className="padding-top padding-bottom admin-container">
            <div className="service-details__wrapper">
                <div className="service-details__item">
                    <div className="service-details__content" data-aos="fade-up" data-aos-duration="900">
                        <h1 className="admin-section-title">{t("Article management")}</h1>
                        <Link to={editorURLS.articleNew}>
                            <Button style={{ fontSize: 20 }}>{t("New article")}</Button>
                        </Link>
                        <Link to={editorURLS.index}><Button color={ButtonColor.gray2} className="article-management-link">{t("Help")}</Button></Link>
                        <Link to={editorURLS.highlights}><Button color={ButtonColor.gray2} className="article-management-link">{t("Highlights")}</Button></Link>
                        <div className="padding-top padding-bottom">
                            <div className="blog__wrapper">
                                <div className="row g-4">
                                    {loading && articles?.length === 0 ? (
                                      <ArticlesSkeleton />
                                    ) : articles?.length > 0 ? (
                                      /* 2. Ak už máme články -> Zobrazíme karty */
                                      articles.map((item) => (
                                        <div key={item.id} className="col-sm-6 col-lg-4">
                                            <ArticleAdminCard data={item} link={editorURLS.articleEdit} setArticles={setArticles} />
                                        </div>
                                      ))
                                    ) : (
                                      /* 3. Ak sa nenačítava a pole je stále prázdne -> Správa "Žiadne články" */
                                      <div className="tw-text-center tw-py-12 tw-text-stone-400">
                                          {t("No articles found.")}
                                      </div>
                                    )}
                                </div>
                                <div ref={loaderRef}>
                                    {loading && <ArticlesSkeleton />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};