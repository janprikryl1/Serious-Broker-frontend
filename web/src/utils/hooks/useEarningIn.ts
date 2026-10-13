import {useMemo, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {CandlestickData} from "../types/asset/KlineData.ts";

export const useEarningIn = (series: { data: CandlestickData[] }[] | undefined, startDate: string, endDate: string) => {
    const [buyDate, setBuyDate] = useState<Dayjs | null>(dayjs(startDate));
    const [sellDate, setSellDate] = useState<Dayjs | null>(dayjs(endDate));
    const [initialInvestment, setInitialInvestment] = useState<number>(0);

    // Helper function to find the closest data point for a given date
    const findClosestData = (date: Dayjs | null): CandlestickData | undefined => {
        if (!series || !date) return undefined;
        const allData = series[0]?.data || [];
        return allData.reduce((closest, current) => {
            const currentDiff = Math.abs(dayjs(current.x).diff(date));
            const closestDiff = Math.abs(dayjs(closest.x).diff(date));
            return currentDiff < closestDiff ? current : closest;
        });
    };

    // Find buy and sell prices
    const buyData = useMemo(() => findClosestData(buyDate), [buyDate, series]);
    const sellData = useMemo(() => findClosestData(sellDate), [sellDate, series]);

    const calculateGain = () => {
        if (!buyData || !sellData || initialInvestment <= 0) return { gain: 0, percentage: 0 };
        const buyPrice = buyData.y[0]; // Open price for buy
        const sellPrice = sellData.y[3]; // Close price for sell
        const quantity = initialInvestment / buyPrice;
        const finalValue = quantity * sellPrice;
        const gain = finalValue - initialInvestment;
        const percentage = (gain / initialInvestment) * 100;
        return { gain, percentage };
    };

    const { gain, percentage } = calculateGain();

    const handleBuyDateChange = (value: Dayjs | null) => {
        if (value && (value.isSame(dayjs(startDate)) || value.isAfter(dayjs(startDate)))) {
            setBuyDate(value);
        }
    };

    const handleSellDateChange = (value: Dayjs | null) => {
        if (value && (value.isBefore(dayjs(endDate)) || value.isSame(dayjs(endDate)))) {
            setSellDate(value);
        }
    };
    
    return {
        setInitialInvestment,
        buyDate,
        handleBuyDateChange,
        sellDate,
        handleSellDateChange,
        gain,
        percentage
    }
}