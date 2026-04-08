import {FC, useEffect, useMemo, useRef, useState} from "react";
import {getAssetSpotKlines} from "../../utils/api/GraphsService.ts";
import {getBinanceAssetATH} from "../../utils/api/ATHService.ts";
import {CustomSwal} from "../../utils/functions/customSwal.ts";
import {useTranslation} from "react-i18next";
import {Form} from "react-bootstrap";
import {ChartContainer, ChartsTooltip, ChartsXAxis, ChartsYAxis, LinePlot} from "@mui/x-charts";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import {CardContainer} from "../reusable/CardContainer.tsx";
import {ATHType} from "../../utils/types/ATH/ATHType.ts";

type Props = {
    asset_label: string;
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

type ProcessedDataPoint = {datetime: string, closeEur: number};
type ReturnDataPoint = {datetime: string, return: number};
const chartHeight = 600;

export const BtfdDcaComparison: FC<Props> = ({asset_label}) => {
    const { t, i18n } = useTranslation();
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [graphData, setGraphData] = useState<ProcessedDataPoint[] | undefined>();
    const [filteredData, setFilteredData] = useState<ProcessedDataPoint[] | undefined>();
    const [selectedNumOfYears, setSelectedNumOfYears] = useState(1);
    const chartMargins = useMemo(
        () => ({ left: 0, right: 0, top: 0, bottom: 0 }),
        []
    );
    const [baseInvestment, setBaseInvestment] = useState(100);
    const [periodInvestment, setPeriodInvestment] = useState(1);
    const [maxMultiplier, setMaxMultiplier] = useState(3);
    const [maxDecrease, setMaxDecrease] = useState(0.75);
    const [DCAReturn, setDCAReturn] = useState(0);
    const [DCATotalInvested, setDCATotalInvested] = useState(0);
    const [BTFDReturn, setBTFDReturn] = useState(0);
    const [BTFDTotalInvested, setBTFDTotalInvested] = useState(0);
    const [DCAReturnValues, setDCAReturnValues] = useState<number[]>([]);
    const [BTFDReturnValues, setBTFDReturnValues] = useState<number[]>([]);
    const [DCAReturnPoints, setDCAReturnPoints] = useState<ReturnDataPoint[] | undefined>();
    const [BTFDReturnPoints, setBTFDReturnPoints] = useState<ReturnDataPoint[] | undefined>();
    const [ATHs, setATHs] = useState<number[]>([])
    const [assetATH, setAssetATH] = useState<ATHType | null>(null);

    const getMonth = (data: String) => {
        return t(Month[parseInt(data.split("-")[1])]);
    }

    const getYear = (data: String) => {
        return data.split("-")[0];
    }

    const MAX = 10;
    const MIN = 1;
    const marks = [
        {
            value: MIN,
            label: '3x',
        },
        {
            value: MAX,
            label: '10x',
        },
    ];

    useEffect(() => {
        if (!asset_label) return;
        const getData = async () => {
            setGraphData(undefined);
            setFilteredData(undefined);
            setAssetATH(null);
            try {
                const [klinesResponse, athResponse] = await Promise.all([
                    getAssetSpotKlines(asset_label, selectedNumOfYears),
                    getBinanceAssetATH(asset_label),
                ]);

                if (athResponse?.data) {
                    const parsedPriceEur = Number(athResponse.data.price_eur);
                    const parsedPriceUsd = Number(athResponse.data.price_usd);
                    setAssetATH({
                        ...athResponse.data,
                        price_eur: Number.isFinite(parsedPriceEur) ? parsedPriceEur : 0,
                        price_usd: Number.isFinite(parsedPriceUsd) ? parsedPriceUsd : 0,
                    });
                }

                if (klinesResponse?.data) {
                    const processedData: ProcessedDataPoint[] = klinesResponse.data.map((p: any) => ({
                        datetime: p.datetime,
                        closeEur: parseFloat(p.close_eur),
                    }));
                    setGraphData(processedData);

                    setFilteredData(processedData.filter((_, index) => index % 70 === 0))

                } else {
                    setGraphData([]);
                    setFilteredData([]);
                }
            } catch (e) {
                CustomSwal.fire({
                    title: t("Error"),
                    text: t("Something went wrong"),
                    icon: "error",
                });
                setGraphData([]);
                setFilteredData([]);
            }
        };
        getData();
    }, [asset_label, selectedNumOfYears, t]);

    // Compute DCA
    useEffect(() => {

        if (graphData && filteredData) {
            const points = filteredData.map((p) => p)

            let totalInvested = 0;
            let totalAssetUnitsOwned = 0;
            let ret = 0;

            let data: number[] = [];

            for (const p of points) {
                totalInvested += baseInvestment;
                totalAssetUnitsOwned += baseInvestment / p.closeEur;

                let holdingsValue = p.closeEur * totalAssetUnitsOwned;

                let profit = holdingsValue - totalInvested;
                ret = profit / totalInvested;

                data.push(ret * 100);
            }

            setDCAReturn(ret * 100);
            setDCAReturnValues(data);

            const DCAPoints: ReturnDataPoint[] = points.map((p, i) => ({
                datetime: p.datetime,
                return: data[i]
            }));
            setDCAReturnPoints(DCAPoints);
        }
    }, [baseInvestment, periodInvestment, filteredData, graphData]);

    // Compute BTFD
    useEffect(() => {
        if (graphData && filteredData) {

            const points = filteredData.map((p) => p)

            const initialATH = Number(assetATH?.price_eur);
            let currentATH = Number.isFinite(initialATH) && initialATH > 0
                ? initialATH
                : (points[0]?.closeEur ?? 0);

            let totalInvested = 0;
            let totalAssetUnitsOwned = 0;
            let ret = 0;

            let data: number[] = [];

            let aths: number[] = [];

            for (const p of points) {

                if (p.closeEur > currentATH) {
                    currentATH = p.closeEur;
                }

                aths.push(currentATH);

                let priceDecrease = currentATH > 0
                    ? Math.min((currentATH - p.closeEur) / currentATH, maxDecrease)
                    : 0;
                const multiplier = 1 + ((maxMultiplier - 1) / maxDecrease * priceDecrease);

                let actualInvestment = multiplier * baseInvestment;
                
                totalInvested += actualInvestment;
                totalAssetUnitsOwned += actualInvestment / p.closeEur;

                let holdingsValue = p.closeEur * totalAssetUnitsOwned;
                let profit = holdingsValue - totalInvested;
                ret = profit / totalInvested;

                data.push(ret * 100);
            }

            setBTFDReturn(ret * 100);
            setBTFDReturnValues(data);
            setATHs(aths);

            const BTFDPoints: ReturnDataPoint[] = points.map((p, i) => ({
                datetime: p.datetime,
                return: data[i]
            }));
            setBTFDReturnPoints(BTFDPoints);

        }
    }, [baseInvestment, periodInvestment, maxDecrease, maxMultiplier, filteredData, graphData, assetATH]);

    const priceSeries = graphData?.map((p) => p.closeEur) ?? [];
    const athSeries = ATHs ?? [];
    const combinedPriceValues = [...priceSeries, ...athSeries].filter((v) => Number.isFinite(v));
    const priceMin = combinedPriceValues.length > 0 ? Math.min(...combinedPriceValues) * 0.9 : 0;
    const priceMax = combinedPriceValues.length > 0 ? Math.max(...combinedPriceValues) * 1.1 : 1;

    return (
        <>
            <h3>{t("Investment Strategies Comparison")}</h3>

            <p>{t("Compare the most popular investing strategy - Dollar Cost Averaging with its slightly improved dynamic version.")}</p>

            <h5 style={{color: "#B1974E"}}>DCA - Dollar Cost Averaging</h5>
            <p>{t("This simple buf effective strategy is most efficient in long-termi investing and is based on periodically investing the same fixed amount of money, regardless of asset price.")}</p>

            <h5 style={{color: "#B1974E"}}>BTFD - Buy the F*****g Dip</h5>
            <p>{t("It is a dynamic strategy, which means that the amount of investment changes based on the asset price. It has two metrics - base investment amount and multiplier. Before an investment is made, a multiplier is computed based od current price decline compared to asset's ATH. The multiplier then multiplies the base investment amount. To put it simply - the lower the price is, the more you invest.")}</p>

            <div style={{paddingLeft: "15px", marginTop: "70px"}}>
                <div>
                    <div className="mb-5" style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Form.Label style={{ width: 370 }}>
                                {t("Regular daily investment for a period of")}
                            </Form.Label>
                            <Typography style={{color: ""}}>
                                {t("The period over which you invest every day")}
                            </Typography>
                        </div>

                        <Form.Select
                            className="select-box-outline"
                            style={{ maxWidth: 120 }}
                            value={selectedNumOfYears}
                            onChange={(e) => setSelectedNumOfYears(Number(e.target.value))}
                        >
                            {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>
                                    {n} {n === 1 ? t("year") : t("years")}
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
                                {t("The minimal amount of investment")}
                            </Typography>
                        </div>

                        <Form.Control
                          className="outline-input"
                          type="number"
                          style={{
                              width: `${baseInvestment.toString().length + 5}ch`,
                              minWidth: "50px"
                          }}
                          value={baseInvestment}
                          onChange={(e) => setBaseInvestment(parseInt(e.target.value) || 0)}
                        />
                    </div>

                    <div className="mb-5" style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Form.Label className="form-label" style={{ width: 370 }}>
                                {t("Maximal multiplier:")}
                            </Form.Label>
                            <Typography style={{ color: "" }}>
                                {t("Maximum investment multiplier")}
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
                            color={"#B1974E" as any}
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
            </div>

            <div className="justify-content-center text-center align-items-center" style={{display: "flex"}}>
                <CardContainer color="#ffffff20" style={{width: "50%"}}>
                    <div className="row justify-content-center text-center align-items-center">
                        <div className="col" style={{fontWeight: "bold", fontSize: "1.8rem"}}>{DCAReturn.toFixed(2)} %</div>
                        <div className="col" style={{fontWeight: "bold", fontSize: "1.8rem"}}>{BTFDReturn.toFixed(2)} %</div>
                    </div>
                    <div className="row justify-content-center text-center align-items-center" >
                        <div className="col" style={{fontSize: "1.1rem", color: "#C3C0BB"}}>DCA {t("return")}</div>
                        <div className="col" style={{fontSize: "1.1rem", color: "#C3C0BB"}}>BTFD {t("return")}</div>
                    </div>
                </CardContainer>
            </div>

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
                                    id: "ATH",
                                    yAxisId: "price",
                                    type: "line",
                                    label: t("ATH"),
                                    data: ATHs,
                                    color: "#FF7676",
                                    valueFormatter: (value: number | null) =>
                                        value !== null
                                            ? `${value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
                                            : ""
                                },
                                {
                                    id: "assetPriceSeries",
                                    yAxisId: "price",
                                    type: "line",
                                    label: t("Price"),
                                    data: filteredData?.map((p) => p.closeEur),
                                    color: "#4C4033",
                                    valueFormatter: (value: number | null) =>
                                        value !== null
                                            ? `${value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
                                            : ""
                                },
                                {
                                    id: "DCASeries",
                                    yAxisId: "return",
                                    type: "line",
                                    label: `DCA ${t("return")}`,
                                    data: DCAReturnValues,
                                    color: "#76B4FF",
                                    valueFormatter: (value: number | null) =>
                                        value !== null ? `${Number(value).toFixed(2)} %` : "",
                                },
                                {
                                    id: "BTFDSeries",
                                    yAxisId: "return",
                                    type: "line",
                                    label: `BTFD ${t("return")}`,
                                    data: BTFDReturnValues,
                                    color: "#FFB676",
                                    valueFormatter: (value: number | null) =>
                                        value !== null ? `${Number(value).toFixed(2)} %` : "",
                                },
                            ]}
                            xAxis={[
                                {
                                    scaleType: "band",
                                    data: filteredData?.map((p) => `${p.datetime}`),
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
                                    id: "price",
                                    min: priceMin,
                                    max: priceMax,
                                    tickNumber: 5,
                                    position: 'left',
                                    width: 80,
                                    label: t("Asset price"),
                                    valueFormatter: (value: number | null) =>
                                        value !== null
                                            ? `${value.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 3 })} €`
                                            : "",
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
                                    id: "return",
                                    position: 'right',
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
                            <ChartsTooltip trigger="axis" />
                            <ChartsXAxis />
                            <ChartsYAxis axisId="price" />
                            <ChartsYAxis axisId="return" />
                            {/*<ChartsYAxis axisId="ATH" />*/}
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
            {/*{asset_label && <BtfdDcaReturnsComparison asset_label={asset_label} BTFDReturnPoints={BTFDReturnPoints} DCAReturnPoints={DCAReturnPoints}/>}*/}
        </>
    )
}