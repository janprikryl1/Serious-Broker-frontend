import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import {randomColor} from "../../../../utils/constants/functions.ts";


export const IndexTableChart = () => {
    const [series] = useState([
        {
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
    ]);

    const options: ApexOptions = {
        chart: {
            type: 'line',
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
            curve: 'smooth',
            width: 1,
            colors: [randomColor()],
        },
        grid: {
            row: {
                colors: ['transparent'],
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
            theme: 'dark',
            x: {
                show: false,
            },
            y: {
                formatter: function (val) {
                    return val.toFixed(2);
                },
            },
            marker: {
                show: true,
            },
        },
    };

    return (
        <ReactApexChart options={options} series={series} type="line" height={50} width={100} />
    );
};