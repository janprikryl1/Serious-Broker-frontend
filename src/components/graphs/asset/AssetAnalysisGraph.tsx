import {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useMemo} from "react";
import {GraphDataSkeleton} from "./GraphDataSkeleton.tsx";
import {QuotedCurrenciesPeriod} from "../../../utils/options/QuotedCurrenciesPeriod.ts";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import {AssetAnalyticsGraphPeriodSelection} from "./AssetAnalyticsGraphPeriodSelection.tsx";
import Skeleton from "react-loading-skeleton";
import {AreaPlot, ChartContainer, ChartsGrid, ChartsTooltip, ChartsXAxis, ChartsYAxis, LinePlot} from "@mui/x-charts";
import {formatCurrency} from "../../../utils/functions/functions.ts";
import {useTranslation} from "react-i18next";
import {freecurrencyapi} from "../../../utils/constants";
import {Currencies} from "../../../utils/enums/CurrenciesEnum.ts";
import {AssetAnalysisGraphData} from "../../../utils/types/graphs/AssetAnalysisGraphData.ts";
import {MissingCurrencyType} from "../../../utils/types/graphs/MissingCurrencyType.ts";
import {LuTrendingDown, LuTrendingUp} from "react-icons/lu";
import {BsBookmark, BsBookmarkFill} from "react-icons/bs";

