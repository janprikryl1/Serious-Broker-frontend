import { FC, useCallback, useEffect, useRef, useState } from "react";
import { BinanceIndexAssetRecomBestPreviousType } from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import { useTranslation } from "react-i18next";
import { getBinanceIndexAssetRecomBestPrevious } from "../../utils/api/GraphsService.ts";
import { TitleHeader } from "../../components/about/TitleHeader.tsx";
import { useInfiniteScroll } from "../../utils/hooks/useInfiniteScroll.ts";
import { RecomendationRow } from "../../components/graphs/RecomendationRow.tsx";
import { AssetRowSkeleton } from "../../components/graphs/asset/AssetRowSkeleton.tsx";
import { RecommendationGraphEnum } from "../../utils/enums/RecommendationGraphEnum.tsx";
import { AvailableCoinType } from "../../utils/types/myPortfolio/availableCoinType.ts";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { selectStyles } from "../../styles/selectStyles.ts";
import { useMediaQuery } from "@mui/material";
import "../../styles/sass/components/assets.scss";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const avaibleCoins: AvailableCoinType[] = [
    {id: 1, name: "BTC"},
    {id: 2, name:"USDT"},
    {id: 3, name: "BNB"},
    {id: 4, name: "FDUSD"},
    {id: 5, name: "TRY"},
    {id: 6, name: "USDC"},
    {id: 7, name: "BRL"},
    {id: 8, name: "BNB"},
    {id: 9, name: "ETH"},
    {id: 10, name: "EUR"},
    {id: 11, name: "JPY"},
    {id: 12, name: "MXN"},
    {id: 13, name: "ZAR"},
    {id: 14, name: "DAI"},
    {id: 15, name: "BRL"},
    {id: 16, name: "PLN"},
    {id: 17, name: "ARS"},
    {id: 18, name: "EURI"},
];

const animatedComponents = makeAnimated();

