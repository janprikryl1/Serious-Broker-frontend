import { FC, lazy, Suspense, useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { ChartOptions } from "../../graphs/asset/ChartOptions.ts";
import { useTranslation } from "react-i18next";
import {useThemeContext} from "../../../utils/providers/ThemeProvider.tsx";
import {ConimarketCupCoinsListType} from "../../../utils/types/demos/ConimarketCupCoinsListType.tsx";
import {getTop10CoinmarketcupCoins} from "../../../utils/api/demosService.ts";
import {getBinanceAssetGraphData} from "../../../utils/api/binanceAPIService.ts";
import {CandlestickData} from "../../../utils/types/KlineData.ts";
const ReactApexChart = lazy(() => import("react-apexcharts"));

const width = 1200;
const height = 600;

const topCoinmarketCapCoinColors = [
    '#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0',
    '#3F51B5', '#03A9F4', '#4CAF50', '#F9CE1D', '#FF9800'
];

export const DemoCoinmarektcupTop10: FC = () => {
    const { t } = useTranslation();
    const { theme } = useThemeContext();
    const [topCoins, setTopCoins] = useState<ConimarketCupCoinsListType[]>();
    const [allSeries, setAllSeries] = useState<{ name: string; data: CandlestickData[]; color: string }[]>();

    useEffect(() => {
        (async () => {
            try {
                const response = await getTop10CoinmarketcupCoins();
                setTopCoins(response.data);
            } catch (exception) {
                console.error(exception);
            }
        })();
    }, []);

    useEffect(() => {
        if (!topCoins) return;

        const fetchCoinDetails = async () => {
            const today = new Date();
            const oneYearAgo = new Date(today.setFullYear(today.getFullYear() - 1));
            const startTime = oneYearAgo.getTime();
            const endTime = Date.now();

            try {
                const allSeriesData = await Promise.all(
                    topCoins.map(async (coin, index) => {
                        try {
                            const response = await getBinanceAssetGraphData(
                                `${coin.asset_label}USDT`,
                                "1M",
                                startTime,
                                endTime
                            );
                            if (!response) return null;

                            const transformedData: CandlestickData[] = response.map(kline => ({
                                x: new Date(kline[0]),
                                y: [
                                    parseFloat(kline[1]),
                                    parseFloat(kline[2]),
                                    parseFloat(kline[3]),
                                    parseFloat(kline[4]),
                                ],
                            }));

                            return {
                                name: coin.asset_label,
                                data: transformedData,
                                color: topCoinmarketCapCoinColors[index % topCoinmarketCapCoinColors.length]
                            };
                        } catch (exception) {
                            console.error(exception);
                            return null;
                        }
                    })
                );
                setAllSeries(allSeriesData.filter(Boolean) as { name: string; data: CandlestickData[]; color: string }[]);
            } catch (exception) {
                console.error(exception);
            }
        };

        fetchCoinDetails();
    }, [topCoins]);

    const options = useMemo(() => ({
        ...ChartOptions({ theme, width, height, points: [], t }),
        legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            labels: { useSeriesColors: true },
            onItemClick: { toggleDataSeries: true },
            onItemHover: { highlightDataSeries: true },
        },
        colors: allSeries?.map(series => series.color) || [],
        chart: { animations: { enabled: false }, height: height - 50 },
        stroke: { width: 2 },
        states: { active: { allowMultipleDataPointsSelection: true } },
        annotations: { points: [] },
    }), [theme, width, height, t, allSeries]);

    return (
        <div className="w-full h-full">
            {allSeries ? (
                <Suspense fallback={<Skeleton height={height} width={width} style={{ maxWidth: "100%" }} />}>
                    <ReactApexChart
                        options={options}
                        series={allSeries}
                        type="candlestick"
                        height={height-50}
                        width={width-150}
                    />
                </Suspense>
            ) : (
                <Skeleton height={height} width={width} style={{ maxWidth: "100%" }} />
            )}
        </div>
    );
};
