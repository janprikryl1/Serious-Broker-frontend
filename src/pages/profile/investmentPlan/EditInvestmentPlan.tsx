import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { InvestmentPlanLayout } from "../../../components/profile/myPortfolio/InvestmentPlanLayout.tsx";
import { Button, ButtonColor } from "../../../components/reusable/Button.tsx";
import { SearchBar } from "../../../components/reusable/SearchBar.tsx";
import { Checkbox } from "../../../components/reusable/Checkbox.tsx";
import { AssetTable } from "../../../components/reusable/AssetTable.tsx";
import { NextStepButton } from "../../../components/reusable/NextStepButton.tsx";
import { useInvestmentPlanContext } from "../../../utils/providers/InvestmentPlanProvider.tsx";
import { coinURL, routes } from "../../../utils/constants";
import { useAssets } from "../../../utils/hooks/useAssets.ts";
import { useInfiniteScroll } from "../../../utils/hooks/useInfiniteScroll.ts";
import { AssetOrder } from "../../../utils/enums/AssetOrder.ts";
import { getAllCryptocurrenciesPhoto } from "../../../utils/api/CryptocurrencyService.ts";
import { getTradingCoins } from "../../../utils/api/binanceIndexAssets.ts";
import { getTrafficLights } from "../../../utils/api/trafficLightsService.ts";
import { CryptoCurrencyAdminType } from "../../../utils/types/asset/CryptoCurrencyType.ts";
import { AssetType } from "../../../utils/types/asset/AssetType.ts";
import { TrafficLightType } from "../../../utils/types/trafficLight/TrafficLightType.ts";
import { DayEnum } from "../../../utils/enums/DayEnum.ts";
import { InvestmentFrequency } from "./RecurringInvestment.tsx";
import {TrafficLightsSection} from "../../../components/trafficLight/TrafficLightsSection.tsx";
import {TitleHeader} from "../../../components/about/TitleHeader.tsx";
import {SelectPortfolioModal} from "../../../components/profile/investmentPlan/SelectPortfolioModal.tsx";

const daysOrder: (keyof typeof DayEnum)[] = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const monthDays = Array.from({ length: 28 }, (_, i) => i + 1);

const formatCoins = (coins: string, maxItems: number = 3) => {
  if (!coins) return "-";
  const list = coins.split(",").map((coin) => coin.trim()).filter(Boolean);
  const preview = list.slice(0, maxItems).join(", ");
  return list.length > maxItems ? `${preview}, ...` : preview;
};

