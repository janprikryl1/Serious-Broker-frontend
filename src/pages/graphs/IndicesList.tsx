import {FC, useEffect, useState, useRef, useCallback, useMemo} from "react";
import {AssetType} from "../../utils/types/asset/AssetType.ts";
import {useTranslation} from "react-i18next";
import {getAllAssets, getTradingCoins} from "../../utils/api/binanceIndexAssets.ts";
import {pageLimit, routes} from "../../utils/constants";
import {useInfiniteScroll} from "../../utils/hooks/useInfiniteScroll.ts";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {getAvailableCoins} from "../../utils/api/myPortfolioService.ts";
import {AvailableCoinType} from "../../utils/types/myPortfolio/availableCoinType.ts";
import {IndexRow} from "../../components/graphs/asset/IndexRow.tsx";
import {selectStyles} from "../../styles/selectStyles.ts";
import {CustomDropdownIndicator} from "../../components/reusable/CustomDropdownIndicator.tsx";
import {AssetRowSkeleton} from "../../components/graphs/asset/AssetRowSkeleton.tsx";
import {AssetOrder} from "../../utils/enums/AssetOrder.ts";
import {useMediaQuery} from "@mui/material";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {Button, ButtonColor} from "../../components/reusable/Button.tsx";
import "../../styles/sass/components/assets.scss";
import {useSearchParams} from "react-router-dom";
import {OutlineContainer} from "../../components/reusable/OutlineContainer.tsx";
import {SearchBar} from "../../components/reusable/SearchBar.tsx";
import {getAllCryptocurrenciesPhoto} from "../../utils/api/CryptocurrencyService.ts";
import {CryptoCurrencyAdminType} from "../../utils/types/asset/CryptoCurrencyType.ts";
import {Checkbox} from "../../components/reusable/Checkbox.tsx";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {CollapsibleInfoBox} from "../../components/reusable/CollapsibleInfoBox.tsx";

const animatedComponents = makeAnimated();

/*const timeRangeOptions = [
  {label: '7d', value: '7d'},
  {label: '30d', value: '30d'},
  {label: '3m', value: '3m'},
  {label: '1y', value: '1y'},
];*/

export const IndicesList: FC = () => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [assets, setAssets] = useState<AssetType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const isFetchingRef = useRef<boolean>(false);
  const {currentPage, loaderRef, resetPage} = useInfiniteScroll({totalPages, loading});
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
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [orderType, setOrderType] = useState<AssetOrder>((searchParams.get("orderBy") as AssetOrder) || AssetOrder.Name);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>((searchParams.get("direction") as 'asc' | 'desc') || 'asc');
  const [timeRange, setTimeRange] = useState<string>(searchParams.get("timeRange") || "7d");
  const [allCurrencies, setAllCurrencies] = useState<CryptoCurrencyAdminType[]>([]);
  const [tradingCoins, setTradingCoins] = useState<string[]>([]);
  const [showNonTradingIndices, setShowNonTradingIndices] = useState<boolean>(false);
  const [showOlderIndices, setShowOlderIndices] = useState<boolean>(false);

  // Filter by year
  const isRecentIndex = (asset: AssetType): boolean => {
    const createdDate = new Date(asset.created);
    const year = createdDate.getFullYear();
    return year >= 2025;
  };

  // Filter only trading coins
  const isAssetTrading = (asset: AssetType): boolean => {
    if (tradingCoins.length === 0) return true;
    const assetCoins = asset.coins.split(',').map(coin => coin.trim().toUpperCase());
    const upperTradingCoins = tradingCoins.map(coin => coin.toUpperCase());
    return assetCoins.every(coin => upperTradingCoins.includes(coin));
  };

