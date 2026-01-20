import {FC, useRef} from "react";
import HeaderImage from "../../utils/icons/cta/sticks_graph.webp";
import {Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";
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
import { ChartContainerPro } from '@mui/x-charts-pro/ChartContainerPro';
import { ChartZoomSlider } from '@mui/x-charts-pro/ChartZoomSlider';
import {graphColors} from "../../utils/constants/qraphConstants.ts";

type Props = {
    graphData: number[][];
    datetimes: string[];
};

const chartHeight = 500;

enum Month {
    "January" = 1,
    "February" = 2,
    "March" = 3,
    "April" = 4,
    "May" = 5,
    "June" = 6,
    "July" = 7,
    "August" = 8,
    "September" = 9,
    "October" = 10,
    "November" = 11,
    "December" = 12,
}

export const BTFDGraph: FC<Props> = ({ graphData, datetimes }) => {

    const chartContainerRef = useRef<HTMLDivElement>(null);
    const datetimeXAxis: string[] = datetimes;
    const getMonth = (data: String) => {
        return Month[parseInt(data.split("-")[1])];
    }

    const getYear = (data: String) => {
        return data.split("-")[0];
    }

/*    const firstSeriesData = decimate(graphData[0], 10);
    const secondSeriesData = decimate(graphData[1], 10);
    const thirdSeriesData = decimate(graphData[2], 10);
    const fourthSeriesData = decimate(graphData[3], 10);
    const filteredDatetimes = decimate(datetimes, 10);*/

    const missing = datetimes.length - graphData[0].length;
    const padded0 = Array(missing).fill(null).concat(graphData[0]);
    const padded1 = Array(missing).fill(null).concat(graphData[1]);
    const padded3 = Array(missing).fill(null).concat(graphData[3]);

    console.log("graph data: ", graphData);
    //console.log("datetimes: ", datetimes);

    function decimate(data: number[], step: number) {
        const out = [];
        for (let i = 0; i < data.length; i += step) out.push(data[i]);
        return out;
    }

    return (
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
                    <ChartContainerPro
                        height={chartHeight}
                        series={[
                            {
                                id: "setting1",
                                yAxisId: "setting",
                                type: "line",
                                label: "Base model",
                                data: padded0,
                                color: "#FF7676",
                                valueFormatter: (value: number | null) =>
                                    value !== null
                                        ? `${value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`
                                        : ""
                            },
                            {
                                id: "setting2",
                                yAxisId: "setting",
                                type: "line",
                                label: "Multiplier: x10",
                                data: padded1,
                                color: "#76B4FF",
                                valueFormatter: (value: number | null) =>
                                    value !== null
                                        ? `${value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`
                                        : ""
                            },
                            {
                                id: "setting3",
                                yAxisId: "setting",
                                type: "line",
                                label: "Period: 3 years",
                                data: graphData[2],
                                color: "#B1974E",
                                valueFormatter: (value: number | null) =>
                                    value !== null
                                        ? `${value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`
                                        : ""
                            },
                            {
                                id: "setting4",
                                yAxisId: "setting",
                                type: "line",
                                label: "Max drop: 50%",
                                data: padded3,
                                color: "#86DF7B",
                                valueFormatter: (value: number | null) =>
                                    value !== null
                                        ? `${value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`
                                        : ""
                            },
                        ]}
                        xAxis={[
                            {
                                scaleType: "time",
                                data: datetimeXAxis.map(d => new Date(d)),

                                height: 45,
                                zoom: {
                                    filterMode: 'discard',
                                    slider: { enabled: true },
                                    panning: true,
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
                                id: "setting",
                                position: 'left',
                                //min: -1,
                                //max: 1,
                                zoom: { slider: { enabled: true } },
                                tickNumber: 10,
                                label: "Strategy return",
                                valueFormatter: (value: number | null) =>
                                    value !== null ? `${value} %` : "",
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
                            "& .MuiChartsAxis-line": { stroke: "#888",},
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
                            },
                            "& .MuiLineElement-series-assetPriceSeries": {
                                strokeWidth: 1.5,
                            },
                            "& .MuiLineElement-series-ATH": {
                                strokeWidth: 1.5,
                            },
                        }}
                    >
                        <ChartZoomSlider />
                        <ChartsTooltip trigger="axis" />
                        <LinePlot />
                        <ChartsXAxis />
                        <ChartsYAxis axisId="setting" />
                    </ChartContainerPro>
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
                            {graphData === undefined ? "Loading chart data..." : "No data available for chart."}
                        </h4>
                    </div>
                )}
            </div>
        </div>
    );
};