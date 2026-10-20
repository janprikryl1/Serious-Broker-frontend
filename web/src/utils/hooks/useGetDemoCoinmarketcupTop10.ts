import {useThemeContext} from "../providers/ThemeProvider.tsx";
import {useEffect, useMemo, useState} from "react";
import {CoinmarketCupCoinsListType} from "../types/demos/CoinmarketCupCoinsListType.ts";
import {CandlestickData} from "../types/asset/KlineData.ts";
import {getTop10CoinmarketcupCoins} from "../api/demosService.ts";
import {getBinanceAssetGraphData} from "../api/binanceAPIService.ts";
import {useTranslation} from "react-i18next";
import {ChartOptions} from "../constants/ChartOptions.ts";

export const demoWidth = 1200;
export const demoHeight = 600;

const topCoinmarketCapCoinColors = [
    '#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0',
    '#3F51B5', '#03A9F4', '#4CAF50', '#F9CE1D', '#FF9800'
];

export const useGetDemoCoinmarketcupTop10 = () => {
    const { t } = useTranslation();
    const { theme } = useThemeContext();
    const [topCoins, setTopCoins] = useState<CoinmarketCupCoinsListType[]>();
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
        ...ChartOptions({ theme, width: demoWidth, height: demoHeight, points: [], t }),
        legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            labels: { useSeriesColors: true },
            onItemClick: { toggleDataSeries: true },
            onItemHover: { highlightDataSeries: true },
        },
        colors: allSeries?.map(series => series.color) || [],
        chart: { animations: { enabled: false }, height: demoHeight - 50 },
        stroke: { width: 2 },
        states: { active: { allowMultipleDataPointsSelection: true } },
        annotations: { points: [] },
    }), [theme, demoWidth, demoHeight, t, allSeries]);
    
    return {
        allSeries,
        options,
    };
}