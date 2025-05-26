import {FC, useEffect, useRef, useState, useMemo} from "react";
import {useParams} from "react-router-dom";
import {BinanceIndexAssetRecomBestPreviousDetails} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {useTranslation} from "react-i18next";
import {getBinanceIndexAssetRecomBestPreviousDetail, getBinanceIndexAssetRecomBestPreviousGraphData} from "../../utils/api/GraphsService.ts";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {RecommendationDetailsSkeleton} from "../../components/graphs/RecommendationDetailsSkeleton.tsx";
import {RecommendedSeasonSelect} from "../../components/graphs/RecommendedSeasonSelect.tsx";
import {RecommendationDetailSeasonEnum} from "../../utils/enums/RecommendationDetailSeasonEnum.ts";
import {RecommendationDetailWeekDetails} from "../../components/graphs/RecommendationDetailWeekDetails.tsx";
import {RecommendationDetailsMonthDetails} from "../../components/graphs/RecommendationDetailsMonthDetails.tsx";
import {RecommendationDetailsQuarterDetails} from "../../components/graphs/RecommendationDetailsQuarterDetails.tsx";
import {RecommendationDetailsYearDetails} from "../../components/graphs/RecommendationDetailsYearDetails.tsx";
import {RecommendationDetailsBuy} from "../../components/graphs/RecommendationDetailsBuy.tsx";
import {isValid, RecommendationDetailsSell} from "../../components/graphs/RecommendationDetailsSell.tsx";
import {LineChart} from "@mui/x-charts";

const findExactMatchIndexByUtcDateTime = (
    data: { datetime: string }[],
    targetUtcWeekday: number,
    targetUtcHour: number
): number | null => {
    if (!data || data.length === 0) {
        return null;
    }
    for (let i = data.length - 1; i >= 0; i--) {
        const date = new Date(data[i].datetime);
        if (isNaN(date.getTime())) {
            continue;
        }
        if (date.getUTCDay() === targetUtcWeekday && date.getUTCHours() === targetUtcHour) {
            return i;
        }
    }
    return null;
};