export const Recommendation: FC = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const initialOrderType = (searchParams.get("orderBy") as RecommendationGraphEnum) || RecommendationGraphEnum.ALL_SUG;
    const initialSortDirection = (searchParams.get("direction") as 'asc' | 'desc') || 'asc';
    const initialSearchQuery = searchParams.get("searchQuery") || "";
    const initialIncludeCurrencies = searchParams.get("includeCurrencies")
        ? searchParams.get("includeCurrencies")!.split("|")
        : [];

    const [data, setData] = useState<BinanceIndexAssetRecomBestPreviousType[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const isFetchingRef = useRef<boolean>(false);
    const { currentPage, loaderRef, resetPage } = useInfiniteScroll({ totalPages, loading });
    const [orderType, setOrderType] = useState<RecommendationGraphEnum>(initialOrderType);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);
    const [includeCurrencies, setIncludedCurrencies] = useState<string[]>(initialIncludeCurrencies);
    const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

    const isMobile = useMediaQuery('(max-width: 768px)');
    const isInitialMount = useRef(true);
    const [isHeaderSticky, setIsHeaderSticky] = useState(false);
    const originalHeaderRef = useRef<HTMLDivElement | null>(null);
    const stickyHeaderRef = useRef<HTMLDivElement | null>(null);

    const handleSort = (column: RecommendationGraphEnum) => {
        let newDirection: 'asc' | 'desc' = 'asc';
        if (column === orderType) {
            newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            newDirection = 'desc';
        }

        setOrderType(column);
        setSortDirection(newDirection);

        setSearchParams(prev => {
            prev.set("orderBy", column);
            prev.set("direction", newDirection);
            return prev;
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setSearchParams(prev => {
            if (value) prev.set("searchQuery", value);
            else prev.delete("searchQuery");
            return prev;
        });
    };

    const handleIncludeCurrenciesChange = (selectedOptions: any) => {
        const selectedLabels = selectedOptions.map((opt: any) => opt.label);
        setIncludedCurrencies(selectedLabels);
        setSearchParams(prev => {
            if (selectedLabels.length > 0) {
                prev.set("includeCurrencies", selectedLabels.join("|"));
            } else {
                prev.delete("includeCurrencies");
            }
            return prev;
        });
    };

    // --- FETCH DATA ---

    const fetchData = useCallback(async (pageToFetch: number, isReset: boolean = false) => {
        if (isFetchingRef.current) return;
        if (!isReset && pageToFetch > totalPages) return;

        isFetchingRef.current = true;
        setLoading(true);
        try {
            const res = await getBinanceIndexAssetRecomBestPrevious(
                orderType,
                pageToFetch,
                sortDirection,
                { includeCurrencies, searchQuery }
            );

            if (res && res.data) {
                setData((prev) => (isReset ? res.data.data : [...prev, ...res.data.data]));
                setTotalPages(res.data.totalPages);
            }
        } catch (e) {
            console.error("Error fetching recommendations:", e);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, [orderType, sortDirection, includeCurrencies, searchQuery, totalPages]);

    useEffect(() => {
        resetPage();
        fetchData(1, true);
    }, [orderType, sortDirection]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        const handler = setTimeout(() => {
            resetPage();
            fetchData(1, true);
        }, 500);
        return () => clearTimeout(handler);
    }, [includeCurrencies, searchQuery]);

    useEffect(() => {
        if (currentPage > 1) {
            fetchData(currentPage, false);
        }
    }, [currentPage, fetchData]);

    useEffect(() => {
        const headerElement = originalHeaderRef.current;
        if (!headerElement) return;

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = headerElement.getBoundingClientRect();
                    setIsHeaderSticky(rect.top <= 0);
                    ticking = false;
                });
                ticking = true;
            }
        };

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, left } = entry.contentRect;
                if (stickyHeaderRef.current) {
                    stickyHeaderRef.current.style.width = `${width}px`;
                    stickyHeaderRef.current.style.left = `${left}px`;
                }
            }
        });

        window.addEventListener('scroll', handleScroll);
        resizeObserver.observe(headerElement);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            resizeObserver.unobserve(headerElement);
        };
    }, [data, loading]);

    const currencyOptions = avaibleCoins?.map((coin) => ({
        value: coin.id.toString(),
        label: coin.name,
    }));

    const hasMore = currentPage < totalPages;

    const tableHeaderContent = (
        <div className="table-row fw-bold d-flex align-items-stretch reco-table-header">
            <div className="col-2 fw-bold d-flex align-items-center recom-table-header-cell" onClick={() => handleSort(RecommendationGraphEnum.ALL_SUG)}>
                {t("Title")} {orderType === RecommendationGraphEnum.ALL_SUG && (sortDirection === 'asc' ? '▲' : '▼')}
            </div>
            <div className="text-truncate d-flex align-items-center recom-table-header-cell-secondary col-label" onClick={() => handleSort(RecommendationGraphEnum.LABEL_SUG)}>
                Label {orderType === RecommendationGraphEnum.LABEL_SUG && (sortDirection === 'asc' ? '▲' : '▼')}
            </div>
            <div className="pe-3 d-flex align-items-center recom-table-header-cell-secondary col-coins">{t("Coins represented")}</div>
            {!isMobile && <>
                <div className="pe-3 d-flex align-items-center recom-table-header-cell-secondary col-cmc-rank" onClick={() => handleSort(RecommendationGraphEnum.CMC_RANK)}>
                    Coinmarket {orderType === RecommendationGraphEnum.CMC_RANK && (sortDirection === 'asc' ? '▲' : '▼')}
                </div>
                <div className="d-flex align-items-center recom-table-header-cell-secondary col-week-rank">{t("Weekly ranking")}</div>
                <div className="d-flex align-items-center recom-table-header-cell-secondary col-week-profit" onClick={() => handleSort(RecommendationGraphEnum.WEEK_ALL_PROFIT)}>
                    {t("Profit week")} {orderType === RecommendationGraphEnum.WEEK_ALL_PROFIT && (sortDirection === 'asc' ? '▲' : '▼')}
                </div>
                <div className="text-center d-flex align-items-center justify-content-center recom-table-header-cell-secondary">{t("Week recom.")}</div>
            </>}
        </div>
    );

    return (
        <>
            <TitleHeader title="Pairs" />
            <div className="blog mt-4 padding-bottom">
                <div className="container">
                    <h3>{t("List of pairs")}</h3>
                    <div className="row mb-3 sidebar__search table-row-spacing" style={{maxWidth:"100%", marginLeft:0, backgroundColor: "rgba(64, 51, 38, 0.8)"}}>
                        <div className="col-md-3">
                            <h6 className="form-label mb-1">{t("Included currencies")}</h6>
                            {avaibleCoins && (
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={currencyOptions}
                                    placeholder={t("Select coins")}
                                    noOptionsMessage={() => t("No coins")}
                                    value={currencyOptions?.filter((opt) => includeCurrencies.includes(opt.label))}
                                    onChange={handleIncludeCurrenciesChange}
                                    styles={selectStyles}
                                />
                            )}
                        </div>
                        <div className="col-md-3" />
                        <div className="col-sm-6 align-items-end justify-content-end mb-3">
                            <h6 className="form-label mb-1">{t("Search by name")}</h6>
                            <div className="sidebar__search-container">
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder={t("Hledat")}
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <div className="search-icon-wrapper">
                                    <FaSearch />
                                </div>
                            </div>
                        </div>
                    </div>

                    {(loading && currentPage === 1) ? (
                        <AssetRowSkeleton />
                    ) : data.length > 0 ? (
                        <>
                            <div className="asset-table">
                                <div ref={originalHeaderRef}>
                                    {tableHeaderContent}
                                </div>

                                <div ref={stickyHeaderRef} className={`sticky-header-active ${isHeaderSticky ? 'is-sticky' : ''}`}>
                                    {tableHeaderContent}
                                </div>

                                {data.map((item, index) => (
                                    <RecomendationRow
                                        data={item}
                                        key={item.id || index}
                                        isLast={index === data.length - 1}
                                    />
                                ))}
                            </div>

                            <div ref={hasMore ? loaderRef : null} className="load-more-container">
                                {loading && <AssetRowSkeleton />}
                            </div>
                        </>
                    ) : (
                        <div className="text-center p-5 no-data-found">{t("No data found")}</div>
                    )}
                </div>
            </div>
        </>
    );
};