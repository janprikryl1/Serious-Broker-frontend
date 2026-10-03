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
import {OutlineContainer} from "../components/reusable/OutlineContainer.tsx";
import {SearchBar} from "../components/reusable/SearchBar.tsx";
import {SEO} from "../components/reusable/SEO.tsx";
import {getBreadcrumbSchema} from "../utils/functions/seoSchemas.ts";
import {routes} from "../utils/constants";

export const Articles: FC = () => {
    const { t } = useTranslation();
    const {user} = useUserContext();
    const [articles, setArticles] = useState<ArticleProps[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const isFetchingRef = useRef<boolean>(false);
    const { currentPage, loaderRef } = useInfiniteScroll({ totalPages, loading });

    // Filter states
    const [searchQuery, setSearchQuery] = useState<string>("");
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
        const query = searchQuery.trim().toLowerCase();

        let filtered = articles.filter(article => {
            // Live vyhľadávanie: Ak používateľ napísal 3 a viac znakov, hľadá sa v názve a popise
            if (query.length >= 3) {
                const titleMatch = article.title?.toLowerCase().includes(query);
                const descriptionMatch = article.description?.toLowerCase().includes(query);
                if (!titleMatch && !descriptionMatch) return false;
            }

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
    }, [articles, searchQuery, articleType, author, unreadFilter, watchlistFilter, sortBy]);

    return (
        <>
            <SEO
                title={t("Articles") || "Články"}
                description="Odborné i vzdělávací články, novinky a analýzy ze světa kryptoměn a investování od týmu Serious Broker."
                canonicalPath={routes.articles}
                schema={getBreadcrumbSchema([
                    { name: "Domů", url: routes.home },
                    { name: t("Articles") || "Články", url: routes.articles },
                ])}
            />
            <TitleHeader title="Articles" />
            <div className="mt-4 padding-bottom">
                <div className="container">
                    <div className="">

                        {/* Filter section */}
                        <div className="tw-mb-16">
                            <div className="row g-3">

                                {/* 1. RIADOK: Vyhľadávanie cez celú šírku */}
                                <div className="col-12">
                                    <label className="tw-mb-1 tw-text-sm tw-text-stone-300">
                                        {t("Search")}
                                    </label>
                                    <SearchBar
                                      value={searchQuery}
                                      onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* 2. RIADOK: Filtre a radenie */}
                                {/* Typ článku */}
                                <div className={user ? "col-12 col-sm-6 col-md-4 col-lg-2" : "col-12 col-sm-6 col-md-4"}>
                                    <label className="tw-mb-1 tw-text-sm tw-text-stone-300">
                                        {t("Type")}
                                    </label>
                                    <select
                                      className="select-box-outline tw-w-full"
                                      value={articleType}
                                      onChange={e => setArticleType(e.target.value)}
                                    >
                                        <option value="all">{t("All")}</option>
                                        <option value="article">{t("Article")}</option>
                                        <option value="tutorial">{t("tutorial")}</option>
                                        {/*<option value="news">{t("News")}</option>*/}
                                    </select>
                                </div>

                                {/* Autor */}
                                <div className={user ? "col-12 col-sm-6 col-md-4 col-lg-2" : "col-12 col-sm-6 col-md-4"}>
                                    <label className="tw-mb-1 tw-text-sm tw-text-stone-300">
                                        {t("Author")}
                                    </label>
                                    <select
                                      className="select-box-outline tw-w-full"
                                      value={author}
                                      onChange={e => setAuthor(e.target.value)}
                                    >
                                        <option value="all">{t("All")}</option>
                                        {uniqueAuthors.map(name => (
                                          <option key={name} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Filtre pre prihláseného používateľa */}
                                {user && (
                                  <>
                                      <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                                          <label className="tw-mb-1 tw-text-sm tw-text-stone-300">
                                              {t("Unread")}
                                          </label>
                                          <select
                                            className="select-box-outline tw-w-full"
                                            value={unreadFilter}
                                            onChange={e => setUnreadFilter(e.target.value as "all" | "yes" | "no")}
                                          >
                                              <option value="all">{t("All")}</option>
                                              <option value="yes">{t("Yes")}</option>
                                              <option value="no">{t("No")}</option>
                                          </select>
                                      </div>

                                      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                                          <label className="tw-mb-1 tw-text-sm tw-text-stone-300">
                                              {t("In watchlist")}
                                          </label>
                                          <select
                                            className="select-box-outline tw-w-full"
                                            value={watchlistFilter}
                                            onChange={e => setWatchlistFilter(e.target.value as "all" | "yes" | "no")}
                                          >
                                              <option value="all">{t("All")}</option>
                                              <option value="yes">{t("Yes")}</option>
                                              <option value="no">{t("No")}</option>
                                          </select>
                                      </div>
                                  </>
                                )}

                                {/* Radenie */}
                                <div className={user ? "col-12 col-sm-6 col-md-4 col-lg-3" : "col-12 col-sm-6 col-md-4"}>
                                    <label htmlFor="sortSelect" className="tw-mb-1 tw-text-sm tw-text-stone-300">
                                        {t("Sort by")}
                                    </label>
                                    <select
                                      id="sortSelect"
                                      className="select-box-outline tw-w-full"
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
                        </div>

                        {/* Cards */}
                        <div className="row g-4">
                            <DictionaryLinkCard />

                            {filteredArticles.map((item) => (
                              <div key={item.id} className="col-sm-6 col-lg-6">
                                  <ArticleCard data={item} setData={setArticles}/>
                              </div>
                            ))}

                            {/* Zobrazenie správy ak sa nič nenašlo */}
                            {filteredArticles.length === 0 && !loading && (
                              <div className="tw-text-center tw-py-12 tw-text-stone-400">
                                  {t("No articles found matching your criteria.")}
                              </div>
                            )}
                        </div>

                        {/* Loader */}
                        <div ref={loaderRef} className="tw-mt-6">
                            {loading && <ArticlesSkeleton/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
