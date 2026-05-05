import { FC, useCallback, useEffect, useRef, useState } from "react";
import { BinanceIndexAssetRecomBestPreviousType } from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import { useTranslation } from "react-i18next";
import { getBinanceIndexAssetRecomBestPrevious } from "../../utils/api/GraphsService.ts";
import { TitleHeader } from "../../components/about/TitleHeader.tsx";
import { useInfiniteScroll } from "../../utils/hooks/useInfiniteScroll.ts";
import { RecomendationRow } from "../../components/graphs/RecomendationRow.tsx";
import { AssetRowSkeleton } from "../../components/graphs/asset/AssetRowSkeleton.tsx";
import { RecommendationGraphEnum } from "../../utils/enums/RecommendationGraphEnum.tsx";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { selectStyles } from "../../styles/selectStyles.ts";
import "../../styles/sass/components/assets.scss";
import { useSearchParams } from "react-router-dom";
import {CustomDropdownIndicator} from "../../components/reusable/CustomDropdownIndicator.tsx";
import {SearchBar} from "../../components/reusable/SearchBar.tsx";
import {OutlineContainer} from "../../components/reusable/OutlineContainer.tsx";
import { getAllCryptocurrenciesPhoto } from "../../utils/api/CryptocurrencyService.ts";
import { CryptoCurrencyAdminType } from "../../utils/types/asset/CryptoCurrencyType.ts";
import {getMyWatchList} from "../../utils/api/watchListService.ts";
import {WatchListType} from "../../utils/types/watchList/WatchListType.ts";
import {getAllAssetCoins} from "../../utils/api/assetCalculatorService.ts";
import {getTradingCoins} from "../../utils/api/binanceIndexAssets.ts";
import {Checkbox} from "../../components/reusable/Checkbox.tsx";

const avaibleCoins = [
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
] as const;

export type AssetCoinID = {
    id: number;
    asset_label: string;
}

const animatedComponents = makeAnimated();

