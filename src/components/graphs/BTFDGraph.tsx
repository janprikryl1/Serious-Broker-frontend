import { FC, useEffect, useMemo, useRef } from "react";
import { createChart, ColorType, UTCTimestamp } from "lightweight-charts";
import { parseBackendUtc } from "../../utils/functions/dateFunctions.ts";

type Props = {
    graphData: number[][];
    datetimes: string[];
};

const chartHeight = 500;

type ChartPoint = { time: UTCTimestamp; value?: number };
type StackedSeries = { label: string; color: string; data: ChartPoint[] };

const seriesMeta = [
    { label: "Base model", color: "#D15B5B" },
    { label: "Multiplier: x10", color: "#6DB388" },
    { label: "Period: 3 years", color: "#5B89AD" },
    { label: "Max drop: 50%", color: "#9275A3" },
];

export const BTFDGraph: FC<Props> = ({ graphData, datetimes }) => {
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

        const chart = createChart(container, {
            width: container.clientWidth,
            height: chartHeight,
            layout: {
                background: { type: ColorType.Solid, color: "#FFF4E5" },
                textColor: "#444",
            },
            grid: {
                vertLines: { color: "rgba(62, 58, 50, 0.15)" },
                horzLines: { color: "rgba(62, 58, 50, 0.15)" },
            },
            rightPriceScale: {
                borderColor: "rgba(62, 58, 50, 0.35)",
            },
            timeScale: {
                borderColor: "rgba(62, 58, 50, 0.35)",
                timeVisible: true,
                secondsVisible: false,
            },
            crosshair: {
                vertLine: { labelBackgroundColor: "#4287f5" },
                horzLine: { labelBackgroundColor: "#4287f5" },
            },
            localization: {
                priceFormatter: (price: number) => `${price.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`,
            },
        });

        stackedSeries.forEach((item) => {
            const series = chart.addAreaSeries({
                lineColor: item.color,
                topColor: `${item.color}55`,
                bottomColor: `${item.color}08`,
                lineWidth: 2,
                priceLineVisible: false,
                lastValueVisible: true,
                crosshairMarkerVisible: true,
            });
            series.setData(item.data as never[]);
        });

        chart.timeScale().fitContent();

        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;
            chart.applyOptions({ width: Math.floor(entry.contentRect.width) });
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
            chart.remove();
        };
    }, [stackedSeries]);

    return (
        <div
            className="col-sm service-details__content mb-5 mt-4"
            style={{
                position: "relative",
                border: "0.5px solid #3e3a32",
                borderRadius: "5px",
                padding: "20px",
                backgroundColor: "#FFF4E5",
            }}
        >
            <div className="w-100 position-relative" style={{ minHeight: `${chartHeight}px` }}>
                {stackedSeries.length > 0 ? (
                    <>
                        <div className="d-flex justify-content-center gap-4 flex-wrap mb-3">
                            {stackedSeries.map((series) => (
                                <div key={series.label} className="d-flex align-items-center gap-2">
                                    <span
                                        className="rounded-circle d-inline-block"
                                        style={{ width: 10, height: 10, backgroundColor: series.color }}
                                    />
                                    <small className={"black-color-text"}>{series.label}</small>
                                </div>
                            ))}
                        </div>
                        <div ref={chartHostRef} className="w-100" style={{ height: `${chartHeight}px` }} />
                    </>
                ) : (
                    <div className="text-center p-3 h-100 d-flex align-items-center justify-content-center">
                        <h4 className="mb-0">
                            {graphData === undefined ? "Loading chart data..." : "No data available for chart."}
                        </h4>
                    </div>
                )}
            </div>
        </div>
    );
};