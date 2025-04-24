import {useIndexDataContext} from "../providers/IndexDataProvider.tsx";
import {useEffect, useMemo, useState, useTransition} from "react";
import {AssetProfitData} from "../types/overviewTypes/IndexDataStructure.ts";
import {getMostProfitableSelectedPeriod} from "../api/indexDataService.ts";
import {calculateProfit} from "../functions/functions.ts";

export const useMostProfitableLastSelectedPeriod = () => {
    const { season, chartType } = useIndexDataContext();
    const [data, setData] = useState<AssetProfitData[]>();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const fetchData = async () => {
            setData(undefined);
            try {
                const result = await getMostProfitableSelectedPeriod(season, chartType);
                setData(result.data);
            } catch (error) {
                console.error(error);
            }
        };
        startTransition(() => {
            fetchData();
        });
    }, [season, chartType]);

    const getProfitData = useMemo(() => {
        const profitMap = (coin: AssetProfitData) => ({
            Week: [
                coin.week_3_profit ? calculateProfit(coin.week_3_profit) : undefined,
                coin.week_2_profit ? calculateProfit(coin.week_2_profit) : undefined,
                coin.week_1_profit ? calculateProfit(coin.week_1_profit) : undefined,
                coin.week_0_profit ? calculateProfit(coin.week_0_profit) : undefined,
            ].filter((value) => value !== undefined && value !== null),
            Month: [
                coin.month_2_profit ? calculateProfit(coin.month_2_profit) : undefined,
                coin.month_1_profit ? calculateProfit(coin.month_1_profit) : undefined,
                coin.month_0_profit ? calculateProfit(coin.month_0_profit) : undefined,
            ].filter((value) => value !== undefined && value !== null),
            Quarter: [
                coin.quarter_3_profit ? calculateProfit(coin.quarter_3_profit) : undefined,
                coin.quarter_2_profit ? calculateProfit(coin.quarter_2_profit) : undefined,
                coin.quarter_1_profit ? calculateProfit(coin.quarter_1_profit) : undefined,
                coin.quarter_0_profit ? calculateProfit(coin.quarter_0_profit) : undefined,
            ].filter((value) => value !== undefined && value !== null),
            Year: [
                coin.year_2_profit ? calculateProfit(coin.year_2_profit) : undefined,
                coin.year_1_profit ? calculateProfit(coin.year_1_profit) : undefined,
                coin.year_0_profit ? calculateProfit(coin.year_0_profit) : undefined,
            ].filter((value) => value !== undefined && value !== null),
            Smart: [
                coin.max_2_profit ? calculateProfit(coin.max_2_profit) : undefined,
                coin.max_1_profit ? calculateProfit(coin.max_1_profit) : undefined,
                coin.max_0_profit ? calculateProfit(coin.max_0_profit) : undefined,
            ].filter((value) => value !== undefined && value !== null),
        });
        return (coin: AssetProfitData) => profitMap(coin)[season as keyof typeof profitMap];
    }, [season]);
    
    return {
        data,
        isPending,
        getProfitData,
        season
    }
}