export const Recommendation: FC = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const initialOrderType = (searchParams.get("orderBy") as RecommendationGraphEnum) || RecommendationGraphEnum.CMC_RANK;
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

    const isInitialMount = useRef(true);
    const [isHeaderSticky, setIsHeaderSticky] = useState(false);
    const originalHeaderRef = useRef<HTMLDivElement | null>(null);
    const stickyHeaderRef = useRef<HTMLDivElement | null>(null);
    const [allCurrencies, setAllCurrencies] = useState<CryptoCurrencyAdminType[]>([]);
    const [watchlist, setWatchlist] = useState<WatchListType[]>([]);
    const [allCoinsIDs, setAllCoinsIDs] = useState<AssetCoinID[]>([]);
    const [tradingCoins, setTradingCoins] = useState<string[]>([]);
    const [showNonTradingCoins, setShowNonTradingCoins] = useState<boolean>(false);

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

    useEffect(() => {
        // Get coins photos
        (async () => {
            try {
                const currenciesResponse = await getAllCryptocurrenciesPhoto();
                if (currenciesResponse) {
                    setAllCurrencies(currenciesResponse.data);
                }
            } catch (error) {
                console.error(error);
            }
        })();

        // Get watchlist
        (async () => {
            try {
                const response = await getMyWatchList();
                if (response?.data) {
                    setWatchlist(response.data);
                }
            } catch (e) {
                console.error("Error loading watchlist:", e);
            }
        })();

        // Get all coins IDs
        (async () => {
            try {
                const response = await getAllAssetCoins();
                if (response?.data) {
                    setAllCoinsIDs(response.data);
                }
            } catch (error) {
                console.error("Failed to load asset coins:", error);
            }
        })();

        // Get list of active coins
        (async () => {
            try {
                const tradingCoinsResponse = await getTradingCoins();
                if (tradingCoinsResponse && tradingCoinsResponse.data) {
                    setTradingCoins(tradingCoinsResponse.data);
                }
            } catch (error) {
                console.error("Failed to load active coins:", error);
            }
        })();
    }, []);

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

    // Filtrovanie dát podľa trading coins
    const filteredData = showNonTradingCoins 
        ? data 
        : data.filter(item => tradingCoins.includes(item.asset_label.toUpperCase()));

    const tableHeaderContent = (
        <div className="table-header-row fw-bold d-flex align-items-stretch">
            <div className="table-header-cell table-header-cell-name-short" onClick={() => handleSort(RecommendationGraphEnum.ALL_SUG)}>
                {t("Title")} {orderType === RecommendationGraphEnum.ALL_SUG && (sortDirection === 'asc' ? '▲' : '▼')}
            </div>
            <div className="table-header-cell table-header-cell-traded-for pe-3">{t("Traded for")}</div>
            <div
              className="table-cell table-header-cell-change"
              style={{ whiteSpace: 'normal', lineHeight: '1.2' }}
            >
                {t("CoinMarketCap")}<br />{t("Position")}
            </div>
            <div className="table-header-cell table-header-cell-to-date pe-3">{t("Weekly ranking")}</div>
            <div className="table-header-cell table-header-cell-created pe-4" onClick={() => handleSort(RecommendationGraphEnum.WEEK_ALL_PROFIT)}>
                {t("Profit (7d)")} {orderType === RecommendationGraphEnum.WEEK_ALL_PROFIT && (sortDirection === 'asc' ? '▲' : '▼')}
            </div>
            <div className="table-header-cell table-header-cell-created text-center d-flex align-items-center justify-content-center">
                {t("Week recom.")}
            </div>
            <div className="table-header-cell table-header-cell-status text-center d-flex align-items-center justify-content-center">
                {t("Status")}
            </div>
            <div className="table-header-cell table-header-cell-watchlist text-center d-flex align-items-center justify-content-center"></div>
        </div>
    );

    return (
        <>
            <TitleHeader title={t("Cryptocurrencies")} />
            <div className="blog mt-4 padding-bottom">
                <div className="container">
                    <OutlineContainer className={"mb-5"} bgColor={"var(--quaternary-color-transparent-50)"} style={{margin: "1px"}}>
                        <div className="d-flex gap-4 w-100 flex-wrap">
                            <div className="d-flex flex-column flex-grow-1" style={{ minWidth: '200px' }}>
                                <div className="form-label mb-3">{t("Included currencies")}</div>
                                {avaibleCoins && (
                                  <Select
                                    closeMenuOnSelect={false}
                                    components={{...animatedComponents, DropdownIndicator: CustomDropdownIndicator}}
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
                            <div className="d-flex flex-column flex-grow-1" style={{ minWidth: '200px' }}>
                                <div className="form-label mb-3">{t("Search by name")}</div>
                                <SearchBar value={searchQuery} onChange={handleSearchChange} />
                            </div>
                        </div>
                        <div className="d-flex gap-4 w-100 mt-4">
                            <Checkbox
                              checked={showNonTradingCoins}
                              onChange={setShowNonTradingCoins}
                              label="Show inactive indices"
                            />
                        </div>
                    </OutlineContainer>

                    {(loading && currentPage === 1) ? (
                        <AssetRowSkeleton />
                    ) : filteredData.length > 0 ? (
                        <>
                            <div ref={stickyHeaderRef} className={`sticky-header-active ${isHeaderSticky ? 'is-sticky' : ''}`}>
                                {tableHeaderContent}
                            </div>
                            <div className="asset-table">
                                <div ref={originalHeaderRef}>
                                    {tableHeaderContent}
                                </div>

                                <div className="asset-table-body">
                                    {filteredData.map((item, index) => (
                                        <RecomendationRow
                                            data={item}
                                            key={index}
                                            isLast={index === filteredData.length - 1}
                                            allCurrencies={allCurrencies}
                                            watchlist={watchlist}
                                            allCoinsIDs={allCoinsIDs}
                                            activeCoins={tradingCoins}
                                        />
                                    ))}
                                </div>
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