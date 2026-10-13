import {useThemeContext} from "../providers/ThemeProvider.tsx";
import {useTranslation} from "react-i18next";
import {Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";
import {ChartAssetPeriodEnum} from "../enums/ChartAssetPeriodEnum.ts";
import {MAX_RANGES} from "../constants/qraphConstants.ts";
import {CandlestickData, KlineGraphData} from "../types/asset/KlineData.ts";
import {getBinanceAssetGraphData} from "../api/binanceAPIService.ts";
import {ChartOptions} from "../constants/ChartOptions.ts";

export const useChartComponent = (width: number, height: number, startDate: string, endDate: string, coin: string,setStartDate: Dispatch<SetStateAction<string>>, setEndDate: Dispatch<SetStateAction<string>>, setSeries: Dispatch<SetStateAction<{ data: CandlestickData[] }[] | undefined>>) => {
    const { theme } = useThemeContext();
    const { t } = useTranslation();
    const [selectedPeriod, setSelectedPeriod] = useState<keyof typeof ChartAssetPeriodEnum>("1M");
    const [error, setError] = useState<string | null>(null);
    const [points, setPoints] = useState<PointAnnotations[]>([]);

    const options = useMemo(() => ChartOptions({ theme, width, height, points, t }), [theme, width, height, points, t]);

    useEffect(() => {
        const validateRange = () => {
            const startTime = new Date(startDate).getTime();
            const endTime = new Date(endDate).getTime();

            if (endTime <= startTime) {
                setError(t("End date must be greater than start date."));
                return false;
            }

            if (endTime >= new Date().getTime()) {
                setError(t("End date must be less than today."));
                return false;
            }

            const maxRange = MAX_RANGES[selectedPeriod];
            if (endTime - startTime > maxRange) {
                setError(`${t("The selected period")} (${selectedPeriod}) ${t("does not allow a date range longer than")} ${maxRange / (24 * 60 * 60 * 1000)} ${t("days")}.`);
                return false;
            }
            setError(null);
            return true;
        };

        if (validateRange()) {
            setSeries(undefined);
            const fetchData = async () => {
                try {
                    const startTime = new Date(startDate).getTime();
                    const endTime = new Date(endDate).getTime();
                    const response: KlineGraphData[] | undefined = await getBinanceAssetGraphData(`${coin}USDT`, selectedPeriod, startTime, endTime);
                    if (!response) return;

                    const transformedData: CandlestickData[] = response.map((kline) => ({
                        x: new Date(kline[0]),
                        y: [
                            parseFloat(kline[1]),
                            parseFloat(kline[2]),
                            parseFloat(kline[3]),
                            parseFloat(kline[4]),
                        ],
                    }));
                    const firstPoint = { x: response[0][0], y: transformedData[0].y[3] };
                    const lastPoint = { x: response[response.length - 1][0], y: transformedData[transformedData.length - 1].y[3] };
                    setPoints([firstPoint, lastPoint]);

                    const minDate = new Date(Math.min(...response.map((kline) => kline[0])));
                    const maxDate = new Date(Math.max(...response.map((kline) => kline[0])));
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
        }
    }, [coin, selectedPeriod, startDate, endDate]);
    
    return {
        selectedPeriod,
        setSelectedPeriod,
        error,
        options,
        points
    }
}