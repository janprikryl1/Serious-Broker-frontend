import {Dispatch, FC, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
    LinePlot,
    ScatterPlot,
    ChartsReferenceLine,
    ChartsXAxis,
    ChartsYAxis,
    ChartsTooltip, ChartContainer,
} from "@mui/x-charts";
import { getBinanceIndexAssetPriceGraphData } from "../../utils/api/GraphsService.ts";
import { CustomSwal } from "../../utils/functions/customSwal.ts";
import { RecommendationDetailSeasonEnum } from "../../utils/enums/RecommendationDetailSeasonEnum.ts";
import {createDateFormatters, parseBackendUtc, timeZoneOptions} from "../../utils/functions/dateFunctions.ts";

/*
* Big recommendation graph
* URL: https://serious.broker/graphs/recommendation/detail/BTC
* Shown on the bottom of the page
**/

type Props = {
    asset_label: string;
    selectedPeriod: RecommendationDetailSeasonEnum;
    selectedTimeZone: string;
    setSelectedTimezone: Dispatch<SetStateAction<string>>;
};

type ProcessedDataPoint = { price: number; date: Date };
type ScatterPoint = { x: Date; y: number };

const chartHeight = 800;

export const RecommendedDetailsPriceGraph: FC<Props> = ({asset_label, selectedPeriod, selectedTimeZone, setSelectedTimezone}) => {
    const { t, i18n } = useTranslation();
    const { date, dateTime } = createDateFormatters(i18n.language ?? "cs-CZ", selectedTimeZone);
    const [graphData, setGraphData] = useState<ProcessedDataPoint[] | undefined>();
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartMargins = useMemo(
        () => ({ left: 70, right: 40, top: 20, bottom: 30 }),
        []
    );
    const [showTrashHolds, setShowTrashHolds] = useState(true);
    const [lowerThresholdCount, setLowerThresholdCount] = useState(8);
    const [upperThresholdCount, setUpperThresholdCount] = useState(8);
    const [highlightCount, setHighlightCount] = useState(3);

    useEffect(() => {
        if (!asset_label) return;
        const getData = async () => {
            setGraphData(undefined);
            try {
                const response = await getBinanceIndexAssetPriceGraphData(
                    asset_label,
                    selectedPeriod
                );
                if (response?.data) {
                    const processedData: ProcessedDataPoint[] = response.data.map((p: any) => ({
                        price: parseFloat(p.close_eur),
                        date: parseBackendUtc(p.datetime),
                    }));
                    setGraphData(processedData);
                } else {
                    setGraphData([]);
                }
            } catch (e) {
                CustomSwal.fire({
                    title: t("Error"),
                    text: t("Something went wrong"),
                    icon: "error",
                });
                setGraphData([]);
            }
        };
        getData();
    }, [asset_label, selectedPeriod, t]);

    const { thresholdLines, buyPoints, sellPoints } = useMemo(() => {
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
    ]);

    return (
        <>
            <h3>{t("Price chart")}</h3>
            
            <Form.Check
                type="switch"
                label={t("Show trash holds")}
                checked={showTrashHolds}
                onChange={() => setShowTrashHolds((prevState) => !prevState)}
            />

            {showTrashHolds && (
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
            )}

            <div
                ref={chartContainerRef}
                className="col-sm service-details__content mb-5 mt-4"
                style={{
                    position: "relative",
                    border: "0.5px solid #3e3a32",
                    borderRadius: "16px",
                    padding: "20px",
                    backgroundColor: "#d4c6a9",
                }}
            >
                <div style={{ width: "100%", overflowX: "auto", height: `${chartHeight}px`, position: "relative" }}>
                    {graphData && graphData.length > 0 ? (
                        <ChartContainer
                            height={chartHeight}
                            series={[
                                {
                                    id: "priceSeries",
                                    type: "line",
                                    label: t("Price"),
                                    data: graphData.map((p) => p.price),
                                    color: "green",
                                    showMark: false,
                                    valueFormatter: (value: number | null) =>
                                        value !== null ? `${Number(value).toFixed(2)} €` : "",
                                },
                                // @ts-ignore
                                ...(buyPoints.length
                                    ? [
                                        {
                                            id: "buys",
                                            type: "scatter" as const,
                                            label: t("Buy"),
                                            data: buyPoints,
                                            color: "blue",
                                            markerSize: 7,
                                        },
                                    ]
                                    : []),
                                // @ts-ignore
                                ...(sellPoints.length
                                    ? [
                                        {
                                            id: "sells",
                                            type: "scatter" as const,
                                            label: t("Sell"),
                                            data: sellPoints,
                                            color: "red",
                                            markerSize: 7,
                                        },
                                    ]
                                    : []),
                            ]}
                            xAxis={[
                                {
                                    scaleType: "time",
                                    data: graphData.map((p) => p.date),
                                    valueFormatter: (d: Date) => (d ? date(d) : "")
                                },
                            ]}
                            yAxis={[{ valueFormatter: (value: number) => `${value} €` }]}
                            sx={{
                                backgroundColor: "transparent",
                                "& .MuiChartsAxis-tickLabel": { fontSize: "10px", fill: "#333" },
                                "& .MuiChartsAxis-line": { stroke: "#888" },
                            }}
                            margin={chartMargins}
                        >
                            <LinePlot />
                            {showTrashHolds && <ScatterPlot />}
                            <ChartsTooltip
                                trigger="item"
                                itemContent={(e) => {
                                    const point = e.series.data[e.itemData.dataIndex] as any;
                                    const dateForTooltip: Date | undefined =
                                        point?.x instanceof Date
                                            ? point.x
                                            // @ts-ignore
                                            : ((e.axisData?.x?.value as Date | undefined) ?? undefined);
                                    const price =
                                        typeof e.itemData?.y === "number"
                                            ? e.itemData.y
                                            : typeof e.itemData?.value === "number"
                                                ? e.itemData.value
                                                : undefined;

                                    return (
                                        <div
                                            style={{
                                                zIndex: 999,
                                                backgroundColor: "white",
                                                color: "black",
                                                padding: 5,
                                                borderRadius: 10,
                                            }}
                                        >
                                            <div>
                                                <strong>{t(e.series.label)}</strong>
                                            </div>
                                            {dateForTooltip && <div>{dateTime(dateForTooltip)}</div>}
                                            {typeof price === "number" && <div>{price.toFixed(2)} €</div>}
                                        </div>
                                    );
                                }}
                            />
                            {thresholdLines.map((line, index) => (
                                <ChartsReferenceLine
                                    key={index}
                                    y={line.y}
                                    label={`${line.label}: ${line.y.toFixed(2)} €`}
                                    labelAlign="end"
                                    lineStyle={{ stroke: line.color, strokeDasharray: "4 4" }}
                                    labelStyle={{ fill: line.color, fontWeight: "bold", fontSize: "12px" }}
                                />
                            ))}
                            <ChartsXAxis />
                            <ChartsYAxis />
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
