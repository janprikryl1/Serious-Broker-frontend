import { FC, useEffect, useState, useRef, useCallback } from "react";
import { AssetType } from "../../utils/types/asset/AssetType.ts";
import { useTranslation } from "react-i18next";
import { getAllAssets } from "../../utils/api/binanceIndexAssets.ts";
import { TitleHeader } from "../../components/about/TitleHeader.tsx";
import { pageLimit } from "../../utils/constants";
import { useInfiniteScroll } from "../../utils/hooks/useInfiniteScroll.ts";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getAvaliableCoins } from "../../utils/api/myPortfolioService.ts";
import { AvailableCoinType } from "../../utils/types/myPortfolio/availableCoinType.ts";
import { AssetRow } from "../../components/graphs/asset/AssetRow.tsx";
import { selectStyles } from "../../styles/selectStyles.ts";
import { AssetRowSkeleton } from "../../components/graphs/asset/AssetRowSkeleton.tsx";
import { AssetOrder } from "../../utils/enums/AssetOrder.ts";
import { useMediaQuery } from "@mui/material";
import { AssetRowMobile } from "../../components/graphs/asset/AssetRowMobile.tsx";
import { useUserContext } from "../../utils/providers/providerUser.tsx";
import { MyPortfolio } from "../profile/MyPortfolio.tsx";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const animatedComponents = makeAnimated();

