import {FC} from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import {BinanceIndexAssetRecomBestPreviousType} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";

type Props = {
    data: BinanceIndexAssetRecomBestPreviousType[];
}

export const PositionGraphComponent:FC<Props> = ({data}) => {
    return (
            <BarChart
                series={[
                    { data: data.map((item) => item.all_pos) },
                ]}
                height={290}
                xAxis={[{ data: data.map((item) => item.asset_label), scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                colors={['#dd9f3a']}
                sx={{
                    "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                        strokeWidth:"0.4",
                        fill:"#dd9f3a"
                    },
                    "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                        fontFamily: "Roboto",
                    },
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                        strokeWidth:"0.5",
                        fill:"#dd9f3a"
                    },
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                        stroke:"#dd9f3a",
                        strokeWidth:0.4
                    },
                    "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                        stroke:"#00000FF",
                        strokeWidth:0.4
                    }
                }}
            />
    );
};