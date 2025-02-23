import {FC, useEffect, useMemo, useState, useTransition} from "react";
import { useTranslation } from "react-i18next";
import { IndexTableChart } from "./indexTableChart/IndexTableChart.tsx";
import { GainSeasonTh } from "./GainSeasonTh.tsx";
import {useIndexDataContext} from "../../../utils/providers/IndexDataProvider.tsx";
import {AssetProfitData} from "../../../utils/types/indexPage/IndexDataStructure.ts";
import {getMostProfitableSelectedPeriod} from "../../../utils/api/indexDataService.ts";
import {coinURL} from "../../../utils/constants";
import {IndexSeasonExtended} from "../../../utils/enums/IndexSeasonEnum.ts";
import {IndexTableSkeleton} from "./skeletons/IndexTableSkeleton.tsx";
import {calculateProfit} from "../../../utils/functions/functions.ts";


export const MostProfitableLastSelectedPeriod: FC = () => {
    const { t } = useTranslation();
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


    return (
        <div className="p-4 rounded">
            {!isPending && data ? (
                <table className="table-index-light mb-3">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th colSpan={2}>{t("Name")}</th>
                        <GainSeasonTh/>
                        <th>{t("Graph")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((coin, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td className="coin-symbol">{coin.photo && <img src={`${coinURL}/${coin.photo}`} alt={`Coin image: ${coin.asset_label}`}
                                                    width={30}/>} <strong>{coin.asset_label}</strong></td>
                            <td>{coin.name}</td>
                            <td>
                                {season === IndexSeasonExtended.SMART
                                 ? `${(coin.max_0_profit! * 100).toFixed(2)} %`
                                 : `${(((season === IndexSeasonExtended.WEEK
                                 ? coin.week_0_profit!
                                 : season === IndexSeasonExtended.MONTH
                                 ? coin.month_0_profit!
                                 : season === IndexSeasonExtended.QUARTER
                                 ? coin.quarter_0_profit!
                                 : coin.year_0_profit!) - 1) * 100).toFixed(2)} %`
                                }
                            </td>
                            <td className="chart-cell">
                                <IndexTableChart
                                    name={coin.asset_label}
                                    data={getProfitData(coin)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : <IndexTableSkeleton/>}
        </div>
    );
};