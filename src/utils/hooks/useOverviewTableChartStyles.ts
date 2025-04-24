import {ApexOptions} from "apexcharts";
import {useMemo} from "react";
import {randomColor} from "../functions/getColorFunctions.ts";

export const useOverviewTableChartStyles = () => {
    const options: ApexOptions = useMemo(() => ({
        chart: {
            type: "line",
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 1,
            colors: [randomColor()],
        },
        grid: {
            row: {
                colors: ["transparent"],
            },
        },
        xaxis: {
            labels: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                show: false,
            },
        },
        tooltip: {
            theme: "dark",
            x: {
                show: false,
            },
            y: {
                formatter: (val) => val.toFixed(2),
            },
            marker: {
                show: true,
            },
        },
    }), []);
    
    return {
        options
    }
}