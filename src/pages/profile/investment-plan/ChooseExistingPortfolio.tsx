import {FC, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useSearchParams} from "react-router-dom";
import {coinURL, routes} from "../../../utils/constants";
import {InvestmentPlanLayout} from "../../../components/profile/myPortfolio/InvestmentPlanLayout.tsx";
import {SearchBar} from "../../../components/reusable/SearchBar.tsx";
import {useAssets} from "../../../utils/hooks/useAssets.ts";
import {AssetType} from "../../../utils/types/asset/AssetType.ts";
import {useInfiniteScroll} from "../../../utils/hooks/useInfiniteScroll.ts";
import {AssetOrder} from "../../../utils/enums/AssetOrder.ts";
import {AssetTable} from "../../../components/reusable/AssetTable.tsx";
import {TableColumn} from "../../../utils/types/TableColumn.ts";
import {toCzechDate} from "../../../utils/functions/dateFunctions.ts";
import "../../../styles/sass/components/assets.scss";
import "../../../styles/sass/components/overview.scss";
import {Checkbox} from "../../../components/reusable/Checkbox.tsx";
import {getAllCryptocurrencies, getAllCryptocurrenciesPhoto} from "../../../utils/api/CryptocurrencyService.ts";
import {getTradingCoins} from "../../../utils/api/binanceIndexAssets.ts";
import {CryptoCurrencyAdminType} from "../../../utils/types/asset/CryptoCurrencyType.ts";
import {IoIosArrowBack} from "react-icons/io";
import {AssetGraphPieChart} from "../../../components/graphs/asset/AssetGraphPieChart.tsx";
import {AssetSimpleGraph} from "../../../components/graphs/asset/AssetSimpleGraph.tsx";
import {NextStepButton} from "../../../components/reusable/NextStepButton.tsx";

import {useInvestmentPlanContext} from "../../../utils/providers/InvestmentPlanProvider.tsx";

