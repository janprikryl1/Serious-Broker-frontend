import { FC, useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArticleProps } from "../utils/types/article/ArticleProps.ts";
import { getAllArticles } from "../utils/api/articleService.ts";
import { TitleHeader } from "../components/about/TitleHeader.tsx";
import { DictionaryLinkCard } from "../components/articles/dictionary/DictionaryLinkCard.tsx";
import { CryptoCurrenciesLinkCard } from "../components/articles/cryptoCurrenciesList/CryptoCurrenciesLinkCard.tsx";
import { ArticleCard } from "../components/articles/ArticleCard.tsx";
import { ArticlesSkeleton } from "../components/articles/ArticlesSkeleton.tsx";
import { CustomSwal } from "../utils/functions/customSwal.ts";
import {useInfiniteScroll} from "../utils/hooks/useInfiniteScroll.ts";

export const Articles: FC = () => {
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
            const response = await getAllArticles(reset ? 1 : currentPage);
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