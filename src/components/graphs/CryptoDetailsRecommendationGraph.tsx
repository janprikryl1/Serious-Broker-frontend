import {Dispatch, FC, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {getBinanceIndexAssetAverageGraphData} from "../../utils/api/GraphsService.ts";
import {CustomSwal} from "../../utils/functions/customSwal.ts";
import {RecommendationDetailSeasonEnum} from "../../utils/enums/RecommendationDetailSeasonEnum.ts";
import {createDateFormatters} from "../../utils/functions/dateFunctions.ts";
import {RecommendedSeasonSelect} from "./RecommendedSeasonSelect.tsx";
import {useMediaQuery} from "@mui/material";
import {
    BinanceIndexAssetRecomBestPreviousDetails
} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {OutlineContainer} from "../reusable/OutlineContainer.tsx";
import { createChart, ColorType } from "lightweight-charts";
import {CHART_COLORS} from "../../utils/constants/customColors.ts";

/*
 * Preco graf vyzera tak ako vyzera
 *
 * Pri intervale pre 1 tyzden:
 *      Mame pre kazdy den a kazdu hodinu prave jeden zaznam. Takze sa nepocita priemer ranku, ale berie sa hodnota priamo.
 *      Preto sa nemoze stat, ze by hodnota ranku bola dvakrat taka ista. Pre kazdy tyzden je tam 168 hodnot potencialneho zisku oproti predchadzajucej hodine.
 *      Z toho je stala nejaka hodnota najlepsia a nejaka najhorsia.
 * Pri itervale 2 a viac tyzdnov
 *      Pre urcity den a hodinu uz existuje viac zaznamov, ktore sa musia priemerovat. Prave preto sa moze stat, ze by vysiel v roznych dnoch rovnaky rank.
 *      Cim vacsi casovy interval berieme, tym je linia v grafe znazornujuca rank vyhladenejsia.
 */

type Props = {
    asset_label: string;
    selectedTimeZone: string;
    setSelectedTimezone: Dispatch<SetStateAction<string>>;
    recommendationsDetail: BinanceIndexAssetRecomBestPreviousDetails;
};

enum Week {
    "Week" = 1,
    "Month" = 4,
    "Quarter" = 13,
    "Year" = 52,
}

enum Day {
    "Sunday" = 1,
    "Monday" = 2,
    "Tuesday" = 3,
    "Wednesday" = 4,
    "Thursday" = 5,
    "Friday" = 6,
    "Saturday" = 7,
}

type ProcessedDataPoint = {dayAndHour: string, dayOfWeek: number, hour: number, avgProfit: number, avgWeekRanking: number};
type ScatterPoint = { x: Date; y: number };

const chartHeight = 600;
const profitSeriesColor = "#C5A657";
const rankSeriesColor = "#76746F";

export const CryptoDetailsRecommendationGraph: FC<Props> = ({asset_label, selectedTimeZone, setSelectedTimezone, recommendationsDetail}) => {
    const { t, i18n } = useTranslation();
    const { date, dateTime } = createDateFormatters(i18n.language ?? "cs-CZ", selectedTimeZone);
    const [graphData, setGraphData] = useState<ProcessedDataPoint[] | undefined>();
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery('(max-width: 1000px)');
    const chartMargins = useMemo(
      () => ({ left: 0, right: 0, top: 0, bottom: 0 }),
      []
    );
    const [profits, setProfits] = useState([0]); // = graphData.map(p => p.avgProfit);
    const [minProfit, setMinProfit] = useState(0); // = Math.min(...profits);
    const [offset, setOffset] = useState(0); // = Math.min(...profits);
    const [maxProfit, setMaxProfit] = useState(100); // = Math.max(...profits);
    const [maxRank, setMaxRank] = useState(200);
    const [selectedPeriod, setSelectedPeriod] = useState<RecommendationDetailSeasonEnum>(RecommendationDetailSeasonEnum.Week);
    const [numOfWeeks, setNumOfWeeks] = useState(Week[RecommendationDetailSeasonEnum.Week]);
    const [customEnabled, setCustomEnabled] = useState(false);
    const [filteredData, setFilteredData] = useState<ProcessedDataPoint[] | undefined>();

    const buyDayMapping = {
        [RecommendationDetailSeasonEnum.Week]: recommendationsDetail.buy_week_0_week_day,
        [RecommendationDetailSeasonEnum.Month]: recommendationsDetail.buy_month_0_week_day,
        [RecommendationDetailSeasonEnum.Quarter]: recommendationsDetail.buy_quarter_0_week_day,
        [RecommendationDetailSeasonEnum.Year]: recommendationsDetail.buy_year_0_week_day,
    };
    const buyDay = buyDayMapping[selectedPeriod] ?? recommendationsDetail.buy_year_0_week_day;

    const buyHourMapping = {
        [RecommendationDetailSeasonEnum.Week]: recommendationsDetail.buy_week_0_hour,
        [RecommendationDetailSeasonEnum.Month]: recommendationsDetail.buy_month_0_hour,
        [RecommendationDetailSeasonEnum.Quarter]: recommendationsDetail.buy_quarter_0_hour,
        [RecommendationDetailSeasonEnum.Year]: recommendationsDetail.buy_year_0_hour,
    };
    const buyHour = buyHourMapping[selectedPeriod] ?? recommendationsDetail.buy_year_0_hour;

    const sellDayMapping = {
        [RecommendationDetailSeasonEnum.Week]: recommendationsDetail.sell_week_0_week_day,
        [RecommendationDetailSeasonEnum.Month]: recommendationsDetail.sell_month_0_week_day,
        [RecommendationDetailSeasonEnum.Quarter]: recommendationsDetail.sell_quarter_0_week_day,
        [RecommendationDetailSeasonEnum.Year]: recommendationsDetail.sell_year_0_week_day,
    };
    const sellDay = sellDayMapping[selectedPeriod] ?? recommendationsDetail.sell_year_0_week_day;

    const sellHourMapping = {
        [RecommendationDetailSeasonEnum.Week]: recommendationsDetail.sell_week_0_hour,
        [RecommendationDetailSeasonEnum.Month]: recommendationsDetail.sell_month_0_hour,
        [RecommendationDetailSeasonEnum.Quarter]: recommendationsDetail.sell_quarter_0_hour,
        [RecommendationDetailSeasonEnum.Year]: recommendationsDetail.sell_year_0_hour,
    };
    const sellHour = sellHourMapping[selectedPeriod] ?? recommendationsDetail.sell_year_0_hour;

    const getDay = (data: String) => {
        return t(Day[parseInt(data.split(" - ")[0], 10)]);
    }

    const getHour = (data: String) => {
        let h = parseInt(data.split(" - ")[1], 10);
        if (h % 2 === 1) {
            return h - 1;
        }
        else {
            return h;
        }
    }

    useEffect(() => {
        if (!asset_label) return;
        const getData = async () => {
            setGraphData(undefined);
            try {
                const response = await getBinanceIndexAssetAverageGraphData(
                  asset_label,
                  customEnabled ? numOfWeeks : Week[selectedPeriod]
                );
                if (response?.data) {
                    const processedData: ProcessedDataPoint[] = response.data.map((p: any) => ({
                        dayAndHour: p.dayOfWeek + " - " + p.hour,
                        dayOfWeek: parseInt(p.day_of_week),
                        hour: parseInt(p.hour),
                        avgProfit: parseFloat(p.avg_profit),
                        avgWeekRanking: parseFloat(p.avg_week_ranking),
                    }));
                    setGraphData(processedData);
                    const profits = processedData.map(p => p.avgProfit);
                    const ranks = processedData.map(p => p.avgWeekRanking);
                    const minProfit = Math.min(...profits);
                    const maxProfit = Math.max(...profits);
                    const maxRank = Math.max(...ranks);

                    setProfits(profits);
                    setMinProfit(minProfit);
                    setMaxProfit(maxProfit);
                    setOffset(minProfit * 0.999);
                    setMaxRank(maxRank);

                    setFilteredData(processedData.filter((_, index) => index % 5 === 0))
                } else {
                    setGraphData([]);
                }
            } catch (e) {
                CustomSwal.fire({
                    title: t("Error"),
                    text: t("Something went wrong"),
                    icon: "error",
                });
                console.log(e);
                setGraphData([]);
            }
        };
        getData();
    }, [asset_label, selectedPeriod, numOfWeeks, t]);

    // Initialize TradingView Chart
    useEffect(() => {
        if (!chartContainerRef.current || !graphData || graphData.length === 0) return;

        const chartContainer = chartContainerRef.current;
        chartContainer.innerHTML = "";

        const chart = createChart(chartContainer, {
            width: chartContainer.clientWidth,
            height: chartHeight,
            layout: {
                background: { type: ColorType.Solid, color: "transparent" },
                textColor: "#D9D9D9",
            },
            localization: {
                timeFormatter: (time: number) => {
                    const index = Math.floor((time - baseTimestamp) / 3600);
                    if (index >= 0 && index < graphData.length) {
                        const p = graphData[index];
                        const dayName = t(Day[p.dayOfWeek]);
                        return `${dayName}, ${p.hour}:00`;
                    }
                    return "";
                },
            },
            grid: {
                vertLines: { color: "rgba(255, 255, 255, 0.08)" },
                horzLines: { color: "rgba(255, 255, 255, 0.08)" },
            },
            leftPriceScale: {
                visible: true,
                borderVisible: true,
                borderColor: "rgba(255, 255, 255, 0.2)",
            },
            rightPriceScale: {
                visible: true,
                borderVisible: true,
                borderColor: "rgba(255, 255, 255, 0.2)",
            },
            timeScale: {
                borderVisible: true,
                borderColor: "rgba(255, 255, 255, 0.2)",
                timeVisible: false,
                tickMarkFormatter: (time: any) => {
                    const index = Math.floor((Number(time) - baseTimestamp) / 3600);
                    if (index >= 0 && index < graphData.length) {
                        const p = graphData[index];
                        const dayName = t(Day[p.dayOfWeek]);

                        // Ak je to 0:00 (začiatok dňa), ukážeme napr. "Pondelok"
                        // Pre ostatné hodiny ukážeme len čas "12:00"
                        if (p.hour === 0) {
                            return dayName;
                        } else if (p.hour === 12) {
                            return `${p.hour}:00`;
                        }
                        return `${p.hour}:00`;
                    }
                    return "";
                },
            },
        });

        let maxProfitIndex = 0;
        let minProfitIndex = 0;
        graphData.forEach((p, idx) => {
            if (p.avgProfit > graphData[maxProfitIndex].avgProfit) maxProfitIndex = idx;
            if (p.avgProfit < graphData[minProfitIndex].avgProfit) minProfitIndex = idx;
        });

        const maxProfitPoint = graphData[maxProfitIndex];
        const minProfitPoint = graphData[minProfitIndex];

        // Určíme štart a koniec podfarbenej oblasti na osi X
        const rangeStartIdx = Math.min(maxProfitIndex, minProfitIndex);
        const rangeEndIdx = Math.max(maxProfitIndex, minProfitIndex);

        // 2. Pomocná séria pre ZVISLÉ PODFARBENIE a ZVISLÉ ČIARY (Overlay)
        // Použijeme vlastnú skrytú stupnicu, aby stĺpce siahali cez 100% výšky grafu
        const areaOverlaySeries = chart.addHistogramSeries({
            priceScaleId: 'overlayScale',
            priceFormat: { type: 'volume' },
            lastValueVisible: false,
            priceLineVisible: false,
        });

        chart.priceScale('overlayScale').applyOptions({
            scaleMargins: { top: 0, bottom: 0 }, // Strečne stĺpce na celú výšku
            visible: false,
        });

        // Rank Histogram (Bar) Series
        const rankSeries = chart.addHistogramSeries({
            color: rankSeriesColor,
            priceScaleId: "right",
            title: t("Rank"),
            priceFormat: {
                type: "custom",
                formatter: (val: number) => `${Number(val).toFixed(0)}`,
            },
        });

        // Profit Line Series
        const profitSeries = chart.addLineSeries({
            color: profitSeriesColor,
            lineWidth: 2,
            priceScaleId: "left",
            title: t("Profit"),
            priceFormat: {
                type: "custom",
                formatter: (val: number) => `${Number(val).toFixed(3)} €`,
            },
        });

        // Format indexed hourly timestamps to sequential Unix timestamps for chart ordering
        const baseTimestamp = Math.floor(new Date("2026-01-01T00:00:00Z").getTime() / 1000);
        const formattedProfitData: any[] = [];
        const formattedRankData: any[] = [];
        const formattedOverlayData: any[] = [];

        graphData.forEach((p, index) => {
            const pointTimestamp = (baseTimestamp + index * 3600) as any;

            formattedProfitData.push({
                time: pointTimestamp,
                value: p.avgProfit,
            });

            formattedRankData.push({
                time: pointTimestamp,
                value: (maxRank + 1) - p.avgWeekRanking,
            });

            let barColor = 'transparent';

            if (index === maxProfitIndex) {
                barColor = CHART_COLORS.green;
            } else if (index === minProfitIndex) {
                barColor = CHART_COLORS.red;
            }

            formattedOverlayData.push({
                time: pointTimestamp,
                value: 1,
                color: barColor,
            });
        });

        areaOverlaySeries.setData(formattedOverlayData);
        profitSeries.setData(formattedProfitData);
        rankSeries.setData(formattedRankData);

        chart.timeScale().fitContent();

        // Handle container resize
        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, [graphData, t]);

    return (
      <>
          <div>
              <RecommendedSeasonSelect selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} disabled={customEnabled}/>

              <div className="d-flex align-items-center">
                  <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={customEnabled}
                        onChange={() => setCustomEnabled(prev => !prev)}
                      />
                      <span className="checkbox-box"></span>
                  </label>
                  <Form.Label className={`form-label ${!customEnabled ? "disabled" : ""}`} style={{width: 240}}>{t("Custom number of weeks:")}</Form.Label>
                  <Form.Control
                    type="number"
                    style={{width: "70px", height: "30px"}}
                    value={numOfWeeks}
                    onChange={(e) => setNumOfWeeks(parseInt(e.target.value))}
                    onBlur={() => {
                        let val = numOfWeeks || 30;
                        setNumOfWeeks(val);
                    }}
                    disabled={!customEnabled}
                  />
              </div>
          </div>

          <OutlineContainer bgColor={"var(--quaternary-color-transparent-50)"} className="tw-mt-10 tw-mb-5">
              <div className="row justify-content-center text-center align-items-center gap-5 py-1 py-md-3">

                  <div className="col-12 col-sm-5">
                      <div className="responsive-time-font">
                          {buyDay != null ? t(Day[buyDay]) : buyDay} {buyHour}:00
                      </div>
                      <div className="responsive-label-font tw-text-base tw-text-green tw-inline-block color-container--green">
                          {t("Best time to buy")}
                      </div>
                  </div>

                  <div className="col-12 col-sm-5">
                      <div className={"responsive-time-font"}>
                          {sellDay != null ? t(Day[sellDay]) : sellDay} {sellHour}:00
                      </div>
                      <div className={"responsive-label-font tw-text-base tw-text-red tw-inline-block color-container--red"}>
                          {t("Best time to sell")}
                      </div>
                  </div>

              </div>
          </OutlineContainer>

          <div className="col-sm mb-5 mt-4">
              <div
                style={{
                    width: "100%",
                    overflowX: isMobile ? "auto" : "visible",
                    overflowY: "visible",
                    WebkitOverflowScrolling: "touch",
                }}
              >
                  {graphData && graphData.length > 0 ? (
                    <div
                      ref={chartContainerRef}
                      style={{
                          width: "100%",
                          height: `${chartHeight}px`,
                          position: "relative",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                          textAlign: "center",
                          padding: "20px",
                          height: `${chartHeight}px`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                      }}
                    >
                        <h4>
                            {t(graphData === undefined ? "Loading chart data..." : "No data available for chart.")}
                        </h4>
                    </div>
                  )}
              </div>
          </div>
      </>
    );
};