import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Accordion } from "react-bootstrap";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

import { useAssets } from "../../../utils/hooks/useAssets.ts";
import { useInfiniteScroll } from "../../../utils/hooks/useInfiniteScroll.ts";
import { AssetOrder } from "../../../utils/enums/AssetOrder.ts";
import { AssetTable } from "../../reusable/AssetTable.tsx";
import { SearchBar } from "../../reusable/SearchBar.tsx";
import { Checkbox } from "../../reusable/Checkbox.tsx";
import { Button, ButtonColor } from "../../reusable/Button.tsx";
import { AssetGraphPieChart } from "../../graphs/asset/AssetGraphPieChart.tsx";
import { AssetSimpleGraph } from "../../graphs/asset/AssetSimpleGraph.tsx";
import { toCzechDate } from "../../../utils/functions/dateFunctions.ts";
import { coinURL } from "../../../utils/constants";
import { getAllCryptocurrenciesPhoto } from "../../../utils/api/CryptocurrencyService.ts";
import { getTradingCoins } from "../../../utils/api/binanceIndexAssets.ts";
import { AssetType } from "../../../utils/types/asset/AssetType.ts";
import { CryptoCurrencyAdminType } from "../../../utils/types/asset/CryptoCurrencyType.ts";

export type ExistingPortfoliosTableProps = {
  selectedAssetId: number | null | undefined;
  onSelectAsset: (asset: AssetType) => void;
  showDetailGraph?: boolean;
  maxContainerHeight?: string; // napr. "max-h-[min(60vh,560px)]" pre modal
};

