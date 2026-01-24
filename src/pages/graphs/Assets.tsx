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
import {Button, ButtonColor} from "../../components/reusable/Button.tsx";
import "../../styles/sass/components/assets.scss";
import {FaSearch} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { CustomHeaderToggle } from "../../components/reusable/CustomHeaderToggle.tsx";

const animatedComponents = makeAnimated();

const timeRangeOptions = [
    { label: '7d', value: '7d' },
    { label: '30d', value: '30d' },
    { label: '3m', value: '3m' },
    { label: '1y', value: '1y' },
];

export const Assets: FC = () => {
    const { t } = useTranslation();
    const { user } = useUserContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const [assets, setAssets] = useState<AssetType[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const isFetchingRef = useRef<boolean>(false);
    const { currentPage, loaderRef, resetPage } = useInfiniteScroll({ totalPages, loading });
    const [currencyCount, setCurrencyCount] = useState<string>(searchParams.get("currencyCount") ?? "all");
    const [includeCurrencies, setIncludedCurrencies] = useState<string[]>(searchParams.get("includeCurrencies")
        ? searchParams.get("includeCurrencies")!.split("|")
        : []);
    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("searchQuery") ?? "");
    const [showMyPortfolio, setShowMyPortfolio] = useState<"mine" | "all">("all");
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isInitialMount = useRef(true);
    const [isHeaderSticky, setIsHeaderSticky] = useState(false);
    const originalHeaderRef = useRef<HTMLDivElement | null>(null);
    const stickyHeaderRef = useRef<HTMLDivElement | null>(null);
    const [avaibleCoins, setAvaibleCoins] = useState<AvailableCoinType[]>();
    const [isScrollEnabled, setIsScrollEnabled] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [orderType, setOrderType] = useState<AssetOrder>((searchParams.get("orderBy") as AssetOrder) || AssetOrder.Name);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>((searchParams.get("direction") as 'asc' | 'desc') || 'asc');
    const [timeRange, setTimeRange] = useState<string>(searchParams.get("timeRange") || "24h");

    
    const getAssets = useCallback(async (pageToFetch: number, isReset: boolean = false) => {
        if (isFetchingRef.current || showMyPortfolio === "mine") return;
        if (!isReset && pageToFetch > totalPages) return;

        isFetchingRef.current = true;
        setLoading(true);
        try {
            const response = await getAllAssets(
                pageToFetch,
                pageLimit,
                {
                    currencyCount,
                    includeCurrencies,
                    searchQuery,
                    order: { direction: sortDirection, orderType: orderType, timeRange: timeRange }
                }
            );
            if (response) {
                setAssets((prev) => (isReset ? response.data.data : [...prev, ...response.data.data]));
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.error("Failed to fetch assets:", error);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, [orderType, sortDirection, currencyCount, includeCurrencies, searchQuery, totalPages, showMyPortfolio]);

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

    useEffect(() => {
        if (firstLoad && showMyPortfolio === 'all') {
            getAssets(1, true);
            setFirstLoad(false);
        }
    }, [firstLoad, showMyPortfolio, getAssets]);

    useEffect(() => {
        if (showMyPortfolio === 'all') {
            resetPage();
        }
    }, [orderType, sortDirection, showMyPortfolio, resetPage]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        if (showMyPortfolio === 'mine') return;
        const handler = setTimeout(() => {
            resetPage();
            getAssets(1, true);
        }, 500);
        return () => clearTimeout(handler);
    }, [currencyCount, includeCurrencies, searchQuery, getAssets, resetPage, showMyPortfolio]);

    useEffect(() => {
        if (currentPage > 1 && showMyPortfolio === 'all' && isScrollEnabled) {
            getAssets(currentPage, false);
        }
    }, [currentPage, getAssets, showMyPortfolio, isScrollEnabled]);

    useEffect(() => {
        if (showMyPortfolio === 'mine') return;
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
                const { width } = entry.contentRect;
                if (stickyHeaderRef.current) {
                    stickyHeaderRef.current.style.width = `${width}px`;
                }
            }
        });

        window.addEventListener('scroll', handleScroll);
        resizeObserver.observe(headerElement);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            resizeObserver.unobserve(headerElement);
        };
    }, [assets, loading, showMyPortfolio]);

    const handleSort = (column: AssetOrder) => {
        let newDirection: 'asc' | 'desc' = 'asc';
        let newOrderType = column;

        if (column === orderType) {
            newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            newDirection = 'desc';
        }
        setOrderType(newOrderType);
        setSortDirection(newDirection);
        setSearchParams(prev => {
            prev.set("orderBy", column);
            prev.set("direction", newDirection);
            return prev;
        });
    };

    useEffect(() => {
        setAssets([]);
        getAssets(1, true);
        setFirstLoad(false);
    }, [orderType, sortDirection, timeRange]);

    const currencyOptions = avaibleCoins?.map((coin) => ({ value: coin.id.toString(), label: coin.name }));
    const hasMore = currentPage < totalPages;

    const handleLoadMoreClick = () => {
        setIsScrollEnabled(true);
        getAssets(1, true);
    };

    const handleCurrencyCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setCurrencyCount(value);
        setSearchParams(prev => {
            if (value === "all") prev.delete("currencyCount");
            else prev.set("currencyCount", value);
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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setSearchParams(prev => {
            if (value) prev.set("searchQuery", value);
            else prev.delete("searchQuery");
            return prev;
        });
    };

    const handleTimeRangeChange = (newRange: string) => {
        setTimeRange(newRange);
        setOrderType(AssetOrder.Change);
        setSortDirection((prevState) => prevState === 'desc' ? 'asc' : "desc");
        setSearchParams(prev => {
            prev.set("timeRange", newRange);
            prev.set("orderBy", AssetOrder.Change);
            prev.set("direction", sortDirection === 'asc' ? 'desc' : 'asc');
            return prev;
        });
    };

    const tableHeaderContent = (
        <div className="table-header-row fw-bold d-flex align-items-stretch">
            {isMobile ? (
                <>
                    <div className="table-header-cell table-header-cell-name-mobile" onClick={() => handleSort(AssetOrder.Name)}>{t("Title")} {orderType === AssetOrder.Name && (sortDirection === 'asc' ? '▲' : '▼')}</div>
                    <div className="table-header-cell table-header-cell-label-mobile text-truncate" onClick={() => handleSort(AssetOrder.Label)}>Label {orderType === AssetOrder.Label && (sortDirection === 'asc' ? '▲' : '▼')}</div>
                    <div className="table-header-cell table-header-cell-coins-mobile pe-3">{t("Coins represented")}</div>
                </>
            ) : (
                <>
                    <div className="table-header-cell table-header-cell-name" onClick={() => handleSort(AssetOrder.Name)}>{t("Title")} {orderType === AssetOrder.Name && (sortDirection === 'asc' ? '▲' : '▼')}</div>
                    <div className="table-header-cell table-header-cell-label" onClick={() => handleSort(AssetOrder.Label)}>Label {orderType === AssetOrder.Label && (sortDirection === 'asc' ? '▲' : '▼')}</div>
                    <div className="table-header-cell table-header-cell-created pe-4" onClick={() => handleSort(AssetOrder.CreatedDate)}>{t("Created")} {orderType === AssetOrder.CreatedDate && (sortDirection === 'asc' ? '▲' : '▼')}</div>
                    <div className="table-header-cell table-header-cell-coins pe-3">{t("Coins represented")}</div>
                    <div className="table-header-cell table-header-cell-change">
                        <Dropdown onSelect={(k) => k && handleTimeRangeChange(k)}>
                            <Dropdown.Toggle as={CustomHeaderToggle} id="dropdown-custom-components">
                                <span style={{maxWidth:130, overflow:"hidden"}}>
                                    {orderType !== AssetOrder.Change ? t("Change") : t("Ch")} ({timeRange})
                                    {orderType === AssetOrder.Change && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ minWidth: '80px' }}>
                                {timeRangeOptions.map((opt) => (
                                    <Dropdown.Item
                                        key={opt.value}
                                        eventKey={opt.value}
                                        active={timeRange === opt.value}
                                    >
                                        {opt.label}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="table-header-cell table-header-cell-to-date pe-3">{t("To date")}</div>
                    <div className="table-header-cell table-header-cell-watchlist text-center d-flex align-items-center justify-content-center">Watchlist</div>
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
                        <div className="info-box">
                            <h3 className="info-box-heading">{t("What Is Index")}</h3>
                            <p className="info-box-text">{t("Index is a set of cryptocurrencies grouped together to measure performance of the set as a whole, rather than focusing single coin.")}</p>
                            <h3 className="info-box-heading">{t("Advantages of Indices")}</h3>
                            <p className="info-box-text">{t("Trading indices can be more beneficial because they are diversified, therefore they may be less vulnerable to sudden market fluctuations. Another advantage is that investors don’t need worry about managing multiple assets at once.")}</p>
                            <h3 className="info-box-heading">{t("Index Composition and Weighting")}</h3>
                            <p className="info-box-text">{t("The number of coins contained in an index varies significantly. Some indices track only a few coins, while others may follow hundreds or even thousands of them. The coins within an index also carry different weights, which determine their impact on overall performance. The higher the weight of a coin, the greater its influence on the index.")}</p>
                        </div>
                        <h3>{t("List of indexes")}</h3>
                        {user && (
                            <Row className="justify-content-center align-items-center mb-3">
                                <Col xs="auto">
                                    <Form.Check type="switch" id="category-switch" label={t("Show my")} onChange={() => setShowMyPortfolio(showMyPortfolio === "mine" ? "all" : "mine")} checked={showMyPortfolio === "mine"} />
                                </Col>
                            </Row>
                        )}
                        {showMyPortfolio === "mine" ? (
                            <MyPortfolio />
                        ) : (
                            <>
                                <div className="row mb-5 sidebar__search search-row-spacing" style={{ backgroundColor: "rgba(64, 51, 38, 0.8)" }}>
                                    <p style={{fontSize:25, fontWeight:500, color:"white"}}>{t("Filters")}</p>
                                    <div className="col-md-3">
                                        <h6 className="form-label mb-1">{t("Currency count")}</h6>
                                        <select className="form-select custom-form-select" value={currencyCount} onChange={handleCurrencyCountChange}>
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
                                    <div className="col-sm-6 align-items-end justify-content-end">
                                        <h6 className="form-label">{t("Search by name")}</h6>
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
                                {assets.length > 0 ? (
                                    <>
                                        <div ref={stickyHeaderRef} className={`sticky-header-active ${isHeaderSticky ? 'is-sticky' : ''}`}>
                                            {tableHeaderContent}
                                        </div>
                                        <div className="asset-table">
                                            <div ref={originalHeaderRef}>
                                                {tableHeaderContent}
                                            </div>
                                            <div className="asset-table-body">
                                                {isMobile ? (
                                                    assets.map((asset, index) => <AssetRowMobile asset={asset} key={asset.id} isLast={index === assets.length - 1} />)
                                                ) : (
                                                    assets.map((asset, index) => <AssetRow setAssets={setAssets} asset={asset} key={asset.id} index={asset.id} isLast={index === assets.length - 1} />)
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-5 no-data-found">{t("No data found")}</div>
                                )}
                            </>
                        )}
                        <div className="load-more-container">
                            {hasMore && showMyPortfolio === 'all' && (
                                isScrollEnabled ? (
                                    <div ref={loaderRef}>
                                        {loading && <AssetRowSkeleton />}
                                    </div>
                                ) : (
                                    <div className="d-flex justify-content-center">
                                        <Button color={ButtonColor.transparent} style={{color: "#ae9647"}} onClick={handleLoadMoreClick}>Načíst další</Button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};