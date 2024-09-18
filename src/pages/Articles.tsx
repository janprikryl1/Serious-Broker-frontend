import { FC, useEffect, useState } from "react";
import { TitleHeader } from "../components/modules/about/TitleHeader.tsx";
import { ArticleCard } from "../components/modules/articles/ArticleCard.tsx";
import { getAllArticles } from "../api/articleService.ts";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { ArticleProps } from "../utils/types/article/ArticleProps.ts";
import { ArticlesSkeleton } from "../components/modules/articles/ArticlesSkeleton.tsx";
import { CryptoCurrenciesLinkCard } from "../components/modules/articles/cryptoCurrenciesList/CryptoCurrenciesLinkCard.tsx";
import { DictionaryLinkCard } from "../components/modules/articles/dictionary/DictionaryLinkCard.tsx";
import {Pagination} from "../components/Pagiation.tsx";

export const Articles: FC = () => {
    const { t } = useTranslation();
    const [articles, setArticles] = useState<ArticleProps[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const response = await getAllArticles(page);
                setArticles(response.data.data);
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
        };
        fetchArticles();
    }, [page, t]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <>
            <TitleHeader title="Articles" />
            <div className="blog padding-top padding-bottom section-bg-color">
                <div className="container">
                    <div className="blog__wrapper">
                        <div className="row g-4">
                            <DictionaryLinkCard />
                            <CryptoCurrenciesLinkCard />
                            {loading ? (
                                <ArticlesSkeleton />
                            ) : (
                                articles.map((item) => (
                                    <div key={item.id} className="col-sm-6 col-lg-4">
                                        <ArticleCard data={item} />
                                    </div>
                                ))
                            )}
                        </div>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
