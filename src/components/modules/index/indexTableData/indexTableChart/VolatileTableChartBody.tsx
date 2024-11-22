import {FC, useEffect, useState} from "react";
import {filterGraphData} from "../../../../../utils/constants/functions.ts";
import {IndexTableChart} from "./IndexTableChart.tsx";
import Skeleton from "react-loading-skeleton";
import {MostVolatileData} from "../../../../../utils/types/indexPage/IndexDataStructure.ts";

type Props = {
    coin: MostVolatileData;
}

export const VolatileTableChartBody:FC<Props> = ({coin}) => {
    const [graphData, setGraphData] = useState<number[]>();

    useEffect(() => {
        setGraphData(filterGraphData(coin.graph_data));
    }, [coin]);

    return (
        <tr>
            <td>{coin.asset_label}</td>
            <td>{coin.symbol_name}</td>
            <td>{coin.percent_volatility} %</td>
            <td>
                {graphData ? <IndexTableChart
                    name={coin.asset_label}
                    data={graphData}
                /> : <Skeleton />}
            </td>
        </tr>
    )
}