export const ExistingPortfoliosTable: FC<ExistingPortfoliosTableProps> = ({
                                                                            selectedAssetId,
                                                                            onSelectAsset,
                                                                            showDetailGraph = true,
                                                                            maxContainerHeight,
                                                                          }) => {
  const { t } = useTranslation();
  const isDesktopTable = useMediaQuery("(min-width: 1200px)");

  const [allCurrencies, setAllCurrencies] = useState<CryptoCurrencyAdminType[]>([]);
  const [tradingCoins, setTradingCoins] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNonTradingIndices, setShowNonTradingIndices] = useState(false);
  const [showOlderIndices, setShowOlderIndices] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  const { assets, loading, totalPages, getAssets } = useAssets();
  const { currentPage, loaderRef, resetPage } = useInfiniteScroll({
    totalPages,
    loading,
    root: scrollContainer,
  });

  useEffect(() => {
    (async () => {
      try {
        const [currenciesRes, tradingRes] = await Promise.all([
          getAllCryptocurrenciesPhoto(),
          getTradingCoins(),
        ]);
        if (currenciesRes?.data) setAllCurrencies(currenciesRes.data);
        if (tradingRes?.data) setTradingCoins(tradingRes.data);
      } catch (err) {
        console.error("Failed to fetch currencies/trading coins:", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    const handler = setTimeout(() => {
      resetPage();
      getAssets({
        page: 1,
        currencyCount: "all",
        includeCurrencies: [],
        searchQuery,
        orderType: AssetOrder.Name,
        sortDirection: "asc",
        timeRange: "24h",
        isReset: true,
        showAssets: "all",
      }).finally(() => {
        isFetchingRef.current = false;
      });
    }, 400);

    return () => {
      clearTimeout(handler);
      isFetchingRef.current = false;
    };
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage === 1 || currentPage > totalPages || loading) return;
    setLoadingPage(true);
    getAssets({
      page: currentPage,
      currencyCount: "all",
      includeCurrencies: [],
      searchQuery,
      orderType: AssetOrder.Name,
      sortDirection: "asc",
      timeRange: "24h",
      isReset: false,
      showAssets: "all",
    }).finally(() => {
      setLoadingPage(false);
    });
  }, [currentPage]);

  const isRecentIndex = (asset: AssetType) => new Date(asset.created).getFullYear() >= 2025;

  const isAssetTrading = (asset: AssetType) => {
    if (tradingCoins.length === 0) return true;
    const assetCoins = (asset.coins || "").split(",").map((c) => c.trim().toUpperCase());
    const upperTradingCoins = tradingCoins.map((c) => c.toUpperCase());
    return assetCoins.every((coin) => upperTradingCoins.includes(coin));
  };

  const filteredAssets = assets.filter((asset) => {
    const tradingFilter = showNonTradingIndices || isAssetTrading(asset);
    const dateFilter = showOlderIndices || isRecentIndex(asset);
    return tradingFilter && dateFilter;
  });

  const formatCoins = (coins: string | null | undefined): { list: string[]; firstThree: string[]; string: string } => {
    if (!coins) {
      return { list: [], firstThree: [], string: "-" };
    }
    const list = coins.split(",").map((c) => c.trim()).filter(Boolean);
    const firstThree = list.slice(0, 3);
    const str = firstThree.join(", ") + (list.length > 3 ? ", ..." : "");
    return { list, firstThree, string: str };
  };

  const renderDetail = (asset: AssetType) => {
    if (!showDetailGraph) return null;
    return (
      <div className="tw-flex tw-flex-col tw-justify-between tw-gap-4 lg:tw-flex-row">
        <hr className="tw-my-6 tw-border-t tw-border-white" />
        <div className="tw-flex tw-flex-1 tw-flex-col tw-items-center">
          <h6 className="tw-mb-0 tw-pb-0 tw-text-sm tw-font-bold sm:tw-text-base">
            {t("Portfolio Composition")}
          </h6>
          <AssetGraphPieChart assetName={asset.name} />
        </div>
        <div className="tw-flex tw-flex-1 tw-flex-col tw-items-center">
          <h6 className="tw-mb-2 tw-text-sm tw-font-bold sm:tw-text-base">
            {t("Monthly Price Change")}
          </h6>
          <div className="tw-h-[150px] tw-min-w-[60%] tw-rounded-[5px] tw-bg-[var(--cream-color)]">
            <AssetSimpleGraph assetName={asset.name} />
          </div>
        </div>
        <hr className="tw-mt-6 tw-mb-0 tw-pb-0 tw-border-t tw-border-white" />
      </div>
    );
  };

  const simpleColumns = [
    {
      key: "name",
      header: t("Title"),
      classNameRow: "table-cell-name__index",
      classNameHeader: "table-header-cell-name__index",
      render: (a: AssetType) => (
        <span title={a.name} className="tw-block tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap">
          {a.name}
        </span>
      ),
    },
    {
      key: "coins",
      header: t("Coins in Portfolio"),
      classNameRow: "table-cell-coins__index",
      classNameHeader: "table-header-cell-coins__index",
      render: (a: AssetType) => {
        const { firstThree, string } = formatCoins(a.coins);
        return (
          <div className="tw-flex tw-items-center tw-gap-3">
            <div className="simple-asset-table-crypto-logos-container">
              {firstThree.map((symbol) => {
                const foundCoin = allCurrencies.find((coin) => coin.symbol === symbol);
                return (
                  <div key={symbol} className="crypto-logo">
                    {foundCoin?.photo ? (
                      <img src={`${coinURL}/${foundCoin.photo}`} alt={symbol} />
                    ) : (
                      <div className="tw-h-full tw-w-full tw-rounded-full tw-bg-[var(--secondary-color)]" />
                    )}
                  </div>
                );
              })}
            </div>
            <div>{string}</div>
          </div>
        );
      },
    },
    {
      key: "count",
      header: t("Number of Coins"),
      classNameRow: "table-cell-to-date__index",
      classNameHeader: "table-header-cell-to-date__index",
      render: (a: AssetType) => formatCoins(a.coins).list.length,
    },
    {
      key: "created",
      header: t("Created"),
      classNameRow: "table-cell-created__index",
      classNameHeader: "table-header-cell-created__index",
      render: (a: AssetType) => toCzechDate(a.created),
    },
    {
      key: "status",
      header: t("Status"),
      classNameRow: "table-cell-status__index",
      classNameHeader: "table-header-cell-status__index",
      render: (a: AssetType) => {
        const trading = isAssetTrading(a);
        return (
          <span className={`${trading ? "color-container--green green-color-text" : "color-container--red red-color-text"} tw-text-[0.85rem]`}>
            {trading ? t("Active") : t("Inactive")}
          </span>
        );
      },
    },
    {
      key: "arrow",
      header: "",
      classNameRow: "table-cell-watchlist__index",
      classNameHeader: "table-header-cell-watchlist__index",
      render: () => (
        <div title={t("Expand details")}>
          <IoIosArrowBack />
        </div>
      ),
    },
  ];

  return (
    <div className="tw-w-full">
      {/* Filtre a vyhľadávanie */}
      <div className="tw-mt-3 tw-mb-6 tw-flex tw-flex-col tw-gap-4 lg:tw-flex-row lg:tw-items-end lg:tw-justify-between">
        <div className="tw-flex tw-flex-col tw-gap-3 sm:tw-flex-row sm:tw-gap-5 tw-text-sm sm:tw-text-base">
          <Checkbox checked={showNonTradingIndices} onChange={setShowNonTradingIndices} label={t("Show non-trading indices")} />
          <Checkbox checked={showOlderIndices} onChange={setShowOlderIndices} label={t("Show older indices")} />
        </div>
        <SearchBar
          className="outline-searchbar lg:tw-ml-auto lg:tw-max-w-md tw-border tw-border-solid tw-border-stone-400 tw-border-opacity-30"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>

      {/* Tabuľkový kontajner */}
      <div
        className={`scrollable-table-container tw-w-full tw-overflow-x-auto tw-mt-4 ${
          maxContainerHeight ? `${maxContainerHeight} tw-overflow-y-auto` : ""
        }`}
        ref={setScrollContainer}
      >
        {filteredAssets.length > 0 ? (
          <>
            {isDesktopTable ? (
              <AssetTable
                data={filteredAssets}
                columns={simpleColumns}
                className="style-2 !tw-overflow-visible !tw-w-max tw-min-w-full"
                onRowClick={onSelectAsset}
                activeRowIds={selectedAssetId ?? undefined}
                renderDetail={renderDetail}
              />
            ) : (
              <Accordion alwaysOpen className="tw-flex tw-flex-col tw-gap-3">
                {filteredAssets.map((asset, index) => {
                  const isActive = selectedAssetId === asset.id;
                  const eventKey = String(index);
                  const { list, firstThree, string: firstThreeStrings } = formatCoins(asset.coins);
                  const trading = isAssetTrading(asset);

                  return (
                    <Accordion.Item
                      eventKey={eventKey}
                      key={asset.id ?? index}
                      className={`tw-overflow-hidden !tw-rounded-xl tw-border tw-border-[color-mix(in_srgb,var(--secondary-color),transparent_60%)] ${
                        isActive
                          ? "tw-bg-[color-mix(in_srgb,var(--secondary-color)_30%,transparent)]"
                          : "tw-bg-[color-mix(in_srgb,var(--tertiary-color)_30%,transparent)]"
                      }`}
                    >
                      <div className="tw-p-[14px]">
                        <Accordion.Header className="[&_.accordion-button::after]:tw-ml-3 [&_.accordion-button]:!tw-bg-transparent [&_.accordion-button]:!tw-p-0 [&_.accordion-button]:!tw-text-[var(--white-color)] [&_.accordion-button]:!tw-shadow-none [&_.accordion-button]:tw-text-[0.95rem] [&_.accordion-button]:tw-font-semibold">
                          <span className="tw-block tw-pr-2 tw-text-base sm:tw-text-lg">{asset.name}</span>
                        </Accordion.Header>

                        <div className="tw-mt-3">
                          <div className="tw-mb-1 tw-text-[0.72rem] tw-text-[var(--gray-2-color)]">
                            {t("Coins in Portfolio")}
                          </div>
                          <div className="tw-flex tw-items-center tw-gap-[10px]">
                            <div className="simple-asset-table-crypto-logos-container">
                              {firstThree.map((symbol) => {
                                const foundCoin = allCurrencies.find((coin) => coin.symbol === symbol);
                                return (
                                  <div key={symbol} className="crypto-logo">
                                    {foundCoin?.photo ? (
                                      <img src={`${coinURL}/${foundCoin.photo}`} alt={symbol} />
                                    ) : (
                                      <div className="tw-h-full tw-w-full tw-rounded-full tw-bg-[var(--secondary-color)]" />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                            <div className="tw-break-words tw-text-[0.88rem] tw-leading-[1.35] tw-text-[var(--white-color)]">
                              {firstThreeStrings}
                            </div>
                          </div>
                        </div>

                        <div className="tw-mt-3 tw-grid tw-grid-cols-2 tw-gap-3">
                          <div>
                            <div className="tw-mb-1 tw-text-[0.72rem] tw-text-[var(--gray-2-color)]">
                              {t("Number of Coins")}
                            </div>
                            <div className="tw-break-words tw-text-[0.88rem] tw-leading-[1.35] tw-text-[var(--white-color)]">
                              {list.length}
                            </div>
                          </div>
                          <div>
                            <div className="tw-mb-1 tw-text-[0.72rem] tw-text-[var(--gray-2-color)]">
                              {t("Status")}
                            </div>
                            <div className={`tw-w-fit tw-text-[0.78rem] ${trading ? "color-container--green green-color-text" : "color-container--red red-color-text"}`}>
                              {trading ? t("Trading") : t("Not trading")}
                            </div>
                          </div>
                        </div>

                        <div className="tw-mt-3">
                          <div className="tw-mb-1 tw-text-[0.72rem] tw-text-[var(--gray-2-color)]">
                            {t("Created")}
                          </div>
                          <div className="tw-break-words tw-text-[0.88rem] tw-leading-[1.35] tw-text-[var(--white-color)]">
                            {toCzechDate(asset.created)}
                          </div>
                        </div>

                        {showDetailGraph && (
                          <Accordion.Collapse eventKey={eventKey}>
                            <div>{renderDetail(asset)}</div>
                          </Accordion.Collapse>
                        )}

                        <div className="tw-mt-4">
                          <Button
                            type="button"
                            color={ButtonColor.gold}
                            className="primary tw-mt-2 tw-w-full tw-text-sm sm:tw-text-base"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectAsset(asset);
                            }}
                          >
                            <span className="tw-inline-flex tw-w-full tw-items-center tw-justify-center tw-gap-1.5">
                              {isActive && <FaCheck size={14} className="tw-shrink-0" />}
                              <span>{t(isActive ? "Deselect" : "Select")}</span>
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Accordion.Item>
                  );
                })}
              </Accordion>
            )}

            {loadingPage && (
              <div className="tw-p-3 tw-text-center tw-text-sm tw-text-[var(--gray-1-color)] sm:tw-text-base">
                {t("Loading...")}
              </div>
            )}
          </>
        ) : loading ? (
          <div className="no-data-found tw-p-5 tw-text-center tw-text-sm sm:tw-text-base">
            {t("Loading data...")}
          </div>
        ) : (
          <div className="no-data-found tw-p-5 tw-text-center tw-text-sm sm:tw-text-base">
            {t("No data found")}
          </div>
        )}

        {assets.length > 0 && currentPage < totalPages && <div ref={loaderRef}></div>}
      </div>
    </div>
  );
};