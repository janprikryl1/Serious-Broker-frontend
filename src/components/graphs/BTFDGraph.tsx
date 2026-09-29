import { FC, useEffect, useMemo, useRef } from "react";
import { createChart, IChartApi, UTCTimestamp } from "lightweight-charts";
import { parseBackendUtc } from "../../utils/functions/dateFunctions.ts";
import { transparentChartTheme } from "../../utils/options/chartThemes.ts";
import { CustomTooltip } from "../reusable/CustomTooltip.tsx";
import { useTranslation } from "react-i18next";

type Props = {
    graphData: number[][];
    datetimes: string[];
};

const chartHeight = 350;

type ChartPoint = { time: UTCTimestamp; value?: number };
type StackedSeries = { label: string; color: string; description: string; data: ChartPoint[] };

const seriesMeta = [
    { label: "Base model", color: "#D15B5B", description: "Default parameters (Multiplier x3, Period 1y, Max drop 75%)" },
    { label: "Multiplier: x10", color: "#6DB388", description: "Aggressive buying multiplier x10 during dips" },
    { label: "Period: 3 years", color: "#5B89AD", description: "Extended observation period of 3 years" },
    { label: "Max drop: 50%", color: "#9275A3", description: "Lower dip threshold for max investment (50%)" },
];

export const BTFDGraph: FC<Props> = ({ graphData, datetimes }) => {
    const { i18n, t } = useTranslation();
    const currentLocale = i18n.resolvedLanguage || i18n.language || "en-US";
    const chartHostRef = useRef<HTMLDivElement>(null);

    const stackedSeries = useMemo<StackedSeries[]>(() => {
        if (!graphData?.length || !datetimes.length) return [];

        const normalized = graphData.map((series) => {
            const missing = Math.max(0, datetimes.length - series.length);
            return Array(missing).fill(null).concat(series);
        });

        const toTime = (dt: string) => Math.floor(parseBackendUtc(dt).getTime() / 1000) as UTCTimestamp;

        return seriesMeta.map((meta, seriesIndex) => ({
            label: meta.label,
            color: meta.color,
            description: meta.description,
            data: datetimes.map((dt, pointIndex) => {
                const hasValue = normalized.slice(0, seriesIndex + 1).some((s) => s[pointIndex] !== null && s[pointIndex] !== undefined);
                if (!hasValue) return { time: toTime(dt) };

                const value = normalized.slice(0, seriesIndex + 1).reduce((sum, s) => sum + (s[pointIndex] ?? 0), 0);
                return { time: toTime(dt), value };
            }),
        }));
    }, [graphData, datetimes]);

    useEffect(() => {
        const container = chartHostRef.current;
        if (!container || stackedSeries.length === 0) return;

        container.innerHTML = "";

        const chart: IChartApi = createChart(container, {
            ...transparentChartTheme,
            width: container.clientWidth,
            height: chartHeight,
            leftPriceScale: {
                visible: false,
            },
            rightPriceScale: {
                ...transparentChartTheme.rightPriceScale,
                visible: true,
                borderVisible: true,
                borderColor: "rgba(255, 255, 255, 0.2)",
            },
            timeScale: {
                ...transparentChartTheme.timeScale,
                borderVisible: true,
                borderColor: "rgba(255, 255, 255, 0.2)",
                timeVisible: true,
                secondsVisible: false,
            },
        });

        stackedSeries.forEach((item) => {
            const series = chart.addAreaSeries({
                lineColor: item.color,
                topColor: `${item.color}50`,
                bottomColor: `${item.color}05`,
                lineWidth: 2,
                priceScaleId: "right",
                title: item.label,
                priceFormat: {
                    type: "custom",
                    formatter: (val: number) =>
                        `${val.toLocaleString(currentLocale, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                        })} %`,
                },
            });
            series.setData(item.data as never[]);
        });

        chart.timeScale().fitContent();

        const handleResize = () => {
            if (chartHostRef.current) {
                chart.applyOptions({ width: chartHostRef.current.clientWidth });
            }
        };

        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;
            chart.applyOptions({ width: Math.floor(entry.contentRect.width) });
        });

        window.addEventListener("resize", handleResize);
        resizeObserver.observe(container);

        return () => {
            window.removeEventListener("resize", handleResize);
            resizeObserver.disconnect();
            chart.remove();
        };
    }, [stackedSeries, currentLocale]);

    if (stackedSeries.length === 0) {
        return (
            <div className="col-sm tw-bg-stone-500 tw-bg-opacity-25 tw-rounded-lg tw-my-6 tw-py-8 text-center">
                <h4 className="mb-0 tw-text-sm sm:tw-text-base gray-2-color-text">
                    {graphData === undefined ? t("Loading chart data...") : t("No data available for chart.")}
                </h4>
            </div>
        );
    }

    return (
        <div className="col-sm tw-bg-stone-500 tw-bg-opacity-25 tw-rounded-lg tw-my-6 tw-py-3">
            <div
                ref={chartHostRef}
                style={{ width: "100%", height: `${chartHeight}px`, position: "relative" }}
            />
            <div className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-4 tw-mt-4 tw-pt-3 tw-border-t tw-border-stone-500/25">
                {stackedSeries.map((item, idx) => (
                    <CustomTooltip key={idx} title={item.description} placement="top">
                        <div className="tw-flex tw-items-center tw-gap-2 tw-cursor-pointer tw-text-xs sm:tw-text-sm tw-select-none hover:tw-opacity-80 tw-transition-opacity">
                            <span
                                className="tw-w-2.5 tw-h-2.5 tw-rounded-full tw-shrink-0"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="tw-font-medium tw-text-stone-200">
                                {item.label}
                            </span>
                            <span className="tw-text-xs tw-text-stone-400">
                                (%)
                            </span>
                        </div>
                    </CustomTooltip>
                ))}
            </div>
        </div>
    );
};
