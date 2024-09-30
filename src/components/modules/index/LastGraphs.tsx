import {FC} from "react";
import {useTranslation} from "react-i18next";
import {LineChart} from "@mui/x-charts";
import {LastMostProfitableCoins} from "../../../utils/types/indexPage/LastMostProfitableCoins.ts";
import {v4 as uuidv4} from 'uuid';
import {useThemeContext} from "../../../utils/providers/ThemeProvider.tsx";

type Props = {
    lastMostProfitable: LastMostProfitableCoins[] | undefined;
};

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const LastGraphs:FC<Props> = ({lastMostProfitable}) => {
    const {t} = useTranslation();
    const {theme} = useThemeContext();

    return (
        <div className="row">
            <h2>{t("Profit for last 3 weeks in ")}%</h2>
            {lastMostProfitable?.map((data, i) => (
                <div className="col-sm-4" style={{width: "auto", backgroundColor: theme === 'dark' ? "#69737e": 'transparent', borderRadius: 24, margin: "20px"}} key={uuidv4()}>
                    <LineChart
                        xAxis={[{data: [1, 2, 3]}]}
                        series={[
                            {
                                data: [((data.week_0_profit - 1) * 100), (data.week_1_profit - 1) * 100, (data.week_2_profit - 1) * 100], //Y
                                label: data.asset_label
                            },
                        ]}
                        width={500}
                        height={300}
                        colors={[colors[i]]}
                        
                    />
                </div>
            ))}
        </div>
    );
};