type Props = {
    isInWatchList?: boolean;
    handleToggleWatchList?: () => void;
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
                                                  isInWatchList,
                                                  handleToggleWatchList,
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
    const {t} = useTranslation();

    // Determine trend: uptrend (green) or downtrend (red)
    const getTrendColor = () => {
        if (!graphData?.data) return "var(--green-on-primary-color)";

        const prices = Object.values(graphData.data);
        if (prices.length < 2) return "var(--green-on-primary-color)";

        const firstPrice = prices[0];
        const lastPrice = prices[prices.length - 1];

        return lastPrice >= firstPrice ? "var(--green-on-primary-color)" : "var(--red-on-primary-color)";
    };

    const trendColor = getTrendColor();

    const handleSwitchCurrency = async (e: ChangeEvent<HTMLSelectElement>) => {
        if (!graphData) return;

        const newCurrency = e.target.value as Currencies;
        if (newCurrency === Currencies.EUR) {
            setCurrencyPrice(formatCurrency(graphData.price));
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
                setCurrencyPrice(formatCurrency(response.data[newCurrency] * graphData.price));
                setCurrency(newCurrency);
                setCurrencyValue(response.data[newCurrency]);
            }
        } catch (error) {
            console.error("Error fetching currency data:", error);
        }
    };

    const isUptrend = trendColor === "var(--green-on-primary-color)";
    const TrendIcon = isUptrend ? LuTrendingUp : LuTrendingDown;
    const containerColor = isUptrend ? "green" : "red";

    // Výpočet zisku - zmena medzi prvou a poslednou cenou
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

    // Memorize graph data
    const chartConfig = useMemo(() => {
        if (!graphData?.data || Object.keys(graphData.data).length === 0) return null;

        const values = Object.values(graphData.data);
        const minVal = Math.min(...values);
        const maxVal = Math.max(...values);
        const padding = (maxVal - minVal) * 0.15;

        const gradientId = `asset-analysis-gradient-${selectedPeriod}-${currency}`;

        const xAxisData = Object.keys(graphData.data).map((dateStr) => new Date(dateStr));

        const maxLabelLength = Math.max(
            ...values.map((v) => {
                const convertedValue = (v ?? 0) * currencyValue;
                const formatted = new Intl.NumberFormat(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(convertedValue);
                return formatted.length + 1 + currency.length;
            })
        );
        const dynamicWidth = Math.max(50, (maxLabelLength) * 9);

        return { values, minVal, maxVal, padding, gradientId, xAxisData, dynamicWidth };
    }, [graphData, currencyValue, currency, selectedPeriod]);

    const chartSeries = useMemo(() => {
        if (!chartConfig) return [];
        return [
            {
                id: 'asset',
                type: 'line' as const,
                data: chartConfig.values,
                color: trendColor,
                area: true,
                baseline: chartConfig.minVal - chartConfig.padding,
                showMark: false,
                curve: 'catmullRom' as const,
                valueFormatter: (value: number | null) =>
                    value == null ? '' : `${formatCurrency((value ?? 0) * currencyValue)} ${currency}`
            }
        ];
    }, [chartConfig, trendColor, currencyValue, currency]);

    // Memorize X axis
    const chartXAxis = useMemo(() => {
        if (!chartConfig) return [];
        return [
            {
                scaleType: 'time' as const,
                data: chartConfig.xAxisData,
                tickNumber: 8,
                valueFormatter: (date: Date, context: { location?: string }) => {
                    const isTooltip = context?.location === 'tooltip';
                    const noYearPeriods = [
                        QuotedCurrenciesPeriod.day,
                        QuotedCurrenciesPeriod.week,
                        QuotedCurrenciesPeriod.month
                    ];

                    if (noYearPeriods.includes(selectedPeriod)) {
                        if (isTooltip) {
                            return date.toLocaleString(undefined, {
                                day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                            });
                        } else {
                            return date.toLocaleString(undefined, { day: '2-digit', month: '2-digit' });
                        }
                    }
                    return date.toLocaleString();
                }
            }
        ];
    }, [chartConfig, selectedPeriod]);

    // Memorize Y axis
    const chartYAxis = useMemo(() => {
        if (!chartConfig) return [];
        return [
            {
                min: chartConfig.minVal - chartConfig.padding,
                max: chartConfig.maxVal + chartConfig.padding,
                valueFormatter: (value: number | null) => {
                    const convertedValue = (value ?? 0) * currencyValue;
                    const sformatovaneCislo = new Intl.NumberFormat(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(convertedValue);
                    return `${sformatovaneCislo} ${currency}`;
                },
                width: chartConfig.dynamicWidth,
            }
        ];
    }, [chartConfig, currencyValue, currency]);

    const chartSx = useMemo(() => {
        if (!chartConfig) return {};
        return {
            width: '100%',
            '& .MuiLineElement-root': {strokeWidth: 2},
            '& .MuiAreaElement-series-asset': {
                fill: `url(#${chartConfig.gradientId})`,
                fillOpacity: 1
            },
            '& .MuiChartsAxis-line': { stroke: '#000' },
            '& .MuiChartsAxis-tick': { stroke: '#000' },
            '& .MuiChartsAxis-tickLabel': { fill: '#000' }
        };
    }, [chartConfig?.gradientId]);

    return (
        <div className="text-dark mb-5 asset-analysis-graph-wrapper">
            <div className="row mb-4">
                <div className="col-auto me-auto"
                     style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    {graphData ? (
                        <>
              <span style={{fontSize: "30px", fontFamily: "PT Sans Caption", color: "var(--secondary-color)"}}>
                {currencyPrice} {currency}
              </span>
                            {profit && (
                                <div className={`d-flex align-items-center gap-3 color-container--${profit.isProfit ? "green" : "red"}`}>
                <span style={{fontSize: "23px", fontFamily: "PT Sans Caption", color: trendColor}}>
                  {profit.isProfit ? "+" : "-"}{formatCurrency(profit.profitValue)} {currency}
                </span>
                                </div>
                            )}
                        </>
                    ) : (
                        <Skeleton width={100} height={35} baseColor={"var(--cream-color)"}/>
                    )}
                </div>
                <AssetAnalyticsGraphPeriodSelection season={selectedPeriod} handleSelect={setSelectedPeriod}/>
                <div className="col-auto">
                    <select
                        className="form-select select-box-outline select-box-outline--dark-text season-button-group"
                        style={{width: "80px"}}
                        value={currency}
                        onChange={handleSwitchCurrency}
                    >
                        {Object.values(Currencies).map((cur) => (
                            <option key={cur} value={cur}>{cur}</option>
                        ))}
                    </select>
                </div>
                <div className="col-auto">
                    {isInWatchList !== undefined && handleToggleWatchList !== undefined && (!isInWatchList ?
                        <BsBookmark style={{ color: 'var(--secondary-color)' }} onClick={handleToggleWatchList}/> :
                        <BsBookmarkFill style={{ color: 'var(--secondary-color)' }} onClick={handleToggleWatchList}/>)}
                </div>
            </div>
            {graphData ? (
                <div style={{width: "100%", overflowX: "auto"}}>
                    {chartConfig ? (
                        <ChartContainer
                            key={`chart-container-stable`} // FIX: Odstránili sme závislosť key od state!
                            series={chartSeries}
                            xAxis={chartXAxis}
                            yAxis={chartYAxis}
                            height={400}
                            margin={{left: 0, right: 0, top: 0, bottom: 0}}
                            sx={chartSx}
                        >
                            <defs>
                                <linearGradient id={chartConfig.gradientId} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={trendColor} stopOpacity={0.3}/>
                                    <stop offset="100%" stopColor={trendColor} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <AreaPlot/>
                            <LinePlot/>
                            <ChartsXAxis/>
                            <ChartsYAxis/>
                            <ChartsGrid horizontal/>
                            <ChartsTooltip trigger="axis"/>
                        </ChartContainer>
                    ) : (
                        <div className="no-data">
                            {missingCurrencies && missingCurrencies.length > 0 ? (
                                <div style={{marginTop: 20}}>
                                    {(() => {
                                        const inactiveCurrencies = missingCurrencies.filter(m => m.reason === 'inactive');
                                        const noPeriodDataCurrencies = missingCurrencies.filter(m => m.reason === 'no_period_data');

                                        return (
                                            <>
                                                {inactiveCurrencies.length > 0 && (
                                                    <div style={{marginBottom: '1rem'}}>
                                                        <p>{t("These coins are no longer traded")}:</p>
                                                        <small>{inactiveCurrencies.map(m => m.asset_label).join(', ')}</small>
                                                    </div>
                                                )}
                                                {noPeriodDataCurrencies.length > 0 && (
                                                    <div>
                                                        <p>{t("No graph data available for this period")}:</p>
                                                        <small>{noPeriodDataCurrencies.map(m => m.asset_label).join(', ')}</small>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                            ) : <p>{t("No data")}</p>}
                        </div>
                    )}
                </div>
            ) : (
                <GraphDataSkeleton baseColor={"var(--cream-color)"}/>
            )}
        </div>
    );
};