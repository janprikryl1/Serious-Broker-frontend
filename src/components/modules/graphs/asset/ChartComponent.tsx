import { FC, useEffect, useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import Skeleton from "react-loading-skeleton";
import { useThemeContext } from "../../../../utils/providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { getBinanceAssetGraphData } from "../../../../api/binanceAPIService";
import { ChartOptions } from "./ChartOptions";
import { PeriodSelector } from "./PeriodSelector";
import { DateRangeSelector } from "./DateRangeSelector";
import {CandlestickData, KlineGraphData} from "../../../../utils/types/KlineData.ts";
import {ChartAssetPeriodEnum} from "../../../../utils/enums/ChartAssetPeriodEnum.ts";

type Props = {
    width?: number;
    height?: number;
    coin: string;
}

export const ChartComponent: FC<Props> = ({ width = 500, height = 300, coin }) => {
    const { theme } = useThemeContext();
    const { t } = useTranslation();
    const [selectedPeriod, setSelectedPeriod] = useState<keyof typeof ChartAssetPeriodEnum>("1M");
    const today = useMemo(() => new Date(), []);
    const oneYearAgo = useMemo(() => new Date(new Date().setFullYear(today.getFullYear() - 1)), [today]);
    const [startDate, setStartDate] = useState<string>(oneYearAgo.toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState<string>(today.toISOString().split("T")[0]);
    const [series, setSeries] = useState<{ data: CandlestickData[] }[]>();

    const options = useMemo(() => ChartOptions({ theme, width, height, t }), [theme, width, height, t]);

    useEffect(() => {
        setSeries(undefined);
        const fetchData = async () => {
            try {
                const startTime = new Date(startDate).getTime();
                const endTime = new Date(endDate).getTime();
                const response: KlineGraphData[] = await getBinanceAssetGraphData(`${coin}USDT`, selectedPeriod, startTime, endTime);

                const transformedData: CandlestickData[] = response.map((kline) => ({
                    x: new Date(kline[0]),
                    y: [parseFloat(kline[1]), parseFloat(kline[2]), parseFloat(kline[3]), parseFloat(kline[4])],
                }));

                const minDate = new Date(Math.min(...response.map(kline => kline[0])));
                const maxDate = new Date(Math.max(...response.map(kline => kline[0])));
                if (startDate !== minDate.toISOString().split("T")[0]) {
                    setStartDate(minDate.toISOString().split("T")[0]);
                }
                if (endDate !== maxDate.toISOString().split("T")[0]) {
                    setEndDate(maxDate.toISOString().split("T")[0]);
                }

                setSeries([{ data: transformedData }]);
            } catch (error) {
                console.error("Failed to fetch Binance asset data:", error);
            }
        };
        fetchData();
    }, [coin, selectedPeriod, startDate, endDate]);
    
    return (
        <>
            <div className="row justify-content-center align-items-center mt-3 w-200">
                <PeriodSelector selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
                <DateRangeSelector
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
            </div>
            {series ? (
                <ReactApexChart options={options} series={series} type="candlestick" />
            ) : (
                <Skeleton height={height} width={width} style={{maxWidth:"100%"}} />
            )}
        </>
    );
};
