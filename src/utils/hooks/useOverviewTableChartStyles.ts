import {ApexOptions} from "apexcharts";
import {useMemo} from "react";
import {randomColor} from "../functions/getColorFunctions.ts";

export const useOverviewTableChartStyles = (data?: number[]) => {

    // Determine profit or loss
    const getTrendColor = (dataArray?: number[]): string => {
        if (!dataArray || dataArray.length < 2) {
            return randomColor();
        }
        
        const firstValue = dataArray[0];
        const lastValue = dataArray[dataArray.length - 1];
        
        if (lastValue > firstValue) {
            return "var(--green-color)";
        }
        else if (lastValue < firstValue) {
            return "var(--red-color)";
        }
        else {
            return "var(--secondary-color)";
        }
    };
    
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
            colors: [getTrendColor(data)],
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
            enabled: false,
        },
    }), [data]);
    
    return {
        options
    }
}