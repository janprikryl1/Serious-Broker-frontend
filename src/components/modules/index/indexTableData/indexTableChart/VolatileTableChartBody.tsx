import {FC} from "react";
import {IndexTableChart} from "./IndexTableChart.tsx";
import Skeleton from "react-loading-skeleton";
import {MostVolatileData} from "../../../../../utils/types/indexPage/IndexDataStructure.ts";

type Props = {
    coin: MostVolatileData;
}

export const VolatileTableChartBody:FC<Props> = ({coin}) => {
    return (
        <tr>
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