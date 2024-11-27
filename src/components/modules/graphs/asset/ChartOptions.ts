import { ApexOptions } from "apexcharts";

export const ChartOptions = ({theme, width, height, t}: { theme: string | null; width: number; height: number; t: (key: string) => string; }): ApexOptions => ({
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
});
