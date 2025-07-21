import { FC, useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleProps } from "../utils/types/article/ArticleProps.ts";
import { getAllArticles } from "../utils/api/articleService.ts";
import { TitleHeader } from "../components/about/TitleHeader.tsx";
import { DictionaryLinkCard } from "../components/articles/dictionary/DictionaryLinkCard.tsx";
import { CryptoCurrenciesLinkCard } from "../components/articles/cryptoCurrenciesList/CryptoCurrenciesLinkCard.tsx";
import { ArticleCard } from "../components/articles/ArticleCard.tsx";
import { ArticlesSkeleton } from "../components/articles/ArticlesSkeleton.tsx";
import { CustomSwal } from "../utils/functions/customSwal.ts";
import { useInfiniteScroll } from "../utils/hooks/useInfiniteScroll.ts";
import { SidebarSearch } from "../components/article/SidebarSearch.tsx";
import {useUserContext} from "../utils/providers/providerUser.tsx";

export const Articles: FC = () => {
    const { t } = useTranslation();
    const {user} = useUserContext();
    const [articles, setArticles] = useState<ArticleProps[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const isFetchingRef = useRef<boolean>(false);
    const { currentPage, loaderRef } = useInfiniteScroll({ totalPages, loading });

    // Filter states
    const [articleType, setArticleType] = useState<string>("all");
    const [author, setAuthor] = useState<string>("all");
    const [unreadFilter, setUnreadFilter] = useState<"all" | "yes" | "no">("all");
    const [watchlistFilter, setWatchlistFilter] = useState<"all" | "yes" | "no">("all");
    const [sortBy, setSortBy] = useState<string>("date_desc");

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

    // Unique authors for filter dropdown
    const uniqueAuthors = useMemo(() => {
        const names = articles.map(a => `${a.user_firstname} ${a.user_surname}`);
        return Array.from(new Set(names));
    }, [articles]);

    const filteredArticles = useMemo(() => {
        let filtered = articles.filter(article => {
            if (articleType !== "all" && article.articleTypeOption !== articleType) return false;
            if (author !== "all" && `${article.user_firstname} ${article.user_surname}` !== author) return false;
            if (unreadFilter === "yes" && article.is_read) return false;
            if (unreadFilter === "no" && !article.is_read) return false;
            if (watchlistFilter === "yes" && !article.in_watchlist) return false;
            if (watchlistFilter === "no" && article.in_watchlist) return false;
            return true;
        });

        return filtered.sort((a, b) => {
            switch (sortBy) {
                case "date_asc":
                    return new Date(a.created).getTime() - new Date(b.created).getTime();
                case "date_desc":
                    return new Date(b.created).getTime() - new Date(a.created).getTime();
                case "title_asc":
                    return a.title.localeCompare(b.title);
                case "title_desc":
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });
    }, [articles, articleType, author, unreadFilter, watchlistFilter, sortBy]);


    return (
        <>
            <TitleHeader title="Articles" />
            <div className="mt-4 padding-bottom">
                <div className="container">
                    <div className="blog__wrapper">

                        {/* Filter section */}
                        <div className="row mb-3 sidebar__search" style={{marginLeft: "0.1rem", marginRight: "0.1rem"}}>
                            <div className="col-md-2">
                                <label className="form-label">{t("Type")}</label>
                                <select className="form-select" value={articleType}
                                        onChange={e => setArticleType(e.target.value)}>
                                    <option value="all">{t("All")}</option>
                                    <option value="article">{t("Article")}</option>
                                    <option value="news">{t("News")}</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">{t("Author")}</label>
                                <select className="form-select" value={author}
                                        onChange={e => setAuthor(e.target.value)}>
                                    <option value="all">{t("All")}</option>
                                    {uniqueAuthors.map(name => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                            {user ? (
                                <>
                                    <div className="col-md-2">
                                        <label className="form-label">{t("Unread")}</label>
                                        <select className="form-select" value={unreadFilter}
                                                onChange={e => setUnreadFilter(e.target.value as "all" | "yes" | "no")}>
                                            <option value="all">{t("All")}</option>
                                            <option value="yes">{t("Yes")}</option>
                                            <option value="no">{t("No")}</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label">{t("In watchlist")}</label>
                                        <select className="form-select" value={watchlistFilter}
                                                onChange={e => setWatchlistFilter(e.target.value as "all" | "yes" | "no")}>
                                            <option value="all">{t("All")}</option>
                                            <option value="yes">{t("Yes")}</option>
                                            <option value="no">{t("No")}</option>
                                        </select>
                                    </div>
                                </>
                                ) : <div className="col-md-4" />}
                            <div className="col-md-4 align-items-end justify-content-end">
                                <SidebarSearch showTitle={false}/>
                            </div>

                            <div className="col-md-2 d-flex align-items-center gap-2">
                                <label htmlFor="sortSelect" className="form-label mb-0 col-12">{t("Sort by")}</label>
                                <select
                                    id="sortSelect"
                                    className="form-select col-8"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="date_desc">{t("Newest first")}</option>
                                    <option value="date_asc">{t("Oldest first")}</option>
                                    <option value="title_asc">{t("Title A-Z")}</option>
                                    <option value="title_desc">{t("Title Z-A")}</option>
                                </select>
                            </div>

                        </div>


                        {/* Cards */}
                        <div className="row g-4">
                            <DictionaryLinkCard/>
                            <CryptoCurrenciesLinkCard/>
                            {filteredArticles.map((item) => (
                                <div key={item.id} className="col-sm-6 col-lg-4">
                                    <ArticleCard data={item} setData={setArticles}/>
                                </div>
                            ))}
                        </div>

                        {/* Loader */}
                        <div ref={loaderRef} style={{height: 40, marginTop: 20, textAlign: "center"}}>
                            {loading && <ArticlesSkeleton/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
