import {Dispatch, FC, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
    ChartContainer,
    LinePlot,
    ChartsXAxis,
    ChartsYAxis,
    ChartsTooltip, BarPlot
} from "@mui/x-charts";
import {
    getBinanceIndexAssetAverageGraphData,
    getBinanceIndexAssetPriceGraphData
} from "../../utils/api/GraphsService.ts";
import { CustomSwal } from "../../utils/functions/customSwal.ts";
import { RecommendationDetailSeasonEnum } from "../../utils/enums/RecommendationDetailSeasonEnum.ts";
import {createDateFormatters, parseBackendUtc, timeZoneOptions} from "../../utils/functions/dateFunctions.ts";
import {RecommendedSeasonSelect} from "./RecommendedSeasonSelect.tsx";
import '../../styles/css/MuiChartsTooltip.css';

/*
* Big recommendation graph
* URL: https://serious.broker/graphs/recommendation/detail/BTC
* Shown on the bottom of the page
**/

type Props = {
    asset_label: string;
    selectedTimeZone: string;
    setSelectedTimezone: Dispatch<SetStateAction<string>>;
};

enum Week {
    "Week" = 1,
    "Month" = 4,
    'Quarter' = 12,
    "Year" = 48,
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

export const RecommendedDetailsPriceGraph1: FC<Props> = ({asset_label, selectedTimeZone, setSelectedTimezone}) => {
    const { t, i18n } = useTranslation();
    const { date, dateTime } = createDateFormatters(i18n.language ?? "cs-CZ", selectedTimeZone);
    const [graphData, setGraphData] = useState<ProcessedDataPoint[] | undefined>();
    const chartContainerRef = useRef<HTMLDivElement>(null);
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
                    console.log(response.data);


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

    /*const { thresholdLines, buyPoints, sellPoints } = useMemo(() => {
        if (!graphData || graphData.length === 0) {
            return {
                thresholdLines: [] as { y: number; label: string; color: string }[],
                buyPoints: [] as ScatterPoint[],
                sellPoints: [] as ScatterPoint[],
            };
        }

        const prices = graphData.map((p) => p.price);
        const lowerCount = Math.max(1, lowerThresholdCount);
        const upperCount = Math.max(1, upperThresholdCount);

        if (lowerCount + upperCount >= prices.length) {
            return { thresholdLines: [], buyPoints: [], sellPoints: [] };
        }

        if (highlightCount > lowerCount || highlightCount > upperCount) {
            return { thresholdLines: [], buyPoints: [], sellPoints: [] };
        }

        const sortedPrices = [...prices].sort((a, b) => a - b);
        const lowerPriceThreshold = sortedPrices[lowerCount - 1];
        const upperPriceThreshold = sortedPrices[prices.length - upperCount];

        const potentialBuyPoints = graphData.filter((p) => p.price <= lowerPriceThreshold);
        const potentialSellPoints = graphData.filter((p) => p.price >= upperPriceThreshold);

        const topBuyPoints = potentialBuyPoints
            .sort((a, b) => a.price - b.price)
            .slice(0, highlightCount);
        const topSellPoints = potentialSellPoints
            .sort((a, b) => b.price - a.price)
            .slice(0, highlightCount);

        return {
            thresholdLines: showTrashHolds
                ? [
                    { y: lowerPriceThreshold, label: t("Buy Threshold"), color: "blue" },
                    { y: upperPriceThreshold, label: t("Sell Threshold"), color: "purple" },
                ]
                : [],
            buyPoints: topBuyPoints.map((p) => ({ x: p.date, y: p.price })),
            sellPoints: topSellPoints.map((p) => ({ x: p.date, y: p.price })),
        };
    }, [
        graphData,
        lowerThresholdCount,
        upperThresholdCount,
        highlightCount,
        showTrashHolds,
        t,
    ]);*/

    return (
        <>
            <h3>{t("Average Profit Graph")}</h3>

            <div style={{paddingLeft: "15px"}}>
                <h5 style={{paddingBottom: "10px"}}>{t("Watched period")}</h5>
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
                            //val = Math.max(1, Math.min(val, (graphData?.length ?? upperThresholdCount) - upperThresholdCount - 1));
                            setNumOfWeeks(val);
                        }}
                        disabled={!customEnabled}
                    />
                </div>
            </div>
            {/*{showTrashHolds && (
                <div className="mt-3" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Form.Label style={{ width: 240 }}>{t("Lower threshold (buy)")}</Form.Label>
                        <Form.Control
                            style={{ height: 30, width: 100 }}
                            type="number"
                            value={lowerThresholdCount}
                            onChange={(e) =>
                                setLowerThresholdCount(Math.max(1, parseInt(e.target.value) || 1))
                            }
                            min="1"
                            max={(graphData?.length ?? upperThresholdCount) - upperThresholdCount - 1}
                        />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Form.Label style={{ width: 240 }}>{t("Upper threshold (sell)")}</Form.Label>
                        <Form.Control
                            type="number"
                            style={{ height: 30, width: 100 }}
                            value={upperThresholdCount}
                            onChange={(e) =>
                                setUpperThresholdCount(Math.max(1, parseInt(e.target.value) || 1))
                            }
                            min="1"
                            max={(graphData?.length ?? lowerThresholdCount) - lowerThresholdCount - 1}
                        />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Form.Label style={{ width: 240 }}>{t("Number of highlighted points")}</Form.Label>
                        <Form.Control
                            type="number"
                            style={{ height: 30, width: 100 }}
                            value={highlightCount}
                            onChange={(e) =>
                                setHighlightCount(Math.max(1, parseInt(e.target.value) || 1))
                            }
                            min="1"
                            max={lowerThresholdCount < upperThresholdCount ? lowerThresholdCount : upperThresholdCount}
                        />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Form.Label style={{ width: 240 }}>{t("Timezone")}</Form.Label>
                        <Form.Select
                            style={{ height: 34, maxWidth: 100 }}
                            value={selectedTimeZone}
                            onChange={(e) => setSelectedTimezone(e.target.value)}
                        >
                            {timeZoneOptions.map((tz) => (
                                <option key={tz} value={tz}>
                                    {tz}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </div>
            )}*/}

