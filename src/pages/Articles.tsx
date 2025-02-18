import { FC, useEffect, useState, useRef, useCallback } from "react";
import { TitleHeader } from "../components/modules/about/TitleHeader.tsx";
import { ArticleCard } from "../components/modules/articles/ArticleCard.tsx";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { ArticleProps } from "../utils/types/article/ArticleProps.ts";
import { ArticlesSkeleton } from "../components/modules/articles/ArticlesSkeleton.tsx";
import { CryptoCurrenciesLinkCard } from "../components/modules/articles/cryptoCurrenciesList/CryptoCurrenciesLinkCard.tsx";
import { DictionaryLinkCard } from "../components/modules/articles/dictionary/DictionaryLinkCard.tsx";
import {getAllArticles} from "../utils/api/articleService.ts";

export const Articles: FC = () => {
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
            const response = await getAllArticles(reset ? 1 : page);
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
        <>
            <TitleHeader title="Articles" />
            <div className="mt-4 padding-bottom">
                <div className="container">
                    <div className="blog__wrapper">
                        <div className="row g-4">
                            <DictionaryLinkCard />
                            <CryptoCurrenciesLinkCard />
                            {articles.map((item) => (
                                <div key={item.id} className="col-sm-6 col-lg-4">
                                    <ArticleCard data={item} setData={setArticles} />
                                </div>
                            ))}
                        </div>
                        <div ref={loaderRef} style={{ height: 40, marginTop: 20, textAlign: "center" }}>
                            {loading && <ArticlesSkeleton />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
