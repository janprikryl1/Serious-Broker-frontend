// @ts-nocheck
import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useSearchParams} from "react-router-dom";
import {coinURL, routes} from "../../../utils/constants";
import {InvestmentPlanLayout} from "../../../components/profile/myPortfolio/InvestmentPlanLayout.tsx";
import {SearchBar} from "../../../components/reusable/SearchBar.tsx";
import {useAssets} from "../../../utils/hooks/useAssets.ts";
import {useInfiniteScroll} from "../../../utils/hooks/useInfiniteScroll.ts";
import {AssetOrder} from "../../../utils/enums/AssetOrder.ts";
import {AssetTable} from "../../../components/reusable/AssetTable.tsx";
import {toCzechDate} from "../../../utils/functions/dateFunctions.ts";
import "../../../styles/sass/components/assets.scss";
import "../../../styles/sass/components/overview.scss";
import {Checkbox} from "../../../components/reusable/Checkbox.tsx";
import {getAllCryptocurrenciesPhoto} from "../../../utils/api/CryptocurrencyService.ts";
import {getTradingCoins} from "../../../utils/api/binanceIndexAssets.ts";
import {IoIosArrowBack} from "react-icons/io";
import {AssetGraphPieChart} from "../../../components/graphs/asset/AssetGraphPieChart.tsx";
import {AssetSimpleGraph} from "../../../components/graphs/asset/AssetSimpleGraph.tsx";
import {NextStepButton} from "../../../components/reusable/NextStepButton.tsx";

import {useInvestmentPlanContext} from "../../../utils/providers/InvestmentPlanProvider.tsx";
import useMediaQuery from "@mui/material/useMediaQuery";

export const ChooseExistingPortfolio = () => {
  const {t} = useTranslation();
  const currentStep = 0;

  const {
    isCustomPortfolio, setIsCustomPortfolio,
    userPortfolioId, setUserPortfolioId,
    binanceAssetId, setBinanceAssetId
  } = useInvestmentPlanContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const [allCurrencies, setAllCurrencies] = useState([]);
  const {assets, loading, totalPages, getAssets} = useAssets();
  const [scrollContainer, setScrollContainer] = useState(null);
  const {currentPage, loaderRef, resetPage} = useInfiniteScroll({totalPages, loading, root: scrollContainer});
  const isFetchingRef = useRef(false);
  const [currencyCount] = useState(searchParams.get("currencyCount") ?? "all");
  const [includeCurrencies] = useState(searchParams.get("includeCurrencies")
    ? (searchParams.get("includeCurrencies") || "").split("|")
    : []);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("searchQuery") ?? "");
  const [showAssets, setShowAssets] = useState("all");
  const [orderType, setOrderType] = useState(searchParams.get("orderBy") || AssetOrder.Name);
  const [sortDirection, setSortDirection] = useState(searchParams.get("direction") || 'asc');
  const [timeRange] = useState(searchParams.get("timeRange") || "24h");
  const [loadingPage, setLoadingPage] = useState(false);
  const [tradingCoins, setTradingCoins] = useState([]);
  const [showNonTradingIndices, setShowNonTradingIndices] = useState(false);
  const [showOlderIndices, setShowOlderIndices] = useState(false);
  const isMobile = useMediaQuery('(max-width: 576px)');

  const [selectedRowId, setSelectedRowId] = useState(
    isCustomPortfolio ? userPortfolioId : binanceAssetId
  );

  // Filter by year
  const isRecentIndex = (asset) => {
    const createdDate = new Date(asset.created);
    const year = createdDate.getFullYear();
    return year >= 2025;
  };

  // Filter only trading coins
  const isAssetTrading = (asset) => {
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

  const simpleColumns = [
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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchParams(prev => {
      if (value) prev.set("searchQuery", value);
      else prev.delete("searchQuery");
      return prev;
    });
  };

  const handleRowClick = (asset) => {
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

        <div className="choose-existing-portfolio__filters mt-5">
          <div className="choose-existing-portfolio__checkbox-group d-flex gap-4 w-100 mt-4">
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
          <SearchBar
            className={"outline-searchbar choose-existing-portfolio__search"}
            onChange={handleSearchChange}
            value={searchQuery}
            style={{marginLeft: "auto"}}
          />
        </div>

        {/* Show table */}
        <div className="scrollable-table-container choose-existing-portfolio__table-wrapper mt-4" ref={setScrollContainer}>
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

        <div className={`d-flex ${isMobile ? "flex-column" : "flex-row gap-3"} justify-content-between mt-4`}>
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