export const Assets: FC = () => {
    const { t } = useTranslation();
    const { user } = useUserContext();
    const [assets, setAssets] = useState<AssetType[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [orderType, setOrderType] = useState<AssetOrder>(AssetOrder.Name);
    const isFetchingRef = useRef<boolean>(false);
    const { currentPage, loaderRef, resetPage } = useInfiniteScroll({ totalPages, loading });
    const [currencyCount, setCurrencyCount] = useState<string>("all");
    const [includeCurrencies, setIncludedCurrencies] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [showMyPortfolio, setShowMyPortfolio] = useState<"mine" | "all">("all");
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isInitialMount = useRef(true);
    const [isHeaderSticky, setIsHeaderSticky] = useState(false);
    const originalHeaderRef = useRef<HTMLDivElement | null>(null);
    const stickyHeaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (showMyPortfolio === 'mine') return;
        const headerElement = originalHeaderRef.current;
        if (!headerElement) return;

        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                setIsHeaderSticky(!entry.isIntersecting && entry.boundingClientRect.y < 0);
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
                const { width } = entry.contentRect;
                stickyHeaderElement.style.width = `${width}px`;
            }
        });
        resizeObserver.observe(headerElement);

        return () => {
            intersectionObserver.unobserve(headerElement);
            resizeObserver.unobserve(headerElement);
        };
    }, [assets, loading, showMyPortfolio]);

    const handleSearch = (value: string) => { setSearchQuery(value); };

    const getAssets = useCallback(async (reset: boolean = false) => {
        if (isFetchingRef.current || (currentPage > totalPages && !reset) || showMyPortfolio === "mine") return;

        isFetchingRef.current = true;
        setLoading(true);
        try {
            const response = await getAllAssets(
                reset ? 1 : currentPage,
                pageLimit,
                {
                    currencyCount,
                    includeCurrencies,
                    searchQuery,
                    order: { direction: sortDirection, orderType: orderType }
                }
            );
            if (response) {
                setAssets((prev) => (reset ? response.data.data : [...prev, ...response.data.data]));
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.error("Failed to fetch assets:", error);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, [currentPage, orderType, totalPages, currencyCount, includeCurrencies, searchQuery, sortDirection, showMyPortfolio]);

    useEffect(() => {
        setAssets([]);
        setTotalPages(1);
    }, [orderType, currencyCount, includeCurrencies, searchQuery, sortDirection]);

    useEffect(() => {
        if (showMyPortfolio === 'all') {
            getAssets(true);
        }
    }, [orderType, sortDirection, showMyPortfolio]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        const handler = setTimeout(() => {
            resetPage();
            getAssets(true);
        }, 500);
        return () => clearTimeout(handler);
    }, [currencyCount, includeCurrencies, searchQuery]);

    useEffect(() => {
        if (currentPage > 1) {
            getAssets();
        }
    }, [currentPage, getAssets]);

    const handleSort = (column: AssetOrder) => {
        if (column === orderType) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setOrderType(column);
            setSortDirection('desc');
        }
    };

    const [avaibleCoins, setAvaibleCoins] = useState<AvailableCoinType[]>();
    useEffect(() => {
        (async () => {
            try {
                const response = await getAvaliableCoins();
                setAvaibleCoins(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);
    const currencyOptions = avaibleCoins?.map((coin) => ({ value: coin.id.toString(), label: coin.name }));

    const tableHeaderContent = (
        <div className="table-row fw-bold d-flex align-items-stretch">
            {isMobile ? (
                <>
                    <div className="col-4 fw-bold d-flex align-items-center" style={{ padding: '0.75rem', borderTop: '2px solid #d2c6a8', borderLeft: '2px solid #d2c6a8', borderRight: '2px solid #d2c6a8', cursor: 'pointer' }} onClick={() => handleSort(AssetOrder.Name)}>Název {orderType === AssetOrder.Name && (sortDirection === 'asc' ? '▲' : '▼')}</div>
                    <div className="col-3 text-truncate d-flex align-items-center" style={{ paddingLeft: '1rem', cursor: 'pointer' }} onClick={() => handleSort(AssetOrder.Label)}>Label {orderType === AssetOrder.Label && (sortDirection === 'asc' ? '▲' : '▼')}</div>
                    <div className="col-5 pe-3 d-flex align-items-center" style={{ paddingLeft: '1rem' }}>Zastoupené mince</div>
                </>
            ) : (
                <>
                    <div className="col-2 fw-bold d-flex align-items-center" style={{ padding: '0.75rem', borderTop: '2px solid #d2c6a8', borderLeft: '2px solid #d2c6a8', borderRight: '2px solid #d2c6a8', cursor: 'pointer' }} onClick={() => handleSort(AssetOrder.Name)}>Název {orderType === AssetOrder.Name && (sortDirection === 'asc' ? '▲' : '▼')}</div>
                    <div className="text-truncate d-flex align-items-center" style={{ flex: '0 0 19%', maxWidth: '19%', paddingLeft: '1rem', cursor: 'pointer' }} onClick={() => handleSort(AssetOrder.Label)}>Label {orderType === AssetOrder.Label && (sortDirection === 'asc' ? '▲' : '▼')}</div>
                    <div className="pe-3 d-flex align-items-center" style={{ flex: '0 0 12.5%', cursor: 'pointer' }} onClick={() => handleSort(AssetOrder.CreatedDate)}>Vytvořeno {orderType === AssetOrder.CreatedDate && (sortDirection === 'asc' ? '▲' : '▼')}</div>
                    <div className="pe-3 d-flex align-items-center" style={{ flex: '0 0 22%', maxWidth: '29%' }}>Zastoupené mince</div>
                    <div className="col-1 pe-3 d-flex align-items-center">Změna</div>
                    <div className="pe-3 d-flex align-items-center" style={{ flex: '0 0 12%' }}>K datu</div>
                    <div className="col-1 text-center d-flex align-items-center justify-content-center">Watchlist</div>
                </>
            )}
        </div>
    );

    return (
        <>
            <TitleHeader title="Sety" />
            <div className="blog padding-top padding-bottom">
                <div className="container">
                    <div className="blog__wrapper">
                        <h2>Proč sety?</h2>
                        <p className="text-light">{t("Crypto indices provide a way to measure a performance of a selection of cryptocurrencies")}</p>
                        <h2>Informace o assetech</h2>
                        <p className="text-light">...</p>
                        {user && (
                            <Row className="justify-content-center align-items-center mb-3">
                                <Col xs="auto">
                                    <Form.Check type="switch" id="category-switch" label={t("Show my portfolios")} onChange={() => setShowMyPortfolio(showMyPortfolio === "mine" ? "all" : "mine")} checked={showMyPortfolio === "mine"} />
                                </Col>
                            </Row>
                        )}
                        {showMyPortfolio === "mine" ? (
                            <MyPortfolio />
                        ) : (
                            <>
                                <div className="row mb-3 sidebar__search" style={{ marginLeft: "0.1rem", marginRight: "0.1rem" }}>
                                    <div className="col-md-3">
                                        <label className="form-label">{t("Currency count")}</label>
                                        <select className="form-select" style={{ height: 55, border: "none" }} value={currencyCount} onChange={e => setCurrencyCount(e.target.value)}>
                                            <option value="all">{t("All")}</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="all">5+</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">{t("Included currencies")}</label>
                                        {avaibleCoins && (
                                            <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                isMulti
                                                options={currencyOptions}
                                                placeholder={t("Select coins")}
                                                noOptionsMessage={() => t("No coins")}
                                                value={currencyOptions?.filter((opt) => includeCurrencies.includes(opt.label))}
                                                onChange={(selectedOptions) => setIncludedCurrencies(selectedOptions.map((opt) => opt.label))}
                                                styles={selectStyles}
                                            />
                                        )}
                                    </div>
                                    <div className="col-sm-6 align-items-end justify-content-end mb-3">
                                        <h6 className="mb-10">{t("Search Here")}</h6>
                                        <div className="sidebar__search-body">
                                            <form onSubmit={(e) => e.preventDefault()}>
                                                <div className="input">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        style={{ borderRadius: 4 }}
                                                        placeholder={t("Search")}
                                                        value={searchQuery}
                                                        onChange={(e) => handleSearch(e.target.value)}
                                                    />
                                                    <button type="submit" className="search-btn">
                                                        <i className="fa-solid fa-magnifying-glass"></i>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div ref={stickyHeaderRef} className={`sticky-header-active ${isHeaderSticky ? 'is-sticky' : ''}`}>{tableHeaderContent}</div>

                                <div className="asset-table">
                                    <div ref={originalHeaderRef} style={{ visibility: isHeaderSticky ? 'hidden' : 'visible' }}>{tableHeaderContent}</div>
                                    <div className="asset-table-body">
                                        {(loading && currentPage === 1) ? (
                                            <AssetRowSkeleton />
                                        ) : isMobile ? (
                                            assets.map((asset, index) => <AssetRowMobile asset={asset} key={asset.id} isLast={index === assets.length - 1} />)
                                        ) : (
                                            assets.map((asset, index) => <AssetRow setAssets={setAssets} asset={asset} key={asset.id} index={asset.id} isLast={index === assets.length - 1} />)
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                        <div ref={loaderRef} style={{ marginTop: '20px' }}>
                            {loading && showMyPortfolio === "all" && <AssetRowSkeleton />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};