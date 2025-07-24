import { FC, useEffect, useState, useRef, useCallback } from "react";
import { AssetType } from "../../utils/types/asset/AssetType.ts";
import { useTranslation } from "react-i18next";
import { getAllAssets } from "../../utils/api/binanceIndexAssets.ts";
import { TitleHeader } from "../../components/about/TitleHeader.tsx";
import { pageLimit } from "../../utils/constants";
import {useInfiniteScroll} from "../../utils/hooks/useInfiniteScroll.ts";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {getAvaliableCoins} from "../../utils/api/myPortfolioService.ts";
import {AvailableCoinType} from "../../utils/types/myPortfolio/availableCoinType.ts";
import {AssetRow} from "../../components/graphs/asset/AssetRow.tsx";
import {selectStyles} from "../../styles/selectStyles.ts";
import {AssetRowSkeleton} from "../../components/graphs/asset/AssetRowSkeleton.tsx";
import {AssetOrder} from "../../utils/enums/AssetOrder.ts";
import {useMediaQuery} from "@mui/material";
import {AssetRowMobile} from "../../components/graphs/asset/AssetRowMobile.tsx";

const animatedComponents = makeAnimated();

export const Assets: FC = () => {
    const { t } = useTranslation();
    const [assets, setAssets] = useState<AssetType[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [orderType, setOrderType] = useState<AssetOrder>(AssetOrder.Name);
    const isFetchingRef = useRef<boolean>(false);
    const { currentPage, loaderRef, resetPage } = useInfiniteScroll({totalPages, loading});
    const [currencyCount, setCurrencyCount] = useState<string>("all");
    const [includeCurrencies, setIncludedCurrencies] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Ref to prevent effect from running on initial mount
    const isInitialMount = useRef(true);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    const getAssets = useCallback(async (reset: boolean = false) => {
        if (isFetchingRef.current || (currentPage > totalPages && !reset)) return;
        isFetchingRef.current = true;
        setLoading(true);
        const response = await getAllAssets(reset ? 1 : currentPage, pageLimit, {
            currencyCount,
            includeCurrencies,
            searchQuery,
            order: {
                direction: sortDirection,
                orderType: orderType
            }
        });
        if (response) {
            setAssets((prev) => (reset ? response.data.data : [...prev, ...response.data.data]));
            setTotalPages(response.data.totalPages);
        }
        setLoading(false);
        isFetchingRef.current = false;
    }, [currentPage, orderType, totalPages, currencyCount, includeCurrencies, searchQuery, sortDirection]);
    
    useEffect(() => {
        setAssets([]);
        setTotalPages(1);
    }, [orderType, currencyCount, includeCurrencies, searchQuery, sortDirection]);

    useEffect(() => {
        getAssets(true);
    }, [orderType]);

    // This new useEffect handles automatic filter application
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const handler = setTimeout(() => {
            resetPage();
            getAssets(true);
        }, 500); // Debounce time of 500ms

        return () => {
            clearTimeout(handler);
        };
    }, [currencyCount, includeCurrencies, searchQuery, resetPage, getAssets]);


    useEffect(() => {
        // We avoid fetching on mount because the orderType effect already handles it.
        if (currentPage > 1) {
            getAssets();
        }
    }, [currentPage, getAssets]);


    const handleSort = (column: AssetOrder) => {
        // Pokud klikneme na již aktivní sloupec, jen změníme směr
        if (column === orderType) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            // Pokud klikneme na nový sloupec, nastavíme ho jako aktivní a výchozí směr
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
    const currencyOptions = avaibleCoins?.map((coin) => ({
        value: coin.id.toString(),
        label: coin.name,
    }));

    return (
        <>
            <TitleHeader title="Sets" />
            <div className="blog padding-top padding-bottom">
                <div className="container">
                    <div className="blog__wrapper">
                        <h2>Proč sety?</h2>
                        <p className="text-light">
                            {t("Crypto indices provide a way to measure a performance of a selection of cryptocurrencies")}
                        </p>
                        <h2>Informace o assetech</h2>
                        <p className="text-light">
                            ...
                        </p>
                        <div className="row mb-3 sidebar__search" style={{marginLeft: "0.1rem", marginRight: "0.1rem"}}>
                            <div className="col-md-3">
                                <label className="form-label">{t("Currency count")}</label>
                                <select className="form-select" style={{height: 55, border: "none"}}
                                        value={currencyCount}
                                        onChange={e => setCurrencyCount(e.target.value)}>
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
                                        defaultValue={[currencyOptions![0]]}
                                        isMulti
                                        options={currencyOptions}
                                        placeholder={t("Select coins")}
                                        noOptionsMessage={() => t("No coins")}
                                        value={currencyOptions?.filter((opt) => includeCurrencies.includes(opt.label))}
                                        onChange={(selectedOptions) =>
                                            setIncludedCurrencies(selectedOptions.map((opt) => opt.label))
                                        }
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
                                                style={{borderRadius: 4}}
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

                        <div className="asset-table">
                            {isMobile ? (
                                <>
                                    <div className="table-row fw-bold d-flex align-items-stretch">
                                        <div
                                            className="col-4 fw-bold d-flex align-items-center"
                                            style={{
                                                padding: '0.75rem',
                                                borderTop: '2px solid #d2c6a8',
                                                borderLeft: '2px solid #d2c6a8',
                                                borderRight: '2px solid #d2c6a8',
                                            }}
                                            onClick={() => handleSort(AssetOrder.Name)}
                                        >
                                            Název {orderType === AssetOrder.Name && (sortDirection === 'asc' ? '▲' : '▼')}
                                        </div>
                                        <div className="col-3 text-truncate d-flex align-items-center"
                                             style={{paddingLeft: '1rem'}}
                                             onClick={() => handleSort(AssetOrder.Label)}>Label {orderType === AssetOrder.Label && (sortDirection === 'asc' ? '▲' : '▼')}</div>
                                        <div className="col-5 pe-3 d-flex align-items-center"
                                             style={{paddingLeft: '1rem'}}>Zastoupené mince
                                        </div>
                                    </div>
                                    {assets.map((asset, index) => (
                                        <AssetRowMobile
                                            asset={asset}
                                            key={asset.id}
                                            isLast={index === assets.length - 1}
                                        />
                                    ))}
                                </>
                                ) : (
                                    <>
                                    <div className="table-row fw-bold d-flex align-items-stretch">
                                        <div
                                            className="col-2 fw-bold d-flex align-items-center"
                                            style={{
                                                padding: '0.75rem',
                                                borderTop: '2px solid #d2c6a8',
                                                borderLeft: '2px solid #d2c6a8',
                                                borderRight: '2px solid #d2c6a8',
                                            }}
                                            onClick={() => handleSort(AssetOrder.Name)}
                                        >
                                            Název {orderType === AssetOrder.Name && (sortDirection === 'asc' ? '▲' : '▼')}
                                        </div>
                                        {/* Ostatní hlavičky s vlastními šířkami */}
                                        <div className="text-truncate d-flex align-items-center"
                                             style={{flex: '0 0 19%', maxWidth: '19%', paddingLeft: '1rem'}}
                                             onClick={() => handleSort(AssetOrder.Label)}>Label {orderType === AssetOrder.Label && (sortDirection === 'asc' ? '▲' : '▼')}</div>
                                        <div className="pe-3 d-flex align-items-center" style={{flex: '0 0 12.5%'}}
                                             onClick={() => handleSort(AssetOrder.CreatedDate)}>Vytvořeno {orderType === AssetOrder.CreatedDate && (sortDirection === 'asc' ? '▲' : '▼')}</div>
                                        <div className="pe-3 d-flex align-items-center"
                                             style={{flex: '0 0 22%', maxWidth: '29%'}}>Zastoupené mince
                                        </div>
                                        <div className="col-1 pe-3 d-flex align-items-center">Změna</div>
                                        <div className="pe-3 d-flex align-items-center" style={{flex: '0 0 12%'}}>K
                                            datu
                                        </div>
                                        <div
                                            className="col-1 text-center d-flex align-items-center justify-content-center">Watchlist
                                        </div>
                                    </div>
                                        {assets.map((asset, index) => (
                                            <AssetRow
                                                setAssets={setAssets}
                                                asset={asset}
                                                key={asset.id}
                                                index={asset.id}
                                                isLast={index === assets.length - 1}
                                            />
                                        ))}
                                    </>
                            )}
                        </div>

                        <div ref={loaderRef} style={{marginTop: '20px'}}>
                            {loading && <AssetRowSkeleton/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};