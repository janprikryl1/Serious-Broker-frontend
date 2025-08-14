import { FC, useEffect, useMemo, useRef, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { getBinanceIndexAssetRecomBestPreviousGraphData } from "../../utils/api/GraphsService.ts";
import { useTranslation } from "react-i18next";
import { RecommendationDetailSeasonEnum } from "../../utils/enums/RecommendationDetailSeasonEnum.ts";
import {createDateFormatters, parseBackendUtc} from "../../utils/functions/dateFunctions.ts";

type Props = {
    asset_label: string;
    selectedPeriod: RecommendationDetailSeasonEnum;
    selectedTimeZone: string;
};

const chartHeight = 400;

export const RecommendationProfitGraph: FC<Props> = ({asset_label, selectedPeriod, selectedTimeZone}) => {
    const { t, i18n } = useTranslation();
    const [recommendedPeriods, setRecommendedPeriods] = useState<any[] | undefined>();
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartMargins = useMemo(() => ({ left: 40, right: 10, top: 20, bottom: 30 }), []);

    const fmt = useMemo(() => 
        createDateFormatters(i18n.language ?? "cs-CZ", selectedTimeZone),
    [i18n.language, selectedTimeZone]);

    useEffect(() => {
        if (!asset_label) return;
        const getData = async () => {
            try {
                const res = await getBinanceIndexAssetRecomBestPreviousGraphData(asset_label, selectedPeriod);
                setRecommendedPeriods(res.data);
            } catch (e) {
                console.error("Failed to fetch recommendation graph data:", e);
                setRecommendedPeriods(undefined);
            }
        };
        getData();
    }, [asset_label, selectedPeriod]);

    const chartXAxisValues: Date[] = useMemo(
        () => (recommendedPeriods ? recommendedPeriods.map((p) => parseBackendUtc(p.datetime)) : []),
        [recommendedPeriods]
    );

    return (
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
                {recommendedPeriods && recommendedPeriods.length > 0 ? (
                    <LineChart
                        series={[
                            {
                                id: "priceSeries",
                                data: recommendedPeriods.map((p) => p.profit),
                                color: "green",
                                showMark: false,
                                curve: "catmullRom",
                                valueFormatter: (value: number | null) =>
                                    value !== null && value !== undefined ? Number(value).toFixed(4) : "",
                            },
                        ]}
                        height={chartHeight}
                        xAxis={[
                            {
                                scaleType: "time",
                                data: chartXAxisValues,
                                valueFormatter: (d: Date) => (d ? fmt.dateTime(d) : ""),
                            },
                        ]}
                        sx={{
                            backgroundColor: "transparent",
                            "& .MuiChartsAxis-tickLabel": { fontSize: "10px", fill: "#333" },
                            "& .MuiChartsAxis-line": { stroke: "#888" },
                        }}
                        margin={chartMargins}
                    />
                ) : (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        {t(recommendedPeriods === undefined ? "Loading chart data..." : "No data available for chart.")}
                    </div>
                )}
            </div>
        </div>
    );
};