export const ChooseExistingPortfolio: FC = () => {
  const {t} = useTranslation();
  const currentStep = 0;

  const {
    isCustomPortfolio, setIsCustomPortfolio,
    userPortfolioId, setUserPortfolioId,
    binanceAssetId, setBinanceAssetId
  } = useInvestmentPlanContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const [allCurrencies, setAllCurrencies] = useState<CryptoCurrencyAdminType[]>([]);
  const {assets, loading, totalPages, getAssets, setAssets} = useAssets();
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
  const {currentPage, loaderRef, resetPage} = useInfiniteScroll({totalPages, loading, root: scrollContainer});
  const isFetchingRef = useRef(false);
  const [currencyCount] = useState<string>(searchParams.get("currencyCount") ?? "all");
  const [includeCurrencies] = useState<string[]>(searchParams.get("includeCurrencies")
    ? searchParams.get("includeCurrencies")!.split("|")
    : []);
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("searchQuery") ?? "");
  const [showAssets, setShowAssets] = useState<"mine" | "all">("all");
  const [orderType, setOrderType] = useState<AssetOrder>((searchParams.get("orderBy") as AssetOrder) || AssetOrder.Name);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>((searchParams.get("direction") as 'asc' | 'desc') || 'asc');
  const [timeRange] = useState<string>(searchParams.get("timeRange") || "24h");
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [tradingCoins, setTradingCoins] = useState<string[]>([]);
  const [showNonTradingIndices, setShowNonTradingIndices] = useState<boolean>(false);
  const [showOlderIndices, setShowOlderIndices] = useState<boolean>(false);

  const [selectedRowId, setSelectedRowId] = useState<number | null>(
    isCustomPortfolio ? userPortfolioId : binanceAssetId
  );

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

  const filteredAssets = assets.filter(asset => {
    const tradingFilter = showNonTradingIndices || isAssetTrading(asset);
    const dateFilter = showOlderIndices || isRecentIndex(asset);
    return tradingFilter && dateFilter;
  });

  const simpleColumns: TableColumn<AssetType>[] = [
    {
      key: "name",
      header: t("Title"),
      classNameRow: "table-cell-name",
      classNameHeader: "table-header-cell-name",
      render: a => (
        <span
          title={a.name}
          style={{display: "block", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
        >
          {a.name}
        </span>
      ),
      value: a => a.name
    },
    {
      key: "coins",
      header: t("Coins in Portfolio"),
      classNameRow: "table-cell-coins",
      classNameHeader: "table-header-cell-coins",
      render: a => {
        if (!a.coins) return "";
        const list = a.coins.split(',');
        const firstThree = list.slice(0, 3);
        const firstThreeStrings = list.slice(0, 3).join(', ') + (list.length > 3 ? ', ...' : '');

        return (
          <>
            <div className={"simple-asset-table-crypto-logos-container"}>
              {firstThree.map((symbol => {
                const foundCoin = allCurrencies.find(coin => coin.symbol === symbol);
                return (
                  <div key={symbol} className="crypto-logo">
                    {foundCoin && foundCoin.photo ? (
                      <img src={`${coinURL}/${foundCoin.photo}`} alt={symbol}/>
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'var(--secondary-color)',
                        borderRadius: '50%'
                      }}/>
                    )}
                  </div>
                );
              }))}
            </div>
            <div>{firstThreeStrings}</div>
          </>
        )
      }
    },
    {
      key: "count",
      header: t("Number of Coins"),
      classNameRow: "table-cell-coins-number",
      classNameHeader: "table-header-cell-coins-number",
      render: a => {
        if (!a.coins) return "";
        const list = a.coins.split(',');
        return list.length;
      }
    },
    {
      key: "created",
      header: t("Created"),
      classNameRow: "table-cell-created",
      classNameHeader: "table-header-cell-created",
      render: a => toCzechDate(a.created),
    },
    {
      key: "status",
      header: t("Status"),
      classNameRow: "table-cell-status",
      classNameHeader: "table-header-cell-status",
      render: (a) => {
        const trading = isAssetTrading(a);
        const containerClass = trading ? "color-container--green" : "color-container--red";
        const textClass = trading ? "green-on-primary-color-text" : "red-on-primary-color-text";

        return (
          <span className={`${containerClass} ${textClass}`} style={{fontSize: '0.85rem'}}>
            {trading ? t("Active") : t("Inactive")}
          </span>
        );
      }
    },
    {
      key: "arrow",
      header: "",
      classNameRow: "table-cell-arrow",
      classNameHeader: "table-header-cell-arrow",
      render: () => (
        <div className={"icon-collapsed"} title={t("Expand details")}>
          <IoIosArrowBack/>
        </div>
      )
    }
  ];

  const getAllCurrencies = async () => {
    try {
      const response = await getAllCryptocurrenciesPhoto();
      if (response) {
        setAllCurrencies(response.data);
      }
      const tradingCoinsResponse = await getTradingCoins();
      if (tradingCoinsResponse && tradingCoinsResponse.data) {
        setTradingCoins(tradingCoinsResponse.data);
      }
    } catch (error) {
      console.error("Failed to fetch assets:", error);
    }
  };

  useEffect(() => {
    getAllCurrencies();
  }, []);

  useEffect(() => {
    if (isFetchingRef.current || showAssets === 'mine') return;

    isFetchingRef.current = true;
    const handler = setTimeout(() => {
      resetPage();
      getAssets({
        page: 1,
        currencyCount,
        includeCurrencies,
        searchQuery,
        orderType,
        sortDirection,
        timeRange,
        isReset: true,
        showAssets
      }).finally(() => {
        isFetchingRef.current = false;
      });
    }, 500);

    return () => {
      clearTimeout(handler);
      isFetchingRef.current = false;
    };
  }, [currencyCount, includeCurrencies, searchQuery, orderType, sortDirection, timeRange]);

  useEffect(() => {
    if (currentPage === 1 || currentPage > totalPages) return;
    if (loading || showAssets === 'mine') return;

    setLoadingPage(true);
    getAssets({
      page: currentPage,
      currencyCount,
      includeCurrencies,
      searchQuery,
      orderType,
      sortDirection,
      timeRange,
      isReset: false,
      showAssets
    }).finally(() => {
      setLoadingPage(false);
    });
  }, [currentPage]);

  const handleSort = (column: AssetOrder) => {
    // ... (tvoj kód)
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchParams(prev => {
      if (value) prev.set("searchQuery", value);
      else prev.delete("searchQuery");
      return prev;
    });
  };

  const handleCheckbox = (isChecked: boolean) => {
    isChecked ? setShowAssets("mine") : setShowAssets("all");
  };

  const handleRowClick = (asset: AssetType) => {
    if (selectedRowId === asset.id) {
      setSelectedRowId(null);
      setIsCustomPortfolio(false);
      setUserPortfolioId(null);
      setBinanceAssetId(null);
    } else {
      setSelectedRowId(asset.id);
      const isCustom = false;

      setIsCustomPortfolio(isCustom);

      if (isCustom) {
        setUserPortfolioId(asset.id);
        setBinanceAssetId(null);
      } else {
        setBinanceAssetId(asset.id);
        setUserPortfolioId(null);
      }
    }
  };

  return (
    <>
      <InvestmentPlanLayout title="New Investment Plan" currentStep={currentStep}
                            currentStepFinished={selectedRowId != null}>
        <h3 style={{marginBottom: "-15px"}}>{t("Choose from Existing Portfolios")}</h3>
        <Link to={routes.profile.newInvestmentPlanNewPortfolio}
              className="link-underline">{t("Create new portfolio instead")}</Link>

        <div className="mt-5" style={{display: "flex"}}>
          <div className="d-flex gap-4 w-100 mt-4">
            <Checkbox
              checked={showNonTradingIndices}
              onChange={setShowNonTradingIndices}
              label={t("Show inactive indices")}
            />
            <Checkbox
              checked={showOlderIndices}
              onChange={setShowOlderIndices}
              label={t("Show older indices")}
            />
          </div>
          <SearchBar onChange={handleSearchChange} value={searchQuery}
                     style={{marginLeft: "auto"}}></SearchBar>
        </div>

        {/* Show table */}
        <div className="scrollable-table-container mt-4" ref={setScrollContainer}>
          {filteredAssets.length > 0 ? (
            <>
              <AssetTable
                data={filteredAssets}
                columns={simpleColumns}
                className={"style-2"}
                onRowClick={handleRowClick}
                activeRowIds={selectedRowId}
                renderDetail={(asset) => {
                  return (
                    <div
                      className="asset-table-expand-section d-flex justify-content-between gap-4">
                      <div className="d-flex flex-column align-items-center" style={{flex: 1}}>
                        <h6 className="mb-2 font-weight-bold">{t("Portfolio Composition")}</h6>
                        <AssetGraphPieChart assetName={asset.name}/>
                      </div>

                      <div className="d-flex flex-column align-items-center" style={{flex: 1}}>
                        <h6 className="mb-2 font-weight-bold">{t("Monthly Price Change")}</h6>
                        <div style={{
                          backgroundColor: "var(--cream-color)",
                          borderRadius: "5px",
                          minWidth: "60%",
                          height: "150px",
                        }}>
                          <AssetSimpleGraph assetName={asset.name}/>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />

              {loadingPage && (
                <div className="text-center p-3" style={{color: "var(--gray-1-color)"}}>
                  {t("Loading...")}
                </div>
              )}
            </>
          ) : (
            loading ?
              <div className="text-center p-5 no-data-found">{t("Loading data...")}</div> :
              <div className="text-center p-5 no-data-found">{t("No data found")}</div>
          )}

          {assets.length > 0 && currentPage < totalPages && (
            <div ref={loaderRef}></div>
          )}
        </div>

        <div className={"d-flex justify-content-between"}>
          <NextStepButton currentStep={currentStep} currentStepFinished={selectedRowId != null}
                          link={routes.profile.newInvestmentPlan} variant={"previous"}
                          buttonLabel={t("Select existing or new")} color={"transparent"}/>
          <NextStepButton currentStep={currentStep} currentStepFinished={selectedRowId != null}
                          link={routes.profile.newInvestmentPlanRecurringInvestment}/>
        </div>
      </InvestmentPlanLayout>
    </>
  );
};