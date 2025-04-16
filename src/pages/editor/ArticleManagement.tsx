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

export const ArticleManagement: FC = () => {
    const { t } = useTranslation();
    const [articles, setArticles] = useState<ArticleProps[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const isFetchingRef = useRef<boolean>(false);

    const fetchArticles = useCallback(async (reset: boolean = false) => {
        if (isFetchingRef.current || (page > totalPages && !reset)) return;

        isFetchingRef.current = true;
        setLoading(true);

        try {
            const response = await getAllArticlesAdmin(reset ? 1 : page);
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
    }, [page, t]);

    useEffect(() => {
        fetchArticles(true);
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [page]);

    useEffect(() => {
        if (!loaderRef.current) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && page < totalPages) {
                    setPage((prev) => prev + 1);
                }
            },
            { root: null, rootMargin: "100px", threshold: 1.0 }
        );

        observerRef.current.observe(loaderRef.current);

        return () => observerRef.current?.disconnect();
    }, [loading, totalPages, page]);

    return (
        <div className="padding-top padding-bottom admin-container">
            <div className="service-details__wrapper">
                <div className="service-details__item">
                    <div className="service-details__content" data-aos="fade-up" data-aos-duration="900">
                        <h1 className="admin-section-title">{t("Article management")}</h1>
                        <Link to={editorURLS.articleNew}>
                            <Button style={{ fontSize: 20 }}>{t("New article")}</Button>
                        </Link>
                        <Link to={editorURLS.index}><Button color={ButtonColor.gray} className="article-management-link">{t("Help")}</Button></Link>
                        <Link to={editorURLS.highlights}><Button color={ButtonColor.gray} className="article-management-link">{t("Highlights")}</Button></Link>
                        <div className="padding-top padding-bottom">
                            <div className="blog__wrapper">
                                <div className="row g-4">
                                    {articles.length > 0 ? (
                                        articles.map((item) => (
                                            <div key={item.id} className="col-sm-6 col-lg-4">
                                                <ArticleAdminCard data={item} link={editorURLS.articleEdit} setArticles={setArticles} />
                                            </div>
                                        ))
                                    ) : (
                                        <ArticlesSkeleton />
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