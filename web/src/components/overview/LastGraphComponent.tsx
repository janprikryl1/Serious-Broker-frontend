import { FC } from "react";
import { v4 as uuidv4 } from 'uuid';
import { LineChart } from "@mui/x-charts";
import {LastMostProfitableCoins} from "../../utils/types/overviewTypes/LastMostProfitableCoins.ts";
import {useThemeContext} from "../../utils/providers/ThemeProvider.tsx";
import {getRandomColor} from "../../utils/functions/getColorFunctions.ts";
import {useLastGraphComponentData} from "../../utils/hooks/useLastGraphComponentData.ts";

type Props = {
    data: LastMostProfitableCoins;
    selectedPeriod: string;
};

export const LastGraphComponent: FC<Props> = ({ data, selectedPeriod }) => {
    const { theme } = useThemeContext();
    const {xAxisLabels, dataY} = useLastGraphComponentData(data, selectedPeriod);

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
