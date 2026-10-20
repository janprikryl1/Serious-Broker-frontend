import {
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getBinanceIndexAverageGraphData } from "../../utils/api/GraphsService.ts";
import { RecommendationDetailSeasonEnum } from "../../utils/enums/RecommendationDetailSeasonEnum.ts";
import { createDateFormatters } from "../../utils/functions/dateFunctions.ts";
import { RecommendedSeasonSelect } from "./RecommendedSeasonSelect.tsx";
import { useMediaQuery } from "@mui/material";
import { OutlineContainer } from "../reusable/OutlineContainer.tsx";
import { createChart, ColorType } from "lightweight-charts";
import { CHART_COLORS } from "../../utils/constants/customColors.ts";
import { AssetDetailType } from "../../utils/types/asset/AssetDetailType.ts";
import {useUserContext} from "../../utils/providers/providerUser.tsx";

type Props = {
    asset_label: string;
    selectedTimeZone: string;
    setSelectedTimezone: Dispatch<SetStateAction<string>>;
    indexDetails: AssetDetailType;
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

type ProcessedDataPoint = {
    dayAndHour: string;
    dayOfWeek: number;
    hour: number;
    avgProfit: number;
    avgWeekRanking: number;
};

const chartHeight = 600;
const profitSeriesColor = "#C5A657";
const rankSeriesColor = "#76746F";

export const IndexDetailsRecommendationGraph: FC<Props> = ({
                                                      asset_label,
                                                      selectedTimeZone,
                                                      indexDetails,
                                                  }) => {
    const { t, i18n } = useTranslation();
    createDateFormatters(i18n.language ?? "cs-CZ", selectedTimeZone);
    const [graphData, setGraphData] = useState<ProcessedDataPoint[] | undefined>();
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 1000px)");

    const [maxRank, setMaxRank] = useState(200);
    const [selectedPeriod, setSelectedPeriod] = useState<RecommendationDetailSeasonEnum>(
      RecommendationDetailSeasonEnum.Week
    );
    const [numOfWeeks, setNumOfWeeks] = useState(
      Week[RecommendationDetailSeasonEnum.Week]
    );
    const [customEnabled, setCustomEnabled] = useState(false);

    const [finalBuyDay, setFinalBuyDay] = useState<number | undefined>(0);
    const [finalBuyHour, setFinalBuyHour] = useState<number | undefined>(0);
    const [finalSellDay, setFinalSellDay] = useState<number | undefined>(0);
    const [finalSellHour, setFinalSellHour] = useState<number | undefined>(0);

    // Načítanie dát z get_index_average_graph_data.php
    useEffect(() => {
        if (!asset_label) return;
        const getData = async () => {
            setGraphData(undefined);
            try {
                const response = await getBinanceIndexAverageGraphData(
                  asset_label,
                  customEnabled ? numOfWeeks : Week[selectedPeriod]
                );

                // Keďže tvoj endpoint vracia priamo pole [ {...}, {...} ]:
                const rawData = Array.isArray(response?.data)
                  ? response.data
                  : response?.data?.data;

                if (rawData && rawData.length > 0) {
                    const processedData: ProcessedDataPoint[] = rawData.map((p: any) => ({
                        dayAndHour: p.day_of_week + " - " + p.hour,
                        dayOfWeek: parseInt(p.day_of_week, 10),
                        hour: parseInt(p.hour, 10),
                        avgProfit: parseFloat(p.avg_profit),
                        avgWeekRanking: parseFloat(p.avg_week_ranking),
                    }));

                    setGraphData(processedData);
                    const ranks = processedData.map((p) => p.avgWeekRanking);
                    setMaxRank(Math.max(...ranks));
                } else {
                    setGraphData([]);
                }
            } catch (e) {
                console.error(e);
                setGraphData([]);
            }
        };
        getData();
    }, [asset_label, selectedPeriod, numOfWeeks, customEnabled]);

    useEffect(() => {
        const bestBuyPoint = graphData?.reduce((prev, curr) =>
          curr.avgProfit < prev.avgProfit ? curr : prev, graphData[0]);

        const bestSellPoint = graphData?.reduce((prev, curr) =>
          curr.avgProfit > prev.avgProfit ? curr : prev, graphData[0]);

        setFinalBuyDay(bestBuyPoint?.dayOfWeek);
        setFinalBuyHour(bestBuyPoint?.hour);
        setFinalSellDay(bestSellPoint?.dayOfWeek);
        setFinalSellHour(bestSellPoint?.hour);
        // const finalBuyDay = bestBuyPoint?.dayOfWeek;
        // const finalBuyHour = bestBuyPoint?.hour;
        // const finalSellDay = bestSellPoint?.dayOfWeek;
        // const finalSellHour = bestSellPoint?.hour;

        // console.log(finalBuyDay, finalBuyHour, "....", finalSellDay, finalSellHour)
    }, [graphData])

    // Vykreslenie grafu Lightweight Charts
    useEffect(() => {
        if (!chartContainerRef.current || !graphData || graphData.length === 0)
            return;

        const chartContainer = chartContainerRef.current;
        chartContainer.innerHTML = "";

        const baseTimestamp = Math.floor(
          new Date("2026-01-01T00:00:00Z").getTime() / 1000
        );

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
            if (p.avgProfit > graphData[maxProfitIndex].avgProfit)
                maxProfitIndex = idx;
            if (p.avgProfit < graphData[minProfitIndex].avgProfit)
                minProfitIndex = idx;
        });

        const areaOverlaySeries = chart.addHistogramSeries({
            priceScaleId: "overlayScale",
            priceFormat: { type: "volume" },
            lastValueVisible: false,
            priceLineVisible: false,
        });

        chart.priceScale("overlayScale").applyOptions({
            scaleMargins: { top: 0, bottom: 0 },
            visible: false,
        });

        const rankSeries = chart.addHistogramSeries({
            color: rankSeriesColor,
            priceScaleId: "right",
            title: t("Rank"),
            priceFormat: {
                type: "custom",
                formatter: (val: number) => `${Number(val).toFixed(0)}`,
            },
        });

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

        const formattedProfitData: any[] = [];
        const formattedRankData: any[] = [];
        const formattedOverlayData: any[] = [];

        graphData.forEach((p, index) => {
            const pointTimestamp = baseTimestamp + index * 3600;

            formattedProfitData.push({
                time: pointTimestamp,
                value: p.avgProfit,
            });

            formattedRankData.push({
                time: pointTimestamp,
                value: maxRank + 1 - p.avgWeekRanking,
            });

            let barColor = "transparent";
            if (index === minProfitIndex) {
                barColor = CHART_COLORS.green;
            } else if (index === maxProfitIndex) {
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
    }, [graphData, maxRank, t]);

    return (
      <>
          <div>
              <RecommendedSeasonSelect
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={setSelectedPeriod}
                disabled={customEnabled}
              />

              <div className="d-flex align-items-center">
                  <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={customEnabled}
                        onChange={() => setCustomEnabled((prev) => !prev)}
                      />
                      <span className="checkbox-box"></span>
                  </label>
                  <Form.Label
                    className={`form-label ${!customEnabled ? "disabled" : ""}`}
                    style={{ width: 240 }}
                  >
                      {t("Custom number of weeks:")}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    style={{ width: "70px", height: "30px" }}
                    value={numOfWeeks}
                    onChange={(e) => setNumOfWeeks(parseInt(e.target.value, 10))}
                    onBlur={() => {
                        const val = numOfWeeks || 30;
                        setNumOfWeeks(val);
                    }}
                    disabled={!customEnabled}
                  />
              </div>
          </div>

          <OutlineContainer
            bgColor={"var(--quaternary-color-transparent-50)"}
            className="tw-mt-10 tw-mb-5"
          >
              <div className="row justify-content-center text-center align-items-center gap-5 py-1 py-md-3">
                  <div className="col-12 col-sm-5">
                      <div className="responsive-time-font">
                          {finalBuyDay != null ? t(Day[finalBuyDay]) : "-"} {finalBuyHour != null ? finalBuyHour : "-"}:00
                      </div>
                      <div className="responsive-label-font tw-text-base tw-text-green tw-inline-block color-container--green">
                          {t("Best time to buy")}
                      </div>
                  </div>

                  <div className="col-12 col-sm-5">
                      <div className="responsive-time-font">
                          {finalSellDay != null ? t(Day[finalSellDay]) : "-"} {finalSellHour != null ? finalSellHour : "-"}:00
                      </div>
                      <div className="responsive-label-font tw-text-base tw-text-red tw-inline-block color-container--red">
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
                            {t(
                              graphData === undefined
                                ? "Loading chart data..."
                                : "No data available for chart."
                            )}
                        </h4>
                    </div>
                  )}
              </div>
          </div>
      </>
    );
};