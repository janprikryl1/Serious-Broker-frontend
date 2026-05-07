import {Dispatch, FC, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {BarPlot, ChartContainer, ChartsLegend, ChartsTooltip, ChartsXAxis, ChartsYAxis, LinePlot} from "@mui/x-charts";
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

/*
* Big recommendation graph
* URL: https://serious.broker/graphs/recommendation/detail/BTC
* Shown on the bottom of the page
 */

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
const profitSeriesColor = "#4C4033";
const rankSeriesColor = "#B1974E";

export const RecommendedDetailsPriceGraph1: FC<Props> = ({asset_label, selectedTimeZone, setSelectedTimezone, recommendationsDetail}) => {
    const { t, i18n } = useTranslation();
    const { date, dateTime } = createDateFormatters(i18n.language ?? "cs-CZ", selectedTimeZone);
    const [graphData, setGraphData] = useState<ProcessedDataPoint[] | undefined>();
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery('(max-width: 1000px');
    const chartMargins = useMemo(
        () => ({ left: 0, right: 0, top: 0, bottom: 0 }),
        []
    );
    const [showTrashHolds, setShowTrashHolds] = useState(true);
    const [lowerThresholdCount, setLowerThresholdCount] = useState(8);
    const [upperThresholdCount, setUpperThresholdCount] = useState(8);
    const [highlightCount, setHighlightCount] = useState(3);
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



    return (
        <>
            <h3>{t("Average Profit Graph")}</h3>

            <div style={{paddingLeft: "15px"}}>
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

            <OutlineContainer bgColor={"var(--quaternary-color-transparent-50)"}>
                <div className="row justify-content-center text-center align-items-center gap-5 py-1 py-md-3">

                    <div className="col-12 col-sm-5">
                        <div className="responsive-time-font">
                            {buyDay != null ? t(Day[buyDay]) : buyDay} {buyHour}:00
                        </div>
                        <div className="responsive-label-font mt-1">
                            {t("Best time to buy")}
                        </div>
                    </div>

                    <div className="col-12 col-sm-5">
                        <div className={"responsive-time-font"}>
                            {sellDay != null ? t(Day[sellDay]) : sellDay} {sellHour}:00
                        </div>
                        <div className={"responsive-label-font"}>
                            {t("Best time to sell")}
                        </div>
                    </div>

                </div>
            </OutlineContainer>

            <div
                ref={chartContainerRef}
                className="col-sm service-details__content mb-5 mt-4"
                style={{
                    position: "relative",
                    border: "0.5px solid #3e3a32",
                    borderRadius: "5px",
                    padding: "20px",
                    backgroundColor: "var(--cream-color)",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        overflowX: isMobile ? "auto" : "visible",
                        overflowY: "visible",
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    <div
                        style={{
                            minWidth: isMobile ? "1100px" : "100%",
                            height: `${chartHeight}px`,
                            position: "relative",
                        }}
                    >
                    {graphData && graphData.length > 0 ? (
                        <ChartContainer
                            height={chartHeight}
                            margin={chartMargins}
                            series={[
                                {
                                    id: "profitSeries",
                                    yAxisId: "profit",
                                    type: "line",
                                    label: t("Profit"),
                                    data: graphData.map((p) => p.avgProfit - offset),
                                    color: profitSeriesColor,
                                    valueFormatter: (value: number | null) =>
                                        value !== null ? `${Number(value + offset).toFixed(3)} €` : "",
                                },
                                {
                                    id: "rankSeries",
                                    yAxisId: "rank",
                                    type: "bar",
                                    label: t("Rank"),
                                    data: graphData.map((p) => p.avgWeekRanking),
                                    color: rankSeriesColor,
                                    valueFormatter: (value: number | null) =>
                                        value !== null ? `${Number(value).toFixed()}` : "",
                                },

                            ]}
                            xAxis={[
                                {
                                    scaleType: "band",
                                    data: graphData.map((p) => `${p.dayOfWeek} - ${p.hour}`),
                                    valueFormatter: (value: string | null) => {
                                        if (!value) return "";
                                        const parts = value.split(" - ");
                                        return Day[parseInt(parts[0])] + ", " + parts[1] + ":00";
                                    },
                                    label: t("Day, Hour"),
                                    height: 65,
                                    groups: [
                                        {
                                            getValue: getHour,
                                        },
                                        {
                                            getValue: getDay,
                                            tickSize: 12,
                                            tickLabelStyle: {
                                                transform: 'translateY(15px)',
                                                fontWeight: 600,
                                            },
                                        },
                                    ],
                                    tickPlacement: "middle",
                                    tickInterval: (value: any, index: number) => index % 3 === 0,
                                    tickLabelInterval: ( value) => {
                                        const hour = parseInt(value.split(" - ")[1], 10)
                                        return hour % 3 === 0
                                    },
                                    labelStyle: {
                                        fontSize: 13,
                                        fontFamily: 'PT Sans Caption, sans-serif',
                                        fontWeight: "bold",
                                    },
                                    tickLabelStyle: {
                                        fontSize: 11,
                                        fontFamily: 'PT Sans, sans-serif',
                                        fill: '#444',
                                        transform: 'translateY(5px)',
                                    },
                                },
                            ]}
                            yAxis={[
                                {
                                    id: "profit",
                                    valueFormatter: (value: number) => `${Number(value + offset).toFixed(2)} €`,
                                    max: (maxProfit - offset) * 1.07,
                                    tickNumber: 5,
                                    position: 'left',
                                    label: t("Profit"),
                                    tickLabelStyle: {
                                        fontSize: 11,
                                        fontFamily: 'PT Sans, sans-serif',
                                        fill: '#444',
                                    },
                                    labelStyle: {
                                        fontSize: 14,
                                        fontFamily: 'PT Sans Caption, sans-serif',
                                        fontWeight: "bold",
                                    },
                                },
                                {
                                    id: "rank",
                                    position: 'right',
                                    min: 0,
                                    max: Math.max(170, maxRank),
                                    tickNumber: 10,
                                    label: t("Rank"),
                                    tickLabelStyle: {
                                        fontSize: 11,
                                        fontFamily: 'PT Sans, sans-serif',
                                        fill: '#444',
                                    },
                                    labelStyle: {
                                        fontSize: 14,
                                        fontFamily: 'PT Sans Caption, sans-serif',
                                        fontWeight: "bold"
                                    },
                                }
                            ]}
                            sx={{
                                backgroundColor: "transparent",
                                '& .MuiChartsTooltip-root': {
                                    fontSize: 14,
                                    backgroundColor: '#4287f5',
                                    color: 'white',
                                    padding: '6px 10px',
                                    borderRadius: 4,
                                    zIndex: 1000,
                                },
                                '& .MuiChartsTooltip-table': {
                                    fontWeight: 600,
                                }
                            }}
                        >
                            <BarPlot/>
                            <LinePlot />
                            <ChartsTooltip trigger="axis" />
                            <ChartsXAxis />
                            <ChartsYAxis axisId="profit" />
                            <ChartsYAxis axisId="rank" />
                        </ChartContainer>
                    ) : (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "20px",
                                height: "100%",
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
            </div>
        </>
    );
};