            <div
                ref={chartContainerRef}
                className="col-sm service-details__content mb-5 mt-4"
                style={{
                    position: "relative",
                    border: "0.5px solid #3e3a32",
                    borderRadius: "5px",
                    padding: "20px",
                    backgroundColor: "#FFF4E5",
                }}
            >
                <div style={{ width: "100%", height: `${chartHeight}px`, position: "relative" }}>
                    {graphData && graphData.length > 0 ? (
                        <ChartContainer
                            height={chartHeight}
                            margin={chartMargins}
                            series={[
                                {
                                    id: "profitSeries",
                                    yAxisId: "profit",
                                    type: "bar",
                                    label: t("Profit"),
                                    data: graphData.map((p) => p.avgProfit - offset),
                                    color: "#B1974E",
                                    valueFormatter: (value: number | null) =>
                                        value !== null ? `${Number(value + offset).toFixed(3)} €` : "",
                                },
                                {
                                    id: "rankSeries",
                                    yAxisId: "rank",
                                    type: "line",
                                    label: t("Rank"),
                                    data: graphData.map((p) => p.avgWeekRanking),
                                    color: "#4C4033",
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
                                    //tickNumber: 168 / 2,
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
                                //"& .MuiChartsAxis-line": { stroke: "#888",},
                                '& .MuiChartsTooltip-root': {
                                    fontSize: 14,
                                    backgroundColor: '#4287f5',
                                    color: 'white',
                                    padding: '6px 10px',
                                    borderRadius: 4,
                                    zIndex: 1000,
                                },
                                '& .MuiChartsTooltip-table': {
                                    // optional – table contents inside
                                    fontWeight: 600,
                                }
                            }}
                        >
                            <BarPlot/>
                            <LinePlot />
                            <ChartsTooltip trigger="axis" />

                            {/*{showTrashHolds && <ScatterPlot />}*/}

                            {/*{thresholdLines.map((line, index) => (
                                <ChartsReferenceLine
                                    key={index}
                                    y={line.y}
                                    label={`${line.label}: ${line.y.toFixed(2)} €`}
                                    labelAlign="end"
                                    lineStyle={{ stroke: line.color, strokeDasharray: "4 4" }}
                                    labelStyle={{ fill: line.color, fontWeight: "bold", fontSize: "12px" }}
                                />
                            ))}*/}
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
        </>
    );
};
