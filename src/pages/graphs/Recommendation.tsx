import { FC, useEffect, useState, useRef, useCallback } from "react";
import { BinanceIndexAssetRecomBestPreviousType } from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
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
    const [data, setData] = useState<BinanceIndexAssetRecomBestPreviousType[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const isFetchingRef = useRef<boolean>(false);
    const { currentPage, loaderRef, resetPage } = useInfiniteScroll({ totalPages, loading });
    const [orderType, setOrderType] = useState<RecommendationGraphEnum>(RecommendationGraphEnum.ALL_SUG);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [includeCurrencies, setIncludedCurrencies] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isInitialMount = useRef(true);
    const [isHeaderSticky, setIsHeaderSticky] = useState(false);
    const originalHeaderRef = useRef<HTMLDivElement | null>(null);
    const stickyHeaderRef = useRef<HTMLDivElement | null>(null);
    
    const fetchData = useCallback(async (reset: boolean = false) => {
        if (isFetchingRef.current || (currentPage > totalPages && !reset)) return;
        isFetchingRef.current = true;
        setLoading(true);
        try {
            const res = await getBinanceIndexAssetRecomBestPrevious(
                orderType,
                reset ? 1 : currentPage,
                sortDirection,
                { includeCurrencies, searchQuery }
            );
            setData((prev) => (reset ? res.data.data : [...prev, ...res.data.data]));
            setTotalPages(res.data.totalPages);
        } catch (e) {
            console.error("Error fetching recommendations:", e);
        }
        setLoading(false);
        isFetchingRef.current = false;
    }, [orderType, currentPage, totalPages, sortDirection, includeCurrencies, searchQuery]);

    useEffect(() => {
        setData([]); setTotalPages(1);
    }, [orderType, sortDirection, includeCurrencies, searchQuery]);

    useEffect(() => {
        fetchData(true);
    }, [orderType, sortDirection]);

    useEffect(() => {
        if (isInitialMount.current) { isInitialMount.current = false; return; }
        const handler = setTimeout(() => { resetPage(); fetchData(true); }, 500);
        return () => clearTimeout(handler);
    }, [includeCurrencies, searchQuery, resetPage, fetchData]);

    useEffect(() => {
        if (currentPage > 1) { fetchData(); }
    }, [currentPage, fetchData]);

    useEffect(() => {
        const headerElement = originalHeaderRef.current;
        if (!headerElement) return;

        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                const shouldBeSticky = !entry.isIntersecting && entry.boundingClientRect.y < 0;
                setIsHeaderSticky(shouldBeSticky);
            },
            { rootMargin: "0px 0px -100% 0px", threshold: 0.0 }
        );
        intersectionObserver.observe(headerElement);

        const stickyHeaderElement = stickyHeaderRef.current;
        if (!stickyHeaderElement) {
            return () => intersectionObserver.unobserve(headerElement);
        }

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, left } = entry.contentRect;
                stickyHeaderElement.style.width = `${width}px`;
                stickyHeaderElement.style.left = `${left}px`;
            }
        });
        resizeObserver.observe(headerElement);

        return () => {
            intersectionObserver.unobserve(headerElement);
            resizeObserver.unobserve(headerElement);
        };
    }, [data, loading]);

    const handleSort = (column: RecommendationGraphEnum) => {
        if (column === orderType) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setOrderType(column);
            setSortDirection('desc');
        }
        resetPage();
    };

    const currencyOptions = avaibleCoins?.map((coin) => ({
        value: coin.id.toString(),
        label: coin.name,
    }));

    const tableHeaderContent = (
        <div className="table-row fw-bold d-flex align-items-stretch">
            <div className="col-2 fw-bold d-flex align-items-center" style={{ padding: '0.75rem', borderLeft: '2px solid #d2c6a8', borderRight: '2px solid #d2c6a8', borderTop: '2px solid #d2c6a8', cursor: 'pointer' }} onClick={() => handleSort(RecommendationGraphEnum.ALL_SUG)}>
                Název {orderType === RecommendationGraphEnum.ALL_SUG && (sortDirection === 'asc' ? '▲' : '▼')}
            </div>
            <div className="text-truncate d-flex align-items-center" style={{ flex: '0 0 15%', maxWidth: '15%', paddingLeft: '1rem', cursor: 'pointer' }} onClick={() => handleSort(RecommendationGraphEnum.LABEL_SUG)}>
                Label {orderType === RecommendationGraphEnum.LABEL_SUG && (sortDirection === 'asc' ? '▲' : '▼')}
            </div>
            <div className="pe-3 d-flex align-items-center" style={{ flex: '0 0 20%', maxWidth: '20%' }}>Zastoupené mince</div>
            {!isMobile && <>
                <div className="pe-3 d-flex align-items-center" style={{ flex: '0 0 12.5%', cursor: 'pointer' }} onClick={() => handleSort(RecommendationGraphEnum.CMC_RANK)}>
                    Coinmarket {orderType === RecommendationGraphEnum.CMC_RANK && (sortDirection === 'asc' ? '▲' : '▼')}
                </div>
                <div className="d-flex align-items-center" style={{ flex: '0 0 12%' }}>Pořadí týden</div>
                <div className="d-flex align-items-center" style={{ flex: '0 0 12%' }}>Profit týden</div>
                <div className="text-center d-flex align-items-center justify-content-center" style={{ flex: '0 0 11%' }}>Týden dopor.</div>
            </>}
        </div>
    );

    return (
        <>
            <TitleHeader title="Recommendation" />
            <div className="blog padding-top padding-bottom">
                <div className="container">
                    <div className="row mb-3 sidebar__search" style={{ marginLeft: "0.1rem", marginRight: "0.1rem" }}>
                        <div className="col-md-3">
                            <label className="form-label">{t("Included currencies")}</label>
                            {avaibleCoins && <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={currencyOptions} placeholder={t("Select coins")} noOptionsMessage={() => t("No coins")} value={currencyOptions?.filter((opt) => includeCurrencies.includes(opt.label))} onChange={(selectedOptions) => setIncludedCurrencies(selectedOptions.map((opt) => opt.label))} styles={selectStyles} />}
                        </div>
                        <div className="col-md-3" />
                        <div className="col-sm-6 align-items-end justify-content-end mb-3">
                            <h6 className="mb-10">{t("Search Here")}</h6>
                            <div className="sidebar__search-body">
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="input">
                                        <input type="text" className="form-control" style={{ borderRadius: 4 }} placeholder={t("Search")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                        <button type="submit" className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                                    </div>
                                </form>
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
                                    <RecomendationRow data={item} key={uuidv4()} isLast={index === data.length - 1} />
                                ))}
                            </div>

                            <div ref={loaderRef} style={{ marginTop: '20px' }}>
                                {loading && <AssetRowSkeleton />}
                            </div>
                        </>
                    ) : (
                        <div className="text-center p-5">{t("No data found")}</div>
                    )}
                </div>
            </div>
        </>
    );
};