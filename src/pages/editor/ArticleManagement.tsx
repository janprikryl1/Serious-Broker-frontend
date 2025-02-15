import {FC, useCallback, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {ArticlesSkeleton} from "../../components/modules/articles/ArticlesSkeleton.tsx";
import {ArticleProps} from "../../utils/types/article/ArticleProps.ts";
import {getAllArticlesAdmin} from "../../api/articleService.ts";
import Swal from "sweetalert2";
import {ArticleAdminCard} from "../../components/modules/admin/articleManagement/ArticleAdminCard.tsx";
import {editorURLS} from "../../utils/constants";
import {Button, ButtonColor} from "../../components/Button.tsx";

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
            Swal.fire({
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
                        <Link to={editorURLS.index}><Button color={ButtonColor.gray} style={{ fontSize: 20, marginLeft:10 }}>{t("Help")}</Button></Link>
                        <Link to={editorURLS.highlitsEditor}><Button color={ButtonColor.gray} style={{ fontSize: 20, marginLeft:10 }}>{t("Highlights")}</Button></Link>
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