import {LastMostProfitableCoins} from "../types/overviewTypes/LastMostProfitableCoins.ts";

export const useLastGraphComponentData = (data: LastMostProfitableCoins, selectedPeriod: string) => {
    const getDataY = () => {
        switch (selectedPeriod) {
            case "weeks":
                return [
                    data.week_0_profit !== null ? (data.week_0_profit - 1) * 100 : null,
                    data.week_1_profit !== null ? (data.week_1_profit - 1) * 100 : null,
                    data.week_2_profit !== null ? (data.week_2_profit - 1) * 100 : null
                ].filter(value => value !== null);
            case "months":
                return [
                    data.month_0_profit !== null ? (data.month_0_profit - 1) * 100 : null,
                    data.month_1_profit !== null ? (data.month_1_profit - 1) * 100 : null,
                    data.month_2_profit !== null ? (data.month_2_profit - 1) * 100 : null
                ].filter(value => value !== null);
            case "quarters":
                return [
                    data.quarter_0_profit !== null ? (data.quarter_0_profit - 1) * 100 : null,
                    data.quarter_1_profit !== null ? (data.quarter_1_profit - 1) * 100 : null,
                    data.quarter_2_profit !== null ? (data.quarter_2_profit - 1) * 100 : null
                ].filter(value => value !== null);
            case "years":
                return [
                    data.year_0_profit !== null ? (data.year_0_profit - 1) * 100 : null,
                    data.year_1_profit !== null ? (data.year_1_profit - 1) * 100 : null,
                    data.year_2_profit !== null ? (data.year_2_profit - 1) * 100 : null
                ].filter(value => value !== null);
            default:
                return [];
        }
    };

    const dataY = getDataY();
    const xAxisLabels = dataY.map((_, index) => [index]);
    
    return {
        xAxisLabels,
        dataY
    }
}