/*  const filteredAssets = assets.filter(asset => {
    const tradingFilter = showNonTradingIndices || isAssetTrading(asset);
    const dateFilter = showOlderIndices || isRecentIndex(asset);
    return tradingFilter && dateFilter;
  });*/

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const tradingFilter = showNonTradingIndices || isAssetTrading(asset);
      const dateFilter = showOlderIndices || isRecentIndex(asset);
      return tradingFilter && dateFilter;
    });
  }, [assets, showNonTradingIndices, showOlderIndices, tradingCoins]);

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
          order: {direction: sortDirection, orderType: orderType, timeRange: timeRange}
        }
      );
      if (response) {
        setAssets((prev) => (isReset ? response.data.data : [...prev, ...response.data.data]));
        setTotalPages(response.data.totalPages);
        console.log(response)
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
        const response = await getAvailableCoins();
        setAvaibleCoins(response.data);

        const currenciesResponse = await getAllCryptocurrenciesPhoto();
        if (currenciesResponse) {
          setAllCurrencies(currenciesResponse.data);
        }

        const tradingCoinsResponse = await getTradingCoins();
        if (tradingCoinsResponse && tradingCoinsResponse.data) {
          setTradingCoins(tradingCoinsResponse.data);
        }
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

/*  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (showMyPortfolio === 'mine') return;
    const handler = setTimeout(() => {
      resetPage();
      getAssets(1, true);
    }, 500);
    return () => clearTimeout(handler);\n  }, [currencyCount, includeCurrencies, searchQuery, getAssets, resetPage, showMyPortfolio]);*/

  // Tento useEffect zaistí, že sa pri zmene lokálnych filtrov vyčistí pole assets
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
  }, [currencyCount, includeCurrencies, searchQuery, showNonTradingIndices, showOlderIndices, getAssets, resetPage, showMyPortfolio]);

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
        const {width} = entry.contentRect;
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

  const currencyOptions = avaibleCoins?.map((coin) => ({value: coin.id.toString(), label: coin.name}));
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
    <div className="table-header-row fw-bold tw-text-xs sm:tw-text-sm md:tw-text-base d-flex align-items-stretch">
      <div className="table-header-cell table-header-cell-name__index"
           onClick={() => handleSort(AssetOrder.Name)}>{t("Name")} {orderType === AssetOrder.Name && (sortDirection === 'asc' ? '▲' : '▼')}</div>
      <div className="table-header-cell table-header-cell-coins__index pe-3">{t("Coins represented")}</div>
      <div className="table-header-cell table-header-cell-change__index">
        {/*<Dropdown onSelect={(k) => k && handleTimeRangeChange(k)}>
          <Dropdown.Toggle as={CustomHeaderToggle} id="dropdown-custom-components">
                            <span style={{maxWidth: 130, overflow: "hidden"}}>
                                {orderType !== AssetOrder.Change ? t("Change") : t("Ch")} ({timeRange})
                              {orderType === AssetOrder.Change && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{minWidth: '80px'}}>
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
        </Dropdown>*/}
        {t("Change (7D)")}
      </div>
      <div className="table-header-cell table-header-cell-to-date__index pe-3">{t("To date")}</div>
      <div className="table-header-cell table-header-cell-created__index pe-4"
           onClick={() => handleSort(AssetOrder.CreatedDate)}>{t("Created")} {orderType === AssetOrder.CreatedDate && (sortDirection === 'asc' ? '▲' : '▼')}</div>
      <div className="table-header-cell table-header-cell-status__index text-center d-flex align-items-center justify-content-center">{t("Status")}</div>
      <div className="table-header-cell table-header-cell-watchlist__index text-center d-flex align-items-center justify-content-center"></div>
    </div>
  );

  return (
    <>
      <TitleHeader title={t("Indices")} img={"src/utils/icons/coins/coins_group.svg"} imgClassname="tw-h-[70px] lg:tw-h-[100px]" />
      <div className="">
        <div className="container">
          <div className="">
            <CollapsibleInfoBox
              title={t("What Is an Index")}
              initialText={t("Index is a set of cryptocurrencies grouped together to measure performance of the set as a whole, rather than focusing on single coin.")}
              className="mb-5 tw-text-xs sm:tw-text-sm md:tw-text-base"
            >
              <h5 className="tw-text-sm sm:tw-text-base md:tw-text-lg tw-font-semibold tw-mt-4 tw-mb-2">{t("Advantages of Indices")}</h5>
              <p className="tw-text-xs sm:tw-text-sm md:tw-text-base tw-text-stone-300">{t("Trading indices can be more beneficial because they are diversified, therefore they may be less vulnerable to sudden market fluctuations. Another advantage is that investors don’t need worry about managing multiple assets at once.")}</p>

              <h5 className="tw-text-sm sm:tw-text-base md:tw-text-lg tw-font-semibold tw-mt-4 tw-mb-2">{t("Index Composition and Weighting")}</h5>
              <p className="tw-text-xs sm:tw-text-sm md:tw-text-base tw-text-stone-300">{t("The number of coins contained in an index varies significantly. Some indices track only a few coins, while others may follow hundreds or even thousands of them. The coins within an index also carry different weights, which determine their impact on overall performance. The higher the weight of a coin, the greater its influence on the index.")}</p>
            </CollapsibleInfoBox>

            {/*<h5>{t("Filters")}</h5>*/}
            <h5 className="tw-text-base sm:tw-text-lg md:tw-text-xl tw-font-semibold tw-mb-3">{t("List of Indices")}</h5>

            <div className={"tw-pb-16"}>
              <div className="d-flex gap-4 w-100 flex-wrap">
                <div className="d-flex flex-column">
                  <label className="tw-mb-1 tw-text-xs sm:tw-text-sm tw-text-stone-300">
                    {t("Currency count")}
                  </label>
                  <select className="form-select select-box-outline tw-text-xs sm:tw-text-sm md:tw-text-base" value={currencyCount} onChange={handleCurrencyCountChange} style={{width: "80px"}}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="all">{t("All")}</option>
                  </select>
                </div>
                <div className="d-flex flex-column flex-grow-1" style={{ minWidth: '200px' }}>
                  <label className="tw-mb-1 tw-text-xs sm:tw-text-sm tw-text-stone-300">
                    {t("Included currencies")}
                  </label>
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
                  <label className="tw-mb-1 tw-text-xs sm:tw-text-sm tw-text-stone-300">
                    {t("Search by name")}
                  </label>
                  <SearchBar value={searchQuery} onChange={handleSearchChange} />
                </div>
              </div>
              <div className="container d-flex flex-column flex-md-row gap-5 w-100 mt-4 m-0 p-0 tw-text-xs sm:tw-text-sm md:tw-text-base">
                <Checkbox
                  checked={showNonTradingIndices}
                  onChange={setShowNonTradingIndices}
                  label="Show non-traded indices"
                />
                <Checkbox
                  checked={showOlderIndices}
                  onChange={setShowOlderIndices}
                  label="Show older indices"
                />
              </div>
            </div>

            {/*<h5>{t("List of Indices")}</h5>*/}

            {filteredAssets.length > 0 ? (
              <>
                {/*<div ref={stickyHeaderRef} className={`sticky-header-active ${isHeaderSticky ? 'is-sticky' : ''}`}>
                  {tableHeaderContent}
                </div>*/}
                <div className="asset-table">
                  <div ref={originalHeaderRef}>
                    {tableHeaderContent}
                  </div>
                  <div className="asset-table-body">
                    {filteredAssets.map((asset, index) => (
                      <IndexRow
                        setAssets={setAssets}
                        asset={asset}
                        key={`${asset.id}-${index}`}
                        index={asset.id}
                        isLast={index === filteredAssets.length - 1}
                        allCurrencies={allCurrencies}
                        tradingCoins={tradingCoins}
                        isAssetTrading={isAssetTrading}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              loading ?
                <AssetRowSkeleton /> :
                <div className="text-center p-5 no-data-found tw-text-sm sm:tw-text-base">{t("No data found")}</div>
            )}
            <div className="load-more-container">
              {hasMore && showMyPortfolio === 'all' && (
                isScrollEnabled ? (
                  <div ref={loaderRef}>
                    {loading && <AssetRowSkeleton/>}
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <Button color={ButtonColor.transparent} onClick={handleLoadMoreClick} style={{color: "var(--secondary-color)", fontWeight: 400}} className={"tw-text-xs sm:tw-text-sm md:tw-text-base"}>{t("Load more")}</Button>
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