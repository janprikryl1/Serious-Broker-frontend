import { FC, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { randomColor } from "../../../../../utils/constants/functions.ts";

type Props = {
    name: string;
    data: number[];
};

export const IndexTableChart: FC<Props> = ({ name, data }) => {
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

    return (
        <ReactApexChart
            options={options}
            series={[
                {
                    name,
                    data,
                },
            ]}
            type="line"
            height={30}
            width={100}
        />
    );
};
