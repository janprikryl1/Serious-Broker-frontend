import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { GraphDataSkeleton } from "./GraphDataSkeleton.tsx";
import { QuotedCurrenciesPeriod } from "../../../utils/options/QuotedCurrenciesPeriod.ts";
import { AssetAnalyticsGraphPeriodSelection } from "./AssetAnalyticsGraphPeriodSelection.tsx";
import Skeleton from "react-loading-skeleton";
import { formatCurrency } from "../../../utils/functions/functions.ts";
import { useTranslation } from "react-i18next";
import { freecurrencyapi } from "../../../utils/constants";
import { Currencies } from "../../../utils/enums/CurrenciesEnum.ts";
import { AssetAnalysisGraphData } from "../../../utils/types/graphs/AssetAnalysisGraphData.ts";
import { MissingCurrencyType } from "../../../utils/types/graphs/MissingCurrencyType.ts";
import { LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { createChart, ColorType, IChartApi, Time } from "lightweight-charts";
import {CHART_COLORS} from "../../../utils/constants/customColors.ts";

type Props = {
  // isInWatchList?: boolean;
  // handleToggleWatchList?: () => void;
  selectedPeriod: QuotedCurrenciesPeriod;
  setSelectedPeriod: Dispatch<SetStateAction<QuotedCurrenciesPeriod>>;
  graphData: AssetAnalysisGraphData | undefined;
  currency: Currencies;
  setCurrency: Dispatch<SetStateAction<Currencies>>;
  currencyPrice: string | undefined;
  setCurrencyPrice: Dispatch<SetStateAction<string | undefined>>;
  currencyValue: number;
  setCurrencyValue: Dispatch<SetStateAction<number>>;
  missingCurrencies?: MissingCurrencyType[];
};

export const AssetAnalysisGraph: FC<Props> = ({
                                                selectedPeriod,
                                                setSelectedPeriod,
                                                graphData,
                                                currencyValue,
                                                setCurrencyValue,
                                                setCurrency,
                                                setCurrencyPrice,
                                                currencyPrice,
                                                currency,
                                                missingCurrencies
                                              }) => {
  const { t, i18n } = useTranslation();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  // Determine trend color
  const getTrendColor = () => {
    if (!graphData?.data) return CHART_COLORS.green;

    const prices = Object.values(graphData.data);
    if (prices.length < 2) return CHART_COLORS.green;

    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];

    return lastPrice >= firstPrice ? CHART_COLORS.green : CHART_COLORS.red;
  };

  const trendColor = getTrendColor();

  const getChartHeight = () => {
    if (typeof window === "undefined") return 400;
    if (window.innerWidth < 640) return 260;
    if (window.innerWidth < 1024) return 320;
    return 400;
  };

  const handleSwitchCurrency = async (e: ChangeEvent<HTMLSelectElement>) => {
    if (!graphData) return;

    const newCurrency = e.target.value as Currencies;
    if (newCurrency === Currencies.EUR) {
      setCurrencyPrice(formatCurrency(graphData.price, i18n.language, newCurrency));
      setCurrency(newCurrency);
      setCurrencyValue(1);
      return;
    }

    try {
      const response = await freecurrencyapi.latest({
        base_currency: 'EUR',
        currencies: newCurrency
      });

      if (graphData && response.data[newCurrency]) {
        setCurrencyPrice(formatCurrency(response.data[newCurrency] * graphData.price, i18n.language, newCurrency));
        setCurrency(newCurrency);
        setCurrencyValue(response.data[newCurrency]);
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  };

  const isUptrend = trendColor === CHART_COLORS.green;

  // Calculate profit
  const calculateProfit = () => {
    if (!graphData?.data || Object.keys(graphData.data).length < 2) return null;

    const prices = Object.values(graphData.data);
    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const priceChange = lastPrice - firstPrice;
    const profitInCurrency = priceChange * currencyValue;

    return {
      profitValue: Math.abs(profitInCurrency),
      isProfit: profitInCurrency >= 0
    };
  };

  const profit = calculateProfit();

  // Render TradingView Chart
  useEffect(() => {
    if (!chartContainerRef.current || !graphData?.data || Object.keys(graphData.data).length === 0) return;

    // Destroy existing chart instance
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: getChartHeight(),
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#D9D9D9",
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.08)" },
        horzLines: { color: "rgba(255, 255, 255, 0.08)" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
      rightPriceScale: {
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
    });

    // Add Area Series with dynamic colors
    const areaSeries = chart.addAreaSeries({
      lineColor: trendColor,
      topColor: isUptrend ? "rgba(38, 166, 154, 0.4)" : "rgba(239, 83, 80, 0.4)",
      bottomColor: isUptrend ? "rgba(38, 166, 154, 0.0)" : "rgba(239, 83, 80, 0.0)",
      lineWidth: 2,
      priceFormat: {
        type: 'custom',
        formatter: (price: number) => formatCurrency(price * currencyValue, i18n.language, currency),
      },
    });

    // Format graph data for TradingView
    const formattedData = Object.entries(graphData.data)
      .map(([dateStr, val]) => ({
        time: (Math.floor(new Date(dateStr).getTime() / 1000)) as Time,
        value: val,
      }))
      .sort((a, b) => (a.time as number) - (b.time as number));

    areaSeries.setData(formattedData);
    chart.timeScale().fitContent();

    chartRef.current = chart;

    // Handle responsiveness
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: getChartHeight(),
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [graphData, currencyValue, currency, selectedPeriod, trendColor, isUptrend]);

  return (
    <div className="tw-mb-3 tw-w-full tw-p-2 sm:tw-mb-5 sm:tw-p-3 lg:tw-p-5">
      <div className="tw-mb-3 tw-flex tw-flex-wrap tw-items-center tw-gap-3 md:tw-justify-between">
        <div className="tw-inline-flex tw-w-auto tw-max-w-full tw-flex-col tw-items-start tw-self-start md:tw-flex-row md:tw-items-center md:tw-gap-3">
          {graphData ? (
            <>
              <span className="tw-text-xl tw-font-bold tw-text-white sm:tw-text-2xl lg:tw-text-3xl">
                {currencyPrice}
              </span>
              {profit && (
                <div className="tw-flex tw-items-center tw-gap-2 tw-whitespace-nowrap">
                  <span className="tw-text-base tw-font-semibold sm:tw-text-lg lg:tw-text-[23px]" style={{ color: trendColor }}>
                    {profit.isProfit ? "+" : "-"}{formatCurrency(profit.profitValue, i18n.language, currency)}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row">
              <Skeleton width={180} height={30} />
              <Skeleton width={110} height={30} />
            </div>
          )}
        </div>

        <div className="tw-flex tw-items-center tw-gap-2 tw-ml-auto">
          <div className="tw-flex-1 md:tw-flex-none">
            <AssetAnalyticsGraphPeriodSelection season={selectedPeriod} handleSelect={setSelectedPeriod} />
          </div>
          <select
            className="tw-w-[72px] tw-rounded-lg tw-border tw-border-stone-500/40 tw-bg-stone-900/60 tw-px-2 tw-py-2 tw-text-xs tw-text-stone-100 tw-outline-none tw-transition focus:tw-border-yellow-400 focus:tw-ring-1 focus:tw-ring-yellow-400 sm:tw-w-[80px] sm:tw-text-sm"
            value={currency}
            onChange={handleSwitchCurrency}
          >
            {Object.values(Currencies).map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </div>
      </div>

      {graphData ? (
        <div className="tw-w-full tw-overflow-x-auto">
          {Object.keys(graphData.data || {}).length > 0 ? (
            <div ref={chartContainerRef} className="tw-w-full tw-overflow-hidden tw-rounded-xl tw-bg-stone-950/20" style={{ height: `${getChartHeight()}px`, minHeight: `${getChartHeight()}px` }} />
          ) : (
            <div className="tw-rounded-xl tw-border tw-border-stone-500/20 tw-bg-stone-950/20 tw-p-4 tw-text-sm tw-text-stone-300 sm:tw-text-base">
              {missingCurrencies && missingCurrencies.length > 0 ? (
                <div className="tw-mt-2 tw-space-y-4">
                  {(() => {
                    const inactiveCurrencies = missingCurrencies.filter(m => m.reason === 'inactive');
                    const noPeriodDataCurrencies = missingCurrencies.filter(m => m.reason === 'no_period_data');

                    return (
                      <>
                        {inactiveCurrencies.length > 0 && (
                          <div>
                            <p className="tw-mb-1 tw-text-sm tw-font-medium tw-text-stone-200 sm:tw-text-base">
                              {t("These coins are no longer traded")}:
                            </p>
                            <small className="tw-text-xs tw-text-stone-400 sm:tw-text-sm">
                              {inactiveCurrencies.map(m => m.asset_label).join(', ')}
                            </small>
                          </div>
                        )}
                        {noPeriodDataCurrencies.length > 0 && (
                          <div>
                            <p className="tw-mb-1 tw-text-sm tw-font-medium tw-text-stone-200 sm:tw-text-base">
                              {t("No graph data available for this period")}:
                            </p>
                            <small className="tw-text-xs tw-text-stone-400 sm:tw-text-sm">
                              {noPeriodDataCurrencies.map(m => m.asset_label).join(', ')}
                            </small>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              ) : <p className="tw-mb-0 tw-text-sm sm:tw-text-base">{t("No data")}</p>}
            </div>
          )}
        </div>
      ) : (
        <div className="tw-w-full">
          <GraphDataSkeleton />
        </div>
      )}
    </div>
  );
};