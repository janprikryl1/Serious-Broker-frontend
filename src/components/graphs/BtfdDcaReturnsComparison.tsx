import {FC, useEffect, useMemo, useRef, useState} from "react";
import {getAssetSpotKlines, getBinanceIndexAssetAverageGraphData} from "../../utils/api/GraphsService.ts";
import {CustomSwal} from "../../utils/functions/customSwal.ts";
import {useTranslation} from "react-i18next";
import {RecommendedSeasonSelect} from "./RecommendedSeasonSelect.tsx";
import {Form} from "react-bootstrap";
import {BarPlot, ChartContainer, ChartsTooltip, ChartsXAxis, ChartsYAxis, LinePlot} from "@mui/x-charts";
import {graphColors} from "../../utils/constants/qraphConstants.ts";
import {timeZoneOptions} from "../../utils/functions/dateFunctions.ts";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import {CardContainer} from "../reusable/CardContainer.tsx";
import {Day} from "../../pages/graphs/RecommendationDetails_new.tsx";

type Props = {
    asset_label: string;
    BTFDReturnPoints: ReturnDataPoint[];
    DCAReturnPoints: ReturnDataPoint[];
};

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

type ReturnDataPoint = {datetime: string, return: number};
const chartHeight = 600;

export const BtfdDcaReturnsComparison: FC<Props> = ({
                                                         asset_label,
                                                         BTFDReturnPoints,
                                                         DCAReturnPoints
                                                     }) => {
    const { t, i18n } = useTranslation();
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartMargins = useMemo(
        () => ({ left: 0, right: 0, top: 0, bottom: 0 }),
        []
    );

    const getMonth = (data: String) => {
        return Month[parseInt(data.split("-")[1])];
    }

    const getYear = (data: String) => {
        return data.split("-")[0];
    }

    return (
        <>
            <h3>{t("Investment Strategies Return Comparison")}</h3>

            {/*<div style={{paddingLeft: "15px", marginTop: "70px"}}>
                <div>
                    <div className="mb-5" style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Form.Label style={{ width: 370 }}>
                                {t("Regular daily investment for a period of")}
                            </Form.Label>
                            <Typography style={{color: ""}}>
                                The period over which you invest every day
                            </Typography>
                        </div>

                        <Form.Select
                            className="form-select"
                            style={{ height: 34, maxWidth: 100 }}
                            value={selectedNumOfYears}
                            onChange={(e) => setSelectedNumOfYears(e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>
                                    {n} {n === 1 ? "year" : "years"}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className="mb-5" style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Form.Label className="form-label" style={{ width: 370 }}>
                                {t("Base investment amount:")}
                            </Form.Label>
                            <Typography style={{ color: "" }}>
                                The minimal amount of investment
                            </Typography>
                        </div>

                        <Form.Control
                            className="form-control-custom"
                            type="number"
                            style={{ width: "70px", height: "30px" }}
                            value={baseInvestment}
                            onChange={(e) => setBaseInvestment(parseInt(e.target.value))}
                            onBlur={(e) => setBaseInvestment(parseInt(e.target.value))}
                        />
                    </div>

                    <div className="mb-5" style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Form.Label className="form-label" style={{ width: 370 }}>
                                {t("Maximal multiplier:")}
                            </Form.Label>
                            <Typography style={{ color: "" }}>
                                Maximum investment multiplier
                            </Typography>
                        </div>

                        <Slider
                            className="form-control-slider"
                            marks={marks}
                            value={maxMultiplier}
                            onChange={(event, value) => setMaxMultiplier(value as number)}
                            min={MIN}
                            max={MAX}
                            step={0.1}
                            valueLabelDisplay="on"
                            color="#B1974E"
                            sx={{
                                width: 300,
                                color: "#B1974E",
                                "& .MuiSlider-mark": {
                                    height: 0,
                                    width: 0,
                                },
                                "& .MuiSlider-markLabel": {
                                    color: "white",
                                    fontFamily: "PT Sans Caption, sans-serif",
                                },
                                "& .MuiSlider-thumb": {
                                    width: 15,
                                    height: 15,
                                },
                            }}
                        />
                    </div>
                </div>
            </div>*/}

            {/*<div className="justify-content-center text-center align-items-center" style={{display: "flex"}}>
                <CardContainer color="#ffffff20" style={{width: "50%", height: "100px"}}>
                    <div className="row justify-content-center text-center align-items-center">
                        <div className="col" style={{fontWeight: "bold", fontSize: "1.8rem"}}>{DCAReturn.toFixed(2)} %</div>
                        <div className="col" style={{fontWeight: "bold", fontSize: "1.8rem"}}>{BTFDReturn.toFixed(2)} %</div>
                    </div>
                    <div className="row justify-content-center text-center align-items-center" >
                        <div className="col" style={{fontSize: "1.1rem", color: "#C3C0BB"}}>DCA return</div>
                        <div className="col" style={{fontSize: "1.1rem", color: "#C3C0BB"}}>BTFD return</div>
                    </div>
                </CardContainer>
            </div>*/}

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
                    {BTFDReturnPoints && BTFDReturnPoints.length > 0 && DCAReturnPoints && DCAReturnPoints.length > 0 ? (
                        <ChartContainer
                            height={chartHeight}
                            margin={chartMargins}
                            series={[
                                {
                                    id: "DCASeries",
                                    yAxisId: "return",
                                    type: "line",
                                    label: t("DCA Return"),
                                    data: DCAReturnPoints.map((p) => p.return),
                                    color: "#76B4FF",
                                    valueFormatter: (value: number | null) =>
                                        value !== null ? `${Number(value).toFixed(2)} %` : "",
                                },
                                {
                                    id: "BTFDSeries",
                                    yAxisId: "return",
                                    type: "line",
                                    label: t("BTFD Return"),
                                    data: BTFDReturnPoints.map((p) => p.return),
                                    color: "#FFB676",
                                    valueFormatter: (value: number | null) =>
                                        value !== null ? `${Number(value).toFixed(2)} %` : "",
                                },
                            ]}
                            xAxis={[
                                {
                                    scaleType: "band",
                                    data: BTFDReturnPoints.map((p) => `${p.datetime}`),
                                    height: 45,
                                    groups: [
                                        {
                                            getValue: getMonth,
                                            tickSize: 7,
                                            tickLabelStyle: {
                                                transform: 'translateY(-2px)',
                                                fontWeight: 600,
                                            },
                                        },
                                        {
                                            getValue: getYear,
                                            tickSize: 30,
                                            tickLabelStyle: {
                                                transform: 'translateY(-2px)',
                                            },
                                        },
                                    ],
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
                                    id: "return",
                                    position: 'left',
                                    tickNumber: 10,
                                    label: t("Strategy return"),
                                    valueFormatter: (value: number | null) =>
                                        value !== null ? `${value} %` : "",
                                    tickLabelStyle: {
                                        fontSize: 11,
                                        fontFamily: 'PT Sans, sans-serif',
                                        fill: '#444',
                                        transform: 'translateX(5px)'
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
                            <ChartsTooltip trigger="axis" />
                            <LinePlot />
                            <ChartsXAxis />
                            <ChartsYAxis axisId="return" />
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
                                {t(BTFDReturnPoints === undefined || DCAReturnPoints === undefined ? "Loading chart data..." : "No data available for chart.")}
                            </h4>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}