import {FC} from "react";
import {IndexTableChart} from "./IndexTableChart.tsx";
import Skeleton from "react-loading-skeleton";
import {MostVolatileData} from "../../../../../utils/types/indexPage/IndexDataStructure.ts";

type Props = {
    coin: MostVolatileData;
    index: number;
}

export const VolatileTableChartBody:FC<Props> = ({coin, index}) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{coin.asset_label}</td>
            <td>{coin.symbol_name}</td>
            <td>{coin.percent_volatility} %</td>
            <td>
                {coin.graph_data ? <IndexTableChart
                    name={coin.asset_label}
                    data={coin.graph_data}
                /> : <Skeleton />}
            </td>
        </tr>
    )
}