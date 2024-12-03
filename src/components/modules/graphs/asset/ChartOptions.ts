import {ApexOptions} from "apexcharts";

export const ChartOptions = ({ theme, width, height, points, t }: { theme: string | null; width: number; height: number; points: PointAnnotations[]; t: (key: string) => string; }): ApexOptions => ({
    chart: {
        type: "candlestick",
        height,
        width,
        locales: [{ name: "cs", options: {} }],
        defaultLocale: "cs",
    },
    xaxis: {
        type: "datetime",
        labels: { style: { colors: theme === "dark" ? "#fff" : "#000" } },
    },
    yaxis: {
        tooltip: { enabled: true },
        labels: { style: { colors: theme === "dark" ? "#fff" : "#000" } },
    },
    tooltip: {
        theme: theme === "dark" ? "dark" : "light",
        x: { show: true },
        y: { formatter: (val) => val.toFixed(2) },
        custom: ({ seriesIndex, dataPointIndex, w }) => {
            const ohlc = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
            const high = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
            const low = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
            const close = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
            return `
                <div style="padding:10px;">
                    <div><strong>${t("Opening")}:</strong> ${ohlc}</div>
                    <div><strong>${t("Highest")}:</strong> ${high}</div>
                    <div><strong>${t("Lowest")}:</strong> ${low}</div>
                    <div><strong>${t("Closing")}:</strong> ${close}</div>
                </div>
            `;
        },
    },
    annotations: {
        points: [
            ...points,
            {
                x: points[0]?.x,
                y: points[0]?.y,
                marker: {
                    size: 8,
                    fillColor: "#FFD700",
                    strokeColor: "#000",
                    strokeWidth: 2,
                },
                label: {
                    borderColor: "#FFD700",
                    offsetY: 0,
                    style: {
                        color: "#000",
                        background: "#FFD700",
                    },
                    text: t("Start"),
                },
            },
            {
                x: points[1]?.x,
                y: points[1]?.y,
                marker: {
                    size: 8,
                    fillColor: points[0].y && points[1].y && points[0]?.y > points[1]?.y ? "#FF4500" : "#8bff00",
                    strokeColor: "#000",
                    strokeWidth: 2,
                },
                label: {
                    borderColor: points[0].y && points[1].y && points[0]?.y > points[1]?.y ? "#FF4500" : "#8bff00",
                    offsetY: 0,
                    style: {
                        color: "#000",
                        background: points[0].y && points[1].y && points[0]?.y > points[1]?.y ? "#FF4500" : "#8bff00",
                    },
                    text: t("End"),
                },
            },
        ],
    },
});