export const EditInvestmentPlan = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const {
    name,
    setName,
    description,
    setDescription,
    isCustomPortfolio,
    setIsCustomPortfolio,
    userPortfolioId,
    setUserPortfolioId,
    binanceAssetId,
    setBinanceAssetId,
    frequency,
    setFrequency,
    day,
    setDay,
    hour,
    setHour,
    startDate,
    setStartDate,
    investmentAmount,
    setInvestmentAmount,
    currency,
    setCurrency,
    buyTrafficLightId,
    setBuyTrafficLightId,
    sellTrafficLightId,
    setSellTrafficLightId,
    saveChanges,
    isLoading
  } = useInvestmentPlanContext();

  const { assets, loading, totalPages, getAssets } = useAssets();
  const [allCurrencies, setAllCurrencies] = useState<CryptoCurrencyAdminType[]>([]);
  const [tradingCoins, setTradingCoins] = useState<string[]>([]);
  const [buyTrafficLights, setBuyTrafficLights] = useState<TrafficLightType[]>([]);
  const [sellTrafficLights, setSellTrafficLights] = useState<TrafficLightType[]>([]);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNonTradingIndices, setShowNonTradingIndices] = useState(false);
  const [showOlderIndices, setShowOlderIndices] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const isFetchingRef = useRef(false);
  const { currentPage, loaderRef, resetPage } = useInfiniteScroll({ totalPages, loading, root: scrollContainer });

  const yesterday = useMemo(() => {
    const value = new Date();
    value.setDate(value.getDate() - 1);
    return value.toISOString().split("T")[0];
  }, []);

  const loadMetadata = async () => {
    try {
      const [currenciesResponse, tradingResponse] = await Promise.all([
        getAllCryptocurrenciesPhoto(),
        getTradingCoins(),
      ]);

      if (currenciesResponse?.data) setAllCurrencies(currenciesResponse.data);
      if (tradingResponse?.data) setTradingCoins(tradingResponse.data);
    } catch (error) {
      console.error("Failed to load metadata:", error);
    }
  };

  useEffect(() => {
    void loadMetadata();
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
        showAssets: "all"
      }).finally(() => {
        isFetchingRef.current = false;
      });
    }, 350);

    return () => {
      clearTimeout(handler);
      isFetchingRef.current = false;
    };
  }, [searchQuery, getAssets, resetPage]);

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
      showAssets: "all"
    }).finally(() => {
      setLoadingPage(false);
    });
  }, [currentPage, totalPages, loading, getAssets, searchQuery]);

  const isRecentIndex = (asset: AssetType) => new Date(asset.created).getFullYear() >= 2025;

  const isAssetTrading = (asset: AssetType) => {
    if (tradingCoins.length === 0) return true;
    const assetCoins = asset.coins.split(",").map((coin) => coin.trim().toUpperCase());
    const upperTradingCoins = tradingCoins.map((coin) => coin.toUpperCase());
    return assetCoins.every((coin) => upperTradingCoins.includes(coin));
  };

  const filteredAssets = assets.filter((asset) => {
    const tradingFilter = showNonTradingIndices || isAssetTrading(asset);
    const dateFilter = showOlderIndices || isRecentIndex(asset);
    return tradingFilter && dateFilter;
  });

  const selectedAssetId = isCustomPortfolio ? userPortfolioId : binanceAssetId;
  const selectedAsset = filteredAssets.find((asset) => asset.id === selectedAssetId) || assets.find((asset) => asset.id === selectedAssetId);

  const handlePortfolioSelect = (asset: AssetType) => {
    setIsCustomPortfolio(false);
    setBinanceAssetId(asset.id);
    setUserPortfolioId(null);
    setShowPortfolioModal(false);
  };

  const handleSave = async () => {
    await saveChanges();
  };

  return (
    <>
      <TitleHeader title={t("Edit Investment Plan")} secondaryTitle={name ? name : undefined} />
      <div className="container">

        <div className="tw-mt-6 tw-flex tw-flex-col tw-gap-8">
          <div className="tw-grid tw-grid-cols-1 xl:tw-grid-cols-2 tw-gap-6">
            <div className="tw-flex tw-flex-col tw-gap-3">
              <div className="gray-2-color-text tw-text-xs sm:tw-text-sm">{t("Name")}</div>
              <input
                type="text"
                className="form-control outline-input tw-text-sm sm:tw-text-base"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="tw-flex tw-flex-col tw-gap-3">
              <div className="gray-2-color-text tw-text-xs sm:tw-text-sm">{t("Start date")}</div>
              <input
                type="date"
                className="outline-input tw-text-sm sm:tw-text-base"
                value={startDate ?? ""}
                max={yesterday}
                onChange={(e) => setStartDate(e.target.value || null)}
              />
            </div>
          </div>

          <div className="tw-flex tw-flex-col tw-gap-3">
            <div className="gray-2-color-text tw-text-xs sm:tw-text-sm">{t("Description")}</div>
            <textarea
              rows={3}
              className="form-control outline-input tw-min-h-[110px] tw-text-sm sm:tw-text-base"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="tw-flex tw-flex-col tw-gap-3">
            <div className="gray-2-color-text tw-text-xs sm:tw-text-sm">{t("Portfolio")}</div>
            <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3 sm:tw-items-center">
              <div className="tw-flex-1 tw-rounded-xl tw-border tw-border-solid tw-border-stone-500 tw-border-opacity-30 tw-px-4 tw-py-3 tw-text-sm sm:tw-text-base">
                {selectedAsset ? (
                  <div className="tw-flex tw-flex-col tw-gap-1">
                    <span className="tw-font-medium">{selectedAsset.name}</span>
                    <span className="tw-text-stone-400 tw-text-xs sm:tw-text-sm">{formatCoins(selectedAsset.coins)}</span>
                  </div>
                ) : (
                  <span className="tw-text-stone-400">{t("No portfolio selected")}</span>
                )}
              </div>
              <Button color={ButtonColor.gold} onClick={() => setShowPortfolioModal(true)} className="tw-text-sm sm:tw-text-base">
                {t("Choose portfolio")}
              </Button>
            </div>
          </div>

          <hr className="tw-text-secondary" />

          <div className="tw-grid tw-grid-cols-1 xl:tw-grid-cols-2 tw-gap-10">
            <div className="tw-flex tw-flex-col tw-gap-10">
              <h6 className="tw-mb-0 tw-pb-0 tw-text-sm sm:tw-text-base lg:tw-text-lg">{t("Recurring Investment")}</h6>

              <div className="tw-flex tw-flex-col tw-gap-3">
                <span className="gray-3-color-text tw-text-sm sm:tw-text-base">{t("How often do you want to invest in selected portfolio?")}</span>
                <Form.Select
                  value={frequency}
                  onChange={(e) => {
                    setFrequency(e.target.value as InvestmentFrequency);
                    setDay(null);
                  }}
                  className="select-box-outline tw-text-sm sm:tw-text-base tw-min-w-[150px]"
                >
                  <option value={InvestmentFrequency.day}>{t("Every day")}</option>
                  <option value={InvestmentFrequency.week}>{t("Every week")}</option>
                  <option value={InvestmentFrequency.month}>{t("Every month")}</option>
                </Form.Select>
              </div>

              {frequency !== InvestmentFrequency.day ? (
                <div className="tw-flex tw-flex-col tw-gap-3">
                  <span className="gray-3-color-text tw-text-sm sm:tw-text-base">
                    {frequency === InvestmentFrequency.week ? t("Select day of the week:") : t("Select day of the month:")}
                  </span>

                  {frequency === InvestmentFrequency.week ? (
                    <div className="day-select-wrapper">
                      <div className="day-select-flex">
                        {daysOrder.map((dayString) => {
                          const dayValue = DayEnum[dayString];
                          return (
                            <div
                              key={dayString}
                              className={`day-select-item ${day === dayValue ? "selected" : ""}`}
                              onClick={() => setDay(dayValue)}
                            >
                              {t(dayString.substring(0, 3))}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="day-select-grid">
                      {monthDays.map((dayNum) => (
                        <div
                          key={dayNum}
                          className={`day-select-grid-item ${day === dayNum ? "selected" : ""}`}
                          onClick={() => setDay(dayNum)}
                        >
                          {dayNum}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}

              <div className="tw-flex tw-flex-col tw-gap-3">
                <span className="gray-3-color-text tw-text-sm sm:tw-text-base">{t("Select approximate hour of transaction:")}</span>
                <div className="tw-flex tw-items-center tw-gap-2">
                  <input
                    type="number"
                    min={0}
                    max={23}
                    className="outline-input tw-w-[80px] tw-text-center tw-text-sm sm:tw-text-base"
                    value={hour ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        setHour(null);
                        return;
                      }
                      const next = parseInt(value, 10);
                      if (!Number.isNaN(next) && next >= 0 && next <= 23) setHour(next);
                    }}
                  />
                  <span className="fw-bold tw-text-sm sm:tw-text-base">:00</span>
                </div>
              </div>
            </div>

            <div className="tw-flex tw-flex-col tw-gap-5">
              <h6 className="tw-mb-0 tw-pb-0 tw-text-sm sm:tw-text-base lg:tw-text-lg">{t("Invested Amount")}</h6>
              <div className={`d-flex ${isMobile ? "flex-column" : "flex-row"} align-items-stretch align-items-sm-center gap-3 w-100`}>
                <input
                  type="number"
                  min={1}
                  className="outline-input tw-w-full sm:tw-w-[170px] tw-text-sm sm:tw-text-base"
                  value={investmentAmount ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setInvestmentAmount(null);
                      return;
                    }
                    const next = parseInt(value, 10);
                    if (!Number.isNaN(next) && next >= 0) setInvestmentAmount(next);
                  }}
                />
                <Form.Select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="select-box-outline tw-text-sm sm:tw-text-base tw-w-full sm:tw-w-[100px]"
                >
                  <option value="EUR">EUR</option>
                  <option value="CZK">CZK</option>
                  <option value="USD">USD</option>
                </Form.Select>
              </div>
            </div>
          </div>

          <hr className="tw-text-secondary" />

          <TrafficLightsSection
            selectedBuyId={buyTrafficLightId}
            selectedSellId={sellTrafficLightId}
            onSelectBuy={setBuyTrafficLightId}
            onSelectSell={setSellTrafficLightId}
            currency={currency}
          />

          <div className="tw-text-center">
            <Button onClick={handleSave} disabled={isLoading} className="tw-text-sm sm:tw-text-base tw-px-10">
              {t("Save")}
            </Button>
          </div>
        </div>
      </div>

      <SelectPortfolioModal
        show={showPortfolioModal}
        onClose={() => setShowPortfolioModal(false)}
        selectedAssetId={selectedAssetId}
        onSelectPortfolio={(asset) => {
          setIsCustomPortfolio(false);
          setBinanceAssetId(asset.id);
          setUserPortfolioId(null);
        }}
      />
    </>
  );
};
