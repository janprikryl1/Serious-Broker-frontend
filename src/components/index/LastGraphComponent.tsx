import { FC } from "react";
import { v4 as uuidv4 } from 'uuid';
import { LineChart } from "@mui/x-charts";
import {LastMostProfitableCoins} from "../../utils/types/indexPage/LastMostProfitableCoins.ts";
import {useThemeContext} from "../../utils/providers/ThemeProvider.tsx";
import {getRandomColor} from "../../utils/constants/functions.ts";

type Props = {
    data: LastMostProfitableCoins;
    selectedPeriod: string;
};

export const LastGraphComponent: FC<Props> = ({ data, selectedPeriod }) => {
    const { theme } = useThemeContext();

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

    return (
        <div className="col-sm-4" style={{width: "auto", backgroundColor: theme === 'dark' ? "#69737e" : 'transparent', borderRadius: 24, margin: "20px", maxWidth:"100%", overflow: "hidden"}} key={uuidv4()}>
            <LineChart
                xAxis={[{ data: xAxisLabels }]}
                series={[{
                    data: dataY,
                    label: data.asset_label
                }]}
                width={500}
                height={300}
                colors={[getRandomColor()]}
            />
        </div>
    );
};
