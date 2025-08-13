import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Form, Col, Row, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
    ResponsiveChartContainer,
    LinePlot,
    ScatterPlot,
    ChartsReferenceLine,
    ChartsXAxis,
    ChartsYAxis,
    ChartsTooltip,
} from "@mui/x-charts";
import { getBinanceIndexAssetPriceGraphData } from "../../utils/api/GraphsService.ts";
import { CustomSwal } from "../../utils/functions/customSwal.ts";
import { RecommendationDetailSeasonEnum } from "../../utils/enums/RecommendationDetailSeasonEnum.ts";
import {toCzechDateFormat} from "../../utils/functions/dateFunctions.ts";

type Props = {
    asset_label: string;
    selectedPeriod: RecommendationDetailSeasonEnum;
};

type ProcessedDataPoint = { price: number; date: Date };
type ScatterPoint = { x: Date; y: number };

const chartHeight = 800;

export const RecommendedDetailsPriceGraph: FC<Props> = ({ asset_label, selectedPeriod }) => {
    const { t } = useTranslation();
    const [graphData, setGraphData] = useState<ProcessedDataPoint[] | undefined>();
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartMargins = useMemo(() => ({ left: 70, right: 40, top: 20, bottom: 30 }), []);
    const [showTrashHolds, setShowTrashHolds] = useState(true);
    const [lowerThresholdCount, setLowerThresholdCount] = useState(16);
    const [upperThresholdCount, setUpperThresholdCount] = useState(16);
    const [highlightCount, setHighlightCount] = useState(5);

    useEffect(() => {
        if (!asset_label) return;
        const getData = async () => {
            setGraphData(undefined);
            try {
                const response = await getBinanceIndexAssetPriceGraphData(asset_label, selectedPeriod);
                if (response?.data) {
                    const processedData: ProcessedDataPoint[] = response.data.map((p: any) => ({
                        price: parseFloat(p.close_eur),
                        date: new Date(p.datetime),
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

    const { thresholdLines, buyPoints, sellPoints, validationError } = useMemo(() => {
        if (!graphData || graphData.length === 0) {
            return {
                thresholdLines: [] as { y: number; label: string; color: string }[],
                buyPoints: [] as ScatterPoint[],
                sellPoints: [] as ScatterPoint[],
                validationError: null as string | null,
            };
        }

        const prices = graphData.map((p) => p.price);
        const lowerCount = Math.max(1, lowerThresholdCount);
        const upperCount = Math.max(1, upperThresholdCount);

        if (lowerCount + upperCount >= prices.length) {
            return {
                thresholdLines: [],
                buyPoints: [],
                sellPoints: [],
                validationError:
                    t("The sum of the thresholds must be less than the number of data points") + ` (${prices.length}).`,
            };
        }

        if (highlightCount > lowerCount || highlightCount > upperCount) {
            return {
                thresholdLines: [],
                buyPoints: [],
                sellPoints: [],
                validationError: t("The number of highlighted points cannot be greater than the threshold count."),
            };
        }

        const sortedPrices = [...prices].sort((a, b) => a - b);
        const lowerPriceThreshold = sortedPrices[lowerCount - 1];
        const upperPriceThreshold = sortedPrices[prices.length - upperCount];

        const potentialBuyPoints = graphData.filter((p) => p.price <= lowerPriceThreshold);
        const potentialSellPoints = graphData.filter((p) => p.price >= upperPriceThreshold);

        const topBuyPoints = potentialBuyPoints.sort((a, b) => a.price - b.price).slice(0, highlightCount);
        const topSellPoints = potentialSellPoints.sort((a, b) => b.price - a.price).slice(0, highlightCount);

        return {
            thresholdLines: showTrashHolds ? [
                { y: lowerPriceThreshold, label: `${t("Buy Threshold")} (${lowerCount})`, color: "darkorange" },
                { y: upperPriceThreshold, label: `${t("Sell Threshold")} (${upperCount})`, color: "purple" },
            ] : [],
            buyPoints: topBuyPoints.map((p) => ({ x: p.date, y: p.price })),
            sellPoints: topSellPoints.map((p) => ({ x: p.date, y: p.price })),
            validationError: null,
        };
    }, [graphData, lowerThresholdCount, upperThresholdCount, highlightCount, showTrashHolds, t]);

    return (
        <>
            <h3>{t("Price chart")}</h3>
            
                
                    <Form.Check
                        type="switch"
                        id="smoothing-switch"
                        label={t("Show trash holds")}
                        checked={showTrashHolds}
                        onChange={() => setShowTrashHolds((prevState) => !prevState)}
                    />
                
                {showTrashHolds && (
                    <Row className="mb-3 align-items-end">
                        <Col md={3}>
                            <Form.Label>{t("Lower threshold (buy)")}</Form.Label>
                            <Form.Control
                                type="number"
                                value={lowerThresholdCount}
                                onChange={(e) => setLowerThresholdCount(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Label>{t("Upper threshold (sell)")}</Form.Label>
                            <Form.Control
                                type="number"
                                value={upperThresholdCount}
                                onChange={(e) => setUpperThresholdCount(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label>{t("Number of highlighted points (buy/sell)")}</Form.Label>
                            <Form.Control
                                type="number"
                                value={highlightCount}
                                onChange={(e) => setHighlightCount(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                            />
                        </Col>
                    </Row>
                )}

            {validationError && <Alert variant="danger">{validationError}</Alert>}

            <div
                ref={chartContainerRef}
                className="col-sm service-details__content mb-5"
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
                        <ResponsiveChartContainer
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
                                ...(!validationError && buyPoints.length
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
                                ...(!validationError && sellPoints.length
                                    ? [
                                        {
                                            id: "sells",
                                            type: "scatter" as const,
                                            label: t("Sell"),
                                            data: sellPoints, // {x: Date, y: number}
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
                                    valueFormatter: (date: Date) => (date ? new Date(date).toLocaleString() : ""),
                                },
                            ]}
                            yAxis={[{ valueFormatter: (value: number) => `${value.toFixed(2)} €` }]}
                            sx={{
                                backgroundColor: "transparent",
                                "& .MuiChartsAxis-tickLabel": { fontSize: "10px", fill: "#333" },
                                "& .MuiChartsAxis-line": { stroke: "#888" },
                            }}
                            margin={chartMargins}
                        >
                            <LinePlot />
                            {showTrashHolds && <ScatterPlot />}
                            <ChartsTooltip trigger="item" itemContent={(e) => e.series.data[e.itemData.dataIndex] && <div style={{zIndex:999, backgroundColor:"white", color:"black", padding:5, borderRadius:10}}><strong>{t(e.series.label)}</strong> {toCzechDateFormat(e.series.data[e.itemData.dataIndex]?.x)}</div>} />
                            {!validationError &&
                                thresholdLines.map((line, index) => (
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
                        </ResponsiveChartContainer>
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
                            <h4>{t(graphData === undefined ? "Loading chart data..." : "No data available for chart.")}</h4>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
