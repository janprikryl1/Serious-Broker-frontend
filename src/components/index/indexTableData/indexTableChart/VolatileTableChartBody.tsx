import {FC} from "react";
import {IndexTableChart} from "./IndexTableChart.tsx";
import Skeleton from "react-loading-skeleton";
import {MostVolatileData} from "../../../../utils/types/indexPage/IndexDataStructure.ts";
import {coinURL} from "../../../../utils/constants";
import {getFiatCoin} from "../../../../utils/constants/pairIcons.ts";

type Props = {
    coin: MostVolatileData;
    index: number;
}

export const VolatileTableChartBody:FC<Props> = ({coin, index}) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td style={{textAlign: "left"}}>
                <img src={`${coinURL}${coin.photo}`} alt={`Coin image: ${coin.asset_label}`} width={30}/>
                <img style={{marginLeft:-10}} src={getFiatCoin(coin.symbol_name)} alt={`Fiat coin image: ${coin.asset_label}`} width={30}/>
                <strong>{coin.asset_label}</strong>
            </td>
            <td>{coin.symbol_name}</td>
            <td>{coin.percent_volatility} %</td>
            <td className="chart-cell">
                {coin.graph_data ? <IndexTableChart
                    name={coin.asset_label}
                    data={coin.graph_data}
                /> : <Skeleton />}
            </td>
        </tr>
    )
}