export const RecommendationDetails:FC = () => {
    const {t} = useTranslation();
    const {asset_label} = useParams<{ asset_label: string }>();
    const [detailsData, setDetailsData] = useState<BinanceIndexAssetRecomBestPreviousDetails | undefined>();
    const [selectedPeriod, setSelectedPeriod] = useState<RecommendationDetailSeasonEnum>(RecommendationDetailSeasonEnum.Week);
    const [selectedDropdown, setSelectedDropdown] = useState<string>("buy");
    const [recommendedPeriods, setRecommendedPeriods] = useState<any[] | undefined>();
    const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartHeight = 400;
    const chartMargins = useMemo(() => ({ left: 40, right: 10, top: 20, bottom: 30 }), []);


    useEffect(() => {
        if (!asset_label) return;
        const getData = async () => {
            try {
                const res = await getBinanceIndexAssetRecomBestPreviousDetail(asset_label);
                setDetailsData(res.data);
            } catch (e) {
                console.error("Failed to fetch recommendation details:", e);
                setDetailsData(undefined);
            }
        };
        getData();
    }, [asset_label]);

    useEffect(() => {
        if (!asset_label) return;
        const getData = async () => {
            try {
                const res = await getBinanceIndexAssetRecomBestPreviousGraphData(asset_label);
                setRecommendedPeriods(res.data);
            } catch (e) {
                console.error("Failed to fetch recommendation graph data:", e);
                setRecommendedPeriods(undefined);
            }
        };
        getData();
    }, [asset_label]);


    useEffect(() => {
        if (!recommendedPeriods || recommendedPeriods.length === 0 || !detailsData || selectedDropdown !== "buy" || !chartContainerRef.current) {
            setMarkerPosition(null);
            return;
        }

        const buyWeekday = detailsData.buy_week_0_week_day;
        const buyHour = detailsData.buy_week_0_hour;

        if (!isValid(buyWeekday) || !isValid(buyHour)) {
            setMarkerPosition(null);
            return;
        }

        const targetIndex = findExactMatchIndexByUtcDateTime(recommendedPeriods, Number(buyWeekday), Number(buyHour));

        if (targetIndex === null) {
            setMarkerPosition(null);
            console.warn("[Custom Marker] Target index not found.");
            return;
        }

        const dataPoint = recommendedPeriods[targetIndex];
        if (!dataPoint || dataPoint.close_eur === null || dataPoint.close_eur === undefined) {
            setMarkerPosition(null);
            console.error("[Custom Marker] Data point or 'close_eur' is invalid for marker.");
            return;
        }

        const chartWidth = chartContainerRef.current.clientWidth;
        if (chartWidth === 0) {
            setMarkerPosition(null);
            console.warn("[Custom Marker] Chart container width is 0. Cannot calculate marker position yet.");
            return;
        }

        const plotAreaWidth = chartWidth - chartMargins.left - chartMargins.right;
        const plotAreaHeight = chartHeight - chartMargins.top - chartMargins.bottom;

        const divisor = recommendedPeriods.length > 1 ? recommendedPeriods.length - 1 : 1;
        const xPixel = chartMargins.left + (plotAreaWidth / divisor) * targetIndex;

        const yValues = recommendedPeriods.map(p => p.close_eur).filter(y => y !== null && y !== undefined) as number[];
        if (yValues.length === 0) {
            setMarkerPosition(null);
            return;
        }
        const minY = Math.min(...yValues);
        const maxY = Math.max(...yValues);
        let yPixel;

        if (maxY === minY) {
            yPixel = chartMargins.top + plotAreaHeight / 2;
        } else {
            const yPercent = (dataPoint.close_eur - minY) / (maxY - minY);
            yPixel = chartMargins.top + plotAreaHeight * (1 - yPercent);
        }
        setMarkerPosition({ x: xPixel-15, y: yPixel+20 });

    }, [recommendedPeriods, detailsData, selectedDropdown, chartHeight, chartMargins]);
    
    const chartXAxisValues = recommendedPeriods ? recommendedPeriods.map(p => new Date(p.datetime)) : [];

    return (
        <>
            {detailsData ? (
                <>
                    <TitleHeader title={`${detailsData.asset_label} - ${detailsData.name}`} />
                    <div className="container graph-container">
                        <div className="service-details__wrapper">
                            <div className="service-details__item">
                                <div className="service-details__item-inner mb-5">
                                    <h5 className="index-title" style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{t("Quote currencies: ")}{detailsData.quote_currencies}</h5>
                                    {detailsData.all_pos !== null && <p>{t("Best of all index: ")}{detailsData.all_pos}</p>}
                                    {detailsData.all_sug !== null && <p>{t("All suggestions: ")}{detailsData.all_sug}</p>}
                                    {detailsData.cmc_rank !== null && <p>{t("cmc_rank")}: {detailsData.cmc_rank}</p>}

                                    <RecommendedSeasonSelect selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />

                                    {selectedPeriod === RecommendationDetailSeasonEnum.Week ? (
                                        <RecommendationDetailWeekDetails detailsData={detailsData} />
                                    ) : selectedPeriod === RecommendationDetailSeasonEnum.Month ? (
                                        <RecommendationDetailsMonthDetails detailsData={detailsData} />
                                    ) : selectedPeriod === RecommendationDetailSeasonEnum.Quarter ? (
                                        <RecommendationDetailsQuarterDetails detailsData={detailsData} />
                                    ) : selectedPeriod === RecommendationDetailSeasonEnum.Year ? (
                                        <RecommendationDetailsYearDetails detailsData={detailsData} />
                                    ) : null}
                                    <div className="mb-5">
                                        <i className="mb-2">{t("Ranking description")}</i>
                                        <i>{t("Invest description")}</i>
                                    </div>

                                    <div className="d-flex align-items-center mt-4 mb-2" style={{maxWidth: "250px"}}>
                                        <label className="form-label me-2">{t("Recommendation for")}</label>
                                        <select
                                            className="form-select mb-2"
                                            value={selectedDropdown}
                                            onChange={(e) => setSelectedDropdown(e.target.value)}
                                        >
                                            <option value="buy">{t("When to buy")}</option>
                                            <option value="sell">{t("When to sell")}</option>
                                        </select>
                                    </div>
                                    <div className="row">
                                    {selectedDropdown === "buy" && <RecommendationDetailsBuy detailsData={detailsData} />}
                                    {selectedDropdown === "sell" && <RecommendationDetailsSell detailsData={detailsData} />}
                                        
                                        {selectedDropdown === "buy" &&
                                    <div
                                        ref={chartContainerRef}
                                        className="col-sm service-details__content mb-5"
                                        style={{
                                            position: 'relative',
                                            border: "0.5px solid #3e3a32",
                                            borderRadius: "16px",
                                            padding: "20px",
                                            backgroundColor: "#d4c6a9",
                                        }}
                                    >
                                        <div style={{ width: "100%", overflowX: "auto", height: `${chartHeight}px`, position: 'relative' }}>
                                            {recommendedPeriods && recommendedPeriods.length > 0 ? (
                                                <LineChart
                                                    series={recommendedPeriods && recommendedPeriods.length > 0 ? [
                                                        {
                                                            id: "priceSeries",
                                                            data: recommendedPeriods.map(p => p.close_eur),
                                                            color: "green",
                                                            showMark: false,
                                                            curve: "catmullRom",
                                                            valueFormatter: (value: number | null) => (value !== null && value !== undefined) ? `${Number(value).toFixed(4)} EUR` : "",
                                                        }
                                                    ] : []}
                                                    height={chartHeight}
                                                    xAxis={[{
                                                        scaleType: "point",
                                                        data: chartXAxisValues.map(d => d.toLocaleString()),
                                                    }]}
                                                    sx={{
                                                        backgroundColor: "transparent",
                                                        "& .MuiChartsAxis-tickLabel": {
                                                            fontSize: "10px",
                                                            fill: "#333",
                                                        },
                                                        "& .MuiChartsAxis-line": {
                                                            stroke: "#888",
                                                        },
                                                    }}
                                                    margin={chartMargins}
                                                />
                                            ) : (
                                                <div style={{textAlign: "center", padding: "20px"}}>
                                                    {t(recommendedPeriods === undefined ? "Loading chart data..." : "No data available for chart.")}
                                                </div>
                                            )}
                                        </div>
                                        {markerPosition && (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: `${markerPosition.x}px`,
                                                    top: `${markerPosition.y}px`,
                                                    width: '15px',
                                                    height: '15px',
                                                    backgroundColor: 'magenta',
                                                    border: '2px solid yellow',
                                                    borderRadius: '50%',
                                                    zIndex: 10,
                                                    pointerEvents: 'none',
                                                }}
                                            />
                                        )}
                                    </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : <RecommendationDetailsSkeleton/>}
        </>
    );
};